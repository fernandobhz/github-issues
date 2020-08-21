import axios from "axios";
import axiosRateLimit from "axios-rate-limit";

import { GITHUB_API_ENDPOINT, GITHUB_TOKEN } from "../core/config";

let api;

if (GITHUB_TOKEN) {
  api = axiosRateLimit(
    axios.create({
      baseURL: GITHUB_API_ENDPOINT,
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    }),
    {
      maxRequests: 5000, // Authenticated rate limit
      perMilliseconds: 1000 * 3600, // Per hour
    }
  );
} else {
  api = axiosRateLimit(
    axios.create({
      baseURL: GITHUB_API_ENDPOINT,
    }),
    {
      maxRequests: 60, // Unauthenticated rate limit
      perMilliseconds: 1000 * 3600, // Per hour
    }
  );
}

const updateRateLimit = () => {
  api.get("/rate_limit").then(res => {
    // eslint-disable-next-line no-console
    console.log(`Setting new rate limit to: ${res.data.resources.core.limit}`);
    api.setRateLimitOptions({
      maxRequests: res.data.resources.core.limit,
      perMilliseconds: 1000 * 3600,
    });
  });
};

/**
 * Set rate limit on app startup
 */
updateRateLimit();

/**
 * Check every hour about new rate limit,
 * the app could be initiated with a low rate limit
 */
setInterval(updateRateLimit, 1000 * 3600);

/**
 * It'll fetch all pages of and resource in github api using http verb GET
 * @param {string} resource The resource that are you looking for, eg: /repos/facebook/react/issues
 * @param {function} lambda An arrow function to transform results, you might not looking for entire result of github
 * @param {object} paramsWithoutPagination The request params, that where you sould put query string parameters, there is no need to inform the per_page or page params
 */
const fetchAllPages = async (resource, lambda, paramsWithoutPagination = {}) => {
  const results = [];

  const params = {
    ...paramsWithoutPagination,
    per_page: 100,
    page: 1,
  };

  /**
   * Loops with async call inside of it DON'T block the thred or event loop ou tasks queue
   * See my POC about it here: https://github.com/fernandobhz/poc-nodejs-for-await-blocking
   */

  /**
   * I need a infinite loop until I reach the last page
   * It could be a recursive function as well
   * But I prefer that one because it is simpler
   */
  // eslint-disable-next-line no-constant-condition
  while (true) {
    /**
     * That loop is that edge case described in the documentation
     * https://eslint.org/docs/rules/no-await-in-loop > When not to use it
     * Each iteration DEPENDS of previous one
     */
    // eslint-disable-next-line no-await-in-loop
    const { data } = await api.get(resource, { params });

    /**
     * If the users pass an lambda (arrow functions in js)
     * We'll use that to reduce memory usage
     */
    if (lambda) results.push(...data.map(lambda));
    else results.push(...data);

    if (data.length < 100) break;
    else {
      // eslint-disable-next-line no-console
      console.log(`Fetching resource '${resource}' and we are on page '${params.page}' with page size of 100 items`);
      params.page += 1;
    }
  }

  return results;
};

/**
 * It'll perform a search on all repositories names on github.
 * WARNING: It'll only return the most popular results, since github api
 * limit this query with a timout, so, there is no guarentee that all repos will be returned
 * @param {string} name Part or complete name of a repository, eg: react
 * @param {function} lambda An arrow function to transform results, you might not looking for entire result of github
 */
export const search = (name, lambda) =>
  api.get("/search/repositories", { params: { q: name } }).then(({ data }) => data.items.map(lambda));

/**
 * It'll list all issues for a given repository
 * @param {string} fullName The full name of repository eg: facebook/react
 */
export const issues = (fullName, lambda) => fetchAllPages(`/repos/${fullName}/issues`, lambda, { state: "all" });

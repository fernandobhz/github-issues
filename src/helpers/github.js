/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
import axios from "axios";
import axiosRateLimit from "axios-rate-limit";

import { GITHUB_API_ENDPOINT, GITHUB_TOKEN, RUNNING_TESTS } from "../core/config";

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

if (!RUNNING_TESTS) {
  // Set rate limit on app startup
  updateRateLimit();

  // Check every hour about new rate limit, the app could be initiated with a low rate limit
  // eslint-disable-next-line no-console
  console.log(`updateRateLimit will be called every hour`);
  setInterval(updateRateLimit, 1000 * 3600);
}

/**
 * It'll fetch all pages of and resource in github api using http verb GET
 * @param {string} resource The resource that are you looking for, eg: /repos/facebook/react/issues
 * @param {function} lambda An arrow function to transform results, you might not looking for entire result of github
 * @param {object} paramsWithoutPagination The request params, that where you sould put query string parameters, there is no need to inform the per_page or page params
 */
const fetchAllPages = async (resource, lambda, paramsWithoutPagination = {}) => {
  /**
   * Loops with async call inside of it DO NOT block the main thred/event loop/tasks queue
   * See my POC about it here: https://github.com/fernandobhz/poc-nodejs-for-await-blocking
   *
   * I can't use Promise.all on that function, because, It needs to be processed after the previous one
   */

  const results = [];

  const params = {
    ...paramsWithoutPagination,
    per_page: 100,
    page: 1,
  };

  while (true) {
    const { data } = await api.get(resource, { params });

    if (lambda) results.push(...data.map(lambda));
    else results.push(...data);

    if (data.length < 100) break;
    console.log(`Fetching resource '${resource}' and we are on page '${params.page}' with page size of 100 items`);
    params.page += 1;
  }

  return results;
};

/**
 * It'll perform a search on all repositories names on github.
 * WARNING: It'll only return the most popular results, since github api
 * limit this query with a timout, so, there is no guarentee that all repos will be returned
 * @param {string} term Part or complete name of a repository, eg: react
 * @param {function} lambda An arrow function to transform results, you might not looking for entire result of github
 */
export const search = (term, lambda) =>
  api.get("/search/repositories", { params: { q: term } }).then(({ data }) => data.items.map(lambda));

/**
 * It'll list all issues for a given repository
 * @param {string} fullName The full name of repository eg: fernandobhz/nodejs-boilerplate
 */
export const issues = (fullName, lambda) => fetchAllPages(`/repos/${fullName}/issues`, lambda, { state: "all" });

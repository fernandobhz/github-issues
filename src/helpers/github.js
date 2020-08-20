import axios from "axios";
import { GITHUB_API_ENDPOINT } from "../core/config";

const api = axios.create({
  baseURL: GITHUB_API_ENDPOINT,
});

/**
 * It'll fetch all pages of and resource in github api using http verb GET
 * @param {string} resource The resource that are you looking for, eg: /repos/facebook/react/issues
 * @param {Function} lambda An arrow function to transform results, you might not looking for entire result of github
 * @param {object} params The request params, that where you sould put query string parameters, there is no need to inform the per_page or page params
 */
const fetchAllPages = async (resource, lambda, params = {}) => {
  const results = [];

  const paramsWithPagination = {
    ...params,
    per_page: 100,
    page: 1,
  };

  /**
   * Loops with async call inside of it DON'T block the thred or event loop ou tasks queue
   * See my POC about it here: https://github.com/fernandobhz/poc-nodejs-for-await-blocking
   *
   * An possible improvement of that function would be requesting in parallel the first/next
   * 10 pages, and after analise if there is more pages or not, and keep making new requests
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
    const { data } = await api.get(resource, paramsWithPagination);

    /**
     * If the users pass an lambda (arrow functions in js)
     * We'll use that to reduce memory usage
     */
    if (lambda) results.push(...data.map(lambda));
    else results.push(...data);

    if (data.length < 100) break;
    else paramsWithPagination.page += 1;
  }

  return results;
};

/**
 * It'll perform a search on all repositories names on github.
 * WARNING: It'll only return the most popular results, since github api
 * limit this query with a timout, so, there is no guarentee that all repos will be returned
 * @param {string} name Part or complete name of a repository, eg: react
 */
export const search = async name => {
  const { data } = await api.get("/search/repositories", { params: { q: name } });
  return data;
};

/**
 * It'll list all issues for a given repository
 * @param {string} fullName The full name of repository eg: facebook/react
 */
export const issues = (fullName, lambda) => fetchAllPages(`/repos/${fullName}/issues`, lambda);

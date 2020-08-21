import * as helpers from "../../helpers";

/**
 * @swagger
 *
 * /repositories/search:
 *  get:
 *    tags:
 *      - Repository
 *    description: Search repository on github api
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: register
 *    parameters:
 *      - in: query
 *        name: term
 *        required: true
 *        description: The term to search for
 *        example: fernandobhz/nodejs-boilerplate
 *        scheme:
 *          type: string
 */
export const search = term => helpers.github.search(term, item => item.full_name);

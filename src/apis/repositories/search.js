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
 *        name: name
 *        required: true
 *        description: The term to search for
 *        example: react
 *        scheme:
 *          type: string
 */
export const search = async name => helpers.github.search(name, item => item.full_name);

import * as models from "../../models";
import * as helpers from "../../helpers";

/**
 * @swagger
 *
 * /projects/search:
 *  get:
 *    tags:
 *      - Project
 *    description: Search project on github api
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
 *        type: string
 *        example: react
 */
export const search = async name => {
  const searchResult = await helpers.github.search(name);
  const repos = searchResult.items.map(item => item.full_name);
  return repos;
}

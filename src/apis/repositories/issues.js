import * as models from "../../models";
import * as helpers from "../../helpers";

/**
 * @swagger
 *
 * /repositories/issues:
 *  get:
 *    tags:
 *      - Repository
 *    description: List all issues of repository
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: register
 */
export const issues = async name => {
  // get history from db
  // delivery it to the client
  return "WIP";
};

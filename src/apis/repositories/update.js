import * as helpers from "../../helpers";

/**
 * @swagger
 *
 * /repositories/update:
 *  post:
 *    tags:
 *      - Repository
 *    description: Force a stats update, the server will process this on background.
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: register
 */
export const update = async () => {
  /**
   * It's correct. I'll not wait for this end to release the client
   */
  helpers.issues.processEntireDatabase();
};

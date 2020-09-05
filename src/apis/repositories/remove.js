import * as models from "../../models";

/**
 * @swagger
 *
 * /repositories/remove:
 *  post:
 *    tags:
 *      - Repository
 *    description: Remove a repository from database
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: register
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        description: Request body
 *        schema:
 *          type: object
 *          required:
 *            - fullName
 *          properties:
 *            fullName:
 *              type: string
 *              example: fernandobhz/nodejs-boilerplate
 */
export const remove = fullName =>
  Promise.all([models.repositories.remove({ fullName }), models.issues.remove({ repository: fullName })]);

import * as models from "../../models";
import * as helpers from "../../helpers";
import { ExposableError } from "../../classes/errors";

/**
 * @swagger
 *
 * /projects/add:
 *  post:
 *    tags:
 *      - Project
 *    description: Add a project to database
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
 *            - name
 *          properties:
 *            name:
 *              type: string
 *              example: react
 */
export const add = async name => {
  const project = await models.projects.findOne({ name });
  if (project) throw new ExposableError("This project already exists in database");
  // Fire and forget the method to update the repository issues
  helpers.issues.processNewRepository(name);
  return models.projects.create({ name });
};

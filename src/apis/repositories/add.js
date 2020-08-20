import * as models from "../../models";
import * as helpers from "../../helpers";
import { ExposableError } from "../../classes/errors";

/**
 * @swagger
 *
 * /repositories/add:
 *  post:
 *    tags:
 *      - Repository
 *    description: Add a Repository to database
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
 *              example: react
 */
export const add = async fullName => {
  const existingRepository = await models.repositories.findOne({ fullName });
  if (existingRepository) throw new ExposableError("This repository already exists in database");
  const newRepository = await models.repositories.create({ fullName });
  // Fire and forget the method to update the repository issues
  helpers.issues.addNewRepository(newRepository);
  return newRepository;
};

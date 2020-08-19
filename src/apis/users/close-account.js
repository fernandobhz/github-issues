import * as models from "../../models";
import * as helpers from "../../helpers";
import { UnauthorizedError } from "../../classes/errors";

/**
 * @swagger
 *
 * /users/close-account:
 *  post:
 *    tags:
 *      - Users
 *    description: Close user account
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: register
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        description: The close account request body, request password again preventing xss
 *        schema:
 *          type: object
 *          required:
 *            - email
 *            - password
 *          properties:
 *            email:
 *              type: string
 *              example: bob@email.com
 *            password:
 *              type: string
 *              example: "12345678"
 */

export const closeAccount = async ({ email, password }) => {
  const user = await models.users.findOne({ email });
  if (!user) throw new UnauthorizedError();

  const isValid = await helpers.password.verify(password, user.password);
  if (!isValid) throw new UnauthorizedError();

  await models.users.findOneAndDelete({ email });
};

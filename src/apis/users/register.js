import * as models from "../../models";
import * as helpers from "../../helpers";

/**
 * @swagger
 *
 * /users/register:
 *  post:
 *    tags:
 *      - Users
 *    description: Register an user
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: register
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        description: The user registration request body
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - email
 *            - password
 *          properties:
 *            name:
 *              type: string
 *              example: Bob
 *            email:
 *              type: string
 *              example: bob@email.com
 *            password:
 *              type: string
 *              example: "12345678"
 */

export const register = async ({ name, email, password }) => {
  await models.users.create({
    name,
    email,
    password: await helpers.password.encrypt(password),
  });

  return helpers.jwt.sign(JSON.stringify({ name, email }));
};

import * as models from "../../models";

/**
 * @swagger
 *
 * /repositories/stats:
 *  get:
 *    tags:
 *      - Repository
 *    description: List all stats of repository, the stats is updated every hour
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: register
 */
export const stats = () =>
  models.issues.aggregate([{ $group: { _id: "$repository", avg: { $avg: "$age" }, std: { $stdDevPop: "$age" } } }]);

import * as models from "../../models";

/**
 * @swagger
 *
 * /repositories/stats:
 *  get:
 *    tags:
 *      - Repository
 *    description: List all stats of repository, the system will update the stats periodically according to the STATS_UPDATE_PERIODICITY env var, the avg and std unit is in milliseconds
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: register
 */
export const stats = () =>
  models.issues.aggregate([
    { $group: { _id: "$repository", qtd: { $max: "$number" }, avg: { $avg: "$age" }, std: { $stdDevPop: "$age" } } },
  ]);

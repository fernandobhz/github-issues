import * as models from "../models";
import { RUNNING_TESTS } from "./config";

export async function analytics(req, res, next) {
  if (RUNNING_TESTS) return next();

  await models.analytics.create({
    path: req.path,
    method: req.method,
    params: req.method === "GET" ? req.query : req.body,
    user: req.who?.email,
  });

  return next();
}

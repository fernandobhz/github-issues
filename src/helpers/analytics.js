import * as models from "../models";

export default async function analytics(req, res, next) {
  // if (process.argv[1].endsWith("mocha")) return next();

  await models.analytics.create({
    path: req.path,
    method: req.method,
    params: req.method === "GET" ? req.query : req.body,
    user: req.who?.email,
  });

  return next();
}

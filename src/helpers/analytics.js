import * as models from "../models";

export const register = (req, res, next) =>
  models.analytics
    .create({
      path: req.path,
      method: req.method,
      params: req.method === "GET" ? req.query : req.body,
    })
    .then(() => next());

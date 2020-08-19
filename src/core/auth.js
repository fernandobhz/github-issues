import * as helpers from "../helpers";
import { ExposableError } from "../classes/errors";

export function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new ExposableError("Access denied");
  }

  if (!authorization.startsWith("Bearer ")) {
    throw new ExposableError("Access denied");
  }

  const token = authorization.replace(/Bearer /g, "");

  req.auth = helpers.jwt.verify(token).catch(() => Promise.reject(new ExposableError("Access denied")));

  next();
}

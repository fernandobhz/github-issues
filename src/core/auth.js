import { UnauthorizedError } from "../classes/errors";

export const auth = (req, res, next) => {
  if (req.who) req.auth = req.who;
  else throw new UnauthorizedError();
  next();
};

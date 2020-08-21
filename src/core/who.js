import * as helpers from "../helpers";

export const who = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next();
  if (!authorization.startsWith("Bearer ")) return next();

  const token = authorization.replace(/Bearer /g, "");
  if (!token) return next();

  try {
    req.who = await helpers.jwt.verify(token);
  } catch (err) {
    /**
     * Proced without warning, here I only want to know who is calling me
     * There is another middleware called auth who will required this according
     */
  }

  return next();
};

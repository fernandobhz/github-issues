import jsonwebtoken from "jsonwebtoken";
import { promisify } from "util";
import { JWT_SECRET } from "../core/config";

const jwtSign = promisify(jsonwebtoken.sign);
const jwtVerify = promisify(jsonwebtoken.verify);

export const sign = payload => jwtSign(payload, JWT_SECRET);
export const verify = token => jwtVerify(token, JWT_SECRET);

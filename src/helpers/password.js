import bcrypt from "bcrypt";
import { BCRYPT_ROUNDS } from "../core/config";

export const encrypt = password => bcrypt.hash(password, BCRYPT_ROUNDS);

export const verify = (password, hashed) => bcrypt.compare(password, hashed);

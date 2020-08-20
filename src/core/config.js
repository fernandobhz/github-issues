export const PORT = Number(process.env.PORT || 3333);
export const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 10);
export const JWT_SECRET = process.env.JWT_SECRET || "1234567890";
export const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost/nodejs-boilerplate";
export const GITHUB_API_ENDPOINT = process.env.GITHUB_API_ENDPOINT || "https://api.github.com/";
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

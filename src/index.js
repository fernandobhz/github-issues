/* eslint-disable no-console */
import "dotenv/config";
import { app } from "./core/app";
import { connect } from "./core/database";
import { PORT } from "./core/config";

(async function main() {
  console.log(new Date(), "Initializing...");
  try {
    await connect();
    app.listen(PORT, () => console.log(new Date(), `Server up at port ${PORT}`));
  } catch (error) {
    console.error("Failed to start application", error);
  }
})();

/* eslint-disable no-console */
import "dotenv/config";
import { app } from "./core/app";
import { connect } from "./core/database";
import { PORT, STATS_UPDATE_PERIODICITY } from "./core/config";
import { processEntireDatabase } from "./helpers/issues";

(async function main() {
  console.log(new Date(), "Initializing...");
  try {
    await connect();
    app.listen(PORT, () => console.log(new Date(), `Server up at port ${PORT}`));

    // Background stats processing
    if (!process.argv[1].endsWith("mocha")) {
      // eslint-disable-next-line no-console
      console.log(`processEntireDatabase will be called every ${STATS_UPDATE_PERIODICITY} milliseconds`);
      setInterval(processEntireDatabase, STATS_UPDATE_PERIODICITY);
    }
  } catch (error) {
    console.error("Failed to start application", error);
  }
})();

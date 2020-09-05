/* eslint-disable no-console */
import "dotenv/config";
import { app } from "./core/app";
import { connect } from "./core/database";
import { PORT, STATS_UPDATE_PERIODICITY, RUNNING_TESTS, FIRST_STATS_UPDATE_DELAY } from "./core/config";
import { processEntireDatabase } from "./helpers/issues";

(async function main() {
  console.log(new Date(), "Initializing...");
  try {
    await connect();
    app.listen(PORT, () => console.log(new Date(), `Server up at port ${PORT}`));

    // Background stats processing
    if (!RUNNING_TESTS) {
      console.log(`The processEntireDatabase will start in ${FIRST_STATS_UPDATE_DELAY} milliseconds `);
      setTimeout(() => {
        // Fire and forget, do not await this
        processEntireDatabase();

        console.log(
          `The processEntireDatabase has been started and will repeat every ${STATS_UPDATE_PERIODICITY} milliseconds`
        );
        setInterval(processEntireDatabase, STATS_UPDATE_PERIODICITY);
      }, FIRST_STATS_UPDATE_DELAY);
    }
  } catch (error) {
    console.error("Failed to start application", error);
  }
})();

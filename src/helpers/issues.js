import * as models from "../models";
import * as github from "./github";

/**
 * Process one issues repository
 * @param {string} fullName The full name of repository, eg: facebook/react
 */
export const processNewRepository = async fullName => {
  const issues = await github.issues(fullName, item => ({
    id: item.id,
    project: fullName,
    title: item.title,
    number: item.number,
    created_at: item.created_at,
    closed_at: item.closed_at,
    age: item.closed_at ? item.closed_at - item.created_at : null,
  }));

  /**
   * That function should be called only when the user add an new repository to database
   * here I don't care about the results because I need to release the client as soon as possible
   * If It fails completely It's okay. We'll update the stats once a day thru a setInterval function
   */
  // eslint-disable-next-line no-console
  issues.map(issue => models.issues.create(issue).catch(console.error));
};

export const processEntireDatabase = async () => {
  //
};

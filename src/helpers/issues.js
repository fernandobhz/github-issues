import * as models from "../models";
import * as github from "./github";

const issueLambda = (issue, repository) => ({
  id: issue.id,
  repository: repository.fullName,
  title: issue.title,
  number: issue.number,
  created_at: issue.created_at,
  closed_at: issue.closed_at,
  age: issue.closed_at ? new Date(issue.closed_at) - new Date(issue.created_at) : null,
});

/**
 * Process one issues repository
 * @param {string} fullName The full name of repository, eg: facebook/react
 */
export const addNewRepository = async repository => {
  const issues = await github.issues(repository.fullName, issue => issueLambda(issue, repository));

  /**
   * That function should be called only when the user add an new repository to database
   * here I don't care about the results because I need to release the client as soon as possible
   * If It fails completely It's okay. We'll update the stats once a day thru a setInterval function
   */
  // eslint-disable-next-line no-console
  issues.map(issue => models.issues.create(issue).catch(console.error));
};

/**
 * It'll update the issues according the github api
 * @param {object} repository An mongoose repository instance
 */
const updateRepository = async repository => {
  const issues = await github.issues(repository.fullName, issue => issueLambda(issue, repository));

  await Promise.all(
    issues.map(async issue => {
      const existing = await models.issues.findOne({ repository: repository.fullName, number: issue.number });
      if (!existing) return models.issues.create(issue);
      existing.closed_at = issue.closed_at;
      existing.age = issue.age;
      return existing.save();
    })
  );
};

/**
 * That will be called every hour by app.js
 */
export const processEntireDatabase = async () => {
  // eslint-disable-next-line no-console
  console.log("Starting processEntireDatabase");

  const repositories = await models.repositories.find().catch(err => {
    // eslint-disable-next-line no-console
    console.log(err);
  });

  if (!repositories) return false;

  /*
   * Loops with async call inside of it DON'T block the thred or event loop ou tasks queue
   * See my POC about it here: https://github.com/fernandobhz/poc-nodejs-for-await-blocking
   */
  // eslint-disable-next-line no-restricted-syntax
  for (const repository of repositories) {
    /**
     * I need that each loop occurs after the previous one
     */
    // eslint-disable-next-line no-await-in-loop
    await updateRepository(repository).catch(err => {
      /**
       * Event with error on this repository keep processing others
       */
      // eslint-disable-next-line no-console
      console.error(err);
    });
  }

  // eslint-disable-next-line no-console
  console.log("Finishing successfulyy processEntireDatabase");
  return true;
};

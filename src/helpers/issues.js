/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
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

const issueUpsert = async issue => {
  const { repository, number } = issue;

  const existing = await models.issues.findOne({ repository, number });
  if (!existing) return models.issues.create(issue);

  existing.closed_at = issue.closed_at;
  existing.age = issue.age;
  return existing.save();
};

/**
 * It'll update the issues according the github api
 * @param {object} repository An mongoose repository instance
 */
export const updateRepository = async repository => {
  const issues = await github.issues(repository.fullName, issue => issueLambda(issue, repository));
  await Promise.all(issues.map(issueUpsert));
};

/**
 * That will be called every hour by app.js
 *
 * (1) Loops with async call inside of it DON'T block the thred or event loop ou tasks queue
 * See my POC about it here: https://github.com/fernandobhz/poc-nodejs-for-await-blocking
 * I need that each loop occurs after the previous one
 *
 */
export const processEntireDatabase = async () => {
  try {
    console.log("Starting processEntireDatabase");

    const repositories = await models.repositories.find();

    for (const repository of repositories) {
      await updateRepository(repository).catch(console.error);
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

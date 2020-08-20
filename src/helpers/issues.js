import * as models from "../models";
import * as github from "./github";
/**
 * Process one issues repository
 * @param {string} fullName The full name of repository, eg: facebook/react
 */
export const processOneRepository = async fullName => {
  const issues = await github.issues(fullName, item => ({
    id: item.id,
    project: fullName,
    title: item.title,
    number: item.number,
    created_at: item.created_at,
    closed_at: item.closed_at,
  }));

  await Promise.all(
    issues.map(async issue => {
      const existing = await models.issues.findOne({ id: issue.id });
      if (!existing) await models.issues.create(issue);
      if (!existing.closed_at) {
        existing.closed_at = issue.closed_at;
        existing.age = existing.closed_at - existing.created_at;
        await existing.save();
      }
    })
  );
};

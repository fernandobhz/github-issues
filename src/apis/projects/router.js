import { Router } from "express";
import { add } from "./add";
import { search } from "./search";

export const router = Router();

/**
 * Seach endpoint, client should perform search libs by name here
 * I'm assuming here that frontend will open a dropdown menu after user hit enter with possible values
 */
router.get("/search", (req, res, next) =>
  search(req.query.name)
    .then(data => res.json(data))
    .catch(next)
);

/**
 * Add endpoint, client should ask for their addition here providing the fullname of repositoy
 */
router.post("/add", (req, res, next) =>
  add(req.body.name)
    .then(data => res.status(201).json(data))
    .catch(next)
);

/**
 * All database issues
 */
router.get("/issues", (req, res) => {
  res.send("WIP");
});

import { Router } from "express";
import { add } from "./add";
import { search } from "./search";

export const router = Router();

/**
 * Seach endpoint, client should perform search libs by name here
 */
router.get("/search", (req, res, next) =>
  search(req.query.name)
    .then(data => res.json(data))
    .catch(next)
);

/**
 * Add endpoint, with fullname of lib, client should ask for their addition here
 */
router.post("/add", (req, res, next) =>
  add(req.body.name)
    .then(data => res.status(201).json(data))
    .catch(next)
);

/**
 * Project issues endpoint, this perform a query on github to get the current issues
 * After, this endpoint will store the data on database
 * Finally return the current results to client
 */
router.get("/:project/issues", (req, res) => {
  res.send("WIP");
}); // github issues

/**
 * Project issues history, this endpoint will collect all history issues from database
 */
router.get("/:project/issues/history", (req, res) => {
  res.send("WIP");
}); // get list stored data

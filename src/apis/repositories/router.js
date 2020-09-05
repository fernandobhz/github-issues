import { Router } from "express";
import { add } from "./add";
import { search } from "./search";
import { stats } from "./stats";
import { update } from "./update";
import { remove } from "./remove";

export const router = Router();

/**
 * Seach endpoint, client should perform search libs by name here
 * I'm assuming here that frontend will open a dropdown menu after user hit enter with possible values
 */
router.get("/search", (req, res, next) =>
  search(req.query.term)
    .then(data => res.json(data))
    .catch(next)
);

/**
 * Add endpoint, client should ask for their addition here providing the fullname of repositoy
 */
router.post("/add", (req, res, next) =>
  add(req.body.fullName)
    .then(data => res.status(201).json(data))
    .catch(next)
);

/**
 * All repositories stats
 */
router.get("/stats", (req, res, next) =>
  stats()
    .then(data => res.json(data))
    .catch(next)
);

/**
 * All repositories stats
 */
router.post("/update", (req, res, next) =>
  update()
    .then(() => res.status(204).end())
    .catch(next)
);

/**
 * Remove endpoint
 */
router.post("/remove", (req, res, next) =>
  remove(req.body.fullName)
    .then(() => res.status(204).end())
    .catch(next)
);

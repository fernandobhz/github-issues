import { Router } from "express";
import { who } from "./who";
import { auth } from "./auth";
import * as apis from "../apis";
import * as helpers from "../helpers";

export const router = Router();

router.use(who);

// We don't want to log plain password of users, so that must be before the analytics
router.use("/users", apis.users.router);

// Analytics
router.use(helpers.analytics);

// The regular app routes
router.use("/repositories", auth, apis.repositories.router);

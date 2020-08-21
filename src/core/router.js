import { Router } from "express";
import { who } from "./who";
import { auth } from "./auth";
import { analytics } from "./analytics";
import * as apis from "../apis";

export const router = Router();

router.use(who);

// We don't want to log plain password of users, so that must be before the analytics
router.use("/users", apis.users.router);

// Analytics
router.use(analytics);

// The regular app routes
router.use("/repositories", auth, apis.repositories.router);

import { Router } from "express";
import { auth } from "../../core/auth";
import { register } from "./register";
import { login } from "./login";
import { closeAccount } from "./close-account";

export const router = Router();

router.post("/register", (req, res, next) =>
  register({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
    .then(data => res.json(data))
    .catch(next)
);

router.post("/login", (req, res, next) =>
  login({
    email: req.body.email,
    password: req.body.password,
  })
    .then(data => res.json(data))
    .catch(next)
);

router.post("/close-account", auth, (req, res, next) =>
  closeAccount({
    email: req.body.email,
    password: req.body.password,
  })
    .then(() => res.status(204).end())
    .catch(next)
);

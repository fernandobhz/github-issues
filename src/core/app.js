import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import { swagger } from "./swagger";
import { errorHandler } from "./error-handler";
import { router } from "./router";

export const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(swagger);
app.use(router);
app.use(errorHandler);

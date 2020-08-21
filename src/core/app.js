import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { errorHandler } from "./error-handler";
import { who } from "./who";
import { auth } from "./auth";
import * as apis from "../apis";
import * as helpers from "../helpers";
import { STATS_UPDATE_PERIODICITY } from "./config";

export const app = express();

/**
 * Usual express uses
 */
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(compression());

/**
 * Swagger with jsdoc
 */
const swaggerSpec = swaggerJSDoc({
  definition: {
    swagger: "2.0",
    info: {
      title: "Swagger",
      version: "1.0.0",
    },
    securityDefinitions: {
      bearerAuth: {
        in: "header",
        name: "Authorization",
        type: "apiKey",
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/apis/**/*.js"],
});

app.get("/api-docs.json", (req, res) => res.json(swaggerSpec));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (req, res) => res.redirect("/api-docs"));
app.use(who);

/**
 * We don't to log plain password of users
 * So that must be before the analytics
 */
app.use("/users", apis.users.router);

/**
 * Analytics
 */
app.use(helpers.analytics.register);

/**
 * The regular app routes
 */
app.use("/repositories", auth, apis.repositories.router);

/**
 * Generic error hanlder
 */
app.use(errorHandler);

/**
 * Background statas processing
 */
setInterval(helpers.issues.processEntireDatabase, STATS_UPDATE_PERIODICITY);

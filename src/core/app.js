import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { errorHandler } from "./error-handler";
import * as apis from "../apis";

export const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(compression());

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
app.use("/users", apis.users.router);
app.use(errorHandler);

import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { RUNNING_TESTS } from "./config";

export const swagger = Router();

if (!RUNNING_TESTS) {
  // Swagger with jsdoc
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

  swagger.get("/api-docs.json", (req, res) => res.json(swaggerSpec));
  swagger.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  swagger.get("/", (req, res) => res.redirect("/api-docs"));
}

import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

export const swagger = Router();

if (!process.argv[1].endsWith("mocha")) {
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

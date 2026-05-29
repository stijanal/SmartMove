import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/error-handler";
import { notFoundHandler } from "./middlewares/not-found";
import { requestLogger } from "./middlewares/request-logger";
import { apiRouter } from "./routes";
import { getOpenApiPath, getOpenApiSpec } from "./lib/swagger";

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: env.CORS_ORIGIN === "*" ? true : env.CORS_ORIGIN
    })
  );
  app.use(helmet());
  app.use(express.json());
  app.use(requestLogger);

  app.get("/", (_req, res) => {
    res.json({
      success: true,
      message: "SmartMove backend je aktivan.",
      data: {
        apiBaseUrl: "/api/v1",
        swaggerUi: "/api-docs",
        openApiYaml: "/api-docs.yaml",
        openApiJson: "/api-docs.json"
      }
    });
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(getOpenApiSpec()));
  app.get("/api-docs.yaml", (_req, res) => {
    res.sendFile(getOpenApiPath());
  });
  app.get("/api-docs.json", (_req, res) => {
    res.json(getOpenApiSpec());
  });

  app.use("/api/v1", apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export const app = createApp();

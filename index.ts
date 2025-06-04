import "./utils/config.ts";
import * as Sentry from "@sentry/node";
import express from "express";
import { handleError } from "./middlewares/error.ts";
import connectDB from "./utils/db.ts";
import setupRoutes from "./routes/index.ts";

export const app = express();

// Middlewares
app.use(express.json());

// Routes
setupRoutes(app);

// Sentry setup
Sentry.setupExpressErrorHandler(app);

// Error handler
app.use(handleError);

const PORT = process.env.NODE_ENV === "test" ? 8081 : process.env.PORT ?? 8080;
export const server = app.listen(PORT, () => {
  connectDB(
    process.env.NODE_ENV === "test"
      ? process.env.MONGODB_TEST_URI!
      : process.env.MONGODB_URI!
  );
  console.log(`Started server at http://localhost:${PORT}`);
});

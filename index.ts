import "./utils/config.ts";
import * as Sentry from "@sentry/node";
import express from "express";
import { handleError } from "./middlewares/error.ts";
import connectDB from "./utils/db.ts";
import setupRoutes from "./routes/index.ts";

const app = express();

// Middlewares
app.use(express.json());

// Routes
setupRoutes(app);

// Sentry setup
Sentry.setupExpressErrorHandler(app);

// Error handler
app.use(handleError);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  connectDB(process.env.MONGODB_URI);
  console.log(`Started server at http://localhost:${PORT}`);
});

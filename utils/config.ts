import "express-async-errors";
import * as Sentry from "@sentry/node";
import { configDotenv } from "dotenv";

configDotenv();
const { MONGODB_URI, JWT_SECRET, SENTRY_DNS } = process.env;

if (!MONGODB_URI || !JWT_SECRET || !SENTRY_DNS)
  throw new Error("FATAL ERROR: environmental variables are not defined.");

Sentry.init({
  dsn: process.env.SENTRY_DNS,

  // Set sampling rate for profiling - this is evaluated only once per SDK.init
  profileSessionSampleRate: 1.0,
});

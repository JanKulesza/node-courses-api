import * as Sentry from "@sentry/node";
import { configDotenv } from "dotenv";

configDotenv();

Sentry.init({
  dsn: process.env.SENTRY_DNS,

  // Set sampling rate for profiling - this is evaluated only once per SDK.init
  profileSessionSampleRate: 1.0,
});

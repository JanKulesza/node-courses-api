import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://7195ca86b5705e5cca51fafdd68fb17c@o4509020840263680.ingest.de.sentry.io/4509020845506640",

  // Set sampling rate for profiling - this is evaluated only once per SDK.init
  profileSessionSampleRate: 1.0,
});

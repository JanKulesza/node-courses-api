import { configDotenv } from "dotenv";
import express from "express";
import logger from "./middlewares/logger.ts";
import { coursesRouter } from "./routes/courses.ts";
import { genresRouter } from "./routes/genres.ts";

configDotenv();

const app = express();

app.use(express.json());

if (app.get("env") === "development") {
  console.log("Development...");
}

app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// /api/courses
app.use("/api/courses", coursesRouter);

// /api/genres
app.use("/api/genres", genresRouter);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`Started server at http://localhost:${PORT}`);
});

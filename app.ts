import { configDotenv } from "dotenv";
import express from "express";
import logger from "./middlewares/logger.ts";
import { coursesRouter } from "./routes/courses.ts";
import { genresRouter } from "./routes/genres.ts";
import connectDB from "./utils/connectDB.ts";
import { authorsRouter } from "./routes/author.ts";
import { usersRouter } from "./routes/user.ts";
import { authRouter } from "./routes/auth.ts";
import { handleError } from "./middlewares/error.ts";

configDotenv();

const app = express();

// Middlewares
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

// /api/authors
app.use("/api/authors", authorsRouter);

// /api/users
app.use("/api/users", usersRouter);

// /api/auth
app.use("/api/auth", authRouter);

// Error handler
app.use(handleError);

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  connectDB(process.env.MONGODB_URI);
  console.log(`Started server at http://localhost:${PORT}`);
});

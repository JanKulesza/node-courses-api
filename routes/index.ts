import { type Application } from "express";
import { coursesRouter } from "./courses.ts";
import { genresRouter } from "./genres.ts";
import { authorsRouter } from "./author.ts";
import { usersRouter } from "./user.ts";
import { authRouter } from "./auth.ts";

const setupRoutes = (app: Application) => {
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
};

export default setupRoutes;

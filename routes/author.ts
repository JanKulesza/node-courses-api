// /api/authors
import { Router } from "express";
import { createAuthor, getAuthors } from "../controllers/authors.ts";
import auth from "../middlewares/auth.ts";

const router = Router();

router.get("/", getAuthors);

// Protected routes
router.post("/", auth, createAuthor);

export { router as authorsRouter };

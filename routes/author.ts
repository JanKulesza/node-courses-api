// /api/authors
import { Router } from "express";
import { createAuthor, getAuthors } from "../controllers/authors.ts";

const router = Router();

router.get("/", getAuthors);
router.post("/", createAuthor);

export { router as authorsRouter };

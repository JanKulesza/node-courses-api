// /api/authors
import { Router } from "express";
import { createAuthor, getAuthors } from "../controllers/authors.ts";
import auth from "../middlewares/auth.ts";
import catchErrors from "../middlewares/catchErrors.ts";

const router = Router();

router.get("/", catchErrors(getAuthors));

// Protected routes
router.post("/", auth, catchErrors(createAuthor));

export { router as authorsRouter };

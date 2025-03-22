// /api/genres
import { Router } from "express";
import {
  createGenre,
  deleteGenre,
  getGenre,
  getGenres,
  updateGenre,
} from "../controllers/genres.ts";
import auth from "../middlewares/auth.ts";
import isAdmin from "../middlewares/admin.ts";
import catchErrors from "../middlewares/catchErrors.ts";

const router = Router();

router.get("/", catchErrors(getGenres));
router.get("/:id", catchErrors(getGenre));

// Protected routes
router.post("/", auth, catchErrors(createGenre));
router.put("/:id", auth, catchErrors(updateGenre));

// Admin routes
router.delete("/:id", auth, isAdmin, catchErrors(deleteGenre));

export { router as genresRouter };

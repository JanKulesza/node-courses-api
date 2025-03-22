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

const router = Router();

router.get("/", getGenres);
router.get("/:id", getGenre);

// Protected routes
router.post("/", auth, createGenre);
router.put("/:id", auth, updateGenre);

// Admin routes
router.delete("/:id", auth, isAdmin, deleteGenre);

export { router as genresRouter };

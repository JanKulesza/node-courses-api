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
import validateObjectId from "../middlewares/validateObjectId.ts";

const router = Router();

router.get("/", getGenres);
router.get("/:id", validateObjectId, getGenre);

// Protected routes
router.post("/", auth, createGenre);
router.put("/:id", auth, validateObjectId, updateGenre);

// Admin routes
router.delete("/:id", auth, isAdmin, validateObjectId, deleteGenre);

export { router as genresRouter };

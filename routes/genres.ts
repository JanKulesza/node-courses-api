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

const router = Router();

router.get("/", getGenres);
router.get("/:id", getGenre);

// Protected routes
router.post("/", auth, createGenre);
router.put("/:id", auth, updateGenre);
router.delete("/:id", auth, deleteGenre);

export { router as genresRouter };

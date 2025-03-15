// /api/genres
import { Router } from "express";
import {
  createGenre,
  deleteGenre,
  getGenre,
  getGenres,
  updateGenre,
} from "../controllers/genres.ts";

const router = Router();

router.get("/", getGenres);
router.post("/", createGenre);
router.get("/:id", getGenre);
router.put("/:id", updateGenre);
router.delete("/:id", deleteGenre);

export { router as genresRouter };

// /api/genres
import { Router } from "express";
import {
  genreInputSchema,
  type GenreInputType,
} from "../utils/schema/index.ts";

const router = Router();

let genres = [
  { id: 1, name: "genre 1" },
  { id: 2, name: "genre 2" },
];

router.get("/", (req, res) => {
  res.json(genres);
});

router.post("/", (req, res) => {
  const validation = genreInputSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }

  const { name } = req.body as GenreInputType;
  const newGenre = { id: genres.length + 1, name };
  genres.push(newGenre);

  res.json(newGenre);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const genre = genres.find((g) => g.id === +id);
  if (!genre) {
    res.status(404).json({ error: "Genre not found" });
    return;
  }

  res.json(genre);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;

  const genre = genres.find((g) => g.id === +id);
  if (!genre) {
    res.status(404).json({ error: "Genre not found" });
    return;
  }

  const validation = genreInputSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }

  const { name } = req.body as GenreInputType;
  const updatedGenre = { id: genre.id, name };

  res.json(updatedGenre);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const genre = genres.find((g) => g.id === +id);
  if (!genre) {
    res.status(404).json({ error: "Genre not found" });
    return;
  }

  const validation = genreInputSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }

  genres = genres.filter((g) => g.id !== +id);

  res.json({});
});

export { router as genresRouter };

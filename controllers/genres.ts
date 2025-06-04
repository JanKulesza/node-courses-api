import Genre from "../models/genre.ts";
import { type Response, type Request } from "express";
import {
  genreInputSchema,
  type GenreInputType,
} from "../utils/schema/genre.ts";

export const getGenres = async (req: Request, res: Response) => {
  const genres = await Genre.find();
  res.json(genres);
};

export const getGenre = async (req: Request, res: Response) => {
  const { id } = req.params;

  const genre = await Genre.findById(id);
  if (!genre) {
    res.status(404).json({ error: "Genre not found" });
    return;
  }

  res.json(genre);
};

export const createGenre = async (req: Request, res: Response) => {
  const validation = genreInputSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }

  const { name } = req.body as GenreInputType;
  const newGenre = new Genre({
    name,
  });
  await newGenre.save();
  res.status(201).json(newGenre);
};

export const updateGenre = async (req: Request, res: Response) => {
  const { id } = req.params;

  const genre = await Genre.findById(id);
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
  const updatedGenre = await Genre.findByIdAndUpdate(id, { name });

  res.json(updatedGenre);
};

export const deleteGenre = async (req: Request, res: Response) => {
  const { id } = req.params;

  const genre = await Genre.findById(id);
  if (!genre) {
    res.status(404).json({ error: "Genre not found" });
    return;
  }

  const validation = genreInputSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }

  await genre.deleteOne();

  res.json({});
};

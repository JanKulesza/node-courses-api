import Genre from "../models/genre.ts";
import {
  genreInputSchema,
  type GenreInputType,
} from "../utils/schema/genre.ts";
import { handleError } from "../utils/handleError.ts";

export const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    handleError(res, error);
  }
};

export const getGenre = async (req, res) => {
  const { id } = req.params;

  try {
    const genre = await Genre.findById(id);
    if (!genre) {
      res.status(404).json({ error: "Genre not found" });
      return;
    }

    res.json(genre);
  } catch (error) {
    handleError(res, error);
  }
};

export const createGenre = async (req, res) => {
  const validation = genreInputSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }

  const { name } = req.body as GenreInputType;
  const newGenre = new Genre({
    name,
  });
  try {
    await newGenre.save();
    res.json(newGenre);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateGenre = async (req, res) => {
  const { id } = req.params;

  try {
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
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteGenre = async (req, res) => {
  const { id } = req.params;

  try {
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
  } catch (error) {
    handleError(res, error);
  }
};

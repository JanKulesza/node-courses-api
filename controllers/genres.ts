import { MongooseError } from "mongoose";
import Genre from "../models/genre.ts";
import {
  genreInputSchema,
  type GenreInputType,
} from "../utils/schema/genre.ts";

export const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occured." });
    if (error instanceof MongooseError) return console.log(error.message);
    console.log(error);
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
    res.status(500).json({ error: "An unexpected error occured." });
    if (error instanceof MongooseError) return console.log(error.message);
    console.log(error);
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
    res.status(500).json({ error: "An unexpected error occured." });
    if (error instanceof MongooseError) return console.log(error.message);
    console.log(error);
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
    res.status(500).json({ error: "An unexpected error occured." });
    if (error instanceof MongooseError) return console.log(error.message);
    console.log(error);
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
    res.status(500).json({ error: "An unexpected error occured." });
    if (error instanceof MongooseError) return console.log(error.message);
    console.log(error);
  }
};

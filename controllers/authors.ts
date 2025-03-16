import Author from "../models/author.ts";
import { type Request, type Response } from "express";
import { handleError } from "../utils/handleError.ts";
import {
  authorInputSchema,
  type AuthorInputType,
} from "../utils/schema/author.ts";

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    handleError(res, error);
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  const validation = authorInputSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }

  const { name, website, bio } = req.body as AuthorInputType;
  const author = new Author({ name, website, bio });

  try {
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    handleError(res, error);
  }
};

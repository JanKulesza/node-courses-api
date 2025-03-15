import { type Response } from "express";
import { MongooseError } from "mongoose";

export const handleError = (res: Response, error) => {
  res.status(500).json({ error: "An unexpected error occured." });
  if (error instanceof MongooseError) return console.log(error.message);
  console.log(error);
};

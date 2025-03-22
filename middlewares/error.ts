import { type Response, type Request } from "express";
import { MongooseError } from "mongoose";

export const handleError = (err: Error, req: Request, res: Response) => {
  res.status(500).json({ error: "An unexpected error occured." });
  if (err instanceof MongooseError) return console.log(err.message);
  console.log(err);
};

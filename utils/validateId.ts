import mongoose from "mongoose";
import { type Response } from "express";

export const validateId = (id: string, res: Response) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
};

import { type Request, type Response, type NextFunction } from "express";
import mongoose from "mongoose";

const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  next();
};

export default validateObjectId;

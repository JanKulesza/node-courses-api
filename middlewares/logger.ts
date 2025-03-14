import { type NextFunction } from "express";

const logger = (req, res, next: NextFunction) => {
  console.log("Logging...");
  next();
};

export default logger;

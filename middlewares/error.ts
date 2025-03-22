import { type Response, type Request, type NextFunction } from "express";
import { MongooseError } from "mongoose";

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  console.log("HANDLE ERROR");

  // Log the error
  if (err instanceof MongooseError) {
    console.log("Mongoose Error:", err.message);
  } else {
    console.log("Unexpected Error:", err.message);
  }

  // Send a response
  res.status(500).json({ error: "An unexpected error occurred." });
};

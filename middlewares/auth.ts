import { type Request, type Response, type NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({ error: "Access denied. Unauthorized user." });
    return;
  }
  if (!process.env.JWT_SECRET) {
    res.status(500).json({ error: "Unexpected error occurred." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded as jwt.JwtPayload;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ error: "Invalid token." });
      return;
    }
    res.status(500).json({ error: "Unexpected error occurred." });
  }
};

export default auth;

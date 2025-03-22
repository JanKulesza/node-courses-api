import { type NextFunction, type Request, type Response } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.isAdmin) {
    res.status(403).json({ error: "Access forbidden." });
    return;
  }
  next();
};

export default isAdmin;

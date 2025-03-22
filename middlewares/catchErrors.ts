import { type NextFunction, type Request, type Response } from "express";

type AsyncRequestHandler = (req: Request, res: Response) => Promise<void>;

function catchErrors(handler: AsyncRequestHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}

export default catchErrors;

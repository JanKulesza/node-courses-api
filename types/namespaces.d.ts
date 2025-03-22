import { type JwtPayload } from "jsonwebtoken";
import "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
}
declare module "jsonwebtoken" {
  export interface JwtPayload {
    _id: string;
    isAdmin: boolean;
  }
}

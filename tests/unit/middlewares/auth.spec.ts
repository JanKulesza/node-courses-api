import { beforeAll, describe, expect, it, jest } from "@jest/globals";
import User from "../../../models/user.ts";
import auth from "../../../middlewares/auth.ts";
import { type Request, type Response, type NextFunction } from "express";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";

describe("auth middleware", () => {
  beforeAll(() => {
    configDotenv();
  });
  it("should populate req.user with the payload of valid JWT", () => {
    const user = {
      _id: new mongoose.Types.ObjectId().toString(),
      isAdmin: true,
    };
    const token = new User(user).generateAuthToken();

    const req = {
      header: jest.fn().mockReturnValue(token),
    } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});

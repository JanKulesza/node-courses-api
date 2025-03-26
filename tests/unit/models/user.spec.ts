import { describe, expect, it } from "@jest/globals";
import User from "../../../models/user.ts";
import * as jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

describe("user.generateAuthToken", () => {
  it("should return a valid JWT", () => {
    const payload = {
      _id: new mongoose.Types.ObjectId().toString(),
      isAdmin: true,
    };
    const user = new User(payload);
    const token = user.generateAuthToken();

    if (!process.env.JWT_SECRET)
      throw new Error("JWT_SECRET is not specified.");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    expect(decoded).toMatchObject(payload);
  });
});

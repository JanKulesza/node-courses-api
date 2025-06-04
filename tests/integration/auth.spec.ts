import { afterAll, beforeEach, describe, expect, it } from "@jest/globals";
import { app, server } from "../../index.ts";
import request from "supertest";
import User from "../../models/user.ts";
import mongoose from "mongoose";

describe("auth middleware", () => {
  let token = "";

  const exec = () =>
    request(app)
      .post("/api/genres")
      .set("Authorization", token)
      .send({ name: "genre1" });

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  afterAll(async () => {
    server.close();
    await mongoose.disconnect();
  }, 500);

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(201);
  });
});

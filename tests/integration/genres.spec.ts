import { afterAll, beforeEach, describe, expect, it } from "@jest/globals";
import request from "supertest";
import { app, server } from "../../index.ts";
import Genre from "../../models/genre.ts";
import mongoose from "mongoose";
import User from "../../models/user.ts";

const ENDPOINT = "/api/genres";

describe(ENDPOINT, () => {
  afterAll(async () => {
    server.close();
    await mongoose.disconnect();
  }, 500);

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.insertMany([{ name: "genre1" }, { name: "genre2" }]);

      const response = await request(app).get(ENDPOINT);

      if (!Array.isArray(response.body)) throw new Error();
      expect(response.status).toBe(200);
      expect(response.body.some((g) => g.name === "genre1")).toBe(true);
      expect(response.body.some((g) => g.name === "genre2")).toBe(true);
    });
  });

  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      const savedGenre = await genre.save();

      const response = await request(app).get(`${ENDPOINT}/${savedGenre._id}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({ name: "genre1" });
    });
    it("should return genre not found if invalid id is passed", async () => {
      const response = await request(app).get(
        `${ENDPOINT}/${new mongoose.Types.ObjectId()}`
      );
      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({ error: "Genre not found" });
    });
    it("should return bad request if id is invalid format is passed", async () => {
      const response = await request(app).get(`${ENDPOINT}/1`);
      expect(response.status).toBe(400);
      expect(response.body).toMatchObject({ error: "Invalid id" });
    });
  });

  describe("POST /", () => {
    let token = "";
    let name = "";

    const exec = () =>
      request(app)
        .post("/api/genres")
        .set("Authorization", token)
        .send({ name });

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is less than 3 characters", async () => {
      name = "12";
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save the genre if it is valid", async () => {
      const res = await exec();

      const [genre] = await Genre.find({ name: "genre1" });
      expect(genre).toMatchObject({ name: "genre1" });
      expect(res.status).toBe(201);
    });

    it("should return genre if it is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
      expect(res.status).toBe(201);
    });
  });
});

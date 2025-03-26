import { afterEach, describe, expect, it } from "@jest/globals";
import request from "supertest";
import { app } from "../../index.ts";
import Genre from "../../models/genre.ts";

const ENDPOINT = "/api/genres";

describe(ENDPOINT, () => {
  afterEach(async () => {
    await Genre.collection.deleteMany();
  });
  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);

      const response = await request(app).get(ENDPOINT);

      if (!Array.isArray(response.body)) throw new Error();
      expect(response.status).toBe(200);
      expect(response.body.some((g) => g.name === "genre1")).toBe(true);
      expect(response.body.some((g) => g.name === "genre2")).toBe(true);
    });
  });
});

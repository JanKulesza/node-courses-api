import { z } from "zod";

export const courseInputSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(3, "Name is too short."),
});

export type CourseInputType = z.infer<typeof courseInputSchema>;

export const genreInputSchema = z.object({
  name: z
    .string({ required_error: "Genre is required" })
    .min(3, "Provide correct genre"),
});

export type GenreInputType = z.infer<typeof genreInputSchema>;

import { z } from "zod";

export const courseInputSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(3, "Name is too short."),
  author: z
    .string({ required_error: "Name is required." })
    .min(3, "Name is too short."),
  tags: z
    .array(z.string(), { required_error: "Tags are required" })
    .min(1, "Provide at least one tag."),
  isPublished: z.boolean({ required_error: "Published status is required." }),
});

export type CourseInputType = z.infer<typeof courseInputSchema>;

export const genreInputSchema = z.object({
  name: z
    .string({ required_error: "Genre is required" })
    .min(3, "Provide correct genre"),
});

export type GenreInputType = z.infer<typeof genreInputSchema>;

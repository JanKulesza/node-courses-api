import { z } from "zod";

export const genreInputSchema = z.object({
  name: z
    .string({ required_error: "Genre is required" })
    .min(3, "Provide correct genre"),
});

export type GenreInputType = z.infer<typeof genreInputSchema>;

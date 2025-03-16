import { z } from "zod";

export const authorInputSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(3, "Enter valid name."),
  website: z
    .string({ required_error: "Website url is required." })
    .url("Provide correct website url."),
  bio: z.string().optional(),
});

export type AuthorInputType = z.infer<typeof authorInputSchema>;

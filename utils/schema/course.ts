import { z } from "zod";

export enum CourseCategory {
  WEB = "Web",
  REMOTE = "Remote",
  STATIONARY = "Stationary",
}

const baseSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(3, "Name is too short."),
  author: z
    .string({ required_error: "Name is required." })
    .min(3, "Name is too short."),
  category: z.nativeEnum(CourseCategory, { message: "Invalid Category." }),
  tags: z
    .array(z.string(), { required_error: "Tags are required" })
    .min(1, "Provide at least one tag."),
});

const priceRequiredSchema = z.object({
  isPublished: z.literal(true),
  price: z
    .number({ required_error: "Price is required" })
    .min(0, "Provide correct price."),
});

const priceNonRequiredSchema = z.object({
  isPublished: z.literal(false),
  price: z.number().min(0, "Provide correct price.").optional(),
});

export const courseInputSchema = z
  .discriminatedUnion("isPublished", [
    priceRequiredSchema,
    priceNonRequiredSchema,
  ])
  .and(baseSchema);

export type CourseInputType = z.infer<typeof courseInputSchema>;

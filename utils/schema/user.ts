import { z } from "zod";

export const userInputSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .min(3, "Please provide valid name."),
  email: z
    .string({ required_error: "Email is required" })
    .email("Please provide valid email."),
  password: z
    .string({ required_error: "Password is required" })
    .min(4, "Password should be at least 4 characters long."),
  isAdmin: z.boolean({ required_error: "User role is required." }),
});

export type UserInputType = z.infer<typeof userInputSchema>;

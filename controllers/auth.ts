import { type Request, type Response } from "express";
import { z } from "zod";
import { compare } from "bcrypt";
import User from "../models/user.ts";

const authSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email("Please enter valid email."),
  password: z.string({ required_error: "Password is required." }),
});

type AuthType = z.infer<typeof authSchema>;

export const login = async (req: Request, res: Response) => {
  const validation = await authSchema.safeParseAsync(req.body);
  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }

  const { email, password } = req.body as AuthType;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({ error: "Invalid email." });
    return;
  }

  const isValidPassword = await compare(password, user.password);
  if (!isValidPassword) {
    res.status(400).json({ error: "Invalid password." });
    return;
  }

  const token = user.generateAuthToken();

  res.setHeader("Authorization", token).json({ token });
};

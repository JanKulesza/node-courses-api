import { type Request, type Response } from "express";
import { z } from "zod";
import { handleError } from "../utils/handleError.ts";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.ts";

const authSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email("Please enter valid email."),
  password: z.string({ required_error: "Password is required." }),
});

type AuthType = z.infer<typeof authSchema>;

export const login = async (req: Request, res: Response) => {
  try {
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
    if (!process.env.JWT_SECRET) throw new Error("Couldn't authenticate user.");

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET
    );

    res.json({ token });
  } catch (error) {
    handleError(res, error);
  }
};

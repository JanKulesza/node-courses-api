import { type Request, type Response } from "express";
import User from "../models/user.ts";
import { handleError } from "../utils/handleError.ts";
import { validateId } from "../utils/validateId.ts";
import { userInputSchema, type UserInputType } from "../utils/schema/user.ts";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    handleError(res, error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    validateId(id, res);
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }
    res.json(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const validation = userInputSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }
  const { name, email, password } = req.body as UserInputType;

  const user = new User({ name, email, password });
  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateId(id, res);
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    const validation = userInputSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json(validation.error.errors);
      return;
    }
    const { name, email, password } = req.body as UserInputType;

    user.set({
      name,
      email,
      password,
    });
    await user.save();
    res.json(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  validateId(id, res);

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    await user.deleteOne();
    res.json({});
  } catch (error) {
    handleError(res, error);
  }
};

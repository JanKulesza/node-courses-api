import { type Request, type Response } from "express";
import User from "../models/user.ts";
import { handleError } from "../utils/handleError.ts";
import { validateId } from "../utils/validation.ts";
import { userInputSchema, type UserInputType } from "../utils/schema/user.ts";
import { hash } from "bcrypt";

const formatReturnedUser = (user: object, pick: string[]) => {
  const returnedUser = {};
  for (const key in user) {
    if (!pick.includes(key)) continue;
    returnedUser[key] = user[key];
  }
  return returnedUser;
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users.map((u) => formatReturnedUser(u, ["name", "_id", "email"])));
  } catch (error) {
    handleError(res, error);
  }
};

export const getUser = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: "Access denied." });
    return;
  }
  const { _id } = req.user;
  validateId(_id, res);
  try {
    const user = await User.findById(_id).$where("-password");
    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }
    res.json(formatReturnedUser(user, ["name", "_id", "email"]));
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

  try {
    const userExists = !!(await User.findOne({ email }));
    if (userExists) {
      res.status(400).json({ error: "User already exists." });
      return;
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    const token = user.generateAuthToken();
    res
      .setHeader("Authorization", token)
      .status(201)
      .json(formatReturnedUser(user, ["name", "_id", "email"]));
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
    res.json(formatReturnedUser(user, ["name", "_id", "email"]));
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

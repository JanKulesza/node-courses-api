// /api/users
import { Router } from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/user.ts";
import auth from "../middlewares/auth.ts";

const router = Router();

router.get("/", getUsers);

// Protected routes
router.get("/me", auth, getUser);
router.post("/", auth, createUser);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

export { router as usersRouter };

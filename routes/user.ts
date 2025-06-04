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
import validateObjectId from "../middlewares/validateObjectId.ts";

const router = Router();

router.get("/", getUsers);

// Protected routes
router.get("/me", auth, getUser);
router.post("/", createUser);
router.put("/:id", auth, validateObjectId, updateUser);
router.delete("/:id", auth, validateObjectId, deleteUser);

export { router as usersRouter };

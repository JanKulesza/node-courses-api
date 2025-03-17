// /api/users
import { Router } from "express";
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/user.ts";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export { router as usersRouter };

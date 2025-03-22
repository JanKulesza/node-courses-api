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
import catchErrors from "../middlewares/catchErrors.ts";

const router = Router();

router.get("/", catchErrors(getUsers));

// Protected routes
router.get("/me", auth, catchErrors(getUser));
router.post("/", auth, catchErrors(createUser));
router.put("/:id", auth, catchErrors(updateUser));
router.delete("/:id", auth, catchErrors(deleteUser));

export { router as usersRouter };

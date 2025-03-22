// /api/courses
import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/courses.ts";
import auth from "../middlewares/auth.ts";
import catchErrors from "../middlewares/catchErrors.ts";

const router = Router();

router.get("/", catchErrors(getCourses));
router.get("/:id", catchErrors(getCourse));

// Protected routes
router.post("/", auth, catchErrors(createCourse));
router.put("/:id", auth, catchErrors(updateCourse));
router.delete("/:id", auth, catchErrors(deleteCourse));

export { router as coursesRouter };

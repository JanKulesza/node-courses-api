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

const router = Router();

router.get("/", getCourses);
router.get("/:id", getCourse);

// Protected routes
router.post("/", auth, createCourse);
router.put("/:id", auth, updateCourse);
router.delete("/:id", auth, deleteCourse);

export { router as coursesRouter };

// /api/courses
import { Router } from "express";
import {
  courseInputSchema,
  type CourseInputType,
} from "../utils/schema/index.ts";

const router = Router();

let courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

router.get("/", (req, res) => {
  res.json(courses);
});

router.post("/", (req, res) => {
  const body = req.body;

  const validation = courseInputSchema.safeParse(body);
  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }

  const { name } = req.body as CourseInputType;
  const course = { id: courses.length + 1, name };
  courses.push(course);
  res.status(201).send(course);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const { sortBy } = req.query;

  const course = courses.find((c) => c.id === +id);
  if (!course) res.status(404).json("Course not found");

  res.json({ ...course, sortBy });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;

  const course = courses.find((c) => c.id === +id);
  if (!course) {
    res.status(404).json("Course not found");
    return;
  }

  const validation = courseInputSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }
  const { name } = req.body as CourseInputType;
  const updatedCourse = { ...course, name };
  courses = courses.map((c) => (c.id === +id ? updatedCourse : c));
  console.log(courses);

  res.json({ ...updatedCourse });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const course = courses.find((c) => c.id === +id);
  if (!course) {
    res.status(404).json("Course not found");
    return;
  }

  courses = courses.filter((c) => c.id !== +id);

  res.json({});
});

export { router as coursesRouter };

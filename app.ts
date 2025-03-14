import { configDotenv } from "dotenv";
import express from "express";
import {
  courseInputSchema,
  type CourseInputType,
} from "./utils/schema/index.ts";

configDotenv();

const app = express();

let courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.json(courses);
});

app.post("/api/courses", (req, res) => {
  const body = req.body;

  const validation = courseInputSchema.safeParse(body);
  if (!validation.success) {
    res.status(400).send(validation.error.errors.map((e) => e.message));
    return;
  }

  const { name } = req.body as CourseInputType;
  const course = { id: courses.length + 1, name };
  courses.push(course);
  res.status(201).send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const { id } = req.params;
  const { sortBy } = req.query;

  const course = courses.find((c) => c.id === +id);
  if (!course) res.status(404).json("Course not found");

  res.json({ ...course, sortBy });
});

app.put("/api/courses/:id", (req, res) => {
  const { id } = req.params;

  const course = courses.find((c) => c.id === +id);
  if (!course) {
    res.status(404).json("Course not found");
    return;
  }

  const validation = courseInputSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).send(validation.error.errors.map((e) => e.message));
    return;
  }
  const { name } = req.body as CourseInputType;
  const updatedCourse = { ...course, name };
  courses = courses.map((c) => (c.id === +id ? updatedCourse : c));
  console.log(courses);

  res.json({ ...updatedCourse });
});

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`Started server at http://localhost:${PORT}`);
});

import { configDotenv } from "dotenv";
import express from "express";
import {
  courseInputSchema,
  genreInputSchema,
  type GenreInputType,
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

// /api/courses
app.get("/api/courses", (req, res) => {
  res.json(courses);
});

app.post("/api/courses", (req, res) => {
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

// /api/courses/:id
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
    res.status(400).json(validation.error.errors);
    return;
  }
  const { name } = req.body as CourseInputType;
  const updatedCourse = { ...course, name };
  courses = courses.map((c) => (c.id === +id ? updatedCourse : c));
  console.log(courses);

  res.json({ ...updatedCourse });
});

app.delete("/api/courses/:id", (req, res) => {
  const { id } = req.params;

  const course = courses.find((c) => c.id === +id);
  if (!course) {
    res.status(404).json("Course not found");
    return;
  }

  courses = courses.filter((c) => c.id !== +id);

  res.json({});
});

let genres = [
  { id: 1, name: "genre 1" },
  { id: 2, name: "genre 2" },
];

app.get("/api/genres", (req, res) => {
  res.json(genres);
});

app.post("/api/genres", (req, res) => {
  const validation = genreInputSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }

  const { name } = req.body as GenreInputType;
  const newGenre = { id: genres.length + 1, name };
  genres.push(newGenre);

  res.json(newGenre);
});

app.get("/api/genres/:id", (req, res) => {
  const { id } = req.params;

  const genre = genres.find((g) => g.id === +id);
  if (!genre) {
    res.status(404).json({ error: "Genre not found" });
    return;
  }

  res.json(genre);
});

app.put("/api/genres/:id", (req, res) => {
  const { id } = req.params;

  const genre = genres.find((g) => g.id === +id);
  if (!genre) {
    res.status(404).json({ error: "Genre not found" });
    return;
  }

  const validation = genreInputSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }

  const { name } = req.body as GenreInputType;
  const updatedGenre = { id: genre.id, name };

  res.json(updatedGenre);
});

app.delete("/api/genres/:id", (req, res) => {
  const { id } = req.params;

  const genre = genres.find((g) => g.id === +id);
  if (!genre) {
    res.status(404).json({ error: "Genre not found" });
    return;
  }

  const validation = genreInputSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }

  genres = genres.filter((g) => g.id !== +id);

  res.json({});
});

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`Started server at http://localhost:${PORT}`);
});

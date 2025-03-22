import Course from "../models/course.ts";
import { type Response, type Request } from "express";
import {
  courseInputSchema,
  type CourseInputType,
} from "../utils/schema/course.ts";

export const getCourses = async (req: Request, res: Response) => {
  const { tag, sortBy } = req.query;
  const courses = await Course.find()
    .populate("author")
    .populate("genre")
    .in("tags", tag ? [new RegExp(".*" + tag + ".*")] : [/^/])
    .sort(sortBy ? { [String(sortBy)]: 1 } : {});

  res.json(courses);
};

export const getCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  const course = await Course.findById(id).populate("author").populate("genre");
  if (!course) res.status(404).json("Course not found");

  res.json(course);
};

export const createCourse = async (req: Request, res: Response) => {
  const validation = await courseInputSchema.safeParseAsync(req.body);

  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }

  const { name, author, genre, category, isPublished, tags, price } =
    req.body as CourseInputType;
  const course = new Course({
    name,
    author,
    genre,
    category,
    tags,
    isPublished,
    price,
  });

  const savedCourse = await course.save();

  res.status(201).send(savedCourse);
};

export const updateCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  const course = await Course.findById(id);
  if (!course) {
    res.status(404).json("Course not found");
    return;
  }

  const validation = await courseInputSchema.safeParseAsync(req.body);
  if (!validation.success) {
    res.status(400).json(validation.error.errors);
    return;
  }

  const { name, author, genre, isPublished, tags, category, price } =
    req.body as CourseInputType;
  const updatedCourse = await Course.findByIdAndUpdate(id, {
    name,
    author,
    genre,
    category,
    tags,
    isPublished,
    price,
  });

  res.json(updatedCourse);
};

export const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  const course = await Course.findById(id);
  if (!course) {
    res.status(404).json("Course not found");
    return;
  }

  await course.deleteOne();

  res.json({});
};

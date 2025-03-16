import Course from "../models/course.ts";
import { type Response, type Request } from "express";
import {
  courseInputSchema,
  type CourseInputType,
} from "../utils/schema/course.ts";
import { handleError } from "../utils/handleError.ts";

export const getCourses = async (req: Request, res: Response) => {
  const { tag, sortBy } = req.query;
  try {
    const courses = await Course.find()
      .populate("author")
      .in("tags", tag ? [new RegExp(".*" + tag + ".*")] : [/^/])
      .sort(sortBy ? { [String(sortBy)]: 1 } : {});

    res.json(courses);
  } catch (error) {
    handleError(res, error);
  }
};

export const getCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id).populate("author");
    if (!course) res.status(404).json("Course not found");

    res.json(course);
  } catch (error) {
    handleError(res, error);
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const validation = await courseInputSchema.safeParseAsync(req.body);

    if (!validation.success) {
      res.status(400).json(validation.error.errors);
      return;
    }

    const { name, author, category, isPublished, tags, price } =
      req.body as CourseInputType;
    const course = new Course({
      name,
      author,
      category,
      tags,
      isPublished,
      price,
    });

    const savedCourse = await course.save();

    res.status(201).send(savedCourse);
  } catch (error) {
    console.log(error);

    handleError(res, error);
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) {
      res.status(404).json("Course not found");
      return;
    }

    const validation = courseInputSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json(validation.error.errors);
      return;
    }

    const { name, author, isPublished, tags, category, price } =
      req.body as CourseInputType;
    const updatedCourse = await Course.findByIdAndUpdate(id, {
      name,
      author,
      category,
      tags,
      isPublished,
      price,
    });

    res.json(updatedCourse);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) {
      res.status(404).json("Course not found");
      return;
    }

    await course.deleteOne();

    res.json({});
  } catch (error) {
    handleError(res, error);
  }
};

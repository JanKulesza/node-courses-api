import Course from "../models/Course.ts";
import { type Response, type Request } from "express";
import {
  courseInputSchema,
  type CourseInputType,
} from "../utils/schema/index.ts";

export const getCourses = async (req: Request, res: Response) => {
  const { tag, sortBy } = req.query;
  try {
    const courses = await Course.find()
      .in("tags", tag ? [new RegExp(".*" + tag + ".*")] : [/^/])
      .sort(sortBy ? { [String(sortBy)]: 1 } : {});

    res.json(courses);
  } catch (error) {
    console.log(error);
  }
};

export const getCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) res.status(404).json("Course not found");

    res.json(course);
  } catch (error) {
    console.log(error);
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const validation = courseInputSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json(validation.error.errors);
      return;
    }

    const { name, author, isPublished, tags } = req.body as CourseInputType;
    const course = new Course({
      name,
      author,
      tags,
      isPublished,
    });
    const savedCourse = await course.save();

    res.status(201).send(savedCourse);
  } catch (error) {
    console.log(error);
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

    const { name, author, isPublished, tags } = req.body as CourseInputType;
    const updatedCourse = await Course.findByIdAndUpdate(id, {
      name,
      author,
      tags,
      isPublished,
    });

    res.json(updatedCourse);
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

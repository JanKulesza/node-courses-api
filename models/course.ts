import mongoose from "mongoose";
import { CourseCategory } from "../utils/schema/course.ts";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  category: {
    type: String,
    required: true,
    enum: CourseCategory,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: "Genre", required: true },
  tags: {
    type: [String],
    validate: {
      validator: function (v: string[]) {
        return v && v.length > 0;
      },
      message: "Course should have at least one tag.",
    },
  },
  createdAt: { type: Date, default: Date.now },
  isPublished: { type: Boolean, required: true },
  price: {
    type: Number,
    required: function (this: typeof courseSchema.methods) {
      return this.isPublished;
    },
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  tags: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
  isPublished: { type: Boolean, required: true },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;

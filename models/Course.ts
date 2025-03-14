import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String!,
  tags: [String]!,
  createdAt: { type: Date, default: Date.now },
  isPublished: Boolean!,
});

const Course = mongoose.model("Course", courseSchema);

export default Course;

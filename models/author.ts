import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true, minlenght: 3 },
  website: { type: String, required: true },
  joinedAt: { type: Date, default: Date.now },
  bio: String,
});

const Author = mongoose.model("Author", authorSchema);

export default Author;

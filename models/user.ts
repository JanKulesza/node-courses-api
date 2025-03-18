import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  if (!process.env.JWT_SECRET) return null;

  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET
  );
};

const User = mongoose.model("User", userSchema);

export default User;

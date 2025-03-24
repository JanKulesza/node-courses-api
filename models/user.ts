import mongoose from "mongoose";
import * as jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
});

userSchema.methods.generateAuthToken = function () {
  if (!process.env.JWT_SECRET) throw new Error();

  return jwt.sign(
    {
      _id: this._id,
      isAdmin: this.isAdmin,
    } satisfies jwt.JwtPayload,
    process.env.JWT_SECRET
  );
};

export interface UserDoc extends mongoose.Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  generateAuthToken: () => string;
}

const User = mongoose.model<UserDoc>("User", userSchema);

export default User;

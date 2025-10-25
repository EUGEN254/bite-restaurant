import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String,trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, 
      lowercase: true,
      validate: [validator.isEmail, "Invalid email"],
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

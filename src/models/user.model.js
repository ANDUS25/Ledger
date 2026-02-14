import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: [true, "This Email is already registered"],
      trim: true,
      lowercase: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address",
      ],
    },
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [128, "Password must be less than 128 characters long"],
      // this will not get the password until we will not inform to the server that, provide password also.
      select: false,
    },
  },
  { timestamps: true },
);

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

// This is the in build middleware of the mongoose,
// before storing the data in DB it check this method this function
// If password is modified then only it will hash the password otherwise it will not hash the password and store in DB.
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// This check the password whenever used type and send it to this method.
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;

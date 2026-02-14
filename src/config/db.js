import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to the DB");
  } catch (error) {
    console.log("This is server error");
    process.exit(1);
  }
};

export default connectDB;

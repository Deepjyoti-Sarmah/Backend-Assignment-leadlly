import mongoose from "mongoose";

const connectDB = async () => {
  try {
    
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1)
  }

}

export default connectDB

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined");
    }
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(`${process.env.MONGODB_URI}`)
    console.log(`\n MongoDB connected || DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
}

export default connectDB

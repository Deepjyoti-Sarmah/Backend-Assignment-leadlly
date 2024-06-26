import mongoose from 'mongoose';
import { MONGODB_URI } from "../constants";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${MONGODB_URI}`);
    // console.log(`${MONGODB_URI}`)
    console.log(`\n MongoDB connected || DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
}

export default connectDB

import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  fullname: {
    type: String,
    require: true,
    trim: true,
    index: true
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"]
  },
  refreshToken: {
    type: String
  }
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);

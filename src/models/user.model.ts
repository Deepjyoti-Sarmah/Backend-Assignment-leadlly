import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
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

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")){
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined');
  }

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET, 
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
};

userSchema.methods.generateRefreshToken = function(){
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error('ACCESS_TOKEN_SECRET is not defined');
  }

  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
};

export const User = mongoose.model<IUser>("User", userSchema);


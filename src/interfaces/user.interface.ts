import { Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  username: string;
  email: string;
  fullname: string;
  password: string;
  refreshToken?: string;
  isPasswordCorrect: (password: string) => Promise<boolean>;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
}


import { Request, Response, NextFunction } from "express";
import { User,IUser } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { _id: string };

    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    // (req as AuthenticatedRequest).user = user as IUser;
    next();
  } catch (error) {
    throw new ApiError(401, (error as Error)?.message || "Invalid access token");
  }
});

// interface AuthenticatedRequest extends Request {
//   user: IUser;
// }

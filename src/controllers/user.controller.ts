import { AuthenticatedRequest } from "../interfaces/auth.interface";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { UserZod } from "../zod/user.zod";

const generateAccessAndRefreshToken = async(userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user?.save({validateBeforeSave: false});

    return {accessToken, refreshToken};
    
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating refresh and access token");
  }
}

const registerUser = asyncHandler( async( req, res) => {
  const validateUser = await UserZod.parseAsync(req.body);
  const {username, fullname, email, password} = validateUser;

  if(
    [username, fullname, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existUser = await User.findOne({
    $or: [{username}, {email}]
  });

  if (existUser) {
    throw new ApiError(409, "User with email and username already exists");
  }

  const user = await User.create({
    fullname: fullname,
    username: username?.toLowerCase(),
    email: email,
    password: password
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(200).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});

const loginUser = asyncHandler( async( req, res) => {
  const validateUser = await UserZod.parseAsync(req.body);
  const {username, email, password} = validateUser;

  if(!(username || email)) {
    throw new ApiError(400, "usernam or email is required");
  }

  const user = await User.findOne({
    $or: [{username}, {email}]
  });

  if (!user) {
    throw new ApiError(404, "user doesnot exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if(!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: false
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser, accessToken, refreshToken
        },
        "user logged in successfully"
      )
    )
});

const logoutUser = asyncHandler( async (req:AuthenticatedRequest, res) => {

  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1
      }
    },
    {
      new: true
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse (200, {}, "User logged Out"));
});

const userAccountUpdate = asyncHandler( async(req: AuthenticatedRequest, res) => {
  // const user = req.user;
  // if (!user) {
  //   throw new ApiError(401, 'Unauthorized');
  // }

  // const validateUser = await UserZod.parseAsync(req.body);
  // console.log(validateUser);
  // const { fullname, email, username, password } = validateUser;

  // if (!(fullname || email || username || password)) {
  //   throw new ApiError(400, 'All fields are required');
  // }

  // if (password) {
  //   const isPasswordValid = await user?.isPasswordCorrect(password);
  //   if (!isPasswordValid) {
  //     throw new ApiError(401, 'Invalid user credentials');
  //   }
  // }

  // const updatedUser = await User.findByIdAndUpdate(
  //   user?._id,
  //   {
  //     $set: {
  //       fullname: fullname,
  //       email: email,
  //       username: username,
  //     },
  //   },
  //   { new: true }
  // ).select('-password');

  // return res.status(200).json(new ApiResponse(200, updatedUser, 'Account details updated'));
  //
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const validateUser = await UserZod.parseAsync(req.body);
  const {fullname, username, email, password} = validateUser;

  if(!(fullname || username || email || password)) {
    throw new ApiError(400, "All field are required");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid User Credentials");
  }

  const changedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $set: {
        fullname: fullname,
        username: username,
        email: email,
      }
    },
    {new: true}
  ).select("-password");

  return res.status(200).json(
    new ApiResponse(200, changedUser, "User Credentials updated")
  );
});


export {
  registerUser,
  loginUser,
  logoutUser,
  userAccountUpdate
}

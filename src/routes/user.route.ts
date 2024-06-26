import { Router } from "express";
import { loginUser, logoutUser, registerUser, userAccountUpdate } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/account-update").patch(verifyJWT, userAccountUpdate);

export default router;

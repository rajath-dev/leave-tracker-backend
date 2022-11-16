import { Router } from "express";
import {
  loginUser,
  registerUser,
  resetPassword,
  logoutUser,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.post("/reset-password", resetPassword);

authRouter.post("/logout", logoutUser);

export default authRouter;

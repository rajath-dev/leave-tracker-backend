import { Router } from "express";
import {
  loginUser,
  registerUser,
  resetPassword,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.post("/reset-password", resetPassword);

export default authRouter;

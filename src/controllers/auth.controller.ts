import { Request, Response } from "express";
import { userModel } from "../models/user.model";
import {
  comparePassword,
  findUserByEmail,
  findUserByEmailWithPasswordInRepsonse,
  hashPassword,
} from "../services/auth.service";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("Please fill mandatory fields");
    }

    const userInDB = await findUserByEmail(email);
    if (userInDB) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password, 10);
    const user = await userModel.create({
      username,
      email,
      ...(phone && { phone }),
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json(error.message);
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const foundUser = await findUserByEmailWithPasswordInRepsonse(email);
    if (foundUser) {
      await comparePassword(password, foundUser.password);
      res.status(200).json({ user: foundUser });
    }
  } catch (error: any) {
    res.status(400).json({ message: error?.message || "Something went wrong" });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const foundUser = await findUserByEmailWithPasswordInRepsonse(email);

    if (foundUser) {
      const isOldPasswordValid = await comparePassword(
        oldPassword,
        foundUser.password
      );
      if (isOldPasswordValid) {
        const hashedPassword = await hashPassword(newPassword, 10);
        await userModel.updateOne({ password: hashedPassword });
        res.status(400).json({ message: "Successfully updated password" });
      }
    }
  } catch (error: any) {
    res.status(400).json({ message: error?.message || "Something went wrong" });
  }
};

const logoutUser = async (_: Request, res: Response) => {
  //TODO: remove JWT
  res.status(200).json({ message: "Logged out" });
};

export { registerUser, loginUser, resetPassword, logoutUser };

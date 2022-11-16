import { Request, Response } from "express";
import { userModel } from "../models/user.model";

const registerUser = async (req: Request, res: Response) => {
  const { username, email, phone, password } = req.body;
  if(!username || !email || !password) {
    throw new Error('Please fill mandatory fields');
  }
  try {
    const userInDB = await userModel.findOne({ email });
    if(userInDB) {
      throw new Error('User already exists');
    }
    const user = await userModel.create({
      username,
      email,
      ...(phone && { phone }),
      password
    })
    res.status(201).json(user);
  } catch(error:any) {
    res.status(400).json(error.message);
  }
}

const loginUser = async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;
    const foundUser = await userModel.findOne({email});
    if(!foundUser) {
      throw new Error("User not found");
    }
    res.status(400).json({ user: foundUser });
  } catch(error:any) {
    res.status(400).json({ message: error?.message || 'Something went wrong' });
  }
}

export {
  registerUser,
  loginUser
}
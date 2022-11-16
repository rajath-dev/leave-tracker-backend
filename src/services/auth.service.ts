import { compare, hash } from "bcrypt";
import { userModel } from "../models/user.model";

const findUserByEmail = async (
  email: string,
  getPasswordInResponse = false
) => {
  try {
    if (getPasswordInResponse) {
      return await userModel.findOne({ email }).select("+password");
    }
    return await userModel.findOne({ email });
  } catch (error) {
    throw new Error("User not found");
  }
};

const hashPassword = async (password: string, salt: number) => {
  try {
    return await hash(password, salt);
  } catch (error: any) {
    throw new Error(error);
  }
};

const comparePassword = async (
  inputPassword: string,
  hashedPassword: string
) => {
  try {
    return await compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error("Incorrect Password");
  }
};

export { findUserByEmail, comparePassword, hashPassword };

import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

// REGISTER
export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

// LOGIN
export const login = async (req, res) => {
  res.send("login");
  //   const { email } = req.body;
  //   const job = await User.findById(email);

  //   res.status(StatusCodes.OK).json({ job });
};

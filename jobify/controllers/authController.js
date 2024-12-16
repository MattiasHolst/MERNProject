import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";

// LOGIN
export const login = async (req, res) => {
  res.send("login");
  //   const { email } = req.body;
  //   const job = await User.findById(email);

  //   res.status(StatusCodes.OK).json({ job });
};

// REGISTER
export const register = async (req, res) => {
  res.send("register");
  //   const job = await User.create(req.body);
  //   res.status(StatusCodes.CREATED).json({ job });
};

import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";

export const getCurrentUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findOne({ _id: userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "get application stats" });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  const { userId } = req.user;

  await User.findByIdAndUpdate(userId, obj);

  res.status(StatusCodes.OK).json({ message: "User updated" });
};

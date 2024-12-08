import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
});

export const editUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { isAdmin } = req.body;
  console.log(isAdmin);

  const user = await User.findByIdAndUpdate(id, { isAdmin }, { new: true });

  res.status(200).json({ message: "User Updated", user });
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res.status(200).json({ message: "User Deleted" });
});

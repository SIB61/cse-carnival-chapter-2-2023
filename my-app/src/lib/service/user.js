import user from "@/models/user";
import connectDb from "../db/connect";
import bcrypt from "bcrypt";

const createUser = async (req, res) => {
  await connectDb();
  const userRequest = req.body;
  userRequest.role = "CONSULTEE";
  userRequest.password = await bcrypt.hash(userRequest.password, 12);
  const { password, __v, ...newUser } = await user
    .create(userRequest)
    .then((data) => data.toObject());
  return res.status(201).json({
    message: "Created new user successfully",
    user: newUser,
  });
};

const getUsers = async (req, res) => {
  await connectDb();
  const users = await user
    .find({ role: "CONSULTEE" })
    .select("-password -__v")
    .lean();
  return res.status(200).json({
    message: "Users fetched successfully",
    users,
  });
};

export { createUser, getUsers };

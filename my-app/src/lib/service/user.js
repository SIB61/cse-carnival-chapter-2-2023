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

export { createUser };

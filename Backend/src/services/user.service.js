import userModel from "../models/user.js";
import redis from "./redis.service.js";

export const createUser = async ({ email, password, firstName, username }) => {
  if (!username || !email || !password) {
    throw new Error("All fields are required [username, email, password]");
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) throw new Error("user already exists");
  // console.log(password);
  const hashPassword = await userModel.hashPassword(password);
  const user = new userModel({
    username,
    email,
    password: hashPassword,
    firstName
  });

  await user.save();
  delete user._doc.password;

  return user;
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) throw new Error("All fields are requied");

  const findEmail = await userModel.findOne({ email }).select("+password");
  if (!findEmail) throw new Error("Invalid credientials");

  const verifyPassword = await findEmail.comparePassword(password);
  if (!verifyPassword) throw new Error("Invalid credientials");

  delete findEmail._doc.password;
  return findEmail;
};

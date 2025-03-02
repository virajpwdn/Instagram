import { body } from "express-validator";
import redis from "../services/redis.service.js";
import userModel from "../models/user.js";

export const registerUserValidation = [
  body("username")
    .isString()
    .withMessage("username must be a string")
    .isLength({ min: 3, max: 15 })
    .withMessage("username must be between 3 and 15 characters")
    .custom((value) => value === value.toLowerCase())
    .withMessage("username must be lowercase"),

  body("email").isEmail().withMessage("Email is not valid, re-enter"),

  body("password")
    .isStrongPassword()
    .withMessage("Password must be strong")
    .isLength({ min: 6 })
    .withMessage("Password must be greater then 6"),
];

export const loginValidation = [
  body("email").isEmail().withMessage("Enter a valid email id, re-enter"),

  body("password")
    .isString()
    .withMessage("password must be a string")
    .isLength({ min: 6 })
    .withMessage("password should be greater then 6"),
];

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const isTokenBlackListed = await redis.get(`blacklist:${token}`);
    if (isTokenBlackListed)
      return res.status(401).json({ message: "Unauthorized" });

    const decode = userModel.verifyToken(token);
    let user = await redis.get(`user: ${decode._id}`);

    if (user) {
      user = JSON.parse(user);
    }

    if (!user) {
      user = await userModel.findById(decode._id);
      if (user) {
        delete user._doc.password;
        await redis.set(`user: ${decode._id}`, JSON.stringify(user));
      } else {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }

    req.user = user;
    req.tokenData = { token, ...decode };

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: error.message });
  }
};

import userModel from "../models/user.js";
import { validationResult } from "express-validator";

export const createUserController = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  res.send("hello world");
};

import userModel from "../models/user.js";
import { validationResult } from "express-validator";
import * as userService from "../services/user.service.js";

export const createUserController = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const { username, email, password } = req.body;

    const user = await userService.createUser({ username, email, password });

    const token = user.generateJWT();

    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const loginController = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400).json({ errors: error.array() });
  }

  try {
    const { email, password } = req.body;
    const userLogin = await userService.loginUser({ email, password });
    const token = userLogin.generateJWT();

    res.status(200).send({ userLogin, token });
  } catch (error) {
    console.log(error);
    res.status(401).json(error.message);
  }
};

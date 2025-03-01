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
    console.log(username, email, password);

    const user = await userService.createUser({username, email, password});

    const token = user.generateJWT();


    res.status(201).json({user, token})
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

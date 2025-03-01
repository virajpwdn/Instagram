import { body } from "express-validator";

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

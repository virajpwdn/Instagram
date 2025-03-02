import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import * as userMiddleware from "../middleware/user.middleware.js";

const userRouter = Router();

userRouter.post(
  "/register",
  userMiddleware.registerUserValidation,
  userController.createUserController
);

userRouter.post(
  "/login",
  userMiddleware.loginValidation,
  userController.loginController
);

export default userRouter;

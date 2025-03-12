import { Router } from "express";
import * as postController from "../controllers/post.controller.js";
import * as postMiddleware from "../middleware/post.middleware.js";
import * as userMiddleware from "../middleware/user.middleware.js"

const postRouter = Router();

postRouter.post(
  "/create",
  userMiddleware.authUser,
  postMiddleware.handleFileUpload,
  postController.createPost
);

postRouter.patch("/like/:postId", userMiddleware.authUser, postController.likeController)

export default postRouter;

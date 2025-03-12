import { Router } from "express";
import * as postController from "../controllers/post.controller.js";
import * as postMiddleware from "../middleware/post.middleware.js";
import * as userMiddleware from "../middleware/user.middleware.js";

const postRouter = Router();

postRouter.post(
  "/create",
  userMiddleware.authUser,
  postMiddleware.handleFileUpload,
  postController.createPost
);

postRouter.patch(
  "/like/:postId",
  userMiddleware.authUser,
  postController.likeController
);

// Get ALl Posts & Get One Post
postRouter.get(
  "/get-all",
  userMiddleware.authUser,
  postController.getAllPostController
);

postRouter.get("/get/:postId", userMiddleware.authUser, postController.getOnePostController)

export default postRouter;

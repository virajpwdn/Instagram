import { Router } from "express";
import * as postController from "../controllers/post.controller.js";
import * as postMiddleware from "../middleware/post.middleware.js";
const postRouter = Router();

postRouter.post(
  "/create",
  postMiddleware.handleFileUpload,
  postController.createPost
);

export default postRouter;

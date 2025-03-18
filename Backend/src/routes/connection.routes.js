import { Router } from "express";
import * as userMiddleware from "../middleware/user.middleware.js";
import * as controller from "../controllers/connection.controller.js";
const connectionRouter = Router();

connectionRouter.post(
  "/send/:receiverId",
  userMiddleware.authUser,
  controller.requestSendController
);

connectionRouter.post(
  "/review/:documentId",
  userMiddleware.authUser,
  controller.requestReviewController
);

export default connectionRouter;

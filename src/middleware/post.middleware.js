import multer from "multer";
import { body, validationResult, param } from "express-validator";
import mongoose from "mongoose";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 } /* 5MB */,
});

export const handleFileUpload = upload.single("image");

export const validateComment = [
  param("postId")
    .notEmpty()
    .withMessage("Post is required")
    .custom((value) => {
      return mongoose.Types.ObjectId.isValid(value);
    })
    .withMessage("Invalid Id"),
  body("text")
    .notEmpty()
    .withMessage("Enter message, comment field cannot be empty"),
  body("parentCommentId")
    .optional()
    .custom((value) => {
      return mongoose.Types.ObjectId.isValid(value);
    })
    .withMessage("Invalid Parent Comment Id"),
];

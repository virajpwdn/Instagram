import { generateCaptionFromImageBuffer } from "../services/ai.service.js";
import { uploadFile } from "../services/cloud.service.js";
import PostModel from "../models/post.model.js";

export const createPost = async (req, res, next) => {
  try {
    const imageBuffer = req.file.buffer;
    if (!imageBuffer)
      return res.status(401).json({ message: "Image is Required" });

    const [caption, fileData] = await Promise.all([
      generateCaptionFromImageBuffer(imageBuffer),
      uploadFile(imageBuffer),
    ]);

    const newPost = await PostModel.create({
      caption,
      media: fileData,
      author: req.user._id,
    });

    res
      .status(201)
      .json({ post: newPost, message: "new post created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

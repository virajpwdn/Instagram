import { generateCaptionFromImageBuffer } from "../services/ai.service.js";
import { uploadFile } from "../services/cloud.service.js";
import PostModel from "../models/post.model.js";
import LikeModel from "../models/likes.model.js";

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

export const likeController = async (req,res)=>{
  try {
    const {postId} = req.params;
    if(!postId) throw new Error("Post Id is required");
    const isValidPostId = PostModel.isValidMongoId(postId);
    if(!isValidPostId) throw new Error("Invalid Post Id");

    const loggedInuser = req.user._id;

    const isPostLikedByUser = await PostModel.findOne({_id: postId});

    if(!isPostLikedByUser) {
      return res.status(404).json({message: "Post not found"})
    }

    if(isPostLikedByUser.whoLiked.includes(loggedInuser)) {
      await isPostLikedByUser.decrementLike(loggedInuser);
      return res.status(200).json({message: "Disliked"});
    }

    await isPostLikedByUser.incrementLike(loggedInuser);
    res.status(200).json({message: "You have Liked the post"})

  } catch (error) {
    console.log(error);
    res.status(400).json({message: error.message})
  }
}

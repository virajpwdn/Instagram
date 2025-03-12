import { generateCaptionFromImageBuffer } from "../services/ai.service.js";
import { uploadFile } from "../services/cloud.service.js";
import PostModel from "../models/post.model.js";
import LikeModel from "../models/likes.model.js";
import CommentModel from "../models/comments.model.js";
import { validationResult } from "express-validator";

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

export const likeController = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) throw new Error("Post Id is required");
    const isValidPostId = PostModel.isValidMongoId(postId);
    if (!isValidPostId) throw new Error("Invalid Post Id");

    const loggedInuser = req.user._id;

    const isPostLikedByUser = await PostModel.findOne({ _id: postId });

    if (!isPostLikedByUser) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (isPostLikedByUser.whoLiked.includes(loggedInuser)) {
      await LikeModel.findOneAndDelete({ post: postId });
      await isPostLikedByUser.decrementLike(loggedInuser);
      return res.status(200).json({ message: "Disliked" });
    }

    await LikeModel.create({ post: postId, user: loggedInuser });
    await isPostLikedByUser.incrementLike(loggedInuser);
    res.status(200).json({ message: "You have Liked the post" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const getAllPostController = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const skip = req.query.skip || 0;

    const recentPosts = await PostModel.getRecentPosts(limit, skip);

    res.status(200).json({ posts: recentPosts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getOnePostController = async (req, res) => {
  try {
    const { postId } = req.params;
    const verifyPostId = PostModel.isValidMongoId(postId);
    if (!verifyPostId) throw new Error("Invalid Id");

    const findPost = await PostModel.findOne({ _id: postId }).populate(
      "author"
    );
    if (!findPost) throw new Error("Post does not exists!");

    res.status(200).json({ post: findPost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllPostOfLoggedInUser = async (req, res) => {
  try {
    // const { userId } = req.params;
    // if (!userId) throw new Error("Invalid, userId is missing");
    console.log(req.user._id);
    const loggedInUserPosts = await PostModel.find({ author: req.user._id });
    if (!loggedInUserPosts)
      return res.status(404).json({ message: "You don't have any post." });

    res.status(200).json({ loggedInUserPosts });
  } catch (error) {
    res.status(400).json({ message: error.message } || "Internal Server Error");
  }
};

export const commentController = async (req, res) => {
  try {
    const err = validationResult(req);
    if (!err.isEmpty()) return res.status(400).json({ error: err.array() });

    const { text, parentCommentId } = req.body;
    const {postId} = req.params || req.query;

    const currentPost = await PostModel.findById({_id:postId});
    if (!currentPost) throw new Error("Post does not exits");

    if (parentCommentId) {
      const isparentCommentIdExists = await CommentModel.findById(
        parentCommentId
      );

      if (!isparentCommentIdExists)
        res.status(404).json({ message: "parent comment not found" });
    }

    const comment = await CommentModel.create({
      text: text,
      postId: postId,
      userId: req.user._id,
      parentCommentId,
    });

    await comment.incrementCommentCount();

    res.status(201).json({ data: comment });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

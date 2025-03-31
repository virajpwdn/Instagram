import userModel from "../models/user.js";
import { validationResult } from "express-validator";
import * as userService from "../services/user.service.js";
import redis from "../services/redis.service.js";
import postModel from "../models/post.model.js";
import mongoose from "mongoose";
import followerModel from "../models/followers.model.js";

export const createUserController = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const { email, password, firstName, username } = req.body;

    const user = await userService.createUser({
      email,
      password,
      firstName,
      username,
    });

    const token = user.generateJWT();

    res.status(201).json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const loginController = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }

  try {
    const { email, password } = req.body;
    const userLogin = await userService.loginUser({ email, password });
    const token = userLogin.generateJWT();

    res.status(200).send({ userLogin, token });
  } catch (error) {
    console.log(error);
    res.status(401).json(error.message);
  }
};

export const logoutController = async (req, res) => {
  try {
    const timeRemainingForToken = req.tokenData.exp * 1000 - Date.now();

    await redis.set(
      `blacklist:${req.tokenData.token}`,
      true,
      "EX",
      Math.floor(
        timeRemainingForToken / 1000
      ) /** TODO: why this formula? search about it */
    );
    res.send("logout");
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const userProfileController = async (req, res) => {
  try {
    const { loginUserId } = req.params;
    if (!loginUserId) throw new Error("Login userId is required");
    if (loginUserId.toString() !== req.user._id.toString())
      throw new Error("ID not matched");

    const userId =
      req.user._id instanceof mongoose.Types.ObjectId
        ? req.user._id
        : new mongoose.Types.ObjectId(req.user._id);

    const userProfile = await userModel.aggregate([
      {
        $match: { _id: userId },
      },
      {
        $lookup: {
          from: "posts",
          localField: "_id",
          foreignField: "author",
          as: "userPosts", //
        },
      },
      { $project: { password: 0, email: 0 } },
    ]);

    //? if userProfile returns empty for userposts means there are no posts which users have created. so when we will map overit on frontend it will give error. so add conditional rendering if users posts are not present then it should show empty

    if (!userProfile.length) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ data: userProfile[0] });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const toUserProfileController = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new Error("user Id is required");
    const isvalidMongoId = mongoose.Types.ObjectId.isValid(userId);
    if (!isvalidMongoId) throw new Error("ID is invalid");

    const user = await userModel.findById(userId);
    if (!user) throw new Error("User Not Exists");

    const isFollowing = await followerModel.find({
      $or: [
        { senderId: req.user._id, receiverId: userId, status: "following" },
        { senderId: userId, receiverId: req.user._id, status: "following" },
      ],
    });

    if (isFollowing.length === 0) {
      return res
        .status(401)
        .json({ data: user, posts: false, message: "follow to view posts" });
    }


    const posts = await postModel.find({ author: userId });
    if (posts.length === 0)
      return res.status(200).json({ data: user, message: "No Posts!" });
    // delete user._doc.password
    res.status(200).json({ data: user, posts: posts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



import UserModel from "../models/user.js";
import FollowerModel from "../models/followers.model.js";
import mongoose from "mongoose";

export const requestSendController = async (req, res) => {
  try {
    const { senderId, status } = req.body;
    const { receiverId } = req.params;

    if (!senderId) throw new Error("Sender Id is required");

    const isValidSenderMongoId = mongoose.Types.ObjectId.isValid(senderId);
    const isValidReceiverMongoId = mongoose.Types.ObjectId.isValid(receiverId);
    if (!isValidSenderMongoId || !isValidReceiverMongoId)
      throw new Error("Invalid Mongo Id");

    if (senderId.toString() !== req.user._id.toString())
      throw new Error("Invalid Sender Id");

    const sender = await UserModel.findById(req.user._id);

    const receiver = await UserModel.findById(receiverId);
    if (!receiver) throw new Error("user does not exits");

    const isRequestAlreadyExists = await FollowerModel.findOne({
      senderId: senderId,
      receiverId: receiverId,
      status: { $in: ["following", "requested"] },
    });

    // if (isRequestAlreadyExists) throw new Error("Request is already sent");
    if (isRequestAlreadyExists) {
      sender.isFollowing = false;
      await sender.save();
      const deleteFollowing = await isRequestAlreadyExists.deleteOne();
      return res
        .status(200)
        .json({ message: `You have unfollowed ${receiver.username}` });
    }

    if (receiver.isPrivate) {
      if (status !== "requested") throw new Error(`Invalid Status, ${status}`);

      const newFriendRequest = await FollowerModel.create({
        senderId: senderId,
        receiverId: receiverId,
        status: status,
      });
      return res
        .status(200)
        .json({ message: "Request Sent", data: newFriendRequest });
    }

    const newFriendRequest = await FollowerModel.create({
      senderId,
      receiverId,
      status: "following",
    });

    sender.isFollowing = true;
    await receiver.save();

    res.status(200).json({
      message: `You are following ${receiver.username}`,
      data: newFriendRequest,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

import UserModel from "../models/user.js";
import FollowerModel from "../models/followers.model.js";
import mongoose from "mongoose";
import * as validation from "../validations/connections.validation.js";

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
      const deleteFollowing = await isRequestAlreadyExists.deleteOne();
      if (sender.following.includes(receiverId)) {
        sender.following.pop(receiverId);
        receiver.followers.pop(senderId);
        await sender.save();
        await receiver.save();
      }
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

    sender.following.push(receiverId);
    await sender.save();

    res.status(200).json({
      message: `You are following ${receiver.username}`,
      data: newFriendRequest,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const requestReviewController = async (req, res) => {
  try {
    // This senderId is of the loggedin user who is sending review frontend
    const { senderId, status, username } = req.body;
    const { documentId } = req.params;
    const validateData = validation.requestReviewValidations({
      senderId,
      status,
      documentId,
      loggedInUserId: req.user._id,
    });
    if (validateData.error) throw new Error(validateData.error);

    const user = await UserModel.findById(senderId);

    if (!user) throw new Error("User not found");

    const findDocument = await FollowerModel.findById(documentId);
    if (findDocument.status === "following")
      return res.status(200).json({ message: "You have already followed" });
    if (!findDocument) throw new Error("Document does not exits");

    const receivingUser = await UserModel.findById(findDocument.senderId);
    if (!receivingUser) throw new Error("Receiving user not found");

    if (status === "accept") {
      findDocument.status = "following";
      await findDocument.save();
      user.followers.push(
        findDocument.senderId
      ); /* This sender is from document which is of fromUserId the persone who sent request */

      // user.followers.push(findDocument.senderId);
      receivingUser.following.push(req.user._id);

      await receivingUser.save();
      await user.save();

      return res
        .status(200)
        .json({ message: `You have accepted request of ${username}` });
    } else {
      await findDocument.deleteOne();
      return res.status(200).json({ message: `Request Rejected` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

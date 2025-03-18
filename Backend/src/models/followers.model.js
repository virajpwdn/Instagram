import mongoose from "mongoose";
const followerSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "sender id is required"],
    ref: "user",
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "receiver id is required"],
    ref: "user",
  },
  status: {
    type: String,
    enum: ["accept", "ignore", "requested", "following"],
    required: [true, "status is required"],
  },
});

const followerModel = mongoose.model("follower", followerSchema);
export default followerModel;

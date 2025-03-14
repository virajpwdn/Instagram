import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
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
  text: {
    type: String,
    required: [true, "Enter a message, message field cannot be empty!"],
    minLength: [1, "Text must be atleast 1 character"],
    maxLength: [1000, "Test must be under 1000 character"],
    trim: true,
  },
}, {timestamps: true});

const messageModel = mongoose.model("message", messageSchema);
export default messageModel;
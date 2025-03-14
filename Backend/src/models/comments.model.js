import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  text: {
    type: String,
    required: [true, "comment is missing"],
  },
  parentCommentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment",
  },
});




commentSchema.statics.verifyMongoId = async function (postId) {
    if(!postId) throw new Error("Post Id is required");
    return mongoose.Types.ObjectId.isValid(postId);
}


const commentModel = mongoose.model("comment", commentSchema);
export default commentModel;

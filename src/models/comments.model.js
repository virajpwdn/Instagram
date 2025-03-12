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

  commentCount: {
    type: Number,
    default: 0,
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comment",
  },
});


commentSchema.methods.incrementCommentCount = async function () {
    this.commentCount += 1;
    this.save();
    return this;
}

commentSchema.methods.decrementCommentCount = async function () {
    this.commentCount -= 1;
    this.save();
    return this;
}

commentSchema.statics.verifyMongoId = async function (postId) {
    if(!postId) throw new Error("Post Id is required");
    return mongoose.Types.ObjectId.isValid(postId);
}


const commentModel = mongoose.model("comment", commentSchema);
export default commentModel;

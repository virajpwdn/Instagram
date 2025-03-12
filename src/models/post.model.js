import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
    },
    media: {
      type: Object,
      required: [true, "Media is required"],
    },
    author: {
      type: mongoose.Schema.Types
        .ObjectId /** what is the difference between mongoose.schema.types.ObjectId vs mongoose.types.objectID */,
      ref: "user",
      required: [true, "Author is required"],
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    whoLiked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

postSchema.statics.getAllPosts = async function (authorId) {
  if (!authorId) throw new Error("Author Id is required");
  const posts = await this.find({
    author: authorId,
  }); /** TODO: why used this.find instaed of userModel also search for this is statics method which is applied on userModel so how can we access this over here do this search aswell */
  return posts;
};

postSchema.methods.updateCaption = async function (caption) {
  this.caption = caption;
  await this.save();
  return this;
};

postSchema.statics.getRecentPosts = async function (limit, skip) {
  if (!limit) throw new Error("Limit is required");
  const getPost = await this.find()
    .sort({ createdAt: -1 })
    .limit(limit > 10 ? 10 : limit)
    .skip(skip)
    .populate("author");
  return getPost;
};

postSchema.statics.isValidMongoId = async function (postId) {
  if (!postId) throw new Error("Post Id is required");
  return mongoose.Types.ObjectId.isValid(postId);
};

postSchema.methods.incrementLike = async function (loggedInuser) {
  this.likeCount += 1;
  this.whoLiked.push(loggedInuser);
  await this.save();
  return this;
};

postSchema.methods.decrementLike = async function (loggedInuser) {
  this.likeCount -= 1;
  this.whoLiked.pop(loggedInuser);
  await this.save();
  return this;
};

const postModel = mongoose.model("post", postSchema);

export default postModel;

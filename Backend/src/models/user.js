import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username already exists"],
    trim: true,
    lowercase: true,
    minLength: [3, "Username must be at least 3 characters"],
    maxLength: [20, "Username must be at most 20 character"],
  },
  firstName: {
    type: String,
    minLength: [2, "Firstname should be greater then 2 characters"],
    maxLength: [50, "Firstname should be at most 50 characters"],
  },
  lastName: {
    type: String,
    minLength: [2, "Firstname should be greater then 2 characters"],
    maxLength: [50, "Firstname should be at most 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    trim: true,
    lowercase: true,
    minLength: [6, "Email must be at least 6 characters"],
    maxLength: [40, "Email must be at most 50 characters"],
  },

  profileImage: {
    type: String,
    default:
      "https://imgs.search.brave.com/5cAi-jXDh0PdCGuh2vvsggwMUWvGlmTFmbCQ7jYJ9OI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc",
  },

  password: {
    type: String,
    select: false,
  },
});

userSchema.statics.hashPassword = async function (password) {
  if (!password) throw new Error("Password is required");
  return await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is required");
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    { _id: this._id, username: this.username, email: this.email },
    config.JWT,
    {
      expiresIn: config.JWT_EXP,
    }
  );
  return token;
};

userSchema.statics.verifyToken = function (token) {
  if (!token) {
    throw new Error("Token is required");
  }
  return jwt.verify(token, config.JWT);
};

const userModel = mongoose.model("user", userSchema);

export default userModel;

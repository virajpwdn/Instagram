import mongoose from "mongoose";
import config from "../config/config.js";

export const connectDB = () => {
  mongoose
    .connect(config.MONGO_URL)
    .then(() => {
      console.log("Database is connected");
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDB;

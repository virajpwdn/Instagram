import { Server } from "socket.io";
import userModel from "../models/user.js";

function initSocket(server) {
  console.log("Initialised socket io");
  const io = new Server(server);

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.headers.token;
      if (!token) return next(new Error("Token not found!"));

      const decodeToken = userModel.verifyToken(token);
      if (!decodeToken) return next(new Error(decodeToken));

      const user = await userModel.findOne({ _id: decodeToken._id });
      if (!user) return next(new Error("user not found"));

      socket.user = user;
      console.log(socket.user);

      next();
    } catch (error) {
      next(error);
    }
  });

  io.on("connection", async (socket) => {
    console.log("user is connected with socket");
  });
}

export default initSocket;

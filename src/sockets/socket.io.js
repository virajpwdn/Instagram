import { Server } from "socket.io";
import userModel from "../models/user.js";
import crypto from "crypto";

function hashRoomId(roomId) {
  return crypto.createHash("sha256").update(roomId).digest("hex");
}

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
    const roomId = hashRoomId(socket.user._id.toString());
    socket.join(roomId);

    socket.on("disconnect", () => {
      console.log("user is disconnected from socket");
      socket.leave(roomId);
    });

    socket.on("message", (data)=>{
        try {
            const {receiverId, senderId, text} = data;
            const receiver = io.sockets.adapter.rooms.get(receiverId);

            if(!receiver) return;

            const receiverSocketId = Array.from(receiver)[0];
            const receiverSocekt = io.sockets
        } catch (error) {
            console.log(error);
        }
    })
    
    console.log("user is connected with socket");
  });
}

export default initSocket;

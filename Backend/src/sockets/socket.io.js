import { Server } from "socket.io";
import userModel from "../models/user.js";
import crypto from "crypto";
import mongoose from "mongoose";
import messageModel from "../models/message.model.js";

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
      //   console.log(socket.user);

      next();
    } catch (error) {
      next(error);
    }
  });

  io.on("connection", async (socket) => {
    let roomId;
    socket.on("connected", async ({ senderId, receiverId }) => {
      try {
        if (
          !senderId ||
          !receiverId ||
          !senderId.trim() ||
          !receiverId.trim()
        ) {
          throw new Error("sender id, receiver id is required");
        }

        // TODO: check why this validation is not working
        // if (senderId !== socket.user._id)
        //   throw new Error("Invalid Id of loggedIn user");

        const isReceiverIdValid = await userModel.findOne({ _id: receiverId });
        if (!isReceiverIdValid) throw new Error("Receiver Id is not valid");

        roomId = hashRoomId(
          [senderId.toString(), receiverId.toString()].sort().join("$")
        );
        socket.join(roomId);
      } catch (error) {
        console.log(error);
        // TODO: Add error event, since we cannot use return in socket io it does not handle return
        // return error;
      }
    });

    socket.on("chat-message", async (data) => {
      try {
        const { senderId, receiverId, text } = data;

        // TODO: check why this validation is not working
        // if(senderId !== socket.user._id) throw new Error("Invalid sender id");

        if (!receiverId || !text)
          throw new Error("receiver id and text are required");

        const isReceiverValidId = mongoose.Types.ObjectId.isValid(receiverId);
        if (!isReceiverValidId) return;

        const counterPart = await userModel.findOne({ _id: receiverId });
        if (!counterPart) return;

        roomId = hashRoomId(
          [senderId.toString(), receiverId.toString()].sort().join("$")
        );

        const newMessage = await messageModel.create({
            senderId: senderId,
            receiverId: receiverId,
            text: text
        })


        io.to(roomId).emit("chat-message", {
          senderId,
          receiverId: counterPart,
          text,
        });
      } catch (error) {
        console.log(error);
        // TODO: Add error event
        // return error;
      }
    });

    socket.on("disconnect", () => {
      console.log("user is disconnected from socket");
      socket.leave(roomId);
    });

    // socket.on("message", (data)=>{
    //     try {
    //         const {receiverId, senderId, text} = data;
    //         const receiver = io.sockets.adapter.rooms.get(receiverId);

    //         if(!receiver) return;

    //         const receiverSocketId = Array.from(receiver)[0];
    //         const receiverSocekt = io.sockets
    //     } catch (error) {
    //         console.log(error);
    //     }
    // })

    // console.log("user is connected with socket");
  });
}

export default initSocket;

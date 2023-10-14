import { getServerSession } from "next-auth";
import { Server } from "socket.io";
import { createOptions } from "./auth/[...nextauth]";
import mongoose from "mongoose";
import { CONNECTION, JOIN, LEAVE } from "@/constants";

export default async (req, res) => {
  const session = await getServerSession(req, res, createOptions(req));
  if (session) {
    console.log("session", session.user.id);
    await createSocketConnection(res);
  }
  res.json({ success: true });
};

export async function createSocketConnection(res) {
  let io = res.socket.server.io;
  if (!io) {
    const io = new Server(res.socket.server);
    io.on(CONNECTION, async (socket) => {
      socket.on(JOIN, (room) => {
        console.log("room is ", room);
        socket.join(room);
      });

      socket.on(LEAVE, (room) => {
        console.log("room is ", room);
        socket.leave(room);
      });

      //   socket.on(SEE_MESSAGE, async (message) => {
      //     console.log("socket seen", message.id);
      //     seeMessage({ messageIds: [new mongoose.Types.ObjectId(message.id)] });
      //     deleteMessageNotification({
      //       userId: message.receiver,
      //       notificationSenderId: message.sender,
      //     });
      //     socket
      //       .to(message.sender)
      //       .emit(MESSAGE_SEEN, { userId: message.receiver });
      //   });
    });
    res.socket.server.io = io;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

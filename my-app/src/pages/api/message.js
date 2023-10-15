import { getServerSession } from "next-auth";
import { createOptions } from "./auth/[...nextauth]";
import Conversation from "@/models/conversation";
import connectDb from "@/lib/db/connect";
import user from "@/models/user";
import { NEW_MESSAGE } from "@/constants";

export default async (req, res) => {
  await connectDb();
  const { to, message } = req.body;
  const session = await getServerSession(req, res, createOptions(req));
  const from = session.user._id;

  const conversation = await Conversation.findOne({
    users: {
      $in: [
        [to, from],
        [from, to],
      ],
    },
  });

  if (!conversation) {
    await Conversation.create({
      users: [to, from],
      messages: [
        {
          ...message,
          from,
        },
      ],
    });
    res.send();
    return;
  }

  conversation.messages.push({ ...message, from });
  await conversation.save();

  let io = res.socket.server.io;
  io?.in(to).emit(
    NEW_MESSAGE,
    conversation.messages[conversation.messages.length - 1]
  );

  await user.updateOne(
    { _id: from },
    {
      $addToSet: {
        chatUsers: to,
      },
    }
  );

  await user.updateOne(
    { _id: to },
    {
      $addToSet: {
        chatUsers: from,
      },
    }
  );

  res.json(conversation);
  return;
};

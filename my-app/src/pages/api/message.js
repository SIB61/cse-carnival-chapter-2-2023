import { getServerSession } from "next-auth";
import { createOptions } from "./auth/[...nextauth]";
import Conversation from "@/models/conversation";
import connectDb from "@/lib/db/connect";

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

  console.log(conversation);

  conversation.messages.push({ ...message, from });
  await conversation.save();

  res.send();
  return;
};

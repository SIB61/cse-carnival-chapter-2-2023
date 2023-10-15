import { useSocket } from "@/components/socket-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import socket from "socket.io-client";
import { createOptions } from "./api/auth/[...nextauth]";
import Conversation from "@/models/conversation";
import connectDb from "@/lib/db/connect";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import User from "@/models/user";
import { NEW_MESSAGE } from "@/constants";

export default ({ conversation, chatUsers }) => {
  const { socket } = useSocket();
  const [text, setText] = useState("");
  const router = useRouter();
  const [c, setC] = useState(conversation);
  console.log(socket);

  const sendMessage = async () => {
    const conv = await axios
      .post("/api/message", { to: router.query.id, message: { text } })
      .then((res) => res.data);
    setC(conv);
    setText("");
  };

  useEffect(() => {
    socket?.on(NEW_MESSAGE, (message) => {
      if (message.from === router.query.id) {
        setC((prev) => {
          const exs = prev.messages.find((m) => m._id === message._id);
          if (!exs) {
            prev.messages = [...prev.messages, message];
          }
          return { ...prev };
        });
      }
      console.log(message);
    });
  }, [socket]);

  const session = useSession();

  return (
    <div className="flex h-screen flex-1 p-2 gap-2">
      <Card className="h-full w-72">
        <CardHeader>
          <CardTitle>Chats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {chatUsers.map((c) => (
              <Button
                variant="outline"
                disabled={c._id === router.query.id}
                className={c._id === router.query.id ? " bg-green-200" : ""}
                onClick={() => router.push("/chat?id=" + c._id)}
              >
                {c.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="flex-1 w-full p-2 bg-green-200">
        <CardContent className="h-full relative">
          <ScrollArea className="w-full  h-[calc(100%-50px)] ">
            <div className="flex flex-col gap-4 p-4">
              {c?.messages?.map((message) => (
                <div
                  className={`${
                    message.from !== router.query.id
                      ? "flex justify-end"
                      : "flex justify-start"
                  }`}
                >
                  <div
                    className={`${
                      message.from !== router.query._id
                        ? " bg-green-400"
                        : " bg-green-600"
                    } p-2 rounded-md w-max`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex absolute left-0 bottom-0 w-full">
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full"
              placeholder="enter your message"
            ></Input>
            <Button onClick={sendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export async function getServerSideProps({ req, res, query }) {
  await connectDb();
  const session = await getServerSession(req, res, createOptions(req));
  const user1 = session.user._id;
  const user2 = query.id;
  console.log(user1, user2);
  const conversation = await Conversation.findOne({
    users: {
      $in: [
        [user1, user2],
        [user2, user1],
      ],
    },
  }).lean();

  const { chatUsers } = await User.findOne({ _id: user1 })
    .select("chatUsers")
    .populate("chatUsers")
    .lean();

  console.log(chatUsers);

  return {
    props: JSON.parse(JSON.stringify({ conversation, chatUsers })),
  };
}

import { useSocket } from "@/components/socket-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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

export default ({ conversation }) => {
  const { socket } = useSocket();
  const [text, setText] = useState("");
  const router = useRouter();
  console.log(socket);

  const sendMessage = () => {
    axios.post("/api/message", { to: router.query.id, message: { text } });
  };

  return (
    <div>
      <Card>
        <CardContent>
          <ScrollArea className=" h-96 w-full">
            {JSON.stringify(conversation)}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></Textarea>
          <Button onClick={sendMessage}>Send</Button>
        </CardFooter>
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
  console.log(conversation);
  return {
    props: JSON.parse(JSON.stringify({ conversation })),
  };
}

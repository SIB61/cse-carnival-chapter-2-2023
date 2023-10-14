import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { io } from "socket.io-client";
import { JOIN } from "@/constants";

let socket;
export async function getSocket() {
  if (!socket) {
    await fetch("/api/socket");
    socket = io();
  }
  return socket;
}

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(undefined);
  const { data: session, status } = useSession();
  const socketInitializer = async () => {
    if (!socket) {
      const socketClient = await getSocket();
      setSocket(socketClient);
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      socketInitializer();
    }
    return () => socket?.removeAllListeners();
  }, [session]);

  useEffect(() => {
    if (status === "authenticated") {
      socket?.emit(JOIN, session?.user?._id);
    }
  }, [session, socket]);

  return (
    <SocketContext.Provider value={{ socket, setSocket: socketInitializer }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  const { socket, setSocket } = useContext(SocketContext);
  return { socket, setSocket };
}

"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

type CollectionName =
  | "announcements"
  | "blogs"
  | "events"
  | "posts"
  | "contents"
  | "resources";

type ChangeEvent = {
  operationType: string;
  fullDocument?: any;
  documentKey?: any;
  updateDescription?: any;
};

interface SocketContextType {
  socket: Socket | null;
  socketConnected: boolean;
  onCollectionChange: (
    collection: CollectionName,
    callback: (change: ChangeEvent) => void
  ) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

const collectionsToWatch: CollectionName[] = [
  "announcements",
  "blogs",
  "events",
  "posts",
  "contents",
  "resources",
];

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socketConnected, setSocketConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      path: "/api/socket",
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      setSocketConnected(true);
    });

    socket.on("disconnect", () => {
      console.warn("⚠️ Socket disconnected");
      setSocketConnected(false);
    });

    return () => {
      collectionsToWatch.forEach((col) => {
        socket.off(`${col}-change`);
      });
      socket.disconnect();
    };
  }, []);

  const onCollectionChange = (
    collection: CollectionName,
    callback: (change: ChangeEvent) => void
  ) => {
    if (!socketRef.current) return;
    socketRef.current.on(`${collection}-change`, callback);
  };

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        socketConnected,
        onCollectionChange,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error("useSocket must be used within a SocketProvider");
  return context;
};

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

export const app = express();
export const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001", "http://localhost:5173"], // ✅ allow both
    methods: ["GET", "POST"],
    credentials: true,
  },
});


const users = {};

export const getReceiverSocketId = (receiverId) => users[receiverId];

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Current online users:", users);
  }

  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    if (userId) delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

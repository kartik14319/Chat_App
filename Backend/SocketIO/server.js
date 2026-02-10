// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";

// export const app = express();
// export const server = createServer(app);

// export const io = new Server(server, {
//   cors: {
//     origin: ["https://chat-app-kartik143.onrender.com"], 
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });


// const users = {};

// export const getReceiverSocketId = (receiverId) => users[receiverId];

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);
//   const userId = socket.handshake.query.userId;
//   if (userId) {
//     users[userId] = socket.id;
//     console.log("Current online users:", users);
//   }

//   io.emit("getOnlineUsers", Object.keys(users));

//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//     if (userId) delete users[userId];
//     io.emit("getOnlineUsers", Object.keys(users));
//   });
// });




// Backend/SocketIO/server.js
import { Server } from "socket.io";

const users = {}; // { userId: socketId }
export let io;    // top-level export for other modules

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:3001",
        "https://chat-app-kartik143.onrender.com",
      ],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
      users[userId] = socket.id;
      io.emit("getOnlineUsers", Object.keys(users));
      console.log("Online users:", Object.keys(users));
    }

    // Logout event
    socket.on("logout", (userId) => {
      if (users[userId]) {
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
        console.log(`${userId} logged out`);
      }
    });

    // Socket disconnect
    socket.on("disconnect", () => {
      if (userId && users[userId]) {
        delete users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
        console.log(`${userId} disconnected`);
      }
    });
  });

  return io;
};

// Helper to get socketId by userId
export const getReceiverSocketId = (receiverId) => users[receiverId];

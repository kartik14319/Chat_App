import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server, io } from "./SocketIO/server.js";

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:3001", "http://localhost:5173"], // ✅ allow both
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));


const PORT = process.env.PORT || 4002;
const URI = process.env.MONGO_DB_URL;

try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}

// routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// optional Socket.IO logging
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

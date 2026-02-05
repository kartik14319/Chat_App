// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";
// import {dir} from "console";

// import userRoute from "./routes/user.route.js";
// import messageRoute from "./routes/message.route.js";
// import { app, server, io } from "./SocketIO/server.js";

// dotenv.config();

// // middleware
// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({
//   origin: ["http://localhost:3001", "http://localhost:5173"], // ✅ allow both
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"]
// }));


// const PORT = process.env.PORT || 4002;
// const URI = process.env.MONGO_DB_URL;

// try {
//   mongoose.connect(URI);
//   console.log("Connected to MongoDB");
// } catch (error) {
//   console.log(error);
// }

// // routes
// app.use("/api/user", userRoute);
// app.use("/api/message", messageRoute);

// // deployment 

// if(process.env.NODE_ENV ==="production" ){
//   const dirPath = path.resolve();
//   app.use(express.static("./Frontend/dist"));
//   app.get("/*splat",(req,res)=>{
//     res.sendFile(path.resolve(dirPath,"./Frontend/dist","index.html"));
//   })

// }

// // optional Socket.IO logging
// io.on("connection", (socket) => {
//   console.log("Socket connected:", socket.id);
// });

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server, io } from "./SocketIO/server.js";

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS (local + production)
const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:5173",
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
}));

// MongoDB
mongoose.connect(process.env.MONGO_DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Mongo error:", err));

// routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// ✅ Serve frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("/*splat", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// socket
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
});

// server
const PORT = process.env.PORT || 4002;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

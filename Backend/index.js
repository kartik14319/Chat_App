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






// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import path from "path";
// import { createServer } from "http";

// import userRoute from "./routes/user.route.js";
// import messageRoute from "./routes/message.route.js";
// import { initSocket } from "./SocketIO/server.js";

// dotenv.config();

// const app = express();
// const server = createServer(app);

// // ---------------- MIDDLEWARE ----------------
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       "http://localhost:3001",
//       "https://chat-app-kartik143.onrender.com",
//     ],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

// // ---------------- MONGODB ----------------
// const URI = process.env.MONGO_DB_URL;
// mongoose
//   .connect(URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch(console.error);

// // ---------------- ROUTES ----------------
// app.use("/api/user", userRoute);
// app.use("/api/message", messageRoute);

// // ---------------- SOCKET.IO ----------------
// initSocket(server);

// // ---------------- PRODUCTION ----------------
// if (process.env.NODE_ENV === "production") {
//   const dirPath = path.resolve();
//   app.use(express.static(path.join(dirPath, "Frontend/dist")));

//   app.get("/*splat", (req, res) => {
//     res.sendFile(path.resolve(dirPath, "Frontend/dist", "index.html"));
//   });
// }

// // ---------------- START SERVER ----------------
// const PORT = process.env.PORT || 4002;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { createServer } from "http";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { initSocket } from "./SocketIO/server.js";

dotenv.config();

const app = express();
const server = createServer(app);

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3001",
      "https://chat-app-kartik143.onrender.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// Production build
if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();
  app.use(express.static(path.join(dirPath, "Frontend/dist")));

  // Catch-all route for React
  app.get("/*splat", (req, res) => {
    res.sendFile(path.resolve(dirPath, "Frontend/dist", "index.html"));
  });
}

// Initialize Socket.IO
initSocket(server);

// Start server
const PORT = process.env.PORT || 4002;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

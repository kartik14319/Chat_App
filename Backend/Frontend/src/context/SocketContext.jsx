// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthProvider";
// import io from "socket.io-client";
// const socketContext = createContext();

// // it is a hook.
// export const useSocketContext = () => {
//   return useContext(socketContext);
// };

// export const SocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [authUser] = useAuth();

//   useEffect(() => {
//     if (authUser) {
//       const socket = io("https://chat-app-kartik143.onrender.com", {
//         query: {
//           userId: authUser.user._id,
//         },
//       });
//       setSocket(socket);
//       socket.on("getOnlineUsers", (users) => {
//         setOnlineUsers(users);
//       });
//       return () => socket.close();
//     } else {
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//   }, [authUser]);
//   return (
//     <socketContext.Provider value={{ socket, onlineUsers }}>
//       {children}
//     </socketContext.Provider>
//   );
// };


import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider"; // assuming you have this auth hook
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser && authUser.user && authUser.user._id) {
      // Choose backend URL based on environment variable or fallback
      const SOCKET_URL =
        import.meta.env.VITE_API_URL || "http://localhost:4002";

      const newSocket = io(SOCKET_URL, {
        query: {
          userId: authUser.user._id,
        },
        withCredentials: true,
      });

      setSocket(newSocket);

      // Listen for online users update
      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.emit("logout", authUser.user._id); // inform backend on disconnect
        newSocket.disconnect();
        setSocket(null);
      };
    }

    // If no authUser, cleanup socket
    if (socket) {
      socket.emit("logout", authUser?.user?._id);
      socket.disconnect();
      setSocket(null);
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

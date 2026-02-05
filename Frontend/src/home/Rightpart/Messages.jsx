import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // listen for incoming messages

  // Get current logged-in user
  const authUser = JSON.parse(localStorage.getItem("ChatAppUser"));
  const currentUserId = authUser?.user?._id;

  const lastMsgRef = useRef();

  // Scroll to the last message when messages change
  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <Loading />
      ) : messages.length > 0 ? (
        messages.map((message, index) => {
          const isLast = index === messages.length - 1;
          return (
            <div key={message._id} ref={isLast ? lastMsgRef : null}>
              <Message message={message} currentUserId={currentUserId} />
            </div>
          );
        })
      ) : (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;

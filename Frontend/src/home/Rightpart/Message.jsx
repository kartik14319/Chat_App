import React from "react";


function Message({ message, currentUserId }) {
  // Determine if this message was sent by the current logged-in user
  const itsMe = message.senderId === currentUserId;

  // Format timestamp
  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="message-container">
      <div
        className={`${
          itsMe ? "sent" : "received"
        } max-w-xs px-4 py-2 rounded-lg break-words`}
      >
        {message.message}
        <div className="text-xs mt-1 text-gray-500">{formattedTime}</div>
      </div>
    </div>
  );
}

export default Message;

import React, { useEffect, useRef } from "react";
import MessageItem from "./MessageItem";
import TypingIndicator from "../common/placeholders/TypingIndicator";

const MessageList = ({ messages, currentUserId, peerTyping }) => {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!messagesEndRef.current) return;

    const container = containerRef.current;
    const isNearBottom = container.scrollHeight - container.clientHeight <= container.scrollTop + 100;

    if (isNearBottom) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "end"
      });
    }
  }, [messages, peerTyping]);  

  return (
    <div ref={containerRef} className="space-y-4 overflow-y-auto">
      {messages.map((message) => (
        <MessageItem
          key={message._id}
          message={message}
          isOwnMessage={message.sender._id === currentUserId}
        />
      ))}
      
      <div ref={messagesEndRef}>
        {peerTyping && <TypingIndicator />}
      </div>
    </div>
  );
};

export default MessageList;
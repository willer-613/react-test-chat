import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { useCreateContext } from "../createProvider";

const ChatMessage = ({ message, side }) => (
  <div className={`msg-container ${side}`}>
    <div className="chat-msg">
      <div className="msg-contents">{message}</div>
    </div>
  </div>
);

const ChatList = forwardRef((_props, ref) => {
  const { state } = useCreateContext();
  const listRef = useRef(null);

  useImperativeHandle(ref, () => ({
    scrollIntoView: () => {
      setTimeout(() => {
        listRef.current.scrollTop = listRef.current.scrollHeight;
        // listRef.current.scrollIntoView(false);
      }, 0);
    }
  }));

  console.log(state, "messages111");

  return (
    <div className="chat-list" ref={listRef}>
      {state.map((message) => (
        <ChatMessage
          message={message.body}
          key={message.id}
          side={["left", "right"][Number(message.senderId === 1)]}
        />
      ))}
    </div>
  );
});

export default ChatList;

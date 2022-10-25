import React, { Suspense, lazy, useState } from "react";
import { useCreateContext } from "../createProvider";
import loadable from "@loadable/component";

// import Send from "./icons/Send";
// import Emoji from "./icons/Emoji";
const Send = lazy(() =>
  import(/*webpackChunkName: "send-icon" */ "./icons/Send")
);
const Emoji = lazy(() =>
  import(/*webpackChunkName: "emoji-icon" */ "./icons/Emoji")
);
// Lazy load EmojiPicker  when <EmojiPicker /> renders
const Picker = lazy(() =>
  import(/*webpackChunkName: "emoji-picker" */ "./EmojiPicker")
);

const EmojiPicker = loadable(() => import("./EmojiPicker"), {
  fallback: <div id="loading">Loading...</div>,
});

const ChatInput = ({ onScrollIntoView }) => {
  const { dispatch } = useCreateContext();
  const [pickerOpen, togglePicker] = React.useReducer((state) => !state, false);
  const [message, setMessages] = useState("");

  const onEmojiClick = (event, data) => {
    // console.log(event, data);
    togglePicker();
    setMessages(`${message}${data.emoji}`);
  };

  const onSentMessage = () => {
    dispatch({
      type: "push",
      message: {
        id: Math.random() + "",
        senderId: [1, 2][+(Math.floor(Math.random() * 10) >= 5)],
        body: message,
      },
    });
    // 触发滚动
    onScrollIntoView();
    setMessages("");
  };

  const onChangeMessage = (e) => {
    setMessages(e.target.value);
  };

  return (
    <Suspense fallback={<p id="loading">Outer Loading...</p>}>
      <div className="chat-input-container">
        <input
          value={message}
          onChange={onChangeMessage}
          type="text"
          placeholder="Type a message..."
        />
        <Emoji onClick={togglePicker} />
        <Suspense fallback={<p id="loading">Emoji Loading...</p>}>
          {pickerOpen && <Picker onEmojiClick={onEmojiClick} />}
        </Suspense>
        {pickerOpen && <EmojiPicker onEmojiClick={onEmojiClick} />}

        <Send onClick={onSentMessage} />
      </div>
    </Suspense>
  );
};

console.log("ChatInput loaded", Date.now());

export default ChatInput;

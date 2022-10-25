import React, { useRef } from "react";
import "./styles.css";

// Statically import Chatlist, ChatInput and UserInfo
import UserInfo from "./components/UserInfo";
import ChatList from "./components/ChatList";
import ChatInput from "./components/ChatInput";

import { context, useCreateReducer } from "./createProvider";

const App = () => {
  const [state, dispatch] = useCreateReducer();

  const chatListRef = useRef(null);

  const onScrollIntoView = () => {
    chatListRef.current.scrollIntoView();
  };

  return (
    <context.Provider value={{ state, dispatch }}>
      <div className="App">
        <UserInfo />
        <ChatList ref={chatListRef} />
        <ChatInput onScrollIntoView={onScrollIntoView} />
      </div>
    </context.Provider>
  );
};

export default App;

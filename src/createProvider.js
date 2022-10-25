import { createContext, useContext, useReducer } from "react";

import messages from "./data/messages";

export const context = createContext();

export const useCreateContext = () => useContext(context);

const initialState = messages;

const reducer = (state, action) => {
  switch (action.type) {
    case "push":
      return [...state, action.message];
    default:
      throw new Error("Unexpected action");
  }
};

export const useCreateReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch];
};

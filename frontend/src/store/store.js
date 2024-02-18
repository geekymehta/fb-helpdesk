import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pages/pageSlice";
import conversationReducer from "./conversations/conversationSlice";
import authReducer from "./auth/authSlice";
import chatWithReducer from "./chat/chatWithSlice";

export const store = configureStore({
  reducer: {
    pages: pageReducer,
    conversations: conversationReducer,
    auth: authReducer,
    chatWith: chatWithReducer,
  },
});

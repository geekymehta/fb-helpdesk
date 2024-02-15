import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./auth/authSlice";
import pageReducer from "./pages/pageSlice";
import conversationReducer from "./conversations/conversationSlice";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    pages: pageReducer,
    conversations: conversationReducer,
    auth: authReducer,
  },
});

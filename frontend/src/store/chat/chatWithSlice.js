import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatWith: null,
  lastMessageTime: null,
};

export const chatWithSlice = createSlice({
  name: "chatWith",
  initialState,
  reducers: {
    setChatWith: (state, { payload }) => {
      state.chatWith = payload;
    },
    setLastMessageTime: (state, { payload }) => {
      state.lastMessageTime = payload;
    },
  },
});

export const { setChatWith, setLastMessageTime } = chatWithSlice.actions;
export default chatWithSlice.reducer;

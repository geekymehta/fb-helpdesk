import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchConversations = createAsyncThunk(
  "conversations/fetchConversations",
  async ({ pageId, pageAccessToken }, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v19.0/${pageId}/conversations`,
        {
          params: {
            fields:
              "messages{created_time,message,id,to,from,thread_id},can_reply,participants,subject,id,unread_count,message_count,name",
            access_token: pageAccessToken,
          },
        }
      );
      console.log("fetchedConversation", response.data);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendTextMessage = createAsyncThunk(
  "conversations/sendTextMessage",
  async ({ pageId, pageAccessToken, recipientPSId, inputText }, thunkAPI) => {
    const url = `https://graph.facebook.com/v19.0/${pageId}/messages`;
    const messageData = {
      recipient: { id: recipientPSId },
      message: { text: inputText },
      messaging_type: "RESPONSE",
    };

    const config = {
      params: {
        access_token: pageAccessToken,
      },
    };

    try {
      const response = await axios.post(url, messageData, config);
      console.log(response.data);
      if (response.error) {
        throw new Error(error.message);
      }
      const data = await response.json();
      console.log("sentMessage", data);
      return data;
    } catch (error) {
      console.error(error.response.data);
      const message = error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  conversations: [],
  goToAgentScreen: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;

      state.message = "";
    },
    deleteConversations: (state) => {
      state.conversations = [];
      localStorage.removeItem("conversations");
    },
    resetGoToAgentScreen: (state) => {
      state.goToAgentScreen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversations.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "Fetching conversations...";
    });
    builder.addCase(fetchConversations.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = "Conversations fetched successfully";
      state.conversations = payload;
      state.goToAgentScreen = true;
    });
    builder.addCase(fetchConversations.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = `Error: ${payload}`;
    });
    builder.addCase(sendTextMessage.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "Sending message...";
    });
  },
});
export const { reset, deleteConversations, resetGoToAgentScreen } =
  conversationSlice.actions;
export default conversationSlice.reducer;

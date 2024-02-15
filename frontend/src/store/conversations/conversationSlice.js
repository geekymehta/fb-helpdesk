import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchConversations = createAsyncThunk(
  "conversations/fetchConversations",
  async ({ pageId, pageAccessToken }, thunkAPI) => {
    try {
      // const currentPage = thunkAPI.getState().pages.currentPage;
      //   const pageAccessToken =
      //     thunkAPI.getState().pages.pages[currentPage].access_token;
      //   const pageId = thunkAPI.getState().pages.pages[0].id;
      const response = await fetch(
        `https://graph.facebook.com/v19.0/${pageId}/conversations?fields=participants,messages{id,from,to,message,created_time}&access_token=${pageAccessToken}`
      );
      const data = await response.json();
      console.log("fetchedConversation", data);
      return data;
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
  },
});
export const { reset, deleteConversations, resetGoToAgentScreen } =
  conversationSlice.actions;
export default conversationSlice.reducer;

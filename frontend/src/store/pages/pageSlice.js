import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPages = createAsyncThunk(
  "pages/fetchPages",
  async ({ userId, userAccessToken }, thunkAPI) => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/${userId}/accounts?access_token=${userAccessToken}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      return data.data;
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
  pages: [],
  currentPage: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};
// {
//     pageNo,
//     id,
//     pageAccessToken,
//     category,
//     name,
//     tasks,
//     isLoading,
//     isError,
//     isSuccess,
//     message,
//   }

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setPages: (state, { payload }) => {
      state.pages = payload;
    },
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    deletePages: (state) => {
      state.pages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPages.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = "fetching pages...";
    });
    builder.addCase(fetchPages.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.message = "Successfully fetched pages.";
      state.pages = payload;
    });
    builder.addCase(fetchPages.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = payload;
    });
  },
});

export const { reset, setPages, setCurrentPage, deletePages } =
  pageSlice.actions;
export default pageSlice.reducer;

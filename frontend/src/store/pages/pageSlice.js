import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPages = createAsyncThunk(
  "pages/fetchPages",
  async ({ userId, userAccessToken }, thunkAPI) => {
    let profileData;
    try {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/me?fields=id,name,email,first_name,middle_name,last_name,gender,picture&access_token=${userAccessToken}`
      );

      console.log("profileData1", profileData);
      if (!response.ok) {
        console.log("could not fetch user profile");
        throw new Error("Could not fetch user profile!");
      }
      profileData = await response.json();
      console.log("profileData", profileData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
    try {
      const response = await fetch(
        `https://graph.facebook.com/v19.0/${userId}/accounts?access_token=${userAccessToken}`
      );
      if (response.error) {
        throw new Error(error.message);
      }
      const data = await response.json();

      const pages = data.data;
      const item = {
        pages: pages,
        profileData: profileData,
        expiry: new Date().getTime() + 2 * 60 * 60 * 1000,
      };

      localStorage.setItem("pages", JSON.stringify(item));

      console.log("pages", data.data);
      return pages;
    } catch (error) {
      console.log("error", error);
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
  profileData: null,
  currentPage: 0,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

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
      localStorage.removeItem("pages");
    },
    getPagesFromLocalStorage: (state) => {
      const pages = JSON.parse(localStorage.getItem("pages"));
      if (pages && pages.expiry > new Date().getTime()) {
        state.pages = pages.pages;
        state.profileData = pages.profileData;
        state.currentPage = pages.pages.length - 1;
      } else {
        localStorage.removeItem("pages");
      }
    },
    deletePagesFromLocalStorage: (state) => {
      localStorage.removeItem("pages");
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
      state.profileData = JSON.parse(localStorage.getItem("pages")).profileData;
    });
    builder.addCase(fetchPages.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.message = payload;
    });
  },
});

export const {
  reset,
  setPages,
  setCurrentPage,
  deletePages,
  getPagesFromLocalStorage,
} = pageSlice.actions;
export default pageSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitPost = createAsyncThunk(
  "posts/submitPost",
  async (postData) => {
    return axios.post("/api/new-post", postData);
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    status: null,
  },

  reducers: {
    addPost(state, action) {
      state.list = action.payload;
    },
  },

  extraReducers: {
    [addPost.pending]: (state, action) => {
      state.status = "loading";
    },

    [addPost.fulfilled]: (state, action) => {
      state.status = "success";
    },

    [addPost.rejected]: (state, action) => {
      state.status = action.error.message;
    },
  },
});

export default postsSlice.reducer;

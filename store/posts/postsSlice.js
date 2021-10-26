import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitPost = createAsyncThunk(
  "posts/submitPost",
  async (postData) => {
    await axios.post("/api/posts", postData);
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    list: [],
    status: "",
  },

  reducers: {
    addPost(state, action) {
      state.list = action.payload;
    },
    resetPostStatus(state, action) {
      state.postStatus = "";
    },
  },

  extraReducers: {
    [submitPost.pending]: (state, action) => {
      state.status = "loading";
    },

    [submitPost.fulfilled]: (state, action) => {
      state.status = "success";
    },

    [submitPost.rejected]: (state, action) => {
      state.status = action.error.message;
    },
  },
});

export const { resetPostStatus } = postsSlice.actions;
export default postsSlice.reducer;

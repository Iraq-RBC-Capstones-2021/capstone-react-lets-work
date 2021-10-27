import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { db } from "../../firebase/firebase";

export const postComment = createAsyncThunk(
  "postComment/comments",
  async ({ comment, postId }) => {
    await axios.post(`/api/comments/${postId}`, comment);
  }
);
export const getComments = createAsyncThunk(
  "getComments/comments",
  async (postId) => {
    return (
      await getDocs(
        query(
          collection(db, `posts/${postId}/comments`),
          orderBy("createdAt", "desc")
        )
      )
    ).docs.map((d) => {
      return {
        ...d.data(),
        id: d.id,
      };
    });
  }
);
export const handleCommentLike = createAsyncThunk(
  "handleCommentLike/comments",
  async ({ userId, postId, commentId }) => {
    await axios.post(`/api/comments/likes/${commentId}`, {
      userId,
      postId,
    });
  }
);
const commentSlice = createSlice({
  name: "comments",
  initialState: {
    postCommentStatus: "",
    comments: { status: "", data: [] },
    likeStatus: "",
  },
  reducers: {},
  extraReducers: {
    [postComment.fulfilled]: (state) => {
      state.postCommentStatus = "success";
    },
    [postComment.pending]: (state) => {
      state.postCommentStatus = "loading";
    },
    [postComment.rejected]: (state) => {
      state.postCommentStatus = "error";
    },
    [getComments.fulfilled]: (state, action) => {
      state.comments.status = "success";
      state.comments.data = action.payload;
    },
    [getComments.pending]: (state) => {
      state.comments.status = "loading";
    },
    [getComments.rejected]: (state, action) => {
      state.comments.status = "error";
    },
    [handleCommentLike.fulfilled]: (state, action) => {
      state.likeStatus = "success";
    },
    [handleCommentLike.pending]: (state) => {
      state.likeStatus = "loading";
    },
    [handleCommentLike.rejected]: (state, action) => {
      state.likeStatus = "error";
    },
  },
});
export default commentSlice.reducer;

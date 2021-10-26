import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "./auth/authSlice";
import postsSlice from "./posts/postsSlice";
import userSlice from "./user/userSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authSlice,
      posts: postsSlice,
      user: userSlice,
    },

    devTools: true,
  });

export const wrapper = createWrapper(makeStore);

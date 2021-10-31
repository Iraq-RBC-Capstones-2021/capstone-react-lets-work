import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "./auth/authSlice";
import commentSlice from "./comments/commentSlice";
import postsSlice from "./posts/postsSlice";
import userSlice from "./user/userSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authSlice,
      posts: postsSlice,
      user: userSlice,
      comments: commentSlice,
    },

    devTools: true,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });

export const wrapper = createWrapper(makeStore);

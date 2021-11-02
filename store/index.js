import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "./auth/authSlice";
import chatSlice from "./chat/chatSlice";
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
      chat: chatSlice,
    },

    devTools: true,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });

export const wrapper = createWrapper(makeStore);

import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "./auth/authSlice";
import postSlice from "./posts/postSlice";
import userSlice from "./user/userSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authSlice,
      posts: postSlice,
      user: userSlice,
    },

    devTools: true,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });

export const wrapper = createWrapper(makeStore);

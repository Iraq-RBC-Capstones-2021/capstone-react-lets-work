import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "./auth/authSlice";
import profileSlice from "./profile/profileSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authSlice,
      profile: profileSlice,
    },

    devTools: true,
  });

export const wrapper = createWrapper(makeStore);

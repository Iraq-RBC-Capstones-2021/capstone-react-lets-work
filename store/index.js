import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "./auth/authSlice";
import searchSlice from "./search/searchSlice";
import userSlice from "./user/userSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authSlice,
      user: userSlice,
      search: searchSlice,
    },

    devTools: true,
  });

export const wrapper = createWrapper(makeStore);

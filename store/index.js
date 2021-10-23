import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import counterSlice from "./counter/counterSlice";
import authSlice from "./auth/authSlice";
const makeStore = () =>
  configureStore({
    reducer: {
      [counterSlice.name]: counterSlice.reducer,
      auth: authSlice,
    },

    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
export const selectCounter = () => (state) => state?.[counterSlice.name]?.value;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { firebaseErrors } from "../../firebase/firebaseErrors";

const profileSlice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const {} = profileSlice.actions;
export default profileSlice.reducer;

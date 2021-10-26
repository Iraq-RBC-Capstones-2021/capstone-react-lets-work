import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firebaseErrors } from "../../firebase/firebaseErrors";

const searchSlice = createSlice({
  name: "search",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export const {} = searchSlice.actions;
export default searchSlice.reducer;

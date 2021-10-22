import { createSlice } from "@reduxjs/toolkit";
import { addPostToFirebase } from "../../firebase/firebaseFunctions";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    entities: [],
  },

  reducers: {
    postAdded(state, action) {
      addPostToFirebase(action.payload);
      state.entities.push(action.payload);
    },
  },
});

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;

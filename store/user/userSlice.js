import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { firebaseErrors } from "../../firebase/firebaseErrors";

export const getUserProfileData = createAsyncThunk(
  "profile/getUserProfileData",
  async (userId) => {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    entities: {
      username: "",
      job: "",
      bio: "",
      interests: [],
      skills_hobbies: "",
      social: { instagram: "", facebook: "", email: "", linkedIn: "" },
      about: "",
    },
    loading: true,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getUserProfileData.fulfilled]: (state, action) => {
      state.entities = action.payload;
      state.loading = false;
    },
    [getUserProfileData.rejected]: (state, action) => {
      state.error = firebaseErrors(
        "Firebase: Error (profile/profile-data-fetch-error)."
      );
      state.loading = true;
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;

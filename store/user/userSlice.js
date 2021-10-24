import { doc, updateDoc } from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { db } from "../../firebase/firebase";
import { firebaseErrors } from "../../firebase/firebaseErrors";

export const getUserProfileData = createAsyncThunk(
  "profile/getUserProfileData",
  async (userId) => {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  }
);

export const updateUserProfileData = createAsyncThunk(
  "profile/updateUserProfileData",
  async ({ userId, newData }) => {
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      name: newData.name,
      username: newData.username,
      email: newData.email,
      bio: newData.bio,
      about: newData.about,
      skills_hobbies: newData.skills_hobbies,
      interests: newData.interests,
      social: {
        facebook: newData.facebook,
        instagram: newData.instagram,
        youtube: newData.youtube,
        linkedIn: newData.linkedIn,
      },
    });
    console.log();
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
    updateRequest: {
      error: "",
      success: "",
      status: "",
    },
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
    [updateUserProfileData.fulfilled]: (state) => {
      state.updateRequest = {
        status: "success",
        success: "Your data was succesfully updated",
        error: null,
      };
    },
    [updateUserProfileData.rejected]: (state) => {
      state.updateRequest = {
        status: "fail",
        error: "Failed updating your data",
        success: null,
      };
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;

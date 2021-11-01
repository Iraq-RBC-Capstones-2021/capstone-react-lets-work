import { getAuth, updateProfile } from "firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { firebaseErrors } from "../../firebase/firebaseErrors";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { notificationDb } from "../../firebase/firebase";

export const getAllNotification = createAsyncThunk(
  "profile/getAllNotification",
  async (userId) => {
    const notificationRef = ref(notificationDb, `users/${userId}`);
    let notificationArray;
    await onValue(notificationRef, (snapshot) => {
      const data = snapshot.val();
      notificationArray = data;
    });
    return notificationArray;
  }
);

export const getUserProfileData = createAsyncThunk(
  "profile/getUserProfileData",
  async (userId) => {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  }
);

export const updateUserProfileData = createAsyncThunk(
  "profile/updateUserProfileData",
  async ({ newData }) => {
    const auth = getAuth();
    newData = {
      name: newData.name,
      username: newData.username,
      email: newData.email,
      bio: newData.bio,
      about: newData.about,
      skills_hobbies: newData.skills_hobbies,
      interests: newData.interests,
      imageURL: newData.imageURL,
      social: {
        facebook: newData.facebook,
        instagram: newData.instagram,
        youtube: newData.youtube,
        linkedIn: newData.linkedIn,
      },
    };
    await axios.put(`/api/users/${getAuth().currentUser.uid}`, newData);

    if (
      auth.currentUser.displayName !== newData.name ||
      auth.currentUser.photoURL !== newData.imageURL
    ) {
      await updateProfile(auth.currentUser, {
        displayName: newData.name,
        photoURL: newData.imageURL,
      });
    }
    return newData;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    entities: {
      name: "",
      username: "",
      email: "",
      bio: "",
      interests: [],
      skills_hobbies: "",
      social: { instagram: "", facebook: "", email: "", linkedIn: "" },
      about: "",
      imageURL: "",
    },
    loading: true,
    error: "",
    updateRequest: {
      error: "",
      success: "",
      status: "",
    },
    notifications: { data: [], status: "" },
  },
  reducers: {
    resetUpdateRequest(state) {
      state.updateRequest = {
        error: "",
        success: "",
        status: "",
      };
    },
  },
  extraReducers: {
    [getUserProfileData.fulfilled]: (state, action) => {
      state.entities = action.payload;
      state.loading = false;
    },
    [getUserProfileData.rejected]: (state) => {
      state.error = firebaseErrors(
        "Firebase: Error (profile/profile-data-fetch-error)."
      );
      state.loading = true;
    },
    [updateUserProfileData.fulfilled]: (state, action) => {
      state.entities = action.payload;
      state.updateRequest = {
        status: "success",
        success: "Your data was succesfully updated",
        error: null,
      };
    },
    [updateUserProfileData.rejected]: (state, action) => {
      state.updateRequest = {
        status: "fail",
        error: "Failed updating your data",
        success: null,
      };
    },
    [getAllNotification.fulfilled]: (state, action) => {
      state.notifications.data = action.payload;
      state.notifications.status = "success";
    },
  },
});

export const { resetUpdateRequest } = userSlice.actions;
export default userSlice.reducer;

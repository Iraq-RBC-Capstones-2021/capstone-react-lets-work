import { getAuth, updateProfile } from "firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { firebaseErrors } from "../../firebase/firebaseErrors";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../../firebase/firebase";
import moment from "moment";

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
export const getAllUsers = createAsyncThunk("getAllUsers/user", async () => {
  const users = await (
    await getDocs(collection(db, "users"))
  ).docs.map((user) => {
    return {
      ...user.data(),
      createdAt: moment(user.data().createdAt.toDate()).calendar(),
    };
  });
  return users;
});

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
    error: "",
    users: [],
  },
  reducers: {
    resetUpdateRequest(state) {
      state.updateRequest = {
        error: "",
        success: "",
        status: "",
      };
    },
    setNotifications(state, action) {
      state.notifications.data = action.payload.sort((a, b) => {
        let dateA = new Date(a[1].createdAt).getTime();
        let dateB = new Date(b[1].createdAt).getTime();
        return dateA < dateB ? 1 : -1;
      });
      state.notifications.status = "success";
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
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {},
  },
});

export const { resetUpdateRequest, setNotifications } = userSlice.actions;
export default userSlice.reducer;

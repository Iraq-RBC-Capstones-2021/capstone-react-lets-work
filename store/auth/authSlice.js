import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "@firebase/auth";
import { auth } from "../../firebase/firebase";
import axios from "axios";
import { firebaseErrors } from "../../firebase/firebaseErrors";
export const handleSignUp = createAsyncThunk(
  "handleSignUp/auth",
  async ({ password, email, username }) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, {
      displayName: username,
    });
    await axios.post("/api/users", {
      email,
      username: user.displayName,
      id: user.uid,
      imageURL: "",
    });

    await sendEmailVerification(user);
  }
);
export const sendVerificationEmail = createAsyncThunk(
  "sendVerificationEmail/auth",
  async () => {
    await sendEmailVerification(auth.currentUser);
  }
);
export const handleSignIn = createAsyncThunk(
  "handleSignIn/auth",
  async ({ email, password, rememberSession }) => {
    await setPersistence(
      auth,
      rememberSession ? browserLocalPersistence : browserSessionPersistence
    );

    const { user } = await signInWithEmailAndPassword(auth, email, password);

    await axios.put(`/api/users/${user.uid}`, {
      isOnline: true,
    });
  }
);
export const googleSignin = createAsyncThunk("googleSignin/auth", async () => {
  const googleProvider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, googleProvider);

  const docSnap = await (await axios.get(`/api/users/${user.uid}`)).data;
  if (!docSnap) {
    await axios.post("/api/users", {
      username: user.displayName,
      email: user.email,
      id: user.uid,
      imageURL: user.photoURL,
    });
  }
  await axios.put(`/api/users/${user.uid}`, {
    isOnline: true,
  });
});
export const handleForgetPass = createAsyncThunk(
  "handleForgetPass/auth",
  async (email) => {
    await sendPasswordResetEmail(auth, email);
  }
);
export const handleSignOut = createAsyncThunk(
  "handleSignOut/auth",
  async (userId) => {
    await signOut(auth);
    await axios.put(`/api/users/${userId}`, {
      isOnline: false,
    });
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: "false",
    signUp: { status: "", errorMessage: "" },
    verficationEmail: { status: "", errorMessage: "" },
    signIn: { status: "", errorMessage: "" },
    forgotPass: { status: "", errorMessage: "" },
    signOut: { status: "", errorMessage: "" },
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    resetStatus: (state) => {
      state.signUp = { status: "", errorMessage: "" };
      state.signIn = { status: "", errorMessage: "" };
      state.signOut = { status: "", errorMessage: "" };
    },
  },
  extraReducers: {
    [handleSignUp.pending]: (state) => {
      state.signUp.status = "loading";
    },
    [handleSignUp.fulfilled]: (state) => {
      state.signUp.status = "success";
      state.signUp.errorMessage = "";
    },
    [handleSignUp.rejected]: (state, action) => {
      state.signUp.status = "error";
      const error = firebaseErrors(action.error.message);

      state.signUp.errorMessage = error;
    },
    [sendVerificationEmail.pending]: (state) => {
      state.verficationEmail.status = "loading";
    },
    [sendVerificationEmail.fulfilled]: (state) => {
      state.verficationEmail.status = "success";
    },
    [sendVerificationEmail.rejected]: (state, action) => {
      state.verficationEmail.status = "error";
      const error = firebaseErrors(action.error.message);
      state.verficationEmail.errorMessage = error;
    },
    [handleSignIn.pending]: (state) => {
      state.signIn.status = "loading";
    },
    [handleSignIn.fulfilled]: (state) => {
      state.signIn.status = "success";
      state.signIn.errorMessage = "";
    },
    [handleSignIn.rejected]: (state, action) => {
      const error = firebaseErrors(action.error.message);
      state.signIn.status = "error";
      state.signIn.errorMessage = error;
    },
    [googleSignin.rejected]: (state, action) => {
      state.signIn.status = "error";
      const error = firebaseErrors(action.error.message);
      state.signIn.errorMessage = error;
    },
    [googleSignin.fulfilled]: (state) => {
      state.signIn.status = "success";
    },
    [handleForgetPass.pending]: (state) => {
      state.forgotPass.status = "loading";
    },
    [handleForgetPass.fulfilled]: (state) => {
      state.forgotPass.status = "success";
    },
    [handleForgetPass.rejected]: (state, action) => {
      state.forgotPass.status = "error";
      const error = firebaseErrors(action.error.message);
      state.forgotPass.errorMessage = error;
    },
    [handleSignOut.fulfilled]: (state) => {
      state.signOut.status = "success";
    },
    [handleSignOut.pending]: (state) => {
      state.signOut.status = "loading";
    },
    [handleSignOut.rejected]: (state, action) => {
      state.signOut.status = "error";
      const error = firebaseErrors(action.error.message);
      state.signOut.errorMessage = error;
    },
  },
});
export const { setIsLoggedIn, resetStatus } = authSlice.actions;
export default authSlice.reducer;

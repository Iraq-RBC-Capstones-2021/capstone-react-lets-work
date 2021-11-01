import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { auth, db } from "../../firebase/firebase";

export const handleChatRoom = createAsyncThunk(
  "handleChatRoom/chat",
  async ({ userId, currentUserId }) => {
    const firstCheck = await getDocs(
      query(
        collection(db, "chat"),
        where("type", "==", "individual"),
        where("users", "==", [userId, currentUserId])
      )
    );
    const secondCheck = await getDocs(
      query(
        collection(db, "chat"),
        where("type", "==", "individual"),
        where("users", "==", [currentUserId, userId])
      )
    );
    const firstRoomCheck = firstCheck.docs.map((d) => d.id);
    const secondRoomCheck = secondCheck.docs.map((d) => d.id);
    const roomId =
      firstRoomCheck.length > 0
        ? firstRoomCheck[0]
        : secondRoomCheck.length > 0 && secondRoomCheck[0];
    if (roomId) return roomId;
    if (!roomId) {
      const roomId = await addDoc(collection(db, "chat"), {
        users: [currentUserId, userId],
        type: "individual",
      }).then((d) => d.id);
      return roomId;
    }
  }
);
export const sendMessage = createAsyncThunk(
  "sendMessage/chat",
  async ({ message, chatId }) => {
    await axios.post(`/api/chat/${chatId}`, message);
  }
);
export const getChatUsers = createAsyncThunk("getChatUsers/chat", async () => {
  const chatRoom = await (
    await getDocs(
      query(
        collection(db, "chat"),
        where("type", "==", "individual"),
        where("users", "array-contains", auth.currentUser?.uid)
      )
    )
  ).docs.map((d) => d.data());
  const newChatRoom = chatRoom.map((room) => {
    return {
      users: room.users.filter((u) => u !== auth.currentUser.uid),
    };
  });
  const users = newChatRoom.map((room) => room.users.join());

  return users;
});
export const getGroupChats = createAsyncThunk(
  "getGroupChats/chat",
  async () => {
    const groupChatRef = await getDocs(
      query(
        collection(db, "chat"),
        where("type", "==", "group"),
        where("users", "array-contains", auth.currentUser?.uid)
      )
    );
    const groupChats = groupChatRef.docs.map((chat) => {
      return { ...chat.data(), id: chat.id };
    });
    return groupChats;
  }
);
export const joinGroupChat = createAsyncThunk(
  "joinGroupChat/chat",
  async (id) => {
    const isJoined = await (await getDoc(doc(db, "chat", id)))
      .data()
      ?.users.includes(auth.currentUser?.uid);
    console.log(isJoined);
    if (!isJoined) {
      await updateDoc(doc(db, "chat", id), {
        users: arrayUnion(auth.currentUser?.uid),
      });
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatRoom: { id: "", status: "" },
    chatUser: {},
    sendMessageStatus: "",
    chatUsers: { status: "", data: [] },
    groupChats: { status: "", data: [] },
    groupChat: {},
  },
  reducers: {
    setChatUser(state, action) {
      state.chatUser = action.payload;
    },
    setGroupChat(state, action) {
      state.groupChat = action.payload;
    },
    resetChatStatus(state) {
      state.chatRoom.status = "";
    },
  },
  extraReducers: {
    [handleChatRoom.fulfilled]: (state, action) => {
      state.chatRoom.id = action.payload;
      state.chatRoom.status = "success";
    },
    [handleChatRoom.pending]: (state, action) => {
      state.chatRoom.status = "loading";
    },
    [handleChatRoom.rejected]: (state, action) => {
      state.chatRoom.status = "error";
    },
    [sendMessage.fulfilled]: (state, action) => {
      state.sendMessageStatus = action.payload;
      state.sendMessageStatus = "success";
    },
    [sendMessage.pending]: (state, action) => {
      state.sendMessageStatus = "loading";
    },
    [sendMessage.rejected]: (state, action) => {
      state.sendMessageStatus = "error";
    },
    [getChatUsers.fulfilled]: (state, action) => {
      state.chatUsers.data = action.payload;
      state.chatUsers.status = "success";
    },
    [getChatUsers.pending]: (state, action) => {
      state.chatUsers.status = "loading";
    },
    [getChatUsers.rejected]: (state, action) => {
      state.chatUsers.status = "error";
    },
    [getGroupChats.fulfilled]: (state, action) => {
      state.groupChats.data = action.payload;
      state.groupChats.status = "success";
    },
    [getGroupChats.pending]: (state, action) => {
      state.groupChats.status = "loading";
    },
    [getGroupChats.rejected]: (state, action) => {
      state.groupChats.status = "error";
      console.log(action.error.message);
    },
    [joinGroupChat.rejected]: (state, action) => {
      // state.groupChats.status = "error";
      console.log(action.error.message);
    },
  },
});
export const { setChatUser, resetChatStatus, setGroupChat } = chatSlice.actions;
export default chatSlice.reducer;

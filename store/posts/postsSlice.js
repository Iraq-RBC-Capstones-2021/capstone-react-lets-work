import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  getDoc,
  doc,
} from "@firebase/firestore";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import { auth, db } from "../../firebase/firebase";

export const submitPost = createAsyncThunk(
  "posts/submitPost",
  async (postData) => {
    await axios.post("/api/posts", postData);
  }
);
export const getTopProjects = createAsyncThunk(
  "getTopProjects/posts",
  async (limits = 3, { getState, dispatch }) => {
    const last = getState().posts.lastTopPost;
    const topPosts = await getDocs(
      query(
        collection(db, "posts"),
        orderBy("likesCount", "desc"),

        startAfter(last || "0"),
        limit(limits)
      )
    );
    const lastPost = topPosts.docs[topPosts.docs.length - 1];
    dispatch(setLastTopPost(lastPost));

    const posts = topPosts.docs.map((post) => {
      return {
        ...post.data(),
        id: post.id,
        createdAt: moment(post.data().createdAt.toDate()).calendar(),
      };
    });
    return posts;
  }
);

export const getAllPosts = createAsyncThunk("getAllPosts/posts", async () => {
  let posts = [];
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    posts.push({ ...doc.data(), id: doc.id });
  });
  posts = posts.map((post) => {
    return {
      ...post,
      createdAt: moment(post.createdAt.toDate()).format("YYYY-MM-DD HH:mm"),
    };
  });

  return posts;
});
export const getSinglePost = createAsyncThunk(
  "getSinglePost/posts",
  async (postId) => {
    const post = await getDoc(doc(db, "posts", postId));
    const newPost = {
      ...post.data(),
      createdAt: moment(post.data().createdAt.toDate()).calendar(),
      id: post.id,
    };
    return newPost;
  }
);

export const getMostRecentProjects = createAsyncThunk(
  "getMostRecentProjects/posts",
  async (limits = 3, { getState, dispatch }) => {
    const last = getState().posts.lastRecentPost;
    const mostRecent = await getDocs(
      query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        startAfter(last),
        limit(limits)
      )
    );
    const lastPost = mostRecent.docs[mostRecent.docs.length - 1];
    dispatch(setLastRecentPost(lastPost));

    const posts = mostRecent.docs.map((post) => {
      return {
        ...post.data(),
        id: post.id,
        createdAt: moment(post.data().createdAt.toDate()).calendar(),
      };
    });
    return posts;
  }
);
export const getFavPosts = createAsyncThunk(
  "getPosts/posts",
  async (limits = 3, { getState, dispatch }) => {
    const last = getState().posts.lastFavPost;
    const favPosts = await getDocs(
      query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        where("likes", "array-contains", auth.currentUser.uid),
        startAfter(last),
        limit(limits)
      )
    );
    const lastPost = favPosts.docs[favPosts.docs.length - 1];
    dispatch(setLastFavPost(lastPost));

    const posts = favPosts.docs.map((post) => {
      return {
        ...post.data(),
        id: post.id,
        createdAt: moment(post.data().createdAt.toDate()).calendar(),
      };
    });
    return posts;
  }
);
export const getInitialPosts = createAsyncThunk(
  "getInitialPosts/posts",
  async (order) => {
    const postsRef = await getDocs(
      query(collection(db, "posts"), orderBy(order, "desc"), limit(3))
    );

    const posts = postsRef.docs.map((post) => {
      return {
        id: post.id,
        ...post.data(),
        createdAt: moment(post.data().createdAt.toDate()).calendar(),
      };
    });

    return posts;
  }
);

export const handleLike = createAsyncThunk(
  "handleLike/posts",
  async ({ postId, userId }) => {
    await axios.post(`/api/posts/likes/${postId}`, {
      userId,
    });
  }
);
export const deletePost = createAsyncThunk(
  "deletePost/posts",
  async (postId) => {
    await axios.delete(`/api/posts/${postId}`);
  }
);
export const editPost = createAsyncThunk(
  "editPost/posts",
  async ({ postId, post }) => {
    await axios.put(`/api/posts/${postId}`, post);
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    allPosts: { data: [], status: "" },
    topPosts: { data: [], status: "" },
    lastTopPost: "",
    mostRecentPosts: { data: [], status: "" },
    lastRecentPost: "",
    favPosts: { data: [], status: "" },
    lastFavPost: "",
    initialPosts: [],
    likeStatus: "",
    status: "",
    list: [],
    singlePost: { status: "", data: [] },
    deletePostStatus: "",
    editPostStatus: "",
  },
  reducers: {
    setLastTopPost(state, action) {
      state.lastTopPost = action.payload;
    },
    setLastRecentPost(state, action) {
      state.lastRecentPost = action.payload;
    },
    setLastFavPost(state, action) {
      state.lastFavPost = action.payload;
    },
    favHandler(state, action) {
      const post = action.payload;
      const isthere = state.favPosts.data.find((p) => p.id === post.id);
      if (isthere) {
        const index = state.favPosts.data.findIndex((p) => p.id === post.id);
        state.favPosts.data.splice(index, 1);
      } else if (!isthere) {
        state.favPosts.data.push(post);
      }
    },
    resetPostStatus(state, action) {
      state.status = "";
    },
    resetEditStatus(state) {
      state.deletePostStatus = "";
      state.editPostStatus = "";
    },

    likeHandler(state, action) {
      const { post, userId } = action.payload;
      const { id: postId } = post;
      function likePost(posts) {
        posts.map((post) => {
          if (post.id === postId) {
            if (!post.likes.includes(userId)) {
              return {
                ...post,
                likes: post.likes.push(userId),
                likesCount: post.likesCount + 1,
              };
            } else {
              const userIndex = post.likes.findIndex((user) => user === userId);
              post.likes.splice(userIndex, 1);
              return {
                ...post,
                likesCount: post.likesCount - 1,
              };
            }
          }
        });
      }
      likePost(state.topPosts.data);
      likePost(state.mostRecentPosts.data);
      likePost(state.favPosts.data);
      const isFav = post.likes.find((user) => user === userId);
      if (isFav) {
        const index = state.favPosts.data.findIndex((p) => p.id === post.id);
        state.favPosts.data.splice(index, 1);
      } else if (!isFav) {
        state.favPosts.data.push({
          ...post,
          likes: [...post.likes, userId],
          likesCount: post.likesCount + 1,
        });
      }
    },
  },
  extraReducers: {
    [getTopProjects.fulfilled]: (state, action) => {
      state.topPosts.data.push(...action.payload);

      state.topPosts.status = "success";
    },
    [getTopProjects.rejected]: (state) => {
      state.topPosts.status = "error";
    },
    [getTopProjects.pending]: (state) => {
      state.topPosts.status = "loading";
    },
    [getMostRecentProjects.fulfilled]: (state, action) => {
      state.mostRecentPosts.data.push(...action.payload);

      state.mostRecentPosts.status = "success";
    },
    [getMostRecentProjects.rejected]: (state) => {
      state.mostRecentPosts.status = "error";
    },
    [getMostRecentProjects.pending]: (state) => {
      state.mostRecentPosts.status = "loading";
    },
    [getFavPosts.fulfilled]: (state, action) => {
      state.favPosts.data.push(...action.payload);

      state.favPosts.status = "success";
    },
    [getFavPosts.rejected]: (state) => {
      state.favPosts.status = "error";
    },
    [getFavPosts.pending]: (state) => {
      state.favPosts.status = "loading";
    },
    [getInitialPosts.fulfilled]: (state, action) => {
      state.initialPosts = action.payload;
    },
    [getInitialPosts.rejected]: (state, action) => {
      state.initialPosts = action.payload;
    },

    [handleLike.pending]: (state) => {
      state.likeStatus = "loading";
    },
    [handleLike.fulfilled]: (state) => {
      state.likeStatus = "success";
    },
    [handleLike.rejected]: (state) => {
      state.likeStatus = "error";
    },
    [submitPost.pending]: (state) => {
      state.status = "loading";
    },

    [submitPost.fulfilled]: (state) => {
      state.status = "success";
    },

    [submitPost.rejected]: (state) => {
      state.status = "error";
    },
    [deletePost.pending]: (state) => {
      state.deletePostStatus = "loading";
    },

    [deletePost.fulfilled]: (state) => {
      state.deletePostStatus = "success";
    },

    [deletePost.rejected]: (state) => {
      state.deletePostStatus = "error";
    },
    [editPost.pending]: (state) => {
      state.editPostStatus = "loading";
    },

    [editPost.fulfilled]: (state) => {
      state.editPostStatus = "success";
    },

    [editPost.rejected]: (state) => {
      state.editPostStatus = "error";
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.allPosts.data = action.payload;
      state.allPosts.status = "success";
    },
    [getAllPosts.rejected]: (state) => {
      state.allPosts.status = "error";
    },
    [getSinglePost.fulfilled]: (state, action) => {
      state.singlePost.data = action.payload;
      state.singlePost.status = "success";
    },
    [getSinglePost.rejected]: (state, action) => {
      state.singlePost.status = "error";
    },
    [getSinglePost.pending]: (state, action) => {
      state.singlePost.status = "loading";
    },
  },
});
export const {
  setLastTopPost,
  setLastRecentPost,
  likeHandler,
  setLastFavPost,
  favHandler,
  resetPostStatus,
  resetEditStatus,
} = postSlice.actions;
export default postSlice.reducer;

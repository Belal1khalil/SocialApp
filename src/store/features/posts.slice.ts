import { apiClient } from "@/services/api-client";
import { postsState } from "@/types/posts.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const initialState: postsState = {
  posts: null,
  postDetails: null,
};

export const fetchPosts = createAsyncThunk("/user/posts", async () => {
  try {
    const options = {
      method: "GET",
      url: "/posts?limit=50",
    };
    const response = await apiClient.request(options);

    return response.data.posts;
  } catch (error) {
    throw error;
  }
});
export const fetchPostDetails = createAsyncThunk(
  "/user/fetchPostDetails",
  async (postId: string) => {
    try {
      const options = {
        method: "GET",
        url: `/posts/${postId}`,
      };
      const response = await apiClient.request(options);

      return response.data.post;
    } catch (error) {
      throw error;
    }
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.log("Posts fetch rejected");
      });
    builder.addCase(fetchPostDetails.fulfilled, (state, action) => {
      state.postDetails = action.payload;
    });
    builder.addCase(fetchPostDetails.rejected, (state, action) => {
      console.log("rejected post details:");
      console.log({ state, action });
    });
  },
});

export const postsReducer = postsSlice.reducer;

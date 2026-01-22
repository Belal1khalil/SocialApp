import { apiClient } from "@/services/api-client";
import { postsState } from "@/types/posts.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import { toast } from "react-toastify";
import { DeleteUserPost } from "./user.slice";

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
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, PostData }: { postId: string; PostData: any }) => {
    try {
      const options = {
        method: "PUT",
        url: `/posts/${postId}`,
        data: PostData,
      };
      const response = await apiClient.request(options);
      return response.data;
    } catch (error) {
      console.error("Update post failed:", error);
      throw error;
    }
  }
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
    builder.addCase(updatePost.fulfilled, (state, action) => {
      console.log("post updated successfully", action.payload);
      const updatedPost = action.payload.post;
      
      if (state.posts) {
        state.posts = state.posts.map((post) => {
          if (post._id === updatedPost._id) {
            // Keep existing user and comments if the update doesn't include them properly
            return {
              ...post,
              ...updatedPost,
              user: (typeof updatedPost.user === 'object' && updatedPost.user !== null) 
                ? updatedPost.user 
                : post.user,
              comments: updatedPost.comments || post.comments || []
            };
          }
          return post;
        });
      }
      if (state.postDetails && state.postDetails._id === updatedPost._id) {
        state.postDetails = {
          ...state.postDetails,
          ...updatedPost,
          user: (typeof updatedPost.user === 'object' && updatedPost.user !== null) 
            ? updatedPost.user 
            : state.postDetails.user,
          comments: updatedPost.comments || state.postDetails.comments || []
        };
      }
      toast.success("Post updated successfully");
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      console.log("post update failed");
      toast.error("Failed to update post");
    });
    builder.addCase(DeleteUserPost.fulfilled, (state, action) => {
      if (state.posts) {
        state.posts = state.posts.filter((post) => post._id !== action.meta.arg);
      }
      if (state.postDetails && state.postDetails._id === action.meta.arg) {
        state.postDetails = null;
      }
    });
  },
});

export const postsReducer = postsSlice.reducer;

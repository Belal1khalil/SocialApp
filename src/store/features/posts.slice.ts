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
  },
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ content, postId }: { content: string; postId: string }) => {
    try {
      const options = {
        method: "POST",
        url: "/comments",
        data: {
          content,
          post: postId,
        },
      };
      const response = await apiClient.request(options);
      return { comment: response.data.comment, postId };
    } catch (error) {
      console.error("Add comment failed:", error);
      throw error;
    }
  },
);
export const updateComment = createAsyncThunk(
  "posts/updateComment",
  async ({ content, commentId }: { content: string; commentId: string }) => {
    try {
      const options = {
        method: "PUT",
        url: `/comments/${commentId}`,
        data: {
          content,
        },
      };
      const response = await apiClient.request(options);
      return response.data.comment;
    } catch (error) {
      console.error("Update comment failed:", error);
      throw error;
    }
  },
);
export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (id: string) => {
    try {
      const options = {
        method: "DELETE",
        url: `/comments/${id}`,
      };
      await apiClient.request(options);
      return id;
    } catch (error) {
      console.error("Delete comment failed:", error);
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
              user:
                typeof updatedPost.user === "object" &&
                updatedPost.user !== null
                  ? updatedPost.user
                  : post.user,
              comments: updatedPost.comments || post.comments || [],
            };
          }
          return post;
        });
      }
      if (state.postDetails && state.postDetails._id === updatedPost._id) {
        state.postDetails = {
          ...state.postDetails,
          ...updatedPost,
          user:
            typeof updatedPost.user === "object" && updatedPost.user !== null
              ? updatedPost.user
              : state.postDetails.user,
          comments: updatedPost.comments || state.postDetails.comments || [],
        };
      }
      toast.success("Post updated successfully");
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      console.log("post update failed");
      toast.error("Failed to update post");
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      const { comment, postId } = action.payload;
      if (state.posts) {
        state.posts = state.posts.map((post) => {
          if (post?._id === postId && comment) {
            return {
              ...post,
              comments: [...(post.comments || []), comment],
            };
          }
          return post;
        });
      }
      if (state.postDetails && state.postDetails?._id === postId && comment) {
        state.postDetails = {
          ...state.postDetails,
          comments: [...(state.postDetails.comments || []), comment],
        };
      }
      toast.success("Comment added successfully");
    });
    builder.addCase(addComment.rejected, (state, action) => {
      toast.error("Failed to add comment");
    });
    builder.addCase(DeleteUserPost.fulfilled, (state, action) => {
      if (state.posts) {
        state.posts = state.posts.filter(
          (post) => post._id !== action.meta.arg,
        );
      }
      if (state.postDetails && state.postDetails._id === action.meta.arg) {
        state.postDetails = null;
      }
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      const updatedComment = action.payload;

      // Update in posts list
      if (state.posts) {
        state.posts = state.posts.map((post) => ({
          ...post,
          comments:
            post.comments?.map((comment) =>
              comment._id === updatedComment._id ? updatedComment : comment,
            ) || [],
        }));
      }

      // Update in postDetails
      if (state.postDetails && state.postDetails.comments) {
        state.postDetails.comments = state.postDetails.comments.map((comment) =>
          comment._id === updatedComment._id ? updatedComment : comment,
        );
      }

      toast.success("Comment updated successfully");
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      toast.error("Failed to update another comment");
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      const deletedCommentId = action.payload;

      // Remove from posts list
      if (state.posts) {
        state.posts = state.posts.map((post) => ({
          ...post,
          comments:
            post.comments?.filter((comment) => comment._id !== deletedCommentId) ||
            [],
        }));
      }

      // Remove from postDetails
      if (state.postDetails && state.postDetails.comments) {
        state.postDetails.comments = state.postDetails.comments.filter(
          (comment) => comment._id !== deletedCommentId,
        );
      }

      toast.success("Comment deleted successfully");
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      toast.error("Failed to delete comment");
    });

  },
});

export const postsReducer = postsSlice.reducer;

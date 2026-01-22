"use client";
import PostCard from "@/components/PostCard/PostCard";
import PostSkeleton from "@/skeleton/PostSkeleton";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { fetchPosts } from "@/store/features/posts.slice";
import { useEffect, useState } from "react";
import PostForm from "@/components/PostForm/PostForm";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((store) => store.postsReducer);

  useEffect(() => {
    dispatch(fetchPosts()).then(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl bg-gray-50/50 min-h-screen">
  
        <div className="space-y-6">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <PostForm/>
      <div className="container mx-auto px-4 py-8 max-w-2xl bg-gray-50/50 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">News Feed</h1>
        
        <div className="space-y-6">
          {posts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
          
          {(!posts || posts.length === 0) && (
            <div className="text-center text-gray-500 py-10">
              No posts found.
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

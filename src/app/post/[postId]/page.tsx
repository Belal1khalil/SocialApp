"use client";
import PostCard from "@/components/PostCard/PostCard";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import PostSkeleton from "@/skeleton/PostSkeleton";
import { fetchPostDetails } from "@/store/features/posts.slice";
import { use, useEffect, useState } from "react";

export default function page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const [loading, setLoading] = useState(true);
  const { postId } = use(params);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPostDetails(postId)).then(() => setLoading(false));
  }, [dispatch]);

  const { postDetails } = useAppSelector((store) => store.postsReducer);
  if (loading) {
    return (
      <>
        <div className="container mx-auto px-4 py-8 max-w-2xl bg-gray-50/50 min-h-screen">
          <PostSkeleton />
        </div>
      </>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl bg-gray-50/50 min-h-screen">
      {postDetails ? (
        <PostCard post={postDetails} />
      ) : (
        <div className="text-center">Post not found</div>
      )}
    </div>
  );
}

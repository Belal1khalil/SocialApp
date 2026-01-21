import { Post } from "@/types/posts.types";
import React from "react";
import {
  HiOutlineHeart,
  HiOutlineChat,
  HiOutlineShare,
  HiDotsHorizontal,
} from "react-icons/hi";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  // Helper to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-primary-500 to-purple-500">
              <img
                src={post.user.photo}
                alt={post.user.name}
                className="w-full h-full rounded-full object-cover border-2 border-white"
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-tight">
              {post.user.name}
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50 transition-colors">
          <HiDotsHorizontal size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="px-5 pb-3">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.body}
        </p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="w-full relative bg-gray-50">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-auto max-h-[500px] object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Stats & Actions */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-1">
            <span className="text-gray-900 font-bold">0</span> likes
          </div>
          <div className="flex items-center gap-4">
            <span>{post.comments.length} comments</span>
            <span>0 shares</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-500 font-semibold hover:bg-gray-50 rounded-xl transition-colors group">
            <HiOutlineHeart
              size={22}
              className="group-hover:text-red-500 group-hover:scale-110 transition-transform"
            />
            <span className="group-hover:text-red-500">Like</span>
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-500 font-semibold hover:bg-gray-50 rounded-xl transition-colors group">
            <HiOutlineChat
              size={22}
              className="group-hover:text-primary-600 group-hover:scale-110 transition-transform"
            />
            <span className="group-hover:text-primary-600">Comment</span>
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-500 font-semibold hover:bg-gray-50 rounded-xl transition-colors group">
            <HiOutlineShare
              size={22}
              className="group-hover:text-green-600 group-hover:scale-110 transition-transform"
            />
            <span className="group-hover:text-green-600">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}

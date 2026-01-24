"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { IoSend } from "react-icons/io5";
import userplaceholder from "../../assests/imgs/user (1).png";
import { useState } from "react";
import { addComment } from "@/store/features/posts.slice";

interface CommentFormProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentFormProps) {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.userReducer);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || loading) return;

    setLoading(true);
    try {
      await dispatch(addComment({ content, postId })).unwrap();
      setContent("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/50">
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full p-[1px] bg-gradient-to-tr from-primary-500 to-purple-500">
            <img
              src={userData?.photo || userplaceholder.src}
              alt={userData?.name || "User"}
              className="w-full h-full rounded-full object-cover border-2 border-white"
            />
          </div>
        </div>

        {/* Input Wrapper */}
        <div className="relative flex-1 group">
          <input
            type="text"
            name="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={loading}
            placeholder="Write a comment..."
            className="w-full bg-white border border-gray-200 rounded-2xl py-2.5 px-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all placeholder:text-gray-400 disabled:opacity-70"
          />
          <button
            type="submit"
            disabled={!content.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl text-primary-500 hover:bg-primary-50 transition-colors group-hover:scale-110 active:scale-95 disabled:opacity-50 disabled:group-hover:scale-100"
            title="Send comment"
          >
            <IoSend size={18} className={loading ? "animate-pulse" : ""} />
          </button>
        </div>
      </form>
    </div>
  );
}


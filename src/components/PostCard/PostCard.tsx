import { Post } from "@/types/posts.types";
import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { updatePost } from "@/store/features/posts.slice";

import {
  HiOutlineHeart,
  HiOutlineChat,
  HiOutlineShare,
  HiDotsHorizontal,
  HiOutlinePencil,
  HiOutlinePhotograph,
  HiOutlineX,
} from "react-icons/hi";
import CommentCard from "../CommentCard/CommentCard";
import { BsEye } from "react-icons/bs";
import Link from "next/link";
import { apiClient } from "@/services/api-client";
import { FaDeleteLeft } from "react-icons/fa6";
import { DeleteUserPost } from "@/store/features/user.slice";
import CommentForm from "../Commentform/CommentForm";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.userReducer);
  const [showAllComments, setShowAllComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.body);
  const [editImage, setEditImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    post.image || null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isOwner =
    userData?._id ===
    (typeof post.user === "string" ? post.user : post.user?._id);

  // Use userData as fallback for photo/name if it's the current user's post
  const userPhoto =
    (typeof post.user === "object" ? post.user?.photo : null) ||
    (isOwner ? userData?.photo : "");
  const userName =
    (typeof post.user === "object" ? post.user?.name : null) ||
    (isOwner ? userData?.name : "User");

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    const PostData = new FormData();
    PostData.append("body", editContent);
    if (editImage) {
      PostData.append("image", editImage);
    }

    await dispatch(updatePost({ postId: post._id, PostData }));
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-primary-500 to-purple-500">
              <img
                src={userPhoto}
                alt={userName}
                className="w-full h-full rounded-full object-cover border-2 border-white"
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-tight">
              {userName}
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isOwner && (
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                if (!isEditing) {
                  setEditContent(post.body);
                  setImagePreview(post.image || null);
                }
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
              title="Edit Post"
            >
              <HiOutlinePencil size={20} />
            </button>
          )}
          <Link
            href={`/post/${post._id}`}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
          >
            <BsEye size={20} />
          </Link>
          {isOwner && (
            <button
              onClick={async () => {
                await dispatch(DeleteUserPost(post._id));
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
              title="Delete Post"
            >
              <FaDeleteLeft size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pb-3">
        {isEditing ? (
          <div className="space-y-4">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all resize-none"
              rows={3}
            />

            <div className="relative group">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />

              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-auto max-h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors text-primary-600"
                      title="Change Photo"
                    >
                      <HiOutlinePhotograph size={24} />
                    </button>
                    <button
                      onClick={() => {
                        setImagePreview(null);
                        setEditImage(null);
                      }}
                      className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors text-red-500"
                      title="Remove Photo"
                    >
                      <HiOutlineX size={24} />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-8 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:text-primary-500 hover:border-primary-500 transition-all gap-2"
                >
                  <HiOutlinePhotograph size={32} />
                  <span className="font-semibold">Add Photo</span>
                </button>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(post.body);
                  setEditImage(null);
                  setImagePreview(post.image || null);
                }}
                className="px-4 py-1.5 text-sm font-semibold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-1.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-3">
              {post.body}
            </p>
            {post.image && (
              <div className="w-full relative bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 mb-2">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-auto max-h-[500px] object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Stats & Actions */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-1">
            <span className="text-gray-900 font-bold">0</span> likes
          </div>
          <div className="flex items-center gap-4">
            <span>{post?.comments?.length || 0} comments</span>
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

      {/* Comments Section */}
      {post?.comments?.length > 0 && (
        <div className="px-5 pb-5 space-y-3">
          {post.comments.length > 1 && (
            <button
              onClick={() => setShowAllComments(!showAllComments)}
              className="text-sm font-semibold text-gray-500 hover:text-primary-600 transition-colors hover:underline pl-2"
            >
              {showAllComments
                ? "Hide comments"
                : `View all ${post.comments.length} comments`}
            </button>
          )}

          <div className="space-y-3">
            {post.comments
              .slice(0, showAllComments ? post.comments.length : 1)
              .map((comment) => (
                <CommentCard key={comment._id} commentInfo={comment} />
              ))}
          </div>
        </div>
      )}

      <CommentForm postId={post?._id} />
    </div>
  );
}

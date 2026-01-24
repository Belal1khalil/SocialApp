"use client";
import { Comment } from "@/types/posts.types";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { deleteComment, updateComment } from "@/store/features/posts.slice";
import { HiDotsHorizontal, HiOutlineX } from "react-icons/hi";
import userPlaceholder from "../../assests/imgs/user (1).png";

export default function CommentCard({ commentInfo }: { commentInfo: Comment }) {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.userReducer);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(commentInfo.content);
  const [isLoading, setIsLoading] = useState(false);

  const isOwner = userData?._id === commentInfo?.commentCreator?._id;

  function handleEditToggle() {
    if (!isLoading) {
      setIsEditing(!isEditing);
      setEditContent(commentInfo.content);
    }
  }

  function handleImagePath(path: string) {
    if (!path || path.includes("undefined")) return userPlaceholder.src;
    return path;
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editContent.trim() || editContent === commentInfo.content || isLoading) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(
        updateComment({ content: editContent, commentId: commentInfo._id }),
      ).unwrap();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await dispatch(deleteComment(commentInfo._id)).unwrap();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-3 p-3 group hover:bg-gray-50/50 rounded-2xl transition-colors duration-200">
      {/* Avatar */}
      <div className="shrink-0">
        <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-gray-200 to-gray-300">
          <img
            src={handleImagePath(commentInfo?.commentCreator?.photo)}
            alt={`comment by ${commentInfo?.commentCreator?.name}`}
            className="w-full h-full rounded-full object-cover border border-white"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1">
        <div className="bg-gray-100/80 rounded-2xl rounded-tl-sm p-3.5 inline-block min-w-[200px]">
          <div className="flex items-center justify-between mb-1 gap-4">
            <h4 className="text-sm font-bold text-gray-900 group-hover:text-primary-700 transition-colors">
              {commentInfo?.commentCreator?.name}
            </h4>
            <span className="text-xs text-gray-400 font-medium">
              {new Date(commentInfo?.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {commentInfo?.content}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 px-2 text-xs font-semibold text-gray-500">
         
          {
            <>
              <button
                onClick={handleEditToggle}
                className="hover:text-primary-600 transition-colors"
                disabled={isLoading}
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="hover:text-red-600 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </>
          }
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <>
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/20 z-[60] transition-opacity duration-300"
            onClick={handleEditToggle}
          ></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[70] bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Edit Comment</h2>
                <button
                  onClick={handleEditToggle}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                >
                  <HiOutlineX size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-4 text-sm bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 focus:bg-white transition-all outline-none"
                  placeholder="Your updated comment..."
                  disabled={isLoading}
                  autoFocus
                />

                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="flex-1 py-1 px-4 text-gray-500 font-semibold hover:bg-gray-100 rounded-xl transition-colors"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-primary-500/20 disabled:opacity-70 flex items-center justify-center gap-2"
                    disabled={isLoading || !editContent.trim()}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Updating...</span>
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Desktop Quick Actions (Visible on Hover) */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-gray-600 self-start">
        <HiDotsHorizontal size={18} className="cursor-pointer" />
      </div>
    </div>
  );
}


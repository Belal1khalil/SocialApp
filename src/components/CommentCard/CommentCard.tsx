import { Comment } from "@/types/posts.types";

import { HiDotsHorizontal } from "react-icons/hi";
import userPlaceholder from "../../assests/imgs/user (1).png";

export default function CommentCard({ commentInfo }: { commentInfo: Comment }) {
  // Helper to format date

  function handleImagePath(path: string) {
    if (path.includes("undefined")) return userPlaceholder.src;
    else return path;
  }

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

        {/* Actions (Optional for future) */}
        <div className="flex items-center gap-4 px-2 text-xs font-semibold text-gray-500">
          <button className="hover:text-gray-800 transition-colors">
            Like
          </button>
          <button className="hover:text-gray-800 transition-colors">
            Reply
          </button>
        </div>
      </div>

      {/* Options Button (Visible on Hover) */}
      <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-gray-600 self-center">
        <HiDotsHorizontal size={18} />
      </button>
    </div>
  );
}

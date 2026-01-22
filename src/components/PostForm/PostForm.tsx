import { useRef } from "react";
import { FaImage, FaPaperPlane } from "react-icons/fa";
import user from "../../assests/imgs/user (1).png";
import { apiClient } from "@/services/api-client";
import { toast } from "react-toastify";
import { useAppSelector } from "@/hooks/store.hooks";

export default function PostForm() {
  const postContentRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
   const {userData} = useAppSelector((store) => store.userReducer)

  async function createPost() {
    const content = postContentRef.current?.value || "";
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    if (file) {
      const PostData = new FormData();
      PostData.append("body", content || "");
      PostData.append("image", file);
      try {
        const options = {
          method: "POST",
          url: "/posts",
          data: PostData,
        };
        const response = await apiClient.request(options);
        if (response.data.message === "success") {
          postContentRef.current!.value = "";
          toast.success("Post shared successfully!");
        }
        console.log(response);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section>
      <div className="container max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={userData?.photo || user.src}
            alt="user avatar"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="text-lg font-semibold text-gray-800">Create Post</h2>
        </div>

        {/* Textarea */}
        <textarea
          ref={postContentRef}
          name="postContent"
          placeholder="What's on your mind?"
          rows={4}
          className="w-full resize-none p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        {/* Actions */}
        <div className="flex justify-between items-center">
          {/* Upload */}
          <div>
            <input ref={fileInputRef} type="file" className="hidden" />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition"
            >
              <FaImage size={18} />
              <span className="font-medium">Photo</span>
            </button>
          </div>

          {/* Post */}
          <button
            onClick={createPost}
            type="submit"
            className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            <FaPaperPlane />
            Post
          </button>
        </div>
      </div>
    </section>
  );
}

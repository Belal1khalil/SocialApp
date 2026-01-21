import React from "react";

export default function PostSkeleton() {
  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden mb-6">
      {/* Header Skeleton */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar Skeleton */}
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
          
          <div className="space-y-2">
            {/* Name Skeleton */}
            <div className="h-4 w-32 bg-gray-200 rounded-full animate-pulse" />
            {/* Date Skeleton */}
            <div className="h-3 w-20 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
        {/* Menu Icon Skeleton */}
        <div className="w-8 h-8 rounded-full bg-gray-100 animate-pulse" />
      </div>

      {/* Content Skeleton */}
      <div className="px-5 pb-3 space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded-full animate-pulse" />
        <div className="h-4 w-[90%] bg-gray-200 rounded-full animate-pulse" />
        <div className="h-4 w-[60%] bg-gray-200 rounded-full animate-pulse" />
      </div>

      {/* Image Skeleton */}
      <div className="w-full h-64 bg-gray-200 animate-pulse mt-2" />

      {/* Actions Skeleton */}
      <div className="p-5">
        {/* Stats Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-3 w-16 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-3 w-24 bg-gray-200 rounded-full animate-pulse" />
        </div>

        {/* Buttons Skeleton */}
        <div className="flex justify-between border-t border-gray-100 pt-3 gap-4">
          <div className="h-10 flex-1 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-10 flex-1 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-10 flex-1 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

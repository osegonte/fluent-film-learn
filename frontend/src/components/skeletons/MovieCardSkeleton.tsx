// src/components/skeletons/MovieCardSkeleton.tsx
import React from 'react';
import { Skeleton } from '../ui/skeleton';

export const MovieCardSkeleton = () => {
  return (
    <div className="bg-card rounded-xl p-4 border border-default">
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-1">
            <Skeleton className="h-2 w-full rounded-full" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
        <Skeleton className="h-10 w-20 rounded-xl" />
      </div>
    </div>
  );
};

// src/components/skeletons/LessonSkeleton.tsx
export const LessonSkeleton = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Video Player Skeleton */}
      <Skeleton className="w-full aspect-video rounded-xl" />
      
      {/* Subtitle Skeleton */}
      <div className="bg-card rounded-xl p-6 border border-default space-y-3">
        <Skeleton className="h-6 w-4/5 mx-auto" />
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </div>
      
      {/* Controls Skeleton */}
      <div className="bg-card rounded-xl p-4 border border-default">
        <div className="flex items-center justify-between">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <Skeleton className="flex-1 h-1 mx-4 rounded-full" />
          <Skeleton className="w-12 h-12 rounded-lg" />
        </div>
      </div>
      
      {/* Button Skeleton */}
      <Skeleton className="w-full h-12 rounded-xl" />
    </div>
  );
};

// src/components/skeletons/ProfileStatsSkeleton.tsx
export const ProfileStatsSkeleton = () => {
  return (
    <div className="bg-card rounded-xl p-6 border border-default">
      <div className="grid grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center space-y-2">
            <Skeleton className="h-7 w-16 mx-auto" />
            <Skeleton className="h-3 w-20 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
};

// src/components/skeletons/CommunityPostSkeleton.tsx
export const CommunityPostSkeleton = () => {
  return (
    <div className="bg-card rounded-xl p-4 border border-default">
      <div className="flex items-start gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
};
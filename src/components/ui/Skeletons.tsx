import React from 'react';

// Base skeleton wrapper
const SkeletonBase = ({ className = "", children }: { className?: string; children?: React.ReactNode }) => (
  <div className={`animate-pulse ${className}`}>
    {children}
  </div>
);

// Generic skeleton rectangle
export const SkeletonRect = ({ 
  width = "w-full", 
  height = "h-4", 
  className = "" 
}: { 
  width?: string; 
  height?: string; 
  className?: string; 
}) => (
  <div className={`bg-gray-300 rounded ${width} ${height} ${className}`} />
);

// Generic skeleton circle
export const SkeletonCircle = ({ 
  size = "w-12 h-12", 
  className = "" 
}: { 
  size?: string; 
  className?: string; 
}) => (
  <div className={`bg-gray-300 rounded-full ${size} ${className}`} />
);

// Blog post card skeleton
export const BlogPostSkeleton = () => (
  <SkeletonBase className="bg-white rounded-lg shadow-sm overflow-hidden">
    <SkeletonRect width="w-full" height="h-40" className="mb-0" />
    <div className="p-6">
      <div className="flex items-center mb-2">
        <SkeletonRect width="w-20" height="h-5" className="mr-2" />
        <SkeletonRect width="w-2" height="h-2" className="mx-2 rounded-full" />
        <SkeletonRect width="w-16" height="h-4" />
      </div>
      <SkeletonRect width="w-3/4" height="h-6" className="mb-2" />
      <SkeletonRect width="w-full" height="h-4" className="mb-1" />
      <SkeletonRect width="w-5/6" height="h-4" className="mb-4" />
      <div className="flex items-center">
        <SkeletonCircle size="w-8 h-8" className="mr-2" />
        <div>
          <SkeletonRect width="w-20" height="h-4" className="mb-1" />
          <SkeletonRect width="w-16" height="h-3" />
        </div>
      </div>
    </div>
  </SkeletonBase>
);

// Featured blog post skeleton
export const FeaturedBlogSkeleton = () => (
  <SkeletonBase className="bg-white rounded-lg shadow-md overflow-hidden">
    <SkeletonRect width="w-full" height="h-48" className="mb-0" />
    <div className="p-6">
      <div className="flex items-center mb-2">
        <SkeletonRect width="w-24" height="h-5" className="mr-2" />
        <SkeletonRect width="w-2" height="h-2" className="mx-2 rounded-full" />
        <SkeletonRect width="w-20" height="h-4" />
      </div>
      <SkeletonRect width="w-4/5" height="h-6" className="mb-2" />
      <SkeletonRect width="w-full" height="h-4" className="mb-1" />
      <SkeletonRect width="w-full" height="h-4" className="mb-1" />
      <SkeletonRect width="w-3/4" height="h-4" className="mb-4" />
      <div className="flex items-center">
        <SkeletonCircle size="w-10 h-10" className="mr-3" />
        <div>
          <SkeletonRect width="w-24" height="h-4" className="mb-1" />
          <SkeletonRect width="w-20" height="h-3" />
        </div>
      </div>
    </div>
  </SkeletonBase>
);

// Alumni card skeleton
export const AlumniCardSkeleton = () => (
  <SkeletonBase className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="p-6">
      <div className="flex items-center mb-4">
        <SkeletonCircle size="w-16 h-16" className="mr-4" />
        <div className="flex-1">
          <SkeletonRect width="w-3/4" height="h-5" className="mb-2" />
          <SkeletonRect width="w-1/2" height="h-4" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <SkeletonRect width="w-4" height="h-4" className="mr-2" />
          <SkeletonRect width="w-2/3" height="h-4" />
        </div>
        <div className="flex items-center">
          <SkeletonRect width="w-4" height="h-4" className="mr-2" />
          <SkeletonRect width="w-1/2" height="h-4" />
        </div>
        <div className="flex items-center">
          <SkeletonRect width="w-4" height="h-4" className="mr-2" />
          <SkeletonRect width="w-3/4" height="h-4" />
        </div>
      </div>
      <SkeletonRect width="w-full" height="h-4" className="mb-1" />
      <SkeletonRect width="w-full" height="h-4" className="mb-1" />
      <SkeletonRect width="w-3/4" height="h-4" className="mb-4" />
      <div className="flex gap-1 mb-4">
        <SkeletonRect width="w-16" height="h-6" className="rounded-full" />
        <SkeletonRect width="w-20" height="h-6" className="rounded-full" />
        <SkeletonRect width="w-14" height="h-6" className="rounded-full" />
      </div>
      <div className="flex justify-between items-center">
        <SkeletonRect width="w-20" height="h-8" className="rounded" />
        <SkeletonRect width="w-24" height="h-8" className="rounded" />
      </div>
    </div>
  </SkeletonBase>
);

// Executive card skeleton
export const ExecutiveCardSkeleton = () => (
  <SkeletonBase className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="p-6">
      <div className="flex items-start gap-4 mb-4">
        <SkeletonCircle size="w-16 h-16" />
        <div className="flex-1">
          <SkeletonRect width="w-3/4" height="h-6" className="mb-2" />
          <SkeletonRect width="w-1/2" height="h-5" className="rounded-full" />
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <SkeletonRect width="w-4" height="h-4" />
          <SkeletonRect width="w-2/3" height="h-4" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonRect width="w-4" height="h-4" />
          <SkeletonRect width="w-1/2" height="h-4" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonRect width="w-4" height="h-4" />
          <SkeletonRect width="w-1/3" height="h-4" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonRect width="w-4" height="h-4" />
          <SkeletonRect width="w-1/4" height="h-4" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <SkeletonRect width="w-3/4" height="h-3" />
      </div>
    </div>
  </SkeletonBase>
);

// Event card skeleton
export const EventCardSkeleton = () => (
  <SkeletonBase className="bg-white rounded-lg shadow-md overflow-hidden">
    <SkeletonRect width="w-full" height="h-48" className="mb-0" />
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <SkeletonRect width="w-16" height="h-4" className="rounded-full" />
        <SkeletonRect width="w-20" height="h-4" />
      </div>
      <SkeletonRect width="w-full" height="h-5" className="mb-2" />
      <SkeletonRect width="w-3/4" height="h-4" className="mb-3" />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <SkeletonRect width="w-4" height="h-4" className="mr-1" />
          <SkeletonRect width="w-20" height="h-4" />
        </div>
        <SkeletonRect width="w-16" height="h-8" className="rounded" />
      </div>
    </div>
  </SkeletonBase>
);

// Product card skeleton
export const ProductCardSkeleton = () => (
  <SkeletonBase className="bg-white rounded-lg overflow-hidden shadow-md">
    <SkeletonRect width="w-full" height="h-32 md:h-40" className="mb-0" />
    <div className="p-3">
      <SkeletonRect width="w-full" height="h-4" className="mb-2" />
      <div className="flex items-center justify-between">
        <SkeletonRect width="w-16" height="h-5" />
        <SkeletonRect width="w-12" height="h-4" />
      </div>
    </div>
  </SkeletonBase>
);

// Testimonial card skeleton
export const TestimonialSkeleton = () => (
  <SkeletonBase className="bg-white rounded-lg p-6 shadow-md">
    <div className="flex items-center mb-4">
      <SkeletonCircle size="w-12 h-12" className="mr-4" />
      <div>
        <SkeletonRect width="w-24" height="h-5" className="mb-1" />
        <SkeletonRect width="w-20" height="h-4" />
      </div>
    </div>
    <SkeletonRect width="w-full" height="h-4" className="mb-2" />
    <SkeletonRect width="w-full" height="h-4" className="mb-2" />
    <SkeletonRect width="w-3/4" height="h-4" />
  </SkeletonBase>
);

// Mentorship program skeleton
export const MentorshipProgramSkeleton = () => (
  <SkeletonBase className="border border-gray-200 rounded-lg p-4">
    <SkeletonRect width="w-3/4" height="h-6" className="mb-3" />
    <SkeletonRect width="w-full" height="h-4" className="mb-1" />
    <SkeletonRect width="w-5/6" height="h-4" className="mb-4" />
    
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
      <div className="flex items-center">
        <SkeletonRect width="w-4" height="h-4" className="mr-2" />
        <SkeletonRect width="w-20" height="h-4" />
      </div>
      <div className="flex items-center">
        <SkeletonRect width="w-4" height="h-4" className="mr-2" />
        <SkeletonRect width="w-16" height="h-4" />
      </div>
      <div className="flex items-center">
        <SkeletonRect width="w-4" height="h-4" className="mr-2" />
        <SkeletonRect width="w-12" height="h-4" />
      </div>
      <div className="flex items-center">
        <SkeletonRect width="w-4" height="h-4" className="mr-2" />
        <SkeletonRect width="w-18" height="h-4" />
      </div>
    </div>

    <div className="flex items-center justify-between">
      <SkeletonRect width="w-32" height="h-4" />
      <div className="flex gap-2">
        <SkeletonRect width="w-20" height="h-8" className="rounded" />
        <SkeletonRect width="w-24" height="h-8" className="rounded" />
      </div>
    </div>
  </SkeletonBase>
);

// Resource card skeleton
export const ResourceCardSkeleton = () => (
  <SkeletonBase className="bg-white rounded-lg shadow-md overflow-hidden">
    <SkeletonRect width="w-full" height="h-32" className="mb-0" />
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <SkeletonRect width="w-20" height="h-5" className="rounded-full" />
        <SkeletonRect width="w-16" height="h-4" />
      </div>
      <SkeletonRect width="w-full" height="h-5" className="mb-2" />
      <SkeletonRect width="w-full" height="h-4" className="mb-1" />
      <SkeletonRect width="w-3/4" height="h-4" className="mb-3" />
      <div className="flex items-center justify-between">
        <SkeletonRect width="w-24" height="h-4" />
        <SkeletonRect width="w-20" height="h-8" className="rounded" />
      </div>
    </div>
  </SkeletonBase>
);

// Community post skeleton
export const CommunityPostSkeleton = () => (
  <SkeletonBase className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center mb-4">
      <SkeletonCircle size="w-10 h-10" className="mr-3" />
      <div>
        <SkeletonRect width="w-24" height="h-4" className="mb-1" />
        <SkeletonRect width="w-20" height="h-3" />
      </div>
    </div>
    <SkeletonRect width="w-full" height="h-4" className="mb-2" />
    <SkeletonRect width="w-full" height="h-4" className="mb-2" />
    <SkeletonRect width="w-2/3" height="h-4" className="mb-4" />
    <div className="flex items-center justify-between">
      <SkeletonRect width="w-16" height="h-8" className="rounded" />
      <SkeletonRect width="w-20" height="h-8" className="rounded" />
    </div>
  </SkeletonBase>
);

// Grid skeleton layouts
export const BlogGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: count }).map((_, index) => (
      <BlogPostSkeleton key={index} />
    ))}
  </div>
);

export const AlumniGridSkeleton = ({ count = 9 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <AlumniCardSkeleton key={index} />
    ))}
  </div>
);

export const ExecutiveGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <ExecutiveCardSkeleton key={index} />
    ))}
  </div>
);

export const EventGridSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <EventCardSkeleton key={index} />
    ))}
  </div>
);

export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => (
  <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-4">
    {Array.from({ length: count }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
);

// Full page skeletons
export const BlogPageSkeleton = () => (
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div className="text-center mb-12">
      <SkeletonRect width="w-48" height="h-8" className="mx-auto mb-2" />
      <SkeletonRect width="w-96" height="h-6" className="mx-auto" />
    </div>
    
    <div className="mb-12">
      <SkeletonRect width="w-40" height="h-6" className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FeaturedBlogSkeleton />
        <FeaturedBlogSkeleton />
      </div>
    </div>

    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonRect key={index} width="w-24" height="h-10" className="rounded-full" />
        ))}
      </div>
    </div>

    <BlogGridSkeleton />
  </main>
);

// Loading states with text
export const LoadingWithText = ({ 
  text = "Loading...", 
  size = "text-lg" 
}: { 
  text?: string; 
  size?: string; 
}) => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal-600 mr-3"></div>
    <span className={`text-gray-600 ${size}`}>{text}</span>
  </div>
);
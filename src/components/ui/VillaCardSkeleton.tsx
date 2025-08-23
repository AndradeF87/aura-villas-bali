'use client'

interface VillaCardSkeletonProps {
  count?: number
  className?: string
}

export function VillaCardSkeleton({ count = 3, className = '' }: VillaCardSkeletonProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="villa-skeleton bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="relative h-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 overflow-hidden">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 animate-shimmer" />
            
            {/* Badge Skeletons */}
            <div className="absolute top-4 left-4 bg-gray-300 rounded-full w-20 h-7" />
            <div className="absolute top-4 right-4 bg-gray-300 rounded-full w-12 h-7" />
          </div>

          {/* Content Skeleton */}
          <div className="p-6">
            {/* Title Skeleton */}
            <div className="bg-gray-300 rounded-lg h-7 w-3/4 mb-3" />

            {/* Description Skeleton */}
            <div className="space-y-2 mb-4">
              <div className="bg-gray-200 rounded h-4 w-full" />
              <div className="bg-gray-200 rounded h-4 w-5/6" />
              <div className="bg-gray-200 rounded h-4 w-4/6" />
            </div>

            {/* Price Skeleton */}
            <div className="bg-gray-300 rounded-lg h-8 w-32 mb-4" />

            {/* Amenities Skeleton */}
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gray-200 rounded h-4 w-12" />
              <div className="bg-gray-200 rounded h-4 w-16" />
              <div className="bg-gray-200 rounded h-4 w-20" />
            </div>

            {/* Button Skeleton */}
            <div className="bg-gray-300 rounded-lg h-12 w-full" />
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating dots for visual interest */}
            <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-gray-200 rounded-full opacity-50 animate-float" />
            <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-gray-300 rounded-full opacity-30 animate-float-delayed" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function VillaCardSkeletonRow({ count = 1, className = '' }: VillaCardSkeletonProps) {
  return (
    <div className={`flex gap-6 overflow-hidden ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="villa-skeleton-row bg-white rounded-xl shadow-lg overflow-hidden animate-pulse flex-shrink-0 w-80"
        >
          {/* Image Skeleton */}
          <div className="relative h-48 bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer-fast" />
          </div>

          {/* Content Skeleton */}
          <div className="p-4">
            <div className="bg-gray-300 rounded h-5 w-2/3 mb-2" />
            <div className="bg-gray-200 rounded h-4 w-full mb-1" />
            <div className="bg-gray-200 rounded h-4 w-4/5 mb-3" />
            
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gray-200 rounded h-4 w-10" />
              <div className="bg-gray-200 rounded h-4 w-12" />
            </div>
            
            <div className="bg-gray-300 rounded h-6 w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}

/* Add custom CSS animations */
export const skeletonStyles = `
  @keyframes shimmer {
    0% { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(200%) skewX(-12deg); }
  }
  
  @keyframes shimmer-fast {
    0% { transform: translateX(-100%) skewX(-12deg); }
    100% { transform: translateX(150%) skewX(-12deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); opacity: 0.5; }
    50% { transform: translateY(-10px); opacity: 0.8; }
  }
  
  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
    50% { transform: translateY(-8px) translateX(5px); opacity: 0.7; }
  }
  
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
  
  .animate-shimmer-fast {
    animation: shimmer-fast 1.5s infinite;
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-float-delayed {
    animation: float-delayed 3s ease-in-out infinite 1.5s;
  }
`
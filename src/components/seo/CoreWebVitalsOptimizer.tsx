import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { generateBlurDataURL } from '@/utils/imageLoader';

// Core Web Vitals optimized image component
interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  onLoad?: () => void;
  placeholder?: 'blur' | 'empty';
  quality?: number;
}

export const CoreWebVitalsImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  onLoad,
  placeholder = 'blur',
  quality = 85,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(height / width);
  
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  // Generate optimized blur placeholder
  const blurDataURL = placeholder === 'blur' ? generateBlurDataURL() : undefined;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        aspectRatio: `${width}/${height}`,
        minHeight: height,
        backgroundColor: '#f3f4f6' // Prevent CLS with background color
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        onLoad={handleLoad}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
      
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
        </div>
      )}
    </div>
  );
};

// Optimized villa card to prevent CLS
interface VillaCardProps {
  villa: {
    id: string;
    name: string;
    location: string;
    images: Array<{ url: string; alt: string }>;
    pricing: { min: number; currency: string };
    rating: { average: number; count: number };
    slug: string;
  };
  priority?: boolean;
  index: number;
}

export const OptimizedVillaCard: React.FC<VillaCardProps> = ({ 
  villa, 
  priority = false,
  index 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(priority);

  useEffect(() => {
    if (priority) return; // Skip intersection observer for priority images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const imageUrl = villa.images[0]?.url || '/placeholder-villa.jpg';
  const imageAlt = villa.images[0]?.alt || `${villa.name} in ${villa.location}`;

  return (
    <div
      ref={cardRef}
      className="villa-card bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105 hover:shadow-lg"
      style={{
        // Fixed dimensions to prevent CLS
        height: '400px',
        aspectRatio: '1/1.2',
      }}
    >
      {/* Image container with fixed aspect ratio */}
      <div className="relative" style={{ height: '240px' }}>
        {isVisible && (
          <CoreWebVitalsImage
            src={imageUrl}
            alt={imageAlt}
            width={400}
            height={240}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="w-full"
            quality={85}
          />
        )}
        
        {/* Overlay for better text readability */}
        <div className="absolute top-4 right-4">
          <div className="bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center text-sm font-semibold">
            <span className="text-yellow-500 mr-1">⭐</span>
            <span>{villa.rating.average.toFixed(1)}</span>
            <span className="text-gray-500 ml-1">({villa.rating.count})</span>
          </div>
        </div>
      </div>

      {/* Content container with fixed height to prevent CLS */}
      <div className="p-4" style={{ height: '160px' }}>
        <div className="flex flex-col justify-between h-full">
          <div>
            <h3 className="villa-name font-semibold text-lg text-gray-900 mb-1 line-clamp-2">
              {villa.name}
            </h3>
            <p className="villa-location text-gray-600 text-sm mb-3">
              {villa.location}, Bali
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="villa-price">
              <span className="text-lg font-bold text-gray-900">
                ${villa.pricing.min}
              </span>
              <span className="text-gray-600 text-sm ml-1">
                /{villa.pricing.currency === 'USD' ? 'night' : 'malam'}
              </span>
            </div>
            
            <button 
              className="view-villa-btn bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              aria-label={`View ${villa.name} details`}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Performance optimized villa gallery
interface VillaGalleryProps {
  images: Array<{ url: string; alt: string }>;
  villaName: string;
  maxImages?: number;
}

export const OptimizedVillaGallery: React.FC<VillaGalleryProps> = ({
  images,
  villaName,
  maxImages = 12
}) => {
  const [loadedImages, setLoadedImages] = useState(new Set<string>());
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;
  
  const displayImages = images.slice(0, maxImages);
  const paginatedImages = displayImages.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  const handleImageLoad = useCallback((src: string) => {
    setLoadedImages(prev => new Set([...prev, src]));
  }, []);

  return (
    <div className="villa-gallery">
      {/* Main featured image */}
      <div className="featured-image mb-4" style={{ aspectRatio: '16/9', height: '400px' }}>
        <CoreWebVitalsImage
          src={displayImages[0]?.url}
          alt={`${villaName} - Main view`}
          width={800}
          height={450}
          priority={true}
          sizes="(max-width: 768px) 100vw, 80vw"
          className="rounded-lg"
          onLoad={() => handleImageLoad(displayImages[0]?.url)}
        />
      </div>

      {/* Thumbnail grid */}
      <div className="thumbnail-grid grid grid-cols-2 md:grid-cols-3 gap-3">
        {paginatedImages.slice(1).map((image, index) => (
          <div 
            key={index + 1}
            className="thumbnail-container"
            style={{ aspectRatio: '4/3', height: '120px' }}
          >
            <CoreWebVitalsImage
              src={image.url}
              alt={`${villaName} - ${image.alt}`}
              width={200}
              height={150}
              priority={index < 5} // Prioritize first 5 thumbnails
              sizes="(max-width: 768px) 50vw, 25vw"
              className="rounded cursor-pointer hover:opacity-80 transition-opacity"
              onLoad={() => handleImageLoad(image.url)}
            />
          </div>
        ))}
      </div>

      {/* Pagination for large galleries */}
      {displayImages.length > imagesPerPage && (
        <div className="pagination-controls mt-4 flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(displayImages.length / imagesPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Loading progress indicator */}
      <div className="loading-progress mt-2">
        <div className="text-sm text-gray-600 text-center">
          Loaded {loadedImages.size} of {paginatedImages.length} images
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
          <div 
            className="bg-blue-600 h-1 rounded-full transition-all duration-300"
            style={{
              width: `${(loadedImages.size / paginatedImages.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
};

// Critical CSS for above-the-fold content
export const CriticalCSS: React.FC = () => {
  return (
    <style jsx>{`
      /* Critical styles for Core Web Vitals optimization */
      
      .villa-card {
        container-type: inline-size;
        aspect-ratio: 1 / 1.2;
        height: 400px;
        contain: layout style paint;
      }
      
      .villa-card:hover {
        transform: scale(1.02);
        will-change: transform;
      }
      
      .villa-name {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-height: 1.4;
        max-height: 2.8em;
      }
      
      .loading-skeleton {
        background: linear-gradient(90deg, 
          #f0f0f0 25%, 
          #e0e0e0 37%, 
          #f0f0f0 63%
        );
        background-size: 400% 100%;
      }
      
      .animate-shimmer {
        animation: shimmer 1.5s ease-in-out infinite;
      }
      
      @keyframes shimmer {
        0% { background-position: 100% 50%; }
        100% { background-position: -100% 50%; }
      }
      
      /* Prevent layout shift with fixed dimensions */
      .featured-image,
      .thumbnail-container {
        position: relative;
        background-color: #f3f4f6;
      }
      
      /* Optimize text rendering */
      .villa-card h3,
      .villa-card p {
        text-rendering: optimizeSpeed;
        font-display: swap;
      }
      
      /* Container queries for responsive design */
      @container (max-width: 300px) {
        .view-villa-btn {
          font-size: 12px;
          padding: 6px 12px;
        }
      }
      
      /* Reduce motion for accessibility */
      @media (prefers-reduced-motion: reduce) {
        .villa-card {
          transition: none;
        }
        
        .villa-card:hover {
          transform: none;
        }
        
        .animate-shimmer {
          animation: none;
        }
      }
    `}</style>
  );
};

// Web Vitals monitoring hook
export const useWebVitals = () => {
  const [vitals, setVitals] = useState<{
    fcp?: number;
    lcp?: number;
    fid?: number;
    cls?: number;
    ttfb?: number;
  }>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Import web-vitals library dynamically
    import('web-vitals').then(({ onFCP, onLCP, onINP, onCLS, onTTFB }) => {
      onFCP((metric) => setVitals(prev => ({ ...prev, fcp: metric.value })));
      onLCP((metric) => setVitals(prev => ({ ...prev, lcp: metric.value })));
      onINP((metric) => setVitals(prev => ({ ...prev, fid: metric.value }))); // INP replaced FID
      onCLS((metric) => setVitals(prev => ({ ...prev, cls: metric.value })));
      onTTFB((metric) => setVitals(prev => ({ ...prev, ttfb: metric.value })));
    }).catch(() => {
      // Fallback manual implementation
      console.warn('web-vitals library not available, using fallback');
    });
  }, []);

  return vitals;
};

// Performance budget checker
export const usePerformanceBudget = () => {
  const vitals = useWebVitals();
  
  const budgets = {
    fcp: 1800, // 1.8s
    lcp: 2500, // 2.5s
    fid: 100,  // 100ms
    cls: 0.1,  // 0.1
    ttfb: 800, // 800ms
  };

  const getBudgetStatus = () => {
    const status: Record<string, 'good' | 'needs-improvement' | 'poor' | 'unknown'> = {};
    
    Object.entries(vitals).forEach(([key, value]) => {
      if (value === undefined) {
        status[key] = 'unknown';
        return;
      }
      
      const budget = budgets[key as keyof typeof budgets];
      if (value <= budget) {
        status[key] = 'good';
      } else if (value <= budget * 1.5) {
        status[key] = 'needs-improvement';
      } else {
        status[key] = 'poor';
      }
    });
    
    return status;
  };

  return {
    vitals,
    budgets,
    status: getBudgetStatus(),
  };
};
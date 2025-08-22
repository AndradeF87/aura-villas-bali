import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

// Custom image loader for CDN optimization
const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
  const isCloudinary = src.includes('cloudinary.com');
  const baseQuality = quality || 85;
  
  if (isCloudinary) {
    // Extract public ID from Cloudinary URL
    const publicId = src.split('/upload/')[1]?.split('.')[0];
    if (publicId) {
      return `https://res.cloudinary.com/aura-villas-bali/image/fetch/w_${width},q_${baseQuality},f_auto,c_scale/${encodeURIComponent(src)}`;
    }
  }
  
  // Fallback to default loader with quality
  return `${src}?w=${width}&q=${baseQuality}`;
};

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  // Generate blur placeholder if not provided
  const defaultBlurDataURL = blurDataURL || 
    `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
      </svg>`
    ).toString('base64')}`;

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        loader={imageLoader}
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={defaultBlurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

// Villa gallery with lazy loading
interface VillaGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
  villaName: string;
}

export const VillaGallery: React.FC<VillaGalleryProps> = ({ images, villaName }) => {
  const [loadedCount, setLoadedCount] = useState(0);

  const handleImageLoad = useCallback(() => {
    setLoadedCount(prev => prev + 1);
  }, []);

  return (
    <div className="villa-gallery">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative aspect-video">
            <OptimizedImage
              src={image.src}
              alt={`${villaName} - ${image.alt}`}
              width={600}
              height={400}
              priority={index < 3} // Prioritize first 3 images
              className="rounded-lg shadow-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={handleImageLoad}
            />
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm rounded-b-lg">
                {image.caption}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Loading indicator */}
      {loadedCount < images.length && (
        <div className="text-center mt-4">
          <div className="inline-flex items-center text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent mr-2"></div>
            Loading images ({loadedCount}/{images.length})
          </div>
        </div>
      )}
    </div>
  );
};

// Progressive image loading hook
export const useProgressiveImage = (src: string, placeholder: string) => {
  const [currentSrc, setCurrentSrc] = useState(placeholder);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imageLoader = document.createElement('img');
    imageLoader.src = src;
    imageLoader.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
    };
  }, [src]);

  return { src: currentSrc, isLoading };
};
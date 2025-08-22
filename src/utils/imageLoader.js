/**
 * Custom image loader for Cloudinary optimization
 * Implements Next.js Image component loader interface
 */

const cloudinaryLoader = ({ src, width, quality }) => {
  // Handle different image sources
  if (src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }

  // Default quality if not specified
  const q = quality || 85;
  
  // Handle Cloudinary URLs
  if (src.includes('cloudinary.com')) {
    // Extract public ID from Cloudinary URL
    const publicId = src.split('/upload/')[1];
    if (publicId) {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'aura-villas-bali';
      
      // Build optimized Cloudinary URL with transformations
      const transformations = [
        `w_${width}`,
        `q_${q}`,
        'f_auto', // Auto format (WebP, AVIF when supported)
        'c_fill', // Fill the specified dimensions
        'g_auto', // Auto gravity for best crop
        'dpr_auto' // Auto DPR for retina displays
      ].join(',');
      
      return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`;
    }
  }
  
  // Handle Unsplash URLs
  if (src.includes('unsplash.com')) {
    const url = new URL(src);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', q.toString());
    url.searchParams.set('fm', 'webp'); // Force WebP format
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('crop', 'entropy'); // Smart cropping
    return url.toString();
  }
  
  // Handle local images - use Next.js built-in optimization
  if (src.startsWith('/') || src.startsWith('./')) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${q}`;
  }
  
  // Handle external URLs - proxy through Next.js for optimization
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${q}`;
};

// Device pixel ratio aware loader for high-DPI displays
const getDPROptimizedUrl = (src, width, quality = 85) => {
  if (typeof window === 'undefined') return cloudinaryLoader({ src, width, quality });
  
  const dpr = window.devicePixelRatio || 1;
  const adjustedWidth = Math.round(width * Math.min(dpr, 2)); // Cap at 2x for performance
  
  return cloudinaryLoader({ src, width: adjustedWidth, quality });
};

// Generate responsive image srcset
export const generateSrcSet = (src, sizes = [640, 768, 1024, 1280, 1920]) => {
  return sizes
    .map(size => `${cloudinaryLoader({ src, width: size, quality: 85 })} ${size}w`)
    .join(', ');
};

// Generate responsive sources for picture element
export const generateResponsiveSources = (src, breakpoints = [
  { minWidth: 1200, width: 1200 },
  { minWidth: 768, width: 768 },
  { minWidth: 640, width: 640 },
  { minWidth: 0, width: 400 }
]) => {
  return breakpoints.map(({ minWidth, width }) => ({
    media: minWidth > 0 ? `(min-width: ${minWidth}px)` : undefined,
    srcSet: generateSrcSet(src, [width, width * 1.5, width * 2]),
    sizes: `${width}px`
  }));
};

// Preload critical images
export const preloadImage = (src, width = 1200, priority = 'high') => {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = cloudinaryLoader({ src, width, quality: 85 });
  link.fetchPriority = priority;
  
  // Add responsive preload for different viewport sizes
  link.imagesrcset = generateSrcSet(src, [400, 800, 1200, 1600]);
  link.imagesizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  
  document.head.appendChild(link);
};

// Lazy loading intersection observer for manual implementation
export const createLazyLoadObserver = (
  callback, 
  options = {
    rootMargin: '50px 0px',
    threshold: 0.1
  }
) => {
  if ('IntersectionObserver' in window) {
    return new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
        }
      });
    }, options);
  }
  return null;
};

// Blurhash placeholder generator for smooth loading
export const generateBlurDataURL = (width = 8, height = 8) => {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';
  
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Create a simple gradient blur effect
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

export default cloudinaryLoader;
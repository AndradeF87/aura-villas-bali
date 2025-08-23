'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { useAnimationContext } from './AnimationProvider'

interface PerformanceOptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  onLoad?: () => void
  onError?: () => void
  enableLazyLoading?: boolean
  enableBlurEffect?: boolean
  enableZoomEffect?: boolean
  placeholderColor?: string
}

export function PerformanceOptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  className = '',
  sizes,
  priority = false,
  loading = 'lazy',
  onLoad,
  onError,
  enableLazyLoading = true,
  enableBlurEffect = true,
  enableZoomEffect = true,
  placeholderColor = 'rgba(0, 0, 0, 0.1)'
}: PerformanceOptimizedImageProps) {
  const { performanceMode, enabledFeatures } = useAnimationContext()
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isInView, setIsInView] = useState(!enableLazyLoading)
  const imageRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!enableLazyLoading || !imageRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1
      }
    )

    observer.observe(imageRef.current)

    return () => observer.disconnect()
  }, [enableLazyLoading])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setIsError(true)
    onError?.()
  }

  // Determine if we should show blur effect based on performance mode
  const shouldShowBlur = enableBlurEffect && performanceMode !== 'low'
  const shouldShowZoom = enableZoomEffect && enabledFeatures.complexTransitions

  // Generate optimized sizes based on performance mode
  const getOptimizedSizes = (): string => {
    if (sizes) return sizes
    
    switch (performanceMode) {
      case 'low':
        return '(max-width: 768px) 50vw, 25vw'
      case 'medium':
        return '(max-width: 768px) 75vw, 50vw'
      case 'high':
      default:
        return '(max-width: 768px) 100vw, 75vw'
    }
  }

  return (
    <div 
      ref={imageRef}
      className={`
        relative overflow-hidden
        ${shouldShowZoom ? 'group transition-transform duration-300 hover:scale-[1.02]' : ''}
        ${className}
      `}
    >
      {/* Placeholder/Loading State */}
      {!isLoaded && !isError && (
        <div 
          className={`
            absolute inset-0 flex items-center justify-center
            ${shouldShowBlur ? 'backdrop-blur-sm' : ''}
          `}
          style={{ 
            backgroundColor: placeholderColor,
            backgroundImage: shouldShowBlur 
              ? `linear-gradient(45deg, ${placeholderColor}, transparent, ${placeholderColor})`
              : undefined
          }}
        >
          {/* Animated Loading Skeleton */}
          <div className="w-full h-full relative">
            {shouldShowBlur && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-shimmer" />
            )}
            
            {/* Loading Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`
                w-8 h-8 border-2 border-gray-300 border-t-transparent rounded-full
                ${performanceMode !== 'low' ? 'animate-spin' : ''}
              `} />
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {isInView && !isError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          sizes={getOptimizedSizes()}
          priority={priority}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`
            transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${shouldShowZoom ? 'group-hover:scale-110 transition-transform duration-500' : ''}
            object-cover
          `}
          // Performance optimizations
          quality={performanceMode === 'low' ? 75 : performanceMode === 'medium' ? 85 : 95}
          unoptimized={false}
          // Prevent layout shift
          style={{
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      )}

      {/* Zoom Overlay Effect */}
      {shouldShowZoom && isLoaded && !isError && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      {/* Performance Badge (dev mode only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-2 left-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
          {performanceMode}
        </div>
      )}
    </div>
  )
}

// Higher-order component for batch image loading
export function BatchImageLoader({ 
  images, 
  onAllLoaded 
}: { 
  images: string[]
  onAllLoaded: () => void 
}) {
  const [loadedCount, setLoadedCount] = useState(0)
  const { performanceMode } = useAnimationContext()

  useEffect(() => {
    if (loadedCount === images.length && images.length > 0) {
      onAllLoaded()
    }
  }, [loadedCount, images.length, onAllLoaded])

  // Preload images based on performance mode
  useEffect(() => {
    if (performanceMode === 'low') return // Skip preloading on low performance devices

    const imagesToPreload = performanceMode === 'medium' 
      ? images.slice(0, 2) // Only preload first 2 images on medium performance
      : images // Preload all on high performance

    imagesToPreload.forEach(src => {
      const img = new window.Image()
      img.onload = () => setLoadedCount(prev => prev + 1)
      img.onerror = () => setLoadedCount(prev => prev + 1) // Count errors too
      img.src = src
    })
  }, [images, performanceMode])

  return null
}

// Hook for progressive image enhancement
export function useProgressiveImage(lowQualitySrc: string, highQualitySrc: string) {
  const [src, setSrc] = useState(lowQualitySrc)
  const [isHighQuality, setIsHighQuality] = useState(false)
  const { performanceMode } = useAnimationContext()

  useEffect(() => {
    // Skip progressive loading on low performance devices
    if (performanceMode === 'low') {
      setSrc(lowQualitySrc)
      return
    }

    const img = new window.Image()
    img.onload = () => {
      setSrc(highQualitySrc)
      setIsHighQuality(true)
    }
    img.src = highQualitySrc
  }, [lowQualitySrc, highQualitySrc, performanceMode])

  return { src, isHighQuality }
}
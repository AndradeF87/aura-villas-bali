'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  fill?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  fill = false,
  sizes,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Fallback image for errors
  const fallbackSrc = '/images/placeholder.svg'

  return (
    <div className={`relative ${className} ${isLoading ? 'animate-pulse bg-sand-light' : ''}`}>
      <Image
        src={hasError ? fallbackSrc : src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes || '100vw'}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={`duration-700 ease-in-out ${
          isLoading ? 'scale-105 blur-sm grayscale' : 'scale-100 blur-0 grayscale-0'
        }`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
      />
    </div>
  )
}

// Utility to generate responsive sizes string
export function generateSizes(config: {
  mobile?: number
  tablet?: number
  desktop?: number
}) {
  const { mobile = 100, tablet = 50, desktop = 33 } = config
  return `(max-width: 640px) ${mobile}vw, (max-width: 1024px) ${tablet}vw, ${desktop}vw`
}

// Preload critical images
export function preloadImage(src: string) {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  }
}
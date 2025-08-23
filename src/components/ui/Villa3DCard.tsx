'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { MapPin, Users, Bed, Star, ArrowRight, Heart, Share2, Eye } from 'lucide-react'
import type { Villa } from '@/types/villa'

interface Villa3DCardProps {
  villa: Partial<Villa>
  index: number
  onCardClick?: (villa: Partial<Villa>) => void
  className?: string
}

export function Villa3DCard({ villa, index, onCardClick, className = '' }: Villa3DCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [priceCounter, setPriceCounter] = useState(0)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // Intersection Observer for staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, index * 150) // Staggered entrance
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [index])

  // Price counter animation
  useEffect(() => {
    if (isVisible && villa.pricing?.basePrice) {
      let start = 0
      const end = villa.pricing.basePrice
      const duration = 1500
      const increment = end / (duration / 16)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setPriceCounter(end)
          clearInterval(timer)
        } else {
          setPriceCounter(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isVisible, villa.pricing?.basePrice])

  // Mouse movement tracking for 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePosition({
      x: (x / rect.width - 0.5) * 2,
      y: (y / rect.height - 0.5) * 2
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  const handleCardFlip = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFlipped(!isFlipped)
  }

  const getTransformStyle = () => {
    if (!isHovered) return ''
    
    const rotateX = mousePosition.y * -10
    const rotateY = mousePosition.x * 10
    const scale = isHovered ? 1.05 : 1
    
    return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
  }

  const getShadowStyle = () => {
    if (!isHovered) return '0 4px 15px rgba(0, 0, 0, 0.1)'
    
    const shadowX = mousePosition.x * 25
    const shadowY = mousePosition.y * 25 + 20
    
    return `${shadowX}px ${shadowY}px 50px rgba(0, 0, 0, 0.25)`
  }

  return (
    <div
      ref={cardRef}
      className={`
        villa-3d-card-container relative
        transform transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        ${className}
      `}
      style={{
        transformStyle: 'preserve-3d',
        transform: getTransformStyle(),
        boxShadow: getShadowStyle(),
        transitionDelay: `${index * 100}ms`
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onCardClick?.(villa)}
    >
      {/* Main Card */}
      <div
        className={`
          villa-3d-card relative w-full h-full
          bg-white rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-500 ease-out
          ${isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
        style={{
          transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Image Container with Zoom Effect */}
        <div className="relative h-64 overflow-hidden group">
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12 animate-shimmer"></div>
            </div>
          )}
          
          <Image
            src={villa.images?.[0]?.url || '/images/placeholder.svg'}
            alt={villa.images?.[0]?.alt || villa.name || ''}
            fill
            className={`
              object-cover transition-all duration-700 ease-out
              ${isHovered ? 'scale-110' : 'scale-100'}
              ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
            onLoad={() => setIsImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Floating Action Buttons */}
          <div className={`
            absolute top-4 right-4 flex flex-col gap-2
            transition-all duration-300 transform
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-70'}
          `}>
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all">
              <Heart className="w-4 h-4 text-red-500" />
            </button>
            <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all">
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleCardFlip}
              className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all"
            >
              <Eye className="w-4 h-4 text-blue-600" />
            </button>
          </div>

          {/* Location Badge with Pulse Effect */}
          <div className={`
            absolute top-4 left-4 
            bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full 
            flex items-center gap-1 shadow-lg
            transition-all duration-300
            ${isHovered ? 'scale-105' : 'scale-100'}
          `}>
            <MapPin className="w-4 h-4 text-terracotta animate-pulse" />
            <span className="text-sm font-medium">{villa.location?.area}</span>
          </div>

          {/* Rating Badge with Glow Effect */}
          <div className={`
            absolute top-4 right-20 md:right-4 lg:right-20
            bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 rounded-full 
            flex items-center gap-1 shadow-lg
            transition-all duration-300
            ${isHovered ? 'scale-105 shadow-amber-300/50' : 'scale-100'}
          `}>
            <Star className="w-4 h-4 text-white fill-current" />
            <span className="text-sm font-medium text-white">{villa.rating}</span>
          </div>

          {/* Overlay Gradient */}
          <div className={`
            absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent
            transition-opacity duration-300
            ${isHovered ? 'opacity-30' : 'opacity-0'}
          `} />
        </div>

        {/* Content */}
        <div className="p-6 relative">
          {/* Villa Name */}
          <h3 className="font-serif text-2xl text-deep-green mb-2 group-hover:text-terracotta transition-colors">
            {villa.name}
          </h3>

          {/* Story Teaser */}
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {villa.storyTeaser}
          </p>

          {/* Animated Price */}
          <div className="mb-4">
            <span className="text-3xl font-bold text-deep-green">
              ${priceCounter.toLocaleString()}
            </span>
            <span className="text-gray-500 ml-1">/night</span>
          </div>

          {/* Amenities */}
          <div className="flex items-center gap-4 text-gray-500 mb-6">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span className="text-sm">{villa.bedrooms}BR</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span className="text-sm">{villa.maxGuests} Guests</span>
            </div>
            <div className="text-sm">
              Pool • Chef • WiFi
            </div>
          </div>

          {/* CTA Button with Magnetic Effect */}
          <button className={`
            w-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold 
            py-3 px-4 rounded-lg transition-all duration-300
            flex items-center justify-center gap-2 group
            transform
            ${isHovered ? 'translate-y-0 shadow-lg' : 'translate-y-0'}
          `}>
            <span>Discover This Story</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3D Depth Layers */}
        <div className={`
          absolute inset-0 rounded-2xl border border-white/20 pointer-events-none
          transition-all duration-300
          ${isHovered ? 'shadow-2xl' : 'shadow-lg'}
        `} />
      </div>

      {/* Flipped Card - Details View */}
      <div
        className={`
          villa-3d-card-back absolute inset-0
          bg-gradient-to-br from-deep-green to-deep-green-dark text-white
          rounded-2xl p-6 overflow-hidden
          transition-all duration-500 ease-out
          ${isFlipped ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        style={{
          transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Back to Front Button */}
        <button
          onClick={handleCardFlip}
          className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
        </button>

        <div className="h-full flex flex-col">
          <h3 className="font-serif text-2xl mb-4">{villa.name}</h3>
          
          {/* Extended Story */}
          <div className="flex-1 mb-6">
            <p className="text-white/90 leading-relaxed">
              {villa.storyTeaser}
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="font-medium">{villa.location?.area}</span>
              </div>
              <div className="flex justify-between">
                <span>Bedrooms:</span>
                <span className="font-medium">{villa.bedrooms}</span>
              </div>
              <div className="flex justify-between">
                <span>Max Guests:</span>
                <span className="font-medium">{villa.maxGuests}</span>
              </div>
              <div className="flex justify-between">
                <span>Rating:</span>
                <span className="font-medium flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-amber-400" />
                  {villa.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Book Button */}
          <button className="w-full bg-terracotta hover:bg-terracotta-dark py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
            <span>Quick Book</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-terracotta/30 rounded-full blur-2xl animate-pulse animation-delay-1000" />
        </div>
      </div>
    </div>
  )
}
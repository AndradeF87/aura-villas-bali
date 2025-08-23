'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn, Download } from 'lucide-react'
import type { VillaImage } from '@/types/villa'

interface VillaGallery3DProps {
  images: VillaImage[]
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

export function VillaGallery3D({ images, isOpen, onClose, initialIndex = 0 }: VillaGallery3DProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const galleryRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Touch/drag handling for mobile swipe
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const nextImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const prevImage = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
    setScale(isZoomed ? 1 : 2)
    setDragOffset({ x: 0, y: 0 })
  }

  // Mouse drag handling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return
    setDragStart({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragStart || !isZoomed) return
    setDragOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setDragStart(null)
  }

  // Touch handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isZoomed) return
    const touch = e.touches[0]
    setTouchStart({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return
    const touch = e.touches[0]
    setTouchEnd({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const deltaX = touchStart.x - touchEnd.x
    const deltaY = touchStart.y - touchEnd.y
    const minSwipeDistance = 50

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          nextImage()
        } else {
          prevImage()
        }
      }
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return
    
    switch (e.key) {
      case 'ArrowLeft':
        prevImage()
        break
      case 'ArrowRight':
        nextImage()
        break
      case 'Escape':
        onClose()
        break
      case ' ':
        e.preventDefault()
        toggleZoom()
        break
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="text-white">
          <span className="text-sm opacity-75">{currentIndex + 1} of {images.length}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleZoom}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Gallery */}
      <div
        ref={galleryRef}
        className="relative w-full h-full flex items-center justify-center p-4 pt-16 pb-20"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white disabled:opacity-50"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextImage}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white disabled:opacity-50"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Main Image */}
        <div className="relative max-w-full max-h-full overflow-hidden">
          <Image
            ref={imageRef}
            src={currentImage.url}
            alt={currentImage.alt}
            width={1200}
            height={800}
            className={`
              max-w-full max-h-full object-contain cursor-pointer
              transition-all duration-300 ease-out
              ${isTransitioning ? 'opacity-70 scale-95' : 'opacity-100 scale-100'}
              ${isZoomed ? 'cursor-grab' : 'cursor-zoom-in'}
            `}
            style={{
              transform: `scale(${scale}) translate(${dragOffset.x}px, ${dragOffset.y}px)`,
              transformOrigin: 'center'
            }}
            onMouseDown={handleMouseDown}
            onClick={!isZoomed ? toggleZoom : undefined}
            draggable={false}
            priority
          />
        </div>

        {/* Loading Animation */}
        {isTransitioning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(index)}
              className={`
                relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-200
                ${index === currentIndex 
                  ? 'ring-2 ring-white scale-110 shadow-lg' 
                  : 'opacity-70 hover:opacity-100 hover:scale-105'
                }
              `}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Zoom Instructions */}
      {isZoomed && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
          Drag to pan • Click to zoom out
        </div>
      )}

      {/* Swipe Instructions for Mobile */}
      <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-xs bg-black/50 px-3 py-1 rounded-full opacity-75">
        Swipe left/right to navigate
      </div>
    </div>
  )
}
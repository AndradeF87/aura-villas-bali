'use client'

import { useEffect, useRef, useState } from 'react'

interface Use3DAnimationsOptions {
  threshold?: number
  rootMargin?: string
  staggerDelay?: number
  enableParallax?: boolean
  enableTilt?: boolean
}

interface Animation3DControls {
  isVisible: boolean
  isHovered: boolean
  mousePosition: { x: number; y: number }
  parallaxY: number
  setIsHovered: (hovered: boolean) => void
  handleMouseMove: (e: React.MouseEvent<HTMLElement>) => void
  getTransformStyle: () => string
  getShadowStyle: () => string
  ref: React.RefObject<HTMLElement>
}

export function use3DAnimations(
  index: number = 0,
  options: Use3DAnimationsOptions = {}
): Animation3DControls {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    staggerDelay = 150,
    enableParallax = true,
    enableTilt = true
  } = options

  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [parallaxY, setParallaxY] = useState(0)

  // Intersection Observer for staggered entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, index * staggerDelay)
        }
      },
      { threshold, rootMargin }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [index, threshold, rootMargin, staggerDelay])

  // Parallax scrolling effect
  useEffect(() => {
    if (!enableParallax) return

    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const scrollTop = window.pageYOffset
      const elementTop = rect.top + scrollTop
      const windowHeight = window.innerHeight
      
      // Calculate parallax offset
      const rate = (scrollTop - elementTop + windowHeight) / (windowHeight + rect.height)
      const yPos = Math.round(rate * 50) // Adjust multiplier for intensity
      
      setParallaxY(yPos)
    }

    const throttledScroll = throttle(handleScroll, 16) // ~60fps
    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [enableParallax])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!enableTilt || !ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePosition({
      x: (x / rect.width - 0.5) * 2,
      y: (y / rect.height - 0.5) * 2
    })
  }

  const getTransformStyle = (): string => {
    const transforms = ['perspective(1000px)']

    // 3D tilt based on mouse position
    if (enableTilt && isHovered) {
      const rotateX = mousePosition.y * -10
      const rotateY = mousePosition.x * 10
      const scale = 1.05
      
      transforms.push(`rotateX(${rotateX}deg)`)
      transforms.push(`rotateY(${rotateY}deg)`)
      transforms.push(`scale3d(${scale}, ${scale}, ${scale})`)
    }

    // Parallax transform
    if (enableParallax && isVisible) {
      transforms.push(`translateY(${parallaxY * 0.1}px)`)
    }

    // Entrance animation transform
    if (!isVisible) {
      transforms.push('translateY(40px)')
    }

    return transforms.join(' ')
  }

  const getShadowStyle = (): string => {
    if (!enableTilt || !isHovered) {
      return '0 4px 15px rgba(0, 0, 0, 0.1)'
    }
    
    const shadowX = mousePosition.x * 25
    const shadowY = mousePosition.y * 25 + 20
    
    return `${shadowX}px ${shadowY}px 50px rgba(0, 0, 0, 0.25)`
  }

  return {
    isVisible,
    isHovered,
    mousePosition,
    parallaxY,
    setIsHovered,
    handleMouseMove,
    getTransformStyle,
    getShadowStyle,
    ref
  }
}

// Performance optimization utilities
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Additional hook for counter animations
export function useCounterAnimation(
  endValue: number,
  duration: number = 1500,
  startDelay: number = 0
) {
  const [currentValue, setCurrentValue] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = () => {
    if (isAnimating) return

    setIsAnimating(true)
    
    setTimeout(() => {
      let start = 0
      const increment = endValue / (duration / 16)
      
      const timer = setInterval(() => {
        start += increment
        if (start >= endValue) {
          setCurrentValue(endValue)
          clearInterval(timer)
          setIsAnimating(false)
        } else {
          setCurrentValue(Math.floor(start))
        }
      }, 16)
    }, startDelay)
  }

  return {
    currentValue,
    isAnimating,
    startAnimation
  }
}

// Hook for managing intersection-based animations
export function useIntersectionAnimation(options: {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  onIntersect?: () => void
  onLeave?: () => void
}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    onIntersect,
    onLeave
  } = options

  const ref = useRef<HTMLElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting

        if (intersecting && (!hasIntersected || !triggerOnce)) {
          setIsIntersecting(true)
          setHasIntersected(true)
          onIntersect?.()
        } else if (!intersecting && !triggerOnce) {
          setIsIntersecting(false)
          onLeave?.()
        }
      },
      { threshold, rootMargin }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, triggerOnce, hasIntersected, onIntersect, onLeave])

  return {
    ref,
    isIntersecting,
    hasIntersected
  }
}

// Hook for managing touch gestures on mobile
export function useTouchGestures(options: {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number
}) {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 50
  } = options

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setTouchStart({ x: touch.clientX, y: touch.clientY })
    setTouchEnd(null)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setTouchEnd({ x: touch.clientX, y: touch.clientY })
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const deltaX = touchStart.x - touchEnd.x
    const deltaY = touchStart.y - touchEnd.y
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    if (Math.max(absDeltaX, absDeltaY) < threshold) return

    if (absDeltaX > absDeltaY) {
      // Horizontal swipe
      if (deltaX > 0) {
        onSwipeLeft?.()
      } else {
        onSwipeRight?.()
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        onSwipeUp?.()
      } else {
        onSwipeDown?.()
      }
    }

    setTouchStart(null)
    setTouchEnd(null)
  }

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  }
}
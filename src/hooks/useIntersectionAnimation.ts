'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useAnimation } from '@/components/animations/AnimationProvider'

interface IntersectionAnimationOptions {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
  duration?: number
  ease?: string
  onEnter?: () => void
  onExit?: () => void
}

interface AnimationConfig {
  from?: gsap.TweenVars
  to: gsap.TweenVars
  stagger?: number
}

export function useIntersectionAnimation<T extends Element = HTMLElement>(
  animationConfig: AnimationConfig,
  options: IntersectionAnimationOptions = {}
) {
  const elementRef = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const { isReady, prefersReducedMotion } = useAnimation()

  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
    duration = 0.8,
    ease = 'power2.out',
    onEnter,
    onExit,
  } = options

  const { from = {}, to, stagger = 0 } = animationConfig

  useEffect(() => {
    if (!isReady) return

    const element = elementRef.current
    if (!element) return

    // Set initial state
    if (Object.keys(from).length > 0 && !prefersReducedMotion) {
      gsap.set(element, from)
    }

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (!hasTriggered || !triggerOnce) {
              setHasTriggered(true)
              onEnter?.()
            }
          } else {
            setIsVisible(false)
            if (!triggerOnce) {
              onExit?.()
            }
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [isReady, threshold, rootMargin, triggerOnce, from])

  useEffect(() => {
    if (!isReady || prefersReducedMotion) return
    
    const element = elementRef.current
    if (!element || !isVisible) return

    if (triggerOnce && hasTriggered && isVisible) return

    // Animate to visible state
    if (stagger > 0) {
      const children = element.children
      gsap.to(children, {
        ...to,
        duration,
        ease,
        stagger,
        delay,
      })
    } else {
      gsap.to(element, {
        ...to,
        duration,
        ease,
        delay,
      })
    }
  }, [isVisible, hasTriggered, isReady, prefersReducedMotion, to, duration, ease, stagger, delay, triggerOnce])

  return {
    ref: elementRef,
    isVisible,
    hasTriggered,
  }
}

// Specialized hooks for common intersection animations
export function useFadeInOnIntersect<T extends Element = HTMLElement>(
  options: IntersectionAnimationOptions = {}
) {
  return useIntersectionAnimation<T>(
    {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    options
  )
}

export function useSlideInOnIntersect<T extends Element = HTMLElement>(
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 50,
  options: IntersectionAnimationOptions = {}
) {
  const getFromProps = () => {
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 }
      case 'down': return { y: -distance, opacity: 0 }
      case 'left': return { x: distance, opacity: 0 }
      case 'right': return { x: -distance, opacity: 0 }
    }
  }

  const getToProps = () => {
    switch (direction) {
      case 'up':
      case 'down': return { y: 0, opacity: 1 }
      case 'left':
      case 'right': return { x: 0, opacity: 1 }
    }
  }

  return useIntersectionAnimation<T>(
    {
      from: getFromProps(),
      to: getToProps(),
    },
    options
  )
}

export function useScaleInOnIntersect<T extends Element = HTMLElement>(
  scale: number = 0.8,
  options: IntersectionAnimationOptions = {}
) {
  return useIntersectionAnimation<T>(
    {
      from: { scale, opacity: 0 },
      to: { scale: 1, opacity: 1 },
    },
    options
  )
}

export function useStaggeredIntersection<T extends Element = HTMLElement>(
  stagger: number = 0.1,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 30,
  options: IntersectionAnimationOptions = {}
) {
  const getFromProps = () => {
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 }
      case 'down': return { y: -distance, opacity: 0 }
      case 'left': return { x: distance, opacity: 0 }
      case 'right': return { x: -distance, opacity: 0 }
    }
  }

  const getToProps = () => {
    switch (direction) {
      case 'up':
      case 'down': return { y: 0, opacity: 1 }
      case 'left':
      case 'right': return { x: 0, opacity: 1 }
    }
  }

  return useIntersectionAnimation<T>(
    {
      from: getFromProps(),
      to: getToProps(),
      stagger,
    },
    options
  )
}

// Advanced hook for multiple intersection thresholds
export function useMultiThresholdAnimation<T extends Element = HTMLElement>(
  thresholdAnimations: Array<{
    threshold: number
    animation: AnimationConfig
    options?: Partial<IntersectionAnimationOptions>
  }>,
  baseOptions: IntersectionAnimationOptions = {}
) {
  const elementRef = useRef<T>(null)
  const [intersectionRatios, setIntersectionRatios] = useState<number[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)
  const { isReady, prefersReducedMotion } = useAnimation()

  useEffect(() => {
    if (!isReady) return

    const element = elementRef.current
    if (!element) return

    const thresholds = thresholdAnimations.map(ta => ta.threshold)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio
          setIntersectionRatios(prev => {
            const newRatios = [...prev]
            const index = thresholds.findIndex(t => Math.abs(t - ratio) < 0.01)
            if (index !== -1) {
              newRatios[index] = ratio
            }
            return newRatios
          })
        })
      },
      {
        threshold: thresholds,
        rootMargin: baseOptions.rootMargin || '0px',
      }
    )

    observerRef.current.observe(element)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [isReady, thresholdAnimations, baseOptions.rootMargin])

  useEffect(() => {
    if (!isReady || prefersReducedMotion) return

    const element = elementRef.current
    if (!element) return

    // Trigger animations based on intersection ratios
    thresholdAnimations.forEach((thresholdAnimation, index) => {
      const ratio = intersectionRatios[index]
      if (ratio >= thresholdAnimation.threshold) {
        const { animation, options = {} } = thresholdAnimation
        const { from = {}, to, stagger = 0 } = animation
        const {
          duration = 0.8,
          ease = 'power2.out',
          delay = 0,
        } = { ...baseOptions, ...options }

        // Apply animation
        if (stagger > 0) {
          const children = element.children
          gsap.to(children, {
            ...to,
            duration,
            ease,
            stagger,
            delay,
          })
        } else {
          gsap.to(element, {
            ...to,
            duration,
            ease,
            delay,
          })
        }
      }
    })
  }, [intersectionRatios, thresholdAnimations, baseOptions, isReady, prefersReducedMotion])

  return {
    ref: elementRef,
    intersectionRatios,
  }
}
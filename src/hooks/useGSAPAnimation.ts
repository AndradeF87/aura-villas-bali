'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { useAnimation } from '@/components/animations/AnimationProvider'
import { performanceMonitor } from '@/lib/animations/performance'

interface GSAPAnimationOptions {
  duration?: number
  delay?: number
  ease?: string
  repeat?: number
  yoyo?: boolean
  stagger?: number
  autoplay?: boolean
  paused?: boolean
}

export function useGSAPAnimation<T extends Element = HTMLElement>(
  animationFunction: (element: T, tl: gsap.core.Timeline) => void,
  options: GSAPAnimationOptions = {},
  dependencies: any[] = []
) {
  const elementRef = useRef<T>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const { isReady, prefersReducedMotion } = useAnimation()

  const {
    duration = 0.8,
    delay = 0,
    ease = 'power2.out',
    repeat = 0,
    yoyo = false,
    stagger = 0,
    autoplay = true,
    paused = false,
  } = options

  useEffect(() => {
    if (!isReady) return

    const element = elementRef.current
    if (!element) return

    // Clean up existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) {
      return
    }

    // Create new timeline with performance optimizations
    const optimizedDuration = performanceMonitor.getOptimizedDuration(duration)
    const optimizedStagger = performanceMonitor.getOptimizedStagger(stagger)

    timelineRef.current = gsap.timeline({
      delay,
      repeat,
      yoyo,
      paused: paused || !autoplay,
      defaults: {
        duration: optimizedDuration,
        ease,
      }
    })

    // Apply stagger if specified
    if (optimizedStagger > 0) {
      timelineRef.current.set({}, {}, optimizedStagger)
    }

    // Execute the animation function
    animationFunction(element, timelineRef.current)

    // Auto-play if specified
    if (autoplay && !paused) {
      timelineRef.current.play()
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
        timelineRef.current = null
      }
    }
  }, [isReady, prefersReducedMotion, ...dependencies])

  // Control functions
  const play = useCallback(() => {
    timelineRef.current?.play()
  }, [])

  const pause = useCallback(() => {
    timelineRef.current?.pause()
  }, [])

  const restart = useCallback(() => {
    timelineRef.current?.restart()
  }, [])

  const reverse = useCallback(() => {
    timelineRef.current?.reverse()
  }, [])

  const seek = useCallback((time: number) => {
    timelineRef.current?.seek(time)
  }, [])

  const setProgress = useCallback((progress: number) => {
    timelineRef.current?.progress(progress)
  }, [])

  const isActive = useCallback(() => {
    return timelineRef.current?.isActive() || false
  }, [])

  const isPaused = useCallback(() => {
    return timelineRef.current?.paused() || true
  }, [])

  return {
    ref: elementRef,
    timeline: timelineRef.current,
    play,
    pause,
    restart,
    reverse,
    seek,
    setProgress,
    isActive,
    isPaused,
  }
}

// Specialized hooks for common animations
export function useFadeAnimation<T extends Element = HTMLElement>(
  options: GSAPAnimationOptions & { 
    from?: number
    to?: number
  } = {}
) {
  const { from = 0, to = 1, ...gsapOptions } = options

  return useGSAPAnimation<T>(
    (element, tl) => {
      tl.fromTo(element, 
        { opacity: from },
        { opacity: to }
      )
    },
    gsapOptions
  )
}

export function useSlideAnimation<T extends Element = HTMLElement>(
  direction: 'up' | 'down' | 'left' | 'right',
  distance: number = 50,
  options: GSAPAnimationOptions = {}
) {
  return useGSAPAnimation<T>(
    (element, tl) => {
      const fromProps: gsap.TweenVars = { opacity: 0 }
      const toProps: gsap.TweenVars = { opacity: 1 }

      switch (direction) {
        case 'up':
          fromProps.y = distance
          toProps.y = 0
          break
        case 'down':
          fromProps.y = -distance
          toProps.y = 0
          break
        case 'left':
          fromProps.x = distance
          toProps.x = 0
          break
        case 'right':
          fromProps.x = -distance
          toProps.x = 0
          break
      }

      tl.fromTo(element, fromProps, toProps)
    },
    options
  )
}

export function useScaleAnimation<T extends Element = HTMLElement>(
  options: GSAPAnimationOptions & { 
    from?: number
    to?: number
  } = {}
) {
  const { from = 0.8, to = 1, ...gsapOptions } = options

  return useGSAPAnimation<T>(
    (element, tl) => {
      tl.fromTo(element,
        { scale: from, opacity: 0 },
        { scale: to, opacity: 1 }
      )
    },
    gsapOptions
  )
}

export function useRotateAnimation<T extends Element = HTMLElement>(
  options: GSAPAnimationOptions & { 
    from?: number
    to?: number
  } = {}
) {
  const { from = 0, to = 360, ...gsapOptions } = options

  return useGSAPAnimation<T>(
    (element, tl) => {
      tl.fromTo(element,
        { rotation: from },
        { rotation: to }
      )
    },
    gsapOptions
  )
}

export function useMorphAnimation<T extends Element = HTMLElement>(
  morphPath: string,
  options: GSAPAnimationOptions = {}
) {
  return useGSAPAnimation<T>(
    (element, tl) => {
      tl.to(element, {
        morphSVG: morphPath,
      })
    },
    options
  )
}

export function useTextAnimation<T extends Element = HTMLElement>(
  text: string,
  options: GSAPAnimationOptions & {
    scrambleText?: boolean
    typewriter?: boolean
  } = {}
) {
  const { scrambleText = false, typewriter = false, ...gsapOptions } = options

  return useGSAPAnimation<T>(
    (element, tl) => {
      if (typewriter) {
        tl.to(element, {
          text: text,
          ease: 'none',
        })
      } else if (scrambleText) {
        tl.to(element, {
          scrambleText: {
            text: text,
            chars: "XO",
            revealDelay: 0.5,
            tweenLength: false,
          }
        })
      } else {
        tl.to(element, {
          text: text,
        })
      }
    },
    gsapOptions
  )
}
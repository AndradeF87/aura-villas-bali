'use client'

import { useEffect, useRef, RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAnimation } from '@/components/animations/AnimationProvider'

interface ScrollAnimationOptions {
  trigger?: RefObject<Element> | string
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  pinSpacing?: boolean
  toggleActions?: string
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
  onUpdate?: (self: ScrollTrigger) => void
  markers?: boolean
  once?: boolean
}

interface AnimationConfig {
  from?: gsap.TweenVars
  to: gsap.TweenVars
  duration?: number
  ease?: string
  stagger?: number
  delay?: number
}

export function useScrollAnimation(
  animationConfig: AnimationConfig,
  options: ScrollAnimationOptions = {}
) {
  const elementRef = useRef<HTMLElement>(null)
  const { isReady, prefersReducedMotion } = useAnimation()

  useEffect(() => {
    if (!isReady || prefersReducedMotion) return

    const element = elementRef.current
    if (!element) return

    const {
      trigger = element,
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      pin = false,
      pinSpacing = true,
      toggleActions = 'play none none reverse',
      onEnter,
      onLeave,
      onEnterBack,
      onLeaveBack,
      onUpdate,
      markers = false,
      once = false,
    } = options

    const {
      from = {},
      to,
      duration = 0.8,
      ease = 'power2.out',
      stagger = 0,
      delay = 0,
    } = animationConfig

    // Set initial state if provided
    if (Object.keys(from).length > 0) {
      gsap.set(element, from)
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: typeof trigger === 'string' ? trigger : (trigger as any)?.current || trigger,
        start,
        end,
        scrub,
        pin,
        pinSpacing,
        toggleActions: once ? 'play none none none' : toggleActions,
        markers: markers && process.env.NODE_ENV === 'development',
        onEnter,
        onLeave,
        onEnterBack,
        onLeaveBack,
        onUpdate,
        invalidateOnRefresh: true,
      }
    })

    // Add animation to timeline
    if (stagger > 0) {
      const children = element.children
      timeline.to(children, {
        ...to,
        duration,
        ease,
        stagger,
        delay,
      })
    } else {
      timeline.to(element, {
        ...to,
        duration,
        ease,
        delay,
      })
    }

    return () => {
      timeline.kill()
    }
  }, [isReady, prefersReducedMotion, animationConfig, options])

  return elementRef
}

// Specialized hooks for common scroll animations
export function useFadeInOnScroll(options: ScrollAnimationOptions = {}) {
  return useScrollAnimation(
    {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    options
  )
}

export function useSlideInOnScroll(
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 50,
  options: ScrollAnimationOptions = {}
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

  return useScrollAnimation(
    {
      from: getFromProps(),
      to: getToProps(),
    },
    options
  )
}

export function useScaleInOnScroll(
  scale: number = 0.8,
  options: ScrollAnimationOptions = {}
) {
  return useScrollAnimation(
    {
      from: { scale, opacity: 0 },
      to: { scale: 1, opacity: 1 },
    },
    options
  )
}

export function useStaggeredChildrenOnScroll(
  stagger: number = 0.1,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 30,
  options: ScrollAnimationOptions = {}
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

  return useScrollAnimation(
    {
      from: getFromProps(),
      to: getToProps(),
      stagger,
    },
    options
  )
}

export function useParallaxOnScroll(
  speed: number = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical',
  options: Omit<ScrollAnimationOptions, 'scrub'> = {}
) {
  const animationConfig = {
    to: direction === 'vertical' 
      ? { yPercent: -100 * speed }
      : { xPercent: -100 * speed },
  }

  return useScrollAnimation(animationConfig, {
    ...options,
    scrub: true,
    start: 'top bottom',
    end: 'bottom top',
  })
}
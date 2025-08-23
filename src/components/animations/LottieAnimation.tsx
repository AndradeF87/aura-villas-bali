'use client'

import React, { useEffect, useRef } from 'react'
import lottie, { AnimationItem } from 'lottie-web'
import { useAnimation } from './AnimationProvider'

interface LottieAnimationProps {
  src: string | object
  loop?: boolean
  autoplay?: boolean
  className?: string
  width?: number
  height?: number
  speed?: number
  direction?: 1 | -1
  onComplete?: () => void
  onLoopComplete?: () => void
  trigger?: 'scroll' | 'hover' | 'click' | 'auto'
  triggerStart?: string
}

export function LottieAnimation({
  src,
  loop = true,
  autoplay = true,
  className = '',
  width,
  height,
  speed = 1,
  direction = 1,
  onComplete,
  onLoopComplete,
  trigger = 'auto',
  triggerStart = 'top 80%',
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)
  const { isReady, prefersReducedMotion } = useAnimation()

  useEffect(() => {
    if (!isReady) return

    const container = containerRef.current
    if (!container) return

    // Load animation
    const loadAnimation = () => {
      if (animationRef.current) {
        animationRef.current.destroy()
      }

      animationRef.current = lottie.loadAnimation({
        container,
        renderer: 'svg',
        loop: prefersReducedMotion ? false : loop,
        autoplay: prefersReducedMotion ? false : (trigger === 'auto' ? autoplay : false),
        animationData: typeof src === 'string' ? undefined : src,
        path: typeof src === 'string' ? src : undefined,
      })

      if (animationRef.current) {
        animationRef.current.setSpeed(prefersReducedMotion ? 0 : speed)
        animationRef.current.setDirection(direction)

        // Event listeners
        if (onComplete) {
          animationRef.current.addEventListener('complete', onComplete)
        }
        if (onLoopComplete) {
          animationRef.current.addEventListener('loopComplete', onLoopComplete)
        }

        // Trigger-based playback
        if (!prefersReducedMotion && trigger !== 'auto') {
          setupTrigger()
        }
      }
    }

    const setupTrigger = () => {
      if (!animationRef.current) return

      switch (trigger) {
        case 'scroll':
          // Use Intersection Observer for scroll trigger
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  animationRef.current?.play()
                } else if (!loop) {
                  animationRef.current?.stop()
                }
              })
            },
            { threshold: 0.1 }
          )
          observer.observe(container)
          return () => observer.disconnect()

        case 'hover':
          const handleMouseEnter = () => animationRef.current?.play()
          const handleMouseLeave = () => {
            if (!loop) animationRef.current?.stop()
          }
          container.addEventListener('mouseenter', handleMouseEnter)
          container.addEventListener('mouseleave', handleMouseLeave)
          return () => {
            container.removeEventListener('mouseenter', handleMouseEnter)
            container.removeEventListener('mouseleave', handleMouseLeave)
          }

        case 'click':
          const handleClick = () => {
            if (animationRef.current?.isPaused) {
              animationRef.current.play()
            } else {
              animationRef.current?.pause()
            }
          }
          container.addEventListener('click', handleClick)
          return () => container.removeEventListener('click', handleClick)
      }
    }

    loadAnimation()

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy()
        animationRef.current = null
      }
    }
  }, [isReady, prefersReducedMotion, src, loop, autoplay, speed, direction, trigger])

  const style: React.CSSProperties = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : 'auto',
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={style}
    />
  )
}
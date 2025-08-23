'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAnimation } from './AnimationProvider'

interface ParallaxSectionProps {
  children: React.ReactNode
  speed?: number
  className?: string
  direction?: 'vertical' | 'horizontal'
  reverse?: boolean
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
  direction = 'vertical',
  reverse = false,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { isReady, prefersReducedMotion } = useAnimation()

  useEffect(() => {
    if (!isReady || prefersReducedMotion) return

    const section = sectionRef.current
    if (!section) return

    const multiplier = reverse ? -speed : speed
    
    if (direction === 'vertical') {
      gsap.to(section, {
        yPercent: -100 * multiplier,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        }
      })
    } else {
      gsap.to(section, {
        xPercent: -100 * multiplier,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'left right',
          end: 'right left',
          scrub: true,
          invalidateOnRefresh: true,
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [isReady, prefersReducedMotion, speed, direction, reverse])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}
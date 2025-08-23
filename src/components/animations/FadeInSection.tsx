'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAnimation } from './AnimationProvider'

interface FadeInSectionProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  delay?: number
  duration?: number
  distance?: number
  className?: string
  triggerStart?: string
  triggerEnd?: string
}

export function FadeInSection({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 50,
  className = '',
  triggerStart = 'top 80%',
  triggerEnd = 'bottom 20%',
}: FadeInSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { isReady, prefersReducedMotion } = useAnimation()

  useEffect(() => {
    if (!isReady || prefersReducedMotion) return

    const section = sectionRef.current
    if (!section) return

    // Set initial state
    const initialState: any = { opacity: 0 }
    const finalState: any = { opacity: 1, duration, delay }

    switch (direction) {
      case 'up':
        initialState.y = distance
        finalState.y = 0
        break
      case 'down':
        initialState.y = -distance
        finalState.y = 0
        break
      case 'left':
        initialState.x = distance
        finalState.x = 0
        break
      case 'right':
        initialState.x = -distance
        finalState.x = 0
        break
      case 'none':
        // Only fade, no movement
        break
    }

    gsap.set(section, initialState)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: triggerStart,
        end: triggerEnd,
        toggleActions: 'play none none reverse',
      }
    })

    tl.to(section, finalState)

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill()
        }
      })
    }
  }, [isReady, prefersReducedMotion, direction, delay, duration, distance, triggerStart, triggerEnd])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}
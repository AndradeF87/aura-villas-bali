'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAnimation } from './AnimationProvider'

interface StaggeredChildrenProps {
  children: React.ReactNode
  stagger?: number
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  distance?: number
  className?: string
  childSelector?: string
  triggerStart?: string
}

export function StaggeredChildren({
  children,
  stagger = 0.1,
  delay = 0,
  duration = 0.6,
  direction = 'up',
  distance = 30,
  className = '',
  childSelector = '> *',
  triggerStart = 'top 80%',
}: StaggeredChildrenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isReady, prefersReducedMotion } = useAnimation()

  useEffect(() => {
    if (!isReady || prefersReducedMotion) return

    const container = containerRef.current
    if (!container) return

    const children = container.querySelectorAll(childSelector)
    if (children.length === 0) return

    // Set initial state for all children
    const initialState: any = { opacity: 0 }
    const finalState: any = { opacity: 1, duration, ease: 'power2.out' }

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
      case 'scale':
        initialState.scale = 0.8
        finalState.scale = 1
        break
    }

    gsap.set(children, initialState)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: triggerStart,
        toggleActions: 'play none none reverse',
      }
    })

    tl.to(children, {
      ...finalState,
      stagger,
      delay,
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [isReady, prefersReducedMotion, stagger, delay, duration, direction, distance, childSelector, triggerStart])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
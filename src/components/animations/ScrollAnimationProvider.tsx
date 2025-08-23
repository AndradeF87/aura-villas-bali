'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAnimation } from './AnimationProvider'

interface ScrollAnimationProviderProps {
  children: React.ReactNode
}

export function ScrollAnimationProvider({ children }: ScrollAnimationProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isReady, prefersReducedMotion } = useAnimation()

  useEffect(() => {
    if (!isReady || prefersReducedMotion) return

    const container = containerRef.current
    if (!container) return

    // Refresh ScrollTrigger when layout changes
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh()
    })

    resizeObserver.observe(container)

    // Set up global scroll animations
    const sections = container.querySelectorAll('[data-animate]')
    
    sections.forEach((section) => {
      const animationType = section.getAttribute('data-animate')
      const delay = parseFloat(section.getAttribute('data-delay') || '0')
      const duration = parseFloat(section.getAttribute('data-duration') || '0.8')

      switch (animationType) {
        case 'fade-up':
          gsap.fromTo(section, 
            { 
              y: 50, 
              opacity: 0 
            },
            {
              y: 0,
              opacity: 1,
              duration,
              delay,
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
              }
            }
          )
          break

        case 'fade-in':
          gsap.fromTo(section,
            { opacity: 0 },
            {
              opacity: 1,
              duration,
              delay,
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
              }
            }
          )
          break

        case 'slide-left':
          gsap.fromTo(section,
            { x: 100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration,
              delay,
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
              }
            }
          )
          break

        case 'slide-right':
          gsap.fromTo(section,
            { x: -100, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration,
              delay,
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
              }
            }
          )
          break

        case 'scale-up':
          gsap.fromTo(section,
            { scale: 0.8, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration,
              delay,
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
              }
            }
          )
          break
      }
    })

    return () => {
      resizeObserver.disconnect()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [isReady, prefersReducedMotion])

  return (
    <div ref={containerRef} className="scroll-animation-container">
      {children}
    </div>
  )
}
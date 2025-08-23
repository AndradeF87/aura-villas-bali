'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

interface AnimationContextType {
  isReady: boolean
  prefersReducedMotion: boolean
}

const AnimationContext = createContext<AnimationContextType>({
  isReady: false,
  prefersReducedMotion: false,
})

export const useAnimation = () => {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider')
  }
  return context
}

interface AnimationProviderProps {
  children: React.ReactNode
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [isReady, setIsReady] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin)

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes in motion preference
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    mediaQuery.addEventListener('change', handleChange)

    // Configure GSAP defaults for performance
    gsap.defaults({
      ease: 'power2.out',
      duration: 0.8,
    })

    // Set ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
      markers: process.env.NODE_ENV === 'development' ? false : false,
    })

    // Optimize for mobile performance
    if (typeof window !== 'undefined') {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      if (isMobile) {
        // Reduce motion complexity on mobile
        ScrollTrigger.config({
          limitCallbacks: true,
          ignoreMobileResize: true,
        })
      }
    }

    setIsReady(true)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      ScrollTrigger.killAll()
    }
  }, [])

  // Disable animations if user prefers reduced motion
  useEffect(() => {
    if (prefersReducedMotion) {
      gsap.globalTimeline.timeScale(0)
    } else {
      gsap.globalTimeline.timeScale(1)
    }
  }, [prefersReducedMotion])

  return (
    <AnimationContext.Provider value={{ isReady, prefersReducedMotion }}>
      {children}
    </AnimationContext.Provider>
  )
}
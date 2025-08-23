'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

interface AnimationContextType {
  prefersReducedMotion: boolean
  isOnline: boolean
  deviceCapabilities: {
    supportsCSSTransforms: boolean
    supportsIntersectionObserver: boolean
    supportsPassiveEvents: boolean
    deviceMemory?: number
    hardwareConcurrency?: number
  }
  performanceMode: 'high' | 'medium' | 'low'
  enabledFeatures: {
    parallax: boolean
    tilt3D: boolean
    counterAnimations: boolean
    particleEffects: boolean
    complexTransitions: boolean
  }
}

const AnimationContext = createContext<AnimationContextType | null>(null)

interface AnimationProviderProps {
  children: ReactNode
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const [contextValue, setContextValue] = useState<AnimationContextType>({
    prefersReducedMotion: false,
    isOnline: true,
    deviceCapabilities: {
      supportsCSSTransforms: false,
      supportsIntersectionObserver: false,
      supportsPassiveEvents: false,
    },
    performanceMode: 'high',
    enabledFeatures: {
      parallax: true,
      tilt3D: true,
      counterAnimations: true,
      particleEffects: true,
      complexTransitions: true,
    }
  })

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Check online status
    const isOnline = navigator.onLine

    // Detect device capabilities
    const deviceCapabilities = {
      supportsCSSTransforms: 'transform' in document.body.style,
      supportsIntersectionObserver: 'IntersectionObserver' in window,
      supportsPassiveEvents: detectPassiveEvents(),
      deviceMemory: (navigator as any).deviceMemory,
      hardwareConcurrency: navigator.hardwareConcurrency,
    }

    // Determine performance mode based on device capabilities
    const performanceMode = determinePerformanceMode(deviceCapabilities, prefersReducedMotion)

    // Set enabled features based on performance mode and user preferences
    const enabledFeatures = determineEnabledFeatures(performanceMode, prefersReducedMotion, isOnline)

    setContextValue({
      prefersReducedMotion,
      isOnline,
      deviceCapabilities,
      performanceMode,
      enabledFeatures
    })

    // Listen for online/offline changes
    const handleOnline = () => setContextValue(prev => ({ ...prev, isOnline: true }))
    const handleOffline = () => setContextValue(prev => ({ ...prev, isOnline: false }))
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setContextValue(prev => ({
        ...prev,
        prefersReducedMotion: e.matches,
        enabledFeatures: determineEnabledFeatures(prev.performanceMode, e.matches, prev.isOnline)
      }))
    }
    
    mediaQuery.addEventListener('change', handleMotionChange)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimationContext() {
  const context = useContext(AnimationContext)
  if (!context) {
    throw new Error('useAnimationContext must be used within an AnimationProvider')
  }
  return context
}

// Utility functions
function detectPassiveEvents(): boolean {
  let passiveSupported = false
  try {
    const options = {
      get passive() {
        passiveSupported = true
        return false
      }
    }
    window.addEventListener('test', null as any, options)
    window.removeEventListener('test', null as any)
  } catch (e) {
    // Passive events not supported
  }
  return passiveSupported
}

function determinePerformanceMode(
  capabilities: AnimationContextType['deviceCapabilities'], 
  prefersReducedMotion: boolean
): 'high' | 'medium' | 'low' {
  if (prefersReducedMotion) return 'low'
  
  const { deviceMemory, hardwareConcurrency } = capabilities
  
  // High performance: Modern devices with good specs
  if (deviceMemory && deviceMemory >= 4 && hardwareConcurrency && hardwareConcurrency >= 4) {
    return 'high'
  }
  
  // Medium performance: Decent devices
  if (deviceMemory && deviceMemory >= 2 && hardwareConcurrency && hardwareConcurrency >= 2) {
    return 'medium'
  }
  
  // Low performance: Older or constrained devices
  return 'low'
}

function determineEnabledFeatures(
  performanceMode: 'high' | 'medium' | 'low',
  prefersReducedMotion: boolean,
  isOnline: boolean
): AnimationContextType['enabledFeatures'] {
  if (prefersReducedMotion) {
    return {
      parallax: false,
      tilt3D: false,
      counterAnimations: true, // Keep simple counter animations
      particleEffects: false,
      complexTransitions: false,
    }
  }

  switch (performanceMode) {
    case 'high':
      return {
        parallax: true,
        tilt3D: true,
        counterAnimations: true,
        particleEffects: isOnline,
        complexTransitions: true,
      }
    
    case 'medium':
      return {
        parallax: true,
        tilt3D: true,
        counterAnimations: true,
        particleEffects: false,
        complexTransitions: true,
      }
    
    case 'low':
      return {
        parallax: false,
        tilt3D: false,
        counterAnimations: true,
        particleEffects: false,
        complexTransitions: false,
      }
  }
}

// Hook for conditional animations based on performance
export function useConditionalAnimation(featureName: keyof AnimationContextType['enabledFeatures']) {
  const { enabledFeatures, prefersReducedMotion } = useAnimationContext()
  
  return {
    enabled: enabledFeatures[featureName] && !prefersReducedMotion,
    shouldAnimate: (callback: () => void) => {
      if (enabledFeatures[featureName] && !prefersReducedMotion) {
        callback()
      }
    }
  }
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  const [fps, setFps] = useState(60)
  const [isSmooth, setIsSmooth] = useState(true)

  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    let animationId: number

    const measureFPS = (currentTime: number) => {
      frameCount++
      
      if (currentTime - lastTime >= 1000) {
        const currentFPS = Math.round((frameCount * 1000) / (currentTime - lastTime))
        setFps(currentFPS)
        setIsSmooth(currentFPS > 45) // Consider smooth if above 45fps
        
        frameCount = 0
        lastTime = currentTime
      }
      
      animationId = requestAnimationFrame(measureFPS)
    }

    animationId = requestAnimationFrame(measureFPS)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return { fps, isSmooth }
}

// Optimized animation class generator
export function getOptimizedAnimationClasses(
  baseClasses: string,
  featureName: keyof AnimationContextType['enabledFeatures'],
  fallbackClasses: string = ''
) {
  const { enabledFeatures } = useAnimationContext()
  
  return enabledFeatures[featureName] ? baseClasses : fallbackClasses
}
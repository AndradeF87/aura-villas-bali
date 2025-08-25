export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  
  // Check for touch capability
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  
  // Check viewport width
  const isMobileWidth = window.innerWidth < 768
  
  // Check user agent for mobile devices
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  const isMobileAgent = mobileRegex.test(navigator.userAgent)
  
  return hasTouch && (isMobileWidth || isMobileAgent)
}

export const shouldReduceMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const getGlassmorphismStyles = (intensity: 'light' | 'medium' | 'heavy' = 'medium') => {
  const isMobile = isMobileDevice()
  const reduceMotion = shouldReduceMotion()
  
  if (isMobile || reduceMotion) {
    // Simplified styles for mobile/reduced motion
    return {
      background: intensity === 'light' 
        ? 'rgba(255, 255, 255, 0.85)' 
        : intensity === 'heavy'
        ? 'rgba(255, 255, 255, 0.95)'
        : 'rgba(255, 255, 255, 0.9)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    }
  }
  
  // Full glassmorphism for desktop
  return {
    background: intensity === 'light'
      ? 'rgba(255, 255, 255, 0.1)'
      : intensity === 'heavy'
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(255, 255, 255, 0.15)',
    backdropFilter: intensity === 'light'
      ? 'blur(10px)'
      : intensity === 'heavy'
      ? 'blur(30px)'
      : 'blur(20px)',
    WebkitBackdropFilter: intensity === 'light'
      ? 'blur(10px)'
      : intensity === 'heavy'
      ? 'blur(30px)'
      : 'blur(20px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  }
}
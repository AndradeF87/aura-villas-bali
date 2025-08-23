// Animation timing constants
export const ANIMATION_DURATIONS = {
  // Quick interactions
  hover: 0.2,
  click: 0.15,
  focus: 0.2,
  
  // UI animations
  fadeIn: 0.3,
  slideIn: 0.4,
  scaleIn: 0.3,
  
  // Page transitions
  pageTransition: 0.6,
  sectionTransition: 0.8,
  
  // Scroll animations
  scrollReveal: 0.8,
  parallax: 1.0,
  
  // Complex animations
  stagger: 0.1,
  typewriter: 0.05,
  counter: 2.0,
  
  // Loading states
  skeleton: 1.5,
  spinner: 1.0,
} as const

// Animation delays
export const ANIMATION_DELAYS = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.4,
  extraLong: 0.8,
} as const

// Stagger timing
export const STAGGER_TIMING = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.2,
  verySlow: 0.3,
} as const

// Scroll trigger positions
export const SCROLL_TRIGGERS = {
  early: 'top 90%',
  normal: 'top 80%',
  late: 'top 70%',
  center: 'center center',
  bottom: 'bottom 80%',
} as const

// Animation distances
export const ANIMATION_DISTANCES = {
  small: 20,
  medium: 50,
  large: 100,
  extraLarge: 200,
} as const

// Performance settings
export const PERFORMANCE_SETTINGS = {
  // Reduce animations on mobile
  mobileScaleFactor: 0.7,
  
  // Battery optimization
  lowBatteryScaleFactor: 0.5,
  
  // Intersection observer thresholds
  observerThresholds: [0, 0.25, 0.5, 0.75, 1],
  
  // Debounce timing for resize events
  resizeDebounce: 250,
  
  // Maximum concurrent animations
  maxConcurrentAnimations: 5,
} as const

// Breakpoints for responsive animations
export const ANIMATION_BREAKPOINTS = {
  mobile: '(max-width: 768px)',
  tablet: '(min-width: 769px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)',
  retina: '(-webkit-min-device-pixel-ratio: 2)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
  highRefresh: '(min-refresh-rate: 90hz)',
} as const
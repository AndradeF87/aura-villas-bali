// GSAP-compatible easing functions
export const EASINGS = {
  // Basic easings
  linear: 'none',
  
  // Power easings
  easeIn: 'power2.in',
  easeOut: 'power2.out',
  easeInOut: 'power2.inOut',
  
  // Specific power curves
  power1: {
    in: 'power1.in',
    out: 'power1.out',
    inOut: 'power1.inOut',
  },
  
  power2: {
    in: 'power2.in',
    out: 'power2.out',
    inOut: 'power2.inOut',
  },
  
  power3: {
    in: 'power3.in',
    out: 'power3.out',
    inOut: 'power3.inOut',
  },
  
  power4: {
    in: 'power4.in',
    out: 'power4.out',
    inOut: 'power4.inOut',
  },
  
  // Bounce easings
  bounce: {
    in: 'bounce.in',
    out: 'bounce.out',
    inOut: 'bounce.inOut',
  },
  
  // Back easings (overshoot)
  back: {
    in: 'back.in(1.7)',
    out: 'back.out(1.7)',
    inOut: 'back.inOut(1.7)',
  },
  
  // Elastic easings
  elastic: {
    in: 'elastic.in(1, 0.3)',
    out: 'elastic.out(1, 0.3)',
    inOut: 'elastic.inOut(1, 0.3)',
  },
  
  // Circ easings
  circ: {
    in: 'circ.in',
    out: 'circ.out',
    inOut: 'circ.inOut',
  },
  
  // Expo easings
  expo: {
    in: 'expo.in',
    out: 'expo.out',
    inOut: 'expo.inOut',
  },
  
  // Sine easings
  sine: {
    in: 'sine.in',
    out: 'sine.out',
    inOut: 'sine.inOut',
  },
} as const

// Custom cubic bezier curves (for CSS animations)
export const CUBIC_BEZIER = {
  // Material Design
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  decelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  accelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0.0, 0.6, 1)',
  
  // iOS
  iosStandard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  iosAccelerate: 'cubic-bezier(0.4, 0.0, 1, 1)',
  iosDecelerate: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  
  // Custom smooth curves
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  smoothIn: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  smoothOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  smoothInOut: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  
  // Bouncy curves
  bounceIn: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  bounceOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  bounceInOut: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const

// Easing recommendations by use case
export const EASING_RECOMMENDATIONS = {
  // UI interactions
  buttonHover: EASINGS.power2.out,
  buttonClick: EASINGS.power2.in,
  modalOpen: EASINGS.power3.out,
  modalClose: EASINGS.power2.in,
  
  // Scroll animations
  fadeIn: EASINGS.power2.out,
  slideIn: EASINGS.power3.out,
  scaleIn: EASINGS.back.out,
  
  // Page transitions
  pageIn: EASINGS.power2.out,
  pageOut: EASINGS.power2.in,
  
  // Loading states
  skeleton: EASINGS.linear,
  spinner: EASINGS.linear,
  progress: EASINGS.power2.out,
  
  // Organic movements
  parallax: EASINGS.linear,
  float: EASINGS.sine.inOut,
  bounce: EASINGS.bounce.out,
  
  // Attention-grabbing
  pulse: EASINGS.sine.inOut,
  shake: EASINGS.power2.out,
  wiggle: EASINGS.elastic.out,
} as const

// Helper function to get random easing variation
export function getRandomEasing(category: keyof typeof EASING_RECOMMENDATIONS): string {
  const easings = Object.values(EASINGS.power2)
  return easings[Math.floor(Math.random() * easings.length)]
}

// Helper function to create custom back easing
export function createBackEasing(overshoot: number = 1.7) {
  return {
    in: `back.in(${overshoot})`,
    out: `back.out(${overshoot})`,
    inOut: `back.inOut(${overshoot})`,
  }
}

// Helper function to create custom elastic easing
export function createElasticEasing(amplitude: number = 1, period: number = 0.3) {
  return {
    in: `elastic.in(${amplitude}, ${period})`,
    out: `elastic.out(${amplitude}, ${period})`,
    inOut: `elastic.inOut(${amplitude}, ${period})`,
  }
}
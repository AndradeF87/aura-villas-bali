// Main animation components
export { AnimationProvider, useAnimation } from './AnimationProvider'
export { ScrollAnimationProvider } from './ScrollAnimationProvider'

// Animation components
export { FadeInSection } from './FadeInSection'
export { StaggeredChildren } from './StaggeredChildren'
export { ParallaxSection } from './ParallaxSection'
export { CounterAnimation } from './CounterAnimation'
export { TypewriterText } from './TypewriterText'
export { LottieAnimation } from './LottieAnimation'

// Re-export animation hooks
export {
  useScrollAnimation,
  useFadeInOnScroll,
  useSlideInOnScroll,
  useScaleInOnScroll,
  useStaggeredChildrenOnScroll,
  useParallaxOnScroll,
} from '../hooks/useScrollAnimation'

export {
  useGSAPAnimation,
  useFadeAnimation,
  useSlideAnimation,
  useScaleAnimation,
  useRotateAnimation,
  useMorphAnimation,
  useTextAnimation,
} from '../hooks/useGSAPAnimation'

export {
  useIntersectionAnimation,
  useFadeInOnIntersect,
  useSlideInOnIntersect,
  useScaleInOnIntersect,
  useStaggeredIntersection,
  useMultiThresholdAnimation,
} from '../hooks/useIntersectionAnimation'
// Animation library exports
export * from './constants'
export * from './easings'
export * from './performance'

// Animation utilities
export { gsap } from 'gsap'
export { ScrollTrigger } from 'gsap/ScrollTrigger'
export { TextPlugin } from 'gsap/TextPlugin'

// Performance optimized animation helpers
import { gsap } from 'gsap'
import { ANIMATION_DURATIONS, ANIMATION_DELAYS, SCROLL_TRIGGERS } from './constants'
import { EASINGS } from './easings'
import { performanceMonitor } from './performance'

// Quick animation presets
export const quickAnimations = {
  fadeIn: (element: Element, options: gsap.TweenVars = {}) => {
    return gsap.fromTo(element,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: ANIMATION_DURATIONS.fadeIn,
        ease: EASINGS.easeOut,
        ...options
      }
    )
  },

  slideUp: (element: Element, distance: number = 50, options: gsap.TweenVars = {}) => {
    return gsap.fromTo(element,
      { y: distance, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: ANIMATION_DURATIONS.slideIn,
        ease: EASINGS.power3.out,
        ...options
      }
    )
  },

  scaleIn: (element: Element, options: gsap.TweenVars = {}) => {
    return gsap.fromTo(element,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: ANIMATION_DURATIONS.scaleIn,
        ease: EASINGS.back.out,
        ...options
      }
    )
  },

  staggerFadeUp: (elements: Element[], options: gsap.TweenVars = {}) => {
    return gsap.fromTo(elements,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: ANIMATION_DURATIONS.scrollReveal,
        ease: EASINGS.power2.out,
        stagger: 0.1,
        ...options
      }
    )
  },

  bounce: (element: Element, options: gsap.TweenVars = {}) => {
    return gsap.fromTo(element,
      { scale: 0 },
      {
        scale: 1,
        duration: ANIMATION_DURATIONS.scaleIn,
        ease: EASINGS.bounce.out,
        ...options
      }
    )
  },

  typewriter: (element: Element, text: string, options: gsap.TweenVars = {}) => {
    return gsap.to(element, {
      text: text,
      duration: text.length * ANIMATION_DURATIONS.typewriter,
      ease: 'none',
      ...options
    })
  },

  counter: (element: Element, from: number, to: number, options: gsap.TweenVars = {}) => {
    const obj = { value: from }
    return gsap.to(obj, {
      value: to,
      duration: ANIMATION_DURATIONS.counter,
      ease: EASINGS.power2.out,
      onUpdate: () => {
        ;(element as HTMLElement).textContent = Math.round(obj.value).toString()
      },
      ...options
    })
  },

  parallax: (element: Element, speed: number = 0.5, options: gsap.TweenVars = {}) => {
    return gsap.to(element, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      ...options
    })
  },

  hover: (element: Element, hoverProps: gsap.TweenVars, restProps: gsap.TweenVars = {}) => {
    const hoverTween = gsap.to(element, {
      ...hoverProps,
      duration: ANIMATION_DURATIONS.hover,
      ease: EASINGS.power2.out,
      paused: true,
    })

    const restTween = gsap.to(element, {
      ...restProps,
      duration: ANIMATION_DURATIONS.hover,
      ease: EASINGS.power2.out,
      paused: true,
    })

    element.addEventListener('mouseenter', () => hoverTween.play())
    element.addEventListener('mouseleave', () => restTween.play())

    return { hoverTween, restTween }
  }
}

// Batch animation helper
export const batchAnimation = {
  sequence: (animations: Array<() => gsap.core.Tween | gsap.core.Timeline>) => {
    const tl = gsap.timeline()
    animations.forEach(animFn => {
      const anim = animFn()
      tl.add(anim)
    })
    return tl
  },

  parallel: (animations: Array<() => gsap.core.Tween | gsap.core.Timeline>) => {
    const tl = gsap.timeline()
    animations.forEach(animFn => {
      const anim = animFn()
      tl.add(anim, 0) // Start all at time 0
    })
    return tl
  },

  staggered: (
    animations: Array<() => gsap.core.Tween | gsap.core.Timeline>,
    stagger: number = 0.1
  ) => {
    const tl = gsap.timeline()
    animations.forEach((animFn, index) => {
      const anim = animFn()
      tl.add(anim, index * stagger)
    })
    return tl
  }
}

// Performance-aware animation helper
export const performantAnimation = {
  create: (animationFn: () => gsap.core.Tween | gsap.core.Timeline) => {
    if (performanceMonitor.shouldReduceAnimations()) {
      // Return a minimal animation or null
      return gsap.set({}, {})
    }
    return animationFn()
  },

  withFallback: (
    primaryAnimation: () => gsap.core.Tween | gsap.core.Timeline,
    fallbackAnimation: () => gsap.core.Tween | gsap.core.Timeline
  ) => {
    if (performanceMonitor.shouldReduceAnimations()) {
      return fallbackAnimation()
    }
    return primaryAnimation()
  }
}

// Animation cleanup utilities
export const animationCleanup = {
  killAll: () => {
    gsap.killTweensOf('*')
  },

  killByTarget: (target: any) => {
    gsap.killTweensOf(target)
  },

  refreshScrollTriggers: () => {
    if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
      (window as any).ScrollTrigger.refresh()
    }
  }
}
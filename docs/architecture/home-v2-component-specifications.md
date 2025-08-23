# Home-v2 Component Specifications

## Component Hierarchy for Animated Homepage

```
app/home-v2/
├── page.tsx                           (Main animated homepage route)
├── layout.tsx                         (Optional: Animation-specific layout)
├── components/
│   ├── animated/
│   │   ├── AnimatedHero.tsx           (Enhanced hero with advanced animations)
│   │   ├── AnimatedVillaCards.tsx     (Villa showcase with interactions)
│   │   ├── AnimatedExperiences.tsx    (Experience section with scroll reveals)
│   │   ├── AnimatedTrustSignals.tsx   (Animated social proof)
│   │   ├── AnimatedAreaExplorer.tsx   (Interactive area exploration)
│   │   └── AnimatedWhyBookAura.tsx    (Benefits with progressive disclosure)
│   ├── transitions/
│   │   ├── PageTransition.tsx         (Route transition wrapper)
│   │   ├── SectionTransition.tsx      (Section-to-section transitions)
│   │   └── LoadingTransition.tsx      (Loading states and skeletons)
│   ├── interactive/
│   │   ├── InteractiveSearchBar.tsx   (Enhanced search with animations)
│   │   ├── HoverableVillaCard.tsx     (Rich hover interactions)
│   │   ├── AnimatedCounter.tsx        (Number counting animations)
│   │   └── ParallaxBackground.tsx     (Parallax scrolling effects)
│   └── providers/
│       ├── AnimationProvider.tsx      (Global animation state)
│       ├── ScrollProvider.tsx         (Scroll position management)
│       └── MotionProvider.tsx         (Framer Motion configuration)
├── hooks/
│   ├── useScrollAnimation.ts          (Scroll-based animation control)
│   ├── usePageTransition.ts           (Page transition management)
│   ├── useReducedMotion.ts            (Accessibility preference detection)
│   ├── useIntersectionAnimation.ts    (Intersection Observer animations)
│   └── useParallaxScroll.ts           (Parallax scrolling logic)
├── animations/
│   ├── variants/
│   │   ├── heroVariants.ts            (Hero section animation variants)
│   │   ├── cardVariants.ts            (Villa card animation variants)
│   │   ├── textVariants.ts            (Typography animations)
│   │   └── layoutVariants.ts          (Layout transition variants)
│   ├── transitions/
│   │   ├── pageTransitions.ts         (Page-level transitions)
│   │   ├── sectionTransitions.ts      (Section transitions)
│   │   └── microTransitions.ts        (Button hovers, form interactions)
│   └── utils/
│       ├── animationConfig.ts         (Global animation configuration)
│       ├── easingFunctions.ts         (Custom easing curves)
│       └── performanceUtils.ts        (Animation performance helpers)
└── types/
    ├── animation.types.ts             (Animation-specific TypeScript types)
    └── motion.types.ts                (Motion component types)
```

## Detailed Component Specifications

### 1. AnimatedHero.tsx

**Purpose**: Enhanced hero section with sophisticated entrance animations and interactive elements.

**Key Features**:
- Parallax background scrolling
- Typewriter effect for main headline
- Staggered animation for trust indicators
- Interactive search bar with micro-animations
- 3D transform effects on user interaction

**Props Interface**:
```typescript
interface AnimatedHeroProps {
  backgroundVideo?: string
  backgroundImage: string
  headline: string
  subheadline: string
  trustIndicators: TrustIndicator[]
  enableParallax?: boolean
  animationDuration?: number
  staggerDelay?: number
}
```

**Animation Features**:
- Entrance: Fade-in-up with 0.8s duration
- Background: Parallax scroll at 0.5x speed  
- Text: Typewriter effect with cursor
- Search: Scale-in with bounce effect
- Trust indicators: Staggered slide-in from bottom

### 2. AnimatedVillaCards.tsx

**Purpose**: Villa showcase with rich hover interactions and entrance animations.

**Key Features**:
- Card flip animations on hover
- Image parallax within cards
- Animated price counters
- Availability status pulse effects
- Smooth layout transitions

**Props Interface**:
```typescript
interface AnimatedVillaCardsProps {
  villas: Villa[]
  layout: 'grid' | 'carousel' | 'masonry'
  animationType: 'slide' | 'fade' | 'scale' | 'flip'
  enableHoverEffects?: boolean
  scrollReveal?: boolean
}
```

**Animation Variants**:
```typescript
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  hover: {
    scale: 1.05,
    y: -10,
    boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
    transition: { duration: 0.3 }
  }
}
```

### 3. InteractiveSearchBar.tsx

**Purpose**: Enhanced search component with smooth animations and micro-interactions.

**Key Features**:
- Field focus animations
- Dropdown slide animations
- Date picker transitions
- Search button morphing
- Loading state animations

**Props Interface**:
```typescript
interface InteractiveSearchBarProps {
  onSearch: (params: SearchParams) => void
  enableGlassEffect?: boolean
  animateOnFocus?: boolean
  showSuggestions?: boolean
  loadingState?: boolean
}
```

### 4. ScrollProvider.tsx

**Purpose**: Global scroll state management for scroll-based animations.

**Context Interface**:
```typescript
interface ScrollContextType {
  scrollY: number
  scrollDirection: 'up' | 'down'
  scrollProgress: number
  isScrolling: boolean
  visibleSections: string[]
  registerSection: (id: string, ref: RefObject<HTMLElement>) => void
  unregisterSection: (id: string) => void
}
```

## Animation Integration Patterns

### 1. Scroll-Triggered Animations

```typescript
const useScrollReveal = (threshold = 0.1, rootMargin = '0px') => {
  const controls = useAnimation()
  const { ref, inView } = useInView({ 
    threshold, 
    rootMargin,
    triggerOnce: true 
  })
  
  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])
  
  return { ref, controls, inView }
}
```

### 2. Page Transition Pattern

```typescript
const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  )
}
```

### 3. Stagger Animation Pattern

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}
```

## Performance Considerations

### 1. Bundle Optimization

```typescript
// Dynamic imports for animation libraries
const MotionDiv = dynamic(() => 
  import('framer-motion').then(mod => mod.motion.div), 
  { ssr: false }
)

// Conditional loading
const AnimatedComponent = prefersReducedMotion 
  ? StaticComponent 
  : MotionComponent
```

### 2. Animation Performance

```typescript
// Optimize for 60fps
const optimizedVariants = {
  animate: {
    // Use transform and opacity only for hardware acceleration
    transform: "translateY(0px) scale(1)",
    opacity: 1,
    // Avoid animating layout-triggering properties
    transition: { duration: 0.3 }
  }
}
```

### 3. Memory Management

```typescript
useEffect(() => {
  // Cleanup animation listeners
  return () => {
    controls.stop()
    // Cancel any pending animations
  }
}, [controls])
```

## Accessibility Implementation

### 1. Reduced Motion Support

```typescript
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  return prefersReducedMotion
}
```

### 2. Focus Management

```typescript
const AnimationWrapper: React.FC<AnimationWrapperProps> = ({ 
  children, 
  reduceMotion 
}) => {
  const prefersReducedMotion = useReducedMotion()
  
  const animationProps = prefersReducedMotion || reduceMotion
    ? { initial: false, animate: false }
    : { initial: "hidden", animate: "visible" }
    
  return (
    <motion.div {...animationProps}>
      {children}
    </motion.div>
  )
}
```

## Testing Strategy

### 1. Animation Performance Testing

```typescript
// Performance monitoring for animations
const useAnimationPerformance = () => {
  const [fps, setFps] = useState(60)
  const [dropped, setDropped] = useState(0)
  
  useEffect(() => {
    let frame: number
    let lastTime = performance.now()
    let frameCount = 0
    
    const measureFPS = (currentTime: number) => {
      frameCount++
      if (currentTime - lastTime >= 1000) {
        setFps(frameCount)
        frameCount = 0
        lastTime = currentTime
      }
      frame = requestAnimationFrame(measureFPS)
    }
    
    frame = requestAnimationFrame(measureFPS)
    return () => cancelAnimationFrame(frame)
  }, [])
  
  return { fps, dropped }
}
```

### 2. Visual Regression Testing

```typescript
// Jest + Playwright for animation testing
describe('Homepage Animations', () => {
  it('should animate hero section on load', async () => {
    await page.goto('/home-v2')
    
    // Wait for animations to complete
    await page.waitForTimeout(2000)
    
    // Take screenshot for visual comparison
    await expect(page).toHaveScreenshot('hero-animated.png')
  })
  
  it('should respect reduced motion preference', async () => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/home-v2')
    
    // Verify no animations are running
    const animatedElements = await page.$$('[data-animation="active"]')
    expect(animatedElements).toHaveLength(0)
  })
})
```

This component architecture provides a scalable foundation for implementing rich animations while maintaining performance, accessibility, and code organization standards.
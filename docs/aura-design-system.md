# AURA Villas Bali Design System

## Overview
This document outlines the comprehensive design system for AURA Villas Bali, extracted from the current implementation. The design system reflects a sophisticated, luxury hospitality brand with Balinese-inspired elements and modern web aesthetics.

## 1. Color Palette

### Primary Brand Colors

#### Terracotta (Primary)
- **Default:** `#C96F4A` - Main brand color, used for CTAs and key elements
- **Dark:** `#B05A38` - Hover states and darker accents
- **Light:** `#DD8B68` - Lighter variations for backgrounds

#### Deep Green (Secondary) 
- **Default:** `#2F4A3C` - Primary text color, sophisticated dark accent
- **Dark:** `#243829` - Darker variant for emphasis
- **Light:** `#3A5C4A` - Lighter variant for subtle accents

#### Sand/Beige (Neutral)
- **Default:** `#E8DCC8` - Warm neutral background
- **Dark:** `#D4C4A8` - Darker neutral variant
- **Light:** `#F2E9DC` - Light neutral backgrounds

#### Ivory/Cream (Light)
- **Default:** `#F8F4F0` - Primary light background
- **Dark:** `#EDE6DD` - Subtle contrast backgrounds
- **Light:** `#FDFBF9` - Ultra-light backgrounds

#### Antique Gold (Accent)
- **Default:** `#C1A265` - Luxury accent color
- **Dark:** `#A88A50` - Darker gold variant
- **Light:** `#D4B67A` - Lighter gold accent

### Extended Color Usage

#### Text Colors
- **Primary Text:** `#2F4A3C` (deep-green)
- **Secondary Text:** `#6B7280` (gray-600)
- **Muted Text:** `#9CA3AF` (gray-400)
- **White Text:** `#FFFFFF` (on dark backgrounds)

#### Background Colors
- **Primary Background:** `#FFFFFF` (white)
- **Secondary Background:** `#F8F4F0` (ivory)
- **Accent Background:** `#E8DCC8` (sand)
- **Warm Background:** `#F8F4F0` (warm-ivory)

#### Interactive Colors
- **Hover Terracotta:** `#B85A35`
- **Focus Ring:** `rgba(201, 111, 74, 0.5)`
- **Success:** `#22C55E` (green-500)
- **Warning:** `#F59E0B` (amber-500)
- **Error:** `#EF4444` (red-500)

## 2. Typography

### Font Families

#### Serif (Primary)
- **Family:** `'Playfair Display', Georgia, serif`
- **Usage:** Headlines, hero text, luxury elements
- **Character:** Elegant, sophisticated, readable

#### Sans-serif (Secondary)  
- **Family:** `'Inter', system-ui, sans-serif`
- **Usage:** Body text, UI elements, navigation
- **Character:** Clean, modern, highly legible

### Typography Scale

#### Headings
- **H1 Hero:** `text-6xl lg:text-7xl` (96px/112px) - font-serif, bold
- **H1 Page:** `text-4xl md:text-5xl` (56px/72px) - font-serif, bold
- **H2 Section:** `text-3xl md:text-4xl` (48px/56px) - font-serif, bold
- **H3 Component:** `text-2xl` (32px) - font-serif, bold
- **H4 Card:** `text-xl` (24px) - font-serif, semibold

#### Body Text
- **Large:** `text-lg md:text-xl` (20px/24px) - font-sans
- **Base:** `text-base` (16px) - font-sans
- **Small:** `text-sm` (14px) - font-sans
- **Tiny:** `text-xs` (12px) - font-sans

#### Font Weights
- **Bold:** `font-bold` (700)
- **Semibold:** `font-semibold` (600)
- **Medium:** `font-medium` (500)
- **Regular:** `font-normal` (400)

#### Line Heights
- **Tight:** `leading-tight` (1.25)
- **Normal:** `leading-normal` (1.5)
- **Relaxed:** `leading-relaxed` (1.625)
- **Loose:** `leading-loose` (2)

#### Letter Spacing
- **Tighter:** `tracking-tighter` (-0.05em)
- **Tight:** `tracking-tight` (-0.025em)
- **Normal:** `tracking-normal` (0em)
- **Wide:** `tracking-wide` (0.025em)
- **Wider:** `tracking-wider` (0.05em)
- **Widest:** `tracking-widest` (0.1em)

## 3. Spacing System

### Padding Patterns
- **Micro:** `p-1` (4px)
- **Small:** `p-2` (8px), `p-3` (12px)
- **Medium:** `p-4` (16px), `p-6` (24px)
- **Large:** `p-8` (32px), `p-12` (48px)
- **XL:** `p-16` (64px), `p-20` (80px)

### Margin Patterns
- **Small:** `m-1` to `m-4` (4px-16px)
- **Medium:** `m-6` to `m-8` (24px-32px)  
- **Large:** `m-12` to `m-16` (48px-64px)
- **Section:** `my-20` (80px vertical)

### Gap Patterns
- **Tight:** `gap-1` to `gap-3` (4px-12px)
- **Medium:** `gap-4` to `gap-6` (16px-24px)
- **Wide:** `gap-8` to `gap-12` (32px-48px)

### Container Widths
- **Full:** `w-full` (100%)
- **Container:** `container mx-auto` (responsive max-width)
- **Prose:** `max-w-3xl mx-auto` (768px)
- **Content:** `max-w-6xl mx-auto` (1152px)

### Responsive Breakpoints
- **Mobile:** `< 768px`
- **Tablet:** `md: >= 768px`
- **Desktop:** `lg: >= 1024px`
- **Large:** `xl: >= 1280px`

## 4. Visual Elements

### Border Radius
- **Small:** `rounded` (4px)
- **Medium:** `rounded-lg` (8px)
- **Large:** `rounded-xl` (12px)
- **XL:** `rounded-2xl` (16px)
- **Full:** `rounded-full` (999px)

### Shadow Styles
- **Subtle:** `shadow` - Basic card shadow
- **Medium:** `shadow-lg` - Elevated elements
- **Large:** `shadow-xl` - Modal/overlay shadows
- **Colored:** `shadow-lg` with terracotta tint for CTAs

### Glassmorphic Effects
```css
.glassmorphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### Hover States
- **Buttons:** `hover:bg-terracotta-dark` with scale transform
- **Cards:** `hover:shadow-xl` with subtle lift
- **Links:** Color transition to terracotta
- **Images:** `hover:scale-105` zoom effect

## 5. Component Patterns

### Button Styles

#### Primary Button
```tsx
className="bg-terracotta hover:bg-terracotta-dark text-white font-semibold py-4 px-8 rounded-full transition-colors duration-200"
```

#### Secondary Button  
```tsx
className="bg-white border-2 border-deep-green text-deep-green hover:bg-deep-green hover:text-white font-semibold py-4 px-8 rounded-full transition-all duration-300"
```

#### Tertiary Button
```tsx  
className="text-terracotta hover:text-terracotta-dark font-medium underline decoration-2 underline-offset-4"
```

### Link Styles

#### Navigation Links
```tsx
className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300 relative group"
// With animated underline
```

#### In-text Links
```tsx
className="text-terracotta hover:text-terracotta-dark transition-colors duration-200"
```

### Card Patterns

#### Feature Card
```tsx
className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
```

#### Service Tier Card
```tsx
className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
```

### Form Elements

#### Input Fields
```tsx
className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
```

#### Select Fields
```tsx
className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta"
```

### Icon Usage
- **Size Small:** `w-5 h-5` (20px)
- **Size Medium:** `w-6 h-6` (24px) 
- **Size Large:** `w-8 h-8` (32px)
- **Size XL:** `w-12 h-12` (48px)
- **Colors:** Match text color or use brand colors

## 6. Animation Patterns

### Keyframe Animations
- **Fade In Up:** `fadeInUp` - Element entrance
- **Floating:** `floating` - Subtle movement
- **Glow Pulse:** `glow-pulse` - Attention-drawing
- **Slow Zoom:** `slow-zoom` - Background scaling

### Transition Patterns
- **Fast:** `transition-colors duration-200`
- **Standard:** `transition-all duration-300`
- **Slow:** `transition-all duration-500`

### Hover Effects
- **Scale:** `hover:scale-105` - Cards and images  
- **Lift:** `hover:-translate-y-1` - Buttons
- **Glow:** Custom shadow animations for CTAs

### Loading States
- **Shimmer:** Custom shimmer animation
- **Pulse:** `animate-pulse` for placeholders
- **Spinner:** Custom loading spinners

## 7. Layout Patterns

### Grid Systems
- **Cards:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`
- **Features:** `grid grid-cols-1 lg:grid-cols-2 gap-8`
- **Stats:** `grid grid-cols-2 md:grid-cols-4 gap-6`

### Flexbox Patterns
- **Center:** `flex items-center justify-center`
- **Between:** `flex items-center justify-between`
- **Column:** `flex flex-col items-center`

### Section Layouts
- **Standard:** `py-20` (80px vertical padding)
- **Hero:** `min-h-screen` with full viewport
- **Compact:** `py-12` (48px vertical padding)

## 8. Responsive Design

### Mobile-First Approach
- Base styles for mobile (< 768px)
- `md:` prefix for tablet (>= 768px)
- `lg:` prefix for desktop (>= 1024px)
- `xl:` prefix for large desktop (>= 1280px)

### Common Responsive Patterns
```tsx
// Typography scaling
"text-4xl md:text-5xl lg:text-6xl"

// Padding scaling  
"px-4 md:px-8 lg:px-16"

// Grid responsiveness
"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

## 9. Performance Considerations

### Optimization Classes
```css
.gpu-accelerated {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: none !important;
    transition: none !important;
  }
}
```

## 10. Brand Voice & Personality

### Visual Characteristics
- **Sophisticated:** Premium materials, refined typography
- **Warm:** Earthy color palette, inviting imagery  
- **Modern:** Clean layouts, contemporary UI patterns
- **Luxurious:** Generous spacing, high-quality imagery
- **Tropical:** Balinese-inspired elements, natural textures

### Interactive Personality
- **Smooth:** Fluid animations and transitions
- **Responsive:** Quick hover states and feedback
- **Accessible:** High contrast ratios and clear focus states
- **Intuitive:** Familiar patterns with unique touches

## Implementation Notes

1. **Consistency:** Always use design tokens from the Tailwind config
2. **Accessibility:** Maintain WCAG 2.1 AA contrast ratios
3. **Performance:** Use GPU-accelerated animations sparingly  
4. **Mobile:** Test all components on mobile devices
5. **Brand Alignment:** Every design decision should reinforce the luxury hospitality brand

This design system serves as the foundation for all AURA Villas Bali digital experiences, ensuring consistency, quality, and brand alignment across all touchpoints.
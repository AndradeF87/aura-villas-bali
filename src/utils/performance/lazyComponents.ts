import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Loading component for lazy loaded components
const LoadingFallback = () => (
  <div className="animate-pulse bg-sand-light rounded-lg h-64 w-full" />
);

// Lazy load heavy components with proper loading states
export const LazyHeroAnimation = dynamic(
  () => import('@/components/animations/HeroAnimation'),
  {
    loading: LoadingFallback,
    ssr: false,
  }
);

export const LazyTrustSignals = dynamic(
  () => import('@/components/homepage/TrustSignals'),
  {
    loading: LoadingFallback,
    ssr: true,
  }
);

export const LazySuccessStories = dynamic(
  () => import('@/components/homepage/SuccessStories'),
  {
    loading: LoadingFallback,
    ssr: true,
  }
);

export const LazyTestimonials = dynamic(
  () => import('@/components/homepage/Testimonials'),
  {
    loading: LoadingFallback,
    ssr: true,
  }
);

export const LazyEarningsCalculator = dynamic(
  () => import('@/components/property-management/EarningsCalculator'),
  {
    loading: LoadingFallback,
    ssr: false,
  }
);

// Utility function to create lazy loaded components
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options: {
    loading?: ComponentType;
    ssr?: boolean;
  } = {}
) {
  return dynamic(importFunc, {
    loading: options.loading || LoadingFallback,
    ssr: options.ssr ?? true,
  });
}

// Preload component on hover/focus
export function preloadComponent(
  importFunc: () => Promise<any>
) {
  if (typeof window !== 'undefined') {
    // Use requestIdleCallback if available
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        importFunc();
      });
    } else {
      // Fallback to setTimeout
      setTimeout(() => {
        importFunc();
      }, 1);
    }
  }
}
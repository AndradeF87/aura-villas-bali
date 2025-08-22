// Performance monitoring and optimization utilities

interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

interface WebVitalsThresholds {
  fcp: { good: number; poor: number };
  lcp: { good: number; poor: number };
  fid: { good: number; poor: number };
  cls: { good: number; poor: number };
  ttfb: { good: number; poor: number };
}

// Core Web Vitals thresholds (in milliseconds, except CLS)
export const WEB_VITALS_THRESHOLDS: WebVitalsThresholds = {
  fcp: { good: 1800, poor: 3000 },
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 }, // CLS is a ratio
  ttfb: { good: 800, poor: 1800 }
};

// Performance monitoring class
export class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};
  private observers: PerformanceObserver[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeObservers();
    }
  }

  private initializeObservers() {
    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
        if (this.metrics.lcp !== undefined) {
          this.reportMetric('lcp', this.metrics.lcp);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(lcpObserver);

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          if (this.metrics.fid !== undefined) {
            this.reportMetric('fid', this.metrics.fid);
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      this.observers.push(fidObserver);

      // Cumulative Layout Shift
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        this.metrics.cls = clsValue;
        if (this.metrics.cls !== undefined) {
          this.reportMetric('cls', this.metrics.cls);
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(clsObserver);
    }

    // First Contentful Paint
    if ('performance' in window && 'getEntriesByType' in performance) {
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        this.metrics.fcp = fcpEntry.startTime;
        if (this.metrics.fcp !== undefined) {
          this.reportMetric('fcp', this.metrics.fcp);
        }
      }
    }

    // Time to First Byte
    if ('performance' in window && 'timing' in performance) {
      const timing = performance.timing as any;
      this.metrics.ttfb = timing.responseStart - timing.navigationStart;
      if (this.metrics.ttfb !== undefined) {
        this.reportMetric('ttfb', this.metrics.ttfb);
      }
    }
  }

  private reportMetric(name: string, value: number) {
    // Send to analytics service (Google Analytics, custom endpoint, etc.)
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', name, {
        event_category: 'Web Vitals',
        event_label: name,
        value: Math.round(name === 'cls' ? value * 1000 : value),
        non_interaction: true
      });
    }

    // You can also send to your own analytics endpoint
    this.sendToAnalytics(name, value);
  }

  private async sendToAnalytics(metric: string, value: number) {
    try {
      await fetch('/api/analytics/performance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          metric,
          value,
          url: window.location.pathname,
          userAgent: navigator.userAgent,
          timestamp: Date.now()
        })
      });
    } catch (error) {
      console.warn('Failed to send performance metric:', error);
    }
  }

  public getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  public cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Resource loading optimization
export class ResourceOptimizer {
  // Preload critical resources
  public static preloadCriticalResources() {
    const criticalResources = [
      { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
      { href: '/css/critical.css', as: 'style' },
      { href: '/js/critical.js', as: 'script' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) link.type = resource.type;
      if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
      document.head.appendChild(link);
    });
  }

  // Lazy load non-critical resources
  public static lazyLoadResource(src: string, type: 'script' | 'link' = 'script') {
    return new Promise((resolve, reject) => {
      let element: HTMLScriptElement | HTMLLinkElement;

      if (type === 'script') {
        element = document.createElement('script');
        (element as HTMLScriptElement).src = src;
        (element as HTMLScriptElement).async = true;
      } else {
        element = document.createElement('link');
        (element as HTMLLinkElement).href = src;
        (element as HTMLLinkElement).rel = 'stylesheet';
      }

      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error(`Failed to load ${src}`));

      document.head.appendChild(element);
    });
  }

  // Prefetch resources for likely next pages
  public static prefetchResources(urls: string[]) {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  }
}

// Image optimization utilities
export class ImageOptimizer {
  // Generate responsive image sources
  public static generateResponsiveSources(baseUrl: string, breakpoints: number[] = [640, 768, 1024, 1280, 1920]) {
    return breakpoints.map(width => ({
      media: `(max-width: ${width}px)`,
      srcSet: this.generateSrcSet(baseUrl, width)
    }));
  }

  private static generateSrcSet(baseUrl: string, maxWidth: number) {
    const densities = [1, 1.5, 2];
    return densities
      .map(density => {
        const width = Math.round(maxWidth * density);
        return `${this.getOptimizedUrl(baseUrl, width)} ${density}x`;
      })
      .join(', ');
  }

  private static getOptimizedUrl(baseUrl: string, width: number, quality: number = 85) {
    // Customize based on your CDN/image service
    if (baseUrl.includes('cloudinary.com')) {
      return baseUrl.replace('/upload/', `/upload/w_${width},q_${quality},f_auto/`);
    }
    
    // Default Next.js image optimization
    return `/_next/image?url=${encodeURIComponent(baseUrl)}&w=${width}&q=${quality}`;
  }

  // Lazy loading intersection observer
  public static createLazyLoadObserver(callback: (entries: IntersectionObserverEntry[]) => void) {
    const options = {
      root: null,
      rootMargin: '50px', // Start loading 50px before element enters viewport
      threshold: 0.1
    };

    return new IntersectionObserver(callback, options);
  }
}

// Critical CSS extraction and inlining
export class CSSOptimizer {
  // Extract critical CSS for above-the-fold content
  public static async extractCriticalCSS(url: string): Promise<string> {
    // This would typically be done at build time using tools like Critical or Critters
    // Here's a simplified version for demonstration
    
    const criticalSelectors = [
      'header',
      '.hero',
      '.nav',
      '.above-fold',
      'h1',
      'h2',
      '.btn-primary'
    ];

    // In a real implementation, you'd parse the full CSS and extract only rules
    // that match elements visible above the fold
    return criticalSelectors
      .map(selector => `${selector} { /* critical styles */ }`)
      .join('\n');
  }

  // Inline critical CSS and load non-critical CSS asynchronously
  public static inlineCriticalCSS(criticalCSS: string, nonCriticalCSS: string) {
    // Inline critical CSS
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.appendChild(style);

    // Asynchronously load non-critical CSS
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = nonCriticalCSS;
    link.as = 'style';
    link.onload = function() {
      const linkEl = link;
      linkEl.onload = null;
      linkEl.rel = 'stylesheet';
    };
    document.head.appendChild(link);
  }
}

// Service Worker for caching optimization
export class CacheOptimizer {
  public static async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  // Cache strategy for different resource types
  public static getCacheStrategy(resourceType: string) {
    const strategies = {
      'document': 'networkFirst', // HTML pages
      'script': 'cacheFirst',    // JS files
      'style': 'cacheFirst',     // CSS files  
      'image': 'cacheFirst',     // Images
      'font': 'cacheFirst',      // Web fonts
      'api': 'networkFirst'      // API calls
    };

    return strategies[resourceType as keyof typeof strategies] || 'networkFirst';
  }
}

// Bundle analysis and optimization
export class BundleOptimizer {
  // Analyze bundle size and suggest optimizations
  public static analyzeBundleSize() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      const bundles = resources
        .filter(resource => resource.name.includes('/_next/static/'))
        .map(resource => ({
          name: resource.name,
          size: resource.transferSize,
          loadTime: resource.responseEnd - resource.responseStart
        }));

      console.table(bundles);
      return bundles;
    }
    return [];
  }

  // Code splitting recommendations
  public static getCodeSplittingRecommendations() {
    return [
      'Split vendor libraries into separate chunks',
      'Lazy load route components',
      'Split large utility libraries',
      'Use dynamic imports for heavy components',
      'Implement progressive loading for features'
    ];
  }
}

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window !== 'undefined') {
    const monitor = new PerformanceMonitor();
    ResourceOptimizer.preloadCriticalResources();
    CacheOptimizer.registerServiceWorker();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      monitor.cleanup();
    });

    return monitor;
  }
  return null;
};
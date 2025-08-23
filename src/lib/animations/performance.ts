import { gsap } from 'gsap'

// Performance monitoring and optimization utilities
export class AnimationPerformanceMonitor {
  private static instance: AnimationPerformanceMonitor
  private metrics: {
    totalAnimations: number
    activeAnimations: number
    droppedFrames: number
    averageFPS: number
    lastFrameTime: number
    performanceScore: number
  } = {
    totalAnimations: 0,
    activeAnimations: 0,
    droppedFrames: 0,
    averageFPS: 60,
    lastFrameTime: 0,
    performanceScore: 100,
  }

  private observer?: PerformanceObserver
  private rafId?: number

  private constructor() {
    this.initializeMonitoring()
  }

  public static getInstance(): AnimationPerformanceMonitor {
    if (!AnimationPerformanceMonitor.instance) {
      AnimationPerformanceMonitor.instance = new AnimationPerformanceMonitor()
    }
    return AnimationPerformanceMonitor.instance
  }

  private initializeMonitoring() {
    // Monitor animation performance
    if (typeof window !== 'undefined' && window.PerformanceObserver) {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'measure' && entry.name.includes('animation')) {
            this.updateMetrics(entry)
          }
        }
      })

      try {
        this.observer.observe({ entryTypes: ['measure', 'paint'] })
      } catch (error) {
        console.warn('Performance monitoring not supported:', error)
      }
    }

    // Start FPS monitoring
    this.startFPSMonitoring()
  }

  private startFPSMonitoring() {
    const measureFPS = (currentTime: number) => {
      if (this.metrics.lastFrameTime) {
        const delta = currentTime - this.metrics.lastFrameTime
        const fps = 1000 / delta

        // Update average FPS (using exponential moving average)
        this.metrics.averageFPS = this.metrics.averageFPS * 0.9 + fps * 0.1

        // Detect dropped frames (assuming 60fps target)
        if (fps < 55) {
          this.metrics.droppedFrames++
        }

        // Update performance score
        this.updatePerformanceScore()
      }

      this.metrics.lastFrameTime = currentTime
      this.rafId = requestAnimationFrame(measureFPS)
    }

    this.rafId = requestAnimationFrame(measureFPS)
  }

  private updateMetrics(entry: PerformanceEntry) {
    // Update animation-specific metrics
    if (entry.name.includes('start')) {
      this.metrics.activeAnimations++
      this.metrics.totalAnimations++
    } else if (entry.name.includes('end')) {
      this.metrics.activeAnimations = Math.max(0, this.metrics.activeAnimations - 1)
    }
  }

  private updatePerformanceScore() {
    // Calculate performance score based on FPS and dropped frames
    const fpsScore = Math.min(100, (this.metrics.averageFPS / 60) * 100)
    const droppedFramesPenalty = Math.min(50, this.metrics.droppedFrames * 0.5)
    const concurrencyPenalty = Math.min(20, Math.max(0, this.metrics.activeAnimations - 5) * 2)

    this.metrics.performanceScore = Math.max(0, fpsScore - droppedFramesPenalty - concurrencyPenalty)
  }

  public getMetrics() {
    return { ...this.metrics }
  }

  public shouldReduceAnimations(): boolean {
    return this.metrics.performanceScore < 70 || this.metrics.averageFPS < 45
  }

  public getOptimizedDuration(baseDuration: number): number {
    if (this.shouldReduceAnimations()) {
      return baseDuration * 0.7 // Reduce animation duration by 30%
    }
    return baseDuration
  }

  public getOptimizedStagger(baseStagger: number): number {
    if (this.shouldReduceAnimations()) {
      return baseStagger * 1.5 // Increase stagger to reduce concurrent animations
    }
    return baseStagger
  }

  public cleanup() {
    if (this.observer) {
      this.observer.disconnect()
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
    }
  }
}

// Device and network performance detection
export class DeviceCapabilities {
  private static cache: Map<string, any> = new Map()

  public static getDeviceInfo() {
    if (this.cache.has('deviceInfo')) {
      return this.cache.get('deviceInfo')
    }

    const deviceInfo = {
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ),
      isTouch: 'ontouchstart' in window,
      devicePixelRatio: window.devicePixelRatio || 1,
      hardwareConcurrency: navigator.hardwareConcurrency || 2,
      memory: (navigator as any).deviceMemory || 4,
      connection: this.getConnectionInfo(),
      batteryLevel: null as number | null,
      isLowPowerMode: false,
    }

    // Get battery info if available
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        deviceInfo.batteryLevel = battery.level
        deviceInfo.isLowPowerMode = battery.charging === false && battery.level < 0.2
      })
    }

    this.cache.set('deviceInfo', deviceInfo)
    return deviceInfo
  }

  private static getConnectionInfo() {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

    if (!connection) {
      return { effectiveType: '4g', downlink: 10 }
    }

    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    }
  }

  public static shouldReduceAnimations(): boolean {
    const device = this.getDeviceInfo()
    
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true
    }

    // Check for low-end device indicators
    if (device.memory < 2 || device.hardwareConcurrency < 2) {
      return true
    }

    // Check for slow connection
    if (device.connection.effectiveType === '2g' || device.connection.effectiveType === 'slow-2g') {
      return true
    }

    // Check for low battery
    if (device.isLowPowerMode) {
      return true
    }

    return false
  }

  public static getOptimizedSettings() {
    const device = this.getDeviceInfo()
    const shouldReduce = this.shouldReduceAnimations()

    return {
      enableParallax: !device.isMobile && !shouldReduce,
      enableComplexAnimations: device.memory >= 4 && !shouldReduce,
      maxConcurrentAnimations: device.isMobile ? 3 : shouldReduce ? 5 : 10,
      animationQuality: shouldReduce ? 'low' : device.isMobile ? 'medium' : 'high',
      enableGPUAcceleration: device.devicePixelRatio <= 2 || device.memory >= 4,
      preferCSS: device.isMobile && !shouldReduce,
    }
  }
}

// GPU acceleration helpers
export const optimizeForGPU = (element: Element) => {
  const el = element as HTMLElement
  el.style.willChange = 'transform, opacity'
  el.style.backfaceVisibility = 'hidden'
  el.style.perspective = '1000px'
}

export const cleanupGPUOptimization = (element: Element) => {
  const el = element as HTMLElement
  el.style.willChange = 'auto'
  el.style.backfaceVisibility = ''
  el.style.perspective = ''
}

// Memory management for animations
export class AnimationMemoryManager {
  private static activeAnimations = new Set<gsap.core.Timeline>()
  private static animationPool: gsap.core.Timeline[] = []

  public static registerAnimation(timeline: gsap.core.Timeline) {
    this.activeAnimations.add(timeline)
    
    timeline.eventCallback('onComplete', () => {
      this.activeAnimations.delete(timeline)
      this.recycleTimeline(timeline)
    })
  }

  private static recycleTimeline(timeline: gsap.core.Timeline) {
    if (this.animationPool.length < 10) {
      timeline.clear()
      this.animationPool.push(timeline)
    } else {
      timeline.kill()
    }
  }

  public static getTimeline(): gsap.core.Timeline {
    return this.animationPool.pop() || gsap.timeline()
  }

  public static cleanup() {
    // Kill all active animations
    this.activeAnimations.forEach(timeline => timeline.kill())
    this.activeAnimations.clear()
    
    // Clear the pool
    this.animationPool.forEach(timeline => timeline.kill())
    this.animationPool.length = 0
  }
}

// Export singleton instance
export const performanceMonitor = AnimationPerformanceMonitor.getInstance()
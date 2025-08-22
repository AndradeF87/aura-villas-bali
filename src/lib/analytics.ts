declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID!, {
      page_path: url,
    })
  }
}

export const event = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Villa-specific events
export const trackVillaView = (villaId: string, villaName: string) => {
  event('villa_view', 'engagement', villaName)
}

export const trackSearchQuery = (query: string, filters: any) => {
  event('villa_search', 'engagement', query)
}

export const trackBookingInquiry = (villaId: string, villaName: string) => {
  event('booking_inquiry', 'conversion', villaName)
}

export const trackWhatsAppClick = (villaId?: string) => {
  event('whatsapp_click', 'engagement', villaId || 'general')
}

// Performance tracking
export const trackPageLoad = (page: string, loadTime: number) => {
  event('page_load_time', 'performance', page, loadTime)
}

export const trackSearchPerformance = (query: string, resultCount: number, responseTime: number) => {
  event('search_performance', 'performance', query, responseTime)
}
'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from './Navigation'
import type { Locale } from '@/lib/i18n/config'

interface ConditionalNavigationProps {
  locale?: Locale
  dictionary?: any
}

export function ConditionalNavigation({ locale, dictionary }: ConditionalNavigationProps) {
  const pathname = usePathname()
  
  // Don't show navigation on standalone pages
  if (pathname?.includes('/home-v3')) {
    return null
  }
  
  return <Navigation locale={locale} dictionary={dictionary} />
}
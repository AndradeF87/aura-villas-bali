'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from './Navigation'

export function ConditionalNavigation() {
  const pathname = usePathname()
  
  // Don't show navigation on standalone pages
  if (pathname?.startsWith('/home-v3')) {
    return null
  }
  
  return <Navigation />
}
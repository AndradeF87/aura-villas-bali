'use client'

import { TranslationProvider } from '@/contexts/TranslationContext'

export function ClientWrapper({ 
  children, 
  dictionary 
}: { 
  children: React.ReactNode
  dictionary: any
}) {
  return (
    <TranslationProvider dictionary={dictionary}>
      {children}
    </TranslationProvider>
  )
}
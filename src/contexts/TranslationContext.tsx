'use client'

import { createContext, useContext } from 'react'

type Dictionary = any // We'll use any for now to avoid type issues

const TranslationContext = createContext<Dictionary | null>(null)

export function TranslationProvider({ 
  children, 
  dictionary 
}: { 
  children: React.ReactNode
  dictionary: Dictionary
}) {
  return (
    <TranslationContext.Provider value={dictionary}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return { dictionary: context }
}
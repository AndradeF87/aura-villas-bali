'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Languages } from 'lucide-react'
import { i18n, languages, type Locale } from '@/lib/i18n/config'

interface LanguageSwitcherProps {
  currentLocale?: Locale
  color?: string
}

export function LanguageSwitcher({ currentLocale = 'en', color = '#2F4A3C' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (locale: Locale) => {
    const segments = pathname.split('/').filter(Boolean)
    
    // Remove current locale if present
    if (i18n.locales.includes(segments[0] as Locale)) {
      segments.shift()
    }
    
    // Build new path
    let newPath = '/'
    if (locale !== i18n.defaultLocale) {
      newPath += locale
      if (segments.length > 0) {
        newPath += '/'
      }
    }
    if (segments.length > 0) {
      newPath += segments.join('/')
    }
    
    router.push(newPath)
    setIsOpen(false)
  }

  const currentLanguage = languages[currentLocale]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center hover:text-terracotta transition-colors duration-300"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title={currentLanguage.name}
        style={{ color }}
      >
        <Languages className="w-4 h-4" />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-deep-green/20 overflow-hidden z-50"
          role="listbox"
          aria-label="Available languages"
        >
          {i18n.locales.map((locale) => {
            const language = languages[locale]
            const isActive = locale === currentLocale
            
            return (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={`w-full px-4 py-3 text-left hover:bg-deep-green hover:text-white transition-all duration-200 flex items-center justify-between group ${
                  isActive ? 'bg-deep-green text-white' : 'text-deep-green'
                }`}
                role="option"
                aria-selected={isActive}
                lang={locale}
              >
                <span className="font-medium">{language.name}</span>
                <span className="text-xl ml-2">{language.flag}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
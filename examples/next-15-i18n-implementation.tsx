// Next.js 15 Internationalization Implementation Examples
// Complete implementation guide for AURA Villas Bali multi-language support

// =====================================================
// 1. MIDDLEWARE IMPLEMENTATION
// =====================================================
// File: middleware.ts (root level)

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Supported locales configuration
const locales = ['en', 'id', 'zh-cn', 'ja', 'de'] as const
const defaultLocale = 'en'

type Locale = typeof locales[number]

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  
  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.') ||
    pathname.startsWith('/favicon')
  ) {
    return
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Detect preferred locale
  const locale = detectLocale(request) ?? defaultLocale
  
  // Construct new URL with locale
  const newUrl = new URL(`/${locale}${pathname}${search}`, request.url)
  return NextResponse.redirect(newUrl)
}

function detectLocale(request: NextRequest): Locale | null {
  // 1. Check for explicit locale cookie
  const cookieLocale = request.cookies.get('preferred-locale')?.value
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale
  }

  // 2. Parse Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language')
  if (acceptLanguage) {
    // Parse quality values and sort by preference
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code, qValue] = lang.trim().split(';q=')
        return {
          code: code.toLowerCase(),
          quality: qValue ? parseFloat(qValue) : 1.0
        }
      })
      .sort((a, b) => b.quality - a.quality)

    // Find best matching locale
    for (const { code } of languages) {
      // Direct match
      if (locales.includes(code as Locale)) {
        return code as Locale
      }
      
      // Language-only match (e.g., 'zh' matches 'zh-cn')
      const langCode = code.split('-')[0]
      const matchingLocale = locales.find(locale => locale.startsWith(langCode))
      if (matchingLocale) {
        return matchingLocale
      }
    }
  }

  return null
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - API routes (/api/...)
     * - Static files (/_next/static/...)
     * - Image optimization (/_next/image/...)
     * - Favicon and other static assets
     */
    '/((?!api|_next/static|_next/image|favicon|robots|sitemap).*)',
  ],
}

// =====================================================
// 2. INTERNATIONALIZATION CONFIGURATION
// =====================================================
// File: lib/i18n-config.ts

export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'id', 'zh-cn', 'ja', 'de'],
  localeNames: {
    en: 'English',
    id: 'Bahasa Indonesia', 
    'zh-cn': '简体中文',
    ja: '日本語',
    de: 'Deutsch'
  },
  localeFlags: {
    en: '🇺🇸',
    id: '🇮🇩',
    'zh-cn': '🇨🇳', 
    ja: '🇯🇵',
    de: '🇩🇪'
  }
} as const

export type Locale = typeof i18n.locales[number]

// =====================================================
// 3. ROOT LAYOUT WITH LOCALE SUPPORT
// =====================================================
// File: app/[locale]/layout.tsx

import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Inter, Playfair_Display } from 'next/font/google'
import type { Metadata } from 'next'
import { i18n, type Locale } from '@/lib/i18n-config'
import { ConditionalNavigation } from '@/components/layout/ConditionalNavigation'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import '../globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'], 
  variable: '--font-playfair',
  display: 'swap',
})

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ 
  params: { locale } 
}: Props): Promise<Metadata> {
  if (!i18n.locales.includes(locale as Locale)) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: 'Metadata' })

  return {
    metadataBase: new URL('https://auravillasbali.com'),
    title: {
      template: `%s | ${t('siteName')}`,
      default: t('title'),
    },
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://auravillasbali.com/${locale}`,
      siteName: t('siteName'),
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t('siteName'),
        },
      ],
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: `https://auravillasbali.com/${locale}`,
      languages: Object.fromEntries(
        i18n.locales.map(l => [l, `https://auravillasbali.com/${l}`])
      ),
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  if (!i18n.locales.includes(locale as Locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <ConditionalNavigation />
          <LanguageSwitcher />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

// =====================================================
// 4. VILLA PAGE WITH LOCALIZED CONTENT
// =====================================================
// File: app/[locale]/villas/[slug]/page.tsx

import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getVillaBySlug, getAllVillas } from '@/lib/villas'
import { generateHreflangTags } from '@/lib/seo-utils'
import { i18n, type Locale } from '@/lib/i18n-config'
import { VillaGallery } from '@/components/villas/VillaGallery'
import { VillaAmenities } from '@/components/villas/VillaAmenities'
import { BookingForm } from '@/components/booking/BookingForm'

type Props = {
  params: { 
    locale: string
    slug: string 
  }
}

export async function generateStaticParams() {
  const villas = await getAllVillas()
  
  const params = []
  for (const locale of i18n.locales) {
    for (const villa of villas) {
      params.push({
        locale,
        slug: villa.slug
      })
    }
  }
  
  return params
}

export async function generateMetadata({ 
  params: { locale, slug } 
}: Props): Promise<Metadata> {
  const villa = await getVillaBySlug(slug, locale as Locale)
  
  if (!villa) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: 'VillaPage' })

  return {
    title: villa.name,
    description: villa.description,
    keywords: `${villa.name}, luxury villa Bali, ${villa.location}, villa rental`,
    openGraph: {
      title: villa.name,
      description: villa.description,
      images: [
        {
          url: villa.images[0].url,
          width: 1200,
          height: 630,
          alt: villa.name,
        },
      ],
    },
    alternates: {
      canonical: `https://auravillasbali.com/${locale}/villas/${slug}`,
      languages: generateHreflangTags(slug, 'villas')
    }
  }
}

export default async function VillaPage({ 
  params: { locale, slug } 
}: Props) {
  const villa = await getVillaBySlug(slug, locale as Locale)
  
  if (!villa) {
    notFound()
  }

  const t = await getTranslations('VillaPage')

  return (
    <main className="villa-page">
      {/* Hero Section */}
      <section className="villa-hero">
        <VillaGallery images={villa.images} alt={villa.name} />
        <div className="villa-info">
          <h1>{villa.name}</h1>
          <p className="location">{villa.location}</p>
          <p className="price">
            {t('priceFrom')} {villa.price.currency} {villa.price.amount.toLocaleString(locale)}
            <span className="period">/{t('night')}</span>
          </p>
        </div>
      </section>

      {/* Villa Details */}
      <section className="villa-details">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2>{t('description')}</h2>
              <div className="prose" dangerouslySetInnerHTML={{ __html: villa.description }} />
              
              <h3>{t('amenities')}</h3>
              <VillaAmenities amenities={villa.amenities} locale={locale as Locale} />
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <BookingForm 
                  villa={villa} 
                  locale={locale as Locale}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

// =====================================================
// 5. LANGUAGE SWITCHER COMPONENT
// =====================================================
// File: components/ui/LanguageSwitcher.tsx

'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import { ChevronDownIcon, GlobeIcon } from 'lucide-react'
import { i18n, type Locale } from '@/lib/i18n-config'
import { setCookie } from '@/lib/cookies'

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale() as Locale

  const handleLanguageChange = async (newLocale: Locale) => {
    // Update preferred locale cookie
    setCookie('preferred-locale', newLocale, { 
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sameSite: 'lax'
    })

    // Replace locale in pathname
    const segments = pathname.split('/')
    segments[1] = newLocale // Replace locale segment
    const newPathname = segments.join('/')
    
    setIsOpen(false)
    router.push(newPathname)
  }

  const currentLanguage = i18n.localeNames[currentLocale]
  const currentFlag = i18n.localeFlags[currentLocale]

  return (
    <div className="language-switcher relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
        aria-label="Select language"
      >
        <GlobeIcon className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentFlag} {currentLanguage}
        </span>
        <ChevronDownIcon 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
            {i18n.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3 ${
                  locale === currentLocale ? 'bg-gray-100' : ''
                }`}
              >
                <span className="text-xl">{i18n.localeFlags[locale]}</span>
                <span className="text-sm font-medium text-gray-900">
                  {i18n.localeNames[locale]}
                </span>
                {locale === currentLocale && (
                  <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// =====================================================
// 6. SEO UTILITIES
// =====================================================
// File: lib/seo-utils.ts

import { i18n } from './i18n-config'

/**
 * Generate hreflang tags for multi-language SEO
 */
export function generateHreflangTags(
  slug: string, 
  pathPrefix: string = ''
): Record<string, string> {
  const tags: Record<string, string> = {}
  
  // Add each locale
  i18n.locales.forEach(locale => {
    const path = pathPrefix ? `${pathPrefix}/${slug}` : slug
    tags[locale] = `https://auravillasbali.com/${locale}/${path}`
  })
  
  // Add x-default (usually points to default locale)
  tags['x-default'] = `https://auravillasbali.com/${i18n.defaultLocale}/${pathPrefix ? `${pathPrefix}/${slug}` : slug}`
  
  return tags
}

/**
 * Generate structured data for villas with localization
 */
export function generateVillaStructuredData(villa: any, locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": villa.name,
    "description": villa.description,
    "url": `https://auravillasbali.com/${locale}/villas/${villa.slug}`,
    "image": villa.images.map((img: any) => img.url),
    "address": {
      "@type": "PostalAddress",
      "addressLocality": villa.location,
      "addressRegion": "Bali",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": villa.coordinates?.latitude,
      "longitude": villa.coordinates?.longitude
    },
    "priceRange": `${villa.price.currency} ${villa.price.amount}`,
    "amenityFeature": villa.amenities.map((amenity: string) => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity
    }))
  }
}

// =====================================================
// 7. TRANSLATION HELPER UTILITIES
// =====================================================
// File: lib/translation-utils.ts

import { getTranslations } from 'next-intl/server'
import type { Locale } from './i18n-config'

/**
 * Get localized villa amenities
 */
export async function getLocalizedAmenities(
  amenities: string[], 
  locale: Locale
) {
  const t = await getTranslations({ locale, namespace: 'Amenities' })
  
  return amenities.map(amenity => ({
    key: amenity,
    label: t(amenity),
    icon: getAmenityIcon(amenity)
  }))
}

/**
 * Format currency based on locale
 */
export function formatCurrency(
  amount: number, 
  currency: string, 
  locale: Locale
): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  
  return formatter.format(amount)
}

/**
 * Format date range for booking
 */
export function formatDateRange(
  checkin: Date, 
  checkout: Date, 
  locale: Locale
): string {
  const formatter = new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  
  return `${formatter.format(checkin)} - ${formatter.format(checkout)}`
}

// =====================================================
// 8. MIGRATION SCRIPT
// =====================================================
// File: scripts/migrate-to-i18n.js

const fs = require('fs')
const path = require('path')

/**
 * Migration script to help transition existing pages to new i18n structure
 */
async function migrateToI18nStructure() {
  const appDir = path.join(process.cwd(), 'app')
  const newAppDir = path.join(process.cwd(), 'app-new')
  
  // Create new directory structure
  if (!fs.existsSync(newAppDir)) {
    fs.mkdirSync(newAppDir, { recursive: true })
  }
  
  // Create [locale] directory
  const localeDir = path.join(newAppDir, '[locale]')
  if (!fs.existsSync(localeDir)) {
    fs.mkdirSync(localeDir, { recursive: true })
  }
  
  console.log('Created new i18n directory structure')
  console.log('Next steps:')
  console.log('1. Move your existing pages to app/[locale]/')
  console.log('2. Update imports and routing')
  console.log('3. Add translation files')
  console.log('4. Test thoroughly before deploying')
}

if (require.main === module) {
  migrateToI18nStructure().catch(console.error)
}

// =====================================================
// 9. NEXT.JS CONFIG UPDATES
// =====================================================
// File: next.config.js updates

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... existing config
  
  // Add rewrite rules for backward compatibility during migration
  async rewrites() {
    return [
      // Redirect old URLs to new localized structure
      {
        source: '/villas/:slug',
        destination: '/en/villas/:slug',
      },
      {
        source: '/about',
        destination: '/en/about',
      },
      {
        source: '/contact', 
        destination: '/en/contact',
      }
    ]
  },
  
  // Add permanent redirects for SEO
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: false,
        locale: false
      }
    ]
  }
}

module.exports = nextConfig

// =====================================================
// 10. USAGE EXAMPLES
// =====================================================

/*
IMPLEMENTATION TIMELINE:

Week 1-2: Setup
- Install next-intl
- Create middleware and i18n config
- Set up [locale] directory structure

Week 3-4: Content Migration  
- Move existing pages to new structure
- Create translation files
- Update all internal links

Week 5-6: SEO Implementation
- Add hreflang tags
- Update sitemaps
- Configure redirects
- Set up Google Search Console

Week 7-8: Testing & Launch
- Test all language versions
- Monitor analytics
- Fix any issues
- Full deployment

FOLDER STRUCTURE AFTER IMPLEMENTATION:
app/
├── [locale]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── villas/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── api/
└── globals.css

messages/
├── en.json
├── id.json
├── zh-cn.json
├── ja.json
└── de.json
*/
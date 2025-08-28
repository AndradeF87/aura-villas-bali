# Multi-Language SEO Implementation Guide for AURA Villas Bali

## Quick Start Implementation

This guide provides actionable steps to implement multi-language SEO for the AURA Villas Bali website using Next.js 15 and modern best practices.

## 1. Project Setup

### Install Required Dependencies

```bash
npm install next-intl
npm install @formatjs/intl-localematcher
npm install negotiator
npm install @types/negotiator
```

### Configure Middleware

Create `/middleware.ts`:

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap')
  ) {
    return NextResponse.next()
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

    for (const { code } of languages) {
      if (locales.includes(code as Locale)) {
        return code as Locale
      }
      
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
    '/((?!api|_next/static|_next/image|favicon|robots|sitemap).*)',
  ],
}
```

## 2. Create Internationalization Configuration

Create `/lib/i18n-config.ts`:

```typescript
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
  },
  currencyByLocale: {
    en: 'USD',
    id: 'IDR',
    'zh-cn': 'CNY',
    ja: 'JPY',
    de: 'EUR'
  } as const
} as const

export type Locale = typeof i18n.locales[number]
```

## 3. Update Root Layout

Create `/app/[locale]/layout.tsx`:

```typescript
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
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
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/og-image.jpg'],
    },
    alternates: {
      canonical: `https://auravillasbali.com/${locale}`,
      languages: Object.fromEntries(
        i18n.locales.map(l => [l, `https://auravillasbali.com/${l}`])
      ),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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
```

## 4. Create Translation Messages

Create message files in `/messages/`:

### `/messages/en.json`
```json
{
  "Metadata": {
    "title": "AURA Villas Bali - Creating Good Memories",
    "description": "Life is all about creating good memories. Discover our exclusive collection of luxury villas where your story begins.",
    "keywords": "luxury villas Bali, exclusive Bali villas, Uluwatu villas, Canggu villas, Seminyak villas, beachfront villas Bali, clifftop villas Bali, villa rental Bali, Bali memories",
    "siteName": "AURA Villas Bali"
  },
  "VillaPage": {
    "priceFrom": "From",
    "night": "night",
    "description": "Description",
    "amenities": "Amenities",
    "luxuryVilla": "luxury villa",
    "villaRental": "villa rental",
    "bookNow": "Book Now",
    "checkAvailability": "Check Availability",
    "whatsappInquiry": "WhatsApp Inquiry"
  },
  "Amenities": {
    "wifi": "WiFi",
    "pool": "Swimming Pool",
    "airConditioning": "Air Conditioning",
    "kitchen": "Full Kitchen",
    "parking": "Free Parking",
    "beachAccess": "Beach Access",
    "gym": "Fitness Center",
    "spa": "Spa Services"
  },
  "Common": {
    "home": "Home",
    "villas": "Villas",
    "about": "About",
    "contact": "Contact",
    "currency": "USD"
  }
}
```

### `/messages/id.json`
```json
{
  "Metadata": {
    "title": "AURA Villas Bali - Menciptakan Kenangan Indah",
    "description": "Hidup adalah tentang menciptakan kenangan indah. Temukan koleksi eksklusif villa mewah kami di mana cerita Anda dimulai.",
    "keywords": "villa mewah Bali, villa eksklusif Bali, villa Uluwatu, villa Canggu, villa Seminyak, villa pantai Bali, villa tebing Bali, sewa villa Bali, kenangan Bali",
    "siteName": "AURA Villas Bali"
  },
  "VillaPage": {
    "priceFrom": "Mulai dari",
    "night": "malam",
    "description": "Deskripsi",
    "amenities": "Fasilitas",
    "luxuryVilla": "villa mewah",
    "villaRental": "sewa villa",
    "bookNow": "Pesan Sekarang",
    "checkAvailability": "Cek Ketersediaan",
    "whatsappInquiry": "Pertanyaan WhatsApp"
  },
  "Amenities": {
    "wifi": "WiFi",
    "pool": "Kolam Renang",
    "airConditioning": "AC",
    "kitchen": "Dapur Lengkap",
    "parking": "Parkir Gratis",
    "beachAccess": "Akses Pantai",
    "gym": "Pusat Kebugaran",
    "spa": "Layanan Spa"
  },
  "Common": {
    "home": "Beranda",
    "villas": "Villa",
    "about": "Tentang",
    "contact": "Kontak",
    "currency": "IDR"
  }
}
```

## 5. Create Structured Data Components

### Villa Structured Data Component

Create `/components/seo/VillaStructuredData.tsx`:

```typescript
import { Locale } from '@/lib/i18n-config'

interface VillaStructuredDataProps {
  villa: {
    name: string
    description: string
    slug: string
    images: Array<{ url: string; alt: string }>
    location: {
      area: string
      address: string
      coordinates?: { lat: number; lng: number }
    }
    pricing: {
      basePrice: number
      currency: string
    }
    bedrooms: number
    bathrooms: number
    maxGuests: number
    amenities: Array<{ name: string }>
    rating?: number
    reviews?: Array<{
      id: string
      rating: number
      comment: string
      guestName: string
      guestLocation: string
      createdAt: string
    }>
  }
  locale: Locale
}

export function VillaStructuredData({ villa, locale }: VillaStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VacationRental",
    "additionalType": "villa",
    "name": villa.name,
    "description": villa.description,
    "inLanguage": locale,
    "url": `https://auravillasbali.com/${locale}/villas/${villa.slug}`,
    "image": villa.images.map(img => img.url),
    "containsPlace": [
      {
        "@type": "Accommodation",
        "name": `${villa.name} - Main Villa`,
        "occupancy": {
          "@type": "QuantitativeValue",
          "maxValue": villa.maxGuests,
          "unitText": "guests"
        },
        "numberOfBeds": villa.bedrooms,
        "numberOfBedrooms": villa.bedrooms,
        "numberOfBathrooms": villa.bathrooms
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": villa.location.address,
      "addressLocality": villa.location.area,
      "addressRegion": "Bali",
      "addressCountry": "ID"
    },
    ...(villa.location.coordinates && {
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": villa.location.coordinates.lat,
        "longitude": villa.location.coordinates.lng
      }
    }),
    "amenityFeature": villa.amenities.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity.name,
      "value": true
    })),
    "offers": {
      "@type": "Offer",
      "price": villa.pricing.basePrice.toString(),
      "priceCurrency": villa.pricing.currency,
      "availability": "https://schema.org/InStock",
      "priceValidUntil": "2025-12-31",
      "businessFunction": "https://schema.org/LeaseOut"
    },
    ...(villa.rating && villa.reviews?.length && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": villa.rating,
        "reviewCount": villa.reviews.length,
        "bestRating": 5,
        "worstRating": 1
      },
      "review": villa.reviews.slice(0, 3).map(review => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating,
          "bestRating": 5,
          "worstRating": 1
        },
        "author": {
          "@type": "Person",
          "name": review.guestName
        },
        "reviewBody": review.comment,
        "datePublished": review.createdAt,
        "inLanguage": locale
      }))
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

### Organization Structured Data Component

Create `/components/seo/OrganizationStructuredData.tsx`:

```typescript
import { Locale } from '@/lib/i18n-config'

interface OrganizationStructuredDataProps {
  locale: Locale
}

export function OrganizationStructuredData({ locale }: OrganizationStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": "https://auravillasbali.com/#organization",
    "name": "AURA Villas Bali",
    "alternateName": "AURA Villa Management",
    "description": locale === 'id' ? 
      "Perusahaan manajemen villa boutique terdepan di Bali, menggabungkan keramahan tradisional Bali dengan teknologi AI inovatif." :
      "Bali's premier boutique villa management company, combining traditional Balinese hospitality with innovative AI technology.",
    "url": "https://auravillasbali.com",
    "logo": "https://auravillasbali.com/logo.png",
    "image": "https://auravillasbali.com/images/about-hero.jpg",
    "foundingDate": "2018",
    "founder": [
      {
        "@type": "Person",
        "name": "Kadek Sutrisna",
        "jobTitle": "Co-Founder & CEO"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Raya Seminyak No. 88",
      "addressLocality": "Seminyak",
      "addressRegion": "Bali",
      "postalCode": "80361",
      "addressCountry": "ID"
    },
    "areaServed": [
      {
        "@type": "Place",
        "name": "Uluwatu"
      },
      {
        "@type": "Place",
        "name": "Seminyak"
      },
      {
        "@type": "Place", 
        "name": "Canggu"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-361-123456",
      "contactType": "customer service",
      "areaServed": ["ID", "AU", "US", "GB", "CN", "JP"],
      "availableLanguage": getAvailableLanguages(locale)
    },
    "sameAs": [
      "https://www.facebook.com/auravillasbali",
      "https://www.instagram.com/auravillasbali",
      "https://www.youtube.com/@auravillasbali"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": 4.8,
      "reviewCount": 156,
      "bestRating": 5,
      "worstRating": 1
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

function getAvailableLanguages(locale: Locale): string[] {
  const languages = {
    en: ["English", "Indonesian"],
    id: ["Indonesian", "English"],
    'zh-cn': ["Chinese", "English", "Indonesian"],
    ja: ["Japanese", "English", "Indonesian"],
    de: ["German", "English", "Indonesian"]
  }
  
  return languages[locale] || ["English", "Indonesian"]
}
```

## 6. Create Multi-Language FAQ Component

Create `/components/seo/FAQStructuredData.tsx`:

```typescript
import { Locale } from '@/lib/i18n-config'

interface FAQ {
  question: string
  answer: string
}

interface FAQStructuredDataProps {
  faqs: FAQ[]
  locale: Locale
}

export function FAQStructuredData({ faqs, locale }: FAQStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "inLanguage": locale,
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Usage in pages/components
export const villaFAQs = {
  en: [
    {
      question: "What is included in the villa rental?",
      answer: "Your villa rental includes daily housekeeping, private chef service, airport transfer, and access to all villa amenities including the infinity pool, gym, and entertainment systems."
    },
    {
      question: "What is the check-in and check-out time?",
      answer: "Check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in and late check-out may be available upon request and subject to availability."
    },
    {
      question: "Do you provide airport transfer?",
      answer: "Yes, complimentary airport transfer is included for all villa bookings. Our driver will meet you at the arrival hall with a personalized welcome sign."
    }
  ],
  id: [
    {
      question: "Apa saja yang termasuk dalam sewa villa?",
      answer: "Sewa villa Anda termasuk layanan kebersihan harian, layanan chef pribadi, transfer bandara, dan akses ke semua fasilitas villa termasuk kolam renang infinity, gym, dan sistem hiburan."
    },
    {
      question: "Kapan waktu check-in dan check-out?",
      answer: "Waktu check-in adalah pukul 15:00 dan check-out pukul 11:00. Check-in lebih awal dan check-out terlambat mungkin tersedia atas permintaan dan tergantung ketersediaan."
    },
    {
      question: "Apakah Anda menyediakan transfer bandara?",
      answer: "Ya, transfer bandara gratis disertakan untuk semua pemesanan villa. Sopir kami akan menjemput Anda di ruang kedatangan dengan papan nama yang dipersonalisasi."
    }
  ]
}
```

## 7. Language Switcher Component

Create `/components/ui/LanguageSwitcher.tsx`:

```typescript
'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import { ChevronDownIcon, GlobeIcon } from 'lucide-react'
import { i18n, type Locale } from '@/lib/i18n-config'

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale() as Locale

  const handleLanguageChange = async (newLocale: Locale) => {
    // Set cookie for preference
    document.cookie = `preferred-locale=${newLocale}; max-age=${365 * 24 * 60 * 60}; path=/; samesite=lax`

    // Replace locale in pathname
    const segments = pathname.split('/')
    segments[1] = newLocale
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
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
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
```

## 8. Currency and Price Utilities

Create `/lib/currency-utils.ts`:

```typescript
import { Locale, i18n } from './i18n-config'

export function formatCurrency(
  amount: number,
  locale: Locale,
  currency?: string
): string {
  const currencyCode = currency || i18n.currencyByLocale[locale]
  
  const formatter = new Intl.NumberFormat(getLocaleCode(locale), {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
  
  return formatter.format(amount)
}

export function convertPrice(
  baseAmount: number,
  fromCurrency: string,
  toCurrency: string
): number {
  // In a real application, you'd fetch live exchange rates
  // For now, using approximate conversion rates
  const rates: Record<string, number> = {
    USD: 1,
    IDR: 15000,
    EUR: 0.85,
    CNY: 7.2,
    JPY: 110
  }
  
  const usdAmount = baseAmount / (rates[fromCurrency] || 1)
  return usdAmount * (rates[toCurrency] || 1)
}

export function getPriceForLocale(
  basePrice: number,
  baseCurrency: string,
  locale: Locale
): { amount: number; currency: string; formatted: string } {
  const targetCurrency = i18n.currencyByLocale[locale]
  const convertedAmount = convertPrice(basePrice, baseCurrency, targetCurrency)
  
  return {
    amount: convertedAmount,
    currency: targetCurrency,
    formatted: formatCurrency(convertedAmount, locale, targetCurrency)
  }
}

function getLocaleCode(locale: Locale): string {
  const localeCodes = {
    en: 'en-US',
    id: 'id-ID',
    'zh-cn': 'zh-CN',
    ja: 'ja-JP',
    de: 'de-DE'
  }
  
  return localeCodes[locale] || 'en-US'
}
```

## 9. Enhanced Villa Page Implementation

Create `/app/[locale]/villas/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { Locale } from '@/lib/i18n-config'
import { getVillaBySlug } from '@/lib/villa-service'
import { VillaStructuredData } from '@/components/seo/VillaStructuredData'
import { FAQStructuredData, villaFAQs } from '@/components/seo/FAQStructuredData'
import { getPriceForLocale } from '@/lib/currency-utils'
import { VillaGallery } from '@/components/villas/VillaGallery'
import { BookingForm } from '@/components/booking/BookingForm'

type Props = {
  params: { 
    locale: string
    slug: string 
  }
}

export async function generateMetadata({ 
  params: { locale, slug } 
}: Props): Promise<Metadata> {
  const villa = await getVillaBySlug(slug)
  
  if (!villa) {
    return {}
  }

  const t = await getTranslations({ locale, namespace: 'VillaPage' })
  const localizedPrice = getPriceForLocale(
    villa.pricing.basePrice, 
    villa.pricing.currency, 
    locale as Locale
  )

  return {
    title: `${villa.name} - ${t('luxuryVilla')} in ${villa.location.area}`,
    description: villa.description,
    keywords: `${villa.name}, ${t('luxuryVilla')}, ${villa.location.area}, ${t('villaRental')}, Bali accommodation`,
    openGraph: {
      title: villa.name,
      description: villa.description,
      url: `https://auravillasbali.com/${locale}/villas/${slug}`,
      images: villa.images.map(img => ({
        url: img.url,
        width: 1200,
        height: 630,
        alt: img.alt,
      })),
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: villa.name,
      description: villa.description,
      images: villa.images.map(img => img.url),
    },
    alternates: {
      canonical: `https://auravillasbali.com/${locale}/villas/${slug}`,
      languages: {
        en: `https://auravillasbali.com/en/villas/${slug}`,
        id: `https://auravillasbali.com/id/villas/${slug}`,
        'zh-cn': `https://auravillasbali.com/zh-cn/villas/${slug}`,
        ja: `https://auravillasbali.com/ja/villas/${slug}`,
        de: `https://auravillasbali.com/de/villas/${slug}`,
      }
    },
    other: {
      'price:amount:currency': localizedPrice.currency,
      'price:amount:value': localizedPrice.amount.toString(),
    }
  }
}

export default async function VillaPage({ 
  params: { locale, slug } 
}: Props) {
  const villa = await getVillaBySlug(slug)
  
  if (!villa) {
    notFound()
  }

  const t = await getTranslations('VillaPage')
  const localizedPrice = getPriceForLocale(
    villa.pricing.basePrice,
    villa.pricing.currency,
    locale as Locale
  )
  const faqs = villaFAQs[locale as keyof typeof villaFAQs] || villaFAQs.en

  return (
    <>
      <VillaStructuredData villa={villa} locale={locale as Locale} />
      <FAQStructuredData faqs={faqs} locale={locale as Locale} />
      
      <main className="villa-page">
        {/* Hero Section */}
        <section className="villa-hero">
          <VillaGallery images={villa.images} alt={villa.name} />
          <div className="villa-info">
            <h1 className="text-4xl font-serif font-bold">{villa.name}</h1>
            <p className="text-lg text-gray-600">{villa.location.area}, Bali</p>
            <p className="text-2xl font-bold text-terracotta">
              {t('priceFrom')} {localizedPrice.formatted}
              <span className="text-base font-normal">/{t('night')}</span>
            </p>
          </div>
        </section>

        {/* Villa Content */}
        <section className="villa-content py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-serif font-bold mb-6">{t('description')}</h2>
                <div className="prose prose-lg max-w-none mb-8">
                  <p>{villa.description}</p>
                </div>

                <h3 className="text-2xl font-serif font-bold mb-4">{t('amenities')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {villa.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-terracotta/10 rounded-full flex items-center justify-center mr-3">
                        <span className="w-4 h-4 text-terracotta">✓</span>
                      </div>
                      <span className="text-gray-700">{amenity.name}</span>
                    </div>
                  ))}
                </div>

                {/* FAQ Section */}
                <div className="mt-12">
                  <h3 className="text-2xl font-serif font-bold mb-6">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {faq.question}
                        </h4>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <BookingForm 
                    villa={villa} 
                    locale={locale as Locale}
                    localizedPrice={localizedPrice}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
```

## 10. Sitemap Generation

Create `/app/sitemap.ts`:

```typescript
import type { MetadataRoute } from 'next'
import { i18n } from '@/lib/i18n-config'
import { getAllVillas } from '@/lib/villa-service'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://auravillasbali.com'
  const currentDate = new Date().toISOString()
  const villas = await getAllVillas()

  const staticPages: MetadataRoute.Sitemap = []
  
  // Generate entries for each locale
  i18n.locales.forEach(locale => {
    // Main pages
    staticPages.push(
      {
        url: `${baseUrl}/${locale}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 1.0,
        alternates: {
          languages: Object.fromEntries(
            i18n.locales.map(l => [l, `${baseUrl}/${l}`])
          )
        }
      },
      {
        url: `${baseUrl}/${locale}/villas`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            i18n.locales.map(l => [l, `${baseUrl}/${l}/villas`])
          )
        }
      },
      {
        url: `${baseUrl}/${locale}/about`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            i18n.locales.map(l => [l, `${baseUrl}/${l}/about`])
          )
        }
      },
      {
        url: `${baseUrl}/${locale}/contact`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            i18n.locales.map(l => [l, `${baseUrl}/${l}/contact`])
          )
        }
      }
    )

    // Villa pages for each locale
    villas.forEach(villa => {
      staticPages.push({
        url: `${baseUrl}/${locale}/villas/${villa.slug}`,
        lastModified: villa.updatedAt || currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            i18n.locales.map(l => [l, `${baseUrl}/${l}/villas/${villa.slug}`])
          )
        }
      })
    })
  })

  return staticPages.sort((a, b) => (b.priority || 0) - (a.priority || 0))
}
```

## 11. Validation and Testing

### Rich Results Testing Script

Create `/scripts/test-structured-data.js`:

```javascript
const urls = [
  'https://auravillasbali.com/en',
  'https://auravillasbali.com/en/villas',
  'https://auravillasbali.com/en/villas/suyai-villa',
  'https://auravillasbali.com/id/villas/suyai-villa',
  'https://auravillasbali.com/zh-cn/villas/suyai-villa'
]

async function testStructuredData() {
  for (const url of urls) {
    console.log(`Testing: ${url}`)
    
    try {
      const testUrl = `https://search.google.com/test/rich-results?url=${encodeURIComponent(url)}`
      console.log(`Rich Results Test: ${testUrl}`)
      
      // You can also use the structured data testing tool
      const schemaUrl = `https://validator.schema.org/#url=${encodeURIComponent(url)}`
      console.log(`Schema Validator: ${schemaUrl}`)
      
    } catch (error) {
      console.error(`Error testing ${url}:`, error)
    }
    
    console.log('---')
  }
}

testStructuredData()
```

## 12. Deployment Checklist

### Pre-Deployment Validation

1. **Structured Data Validation**
   ```bash
   # Test with Google's Rich Results Test
   curl -X POST "https://searchconsole.googleapis.com/v1/urlTestingTools/richResults:run" \
   -H "Content-Type: application/json" \
   -d '{"url": "https://auravillasbali.com/en/villas/suyai-villa"}'
   ```

2. **Hreflang Validation**
   - Verify all language versions are accessible
   - Check hreflang tags are correct
   - Ensure x-default points to appropriate page

3. **Meta Tag Validation**
   - Verify Open Graph tags for each language
   - Check Twitter Card implementation
   - Validate canonical URLs

4. **Performance Testing**
   ```bash
   npm run lighthouse -- --url=https://auravillasbali.com/en/villas/suyai-villa
   ```

### Post-Deployment Monitoring

1. **Google Search Console**
   - Submit sitemaps for all languages
   - Monitor rich results status
   - Check for hreflang errors

2. **Analytics Setup**
   - Track traffic by language
   - Monitor conversion rates by locale
   - Set up goal tracking for bookings

## Summary

This implementation guide provides:

1. **Complete Next.js 15 setup** with proper i18n middleware
2. **Comprehensive structured data** for all villa-related content
3. **Multi-language SEO optimization** with proper hreflang implementation
4. **Currency and pricing localization** for different markets
5. **Rich snippets optimization** for better search visibility
6. **Performance monitoring** and validation tools

The implementation follows Google's latest guidelines for 2025 and provides a solid foundation for international SEO success in the luxury hospitality industry.
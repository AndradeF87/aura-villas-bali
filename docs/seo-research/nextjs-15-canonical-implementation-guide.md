# Next.js 15 Canonical URL Implementation Guide for AURA Villas Bali

## Executive Summary

This guide provides specific implementation strategies for canonical URLs and multi-language SEO in Next.js 15 for the AURA Villas Bali project. Based on current Next.js 15 capabilities and Google's 2025 SEO guidelines.

## 1. Current Project Analysis

### 1.1 Existing Implementation Review

**Current SEO Structure:**
- ✅ Basic metadata implementation in `/app/layout.tsx`
- ✅ Sitemap generation in `/app/sitemap.ts`
- ✅ SEO components in `/src/components/seo/`
- ❌ No internationalization setup
- ❌ No canonical URL implementation beyond basic metadata
- ❌ No hreflang implementation

**Current URL Structure:**
```
/                           # Homepage
/villas                     # Villa listings
/villas/[slug]             # Individual villas
/pricing                   # Pricing page
/about                     # About page  
/contact                   # Contact page
```

### 1.2 Recommended Multi-Language URL Structure

```
/en                        # English homepage
/en/villas                 # English villa listings
/en/villas/[slug]          # English villa details
/id                        # Indonesian homepage
/id/villas                 # Indonesian villa listings
/id/villas/[slug]          # Indonesian villa details
/zh-cn                     # Chinese homepage
/zh-cn/villas             # Chinese villa listings
/zh-cn/villas/[slug]      # Chinese villa details
```

## 2. Next.js 15 Internationalization Setup

### 2.1 Configuration Files

#### Create `src/lib/i18n-config.ts`
```typescript
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'id', 'zh-cn'],
} as const

export type Locale = (typeof i18n)['locales'][number]

export const localeNames: Record<Locale, string> = {
  'en': 'English',
  'id': 'Bahasa Indonesia', 
  'zh-cn': '简体中文',
}

export const localeLabels: Record<Locale, string> = {
  'en': 'EN',
  'id': 'ID',
  'zh-cn': '中文',
}
```

#### Create `middleware.ts` in project root
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from '@/lib/i18n-config'

function getLocale(request: NextRequest): string {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Check Accept-Language header
  if (pathnameIsMissingLocale) {
    const acceptLanguage = request.headers.get('Accept-Language')
    
    if (acceptLanguage) {
      // Parse Accept-Language header to find best match
      const languages = acceptLanguage
        .split(',')
        .map(lang => lang.split(';')[0].trim().toLowerCase())
      
      for (const lang of languages) {
        if (lang === 'id' || lang.startsWith('id-')) return 'id'
        if (lang === 'zh' || lang.startsWith('zh-')) return 'zh-cn'
        if (lang === 'en' || lang.startsWith('en-')) return 'en'
      }
    }
    
    return i18n.defaultLocale
  }

  // Extract locale from pathname
  return pathname.split('/')[1] as string
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const locale = getLocale(request)

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    )
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

### 2.2 New App Structure

Restructure the app directory to support locales:

```
app/
├── [locale]/
│   ├── layout.tsx          # Locale-specific layout
│   ├── page.tsx           # Homepage
│   ├── villas/
│   │   ├── page.tsx       # Villa listings
│   │   └── [slug]/
│   │       └── page.tsx   # Individual villa
│   ├── pricing/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── globals.css
├── sitemap.ts             # Updated sitemap
└── robots.ts
```

## 3. Canonical URL Implementation

### 3.1 Root Layout with Canonical Support

#### Update `app/[locale]/layout.tsx`
```typescript
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { i18n, type Locale } from '@/lib/i18n-config'
import { notFound } from 'next/navigation'
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"], 
  variable: "--font-playfair",
  display: 'swap',
  preload: true,
});

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateMetadata({
  params: { locale }
}: Props): Promise<Metadata> {
  // Validate locale
  if (!i18n.locales.includes(locale as Locale)) {
    notFound()
  }

  const baseUrl = 'https://auravillasbali.com'
  
  // Generate hreflang alternates
  const languages = Object.fromEntries(
    i18n.locales.map(l => [l, `${baseUrl}/${l}`])
  )

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: locale === 'en' 
        ? '%s | AURA Villas Bali' 
        : locale === 'id'
          ? '%s | AURA Villas Bali'
          : '%s | AURA巴厘岛别墅',
      default: locale === 'en'
        ? 'AURA Villas Bali - Creating Good Memories'
        : locale === 'id' 
          ? 'AURA Villas Bali - Menciptakan Kenangan Indah'
          : 'AURA巴厘岛别墅 - 创造美好回忆'
    },
    description: locale === 'en'
      ? "Life is all about creating good memories. Discover our exclusive collection of luxury villas where your story begins."
      : locale === 'id'
        ? "Hidup adalah tentang menciptakan kenangan indah. Temukan koleksi eksklusif villa mewah kami di mana cerita Anda dimulai."
        : "生活就是创造美好回忆。探索我们独家的豪华别墅收藏，您的故事从这里开始。",
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        ...languages,
        'x-default': `${baseUrl}/en`
      }
    },
    openGraph: {
      locale: locale === 'en' ? 'en_US' : locale === 'id' ? 'id_ID' : 'zh_CN',
      alternateLocale: i18n.locales.filter(l => l !== locale).map(l => 
        l === 'en' ? 'en_US' : l === 'id' ? 'id_ID' : 'zh_CN'
      )
    }
  }
}

export default function LocaleLayout({ children, params }: Props) {
  // Validate locale
  if (!i18n.locales.includes(params.locale as Locale)) {
    notFound()
  }

  return (
    <html lang={params.locale} className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}
```

### 3.2 Villa Page Implementation with Canonical URLs

#### Create `app/[locale]/villas/[slug]/page.tsx`
```typescript
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { i18n, type Locale } from '@/lib/i18n-config'

interface Villa {
  slug: string
  name: string
  description: string
  location: string
  images: Array<{ url: string; alt: string }>
  pricing: { min: number; max: number; currency: string }
}

type Props = {
  params: { locale: string; slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// Mock function - replace with actual data fetching
async function getVilla(slug: string, locale: Locale): Promise<Villa | null> {
  // This would typically fetch from your CMS/database
  const villas: Record<string, Record<Locale, Villa>> = {
    'suyai-villa': {
      'en': {
        slug: 'suyai-villa',
        name: 'SUYAI Villa Bali',
        description: 'Intimate boutique villa with sweeping ocean views in Uluwatu, featuring 3 bedrooms, infinity pool, and personalized butler service.',
        location: 'Uluwatu',
        images: [{ url: '/images/suyai-hero.jpg', alt: 'SUYAI Villa ocean view' }],
        pricing: { min: 450, max: 750, currency: 'USD' }
      },
      'id': {
        slug: 'suyai-villa',
        name: 'Villa SUYAI Bali', 
        description: 'Villa butik intim dengan pemandangan laut yang menakjubkan di Uluwatu, menampilkan 3 kamar tidur, kolam infinity, dan layanan butler pribadi.',
        location: 'Uluwatu',
        images: [{ url: '/images/suyai-hero.jpg', alt: 'Pemandangan laut Villa SUYAI' }],
        pricing: { min: 450, max: 750, currency: 'USD' }
      },
      'zh-cn': {
        slug: 'suyai-villa',
        name: 'SUYAI巴厘岛别墅',
        description: '位于乌鲁瓦图的精品别墅，拥有壮丽的海景，设有3间卧室、无边泳池和个人管家服务。',
        location: '乌鲁瓦图',
        images: [{ url: '/images/suyai-hero.jpg', alt: 'SUYAI别墅海景' }],
        pricing: { min: 450, max: 750, currency: 'USD' }
      }
    }
  }

  return villas[slug]?.[locale] || null
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const locale = params.locale as Locale
  const villa = await getVilla(params.slug, locale)
  
  if (!villa) {
    return {}
  }

  const baseUrl = 'https://auravillasbali.com'
  const canonicalUrl = `${baseUrl}/${locale}/villas/${params.slug}`
  
  // Generate hreflang alternates for this villa
  const languages = Object.fromEntries(
    i18n.locales.map(l => [l, `${baseUrl}/${l}/villas/${params.slug}`])
  )

  return {
    title: villa.name,
    description: villa.description,
    keywords: locale === 'en' 
      ? `${villa.name}, luxury villa ${villa.location}, Bali villa rental, ${villa.location} accommodation`
      : locale === 'id'
        ? `${villa.name}, villa mewah ${villa.location}, sewa villa Bali, akomodasi ${villa.location}`
        : `${villa.name}, ${villa.location}豪华别墅, 巴厘岛别墅租赁, ${villa.location}住宿`,
    
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languages,
        'x-default': `${baseUrl}/en/villas/${params.slug}`
      }
    },

    openGraph: {
      title: villa.name,
      description: villa.description,
      url: canonicalUrl,
      images: villa.images.map(img => ({
        url: img.url,
        width: 1200,
        height: 630,
        alt: img.alt
      })),
      type: 'website',
      locale: locale === 'en' ? 'en_US' : locale === 'id' ? 'id_ID' : 'zh_CN'
    },

    twitter: {
      card: 'summary_large_image',
      title: villa.name,
      description: villa.description,
      images: villa.images[0]?.url
    },

    other: {
      // Custom meta tags for booking systems
      'property:price:currency': villa.pricing.currency,
      'property:price:min': villa.pricing.min.toString(),
      'property:price:max': villa.pricing.max.toString(),
      'property:type': 'villa',
      'property:location': villa.location,
      'booking:available': 'true'
    }
  }
}

export default async function VillaPage({ params, searchParams }: Props) {
  const locale = params.locale as Locale
  const villa = await getVilla(params.slug, locale)
  
  if (!villa || !i18n.locales.includes(locale)) {
    notFound()
  }

  // Handle search parameters (checkin, checkout, guests) without affecting canonical
  const { checkin, checkout, guests, ...otherParams } = searchParams
  
  return (
    <div>
      <h1>{villa.name}</h1>
      <p>{villa.description}</p>
      
      {/* Display pricing based on search parameters */}
      {checkin && checkout && (
        <div>
          <p>Dates: {checkin} to {checkout}</p>
          {guests && <p>Guests: {guests}</p>}
        </div>
      )}
      
      {/* Villa content */}
    </div>
  )
}

export async function generateStaticParams() {
  // Generate all locale/slug combinations
  const slugs = ['suyai-villa'] // Add all your villa slugs here
  
  return i18n.locales.flatMap(locale => 
    slugs.map(slug => ({ locale, slug }))
  )
}
```

### 3.3 Villa Listings with Pagination

#### Create `app/[locale]/villas/page.tsx`
```typescript
import type { Metadata } from 'next'
import { i18n, type Locale } from '@/lib/i18n-config'

type Props = {
  params: { locale: string }
  searchParams: { page?: string; location?: string; [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const locale = params.locale as Locale
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1
  const location = searchParams.location as string
  
  const baseUrl = 'https://auravillasbali.com'
  
  // Construct canonical URL - clean URL without pagination for page 1
  let canonicalUrl = `${baseUrl}/${locale}/villas`
  if (location) {
    canonicalUrl += `?location=${location}`
  }
  if (page > 1) {
    canonicalUrl += `${location ? '&' : '?'}page=${page}`
  }
  
  // Generate hreflang alternates
  let baseAlternateUrl = '/villas'
  if (location) {
    baseAlternateUrl += `?location=${location}`
  }
  if (page > 1) {
    baseAlternateUrl += `${location ? '&' : '?'}page=${page}`
  }
  
  const languages = Object.fromEntries(
    i18n.locales.map(l => [l, `${baseUrl}/${l}${baseAlternateUrl}`])
  )

  // Dynamic title based on filters and pagination
  let title = locale === 'en' ? 'Luxury Villa Rentals in Bali' :
             locale === 'id' ? 'Sewa Villa Mewah di Bali' :
             '巴厘岛豪华别墅租赁'
             
  if (location) {
    title += locale === 'en' ? ` - ${location}` :
            locale === 'id' ? ` - ${location}` :
            ` - ${location}`
  }
  
  if (page > 1) {
    title += locale === 'en' ? ` (Page ${page})` :
            locale === 'id' ? ` (Halaman ${page})` :
            ` (第${page}页)`
  }

  return {
    title,
    description: locale === 'en'
      ? `Discover luxury villa rentals in Bali${location ? ` - ${location}` : ''}. Boutique villas with private pools, ocean views, and personalized service.`
      : locale === 'id'
        ? `Temukan sewa villa mewah di Bali${location ? ` - ${location}` : ''}. Villa butik dengan kolam pribadi, pemandangan laut, dan layanan personal.`
        : `探索巴厘岛豪华别墅租赁${location ? ` - ${location}` : ''}。精品别墅，私人泳池，海景和个性化服务。`,
    
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languages,
        'x-default': `${baseUrl}/en${baseAlternateUrl}`
      }
    }
  }
}

export default async function VillasPage({ params, searchParams }: Props) {
  const locale = params.locale as Locale
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1
  const location = searchParams.location as string

  // Fetch villas based on parameters
  // const villas = await getVillas({ locale, page, location })

  return (
    <div>
      <h1>
        {locale === 'en' ? 'Luxury Villas in Bali' :
         locale === 'id' ? 'Villa Mewah di Bali' :
         '巴厘岛豪华别墅'}
        {location && ` - ${location}`}
      </h1>
      
      {/* Villa listings */}
      
      {/* Pagination */}
      <div>
        {page > 1 && (
          <a href={`/${locale}/villas${location ? `?location=${location}&` : '?'}page=${page - 1}`}>
            {locale === 'en' ? 'Previous' : locale === 'id' ? 'Sebelumnya' : '上一页'}
          </a>
        )}
        <a href={`/${locale}/villas${location ? `?location=${location}&` : '?'}page=${page + 1}`}>
          {locale === 'en' ? 'Next' : locale === 'id' ? 'Selanjutnya' : '下一页'}
        </a>
      </div>
    </div>
  )
}
```

## 4. Advanced Canonical URL Handling

### 4.1 Custom Hook for URL Management

#### Create `src/hooks/useCanonicalUrl.ts`
```typescript
import { usePathname, useSearchParams } from 'next/navigation'
import { i18n, type Locale } from '@/lib/i18n-config'

interface CanonicalUrlOptions {
  excludeParams?: string[]
  includeParams?: string[]
  locale: Locale
}

export function useCanonicalUrl(options: CanonicalUrlOptions) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const getCanonicalUrl = () => {
    const baseUrl = 'https://auravillasbali.com'
    let canonicalPath = pathname
    
    // Handle parameters
    const urlParams = new URLSearchParams()
    
    if (options.includeParams) {
      // Only include specified parameters
      options.includeParams.forEach(param => {
        const value = searchParams.get(param)
        if (value) urlParams.set(param, value)
      })
    } else {
      // Include all parameters except excluded ones
      searchParams.forEach((value, key) => {
        if (!options.excludeParams?.includes(key)) {
          urlParams.set(key, value)
        }
      })
    }
    
    const queryString = urlParams.toString()
    return `${baseUrl}${canonicalPath}${queryString ? `?${queryString}` : ''}`
  }
  
  const getHreflangUrls = () => {
    const canonicalBase = getCanonicalUrl()
    const currentLocaleIndex = canonicalBase.indexOf(`/${options.locale}/`)
    
    if (currentLocaleIndex === -1) return {}
    
    const pathWithParams = canonicalBase.substring(currentLocaleIndex + `/${options.locale}`.length)
    
    return Object.fromEntries(
      i18n.locales.map(locale => [
        locale,
        `https://auravillasbali.com/${locale}${pathWithParams}`
      ])
    )
  }
  
  return {
    canonical: getCanonicalUrl(),
    hreflang: getHreflangUrls()
  }
}
```

### 4.2 Booking Parameter Handler

#### Create `src/lib/booking-params.ts`
```typescript
export interface BookingParams {
  checkin?: string
  checkout?: string
  guests?: number
  currency?: string
  promo?: string
}

export interface UrlParams {
  // SEO-relevant parameters to include in canonical
  location?: string
  category?: string
  
  // Booking parameters to exclude from canonical
  checkin?: string
  checkout?: string
  guests?: string
  currency?: string
  promo?: string
  
  // Tracking parameters to exclude
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
  fbclid?: string
  gclid?: string
}

export const TRACKING_PARAMS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
  'fbclid', 'gclid', 'msclkid', '_ga', 'ref'
]

export const BOOKING_PARAMS = [
  'checkin', 'checkout', 'guests', 'currency', 'promo'
]

export const SEO_RELEVANT_PARAMS = [
  'location', 'category', 'page'
]

export function getCanonicalParams(searchParams: URLSearchParams): URLSearchParams {
  const canonicalParams = new URLSearchParams()
  
  // Only include SEO-relevant parameters in canonical URL
  SEO_RELEVANT_PARAMS.forEach(param => {
    const value = searchParams.get(param)
    if (value) {
      canonicalParams.set(param, value)
    }
  })
  
  return canonicalParams
}

export function parseBookingParams(searchParams: URLSearchParams): BookingParams {
  return {
    checkin: searchParams.get('checkin') || undefined,
    checkout: searchParams.get('checkout') || undefined,
    guests: searchParams.get('guests') ? parseInt(searchParams.get('guests')!) : undefined,
    currency: searchParams.get('currency') || 'USD',
    promo: searchParams.get('promo') || undefined,
  }
}
```

### 4.3 Enhanced SEO Component

#### Create `src/components/seo/CanonicalHead.tsx`
```typescript
import { i18n, type Locale } from '@/lib/i18n-config'

interface CanonicalHeadProps {
  canonical: string
  locale: Locale
  title: string
  description: string
  noIndex?: boolean
}

export function CanonicalHead({ 
  canonical, 
  locale, 
  title, 
  description,
  noIndex = false 
}: CanonicalHeadProps) {
  
  // Generate hreflang alternates
  const getHreflangUrls = () => {
    const baseUrl = canonical.replace(`/${locale}/`, '/')
    return i18n.locales.reduce((acc, loc) => {
      acc[loc] = baseUrl.replace('/', `/${loc}/`)
      return acc
    }, {} as Record<string, string>)
  }

  const hreflangUrls = getHreflangUrls()

  return (
    <>
      <link rel="canonical" href={canonical} />
      {!noIndex && Object.entries(hreflangUrls).map(([lang, url]) => (
        <link 
          key={lang} 
          rel="alternate" 
          hrefLang={lang} 
          href={url} 
        />
      ))}
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={hreflangUrls.en} 
      />
      
      {/* Meta tags */}
      <meta name="robots" content={noIndex ? "noindex,follow" : "index,follow"} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={
        locale === 'en' ? 'en_US' : locale === 'id' ? 'id_ID' : 'zh_CN'
      } />
      
      {/* Alternate locales for Open Graph */}
      {i18n.locales
        .filter(l => l !== locale)
        .map(l => (
          <meta 
            key={l}
            property="og:locale:alternate" 
            content={l === 'en' ? 'en_US' : l === 'id' ? 'id_ID' : 'zh_CN'} 
          />
        ))}
    </>
  )
}
```

## 5. Sitemap Updates for Multi-Language

### 5.1 Enhanced Sitemap Generation

#### Update `app/sitemap.ts`
```typescript
import { MetadataRoute } from 'next'
import { i18n, type Locale } from '@/lib/i18n-config'

// Mock data - replace with actual CMS/database calls
const getVillas = async (): Promise<Array<{slug: string, updatedAt: string}>> => {
  return [
    { slug: 'suyai-villa', updatedAt: '2024-12-15' },
    // Add more villas
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://auravillasbali.com'
  const villas = await getVillas()
  
  // Static pages for each locale
  const staticPages: MetadataRoute.Sitemap = []
  
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/villas', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
  ]

  // Generate static pages for each locale
  for (const locale of i18n.locales) {
    for (const route of staticRoutes) {
      staticPages.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            i18n.locales.map(l => [l, `${baseUrl}/${l}${route.path}`])
          )
        }
      })
    }
  }

  // Villa pages for each locale
  const villaPages: MetadataRoute.Sitemap = []
  for (const villa of villas) {
    for (const locale of i18n.locales) {
      villaPages.push({
        url: `${baseUrl}/${locale}/villas/${villa.slug}`,
        lastModified: new Date(villa.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            i18n.locales.map(l => [l, `${baseUrl}/${l}/villas/${villa.slug}`])
          )
        }
      })
    }
  }

  return [...staticPages, ...villaPages].sort((a, b) => {
    if (a.priority !== b.priority) {
      return (b.priority || 0) - (a.priority || 0)
    }
    return new Date(b.lastModified || '').getTime() - new Date(a.lastModified || '').getTime()
  })
}
```

## 6. Implementation Checklist

### 6.1 Phase 1: Basic Setup
- [ ] Create `src/lib/i18n-config.ts`
- [ ] Add `middleware.ts` in project root
- [ ] Restructure app directory with `[locale]` folder
- [ ] Update main layout with locale support
- [ ] Test basic routing works

### 6.2 Phase 2: Canonical Implementation
- [ ] Implement canonical URLs in villa pages
- [ ] Add hreflang tags to all pages
- [ ] Create canonical URL utility functions
- [ ] Update sitemap with multi-language support
- [ ] Test canonical implementation

### 6.3 Phase 3: Parameter Handling
- [ ] Implement booking parameter exclusion
- [ ] Add tracking parameter filtering
- [ ] Test canonical URLs with various parameters
- [ ] Validate Google Search Console integration

### 6.4 Phase 4: SEO Components
- [ ] Create reusable canonical components
- [ ] Implement structured data updates
- [ ] Add meta tag localization
- [ ] Test rich results in Google

## 7. Testing and Validation

### 7.1 Manual Testing Checklist

Test each URL pattern:
- [ ] `/{locale}` - Homepage with self-referencing canonical
- [ ] `/{locale}/villas` - Villa listings with proper canonicals
- [ ] `/{locale}/villas?page=2` - Paginated listings
- [ ] `/{locale}/villas/suyai-villa` - Villa detail pages
- [ ] `/{locale}/villas/suyai-villa?checkin=2025-03-15` - With parameters

### 7.2 SEO Validation Tools

- [ ] Google Search Console URL inspection
- [ ] Rich Results Test for structured data
- [ ] Hreflang validation with tools like Screaming Frog
- [ ] Canonical tag validation
- [ ] Mobile-friendly test

### 7.3 Performance Testing

- [ ] Core Web Vitals impact
- [ ] Sitemap generation performance
- [ ] Page load times with canonical tags
- [ ] Memory usage with multiple locales

This implementation guide provides a comprehensive approach to canonical URLs and internationalization in Next.js 15, specifically tailored for the AURA Villas Bali project requirements.
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { Locale, i18n } from '@/lib/i18n/config'
import { getVillaBySlug, getAllVillas } from '@/data/villas'
import VillaDetailClient from './VillaDetailClient'

// Generate static params for all villa pages
export async function generateStaticParams() {
  const villas = getAllVillas()
  const paths = []
  
  for (const locale of i18n.locales) {
    for (const villa of villas) {
      paths.push({
        locale,
        slug: villa.slug,
      })
    }
  }
  
  return paths
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const dict = await getDictionary(locale)
  const villa = getVillaBySlug(slug)
  
  if (!villa) {
    return {
      title: 'Villa Not Found',
      description: 'The villa you are looking for does not exist.',
    }
  }

  // Get villa-specific translations
  const villaKey = slug.replace('-villa', '') as 'suyai' | 'onaya'
  const villaDict = dict.villas[villaKey]
  
  const baseUrl = 'https://auravillasbali.com'
  
  // Generate alternate links for all locales
  const languages: Record<string, string> = {}
  i18n.locales.forEach((loc) => {
    const path = `/villas/${slug}`
    if (loc === i18n.defaultLocale) {
      languages['x-default'] = `${baseUrl}${path}`
      languages[loc] = `${baseUrl}${path}`
    } else {
      languages[loc] = `${baseUrl}/${loc}${path}`
    }
  })

  const url = locale === i18n.defaultLocale 
    ? `${baseUrl}/villas/${slug}` 
    : `${baseUrl}/${locale}/villas/${slug}`

  return {
    title: villaDict.title,
    description: villaDict.description,
    keywords: villaDict.keywords,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: villaDict.title,
      description: villaDict.description,
      url,
      siteName: 'AURA Villas Bali',
      images: [
        {
          url: villa.images[0],
          width: 1200,
          height: 630,
          alt: villaDict.name,
        },
      ],
      locale: locale === 'es-ES' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: villaDict.title,
      description: villaDict.description,
      images: [villa.images[0]],
    },
  }
}

// Generate structured data for SEO
function generateStructuredData(
  villa: any,
  villaDict: any,
  locale: Locale
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    '@id': `https://auravillasbali.com/villas/${villa.slug}#vacationrental`,
    name: villaDict.name,
    description: villaDict.description,
    url: `https://auravillasbali.com${locale === 'en' ? '' : `/${locale}`}/villas/${villa.slug}`,
    image: villa.images.map((img: string) => ({
      '@type': 'ImageObject',
      url: `https://auravillasbali.com${img}`,
    })),
    address: {
      '@type': 'PostalAddress',
      addressLocality: villa.location.area,
      addressRegion: 'Bali',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: villa.location.coordinates.lat,
      longitude: villa.location.coordinates.lng,
    },
    numberOfBedrooms: villa.bedrooms,
    numberOfBathrooms: villa.bathrooms,
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: villa.maxGuests,
      unitText: 'guests',
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: villa.size,
      unitCode: 'MTK', // Square meters
    },
    amenityFeature: villa.amenities.map((amenity: string) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
      value: true,
    })),
    priceCurrency: villa.pricing.currency,
    priceRange: `$${villa.pricing.basePrice}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: villa.rating,
      reviewCount: villa.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: villa.pricing.basePrice,
        priceCurrency: villa.pricing.currency,
        unitCode: 'NIH', // Per night
        name: 'Per night rate',
      },
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Cleaning Fee',
        value: villa.pricing.cleaningFee,
        unitCode: villa.pricing.currency,
      },
    ],
    provider: {
      '@type': 'Organization',
      '@id': 'https://auravillasbali.com/#organization',
      name: 'AURA Villas Bali',
      url: 'https://auravillasbali.com',
    },
  }
}

export default async function VillaDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const dict = await getDictionary(locale)
  const villa = getVillaBySlug(slug)

  if (!villa) {
    notFound()
  }

  // Get villa-specific translations
  const villaKey = slug.replace('-villa', '') as 'suyai' | 'onaya'
  const villaDict = dict.villas[villaKey]
  const structuredData = generateStructuredData(villa, villaDict, locale)

  return (
    <>
      {/* Add structured data to page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {/* Render the client component with all the data */}
      <VillaDetailClient
        villa={villa}
        villaDict={villaDict}
        dictionary={dict}
        locale={locale}
      />
    </>
  )
}
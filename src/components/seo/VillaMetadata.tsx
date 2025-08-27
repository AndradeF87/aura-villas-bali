import { Metadata } from 'next'
import type { Villa } from '@/types/villa'

export function generateVillaMetadata(villa: Villa): Metadata {
  const title = `${villa.name} - Boutique Villa in ${villa.location?.area}, Bali | AURA Villas`
  const description = villa.storyTeaser || `Experience ${villa.name}, a boutique ${villa.bedrooms}-bedroom villa in ${villa.location?.area}. Perfect for ${villa.maxGuests} guests with premium amenities and authentic Balinese hospitality.`
  const images = villa.images?.map(img => ({
    url: img.url,
    width: 1200,
    height: 630,
    alt: img.alt || villa.name,
  })) || []

  return {
    title,
    description,
    keywords: [
      villa.name,
      `${villa.location?.area} villa`,
      'Bali boutique villa',
      'villa rental Bali',
      `${villa.bedrooms} bedroom villa`,
      'Bali accommodation',
      'boutique travel',
      'villa holiday'
    ].join(', '),
    openGraph: {
      title,
      description,
      url: `https://auravillasbali.com/villas/${villa.slug}`,
      siteName: 'AURA Villas Bali',
      images,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map(img => img.url),
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
    alternates: {
      canonical: `https://auravillasbali.com/villas/${villa.slug}`,
    },
  }
}

export function VillaStructuredData({ villa }: { villa: Villa }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: villa.name,
    description: villa.story || villa.storyTeaser,
    url: `https://auravillasbali.com/villas/${villa.slug}`,
    image: villa.images?.map(img => img.url) || [],
    priceRange: villa.pricing ? `${villa.pricing.currency}${villa.pricing.basePrice}` : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: villa.location?.address,
      addressLocality: villa.location?.area,
      addressRegion: 'Bali',
      addressCountry: 'Indonesia',
    },
    geo: villa.location?.coordinates ? {
      '@type': 'GeoCoordinates',
      latitude: villa.location.coordinates.lat,
      longitude: villa.location.coordinates.lng,
    } : undefined,
    amenityFeature: villa.amenities?.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity.name || amenity,
    })) || [],
    aggregateRating: villa.rating && villa.reviews?.length ? {
      '@type': 'AggregateRating',
      ratingValue: villa.rating,
      reviewCount: villa.reviews.length,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    starRating: villa.rating ? {
      '@type': 'Rating',
      ratingValue: villa.rating,
    } : undefined,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
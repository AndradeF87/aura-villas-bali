import type { Villa } from '@/types/villa'

export class SEOService {
  static generateVillaMetadata(villa: Villa) {
    const title = `${villa.name} - Luxury Villa in ${villa.location?.area}, Bali | AURA Villas`
    const description = villa.storyTeaser || `Experience ${villa.name}, a luxury ${villa.bedrooms}-bedroom villa in ${villa.location?.area}. Perfect for ${villa.maxGuests} guests with premium amenities and authentic Balinese hospitality.`
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://aura-villas-bali.com/villas/${villa.slug}`,
        images: [
          {
            url: villa.images?.[0]?.url || '/images/og-default.jpg',
            width: 1200,
            height: 630,
            alt: villa.name,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [villa.images?.[0]?.url || '/images/og-default.jpg'],
      },
    }
  }

  static generateSearchMetadata(filters: any) {
    const location = filters.location || 'Bali'
    const title = `Luxury Villas in ${location} | AURA Villas Bali`
    const description = `Discover handpicked luxury villas in ${location}. Each villa tells a unique story. Book authentic Balinese experiences with 24/7 concierge service.`
    
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: 'https://aura-villas-bali.com/villas',
        type: 'website',
      },
    }
  }

  static generateStructuredData(villa: Villa) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Accommodation',
      name: villa.name,
      description: villa.story || villa.storyTeaser,
      url: `https://aura-villas-bali.com/villas/${villa.slug}`,
      image: villa.images?.map(img => img.url) || [],
      address: {
        '@type': 'PostalAddress',
        addressLocality: villa.location?.area,
        addressRegion: 'Bali',
        addressCountry: 'Indonesia',
      },
      geo: villa.location?.coordinates ? {
        '@type': 'GeoCoordinates',
        latitude: villa.location.coordinates.lat,
        longitude: villa.location.coordinates.lng,
      } : undefined,
      priceRange: villa.pricing ? `${villa.pricing.currency}${villa.pricing.basePrice}` : undefined,
      starRating: villa.rating ? {
        '@type': 'Rating',
        ratingValue: villa.rating,
        bestRating: 5,
        worstRating: 1,
      } : undefined,
      amenityFeature: villa.amenities?.map(amenity => ({
        '@type': 'LocationFeatureSpecification',
        name: amenity.name || amenity,
      })) || [],
      aggregateRating: villa.rating && villa.reviews?.length ? {
        '@type': 'AggregateRating',
        ratingValue: villa.rating,
        reviewCount: villa.reviews.length,
      } : undefined,
    }
  }
}

export const seoService = SEOService
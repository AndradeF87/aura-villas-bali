import { Metadata } from 'next'

export const pricingMetadata: Metadata = {
  title: 'Villa Management Pricing | AURA Villas Bali - Operations & Marketing Packages',
  description: 'Transparent pricing for professional villa management in Bali. Choose from Operations packages (15-23% commission) or comprehensive Marketing solutions. AI-powered pricing, 24/7 support, proven ROI.',
  keywords: 'Bali villa management pricing, property management costs, villa marketing packages, revenue optimization, Seminyak villa management, Uluwatu property services, villa rental commission rates',
  alternates: {
    canonical: 'https://auravillasbali.com/pricing',
  },
  openGraph: {
    title: 'Villa Management Pricing | AURA Villas Bali',
    description: 'Professional villa management from 15% commission. Operations, marketing, and technology solutions for maximum ROI.',
    url: 'https://auravillasbali.com/pricing',
    siteName: 'AURA Villas Bali',
    images: [
      {
        url: 'https://auravillasbali.com/images/pricing-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'AURA Villas Management Pricing Plans',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Villa Management Pricing | AURA Villas Bali',
    description: 'Transparent pricing. Proven results. From 15% commission.',
    images: ['https://auravillasbali.com/images/pricing-hero.jpg'],
  },
}

// Schema markup for pricing page
export const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://auravillasbali.com/pricing/#webpage',
  url: 'https://auravillasbali.com/pricing',
  name: 'Villa Management Pricing - AURA Villas Bali',
  description: 'Transparent pricing for professional villa management services in Bali',
  isPartOf: {
    '@id': 'https://auravillasbali.com/#website'
  },
  mainEntity: {
    '@type': 'Service',
    '@id': 'https://auravillasbali.com/pricing/#service',
    name: 'Villa Management Services',
    provider: {
      '@type': 'Organization',
      '@id': 'https://auravillasbali.com/#organization',
      name: 'AURA Villas Bali',
      url: 'https://auravillasbali.com'
    },
    serviceType: 'Property Management',
    areaServed: {
      '@type': 'Place',
      name: 'Bali, Indonesia'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Villa Management Packages',
      itemListElement: [
        {
          '@type': 'Offer',
          '@id': 'https://auravillasbali.com/pricing/#essential',
          name: 'Essential Operations Package',
          description: 'Professional villa management with comprehensive services',
          price: '23',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '23',
            priceCurrency: 'USD',
            unitText: 'percent of revenue',
            valueAddedTaxIncluded: false
          },
          itemOffered: {
            '@type': 'Service',
            name: 'Essential Villa Management',
            description: 'Complete operational management for 1 property'
          },
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            unitText: 'property'
          },
          validFrom: '2024-01-01',
          seller: {
            '@id': 'https://auravillasbali.com/#organization'
          }
        },
        {
          '@type': 'Offer',
          '@id': 'https://auravillasbali.com/pricing/#professional',
          name: 'Professional Operations Package',
          description: 'Enhanced management with priority support',
          price: '20',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '20',
            priceCurrency: 'USD',
            unitText: 'percent of revenue',
            valueAddedTaxIncluded: false
          },
          itemOffered: {
            '@type': 'Service',
            name: 'Professional Villa Management',
            description: 'Premium management for 2-4 properties with enhanced services'
          },
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 4,
            unitText: 'properties'
          },
          validFrom: '2024-01-01',
          seller: {
            '@id': 'https://auravillasbali.com/#organization'
          }
        },
        {
          '@type': 'Offer',
          '@id': 'https://auravillasbali.com/pricing/#boutique',
          name: 'Boutique Collection',
          description: 'Exclusive management for luxury villas',
          price: '15',
          priceCurrency: 'USD',
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '15',
            priceCurrency: 'USD',
            unitText: 'percent of revenue',
            valueAddedTaxIncluded: false
          },
          itemOffered: {
            '@type': 'Service',
            name: 'Boutique Villa Management',
            description: 'White-glove service for ultra-luxury properties'
          },
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            unitText: 'luxury property'
          },
          eligibleCustomerType: 'Invitation Only',
          validFrom: '2024-01-01',
          seller: {
            '@id': 'https://auravillasbali.com/#organization'
          }
        }
      ]
    }
  }
}
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
  '@type': 'PriceSpecification',
  '@id': 'https://auravillasbali.com/pricing/#pricespecification',
  url: 'https://auravillasbali.com/pricing',
  priceCurrency: 'USD',
  offers: [
    {
      '@type': 'Offer',
      name: 'Essential Operations Package',
      description: 'Professional villa management with 20% commission',
      price: '20',
      priceCurrency: 'USD',
      unitText: 'percent commission',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        minValue: 1,
        unitText: 'property'
      }
    },
    {
      '@type': 'Offer',
      name: 'Professional Operations Package',
      description: 'Enhanced management with 17.5% commission',
      price: '17.5',
      priceCurrency: 'USD',
      unitText: 'percent commission',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        minValue: 2,
        unitText: 'properties'
      }
    },
    {
      '@type': 'Offer',
      name: 'Boutique Collection',
      description: 'Exclusive management for luxury villas with 15% commission',
      price: '15',
      priceCurrency: 'USD',
      unitText: 'percent commission',
      eligibleQuantity: {
        '@type': 'QuantitativeValue',
        minValue: 1,
        unitText: 'luxury property'
      }
    }
  ],
  provider: {
    '@type': 'Organization',
    name: 'AURA Villas Bali',
    url: 'https://auravillasbali.com'
  }
}
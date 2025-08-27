'use client'

import { GlassmorphismLuxury } from '@/components/homepage/GlassmorphismLuxury'
import { PropertyManagementHero } from '@/components/property-management/PropertyManagementHero'
import { ServiceTiers } from '@/components/property-management/ServiceTiers'
import { HowWeWork } from '@/components/property-management/HowWeWork'
import { QualificationForm } from '@/components/property-management/QualificationForm'
import { TechnologySection } from '@/components/property-management/TechnologySection'
import { WhatsAppButton } from '@/components/homepage/WhatsAppButton'
import { TimelineNavigation } from '@/components/homepage/TimelineNavigation'
import { SuccessStories } from '@/components/homepage/SuccessStories'
import { ChallengesSection } from '@/components/homepage/ChallengesSection'
import Script from 'next/script'

// Metadata is handled in layout.tsx for client components
/* export const metadata: Metadata = {
  title: 'Luxury Villa Rentals in Bali | AURA Villas - Seminyak, Uluwatu & Ubud',
  description: 'Discover luxury Bali villas with AURA. Premium properties in Seminyak, Uluwatu, Canggu & Ubud. Professional villa management, AI-powered pricing, 24/7 guest support. Creating unforgettable memories since 2020.',
  keywords: 'luxury villas Bali, Seminyak villas, Uluwatu cliff villas, Ubud jungle villas, Canggu beach villas, Bali villa rental, luxury accommodation Bali, beachfront villas, villa management Bali, boutique villas Indonesia',
  alternates: {
    canonical: 'https://auravillasbali.com',
  },
  openGraph: {
    title: 'Luxury Bali Villa Rentals | AURA Villas',
    description: 'Experience Bali\'s finest luxury villas in Seminyak, Uluwatu, Ubud & Canggu. Professional management, premium amenities, and unforgettable memories.',
    url: 'https://auravillasbali.com',
    siteName: 'AURA Villas Bali',
    images: [
      {
        url: 'https://auravillasbali.com/images/hero-villa.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxury Bali Villa with Ocean View - AURA Villas',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AURA Villas Bali | Luxury Villa Rentals',
    description: 'Discover Bali\'s most exclusive villas. Professional management, premium locations, unforgettable experiences.',
    images: ['https://auravillasbali.com/images/hero-villa.jpg'],
  },
} */

// Schema markup for the homepage
const homePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  '@id': 'https://auravillasbali.com/#organization',
  name: 'AURA Villas Bali',
  description: 'Luxury villa rentals and professional property management in Bali\'s premium locations',
  url: 'https://auravillasbali.com',
  logo: 'https://auravillasbali.com/logo.png',
  image: 'https://auravillasbali.com/images/hero-villa.jpg',
  priceRange: '$$$',
  servesCuisine: 'International',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Raya Seminyak No. 88',
    addressLocality: 'Seminyak',
    addressRegion: 'Bali',
    postalCode: '80361',
    addressCountry: 'ID'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -8.6895,
    longitude: 115.1688
  },
  telephone: '+62-361-123456',
  email: 'info@auravillasbali.com',
  hasMap: 'https://maps.google.com/maps?q=AURA+Villas+Bali+Seminyak',
  openingHours: 'Mo-Su 00:00-24:00',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
    bestRating: '5',
    worstRating: '1'
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', 'name': 'Swimming Pool', 'value': true },
    { '@type': 'LocationFeatureSpecification', 'name': 'Free WiFi', 'value': true },
    { '@type': 'LocationFeatureSpecification', 'name': 'Air Conditioning', 'value': true },
    { '@type': 'LocationFeatureSpecification', 'name': 'Private Chef', 'value': true },
    { '@type': 'LocationFeatureSpecification', 'name': '24/7 Concierge', 'value': true },
    { '@type': 'LocationFeatureSpecification', 'name': 'Airport Transfer', 'value': true }
  ],
  sameAs: [
    'https://www.facebook.com/auravillasbali',
    'https://www.instagram.com/auravillasbali',
    'https://www.youtube.com/@auravillasbali'
  ]
}

export default function Home() {
  
  return (
    <>
      <Script
        id="homepage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />
      <style jsx global>{`
        /* Hide scrollbar for this page only */
        html:has(.homepage) {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        html:has(.homepage)::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none; /* WebKit */
        }
      `}</style>
      <div className="homepage relative overflow-x-hidden">
        <GlassmorphismLuxury />
        <PropertyManagementHero />
        <ServiceTiers />
        <HowWeWork />
        <TechnologySection />
        <ChallengesSection />
        <SuccessStories />
        <TimelineNavigation />
        <QualificationForm />
        <WhatsAppButton />
      </div>
    </>
  )
}
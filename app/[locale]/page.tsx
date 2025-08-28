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
import { getDictionary } from '@/lib/i18n/dictionaries'
import { Locale } from '@/lib/i18n/config'
import { ClientWrapper } from '@/components/homepage/ClientWrapper'
import { HideScrollbar } from '@/components/homepage/HideScrollbar'

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

export default async function Home({
  params
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  
  return (
      <div className="homepage homepage-wrapper relative overflow-x-hidden">
        <HideScrollbar />
        <ClientWrapper dictionary={dictionary}>
          <GlassmorphismLuxury />
          {/* Spacer for fixed first section */}
          <div className="h-screen" />
          <div className="relative bg-white" style={{ zIndex: 1 }}>
            <PropertyManagementHero />
            <SuccessStories />
            <ChallengesSection />
            <HowWeWork />
            <TechnologySection />
            <QualificationForm />
            <ServiceTiers />
            {/* Add spacing before footer to prevent overlap */}
            <div className="h-32" />
            <WhatsAppButton />
          </div>
          {/* Timeline Navigation rendered last to ensure it's on top */}
          <TimelineNavigation />
        </ClientWrapper>
      </div>
  )
}
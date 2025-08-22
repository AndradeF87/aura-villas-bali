import { Metadata } from 'next'
import { Hero } from '@/components/homepage/Hero'
import { FeaturedVillasBooking } from '@/components/homepage/FeaturedVillasBooking'
import { WhyBookWithAura } from '@/components/homepage/WhyBookWithAura'
import { ExploreByArea } from '@/components/homepage/ExploreByArea'
import { BaliExperiences } from '@/components/homepage/BaliExperiences'
import { TrustSignals } from '@/components/homepage/TrustSignals'
import { WhatsAppButton } from '@/components/homepage/WhatsAppButton'

export const metadata: Metadata = {
  title: 'AURA Villas Bali - Exclusive Luxury Villa Escapes',
  description: 'Discover Bali\'s most exclusive luxury villas. Handpicked clifftop sanctuaries and beachfront retreats with seamless booking and 24/7 concierge service. Book your perfect Bali escape today.',
  keywords: 'luxury villas Bali, exclusive Bali villas, Uluwatu villas, Canggu villas, Seminyak villas, beachfront villas Bali, clifftop villas Bali, villa rental Bali, Bali accommodation, luxury accommodation Bali',
}

export default function Home() {
  return (
    <>
      {/* Hero Section with Villa Search */}
      <Hero />

      {/* Featured Villas for Booking */}
      <FeaturedVillasBooking />

      {/* Why Book with AURA - Guest Benefits */}
      <WhyBookWithAura />

      {/* Explore by Area */}
      <ExploreByArea />

      {/* Bali Experiences */}
      <BaliExperiences />

      {/* Trust Signals & Guest Reviews */}
      <TrustSignals />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </>
  )
}
import { Metadata } from 'next'
import { Hero } from '@/components/homepage/Hero'
import { FeaturedVillasBooking } from '@/components/homepage/FeaturedVillasBooking'
import { WhyBookWithAura } from '@/components/homepage/WhyBookWithAura'
import { ExploreByArea } from '@/components/homepage/ExploreByArea'
import { BaliExperiences } from '@/components/homepage/BaliExperiences'
import { TrustSignals } from '@/components/homepage/TrustSignals'
import { WhatsAppButton } from '@/components/homepage/WhatsAppButton'

export const metadata: Metadata = {
  title: 'AURA Villas Bali - Guest Homepage Archive',
  description: 'Archive of the original guest-focused homepage with booking interface.',
}

// Archive of guest-focused homepage
// Preserved on: 2025-08-24
// Contains all original guest booking components and functionality

export default function HomeGuestArchive() {
  return (
    <>
      {/* Original Hero Section with Villa Search */}
      <Hero />

      {/* Featured Villas for Guest Booking */}
      <FeaturedVillasBooking />

      {/* Why Book with AURA - Guest Benefits */}
      <WhyBookWithAura />

      {/* Explore Bali by Area */}
      <ExploreByArea />

      {/* Bali Experiences for Guests */}
      <BaliExperiences />

      {/* Trust Signals & Guest Reviews */}
      <TrustSignals />

      {/* WhatsApp Support Button */}
      <WhatsAppButton />
    </>
  )
}
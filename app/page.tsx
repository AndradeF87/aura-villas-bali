import { Hero } from '@/components/homepage/Hero'
import { FeaturedVillasBooking } from '@/components/homepage/FeaturedVillasBooking'
import { WhyBookWithAura } from '@/components/homepage/WhyBookWithAura'
import { ExploreByArea } from '@/components/homepage/ExploreByArea'
import { BaliExperiences } from '@/components/homepage/BaliExperiences'
import { TrustSignals } from '@/components/homepage/TrustSignals'
import { WhatsAppButton } from '@/components/homepage/WhatsAppButton'

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
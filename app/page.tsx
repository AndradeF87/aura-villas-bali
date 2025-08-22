import { Metadata } from 'next'
import { Hero } from '@/components/homepage/Hero'
import { FeaturedVillasBooking } from '@/components/homepage/FeaturedVillasBooking'
import { WhyBookWithAura } from '@/components/homepage/WhyBookWithAura'
import { ExploreByArea } from '@/components/homepage/ExploreByArea'
import { BaliExperiences } from '@/components/homepage/BaliExperiences'
import { TrustSignals } from '@/components/homepage/TrustSignals'
import { WhatsAppButton } from '@/components/homepage/WhatsAppButton'

export const metadata: Metadata = {
  title: 'AURA Villas Bali - Creating Good Memories',
  description: 'Life is all about creating good memories. Discover our exclusive collection of luxury villas where your story begins. Book your perfect Bali escape today.',
  keywords: 'luxury villas Bali, exclusive Bali villas, Uluwatu villas, Canggu villas, Seminyak villas, beachfront villas Bali, clifftop villas Bali, villa rental Bali, Bali memories, luxury accommodation Bali',
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
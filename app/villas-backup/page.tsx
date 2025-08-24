import { Metadata } from 'next'
import { Hero } from '@/components/homepage/Hero'
import { FeaturedVillasBooking } from '@/components/homepage/FeaturedVillasBooking'
import { WhyBookWithAura } from '@/components/homepage/WhyBookWithAura'
import { ExploreByArea } from '@/components/homepage/ExploreByArea'
import { BaliExperiences } from '@/components/homepage/BaliExperiences'
import { TrustSignals } from '@/components/homepage/TrustSignals'
import { WhatsAppButton } from '@/components/homepage/WhatsAppButton'

export const metadata: Metadata = {
  title: 'AURA Villas Bali - Backup Homepage',
  description: 'Backup of the guest-focused homepage. Life is all about creating good memories. Discover our exclusive collection of luxury villas where your story begins.',
}

// This is a complete backup of the original guest-focused homepage
// Created on: 2025-08-24
// Purpose: Preserve the guest booking interface before redesign

export default function VillasBackup() {
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
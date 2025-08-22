import { Hero } from '@/components/homepage/Hero'
import { FeaturedVillas } from '@/components/homepage/FeaturedVillas'
import { AuraExperience } from '@/components/homepage/AuraExperience'
import { TrustSignals } from '@/components/homepage/TrustSignals'
import { OwnerCalculator } from '@/components/homepage/OwnerCalculator'
import { WhatsAppButton } from '@/components/homepage/WhatsAppButton'

export default function Home() {
  return (
    <>
      {/* Hero Section with Search */}
      <Hero />

      {/* Featured Villa Stories */}
      <FeaturedVillas />

      {/* The AURA Experience */}
      <AuraExperience />

      {/* Trust Signals & Social Proof */}
      <TrustSignals />

      {/* Owner Benefits Calculator */}
      <OwnerCalculator />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </>
  )
}
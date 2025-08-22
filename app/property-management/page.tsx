import { Metadata } from 'next'
import { PropertyManagementHero } from '@/components/property-management/PropertyManagementHero'
import { ServiceTiers } from '@/components/property-management/ServiceTiers'
import { HowWeWork } from '@/components/property-management/HowWeWork'
import { QualificationForm } from '@/components/property-management/QualificationForm'
import { EarlyPartnerProgram } from '@/components/property-management/EarlyPartnerProgram'
import { TechnologySection } from '@/components/property-management/TechnologySection'
import { EarningsCalculator } from '@/components/property-management/EarningsCalculator'
import { WhatsAppButton } from '@/components/homepage/WhatsAppButton'

export const metadata: Metadata = {
  title: 'Selective Property Management - AURA Villas Bali',
  description: 'We partner with select Bali villa owners to tell each villa\'s unique story. Boutique management with genuine hospitality and AI-powered marketing.',
  keywords: 'boutique villa management Uluwatu, selective property management Bali, Pecatu villa management, luxury property management Bali',
}

export default function PropertyManagement() {
  return (
    <>
      {/* Hero Section with UVP */}
      <PropertyManagementHero />

      {/* Three Service Tiers */}
      <ServiceTiers />

      {/* Earnings Calculator */}
      <EarningsCalculator />

      {/* How We Work Process */}
      <HowWeWork />

      {/* Technology Section - Smart Tools, Human Touch */}
      <TechnologySection />

      {/* Early Partner Program */}
      <EarlyPartnerProgram />

      {/* Qualification Form */}
      <QualificationForm />

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </>
  )
}
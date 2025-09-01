'use client'

import { GlassmorphismLuxury } from '@/components/testui/calculators/GlassmorphismLuxury'
import { PropertyManagementHero } from '@/components/property-management/PropertyManagementHero'
import { ServiceTiers } from '@/components/property-management/ServiceTiers'
import { HowWeWork } from '@/components/property-management/HowWeWork'
import { QualificationForm } from '@/components/property-management/QualificationForm'
import { EarlyPartnerProgram } from '@/components/property-management/EarlyPartnerProgram'
import { TechnologySection } from '@/components/property-management/TechnologySection'
import { WhatsAppButton } from '@/components/homepage/WhatsAppButton'
import { TimelineNavigation } from '@/components/testui/TimelineNavigation'
import { SuccessStories } from '@/components/testui/SuccessStories'
import { ChallengesSection } from '@/components/testui/ChallengesSection'

export default function TestUI() {
  
  return (
    <>
      <style jsx global>{`
        /* Hide scrollbar for this page only */
        html:has(.testui-page) {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        html:has(.testui-page)::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none; /* WebKit */
        }
      `}</style>
      <div className="testui-page relative overflow-x-hidden">
      {/* Timeline Navigation - Fixed to right side */}
      <TimelineNavigation />
      {/* Original Design - Fixed/Static */}
      <section id="original" className="fixed top-0 left-0 right-0 min-h-screen w-full z-0">
        <GlassmorphismLuxury />
      </section>
      
      {/* Spacer to allow scrolling */}
      <div className="h-screen"></div>
      
      {/* Main Page Sections - All slide up on scroll */}
      <div className="relative z-10 bg-white">
        {/* Hero Section with UVP */}
        <PropertyManagementHero />

        {/* Success Stories Section */}
        <SuccessStories />

        {/* Challenges Section */}
        <ChallengesSection />

        {/* How We Work Process */}
        <HowWeWork />

        {/* Technology Section - Smart Tools, Human Touch */}
        <TechnologySection />

        {/* Qualification Form - Is Your Villa Right for AURA? */}
        <QualificationForm />

        {/* Three Service Tiers */}
        <ServiceTiers />

        {/* Early Partner Program */}
        <EarlyPartnerProgram />

        {/* WhatsApp Button */}
        <WhatsAppButton />
      </div>
      </div>
    </>
  )
}
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

export default function Home() {
  
  return (
    <>
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
      {/* Timeline Navigation - Fixed to right side */}
      <TimelineNavigation />
      {/* Original Design - Fixed on desktop, static on mobile */}
      <section id="original" className="md:fixed md:top-0 md:left-0 md:right-0 min-h-screen w-full md:z-0">
        <GlassmorphismLuxury />
      </section>
      
      {/* Spacer to allow scrolling - Desktop only */}
      <div className="hidden md:block h-screen"></div>
      
      {/* Main Page Sections - All slide up on scroll on desktop, normal flow on mobile */}
      <div className="relative md:z-10 bg-white">
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

        {/* WhatsApp Button */}
        <WhatsAppButton />
      </div>
      </div>
    </>
  )
}
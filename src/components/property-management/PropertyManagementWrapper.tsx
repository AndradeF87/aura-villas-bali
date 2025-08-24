'use client'

import { useState, useEffect } from 'react'
import { PropertyManagementOpening } from './PropertyManagementOpening'
import { PropertyManagementContent } from './PropertyManagementContent'
import { NavigationHeader } from '@/components/homepage/v3/NavigationHeader'
import { HamburgerMenu } from '@/components/homepage/v3/HamburgerMenu'
import { ServiceTiers } from './ServiceTiers'
import { HowWeWork } from './HowWeWork'
import { QualificationForm } from './QualificationForm'
import { EarlyPartnerProgram } from './EarlyPartnerProgram'
import { TechnologySection } from './TechnologySection'
import { EarningsCalculator } from './EarningsCalculator'
import { WhatsAppButton } from '@/components/homepage/WhatsAppButton'

export function PropertyManagementWrapper() {
  const [phase, setPhase] = useState<'intro' | 'main'>('intro')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Preload hero background image
    const img = new Image()
    img.src = '/images/Homepage-SUYAI-villa.webp'
  }, [])

  const handleOpeningComplete = () => {
    setPhase('main')
  }

  return (
    <div className="relative w-full">
      {/* Opening Sequence - Covers everything initially */}
      {phase !== 'main' && (
        <PropertyManagementOpening onComplete={handleOpeningComplete} />
      )}

      {/* Main Content - Only visible after opening */}
      {phase === 'main' && (
        <>
          {/* Hero Section with Background */}
          <div className="relative w-full h-screen overflow-hidden">
            {/* Background Image with slow zoom animation */}
            <div 
              className="absolute inset-0 animate-slow-zoom"
              style={{ 
                backgroundImage: 'url(/images/Homepage-SUYAI-villa.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                zIndex: 1,
                transform: 'scale(1)',
                transformOrigin: 'center center'
              }}
            />
            
            <div className="relative" style={{ zIndex: 10 }}>
              <PropertyManagementContent />
              <NavigationHeader onMenuClick={() => setIsMenuOpen(true)} />
            </div>
          </div>

          {/* All Other Sections */}
          <div className="relative bg-white">
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
          </div>
        </>
      )}

      {/* Full-screen Hamburger Menu */}
      {phase === 'main' && (
        <HamburgerMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
        />
      )}
    </div>
  )
}
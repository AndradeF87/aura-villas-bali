'use client'

import { useState, useEffect } from 'react'
import { OpeningSequence } from './OpeningSequence'
import { MainContent } from './MainContent'
import { HamburgerMenu } from './HamburgerMenu'
import { NavigationHeader } from './NavigationHeader'

export function HomeV3() {
  const [phase, setPhase] = useState<'intro' | 'transition' | 'main'>('intro')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Preload hero image but don't show it yet
    const img = new Image()
    img.src = '/images/Homepage-SUYAI-villa.webp'
  }, [])

  const handleOpeningComplete = () => {
    setPhase('main')
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Opening Sequence - Covers everything initially */}
      {phase !== 'main' && (
        <OpeningSequence onComplete={handleOpeningComplete} />
      )}

      {/* Main Content - Only visible after opening */}
      {phase === 'main' && (
        <>
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
            <MainContent />
            <NavigationHeader onMenuClick={() => setIsMenuOpen(true)} />
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
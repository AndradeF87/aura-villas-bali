'use client'

import { GlassmorphismLuxury } from '@/components/testui/calculators/GlassmorphismLuxury'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { PropertyManagementHero } from '@/components/property-management/PropertyManagementHero'
import { ServiceTiers } from '@/components/property-management/ServiceTiers'
import { HowWeWork } from '@/components/property-management/HowWeWork'
import { QualificationForm } from '@/components/property-management/QualificationForm'
import { EarlyPartnerProgram } from '@/components/property-management/EarlyPartnerProgram'
import { TechnologySection } from '@/components/property-management/TechnologySection'
import { EarningsCalculator } from '@/components/property-management/EarningsCalculator'
import { WhatsAppButton } from '@/components/homepage/WhatsAppButton'
import { TimelineNavigation } from '@/components/testui/TimelineNavigation'
import { SuccessStories } from '@/components/testui/SuccessStories'
import { ChallengesSection } from '@/components/testui/ChallengesSection'

export default function TestUI() {
  const [windowHeight, setWindowHeight] = useState(800) // Default height
  const [isMenuOverDark, setIsMenuOverDark] = useState(false)
  
  useEffect(() => {
    setWindowHeight(window.innerHeight)
    const handleResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Check if menu is over dark background
  useEffect(() => {
    const checkMenuBackground = () => {
      // Check if running in browser and function exists
      if (typeof window === 'undefined' || !document.elementsFromPoint) {
        return
      }
      
      // Get the menu position (updated selector for new layout)
      const menuElement = document.querySelector('.fixed.top-8')
      if (!menuElement) return
      
      const menuRect = menuElement.getBoundingClientRect()
      const menuCenterX = menuRect.left + menuRect.width / 2
      const menuCenterY = menuRect.top + menuRect.height / 2
      
      // Temporarily hide menu elements to check what's behind
      const originalPointerEvents = (menuElement as HTMLElement).style.pointerEvents
      const originalVisibility = (menuElement as HTMLElement).style.visibility;
      (menuElement as HTMLElement).style.pointerEvents = 'none';
      (menuElement as HTMLElement).style.visibility = 'hidden'
      
      let elementsAtPoint: Element[] = []
      
      try {
        // Get all elements at the menu position
        elementsAtPoint = document.elementsFromPoint(menuCenterX, menuCenterY)
      } catch (e) {
        // Fallback for older browsers
        const element = document.elementFromPoint(menuCenterX, menuCenterY)
        if (element) {
          elementsAtPoint = [element]
        }
      }
      
      // Restore menu visibility
      (menuElement as HTMLElement).style.visibility = originalVisibility;
      (menuElement as HTMLElement).style.pointerEvents = originalPointerEvents
      
      let isDark = false
      
      // Check all elements at that point for dark background
      for (const element of elementsAtPoint) {
        const styles = window.getComputedStyle(element as HTMLElement)
        const bgColor = styles.backgroundColor
        const bgImage = styles.backgroundImage
        
        // Check for dark green color (#2F4A3C) or gradient containing it
        // Also check if it's the glassmorphism section with dark gradient
        if (bgColor === 'rgb(47, 74, 60)' || // #2F4A3C in RGB
            bgImage.includes('47, 74, 60') || 
            bgImage.includes('2f4a3c') ||
            bgImage.includes('linear-gradient') && element.id === 'original' ||
            bgImage.includes('1a1a1a') || // Check for dark calculator background
            (element.classList && element.classList.toString().includes('calculator-card'))) {
          isDark = true
          break
        }
      }
      
      setIsMenuOverDark(isDark)
    }
    
    // Check on scroll and animation frame for smooth updates
    let animationFrame: number
    const handleScroll = () => {
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(checkMenuBackground)
    }
    
    window.addEventListener('scroll', handleScroll)
    checkMenuBackground() // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationFrame)
    }
  }, [])
  
  // Scroll-based animation for menu
  const { scrollY } = useScroll()
  // Fade in the nav AURA inversely with the centered one - starts immediately
  const navOpacity = useTransform(scrollY, [0, 400], [0, 1])
  // Fade in the menu background pill just before section 2 reaches it (around 80% of viewport height)
  const menuBgOpacity = useTransform(scrollY, [windowHeight * 0.8, windowHeight * 0.9], [0, 1])
  
  // Use state-based colors instead of scroll-based
  const menuTextColor = isMenuOverDark ? '#F8F4F0' : '#2F4A3C'
  const logoTextColor = isMenuOverDark ? '#F8F4F0' : '#C96F4A'
  const logoSubtitleColor = isMenuOverDark ? '#F8F4F0' : '#2F4A3C'
  
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
      
      {/* Fixed Navigation Menu - At highest level */}
      <div className="fixed top-8 left-16 right-16 z-[100] flex justify-between items-center">
        <div className="flex items-center">
          {/* AURA Logo - appears when animation completes */}
          <motion.div
            className="flex items-center space-x-2"
            style={{ 
              opacity: navOpacity
            }}
          >
            <div>
              <span 
                className="font-serif text-3xl font-bold tracking-wider transition-colors duration-300"
                style={{ color: logoTextColor }}
              >
                AURA
              </span>
              <span 
                className="text-xs tracking-[0.3em] uppercase mt-1 block transition-colors duration-300"
                style={{ color: logoSubtitleColor }}
              >
                Villas Bali
              </span>
            </div>
          </motion.div>
          
          {/* Green Circle Indicator - always visible, centered between logo and menu */}
          <div 
            className="w-4 h-4 rounded-full mx-8 transition-colors duration-300"
            style={{ 
              backgroundColor: menuTextColor // Use same color as menu text
            }}
          />
          
          {/* Menu Items Container */}
          <div className="relative">
            {/* Glassmorphic Background - appears on scroll */}
            <motion.div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `rgba(255, 255, 255, 0.1)`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                opacity: menuBgOpacity
              }}
            />
            {/* Menu Items - always visible */}
            <div className="relative flex items-center px-8 py-3">
              <button 
                className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300 mr-20"
                style={{ color: menuTextColor }}
              >
                Villas
              </button>
              <button 
                className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300 mr-20"
                style={{ color: menuTextColor }}
              >
                About Us
              </button>
              <button 
                className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300"
                style={{ color: menuTextColor }}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
        
        {/* Buy & Rent Button - Right side - Always visible */}
        <div className="relative">
          {/* Glassmorphic Background - appears on scroll */}
          <motion.div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `rgba(255, 255, 255, 0.1)`,
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              opacity: menuBgOpacity
            }}
          />
          {/* Buy & Rent Button - same style as other menu items */}
          <div className="relative flex items-center px-8 py-3">
            <button 
              className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300"
              style={{ color: menuTextColor }}
            >
              Buy & Rent
            </button>
          </div>
        </div>
      </div>
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

        {/* Three Service Tiers */}
        <ServiceTiers />

        {/* Earnings Calculator */}
        <EarningsCalculator />

        {/* Success Stories Section */}
        <SuccessStories />

        {/* Challenges Section */}
        <ChallengesSection />

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
      </div>
    </>
  )
}
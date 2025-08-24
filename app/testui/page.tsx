'use client'

import { GlassmorphismLuxury } from '@/components/testui/calculators/GlassmorphismLuxury'
import { GlassmorphismLuxuryTrial } from '@/components/testui/calculators/GlassmorphismLuxuryTrial'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function TestUI() {
  const [windowHeight, setWindowHeight] = useState(800) // Default height
  
  useEffect(() => {
    setWindowHeight(window.innerHeight)
    const handleResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Scroll-based animation for menu
  const { scrollY } = useScroll()
  // Fade in the nav AURA at the same time as the centered one fades out
  const navOpacity = useTransform(scrollY, [250, 400], [0, 1])
  // Fade in the menu background pill just before section 2 reaches it (around 80% of viewport height)
  const menuBgOpacity = useTransform(scrollY, [windowHeight * 0.8, windowHeight * 0.9], [0, 1])
  
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
      {/* Fixed Navigation Menu - At highest level */}
      <div className="fixed top-8 left-16 z-[100]">
        <div className="flex items-center gap-16">
          {/* AURA Logo - appears when animation completes */}
          <motion.div
            className="flex items-center space-x-2"
            style={{ 
              opacity: navOpacity
            }}
          >
            <div>
              <span className="font-serif text-3xl font-bold tracking-wider text-[#C96F4A]">
                AURA
              </span>
              <span className="text-xs tracking-[0.3em] uppercase mt-1 block text-[#2F4A3C]">
                Villas Bali
              </span>
            </div>
          </motion.div>
          
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
            <div className="relative flex items-center gap-12 px-8 py-3">
              <button className="text-lg font-bold text-[#2F4A3C] hover:text-[#C96F4A] transition-colors">
                Villas
              </button>
              <button className="text-lg font-bold text-[#2F4A3C] hover:text-[#C96F4A] transition-colors">
                About Us
              </button>
              <button className="text-lg font-bold text-[#2F4A3C] hover:text-[#C96F4A] transition-colors">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Original Design - Fixed/Static */}
      <section id="original" className="fixed top-0 left-0 right-0 min-h-screen w-full z-0">
        <GlassmorphismLuxury />
      </section>
      
      {/* Spacer to allow scrolling */}
      <div className="h-screen"></div>
      
      {/* Trial Design - Slides up on top */}
      <section id="trial" className="relative min-h-screen w-full z-10 bg-white">
        <GlassmorphismLuxuryTrial />
      </section>
      
      {/* Extra space to test scrolling */}
      <div className="h-screen bg-[#F8F4F0]"></div>
      </div>
    </>
  )
}
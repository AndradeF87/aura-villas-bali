'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Navigation = () => {
  const [windowHeight, setWindowHeight] = useState(800) // Default height
  const [isMenuOverDark, setIsMenuOverDark] = useState(false)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const pathname = usePathname()
  
  // Check if we're on the home page
  const isHomePage = pathname === '/'
  
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
  // For home page: Fade in the nav AURA inversely with the centered one
  // For other pages: Always show the AURA logo
  const navOpacity = useTransform(
    scrollY, 
    [0, 400], 
    isHomePage ? [0, 1] : [1, 1]
  )
  // For home page: Fade in the menu background pill at 80% viewport
  // For other pages: Show pill immediately on scroll
  const menuBgOpacity = useTransform(
    scrollY, 
    isHomePage ? [windowHeight * 0.8, windowHeight * 0.9] : [0, 20], 
    [0, 1]
  )
  
  // Use state-based colors instead of scroll-based
  const menuTextColor = isMenuOverDark ? '#F8F4F0' : '#2F4A3C'
  const logoTextColor = isMenuOverDark ? '#F8F4F0' : '#C96F4A'
  const logoSubtitleColor = isMenuOverDark ? '#F8F4F0' : '#2F4A3C'
  
  return (
    <div className="fixed top-8 left-16 right-16 z-[100] flex justify-between items-center">
      <div className="flex items-center">
        {/* AURA Logo - appears when animation completes */}
        <motion.div
          className="flex items-center space-x-2"
          style={{ 
            opacity: navOpacity
          }}
        >
          <Link href="/" className="block">
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
          </Link>
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
            <Link 
              href="/villas"
              className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300 mr-20"
              style={{ color: menuTextColor }}
            >
              Villas
            </Link>
            <Link 
              href="/about"
              className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300 mr-20"
              style={{ color: menuTextColor }}
            >
              About Us
            </Link>
            <Link 
              href="/contact"
              className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300"
              style={{ color: menuTextColor }}
            >
              Contact
            </Link>
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
            onMouseEnter={() => setShowComingSoon(true)}
            onMouseLeave={() => setShowComingSoon(false)}
            className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300"
            style={{ color: menuTextColor }}
          >
            Buy & Rent
          </button>
        </div>
        
        {/* Coming Soon Popup */}
        <AnimatePresence>
          {showComingSoon && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl px-6 py-3 z-50"
              onMouseEnter={() => setShowComingSoon(true)}
              onMouseLeave={() => setShowComingSoon(false)}
            >
              <p className="text-deep-green font-medium">Coming Soon</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
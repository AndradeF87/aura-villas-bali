'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'

export const Navigation = () => {
  const [windowHeight, setWindowHeight] = useState(800)
  const [isMenuOverDark, setIsMenuOverDark] = useState(false)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isOverWhiteBg, setIsOverWhiteBg] = useState(false)
  const pathname = usePathname()
  
  const isHomePage = pathname === '/'
  
  useEffect(() => {
    setWindowHeight(window.innerHeight)
    const handleResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])
  
  // Check if menu is over dark background
  useEffect(() => {
    const checkMenuBackground = () => {
      if (typeof window === 'undefined' || !document.elementsFromPoint) {
        return
      }
      
      const menuElement = document.querySelector('.navigation-header')
      if (!menuElement) return
      
      const menuRect = menuElement.getBoundingClientRect()
      const menuCenterX = menuRect.left + menuRect.width / 2
      const menuCenterY = menuRect.top + menuRect.height / 2
      
      const originalPointerEvents = (menuElement as HTMLElement).style.pointerEvents
      const originalVisibility = (menuElement as HTMLElement).style.visibility;
      (menuElement as HTMLElement).style.pointerEvents = 'none';
      (menuElement as HTMLElement).style.visibility = 'hidden'
      
      let elementsAtPoint: Element[] = []
      
      try {
        elementsAtPoint = document.elementsFromPoint(menuCenterX, menuCenterY)
      } catch (e) {
        console.error('elementsFromPoint not supported:', e)
      } finally {
        (menuElement as HTMLElement).style.pointerEvents = originalPointerEvents;
        (menuElement as HTMLElement).style.visibility = originalVisibility
      }
      
      let isDark = false
      let isWhite = false
      
      for (const element of elementsAtPoint) {
        if (element === menuElement || menuElement.contains(element)) {
          continue
        }
        
        const computedStyle = window.getComputedStyle(element)
        const bgColor = computedStyle.backgroundColor
        const bgImage = computedStyle.backgroundImage
        
        // Check for white/light backgrounds including sand/beige gradients
        if (element.classList.contains('bg-white') ||
            element.classList.contains('bg-sand-light') ||
            element.classList.contains('bg-sand') ||
            element.classList.contains('bg-cream') ||
            element.classList.contains('bg-warm-ivory') ||
            element.classList.contains('from-sand') ||
            element.classList.contains('to-sand-light') ||
            element.classList.contains('from-sand-light') ||
            element.classList.contains('to-sand') ||
            bgColor === 'rgb(255, 255, 255)' || 
            bgColor === 'rgba(255, 255, 255, 1)' ||
            // Check for sand color RGB values (approximately)
            bgColor === 'rgb(251, 247, 242)' ||
            bgColor === 'rgba(251, 247, 242, 1)' ||
            // Check for light colors with high RGB values
            (bgColor && bgColor.startsWith('rgb') && 
             bgColor.match(/\d+/g) && 
             bgColor.match(/\d+/g).length >= 3 &&
             bgColor.match(/\d+/g).slice(0, 3).every(val => parseInt(val) > 230))) {
          isWhite = true
          // Don't break - check if there's a dark background on top
        }
        
        // Check for dark backgrounds (these take priority)
        if (element.classList.contains('glassmorphism-section') || 
            element.classList.contains('bg-deep-green') ||
            element.classList.contains('bg-[#2F4A3C]') ||
            element.classList.contains('dark-section') ||
            bgColor === 'rgb(47, 74, 60)' ||
            bgColor === 'rgba(47, 74, 60, 1)' ||
            (bgImage && bgImage !== 'none')) {
          isDark = true
          isWhite = false // Dark takes priority
          break
        }
      }
      
      setIsMenuOverDark(isDark)
      setIsOverWhiteBg(isWhite)
    }
    
    checkMenuBackground()
    window.addEventListener('scroll', checkMenuBackground)
    window.addEventListener('resize', checkMenuBackground)
    
    const observer = new MutationObserver(checkMenuBackground)
    observer.observe(document.body, { childList: true, subtree: true })
    
    return () => {
      window.removeEventListener('scroll', checkMenuBackground)
      window.removeEventListener('resize', checkMenuBackground)
      observer.disconnect()
    }
  }, [])
  
  const { scrollY } = useScroll()
  const navOpacity = useTransform(
    scrollY, 
    [0, 400], 
    isHomePage ? [0, 1] : [1, 1]
  )
  const menuBgOpacity = useTransform(
    scrollY, 
    isHomePage ? [windowHeight * 0.8, windowHeight * 0.9] : [0, 20], 
    [0, 1]
  )
  
  const menuTextColor = isMenuOverDark ? '#F8F4F0' : '#2F4A3C'
  const logoTextColor = isOverWhiteBg ? '#C96F4A' : (isMenuOverDark ? '#F8F4F0' : '#C96F4A')
  const logoSubtitleColor = isOverWhiteBg ? '#2F4A3C' : (isMenuOverDark ? '#F8F4F0' : '#2F4A3C')
  const hamburgerColor = isOverWhiteBg ? '#C96F4A' : (isMenuOverDark ? '#F8F4F0' : '#2F4A3C')
  
  return (
    <>
      {/* Desktop Navigation */}
      <div className="navigation-header fixed top-4 md:top-8 left-4 md:left-16 right-4 md:right-16 z-[100] hidden md:flex justify-between items-center">
        <div className="flex items-center">
          {/* AURA Logo */}
          <motion.div
            className="flex items-center space-x-2"
            style={{ opacity: navOpacity }}
          >
            <Link href="/" className="block">
              <div>
                <span 
                  className="font-serif text-2xl md:text-3xl font-bold tracking-wider transition-colors duration-300"
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
          
          {/* Green Circle Indicator */}
          <div 
            className="w-4 h-4 rounded-full mx-8 transition-colors duration-300"
            style={{ backgroundColor: menuTextColor }}
          />
          
          {/* Menu Items Container */}
          <div className="relative">
            {/* Glassmorphic Background */}
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
            {/* Menu Items */}
            <div className="relative flex items-center px-8 py-3">
              <Link 
                href="/villas"
                className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300 mr-20 relative group"
                style={{ color: menuTextColor }}
              >
                Villas
                <span 
                  className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: menuTextColor }}
                />
              </Link>
              <Link 
                href="/about"
                className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300 mr-20 relative group"
                style={{ color: menuTextColor }}
              >
                About Us
                <span 
                  className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: menuTextColor }}
                />
              </Link>
              <Link 
                href="/contact"
                className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300 relative group"
                style={{ color: menuTextColor }}
              >
                Contact
                <span 
                  className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: menuTextColor }}
                />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Buy & Rent Button - Desktop */}
        <div className="relative">
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
          <div className="relative flex items-center px-8 py-3">
            <button 
              onMouseEnter={() => setShowComingSoon(true)}
              onMouseLeave={() => setShowComingSoon(false)}
              className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300 relative group"
              style={{ color: menuTextColor }}
            >
              Buy & Rent
              <span 
                className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: menuTextColor }}
              />
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

      {/* Mobile Navigation */}
      <div className="navigation-header fixed top-0 left-0 right-0 z-[100] md:hidden">
        {/* Mobile Nav Background - appears on scroll */}
        <motion.div 
          className="absolute inset-0 bg-deep-green shadow-lg"
          style={{ opacity: menuBgOpacity }}
        />
        
        {/* Mobile Nav Content */}
        <div className="relative flex justify-between items-center px-4 py-4">
          {/* Mobile Logo - Always Orange */}
          <motion.div
            style={{ opacity: isHomePage ? navOpacity : 1 }}
          >
            <Link href="/" className="block">
              <div>
                <span 
                  className="font-serif text-2xl font-bold tracking-wider text-[#C96F4A]"
                >
                  AURA
                </span>
                <span 
                  className="text-[10px] tracking-[0.2em] uppercase block text-white"
                >
                  Villas Bali
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Modern Hamburger Menu Button - Always Orange */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative p-3 transition-all duration-300"
            style={{ 
              minWidth: '44px',
              minHeight: '44px'
            }}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              {mobileMenuOpen ? (
                <X size={24} className="absolute top-0 left-0 text-[#C96F4A]" />
              ) : (
                <>
                  <span 
                    className="block h-0.5 w-6 bg-[#C96F4A] transition-all duration-300"
                  />
                  <span 
                    className="block h-0.5 w-4 bg-[#C96F4A] transition-all duration-300 ml-auto"
                  />
                  <span 
                    className="block h-0.5 w-5 bg-[#C96F4A] transition-all duration-300 ml-auto"
                  />
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 z-[99] md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Menu Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div>
                  <span className="font-serif text-2xl font-bold text-[#C96F4A] tracking-wider">
                    AURA
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase block text-deep-green mt-1">
                    Villas Bali
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-gray-50 min-w-[44px] min-h-[44px]"
                  aria-label="Close menu"
                >
                  <X size={24} className="text-deep-green" />
                </button>
              </div>

              {/* Mobile Menu Links */}
              <nav className="p-6">
                <Link
                  href="/villas"
                  className="block py-4 text-xl font-semibold text-deep-green hover:text-[#C96F4A] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Villas
                </Link>
                <Link
                  href="/about"
                  className="block py-4 text-xl font-semibold text-deep-green hover:text-[#C96F4A] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="block py-4 text-xl font-semibold text-deep-green hover:text-[#C96F4A] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <button
                  className="block w-full text-left py-4 text-xl font-semibold text-deep-green hover:text-[#C96F4A] transition-colors"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    // Show coming soon toast or modal
                    alert('Coming Soon')
                  }}
                >
                  Buy & Rent
                  <span className="text-sm text-gray-500 block mt-1">Coming Soon</span>
                </button>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 text-center">
                  © 2025 AURA Villas Bali
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
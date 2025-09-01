'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X } from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'
import type { Locale } from '@/lib/i18n/config'
import { i18n } from '@/lib/i18n/config'
import Image from 'next/image'

interface NavigationProps {
  locale?: Locale
  dictionary?: any
}

export const Navigation = ({ locale = 'en', dictionary }: NavigationProps) => {
  const [windowHeight, setWindowHeight] = useState(800)
  const [isMenuOverDark, setIsMenuOverDark] = useState(false)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isOverWhiteBg, setIsOverWhiteBg] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [showGreenBar, setShowGreenBar] = useState(false)
  const pathname = usePathname()
  
  // Helper function to get locale-aware paths
  const getLocalePath = (path: string) => {
    if (locale === i18n.defaultLocale) {
      return path
    }
    return `/${locale}${path}`
  }
  
  const isHomePage = pathname === '/' || pathname === `/${locale}`
  const isAboutPage = pathname === getLocalePath('/about')
  const isContactPage = pathname === getLocalePath('/contact')
  const isVillasPage = pathname === getLocalePath('/villas')
  const isPricingPage = pathname === getLocalePath('/pricing')
  
  useEffect(() => {
    setWindowHeight(window.innerHeight)
    const handleResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Check scroll position for mobile logo and green bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setHasScrolled(scrollPosition > 50)
      
      // Check if PropertyManagementHero section is in view
      // It's typically the second section, so check after first viewport height
      setShowGreenBar(scrollPosition > windowHeight)
    }
    
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [windowHeight])
  
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
      if (isPricingPage) {
        setIsMenuOverDark(false)
        setIsOverWhiteBg(true)
        return
      }
      
      if (typeof window === 'undefined' || !document.elementsFromPoint) {
        return
      }
      
      const navElement = document.querySelector('.navigation-header')
      if (!navElement) return
      
      const rect = navElement.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const topY = rect.top + 10
      
      const elements = document.elementsFromPoint(centerX, topY) || []
      
      let isDark = false
      let isWhite = false
      
      for (const element of elements) {
        if (element === navElement || navElement.contains(element)) continue
        
        const computedStyle = window.getComputedStyle(element)
        const bgColor = computedStyle.backgroundColor
        const bgImage = computedStyle.backgroundImage
        
        // Check for white/light backgrounds
        if (element.classList.contains('bg-white') ||
            element.classList.contains('bg-sand') ||
            element.classList.contains('bg-sand-light') ||
            element.classList.contains('bg-cream') ||
            element.classList.contains('bg-warm-ivory') ||
            element.classList.contains('from-sand') ||
            element.classList.contains('to-sand-light') ||
            element.classList.contains('from-sand-light') ||
            element.classList.contains('to-sand') ||
            bgColor === 'rgb(255, 255, 255)' || 
            bgColor === 'rgba(255, 255, 255, 1)' ||
            bgColor === 'rgb(251, 247, 242)' ||
            bgColor === 'rgba(251, 247, 242, 1)' ||
            (bgColor && bgColor.startsWith('rgb') && 
             bgColor.match(/\d+/g) && 
             bgColor.match(/\d+/g).length >= 3 &&
             bgColor.match(/\d+/g).slice(0, 3).every(val => parseInt(val) > 230))) {
          isWhite = true
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
  }, [isPricingPage])
  
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
  
  // Ensure hydration compatibility
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const shouldStartDark = (isAboutPage || isContactPage || isVillasPage || isPricingPage) && !isMenuOverDark
  
  const menuTextColor = isMenuOverDark ? '#F8F4F0' : '#2F4A3C'
  const hamburgerColor = (shouldStartDark || isOverWhiteBg) && !isMenuOverDark ? '#C96F4A' : (isMenuOverDark ? '#F8F4F0' : '#2F4A3C')
  
  // Determine which logo to use based on background
  const useWhiteLogo = isMenuOverDark
  
  return (
    <>
      {/* Desktop Navigation */}
      <div className="navigation-header fixed top-4 md:top-8 left-4 md:left-16 right-4 md:right-16 z-[100] hidden md:flex justify-between items-center">
        <div className="flex items-center">
          {/* AURA Logo */}
          <motion.div
            className="flex items-center space-x-2"
            style={{ opacity: isMounted ? navOpacity : 1 }}
          >
            <Link href={getLocalePath('/')} className="block">
              <Image
                src={useWhiteLogo ? '/images/logo-white-desktop.svg' : '/images/logo-colored-desktop.svg'}
                alt="AURA Villas Bali"
                width={134}
                height={60}
                className="h-10 md:h-12 w-auto transition-opacity duration-300"
                priority
              />
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
                opacity: isMounted ? menuBgOpacity : 0
              }}
            />
            {/* Menu Items */}
            <div className="relative flex items-center px-8 py-3">
              <Link 
                href={getLocalePath('/villas')}
                className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300 mr-20 relative group"
                style={{ color: menuTextColor }}
              >
                {dictionary?.navigation?.villas || 'Villas'}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: menuTextColor }}
                />
              </Link>
              <Link 
                href={getLocalePath('/pricing')}
                className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300 mr-20 relative group"
                style={{ color: menuTextColor }}
              >
                {dictionary?.navigation?.pricing || 'Pricing'}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: menuTextColor }}
                />
              </Link>
              <Link 
                href={getLocalePath('/about')}
                className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300 mr-20 relative group"
                style={{ color: menuTextColor }}
              >
                {dictionary?.navigation?.about || 'About Us'}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: menuTextColor }}
                />
              </Link>
              <Link 
                href={getLocalePath('/contact')}
                className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300 mr-8 relative group"
                style={{ color: menuTextColor }}
              >
                {dictionary?.navigation?.contact || 'Contact'}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: menuTextColor }}
                />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right Side - Language and Buy & Rent separated */}
        <div className="flex items-center gap-4">
          {/* Language Switcher - Round */}
          <div className="relative">
            <motion.div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `rgba(255, 255, 255, 0.1)`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                opacity: isMounted ? menuBgOpacity : 0
              }}
            />
            <div className="relative p-3">
              <LanguageSwitcher currentLocale={locale} color={menuTextColor} />
            </div>
          </div>
          
          {/* Buy & Rent Button - Pill */}
          <div className="relative">
            <motion.div 
              className="absolute inset-0 rounded-full"
              style={{
                background: `rgba(255, 255, 255, 0.1)`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                opacity: isMounted ? menuBgOpacity : 0
              }}
            />
            <div className="relative px-8 py-3">
              <button 
                onClick={() => setShowComingSoon(true)}
                className="text-lg font-bold hover:text-[#C96F4A] transition-colors duration-300 relative group"
                style={{ color: menuTextColor }}
              >
                {dictionary?.navigation?.buyRent || 'Buy & Rent'}
                <span 
                  className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full"
                  style={{ backgroundColor: menuTextColor }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Green background bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-20 bg-deep-green z-[99]"
          initial={{ opacity: 0 }}
          animate={{ opacity: showGreenBar ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="navigation-header fixed top-4 left-4 right-4 z-[100] flex justify-between items-center">
          <motion.div
            style={{ opacity: isMounted && (isHomePage ? hasScrolled : true) ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={getLocalePath('/')} className="block">
              <Image
                src={showGreenBar ? '/images/logo-white-mobile.svg' : '/images/logo-colored-mobile.svg'}
                alt="AURA Villas Bali"
                width={94}
                height={42}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </motion.div>
          
          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} color="#C96F4A" />
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="flex flex-col justify-center items-center w-10 h-10 p-1"
            >
              <span 
                className="block w-7 h-[3px] bg-terracotta rounded-full transition-all duration-300"
              />
              <span 
                className="block w-7 h-[3px] bg-terracotta rounded-full transition-all duration-300 my-1"
              />
              <span 
                className="block w-5 h-[3px] bg-terracotta rounded-full transition-all duration-300 ml-auto"
              />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        {isMounted && (
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                className="fixed inset-0 bg-white z-[200] overflow-y-auto"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              >
              <div className="p-6">
                <div className="flex justify-between items-start mb-12">
                  <Link href={getLocalePath('/')} className="block">
                    <Image
                      src="/images/logo-colored-mobile.svg"
                      alt="AURA Villas Bali"
                      width={94}
                      height={42}
                      className="h-12 w-auto"
                      priority
                    />
                  </Link>
                  
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#2F4A3C] hover:text-[#C96F4A] transition-colors"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>
                
                <nav className="space-y-8">
                  <Link 
                    href={getLocalePath('/')}
                    className="block text-2xl font-bold text-[#2F4A3C] hover:text-[#C96F4A] transition-colors"
                  >
                    {dictionary?.navigation?.home || 'Home'}
                  </Link>
                  <Link 
                    href={getLocalePath('/villas')}
                    className="block text-2xl font-bold text-[#2F4A3C] hover:text-[#C96F4A] transition-colors"
                  >
                    {dictionary?.navigation?.villas || 'Villas'}
                  </Link>
                  <Link 
                    href={getLocalePath('/pricing')}
                    className="block text-2xl font-bold text-[#2F4A3C] hover:text-[#C96F4A] transition-colors"
                  >
                    {dictionary?.navigation?.pricing || 'Pricing'}
                  </Link>
                  <Link 
                    href={getLocalePath('/about')}
                    className="block text-2xl font-bold text-[#2F4A3C] hover:text-[#C96F4A] transition-colors"
                  >
                    {dictionary?.navigation?.about || 'About Us'}
                  </Link>
                  <Link 
                    href={getLocalePath('/contact')}
                    className="block text-2xl font-bold text-[#2F4A3C] hover:text-[#C96F4A] transition-colors"
                  >
                    {dictionary?.navigation?.contact || 'Contact'}
                  </Link>
                  
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setShowComingSoon(true)
                    }}
                    className="w-full px-8 py-4 bg-[#C96F4A] text-white rounded-full font-bold hover:bg-[#B85A35] transition-colors text-xl"
                  >
                    {dictionary?.navigation?.buyRent || 'Buy & Rent'}
                  </button>
                </nav>
              </div>
            </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
      
      {/* Coming Soon Modal */}
      {isMounted && (
        <AnimatePresence>
          {showComingSoon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[300] flex items-center justify-center p-4"
            onClick={() => setShowComingSoon(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-serif text-3xl text-deep-green mb-4">{dictionary?.navigation?.comingSoon || 'Coming Soon!'}</h3>
              <p className="text-deep-green/80 mb-6">
                {dictionary?.navigation?.bookingSystemMessage || 'Our booking system is currently being perfected to provide you with the best experience. Please contact us directly for reservations.'}
              </p>
              <div className="flex gap-3">
                <Link
                  href={getLocalePath('/contact')}
                  className="flex-1 px-6 py-3 bg-terracotta text-white rounded-full font-semibold hover:bg-terracotta-dark transition-colors text-center"
                  onClick={() => setShowComingSoon(false)}
                >
                  {dictionary?.navigation?.contactUs || 'Contact Us'}
                </Link>
                <button
                  onClick={() => setShowComingSoon(false)}
                  className="flex-1 px-6 py-3 bg-sand text-deep-green rounded-full font-semibold hover:bg-sand/80 transition-colors"
                >
                  {dictionary?.common?.close || 'Close'}
                </button>
              </div>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  )
}
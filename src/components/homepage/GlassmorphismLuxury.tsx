'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { EarningsDisplay } from './EarningsDisplay'
import { useTranslation } from '@/contexts/TranslationContext'
import Image from 'next/image'

export function GlassmorphismLuxury() {
  const { dictionary } = useTranslation()
  const [step, setStep] = useState(1)
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState('')
  const [villaCategory, setVillaCategory] = useState('')
  const [amenities, setAmenities] = useState<string[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const [hasHiddenScrollIndicator, setHasHiddenScrollIndicator] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [strategy, setStrategy] = useState('Balanced')
  const [showMobileForm, setShowMobileForm] = useState(false)
  
  // Auto-hide scroll indicator after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false)
      setHasHiddenScrollIndicator(true)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])
  
  const locations = ['Canggu', 'Seminyak', 'Uluwatu']
  const bedroomOptions = ['1', '2', '3+']
  
  // Scroll-based animation
  const { scrollY } = useScroll()
  
  // Start fading out immediately on scroll, complete by 400px
  const animatedOpacity = useTransform(scrollY, [0, 400], [1, 0])
  
  // Fade out the subtitle at the same rate
  const subtitleOpacity = useTransform(scrollY, [0, 400], [1, 0])
  
  // Fade in the nav AURA inversely - as center fades out, nav fades in
  const navOpacity = useTransform(scrollY, [0, 400], [0, 1])
  
  // Hide scroll indicator once user starts scrolling (permanently)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50 && !hasHiddenScrollIndicator) {
        setShowScrollIndicator(false)
        setHasHiddenScrollIndicator(true)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasHiddenScrollIndicator])

  const handleLocationSelect = (loc: string) => {
    setLocation(loc)
    setStep(2)
  }
  
  const handleBedroomSelect = (beds: string) => {
    setBedrooms(beds)
    setStep(3)
  }
  
  const calculateEarnings = () => {
    // Base rates by location
    const locationRates: { [key: string]: number } = {
      'Canggu': 1.0,
      'Seminyak': 1.2,
      'Uluwatu': 1.3
    }
    
    // Base rates by villa category
    const categoryRates: { [key: string]: number } = {
      'premium': 400,
      'luxury': 800,
      'ultra-luxury': 1500
    }
    
    const baseRate = categoryRates[villaCategory] || 400
    const locationMultiplier = locationRates[location] || 1.0
    const nightlyRate = Math.round(baseRate * locationMultiplier)
    const monthlyEarnings = nightlyRate * 20 // Assuming 20 nights/month occupancy
    const yearlyEarnings = monthlyEarnings * 12
    
    return {
      nightly: nightlyRate,
      monthly: monthlyEarnings,
      yearly: yearlyEarnings
    }
  }

  return (
    <div id="calculator-section" className="h-screen w-full fixed top-0 left-0 overflow-hidden flex" style={{ backgroundColor: '#F8F4F0', zIndex: 0 }}>
      {/* Style tag for animations */}
      <style jsx>{`
        @keyframes sheen {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .calculator-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.07) 50%,
            transparent 60%
          );
          animation: sheen 4s infinite;
          pointer-events: none;
        }
        
        .location-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.05),
            transparent
          );
          transition: left 0.5s;
        }
        
        .location-button:hover::before {
          left: 100%;
        }
      `}</style>

      {/* Left Side - AURA Branding - Hidden on mobile */}
      <div className="hidden md:flex absolute left-0 top-0 h-full w-2/5 flex-col items-center justify-center z-10">
        <motion.div 
          className="mb-3"
          style={{
            opacity: animatedOpacity
          }}
        >
          <Image
            src="/images/AURA-logo (400 x 180 px).svg"
            alt="AURA"
            width={400}
            height={180}
            className="w-auto h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32"
            priority
          />
        </motion.div>
        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#2F4A3C] font-bold"
          style={{ opacity: subtitleOpacity }}
        >
          {dictionary?.calculator?.subtitle || 'Property Management Bali'}
        </motion.p>
      </div>

      {/* Calculator Container - Full height on mobile, centered on desktop */}
      <motion.div 
        className="h-screen md:h-full w-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="relative w-full flex justify-center">
          <div 
            className="calculator-card relative w-full md:w-[450px] md:max-w-[450px] h-screen md:h-auto p-6 sm:p-8 lg:p-[50px] md:rounded-[20px] overflow-hidden md:border md:border-black/50 z-20"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2F4A3C 40%, #1a1a1a 100%)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.5)'
            }}
          >
          {/* AURA branding for mobile - visible only on mobile with fade effect */}
          <motion.div 
            className="block md:hidden mb-6"
            style={{ opacity: subtitleOpacity }}
          >
            <div className="mb-2">
              <Image
                src="/images/AURA-logo (400 x 180 px).svg"
                alt="AURA"
                width={400}
                height={180}
                className="w-auto h-12"
                priority
              />
            </div>
            <p className="text-sm text-[#F8F4F0] opacity-80">{dictionary?.calculator?.subtitle || 'Gestión de Propiedades en Bali'}</p>
            <div className="w-full h-[1px] bg-[#C96F4A] mt-4 mb-6"></div>
          </motion.div>

          {/* AURA watermark - hidden on mobile */}
          <div 
            className="hidden md:block absolute top-5 right-10 text-[14px] tracking-[4px]"
            style={{
              color: 'rgba(212,175,55,0.3)',
              textShadow: '0 1px 0 rgba(255,255,255,0.1), 0 -1px 0 rgba(0,0,0,0.5)'
            }}
          >
            AURA
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-3 md:gap-5 mb-6 md:mb-[35px]">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  step >= num 
                    ? 'bg-[#C96F4A] border-[#C96F4A] text-white shadow-[0_0_10px_rgba(201,111,74,0.3)]' 
                    : 'border-[rgba(255,255,255,0.3)] text-[rgba(255,255,255,0.5)]'
                }`}
              >
                {num}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 
                  className="text-3xl md:text-[32px] text-white text-center mb-3 leading-[1.2] font-serif"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1)'
                  }}
                >
                  {dictionary?.calculator?.title || 'Estimate Your'}<br/>
                  <span className="text-[#C96F4A] text-[34px] md:text-[32px]">{dictionary?.calculator?.titleHighlight || 'Rental Income'}</span>
                </h2>
                <p className="text-sm md:text-[15px] text-[rgba(255,255,255,0.8)] text-center mb-6 md:mb-[35px]">
                  {dictionary?.calculator?.step1Description || 'Where is your villa located?'}
                </p>
                
                <div className="space-y-3 md:space-y-[15px] overflow-y-auto max-h-[40vh] md:max-h-none">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleLocationSelect(loc)}
                      className="location-button relative w-full p-4 md:p-5 rounded-xl text-white text-lg md:text-[17px] font-medium cursor-pointer transition-all duration-300 overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                        border: '1px solid rgba(212,175,55,0.2)',
                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 5px rgba(0,0,0,0.2)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 100%)'
                        e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'
                        e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(212,175,55,0.2), 0 4px 10px rgba(0,0,0,0.3)'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                        e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'
                        e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 5px rgba(0,0,0,0.2)'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <div className="font-serif">{loc}</div>
                      <small className="block text-[13px] text-[rgba(255,255,255,0.6)] mt-1">{dictionary?.calculator?.premiumLocation || 'Premium Location'}</small>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 
                  className="text-2xl md:text-[32px] text-white text-center mb-3 leading-[1.2] font-serif"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1)'
                  }}
                >
                  {dictionary?.calculator?.villaCategory || 'Villa'}<br/>
                  <span className="text-[#C96F4A]">{dictionary?.calculator?.category || 'Category'}</span>
                </h2>
                <p className="text-sm md:text-[15px] text-[rgba(255,255,255,0.8)] text-center mb-6 md:mb-[35px]">
                  {dictionary?.calculator.selectCategory || 'Select your villa category'}
                </p>
                
                <div className="space-y-3">
                  {/* Standard - Disabled */}
                  <div
                    className="relative w-full p-4 rounded-xl text-white opacity-50 cursor-not-allowed"
                    style={{
                      background: 'linear-gradient(135deg, rgba(100,100,100,0.05) 0%, rgba(100,100,100,0.02) 100%)',
                      border: '1px solid rgba(100,100,100,0.2)',
                    }}
                  >
                    <div className="font-serif text-lg">{dictionary?.calculator.categories.standard?.name || 'Standard'}</div>
                    <small className="block text-[13px] text-[rgba(255,255,255,0.4)] mt-1">{dictionary?.calculator.categories.standard?.description || 'Not available for AURA management'}</small>
                  </div>

                  {/* Premium */}
                  <button
                    onClick={() => {
                      setVillaCategory('premium')
                      setStep(3)
                    }}
                    className="location-button relative w-full p-4 rounded-xl text-white cursor-pointer transition-all duration-300 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                      border: '1px solid rgba(212,175,55,0.2)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 5px rgba(0,0,0,0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 100%)'
                      e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                      e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div className="font-serif text-lg">{dictionary?.calculator.categories.premium?.name || 'Premium'}</div>
                    <small className="block text-[13px] text-[rgba(255,255,255,0.6)] mt-1">{dictionary?.calculator.categories.premium?.description || 'High-quality villas with modern amenities'}</small>
                  </button>

                  {/* Luxury */}
                  <button
                    onClick={() => {
                      setVillaCategory('luxury')
                      setStep(3)
                    }}
                    className="location-button relative w-full p-4 rounded-xl text-white cursor-pointer transition-all duration-300 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                      border: '1px solid rgba(212,175,55,0.2)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 5px rgba(0,0,0,0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 100%)'
                      e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                      e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div className="font-serif text-lg">{dictionary?.calculator.categories.luxury?.name || 'Luxury'}</div>
                    <small className="block text-[13px] text-[rgba(255,255,255,0.6)] mt-1">{dictionary?.calculator.categories.luxury?.description || 'Exceptional properties with premium features'}</small>
                  </button>

                  {/* Ultra-Luxury */}
                  <button
                    onClick={() => {
                      setVillaCategory('ultra-luxury')
                      setStep(3)
                    }}
                    className="location-button relative w-full p-4 rounded-xl text-white cursor-pointer transition-all duration-300 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                      border: '1px solid rgba(212,175,55,0.2)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 5px rgba(0,0,0,0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.05) 100%)'
                      e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                      e.currentTarget.style.borderColor = 'rgba(212,175,55,0.2)'
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div className="font-serif text-lg">{dictionary?.calculator.categories.ultraLuxury?.name || 'Ultra-Luxury'}</div>
                    <small className="block text-[13px] text-[rgba(255,255,255,0.6)] mt-1">{dictionary?.calculator.categories.ultraLuxury?.description || 'Elite estates with world-class amenities'}</small>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h2 
                  className="text-2xl md:text-[32px] text-white text-center mb-3 leading-[1.2] font-serif"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1)'
                  }}
                >
                  {dictionary?.calculator.propertyDetails || 'Property'}<br/>
                  <span className="text-[#C96F4A]">{dictionary?.calculator.details || 'Details'}</span>
                </h2>
                <p className="text-sm md:text-[15px] text-[rgba(255,255,255,0.8)] text-center mb-6 md:mb-[35px]">
                  {dictionary?.calculator.bedroomsAmenities || 'Number of bedrooms and amenities'}
                </p>
                
                {/* Bedrooms Selection */}
                <div className="mb-6">
                  <p className="text-white text-sm mb-3 opacity-80">{dictionary?.calculator.bedrooms || 'Bedrooms'}:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {bedroomOptions.map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setBedrooms(num)
                        }}
                        className="p-3 rounded-lg text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
                        style={{
                          background: bedrooms === num
                            ? 'linear-gradient(135deg, #C96F4A 0%, #B85E3A 100%)'
                            : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                          border: bedrooms === num 
                            ? '1px solid #C96F4A'
                            : '1px solid rgba(212,175,55,0.2)',
                          boxShadow: bedrooms === num
                            ? '0 4px 15px rgba(201,111,74,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                            : 'inset 0 1px 0 rgba(255,255,255,0.05)',
                        }}
                        onMouseEnter={(e) => {
                          if (bedrooms !== num) {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)'
                            e.currentTarget.style.transform = 'translateY(-2px)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (bedrooms !== num) {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                            e.currentTarget.style.transform = 'translateY(0)'
                          }
                        }}
                      >
                        <div className="text-lg font-serif">{num}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <p className="text-white text-sm mb-3 opacity-80">{dictionary?.calculator.selectAmenities || 'Select amenities'}:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      dictionary?.calculator.amenities?.privatePool || 'Private Pool',
                      dictionary?.calculator.amenities?.oceanView || 'Ocean View',
                      dictionary?.calculator.amenities?.beachAccess || 'Beach Access',
                      dictionary?.calculator.amenities?.chefService || 'Chef Service'
                    ].map((amenity) => (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => {
                          setAmenities(prev => 
                            prev.includes(amenity) 
                              ? prev.filter(a => a !== amenity)
                              : [...prev, amenity]
                          )
                        }}
                        className={`p-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                          amenities.includes(amenity)
                            ? 'bg-[#C96F4A] text-white border-2 border-[#C96F4A] shadow-[0_0_10px_rgba(201,111,74,0.3)]'
                            : 'bg-[rgba(255,255,255,0.05)] text-white border border-[rgba(212,175,55,0.2)] hover:border-[#C96F4A] hover:bg-[rgba(201,111,74,0.1)]'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!bedrooms) {
                      alert(dictionary?.calculator.selectBedroomsError || 'Please select the number of bedrooms');
                      return;
                    }
                    setStep(4);
                  }}
                  className="w-full py-4 rounded-xl text-white font-medium transition-all duration-300"
                  style={{
                    background: !bedrooms 
                      ? 'linear-gradient(135deg, #999 0%, #777 100%)' 
                      : 'linear-gradient(135deg, #C96F4A 0%, #D4AF37 100%)',
                    boxShadow: '0 4px 10px rgba(201,111,74,0.3)',
                    cursor: !bedrooms ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    if (bedrooms) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 6px 15px rgba(201,111,74,0.4)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (bedrooms) {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 10px rgba(201,111,74,0.3)'
                    }
                  }}
                >
                  {dictionary?.calculator.getEstimate || 'Get My Earnings Estimate'} →
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <h2 
                  className="text-2xl md:text-[32px] text-white text-center mb-3 leading-[1.2] font-serif"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1)'
                  }}
                >
                  {dictionary?.calculator.results?.yourVilla || "Your Villa's"}<br/>
                  <span className="text-[#C96F4A]">{dictionary?.calculator.results?.earningPotential || 'Earning Potential'}</span>
                </h2>
                
                <p className="text-sm text-[rgba(255,255,255,0.8)] text-center mb-4">
                  {villaCategory === 'premium' ? (dictionary?.calculator.categories?.premium?.name || 'Premium') : 
                   villaCategory === 'luxury' ? (dictionary?.calculator.categories?.luxury?.name || 'Luxury') : 
                   (dictionary?.calculator.categories?.ultraLuxury?.name || 'Ultra-Luxury')} {dictionary?.calculator.villaIn || 'villa in'} {location} {dictionary?.calculator.withBedrooms || 'with'} {bedrooms} {bedrooms === 1 ? (dictionary?.calculator.bedroom || 'bedroom') : (dictionary?.calculator.bedroomsPlural || 'bedrooms')}
                </p>
                
                {/* Strategy Selector */}
                <div className="mb-6">
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => setStrategy('Occupancy Focused')}
                      className="relative px-4 py-3 rounded-xl text-white text-sm font-medium transition-all duration-300"
                      style={{
                        background: strategy === 'Occupancy Focused' 
                          ? 'linear-gradient(135deg, #C96F4A 0%, #B85E3A 100%)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                        border: strategy === 'Occupancy Focused'
                          ? '1px solid rgba(201,111,74,0.4)'
                          : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: strategy === 'Occupancy Focused'
                          ? 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 5px rgba(0,0,0,0.3)'
                          : 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 5px rgba(0,0,0,0.2)',
                        transform: strategy === 'Occupancy Focused' ? 'translateY(-1px)' : 'translateY(0)'
                      }}
                      onMouseEnter={(e) => {
                        if (strategy !== 'Occupancy Focused') {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)'
                          e.currentTarget.style.transform = 'translateY(-1px)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (strategy !== 'Occupancy Focused') {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                          e.currentTarget.style.transform = 'translateY(0)'
                        }
                      }}
                    >
                      {dictionary?.calculator.strategies?.occupancyFocused || 'Occupancy Focused'}
                    </button>
                    <button
                      onClick={() => setStrategy('Balanced')}
                      className="relative px-4 py-3 rounded-xl text-white text-sm font-medium transition-all duration-300"
                      style={{
                        background: strategy === 'Balanced' 
                          ? 'linear-gradient(135deg, #C96F4A 0%, #B85E3A 100%)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                        border: strategy === 'Balanced'
                          ? '1px solid rgba(201,111,74,0.4)'
                          : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: strategy === 'Balanced'
                          ? 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 5px rgba(0,0,0,0.3)'
                          : 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 5px rgba(0,0,0,0.2)',
                        transform: strategy === 'Balanced' ? 'translateY(-1px)' : 'translateY(0)'
                      }}
                      onMouseEnter={(e) => {
                        if (strategy !== 'Balanced') {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)'
                          e.currentTarget.style.transform = 'translateY(-1px)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (strategy !== 'Balanced') {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                          e.currentTarget.style.transform = 'translateY(0)'
                        }
                      }}
                    >
                      {dictionary?.calculator.strategies?.balanced || 'Balanced'}
                    </button>
                    <button
                      onClick={() => setStrategy('Revenue Focused')}
                      className="relative px-4 py-3 rounded-xl text-white text-sm font-medium transition-all duration-300"
                      style={{
                        background: strategy === 'Revenue Focused' 
                          ? 'linear-gradient(135deg, #C96F4A 0%, #B85E3A 100%)'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                        border: strategy === 'Revenue Focused'
                          ? '1px solid rgba(201,111,74,0.4)'
                          : '1px solid rgba(255,255,255,0.1)',
                        boxShadow: strategy === 'Revenue Focused'
                          ? 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 5px rgba(0,0,0,0.3)'
                          : 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 5px rgba(0,0,0,0.2)',
                        transform: strategy === 'Revenue Focused' ? 'translateY(-1px)' : 'translateY(0)'
                      }}
                      onMouseEnter={(e) => {
                        if (strategy !== 'Revenue Focused') {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)'
                          e.currentTarget.style.transform = 'translateY(-1px)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (strategy !== 'Revenue Focused') {
                          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'
                          e.currentTarget.style.transform = 'translateY(0)'
                        }
                      }}
                    >
                      {dictionary?.calculator.strategies?.revenueFocused || 'Revenue Focused'}
                    </button>
                  </div>
                </div>
                
                {/* Earnings Display */}
                <EarningsDisplay 
                  location={location}
                  villaCategory={villaCategory}
                  bedrooms={bedrooms.toString()}
                  strategy={strategy}
                  dictionary={dictionary}
                />
                
                {/* Mobile Contact Button - Shows only on mobile at step 4 */}
                <button
                  onClick={() => setShowMobileForm(true)}
                  className="mt-6 w-full py-3 rounded-lg lg:hidden text-white font-semibold transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #C96F4A 0%, #B85E3A 100%)',
                    boxShadow: '0 4px 15px rgba(201,111,74,0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #D47F5A 0%, #C86E4A 100%)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,111,74,0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #C96F4A 0%, #B85E3A 100%)'
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(201,111,74,0.3)'
                  }}
                >
                  {dictionary?.calculator.getPersonalizedReport || 'Get Your Personalized Report'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Contact Form Card - Shows beside calculator when step === 4 */}
        {step === 4 && (
          <motion.div 
            className="hidden lg:block fixed calculator-card w-[450px] h-auto p-6 sm:p-8 lg:p-[50px] rounded-[20px] overflow-hidden border border-black/50 z-20"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2F4A3C 40%, #1a1a1a 100%)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.5)',
              left: 'calc(50% + 250px)',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 
              className="text-2xl md:text-[32px] text-white text-center mb-3 leading-[1.2] font-serif"
              style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              {dictionary?.calculator.getYour || 'Get Your'}<br/>
              <span className="text-[#C96F4A]">{dictionary?.calculator.personalizedReport || 'Personalized Report'}</span>
            </h2>
            
            <p className="text-sm text-[rgba(255,255,255,0.8)] text-center mb-6">
              {dictionary?.calculator.requestTailored || 'Request a Tailored Rental Revenue Projection for Your Property'}
            </p>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder={dictionary?.calculator.yourName || "Your Name *"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none focus:border-[#C96F4A] transition-colors"
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
              />
              
              <input
                type="email"
                placeholder={dictionary?.calculator.emailAddress || "Email Address *"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none focus:border-[#C96F4A] transition-colors"
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
              />
              
              <input
                type="tel"
                placeholder={dictionary?.calculator.phoneOptional || "Phone Number (Optional)"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white placeholder-[rgba(255,255,255,0.4)] focus:outline-none focus:border-[#C96F4A] transition-colors"
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)'
                }}
              />
            </div>
            
            <button
              onClick={async () => {
                if (!name || !email) {
                  alert(dictionary?.calculator.fillRequiredFields || 'Please fill in all required fields')
                  return
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(email)) {
                  alert(dictionary?.calculator.enterValidEmail || 'Please enter a valid email address')
                  return
                }
                
                setIsSubmitting(true)
                
                try {
                  const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      type: 'earnings-calculator',
                      data: {
                        name,
                        email,
                        phone,
                        location,
                        villaCategory,
                        bedrooms,
                        amenities
                      }
                    })
                  })
                  
                  if (!response.ok) {
                    throw new Error('Failed to send email')
                  }
                  
                  alert(dictionary?.calculator.thankYouMessage ? 
                    dictionary.calculator.thankYouMessage.replace('{name}', name).replace('{email}', email) :
                    `Thank you ${name}! We'll send your detailed earnings report to ${email}.`)
                  
                  // Reset form
                  setStep(1)
                  setLocation('')
                  setVillaCategory('')
                  setBedrooms('')
                  setAmenities([])
                  setName('')
                  setEmail('')
                  setPhone('')
                } catch (error) {
                  console.error('Error sending email:', error)
                  alert(dictionary?.calculator.errorMessage || 'Sorry, there was an error. Please try again.')
                } finally {
                  setIsSubmitting(false)
                }
              }}
              className="mt-8 w-full p-4 rounded-full bg-[#C96F4A] text-white font-semibold transition-all duration-300 hover:bg-[#B05F3A] hover:shadow-[0_4px_15px_rgba(201,111,74,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!name || !email || isSubmitting}
            >
              {isSubmitting ? (dictionary?.calculator.sending || 'Sending...') : (dictionary?.calculator.getDetailedReport || 'Get Detailed Report')}
            </button>
            
            <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.1)]">
              <p className="text-[10px] text-[rgba(255,255,255,0.6)] text-center">
                <span className="text-white font-semibold">{dictionary?.calculator.noObligation || 'No Obligation'}</span> • 
                <span className="text-[#C96F4A] font-bold"> {dictionary?.calculator.response24h || 'Response within 24h'}</span>
              </p>
            </div>
          </motion.div>
        )}
        
        {/* Mobile Form Modal */}
        {showMobileForm && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center lg:hidden"
            onClick={() => setShowMobileForm(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70" />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-[90%] max-w-[400px] max-h-[90vh] overflow-y-auto p-6 rounded-[20px] border border-black/50"
              style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #2F4A3C 40%, #1a1a1a 100%)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowMobileForm(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all text-xl"
              >
                ×
              </button>
              
              <h2 className="text-2xl font-bold text-white text-center mb-1">
                {dictionary?.calculator.getYour || 'Get Your'}<br/>
                <span className="text-[#C96F4A]">{dictionary?.calculator.personalizedReport || 'Personalized Report'}</span>
              </h2>
              
              <p className="text-sm text-[rgba(255,255,255,0.8)] text-center mb-6">
                {dictionary?.calculator.requestTailored || 'Request a Tailored Rental Revenue Projection for Your Property'}
              </p>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={dictionary?.calculator.yourName || "Your Name *"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-[rgba(255,255,255,0.4)] focus:outline-none focus:bg-[rgba(255,255,255,0.08)] focus:border-[#C96F4A] transition-all duration-200"
                />
                <input
                  type="email"
                  placeholder={dictionary?.calculator.yourEmail || "Your Email *"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-[rgba(255,255,255,0.4)] focus:outline-none focus:bg-[rgba(255,255,255,0.08)] focus:border-[#C96F4A] transition-all duration-200"
                />
                <input
                  type="tel"
                  placeholder={dictionary?.calculator.yourPhoneOptional || "Your Phone (optional)"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-white placeholder:text-[rgba(255,255,255,0.4)] focus:outline-none focus:bg-[rgba(255,255,255,0.08)] focus:border-[#C96F4A] transition-all duration-200"
                />
              </div>
              
              <button
                onClick={async (e) => {
                  e.preventDefault()
                  if (!name || !email || isSubmitting) return
                  
                  setIsSubmitting(true)
                  try {
                    const response = await fetch('/api/send-email', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        name,
                        email,
                        phone,
                        location,
                        bedrooms: bedrooms.toString(),
                        villaCategory,
                        strategy,
                        type: 'calculator'
                      }),
                    })
                    
                    const data = await response.json()
                    
                    if (data.success) {
                      alert('Thank you! We will send you a detailed report within 24 hours.')
                      setName('')
                      setEmail('')
                      setPhone('')
                      setShowMobileForm(false)
                    } else {
                      throw new Error(data.message || 'Failed to send email')
                    }
                  } catch (error) {
                    console.error('Error sending email:', error)
                    alert('Sorry, there was an error. Please try again.')
                  } finally {
                    setIsSubmitting(false)
                  }
                }}
                className="mt-6 w-full p-4 rounded-full bg-[#C96F4A] text-white font-semibold transition-all duration-300 hover:bg-[#B05F3A] hover:shadow-[0_4px_15px_rgba(201,111,74,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!name || !email || isSubmitting}
              >
                {isSubmitting ? (dictionary?.calculator.sending || 'Sending...') : (dictionary?.calculator.getDetailedReport || 'Get Detailed Report')}
              </button>
              
              <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.1)]">
                <p className="text-[10px] text-[rgba(255,255,255,0.6)] text-center">
                  <span className="text-white font-semibold">{dictionary?.calculator.noObligation || 'No Obligation'}</span> • 
                  <span className="text-[#C96F4A] font-bold"> {dictionary?.calculator.response24h || 'Response within 24h'}</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
        </div>
      </motion.div>
      
      {/* Mobile Scroll Indicator */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 z-50 md:hidden"
            style={{ 
              bottom: 'calc(env(safe-area-inset-bottom, 0px) + 120px)' // Higher position for iOS Safari bottom bar
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex flex-col items-center"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <span className="text-white text-xs mb-2 font-medium">{dictionary?.calculator?.scrollToExplore || 'Scroll to explore'}</span>
              <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center p-1">
                <motion.div 
                  className="w-1.5 h-3 bg-white rounded-full"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

export function GlassmorphismLuxury() {
  const [step, setStep] = useState(1)
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState(0)
  
  const locations = ['Canggu', 'Seminyak', 'Uluwatu']
  const bedroomOptions = [1, 2, 3, 4, 5]
  
  // Scroll-based animation
  const { scrollY } = useScroll()
  
  // Start fading out immediately on scroll, complete by 400px
  const animatedOpacity = useTransform(scrollY, [0, 400], [1, 0])
  
  // Fade out the subtitle at the same rate
  const subtitleOpacity = useTransform(scrollY, [0, 400], [1, 0])
  
  // Fade in the nav AURA inversely - as center fades out, nav fades in
  const navOpacity = useTransform(scrollY, [0, 400], [0, 1])

  const handleLocationSelect = (loc: string) => {
    setLocation(loc)
    setStep(2)
  }
  
  const handleBedroomSelect = (beds: number) => {
    setBedrooms(beds)
    setStep(3)
  }
  
  const calculateEarnings = () => {
    const baseRates: { [key: string]: number } = {
      'Canggu': 500,
      'Seminyak': 600,
      'Uluwatu': 700
    }
    
    const baseRate = baseRates[location] || 500
    const nightlyRate = baseRate + (bedrooms * 100)
    const monthlyEarnings = nightlyRate * 20 // Assuming 20 nights/month occupancy
    const yearlyEarnings = monthlyEarnings * 12
    
    return {
      nightly: nightlyRate,
      monthly: monthlyEarnings,
      yearly: yearlyEarnings
    }
  }

  return (
    <div className="h-screen w-full relative overflow-hidden flex" style={{ backgroundColor: '#F8F4F0' }}>
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
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-[#C96F4A] mb-3"
          style={{
            opacity: animatedOpacity
          }}
        >
          AURA
        </motion.h1>
        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#2F4A3C] font-bold"
          style={{ opacity: subtitleOpacity }}
        >
          Property Management Bali
        </motion.p>
      </div>

      {/* Calculator Container - Full height on mobile, centered on desktop */}
      <motion.div 
        className="h-screen md:h-full w-full flex items-center justify-center px-4 md:px-0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div 
          className="calculator-card relative w-full max-w-[450px] h-[calc(100vh-2rem)] md:h-auto mx-auto p-6 sm:p-8 lg:p-[50px] md:rounded-[20px] overflow-hidden border border-black/50"
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
            <h1 className="text-3xl font-serif text-[#C96F4A] mb-2">AURA</h1>
            <p className="text-sm text-[#F8F4F0] opacity-80">Property Management Bali</p>
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
            {[1, 2, 3].map((num) => (
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
                  className="text-2xl md:text-[32px] text-white text-center mb-3 leading-[1.2] font-serif"
                  style={{
                    textShadow: '0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.1)'
                  }}
                >
                  Estimate Your Villa's<br/>
                  <span className="text-[#C96F4A]">Earning Potential</span>
                </h2>
                <p className="text-sm md:text-[15px] text-[rgba(255,255,255,0.8)] text-center mb-6 md:mb-[35px]">
                  Start by selecting your villa's location
                </p>
                
                <div className="space-y-3 md:space-y-[15px] overflow-y-auto max-h-[40vh] md:max-h-none">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => handleLocationSelect(loc)}
                      className="location-button relative w-full p-4 md:p-5 rounded-xl text-white text-base md:text-[17px] cursor-pointer transition-all duration-300 overflow-hidden"
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
                      <small className="block text-[13px] text-[rgba(255,255,255,0.6)] mt-1">Premium Location</small>
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
                  Number of<br/>
                  <span className="text-[#C96F4A]">Bedrooms</span>
                </h2>
                <p className="text-sm md:text-[15px] text-[rgba(255,255,255,0.8)] text-center mb-6 md:mb-[35px]">
                  How many bedrooms does your villa have?
                </p>
                
                <div className="grid grid-cols-3 gap-4">
                  {bedroomOptions.map((num) => (
                    <button
                      key={num}
                      onClick={() => handleBedroomSelect(num)}
                      className="location-button relative p-6 rounded-xl text-white cursor-pointer transition-all duration-300 overflow-hidden"
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
                      <div className="text-3xl font-serif">{num}</div>
                    </button>
                  ))}
                  <button
                    onClick={() => handleBedroomSelect(6)}
                    className="location-button relative col-span-3 p-6 rounded-xl text-white cursor-pointer transition-all duration-300 overflow-hidden"
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
                    <div className="text-xl font-serif">6+ Bedrooms</div>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
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
                  Your Potential<br/>
                  <span className="text-[#C96F4A]">Earnings</span>
                </h2>
                
                <div className="mt-8 space-y-4">
                  <div 
                    className="p-4 rounded-xl"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                      border: '1px solid rgba(212,175,55,0.1)'
                    }}
                  >
                    <p className="text-[rgba(255,255,255,0.6)] text-sm">Per Night</p>
                    <p className="text-3xl font-serif text-white">${calculateEarnings().nightly}</p>
                  </div>
                  
                  <div 
                    className="p-4 rounded-xl"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(201,111,74,0.1) 0%, rgba(201,111,74,0.05) 100%)',
                      border: '1px solid rgba(201,111,74,0.2)'
                    }}
                  >
                    <p className="text-[rgba(255,255,255,0.6)] text-sm">Monthly (est. 20 nights)</p>
                    <p className="text-3xl font-serif text-[#C96F4A]">${calculateEarnings().monthly.toLocaleString()}</p>
                  </div>
                  
                  <div 
                    className="p-4 rounded-xl"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                      border: '1px solid rgba(212,175,55,0.1)'
                    }}
                  >
                    <p className="text-[rgba(255,255,255,0.6)] text-sm">Yearly Potential</p>
                    <p className="text-3xl font-serif text-white">${calculateEarnings().yearly.toLocaleString()}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setStep(1)
                    setLocation('')
                    setBedrooms(0)
                  }}
                  className="mt-8 w-full p-4 rounded-full bg-[#C96F4A] text-white font-semibold transition-all duration-300 hover:bg-[#B05F3A] hover:shadow-[0_4px_15px_rgba(201,111,74,0.3)]"
                >
                  Calculate Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
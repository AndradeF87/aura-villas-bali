'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { locations, amenitiesList, calculateEarnings } from './types'

export function GlassmorphismLuxuryTrial() {
  const [step, setStep] = useState(1)
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState(2)
  const [bathrooms, setBathrooms] = useState(2)
  const [amenities, setAmenities] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [results, setResults] = useState<any>(null)
  const [displayValues, setDisplayValues] = useState({
    monthly: 0,
    occupancy: 0,
    nightly: 0,
    annual: 0,
    net: 0
  })

  const handleLocationSelect = (loc: string) => {
    setLocation(loc)
    setTimeout(() => setStep(2), 500)
  }

  const handleCalculate = () => {
    const earnings = calculateEarnings(location, bedrooms, bathrooms, amenities)
    setResults(earnings)
    setStep(3)
    
    // Animate numbers
    animateValue('monthly', 0, earnings.monthlyRevenue, 2000)
    animateValue('occupancy', 0, earnings.occupancyRate, 2000)
    animateValue('nightly', 0, earnings.nightlyRate, 2000)
    animateValue('annual', 0, earnings.annualEarnings, 2000)
    animateValue('net', 0, earnings.netIncome, 2000)
  }

  const animateValue = (key: string, start: number, end: number, duration: number) => {
    const startTime = Date.now()
    const update = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const value = Math.floor(start + (end - start) * easeOutQuart(progress))
      
      setDisplayValues(prev => ({ ...prev, [key]: value }))
      
      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }
    requestAnimationFrame(update)
  }

  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

  const toggleAmenity = (amenity: string) => {
    setAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1920&h=1080&fit=crop)',
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, rgba(201,111,74,0.3) 0%, rgba(47,74,60,0.3) 100%)',
            'linear-gradient(135deg, rgba(47,74,60,0.3) 0%, rgba(201,111,74,0.3) 100%)',
            'linear-gradient(135deg, rgba(201,111,74,0.3) 0%, rgba(47,74,60,0.3) 100%)',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Progress Circles */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
              step >= i 
                ? 'bg-white/20 border-white text-white' 
                : 'border-white/30 text-white/50'
            }`}
            animate={{ scale: step === i ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ backdropFilter: 'blur(10px)' }}
          >
            <span className="font-serif text-sm">{i}</span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Location Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="h-full flex items-center justify-center px-8"
          >
            <div 
              className="max-w-3xl w-full p-12 rounded-3xl text-center"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              <h1 className="font-serif mb-4">
                <span className="text-4xl text-white">Estimate Your Villa's</span>
                <br />
                <span className="text-3xl text-[#C96F4A]">Earning Potential</span>
              </h1>
              <p className="text-xl text-white/80 mb-12 font-light">
                Start by selecting your villa's location
              </p>
              
              <div className="grid grid-cols-3 gap-6">
                {locations.map((loc) => (
                  <motion.button
                    key={loc}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLocationSelect(loc)}
                    className="p-8 rounded-2xl transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                    }}
                  >
                    <div className="text-2xl font-serif text-white">{loc}</div>
                    <div className="text-sm text-white/60 mt-2">Premium Location</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Property Details */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="h-full flex items-center justify-center px-8"
          >
            <div 
              className="max-w-3xl w-full p-10 rounded-3xl"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              <h2 className="text-4xl font-serif text-white mb-2 text-center">
                Property Details
              </h2>
              <p className="text-lg text-white/80 mb-8 text-center font-light">
                Luxury villa in {location}
              </p>

              <div className="space-y-6">
                {/* Bedrooms */}
                <div>
                  <label className="block text-sm font-light text-white/80 mb-3">
                    BEDROOMS
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, '6+'].map((num) => (
                      <button
                        key={num}
                        onClick={() => setBedrooms(typeof num === 'string' ? 6 : num)}
                        className={`flex-1 py-3 px-4 rounded-xl transition-all ${
                          bedrooms === (typeof num === 'string' ? 6 : num)
                            ? 'bg-white/30 text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                        style={{ backdropFilter: 'blur(10px)' }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-sm font-light text-white/80 mb-3">
                    BATHROOMS
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, '6+'].map((num) => (
                      <button
                        key={num}
                        onClick={() => setBathrooms(typeof num === 'string' ? 6 : num)}
                        className={`flex-1 py-3 px-4 rounded-xl transition-all ${
                          bathrooms === (typeof num === 'string' ? 6 : num)
                            ? 'bg-white/30 text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                        style={{ backdropFilter: 'blur(10px)' }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-light text-white/80 mb-3">
                    PREMIUM AMENITIES
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {amenitiesList.map((amenity) => (
                      <button
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`py-3 px-4 rounded-xl text-left transition-all ${
                          amenities.includes(amenity)
                            ? 'bg-white/30 text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                        style={{ backdropFilter: 'blur(10px)' }}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculate Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCalculate}
                  className="w-full py-4 rounded-xl text-lg font-light text-white transition-all"
                  style={{
                    background: 'linear-gradient(135deg, rgba(201,111,74,0.8) 0%, rgba(193,162,101,0.8) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  Calculate Premium Returns
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Results */}
        {step === 3 && results && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="h-full flex items-center justify-center px-8"
          >
            <div 
              className="max-w-5xl w-full p-10 rounded-3xl"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
            >
              <h2 className="text-4xl font-serif text-white mb-2 text-center">
                Your Premium Returns
              </h2>
              <p className="text-lg text-white/80 mb-8 text-center font-light">
                Exclusive {location} villa performance
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="text-xs text-white/60 mb-2 font-light">MONTHLY REVENUE</div>
                  <div className="text-2xl font-serif text-white">
                    {formatCurrency(displayValues.monthly)}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="text-xs text-white/60 mb-2 font-light">OCCUPANCY RATE</div>
                  <div className="text-2xl font-serif text-white">
                    {displayValues.occupancy}%
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="text-xs text-white/60 mb-2 font-light">NIGHTLY RATE</div>
                  <div className="text-2xl font-serif text-white">
                    {formatCurrency(displayValues.nightly)}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="p-8 rounded-2xl mb-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(201,111,74,0.2) 0%, rgba(193,162,101,0.2) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <div className="text-xs text-white/60 mb-1 font-light">ANNUAL EARNINGS</div>
                    <div className="text-xl font-serif text-white">
                      {formatCurrency(displayValues.annual)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-1 font-light">MANAGEMENT FEE</div>
                    <div className="text-xl font-serif text-white/80">
                      -{formatCurrency(results.managementFee)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-white/60 mb-1 font-light">NET INCOME</div>
                    <div className="text-2xl font-serif text-white">
                      {formatCurrency(displayValues.net)}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Email Capture */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for detailed report"
                  className="flex-1 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-white/40"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 rounded-xl font-light text-white"
                  style={{
                    background: 'linear-gradient(135deg, rgba(201,111,74,0.8) 0%, rgba(193,162,101,0.8) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                >
                  Get Premium Report
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
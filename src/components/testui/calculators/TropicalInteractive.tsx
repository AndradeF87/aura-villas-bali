'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { locations, amenitiesList, calculateEarnings } from './types'

export function TropicalInteractive() {
  const [step, setStep] = useState(1)
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState(2)
  const [bathrooms, setBathrooms] = useState(2)
  const [amenities, setAmenities] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [results, setResults] = useState<any>(null)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)

  const handleLocationSelect = (loc: string) => {
    setLocation(loc)
    setTimeout(() => setStep(2), 600)
  }

  const handleCalculate = () => {
    const earnings = calculateEarnings(location, bedrooms, bathrooms, amenities)
    setResults(earnings)
    setStep(3)
  }

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

  // Floating elements for tropical theme
  const FloatingLeaf = ({ delay = 0 }) => (
    <motion.div
      className="absolute w-8 h-10 opacity-20"
      initial={{ x: Math.random() * 100 - 50, y: -50 }}
      animate={{
        y: '100vh',
        x: Math.random() * 200 - 100,
        rotate: 360
      }}
      transition={{
        duration: 15 + Math.random() * 10,
        repeat: Infinity,
        delay,
        ease: 'linear'
      }}
      style={{
        left: `${Math.random() * 100}%`,
        filter: 'blur(1px)'
      }}
    >
      🌿
    </motion.div>
  )

  return (
    <div 
      className="h-screen w-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FF6B6B 0%, #FFA07A 25%, #FFD700 50%, #98D8C8 75%, #6BB6FF 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite'
      }}
    >
      {/* Floating Leaves */}
      {[...Array(5)].map((_, i) => (
        <FloatingLeaf key={i} delay={i * 2} />
      ))}

      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <pattern id="waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10 Q25 0 50 10 T100 10" stroke="#fff" strokeWidth="0.5" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#waves)" />
        </svg>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Location Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 180 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="h-full flex items-center justify-center px-8"
          >
            <div className="max-w-4xl w-full">
              <motion.h1 
                className="text-6xl font-bold text-white mb-4 text-center"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, type: 'spring' }}
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}
              >
                Estimate Your Villa's Earning Potential
              </motion.h1>
              <motion.p 
                className="text-2xl text-white/90 mb-12 text-center"
                initial={{ y: -30 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                Start by selecting your villa's location
              </motion.p>
              
              <div className="grid grid-cols-3 gap-8">
                {locations.map((loc, index) => (
                  <motion.button
                    key={loc}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: [0, -5, 5, -5, 0],
                      transition: { rotate: { duration: 0.5 } }
                    }}
                    whileTap={{ scale: 0.9 }}
                    onHoverStart={() => setHoveredLocation(loc)}
                    onHoverEnd={() => setHoveredLocation(null)}
                    onClick={() => handleLocationSelect(loc)}
                    className="relative bg-white/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/30 hover:bg-white/30 transition-all"
                    style={{
                      background: hoveredLocation === loc 
                        ? 'rgba(255, 255, 255, 0.4)' 
                        : 'rgba(255, 255, 255, 0.2)',
                      transform: 'perspective(1000px)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div className="text-4xl mb-2">
                      {loc === 'Canggu' ? '🏄' : loc === 'Seminyak' ? '🌅' : '🏖️'}
                    </div>
                    <div className="text-2xl font-bold text-white">{loc}</div>
                    <div className="text-sm text-white/70 mt-1">Tropical Paradise</div>
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
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: 90 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="h-full flex items-center justify-center px-8"
          >
            <div className="max-w-3xl w-full bg-white/20 backdrop-blur-md rounded-3xl p-10 border-2 border-white/30">
              <h2 className="text-4xl font-bold text-white mb-2 text-center">
                Property Details
              </h2>
              <p className="text-xl text-white/90 mb-8 text-center">
                Your tropical villa in {location}
              </p>

              <div className="space-y-8">
                {/* Bedrooms */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-3">
                    🛏️ Bedrooms
                  </label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5, '6+'].map((num) => (
                      <motion.button
                        key={num}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setBedrooms(typeof num === 'string' ? 6 : num)}
                        className={`flex-1 py-3 px-4 rounded-2xl font-bold transition-all ${
                          bedrooms === (typeof num === 'string' ? 6 : num)
                            ? 'bg-white text-orange-500 shadow-lg'
                            : 'bg-white/30 text-white hover:bg-white/50'
                        }`}
                      >
                        {num}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-3">
                    🚿 Bathrooms
                  </label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5, '6+'].map((num) => (
                      <motion.button
                        key={num}
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setBathrooms(typeof num === 'string' ? 6 : num)}
                        className={`flex-1 py-3 px-4 rounded-2xl font-bold transition-all ${
                          bathrooms === (typeof num === 'string' ? 6 : num)
                            ? 'bg-white text-blue-500 shadow-lg'
                            : 'bg-white/30 text-white hover:bg-white/50'
                        }`}
                      >
                        {num}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-lg font-semibold text-white mb-3">
                    ✨ Amenities
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {amenitiesList.map((amenity, index) => (
                      <motion.button
                        key={amenity}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleAmenity(amenity)}
                        className={`py-3 px-4 rounded-2xl text-left font-medium transition-all ${
                          amenities.includes(amenity)
                            ? 'bg-white text-green-600 shadow-lg'
                            : 'bg-white/30 text-white hover:bg-white/50'
                        }`}
                      >
                        <span className="mr-2">
                          {amenity === 'Private Pool' ? '🏊' :
                           amenity === 'Ocean View' ? '🌊' :
                           amenity === 'Beach Access' ? '🏖️' :
                           amenity === 'Chef Service' ? '👨‍🍳' : '💆'}
                        </span>
                        {amenity}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Calculate Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCalculate}
                  className="w-full py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl transition-all"
                >
                  🌺 Calculate Tropical Returns
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Results */}
        {step === 3 && results && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="h-full flex items-center justify-center px-8"
          >
            <div className="max-w-5xl w-full bg-white/20 backdrop-blur-md rounded-3xl p-10 border-2 border-white/30">
              <h2 className="text-4xl font-bold text-white mb-2 text-center">
                🎉 Your Tropical Returns
              </h2>
              <p className="text-xl text-white/90 mb-8 text-center">
                Paradise profits in {location}
              </p>

              {/* Circular Charts */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="relative"
                >
                  <div className="w-40 h-40 mx-auto relative">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="12"
                        fill="none"
                      />
                      <motion.circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="url(#gradient1)"
                        strokeWidth="12"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${results.occupancyRate * 4.4} 440`}
                        initial={{ strokeDashoffset: 440 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FF6B6B" />
                          <stop offset="100%" stopColor="#FFD700" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-3xl font-bold text-white">{results.occupancyRate}%</div>
                      <div className="text-sm text-white/70">Occupancy</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="bg-white/30 backdrop-blur-sm rounded-2xl p-6"
                >
                  <div className="text-4xl mb-2 text-center">💰</div>
                  <div className="text-sm text-white/70 text-center">Monthly Revenue</div>
                  <div className="text-2xl font-bold text-white text-center">
                    {formatCurrency(results.monthlyRevenue)}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: 'spring' }}
                  className="bg-white/30 backdrop-blur-sm rounded-2xl p-6"
                >
                  <div className="text-4xl mb-2 text-center">🌴</div>
                  <div className="text-sm text-white/70 text-center">Nightly Rate</div>
                  <div className="text-2xl font-bold text-white text-center">
                    {formatCurrency(results.nightlyRate)}
                  </div>
                </motion.div>
              </div>

              {/* Annual Summary */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-r from-green-400/30 to-blue-500/30 backdrop-blur-sm rounded-2xl p-6 mb-6"
              >
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-lg text-white/70">Annual Earnings</div>
                    <div className="text-2xl font-bold text-white">
                      {formatCurrency(results.annualEarnings)}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg text-white/70">Management Fee</div>
                    <div className="text-2xl font-bold text-white/80">
                      -{formatCurrency(results.managementFee)}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg text-white/70">Net Income</div>
                    <div className="text-3xl font-bold text-white">
                      {formatCurrency(results.netIncome)}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Email Capture */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex gap-4"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email for paradise profits report"
                  className="flex-1 px-6 py-3 rounded-2xl bg-white/30 backdrop-blur-sm text-white placeholder-white/60 border-2 border-white/30 focus:outline-none focus:border-white/50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-2xl font-bold shadow-xl"
                >
                  Get Report 🌺
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}
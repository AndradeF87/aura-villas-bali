'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { locations, amenitiesList, calculateEarnings } from './types'

export function CalculatorReimagined() {
  const [step, setStep] = useState(1)
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState(2)
  const [bathrooms, setBathrooms] = useState(2)
  const [amenities, setAmenities] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [results, setResults] = useState<any>(null)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

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

  const formatDigitalNumber = (value: number, prefix = '') => {
    const formatted = value.toLocaleString('id-ID')
    return `${prefix}${formatted}`
  }

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'grid-move 10s linear infinite'
        }}/>
      </div>

      {/* Digital Clock Display */}
      <div className="absolute top-4 right-4 font-mono text-cyan-400 text-sm">
        {time.toTimeString().split(' ')[0]}
      </div>

      {/* Progress Indicators */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-12 h-1 transition-all duration-500 ${
              step >= s ? 'bg-cyan-400 shadow-neon-cyan' : 'bg-gray-800'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Location Grid */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col items-center justify-center px-8"
          >
            <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              CALCULATE EARNINGS
            </h1>
            <p className="text-cyan-300 mb-12 font-mono">
              SELECT_LOCATION.exe
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-3xl w-full">
              {locations.map((loc) => (
                <motion.button
                  key={loc}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setLocation(loc)
                    setTimeout(() => setStep(2), 300)
                  }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"/>
                  <div className="relative bg-gray-900 border border-cyan-400 rounded-lg p-6 hover:border-purple-400 transition-colors">
                    <div className="text-2xl font-mono text-cyan-400">{loc}</div>
                    <div className="text-xs text-gray-500 mt-2">ZONE_{locations.indexOf(loc) + 1}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Digital Number Pad Input */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex-1 flex flex-col items-center justify-center px-8"
          >
            <h2 className="text-4xl font-bold mb-2 text-cyan-400">
              PROPERTY_CONFIG
            </h2>
            <p className="text-gray-400 mb-8 font-mono">
              {location}.config
            </p>

            <div className="max-w-4xl w-full space-y-6">
              {/* LED Display for Bedrooms */}
              <div className="bg-gray-900 border border-cyan-400 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-cyan-300 font-mono">BEDROOMS</span>
                  <div className="font-mono text-4xl text-cyan-400" style={{
                    textShadow: '0 0 10px cyan, 0 0 20px cyan',
                    fontFamily: 'monospace',
                    letterSpacing: '0.2em'
                  }}>
                    {bedrooms.toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => setBedrooms(num)}
                      className={`aspect-square rounded border-2 font-mono text-xl transition-all ${
                        bedrooms === num
                          ? 'bg-cyan-400 text-black border-cyan-400 shadow-neon-cyan'
                          : 'bg-gray-800 text-cyan-400 border-gray-700 hover:border-cyan-400'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* LED Display for Bathrooms */}
              <div className="bg-gray-900 border border-purple-400 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-purple-300 font-mono">BATHROOMS</span>
                  <div className="font-mono text-4xl text-purple-400" style={{
                    textShadow: '0 0 10px purple, 0 0 20px purple',
                    fontFamily: 'monospace',
                    letterSpacing: '0.2em'
                  }}>
                    {bathrooms.toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => setBathrooms(num)}
                      className={`aspect-square rounded border-2 font-mono text-xl transition-all ${
                        bathrooms === num
                          ? 'bg-purple-400 text-black border-purple-400 shadow-neon-purple'
                          : 'bg-gray-800 text-purple-400 border-gray-700 hover:border-purple-400'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Matrix Grid for Amenities */}
              <div className="bg-gray-900 border border-green-400 rounded-lg p-6">
                <div className="text-green-300 font-mono mb-4">AMENITIES.matrix</div>
                <div className="grid grid-cols-3 gap-3">
                  {amenitiesList.map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`p-3 rounded border-2 font-mono text-sm transition-all ${
                        amenities.includes(amenity)
                          ? 'bg-green-400 text-black border-green-400 shadow-neon-green'
                          : 'bg-gray-800 text-green-400 border-gray-700 hover:border-green-400'
                      }`}
                    >
                      {amenity.toUpperCase().replace(' ', '_')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Execute Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCalculate}
                className="w-full relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"/>
                <div className="relative bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold py-4 rounded-lg text-xl">
                  EXECUTE_CALCULATION.run
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Digital Dashboard Results */}
        {step === 3 && results && (
          <motion.div
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-8"
          >
            <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              EARNINGS_ANALYSIS.output
            </h2>

            {/* Digital Display Grid */}
            <div className="grid grid-cols-3 gap-6 max-w-5xl w-full mb-8">
              {/* Monthly Revenue Display */}
              <div className="bg-gray-900 border border-cyan-400 rounded-lg p-6">
                <div className="text-cyan-300 text-sm font-mono mb-2">MONTHLY_REV</div>
                <div className="font-mono text-3xl text-cyan-400" style={{
                  textShadow: '0 0 10px cyan',
                  letterSpacing: '0.1em'
                }}>
                  {formatDigitalNumber(results.monthlyRevenue, 'Rp')}
                </div>
                <svg className="w-full h-20 mt-4">
                  <polyline
                    fill="none"
                    stroke="cyan"
                    strokeWidth="2"
                    points="0,60 20,50 40,55 60,30 80,35 100,20 120,25 140,10"
                    style={{ filter: 'drop-shadow(0 0 3px cyan)' }}
                  />
                </svg>
              </div>

              {/* Occupancy Rate Circular */}
              <div className="bg-gray-900 border border-purple-400 rounded-lg p-6">
                <div className="text-purple-300 text-sm font-mono mb-2">OCCUPANCY</div>
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="rgb(64, 64, 64)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="rgb(192, 132, 252)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - results.occupancyRate / 100) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      style={{ filter: 'drop-shadow(0 0 5px purple)' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-mono text-purple-400">
                      {results.occupancyRate}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Annual Earnings */}
              <div className="bg-gray-900 border border-green-400 rounded-lg p-6">
                <div className="text-green-300 text-sm font-mono mb-2">ANNUAL_NET</div>
                <div className="font-mono text-3xl text-green-400" style={{
                  textShadow: '0 0 10px green',
                  letterSpacing: '0.1em'
                }}>
                  {formatDigitalNumber(results.netIncome, 'Rp')}
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-500">GROSS</span>
                    <span className="text-green-400">{formatDigitalNumber(results.annualEarnings, '+')}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-500">FEES</span>
                    <span className="text-red-400">{formatDigitalNumber(results.managementFee, '-')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Terminal */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-2xl w-full">
              <div className="font-mono text-green-400 mb-4">
                <span className="text-gray-500">user@aura-villas:~$</span> request_detailed_report
              </div>
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@address.com"
                  className="flex-1 bg-black border border-gray-700 rounded px-4 py-2 font-mono text-green-400 placeholder-gray-600 focus:border-green-400 focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-green-400 text-black font-mono font-bold rounded hover:bg-green-300 transition-colors"
                >
                  SEND
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        .shadow-neon-cyan {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
        }
        .shadow-neon-purple {
          box-shadow: 0 0 20px rgba(192, 132, 252, 0.5);
        }
        .shadow-neon-green {
          box-shadow: 0 0 20px rgba(74, 222, 128, 0.5);
        }
      `}</style>
    </div>
  )
}
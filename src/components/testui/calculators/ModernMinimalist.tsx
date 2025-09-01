'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { locations, amenitiesList, calculateEarnings } from './types'

export function ModernMinimalist() {
  const [step, setStep] = useState(1)
  const [location, setLocation] = useState('')
  const [bedrooms, setBedrooms] = useState(2)
  const [bathrooms, setBathrooms] = useState(2)
  const [amenities, setAmenities] = useState<string[]>([])
  const [email, setEmail] = useState('')
  const [results, setResults] = useState<any>(null)

  const handleLocationSelect = (loc: string) => {
    setLocation(loc)
    setTimeout(() => setStep(2), 300)
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

  return (
    <div className="h-screen w-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
        <motion.div
          className="h-full bg-terracotta"
          initial={{ width: '33%' }}
          animate={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Location Selection */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl px-8 text-center"
          >
            <h1 className="text-5xl font-light text-gray-900 mb-4">
              Estimate Your Villa's Earning Potential
            </h1>
            <p className="text-xl text-gray-500 mb-12">
              Start by selecting your villa's location
            </p>
            
            <div className="grid grid-cols-3 gap-6">
              {locations.map((loc) => (
                <motion.button
                  key={loc}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLocationSelect(loc)}
                  className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-terracotta hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-2xl font-light text-gray-900">{loc}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Property Details */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl px-8"
          >
            <h2 className="text-4xl font-light text-gray-900 mb-2 text-center">
              Property Details
            </h2>
            <p className="text-lg text-gray-500 mb-8 text-center">
              Tell us more about your {location} villa
            </p>

            <div className="space-y-8">
              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Number of Bedrooms
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5, '6+'].map((num) => (
                    <button
                      key={num}
                      onClick={() => setBedrooms(typeof num === 'string' ? 6 : num)}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                        bedrooms === (typeof num === 'string' ? 6 : num)
                          ? 'border-terracotta bg-terracotta text-white'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Number of Bathrooms
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5, '6+'].map((num) => (
                    <button
                      key={num}
                      onClick={() => setBathrooms(typeof num === 'string' ? 6 : num)}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                        bathrooms === (typeof num === 'string' ? 6 : num)
                          ? 'border-terracotta bg-terracotta text-white'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Amenities
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {amenitiesList.map((amenity) => (
                    <button
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`py-3 px-4 rounded-lg border-2 text-left transition-all ${
                        amenities.includes(amenity)
                          ? 'border-terracotta bg-terracotta/10 text-terracotta'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
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
                className="w-full py-4 bg-terracotta text-white rounded-lg text-lg font-medium hover:bg-terracotta-dark transition-colors"
              >
                Calculate Earnings
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Results */}
        {step === 3 && results && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-4xl px-8"
          >
            <h2 className="text-4xl font-light text-gray-900 mb-2 text-center">
              Your Earning Potential
            </h2>
            <p className="text-lg text-gray-500 mb-8 text-center">
              Based on current market data for {location}
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-sm text-gray-500 mb-2">Monthly Revenue</div>
                <div className="text-2xl font-light text-gray-900">
                  {formatCurrency(results.monthlyRevenue)}
                </div>
                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-terracotta"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-sm text-gray-500 mb-2">Occupancy Rate</div>
                <div className="text-2xl font-light text-gray-900">
                  {results.occupancyRate}%
                </div>
                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${results.occupancyRate}%` }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="h-full bg-deep-green"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-sm text-gray-500 mb-2">Nightly Rate</div>
                <div className="text-2xl font-light text-gray-900">
                  {formatCurrency(results.nightlyRate)}
                </div>
                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="h-full bg-antique-gold"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 mb-8">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Annual Earnings</div>
                  <div className="text-xl font-light text-gray-900">
                    {formatCurrency(results.annualEarnings)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">AURA Management Fee</div>
                  <div className="text-xl font-light text-red-600">
                    -{formatCurrency(results.managementFee)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Your Net Income</div>
                  <div className="text-2xl font-medium text-green-600">
                    {formatCurrency(results.netIncome)}
                  </div>
                </div>
              </div>
            </div>

            {/* Email Capture */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Get Your Detailed Report
              </h3>
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-terracotta"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-terracotta text-white rounded-lg font-medium hover:bg-terracotta-dark transition-colors"
                >
                  Send Report
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
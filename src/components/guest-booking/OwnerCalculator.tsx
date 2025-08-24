'use client'

import { useState } from 'react'
import { Calculator, TrendingUp, DollarSign, Home } from 'lucide-react'

const locations = [
  { name: 'Seminyak', avgRate: 500, occupancy: 0.75 },
  { name: 'Ubud', avgRate: 350, occupancy: 0.70 },
  { name: 'Canggu', avgRate: 400, occupancy: 0.78 },
  { name: 'Uluwatu', avgRate: 450, occupancy: 0.72 },
  { name: 'Sanur', avgRate: 300, occupancy: 0.65 },
]

const propertyTypes = [
  { name: 'Budget Villa', multiplier: 0.7 },
  { name: 'Mid-Range Villa', multiplier: 1.0 },
  { name: 'Boutique Villa', multiplier: 1.5 },
  { name: 'Ultra-Boutique Villa', multiplier: 2.0 },
]

export function OwnerCalculator() {
  const [location, setLocation] = useState('Seminyak')
  const [propertyType, setPropertyType] = useState('Mid-Range Villa')
  const [bedrooms, setBedrooms] = useState(3)
  const [currentOccupancy, setCurrentOccupancy] = useState(50)
  const [showResults, setShowResults] = useState(false)
  const [email, setEmail] = useState('')

  const calculateEarnings = () => {
    const locationData = locations.find(l => l.name === location) || locations[0]
    const typeData = propertyTypes.find(t => t.name === propertyType) || propertyTypes[1]
    
    const baseRate = locationData.avgRate * typeData.multiplier * (1 + (bedrooms - 2) * 0.15)
    const auraOccupancy = Math.min(locationData.occupancy * 1.2, 0.95) // AURA achieves 20% higher occupancy
    const currentAnnualRevenue = baseRate * 365 * (currentOccupancy / 100)
    const auraAnnualRevenue = baseRate * 365 * auraOccupancy
    const revenueIncrease = auraAnnualRevenue - currentAnnualRevenue
    
    // Commission calculation (18% average)
    const auraCommission = auraAnnualRevenue * 0.18
    const operationalCosts = auraAnnualRevenue * 0.15 // Estimated operational costs
    const netIncome = auraAnnualRevenue - auraCommission - operationalCosts
    
    return {
      currentRevenue: Math.round(currentAnnualRevenue),
      auraRevenue: Math.round(auraAnnualRevenue),
      revenueIncrease: Math.round(revenueIncrease),
      percentIncrease: Math.round((revenueIncrease / currentAnnualRevenue) * 100),
      monthlyIncome: Math.round(netIncome / 12),
      auraOccupancy: Math.round(auraOccupancy * 100),
      commission: Math.round(auraCommission),
      netIncome: Math.round(netIncome),
    }
  }

  const handleCalculate = () => {
    setShowResults(true)
  }

  const results = showResults ? calculateEarnings() : null

  return (
    <section className="py-20 bg-sand">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            Calculate Your Villa's Potential
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See how much more your villa could earn with AURA's professional management
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Calculator Form */}
            <div className="p-8 lg:p-12">
              <h3 className="font-serif text-2xl text-deep-green mb-6">
                Your Villa Details
              </h3>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                >
                  {locations.map((loc) => (
                    <option key={loc.name} value={loc.name}>
                      {loc.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Property Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                >
                  {propertyTypes.map((type) => (
                    <option key={type.name} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Bedrooms
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                />
              </div>

              {/* Current Occupancy */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Occupancy Rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={currentOccupancy}
                  onChange={(e) => setCurrentOccupancy(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Leave at 50% if you're not currently renting
                </p>
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Potential Earnings
              </button>

              {/* Disclaimer */}
              <p className="text-xs text-gray-500 mt-4 text-center">
                *This is an estimate based on market averages. Actual results may vary.
              </p>
            </div>

            {/* Results */}
            <div className="bg-deep-green text-white p-8 lg:p-12">
              {!showResults ? (
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <Home className="w-16 h-16 mb-4 opacity-50" />
                  <h3 className="font-serif text-2xl mb-2">
                    Your Results Will Appear Here
                  </h3>
                  <p className="opacity-80">
                    Enter your villa details to see potential earnings with AURA
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="font-serif text-2xl mb-6">
                    Your Potential with AURA
                  </h3>

                  {/* Revenue Increase */}
                  <div className="bg-white/10 rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-6 h-6 text-terracotta" />
                      <span className="text-lg">Revenue Increase</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">
                      +${results?.revenueIncrease.toLocaleString()}
                    </p>
                    <p className="text-sm opacity-80">
                      {results?.percentIncrease}% increase from current revenue
                    </p>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80 mb-1">With AURA</p>
                      <p className="text-2xl font-bold">
                        ${results?.auraRevenue.toLocaleString()}
                      </p>
                      <p className="text-xs opacity-60">Annual Revenue</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm opacity-80 mb-1">Occupancy</p>
                      <p className="text-2xl font-bold">
                        {results?.auraOccupancy}%
                      </p>
                      <p className="text-xs opacity-60">Average Rate</p>
                    </div>
                  </div>

                  {/* Net Income */}
                  <div className="bg-terracotta/20 rounded-lg p-6 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <DollarSign className="w-6 h-6" />
                      <span className="text-lg">Your Net Income</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">
                      ${results?.monthlyIncome.toLocaleString()}/mo
                    </p>
                    <p className="text-sm opacity-80">
                      ${results?.netIncome.toLocaleString()} annually after fees
                    </p>
                  </div>

                  {/* Get Detailed Report */}
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-sm mb-3">
                      Get a detailed projection report with market analysis
                    </p>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg text-gray-900 mb-3"
                    />
                    <button className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                      Send Detailed Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trust Note */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Join 25+ villa owners who trust AURA with their properties
          </p>
        </div>
      </div>
    </section>
  )
}
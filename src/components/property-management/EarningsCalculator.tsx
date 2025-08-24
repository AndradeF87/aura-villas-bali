'use client'

import { useState } from 'react'
import { Calculator, TrendingUp, DollarSign, Calendar, Info } from 'lucide-react'

export function EarningsCalculator() {
  const [nightlyRate, setNightlyRate] = useState(7900000) // ~$500 USD in IDR
  const [occupancyRate, setOccupancyRate] = useState(75)
  const [managementTier, setManagementTier] = useState('premium')
  const [showDetails, setShowDetails] = useState(false)

  // Commission rates by tier
  const commissionRates = {
    essential: 0.15,
    premium: 0.18,
    boutique: 0.21
  }

  // Calculate monthly and annual earnings
  const calculateEarnings = () => {
    const daysPerMonth = 30
    const monthsPerYear = 12
    
    const occupiedNights = daysPerMonth * (occupancyRate / 100)
    const monthlyRevenue = nightlyRate * occupiedNights
    const annualRevenue = monthlyRevenue * monthsPerYear
    
    const commission = commissionRates[managementTier as keyof typeof commissionRates]
    const monthlyCommission = monthlyRevenue * commission
    const annualCommission = annualRevenue * commission
    
    const monthlyEarnings = monthlyRevenue - monthlyCommission
    const annualEarnings = annualRevenue - annualCommission
    
    // Calculate potential increase with AURA management
    const baseOccupancy = 50 // Average market occupancy
    const auraOccupancyBoost = 1.5 // 50% increase in occupancy with AURA
    const potentialIncrease = occupancyRate > baseOccupancy 
      ? ((occupancyRate - baseOccupancy) / baseOccupancy) * 100
      : auraOccupancyBoost * 100 - 100
    
    return {
      monthlyRevenue,
      annualRevenue,
      monthlyCommission,
      annualCommission,
      monthlyEarnings,
      annualEarnings,
      potentialIncrease,
      occupiedNights: Math.round(occupiedNights),
      annualOccupiedNights: Math.round(occupiedNights * monthsPerYear)
    }
  }

  const earnings = calculateEarnings()

  const formatCurrency = (amount: number) => {
    return 'Rp ' + new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-warm-ivory">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-terracotta" />
            <h2 className="font-serif text-4xl md:text-5xl text-deep-green">
              Calculate Your Earnings
            </h2>
          </div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            See how much you could earn with AURA's professional management. 
            Our average properties see a 50% increase in occupancy rates.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="font-serif text-2xl text-deep-green mb-6">
                Your Property Details
              </h3>

              {/* Nightly Rate */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nightly Rate (IDR)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={nightlyRate}
                    onChange={(e) => setNightlyRate(Number(e.target.value))}
                    className="w-full pl-10 pr-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    min="1500000"
                    max="50000000"
                    step="500000"
                  />
                </div>
                <input
                  type="range"
                  value={nightlyRate}
                  onChange={(e) => setNightlyRate(Number(e.target.value))}
                  className="w-full mt-2"
                  min="1500000"
                  max="30000000"
                  step="500000"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Rp 1.5M</span>
                  <span>Rp 30M</span>
                </div>
              </div>

              {/* Occupancy Rate */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Occupancy Rate (%)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={occupancyRate}
                    onChange={(e) => setOccupancyRate(Number(e.target.value))}
                    className="w-full pl-10 pr-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    min="0"
                    max="100"
                    step="5"
                  />
                </div>
                <input
                  type="range"
                  value={occupancyRate}
                  onChange={(e) => setOccupancyRate(Number(e.target.value))}
                  className="w-full mt-2"
                  min="0"
                  max="100"
                  step="5"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50% (Market Avg)</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Management Tier */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Management Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setManagementTier('essential')}
                    className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                      managementTier === 'essential'
                        ? 'bg-terracotta text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Essential
                    <span className="block text-xs mt-1">15% fee</span>
                  </button>
                  <button
                    onClick={() => setManagementTier('premium')}
                    className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                      managementTier === 'premium'
                        ? 'bg-terracotta text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Premium
                    <span className="block text-xs mt-1">18% fee</span>
                  </button>
                  <button
                    onClick={() => setManagementTier('boutique')}
                    className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                      managementTier === 'boutique'
                        ? 'bg-terracotta text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Boutique
                    <span className="block text-xs mt-1">21% fee</span>
                  </button>
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-sand-light rounded-lg p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-1">AURA Advantage</p>
                  <p>Our properties average 75% occupancy, compared to 50% market average. Premium marketing and 24/7 guest support make the difference.</p>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="bg-gradient-to-br from-deep-green to-deep-green-dark rounded-2xl shadow-lg p-8 text-white">
              <h3 className="font-serif text-2xl mb-6">
                Your Estimated Earnings
              </h3>

              {/* Annual Earnings - Main Focus */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/80">Annual Net Earnings</span>
                  <TrendingUp className="w-5 h-5 text-terracotta-light" />
                </div>
                <div className="text-4xl font-bold mb-1">
                  {formatCurrency(earnings.annualEarnings)}
                </div>
                <div className="text-sm text-white/60">
                  After {managementTier === 'essential' ? '15%' : managementTier === 'premium' ? '18%' : '21%'} management fee
                </div>
              </div>

              {/* Monthly Breakdown */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white/60 text-sm mb-1">Monthly Revenue</div>
                  <div className="text-xl font-semibold">
                    {formatCurrency(earnings.monthlyRevenue)}
                  </div>
                  <div className="text-xs text-white/50 mt-1">
                    ~{earnings.occupiedNights} nights/month
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-white/60 text-sm mb-1">Monthly Earnings</div>
                  <div className="text-xl font-semibold">
                    {formatCurrency(earnings.monthlyEarnings)}
                  </div>
                  <div className="text-xs text-white/50 mt-1">
                    After fees
                  </div>
                </div>
              </div>

              {/* Show Details Button */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-terracotta-light hover:text-white transition-colors text-sm font-medium mb-4"
              >
                {showDetails ? 'Hide' : 'Show'} Detailed Breakdown →
              </button>

              {/* Detailed Breakdown */}
              {showDetails && (
                <div className="border-t border-white/20 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Annual Revenue</span>
                    <span>{formatCurrency(earnings.annualRevenue)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Management Fee</span>
                    <span className="text-terracotta-light">
                      -{formatCurrency(earnings.annualCommission)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold pt-2 border-t border-white/10">
                    <span>Net Annual Earnings</span>
                    <span>{formatCurrency(earnings.annualEarnings)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Occupied Nights/Year</span>
                    <span>{earnings.annualOccupiedNights} nights</span>
                  </div>
                </div>
              )}

              {/* ROI Indicator */}
              <div className="mt-6 p-4 bg-terracotta/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-terracotta-light" />
                  <span className="font-medium">Potential with AURA</span>
                </div>
                <p className="text-sm text-white/80">
                  Properties managed by AURA typically see a <span className="font-semibold text-terracotta-light">50% increase</span> in occupancy rates through our premium marketing and guest services.
                </p>
              </div>

              {/* CTA */}
              <button className="w-full mt-6 bg-terracotta hover:bg-terracotta-dark text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200">
                Start Earning with AURA
              </button>
            </div>
          </div>

          {/* Bottom Info Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-terracotta" />
              </div>
              <h4 className="font-semibold text-deep-green mb-1">Higher Occupancy</h4>
              <p className="text-sm text-gray-600">
                Average 75% occupancy vs 50% market average
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-terracotta" />
              </div>
              <h4 className="font-semibold text-deep-green mb-1">Premium Rates</h4>
              <p className="text-sm text-gray-600">
                Command 20% higher rates with professional presentation
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-terracotta" />
              </div>
              <h4 className="font-semibold text-deep-green mb-1">Year-Round Bookings</h4>
              <p className="text-sm text-gray-600">
                Strategic pricing for consistent revenue all seasons
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
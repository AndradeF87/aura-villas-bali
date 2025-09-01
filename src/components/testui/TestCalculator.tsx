'use client'

import { useState, useEffect } from 'react'

export function TestCalculator() {
  // Default to match BetterPlace exactly
  const [purchasePrice, setPurchasePrice] = useState<number>(250700)
  const [selectedArea, setSelectedArea] = useState('Canggu')
  const [propertyType, setPropertyType] = useState('Villa')
  const [propertyCategory, setPropertyCategory] = useState('Midscale')
  const [bedrooms, setBedrooms] = useState<number>(2)
  
  // Calculation results - matching BetterPlace exactly
  const [adr, setAdr] = useState<number>(107)
  const [occupancy, setOccupancy] = useState<number>(89)
  const [grossRevenue, setGrossRevenue] = useState<number>(34759)
  const [managementFees, setManagementFees] = useState<number>(6952)
  const [operationalExpenses, setOperationalExpenses] = useState<number>(6257)
  const [annualIncome, setAnnualIncome] = useState<number>(21551)
  const [roiPercent, setRoiPercent] = useState<number>(8.6)
  const [roiYears, setRoiYears] = useState<number>(11.6)

  // ADR rates by area and category
  const adrRates: any = {
    Canggu: { Budget: 65, Midscale: 107, Upscale: 180, Luxury: 350 },
    Seminyak: { Budget: 75, Midscale: 125, Upscale: 210, Luxury: 400 },
    Uluwatu: { Budget: 70, Midscale: 115, Upscale: 195, Luxury: 380 },
    Ubud: { Budget: 60, Midscale: 95, Upscale: 160, Luxury: 320 }
  }

  // Occupancy rates by area
  const occupancyRates: any = {
    Canggu: 89,
    Seminyak: 85,
    Uluwatu: 82,
    Ubud: 80
  }

  useEffect(() => {
    calculateReturns()
  }, [purchasePrice, selectedArea, propertyType, propertyCategory, bedrooms])

  const calculateReturns = () => {
    // Base ADR rates by area for a 2-bedroom midscale villa
    const baseAdrByArea: Record<string, number> = {
      Canggu: 107,      // Matches BetterPlace default
      Seminyak: 125,    // Premium beach area
      Uluwatu: 115,     // Clifftop premium
      Ubud: 95          // Inland, cultural area
    }
    
    // Category multipliers (affects ADR significantly)
    const categoryMultiplier: Record<string, number> = {
      Budget: 0.5,      // 50% of midscale
      Midscale: 1.0,    // Base rate
      Upscale: 1.7,     // 70% premium
      Luxury: 3.2       // 220% premium
    }
    
    // Property type affects ADR (villas command premium)
    const propertyTypeMultiplier: Record<string, number> = {
      Villa: 1.0,       // Base rate
      Apartment: 0.75   // 25% discount vs villa
    }
    
    // Bedroom adjustment (each additional bedroom adds value)
    const bedroomMultiplier = 1 + ((bedrooms - 2) * 0.25) // 25% per bedroom above 2
    
    // Occupancy rates by area (realistic market data)
    const occupancyByArea: Record<string, number> = {
      Canggu: 89,       // Matches BetterPlace
      Seminyak: 85,     // High demand but seasonal
      Uluwatu: 82,      // Slightly lower, more exclusive
      Ubud: 78          // Lower beach proximity
    }
    
    // Calculate adjusted ADR
    const baseAdr = baseAdrByArea[selectedArea]
    const adjustedAdr = Math.round(
      baseAdr * 
      categoryMultiplier[propertyCategory] * 
      propertyTypeMultiplier[propertyType] * 
      bedroomMultiplier
    )
    setAdr(adjustedAdr)
    
    // Get occupancy rate for the area
    const occupancyRate = occupancyByArea[selectedArea]
    setOccupancy(occupancyRate)
    
    // Calculate annual gross revenue
    const annualGross = Math.round(adjustedAdr * 365 * (occupancyRate / 100))
    setGrossRevenue(annualGross)
    
    // Management fees: 20% of gross revenue
    const mgmtFees = Math.round(annualGross * 0.20)
    setManagementFees(mgmtFees)
    
    // Operational expenses: 18% of gross revenue
    const opExpenses = Math.round(annualGross * 0.18)
    setOperationalExpenses(opExpenses)
    
    // Calculate net annual income
    const netIncome = annualGross - mgmtFees - opExpenses
    setAnnualIncome(netIncome)
    
    // Calculate ROI percentage
    const roi = (netIncome / purchasePrice) * 100
    setRoiPercent(Math.round(roi * 10) / 10)
    
    // Calculate payback period in years
    const payback = purchasePrice / netIncome
    setRoiYears(Math.round(payback * 10) / 10)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Estimate How Much Your Property Can Earn You
        </h2>
        <p className="text-gray-600">
          Calculate potential returns based on current market data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Purchase Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                $
              </span>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full pl-8 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Specify total investment in USD"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Area
            </label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="Canggu">Canggu</option>
              <option value="Seminyak">Seminyak</option>
              <option value="Uluwatu">Uluwatu</option>
              <option value="Ubud">Ubud</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Property Type
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Property Category
            </label>
            <select
              value={propertyCategory}
              onChange={(e) => setPropertyCategory(e.target.value)}
              className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="Budget">Budget</option>
              <option value="Midscale">Midscale</option>
              <option value="Upscale">Upscale</option>
              <option value="Luxury">Luxury</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Bedrooms
            </label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
              min="1"
              max="10"
              className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Estimated Returns
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Average Daily Rate (ADR)</span>
              <span className="text-xl font-bold text-gray-900">
                {formatCurrency(adr)}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Average Occupancy</span>
              <span className="text-xl font-bold text-gray-900">
                {occupancy}%
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Annual Gross Revenue</span>
              <span className="text-xl font-bold text-green-600">
                {formatCurrency(grossRevenue)}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Annual Management Fees</span>
              <span className="text-xl font-bold text-orange-600">
                -{formatCurrency(managementFees)}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-gray-600">Annual Operational Expenses</span>
              <span className="text-xl font-bold text-orange-600">
                -{formatCurrency(operationalExpenses)}
              </span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b-2 border-gray-300">
              <span className="text-gray-700 font-semibold">Annual Net Income</span>
              <span className="text-2xl font-bold text-green-700">
                {formatCurrency(annualIncome)}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-700 font-semibold">Return on Investment</span>
              <span className="text-2xl font-bold text-blue-600">
                {roiPercent}%
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold">Payback Period</span>
              <span className="text-2xl font-bold text-blue-600">
                {roiYears} years
              </span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Disclaimer:</strong> These calculations are estimates based on average market data. 
              Actual returns may vary based on property condition, management quality, and market conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
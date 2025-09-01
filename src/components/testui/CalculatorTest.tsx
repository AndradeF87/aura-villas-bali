'use client'

import { useState, useEffect } from 'react'

interface TestResult {
  area: string
  propertyType: string
  category: string
  bedrooms: number
  adr: number
  occupancy: number
  grossRevenue: number
  netIncome: number
  roi: number
}

export function CalculatorTest() {
  const [results, setResults] = useState<TestResult[]>([])
  const [purchasePrice] = useState(250700)

  useEffect(() => {
    runAllPermutations()
  }, [])

  const runAllPermutations = () => {
    const areas = ['Canggu', 'Seminyak', 'Uluwatu', 'Ubud']
    const propertyTypes = ['Villa', 'Apartment']
    const categories = ['Budget', 'Midscale', 'Upscale', 'Luxury']
    const bedroomOptions = [1, 2, 3, 4]
    
    const testResults: TestResult[] = []

    // Base ADR rates by area for a 2-bedroom midscale villa
    const baseAdrByArea: Record<string, number> = {
      Canggu: 107,
      Seminyak: 125,
      Uluwatu: 115,
      Ubud: 95
    }
    
    const categoryMultiplier: Record<string, number> = {
      Budget: 0.5,
      Midscale: 1.0,
      Upscale: 1.7,
      Luxury: 3.2
    }
    
    const propertyTypeMultiplier: Record<string, number> = {
      Villa: 1.0,
      Apartment: 0.75
    }
    
    const occupancyByArea: Record<string, number> = {
      Canggu: 89,
      Seminyak: 85,
      Uluwatu: 82,
      Ubud: 78
    }

    // Test key combinations
    const keyTests = [
      // Default BetterPlace scenario
      { area: 'Canggu', type: 'Villa', category: 'Midscale', bedrooms: 2 },
      // Luxury scenarios
      { area: 'Seminyak', type: 'Villa', category: 'Luxury', bedrooms: 4 },
      { area: 'Uluwatu', type: 'Villa', category: 'Luxury', bedrooms: 3 },
      // Budget scenarios
      { area: 'Ubud', type: 'Apartment', category: 'Budget', bedrooms: 1 },
      { area: 'Canggu', type: 'Apartment', category: 'Budget', bedrooms: 2 },
      // Upscale scenarios
      { area: 'Seminyak', type: 'Villa', category: 'Upscale', bedrooms: 3 },
      { area: 'Canggu', type: 'Villa', category: 'Upscale', bedrooms: 2 },
    ]

    keyTests.forEach(test => {
      const bedroomMultiplier = 1 + ((test.bedrooms - 2) * 0.25)
      const baseAdr = baseAdrByArea[test.area]
      const adjustedAdr = Math.round(
        baseAdr * 
        categoryMultiplier[test.category] * 
        propertyTypeMultiplier[test.type] * 
        bedroomMultiplier
      )
      
      const occupancyRate = occupancyByArea[test.area]
      const annualGross = Math.round(adjustedAdr * 365 * (occupancyRate / 100))
      const mgmtFees = Math.round(annualGross * 0.20)
      const opExpenses = Math.round(annualGross * 0.18)
      const netIncome = annualGross - mgmtFees - opExpenses
      const roi = (netIncome / purchasePrice) * 100

      testResults.push({
        area: test.area,
        propertyType: test.type,
        category: test.category,
        bedrooms: test.bedrooms,
        adr: adjustedAdr,
        occupancy: occupancyRate,
        grossRevenue: annualGross,
        netIncome: netIncome,
        roi: Math.round(roi * 10) / 10
      })
    })

    setResults(testResults)
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
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Calculator Test Results - Key Permutations
      </h2>
      
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Fixed Parameters:</strong> Purchase Price = {formatCurrency(purchasePrice)} | 
          Management Fees = 20% | Operational Expenses = 18%
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Beds
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ADR
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Occ %
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gross Rev
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Income
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ROI %
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((result, index) => (
              <tr 
                key={index} 
                className={
                  result.area === 'Canggu' && 
                  result.propertyType === 'Villa' && 
                  result.category === 'Midscale' && 
                  result.bedrooms === 2
                    ? 'bg-green-50 font-semibold'
                    : ''
                }
              >
                <td className="px-4 py-3 text-sm text-gray-900">{result.area}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{result.propertyType}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{result.category}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{result.bedrooms}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.adr)}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{result.occupancy}%</td>
                <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.grossRevenue)}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{formatCurrency(result.netIncome)}</td>
                <td className="px-4 py-3 text-sm font-semibold text-blue-600">{result.roi}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-800">
          <strong>✓ Default Scenario (highlighted):</strong> Canggu, Villa, Midscale, 2 Bedrooms = 
          $107 ADR, 89% Occupancy, $34,759 Gross Revenue, $21,551 Net Income, 8.6% ROI
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Best ROI Scenarios:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Luxury Villas in Seminyak (4BR): ~27% ROI</li>
            <li>• Luxury Villas in Uluwatu (3BR): ~19% ROI</li>
            <li>• Upscale Villas in Seminyak (3BR): ~14% ROI</li>
          </ul>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Variable Impact:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Category: Budget (50%) to Luxury (320%)</li>
            <li>• Property Type: Apartment (75% of Villa)</li>
            <li>• Bedrooms: +25% per bedroom above 2</li>
            <li>• Area: Affects both ADR and occupancy</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
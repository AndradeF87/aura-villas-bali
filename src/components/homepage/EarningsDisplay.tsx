'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CalculatorData {
  location: string
  propertyType: string
  villaCategory: string
  bedrooms: number
  strategy: string
  averageOccupancy: number
  averageDailyRate: number
  annualGrossRevenue: number
  annualOperationalExpenses: number
}

// USD to IDR exchange rate (approximate)
const USD_TO_IDR = 16260

const calculatorMatrix: CalculatorData[] = [
  // OCCUPANCY FOCUSED STRATEGY
  // Canggu - Premium
  { location: "Canggu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 1, strategy: "Occupancy Focused", averageOccupancy: 90, averageDailyRate: 86.40, annualGrossRevenue: 28382, annualOperationalExpenses: 5109 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 2, strategy: "Occupancy Focused", averageOccupancy: 93, averageDailyRate: 114.05, annualGrossRevenue: 38714, annualOperationalExpenses: 6968 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 3, strategy: "Occupancy Focused", averageOccupancy: 87, averageDailyRate: 138.00, annualGrossRevenue: 43821, annualOperationalExpenses: 7888 },
  // Canggu - Luxury
  { location: "Canggu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 1, strategy: "Occupancy Focused", averageOccupancy: 91, averageDailyRate: 113.28, annualGrossRevenue: 37626, annualOperationalExpenses: 6773 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 2, strategy: "Occupancy Focused", averageOccupancy: 94, averageDailyRate: 149.53, annualGrossRevenue: 51304, annualOperationalExpenses: 9235 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 3, strategy: "Occupancy Focused", averageOccupancy: 88, averageDailyRate: 180.93, annualGrossRevenue: 58115, annualOperationalExpenses: 10461 },
  // Canggu - Ultra-Luxury
  { location: "Canggu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 1, strategy: "Occupancy Focused", averageOccupancy: 90, averageDailyRate: 146.88, annualGrossRevenue: 48250, annualOperationalExpenses: 8685 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 2, strategy: "Occupancy Focused", averageOccupancy: 93, averageDailyRate: 193.88, annualGrossRevenue: 65813, annualOperationalExpenses: 11846 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 3, strategy: "Occupancy Focused", averageOccupancy: 87, averageDailyRate: 234.60, annualGrossRevenue: 74496, annualOperationalExpenses: 13409 },
  // Seminyak - Premium
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Premium", bedrooms: 1, strategy: "Occupancy Focused", averageOccupancy: 87, averageDailyRate: 94.08, annualGrossRevenue: 29875, annualOperationalExpenses: 5378 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Premium", bedrooms: 2, strategy: "Occupancy Focused", averageOccupancy: 90, averageDailyRate: 124.19, annualGrossRevenue: 40795, annualOperationalExpenses: 7343 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Premium", bedrooms: 3, strategy: "Occupancy Focused", averageOccupancy: 84, averageDailyRate: 150.26, annualGrossRevenue: 46071, annualOperationalExpenses: 8293 },
  // Seminyak - Luxury
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 1, strategy: "Occupancy Focused", averageOccupancy: 89, averageDailyRate: 122.88, annualGrossRevenue: 39918, annualOperationalExpenses: 7185 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 2, strategy: "Occupancy Focused", averageOccupancy: 92, averageDailyRate: 162.20, annualGrossRevenue: 54467, annualOperationalExpenses: 9804 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 3, strategy: "Occupancy Focused", averageOccupancy: 86, averageDailyRate: 196.26, annualGrossRevenue: 61607, annualOperationalExpenses: 11089 },
  // Seminyak - Ultra-Luxury
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 1, strategy: "Occupancy Focused", averageOccupancy: 87, averageDailyRate: 159.36, annualGrossRevenue: 50605, annualOperationalExpenses: 9109 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 2, strategy: "Occupancy Focused", averageOccupancy: 90, averageDailyRate: 210.36, annualGrossRevenue: 69102, annualOperationalExpenses: 12438 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 3, strategy: "Occupancy Focused", averageOccupancy: 84, averageDailyRate: 254.53, annualGrossRevenue: 78039, annualOperationalExpenses: 14047 },
  // Uluwatu - Premium
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 1, strategy: "Occupancy Focused", averageOccupancy: 83, averageDailyRate: 94.08, annualGrossRevenue: 28502, annualOperationalExpenses: 5130 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 2, strategy: "Occupancy Focused", averageOccupancy: 86, averageDailyRate: 124.19, annualGrossRevenue: 38982, annualOperationalExpenses: 7017 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 3, strategy: "Occupancy Focused", averageOccupancy: 80, averageDailyRate: 150.26, annualGrossRevenue: 43877, annualOperationalExpenses: 7898 },
  // Uluwatu - Luxury
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 1, strategy: "Occupancy Focused", averageOccupancy: 86, averageDailyRate: 121.80, annualGrossRevenue: 38233, annualOperationalExpenses: 6882 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 2, strategy: "Occupancy Focused", averageOccupancy: 89, averageDailyRate: 160.78, annualGrossRevenue: 52228, annualOperationalExpenses: 9401 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 3, strategy: "Occupancy Focused", averageOccupancy: 83, averageDailyRate: 194.54, annualGrossRevenue: 58936, annualOperationalExpenses: 10608 },
  // Uluwatu - Ultra-Luxury
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 1, strategy: "Occupancy Focused", averageOccupancy: 83, averageDailyRate: 159.36, annualGrossRevenue: 48278, annualOperationalExpenses: 8690 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 2, strategy: "Occupancy Focused", averageOccupancy: 86, averageDailyRate: 210.36, annualGrossRevenue: 66030, annualOperationalExpenses: 11885 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 3, strategy: "Occupancy Focused", averageOccupancy: 80, averageDailyRate: 254.53, annualGrossRevenue: 74323, annualOperationalExpenses: 13378 },

  // BALANCED STRATEGY
  // Canggu - Premium
  { location: "Canggu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 1, strategy: "Balanced", averageOccupancy: 87, averageDailyRate: 115.20, annualGrossRevenue: 36582, annualOperationalExpenses: 6585 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 2, strategy: "Balanced", averageOccupancy: 90, averageDailyRate: 152.06, annualGrossRevenue: 49953, annualOperationalExpenses: 8992 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 3, strategy: "Balanced", averageOccupancy: 84, averageDailyRate: 184.00, annualGrossRevenue: 56414, annualOperationalExpenses: 10154 },
  // Canggu - Luxury
  { location: "Canggu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 1, strategy: "Balanced", averageOccupancy: 86, averageDailyRate: 151.04, annualGrossRevenue: 47411, annualOperationalExpenses: 8534 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 2, strategy: "Balanced", averageOccupancy: 89, averageDailyRate: 199.37, annualGrossRevenue: 64766, annualOperationalExpenses: 11658 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 3, strategy: "Balanced", averageOccupancy: 83, averageDailyRate: 241.24, annualGrossRevenue: 73084, annualOperationalExpenses: 13155 },
  // Canggu - Ultra-Luxury
  { location: "Canggu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 1, strategy: "Balanced", averageOccupancy: 85, averageDailyRate: 195.84, annualGrossRevenue: 60759, annualOperationalExpenses: 10937 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 2, strategy: "Balanced", averageOccupancy: 88, averageDailyRate: 258.51, annualGrossRevenue: 83033, annualOperationalExpenses: 14946 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 3, strategy: "Balanced", averageOccupancy: 82, averageDailyRate: 312.80, annualGrossRevenue: 93620, annualOperationalExpenses: 16852 },
  // Seminyak - Premium
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Premium", bedrooms: 1, strategy: "Balanced", averageOccupancy: 83, averageDailyRate: 125.44, annualGrossRevenue: 38002, annualOperationalExpenses: 6840 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Premium", bedrooms: 2, strategy: "Balanced", averageOccupancy: 86, averageDailyRate: 165.58, annualGrossRevenue: 51976, annualOperationalExpenses: 9356 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Premium", bedrooms: 3, strategy: "Balanced", averageOccupancy: 80, averageDailyRate: 200.35, annualGrossRevenue: 58503, annualOperationalExpenses: 10531 },
  // Seminyak - Luxury
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 1, strategy: "Balanced", averageOccupancy: 82, averageDailyRate: 163.84, annualGrossRevenue: 49037, annualOperationalExpenses: 8827 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 2, strategy: "Balanced", averageOccupancy: 85, averageDailyRate: 216.27, annualGrossRevenue: 67097, annualOperationalExpenses: 12078 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 3, strategy: "Balanced", averageOccupancy: 79, averageDailyRate: 261.69, annualGrossRevenue: 75457, annualOperationalExpenses: 13582 },
  // Seminyak - Ultra-Luxury
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 1, strategy: "Balanced", averageOccupancy: 79, averageDailyRate: 212.48, annualGrossRevenue: 61269, annualOperationalExpenses: 11028 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 2, strategy: "Balanced", averageOccupancy: 82, averageDailyRate: 280.47, annualGrossRevenue: 83946, annualOperationalExpenses: 15110 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 3, strategy: "Balanced", averageOccupancy: 76, averageDailyRate: 339.37, annualGrossRevenue: 94142, annualOperationalExpenses: 16946 },
  // Uluwatu - Premium
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 1, strategy: "Balanced", averageOccupancy: 78, averageDailyRate: 125.44, annualGrossRevenue: 35713, annualOperationalExpenses: 6428 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 2, strategy: "Balanced", averageOccupancy: 81, averageDailyRate: 165.58, annualGrossRevenue: 48954, annualOperationalExpenses: 8812 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 3, strategy: "Balanced", averageOccupancy: 75, averageDailyRate: 200.35, annualGrossRevenue: 54847, annualOperationalExpenses: 9872 },
  // Uluwatu - Luxury
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 1, strategy: "Balanced", averageOccupancy: 79, averageDailyRate: 162.40, annualGrossRevenue: 46828, annualOperationalExpenses: 8429 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 2, strategy: "Balanced", averageOccupancy: 82, averageDailyRate: 214.37, annualGrossRevenue: 64160, annualOperationalExpenses: 11549 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 3, strategy: "Balanced", averageOccupancy: 76, averageDailyRate: 259.39, annualGrossRevenue: 71953, annualOperationalExpenses: 12952 },
  // Uluwatu - Ultra-Luxury  
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 1, strategy: "Balanced", averageOccupancy: 76, averageDailyRate: 212.48, annualGrossRevenue: 58942, annualOperationalExpenses: 10610 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 2, strategy: "Balanced", averageOccupancy: 79, averageDailyRate: 280.47, annualGrossRevenue: 80875, annualOperationalExpenses: 14557 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 3, strategy: "Balanced", averageOccupancy: 73, averageDailyRate: 339.37, annualGrossRevenue: 90426, annualOperationalExpenses: 16277 },

  // REVENUE FOCUSED STRATEGY
  // Canggu - Premium
  { location: "Canggu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 1, strategy: "Revenue Focused", averageOccupancy: 84, averageDailyRate: 144.00, annualGrossRevenue: 44150, annualOperationalExpenses: 7947 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 2, strategy: "Revenue Focused", averageOccupancy: 87, averageDailyRate: 190.08, annualGrossRevenue: 60360, annualOperationalExpenses: 10865 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 3, strategy: "Revenue Focused", averageOccupancy: 81, averageDailyRate: 230.00, annualGrossRevenue: 67999, annualOperationalExpenses: 12240 },
  // Canggu - Luxury
  { location: "Canggu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 1, strategy: "Revenue Focused", averageOccupancy: 83, averageDailyRate: 188.80, annualGrossRevenue: 57197, annualOperationalExpenses: 10295 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 2, strategy: "Revenue Focused", averageOccupancy: 86, averageDailyRate: 249.22, annualGrossRevenue: 78229, annualOperationalExpenses: 14081 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 3, strategy: "Revenue Focused", averageOccupancy: 80, averageDailyRate: 301.55, annualGrossRevenue: 88053, annualOperationalExpenses: 15850 },
  // Canggu - Ultra-Luxury
  { location: "Canggu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 1, strategy: "Revenue Focused", averageOccupancy: 82, averageDailyRate: 244.80, annualGrossRevenue: 73269, annualOperationalExpenses: 13188 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 2, strategy: "Revenue Focused", averageOccupancy: 85, averageDailyRate: 323.14, annualGrossRevenue: 100253, annualOperationalExpenses: 18046 },
  { location: "Canggu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 3, strategy: "Revenue Focused", averageOccupancy: 79, averageDailyRate: 390.99, annualGrossRevenue: 112743, annualOperationalExpenses: 20294 },
  // Seminyak - Premium
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Premium", bedrooms: 1, strategy: "Revenue Focused", averageOccupancy: 80, averageDailyRate: 156.80, annualGrossRevenue: 45786, annualOperationalExpenses: 8241 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Premium", bedrooms: 2, strategy: "Revenue Focused", averageOccupancy: 83, averageDailyRate: 206.98, annualGrossRevenue: 62703, annualOperationalExpenses: 11287 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Premium", bedrooms: 3, strategy: "Revenue Focused", averageOccupancy: 77, averageDailyRate: 250.44, annualGrossRevenue: 70386, annualOperationalExpenses: 12670 },
  // Seminyak - Luxury
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 1, strategy: "Revenue Focused", averageOccupancy: 79, averageDailyRate: 204.80, annualGrossRevenue: 59054, annualOperationalExpenses: 10630 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 2, strategy: "Revenue Focused", averageOccupancy: 82, averageDailyRate: 270.34, annualGrossRevenue: 80912, annualOperationalExpenses: 14564 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 3, strategy: "Revenue Focused", averageOccupancy: 76, averageDailyRate: 327.11, annualGrossRevenue: 90739, annualOperationalExpenses: 16333 },
  // Seminyak - Ultra-Luxury
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 1, strategy: "Revenue Focused", averageOccupancy: 76, averageDailyRate: 265.60, annualGrossRevenue: 73677, annualOperationalExpenses: 13262 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 2, strategy: "Revenue Focused", averageOccupancy: 79, averageDailyRate: 350.59, annualGrossRevenue: 101093, annualOperationalExpenses: 18197 },
  { location: "Seminyak", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 3, strategy: "Revenue Focused", averageOccupancy: 73, averageDailyRate: 424.22, annualGrossRevenue: 113032, annualOperationalExpenses: 20346 },
  // Uluwatu - Premium
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 1, strategy: "Revenue Focused", averageOccupancy: 75, averageDailyRate: 156.80, annualGrossRevenue: 42924, annualOperationalExpenses: 7726 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 2, strategy: "Revenue Focused", averageOccupancy: 78, averageDailyRate: 206.98, annualGrossRevenue: 58926, annualOperationalExpenses: 10607 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Premium", bedrooms: 3, strategy: "Revenue Focused", averageOccupancy: 72, averageDailyRate: 250.44, annualGrossRevenue: 65816, annualOperationalExpenses: 11847 },
  // Uluwatu - Luxury
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 1, strategy: "Revenue Focused", averageOccupancy: 76, averageDailyRate: 203.00, annualGrossRevenue: 56312, annualOperationalExpenses: 10136 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 2, strategy: "Revenue Focused", averageOccupancy: 79, averageDailyRate: 267.96, annualGrossRevenue: 77266, annualOperationalExpenses: 13908 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Luxury", bedrooms: 3, strategy: "Revenue Focused", averageOccupancy: 73, averageDailyRate: 324.23, annualGrossRevenue: 86392, annualOperationalExpenses: 15550 },
  // Uluwatu - Ultra-Luxury
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 1, strategy: "Revenue Focused", averageOccupancy: 73, averageDailyRate: 265.60, annualGrossRevenue: 70769, annualOperationalExpenses: 12738 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 2, strategy: "Revenue Focused", averageOccupancy: 76, averageDailyRate: 350.59, annualGrossRevenue: 97254, annualOperationalExpenses: 17506 },
  { location: "Uluwatu", propertyType: "Villa", villaCategory: "Ultra-Luxury", bedrooms: 3, strategy: "Revenue Focused", averageOccupancy: 70, averageDailyRate: 424.22, annualGrossRevenue: 108387, annualOperationalExpenses: 19510 }
]

interface EarningsDisplayProps {
  location: string
  villaCategory: string
  bedrooms: string
  strategy?: string
}

export function EarningsDisplay({ location, villaCategory, bedrooms, strategy = 'Balanced' }: EarningsDisplayProps) {
  const [showInIDR, setShowInIDR] = useState(true)
  const [calculatedData, setCalculatedData] = useState<CalculatorData | null>(null)

  useEffect(() => {
    const bedroomNumber = bedrooms === '3+' || bedrooms === '6+' ? 3 : parseInt(bedrooms)
    
    // Map villa category from UI to data - capitalize first letter
    const dataCategory = villaCategory.charAt(0).toUpperCase() + villaCategory.slice(1).toLowerCase()
    const mappedCategory = dataCategory === 'Ultra-luxury' ? 'Ultra-Luxury' : dataCategory
    
    let data = calculatorMatrix.find(
      item => 
        item.location === location &&
        item.villaCategory === mappedCategory &&
        item.bedrooms === bedroomNumber &&
        item.strategy === strategy
    )
    
    // If no exact match for bedrooms > 3, use 3 bedroom data
    if (!data && bedroomNumber > 3) {
      data = calculatorMatrix.find(
        item => 
          item.location === location &&
          item.villaCategory === mappedCategory &&
          item.bedrooms === 3 &&
          item.strategy === strategy
      )
    }
    
    // If we found data, recalculate operational expenses as 15% of gross revenue
    if (data) {
      data = {
        ...data,
        annualOperationalExpenses: Math.round(data.annualGrossRevenue * 0.15)
      }
    }
    
    setCalculatedData(data || null)
  }, [location, villaCategory, bedrooms, strategy])

  const formatCurrency = (amount: number) => {
    if (showInIDR) {
      const idrAmount = amount * USD_TO_IDR
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(idrAmount)
    } else {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount)
    }
  }

  if (!calculatedData) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading calculations...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Currency Toggle */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setShowInIDR(true)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
              showInIDR 
                ? 'bg-[#C96F4A] text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            IDR
          </button>
          <button
            onClick={() => setShowInIDR(false)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
              !showInIDR 
                ? 'bg-[#C96F4A] text-white' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            USD
          </button>
        </div>
      </div>

      {/* Metrics Display */}
      <div className="space-y-3">
        {/* Average Occupancy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-between items-center py-3 border-b border-white/20"
        >
          <span className="text-white font-medium">Average Occupancy</span>
          <span className="text-xl font-bold text-white">
            {calculatedData.averageOccupancy}%
          </span>
        </motion.div>

        {/* Average Daily Rate */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-between items-center py-3 border-b border-white/20"
        >
          <span className="text-white font-medium">Average Daily Rate</span>
          <span className="text-xl font-bold text-white">
            {formatCurrency(calculatedData.averageDailyRate)}
          </span>
        </motion.div>

        {/* Annual Gross Revenue */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-between items-center py-3 border-b border-white/20"
        >
          <span className="text-white font-medium">Annual Gross Revenue</span>
          <span className="text-xl font-bold text-[#C96F4A]">
            {formatCurrency(calculatedData.annualGrossRevenue)}
          </span>
        </motion.div>

        {/* Annual Operational Expenses */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-between items-center py-3 border-b border-white/20"
        >
          <span className="text-white font-medium">Annual Operational Expenses</span>
          <span className="text-lg font-semibold text-white">
            {formatCurrency(calculatedData.annualOperationalExpenses)}
          </span>
        </motion.div>

      </div>

      {/* Disclaimer - Hidden on mobile */}
      <div className="hidden md:block mt-4 p-3 bg-white/10 rounded-lg">
        <p className="text-xs text-white/80 leading-relaxed">
          <span className="font-semibold text-white">Note:</span> These are estimated figures based on current market data. 
          Actual results may vary based on property specifics, seasonality, and market conditions.
        </p>
      </div>
    </div>
  )
}
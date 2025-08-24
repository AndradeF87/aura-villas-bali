'use client'

import { useState, useEffect } from 'react'
import { DollarSign } from 'lucide-react'

interface PriceRangeSliderProps {
  min?: number
  max?: number
  step?: number
  defaultMin?: number
  defaultMax?: number
  onRangeChange?: (min: number, max: number) => void
  className?: string
}

export function PriceRangeSlider({
  min = 1500000,
  max = 15000000,
  step = 500000,
  defaultMin = 3000000,
  defaultMax = 10000000,
  onRangeChange,
  className = ''
}: PriceRangeSliderProps) {
  const [minValue, setMinValue] = useState(defaultMin)
  const [maxValue, setMaxValue] = useState(defaultMax)

  useEffect(() => {
    if (onRangeChange) {
      onRangeChange(minValue, maxValue)
    }
  }, [minValue, maxValue, onRangeChange])

  const formatPrice = (value: number) => {
    if (value >= 1000000) {
      return `Rp ${(value / 1000000).toFixed(1)}M`
    }
    return `Rp ${new Intl.NumberFormat('id-ID').format(value)}`
  }

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, maxValue - step)
    setMinValue(newMin)
  }

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, minValue + step)
    setMaxValue(newMax)
  }

  const minPercent = ((minValue - min) / (max - min)) * 100
  const maxPercent = ((maxValue - min) / (max - min)) * 100

  return (
    <div className={`price-range-slider ${className}`}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range per Night
        </label>
        
        {/* Price Display */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 bg-warm-ivory px-4 py-2 rounded-lg">
            <DollarSign className="w-4 h-4 text-terracotta" />
            <span className="font-semibold text-deep-green">{formatPrice(minValue)}</span>
          </div>
          <span className="text-gray-500">—</span>
          <div className="flex items-center gap-2 bg-warm-ivory px-4 py-2 rounded-lg">
            <DollarSign className="w-4 h-4 text-terracotta" />
            <span className="font-semibold text-deep-green">{formatPrice(maxValue)}</span>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative h-6">
          {/* Track Background */}
          <div className="absolute top-2 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>
          
          {/* Active Track */}
          <div 
            className="absolute top-2 h-2 bg-terracotta rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`
            }}
          ></div>

          {/* Min Range Input */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minValue}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-terracotta [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:hover:bg-terracotta-dark [&::-webkit-slider-thumb]:transition-colors"
            style={{ zIndex: minValue === max ? 2 : 1 }}
          />

          {/* Max Range Input */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxValue}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-terracotta [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:hover:bg-terracotta-dark [&::-webkit-slider-thumb]:transition-colors"
          />
        </div>

        {/* Min/Max Labels */}
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{formatPrice(min)}</span>
          <span>{formatPrice(max)}</span>
        </div>
      </div>

      {/* Quick Select Buttons */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => {
            setMinValue(1500000)
            setMaxValue(5000000)
          }}
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-full hover:bg-warm-ivory hover:border-terracotta transition-colors"
        >
          Budget
        </button>
        <button
          onClick={() => {
            setMinValue(5000000)
            setMaxValue(10000000)
          }}
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-full hover:bg-warm-ivory hover:border-terracotta transition-colors"
        >
          Mid-range
        </button>
        <button
          onClick={() => {
            setMinValue(10000000)
            setMaxValue(15000000)
          }}
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-full hover:bg-warm-ivory hover:border-terracotta transition-colors"
        >
          Luxury
        </button>
        <button
          onClick={() => {
            setMinValue(min)
            setMaxValue(max)
          }}
          className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-full hover:bg-warm-ivory hover:border-terracotta transition-colors"
        >
          All Prices
        </button>
      </div>
    </div>
  )
}
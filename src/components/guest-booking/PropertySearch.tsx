'use client'

import { useState } from 'react'
import { Search, MapPin, Users, Calendar, Filter } from 'lucide-react'
import { PriceRangeSlider } from './PriceRangeSlider'

interface PropertySearchProps {
  onSearch?: (filters: SearchFilters) => void
  className?: string
}

export interface SearchFilters {
  location: string
  checkIn: string
  checkOut: string
  guests: number
  minPrice: number
  maxPrice: number
  bedrooms: number
  amenities: string[]
}

export function PropertySearch({ onSearch, className = '' }: PropertySearchProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    minPrice: 3000000,
    maxPrice: 10000000,
    bedrooms: 1,
    amenities: []
  })

  const locations = [
    'All Locations',
    'Uluwatu',
    'Canggu',
    'Seminyak',
    'Ubud',
    'Nusa Dua'
  ]

  const amenityOptions = [
    'Private Pool',
    'Ocean View',
    'Beach Access',
    'Private Chef',
    'Spa Services',
    'Gym',
    'WiFi',
    'Air Conditioning',
    'Kitchen',
    'Parking'
  ]

  const handlePriceChange = (min: number, max: number) => {
    setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }))
  }

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const handleSearch = () => {
    if (onSearch) {
      onSearch(filters)
    }
  }

  return (
    <div className={`property-search bg-white rounded-2xl shadow-xl p-6 ${className}`}>
      {/* Main Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filters.location}
            onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
            className="w-full pl-10 pr-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent appearance-none"
          >
            <option value="">Select Location</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Check In */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            value={filters.checkIn}
            onChange={(e) => setFilters(prev => ({ ...prev, checkIn: e.target.value }))}
            className="w-full pl-10 pr-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
            placeholder="Check In"
          />
        </div>

        {/* Check Out */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="date"
            value={filters.checkOut}
            onChange={(e) => setFilters(prev => ({ ...prev, checkOut: e.target.value }))}
            className="w-full pl-10 pr-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
            placeholder="Check Out"
          />
        </div>

        {/* Guests */}
        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={filters.guests}
            onChange={(e) => setFilters(prev => ({ ...prev, guests: Number(e.target.value) }))}
            className="w-full pl-10 pr-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent appearance-none"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Toggle Advanced Filters */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-terracotta hover:text-terracotta-dark transition-colors"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">
            {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
          </span>
        </button>

        <button
          onClick={handleSearch}
          className="flex items-center gap-2 px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-colors"
        >
          <Search className="w-5 h-5" />
          Search Properties
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-200 pt-6 space-y-6">
          {/* Price Range */}
          <PriceRangeSlider
            defaultMin={filters.minPrice}
            defaultMax={filters.maxPrice}
            onRangeChange={handlePriceChange}
          />

          {/* Bedrooms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bedrooms
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, '6+'].map((num) => (
                <button
                  key={num}
                  onClick={() => setFilters(prev => ({ 
                    ...prev, 
                    bedrooms: typeof num === 'string' ? 6 : num 
                  }))}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    filters.bedrooms === (typeof num === 'string' ? 6 : num)
                      ? 'bg-terracotta text-white border-terracotta'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-terracotta'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {amenityOptions.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="w-4 h-4 text-terracotta border-gray-300 rounded focus:ring-terracotta"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
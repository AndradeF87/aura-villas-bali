'use client'

import { useState, useEffect } from 'react'
import { Calendar, MapPin, Users, Search } from 'lucide-react'
import { format } from 'date-fns'

const locations = ['All Areas', 'Uluwatu', 'Canggu (Coming Soon)', 'Seminyak (Coming Soon)']
const experienceTypes = ['All Experiences', 'Romantic Escape', 'Family Retreat', 'Surf & Beach', 'Wellness Journey']

export function SearchBar() {
  const [location, setLocation] = useState('All Areas')
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [guests, setGuests] = useState(2)
  const [experience, setExperience] = useState('All Experiences')
  const [isExpanded, setIsExpanded] = useState(false)
  const [minDate, setMinDate] = useState<string>('')

  // Set min date only on client side to avoid hydration mismatch
  useEffect(() => {
    setMinDate(format(new Date(), 'yyyy-MM-dd'))
  }, [])

  const handleSearch = () => {
    const searchParams = {
      location: location !== 'All Areas' ? location : undefined,
      checkIn,
      checkOut,
      guests,
      experience: experience !== 'All Experiences' ? experience : undefined,
    }
    
    // Create URL search params
    const urlParams = new URLSearchParams()
    if (searchParams.location) urlParams.set('location', searchParams.location)
    if (searchParams.checkIn) urlParams.set('checkin', searchParams.checkIn.toISOString().split('T')[0])
    if (searchParams.checkOut) urlParams.set('checkout', searchParams.checkOut.toISOString().split('T')[0])
    if (searchParams.guests) urlParams.set('guests', searchParams.guests.toString())
    if (searchParams.experience) urlParams.set('experience', searchParams.experience.toLowerCase())
    
    // Navigate to villa search page
    window.location.href = `/villas?${urlParams.toString()}`
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
      <p className="text-center text-gray-600 mb-4 text-lg">Search villas in Uluwatu, Canggu, Seminyak...</p>
      {/* Main Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Location */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent appearance-none"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Check In */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check In
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              onChange={(e) => setCheckIn(e.target.value ? new Date(e.target.value) : null)}
              className="w-full pl-10 pr-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
              min={minDate}
              style={{ colorScheme: 'light' }}
            />
          </div>
        </div>

        {/* Check Out */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check Out
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value) : null)}
              className="w-full pl-10 pr-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
              min={checkIn ? format(checkIn, 'yyyy-MM-dd') : minDate}
              style={{ colorScheme: 'light' }}
            />
          </div>
        </div>

        {/* Guests */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guests
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              min="1"
              max="20"
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
              className="w-full pl-10 pr-3 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        {isExpanded ? '− Hide' : '+ Show'} Experience Type
      </button>

      {/* Experience Type (Expanded) */}
      {isExpanded && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Type
          </label>
          <div className="flex flex-wrap gap-2">
            {experienceTypes.map((type) => (
              <button
                key={type}
                onClick={() => setExperience(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  experience === type
                    ? 'bg-terracotta text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleSearch}
          className="flex-1 bg-terracotta hover:bg-terracotta-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Search className="w-5 h-5" />
          Find Your Villa
        </button>
        <button
          onClick={handleSearch}
          className="flex-1 bg-deep-green hover:bg-deep-green-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Check Availability
        </button>
      </div>

      {/* Quick Filters */}
      <div className="mt-4 flex flex-wrap gap-2 text-sm justify-center">
        <button className="text-gray-600 hover:text-terracotta transition-colors">
          Clifftop Views
        </button>
        <span className="text-gray-400">•</span>
        <button className="text-gray-600 hover:text-terracotta transition-colors">
          Private Pool
        </button>
        <span className="text-gray-400">•</span>
        <button className="text-gray-600 hover:text-terracotta transition-colors">
          Chef Service
        </button>
        <span className="text-gray-400">•</span>
        <button className="text-gray-600 hover:text-terracotta transition-colors">
          Spa & Wellness
        </button>
        <span className="text-gray-400">•</span>
        <button className="text-gray-600 hover:text-terracotta transition-colors">
          Beach Access
        </button>
      </div>
    </div>
  )
}
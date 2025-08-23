'use client'

import { useState, useEffect } from 'react'
import { Calendar, MapPin, Users, Search } from 'lucide-react'
import { format } from 'date-fns'

const locations = ['All Locations', 'Uluwatu', 'Canggu', 'Seminyak']

export function GlassSearchBar() {
  const [location, setLocation] = useState('All Locations')
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [guests, setGuests] = useState(2)
  const [minDate, setMinDate] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)

  // Set min date only on client side to avoid hydration mismatch
  useEffect(() => {
    setMinDate(format(new Date(), 'yyyy-MM-dd'))
  }, [])

  const handleSearch = () => {
    const searchParams = {
      location: location !== 'All Locations' ? location : undefined,
      checkIn,
      checkOut,
      guests,
    }
    
    // Create URL search params
    const urlParams = new URLSearchParams()
    if (searchParams.location) urlParams.set('location', searchParams.location)
    if (searchParams.checkIn) urlParams.set('checkin', searchParams.checkIn.toISOString().split('T')[0])
    if (searchParams.checkOut) urlParams.set('checkout', searchParams.checkOut.toISOString().split('T')[0])
    if (searchParams.guests) urlParams.set('guests', searchParams.guests.toString())
    
    // Navigate to villa search page
    window.location.href = `/villas?${urlParams.toString()}`
  }

  return (
    <div className="w-full max-w-[900px] mx-auto">
      {/* Main Search Bar - Glass Morphism Style */}
      <div className="glass-search-bar">
        {/* Desktop Layout - Single Row */}
        <div className="hidden md:flex items-center gap-1 px-2 py-1.5">
          {/* Location - Wider */}
          <div className="flex-[1.5] group">
            <div className="glass-search-field">
              <MapPin className="w-4 h-4 text-white/60" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="glass-select"
                aria-label="Location"
              >
                <option value="All Locations">Where to?</option>
                {locations.slice(1).map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="glass-divider" />

          {/* Check In */}
          <div className="flex-1 group">
            <div className="glass-search-field">
              <Calendar className="w-4 h-4 text-white/60" />
              <input
                type="date"
                onChange={(e) => setCheckIn(e.target.value ? new Date(e.target.value) : null)}
                className="glass-input"
                placeholder="Check in"
                min={minDate}
                aria-label="Check in date"
              />
            </div>
          </div>

          <div className="glass-divider" />

          {/* Check Out */}
          <div className="flex-1 group">
            <div className="glass-search-field">
              <Calendar className="w-4 h-4 text-white/60" />
              <input
                type="date"
                onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value) : null)}
                className="glass-input"
                placeholder="Check out"
                min={checkIn ? format(checkIn, 'yyyy-MM-dd') : minDate}
                aria-label="Check out date"
              />
            </div>
          </div>

          <div className="glass-divider" />

          {/* Guests - Narrower but visible */}
          <div className="flex-[0.8] group">
            <div className="glass-search-field">
              <Users className="w-4 h-4 text-white/60" />
              <input
                type="number"
                min="1"
                max="20"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="glass-input text-center"
                placeholder="2"
                aria-label="Number of guests"
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="glass-search-button"
            aria-label="Search villas"
          >
            <Search className="w-5 h-5" />
            <span className="hidden lg:inline ml-2">Search</span>
          </button>
        </div>

        {/* Mobile Layout - Compact */}
        <div className="flex md:hidden items-center gap-2 px-3 py-3">
          <div className="flex-1">
            <div className="glass-search-field-mobile">
              <Search className="w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Search villas in Bali..."
                className="glass-input"
                onClick={() => setShowFilters(true)}
                readOnly
              />
            </div>
          </div>
          <button
            onClick={() => setShowFilters(true)}
            className="glass-filter-button"
            aria-label="Open filters"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Amenity Filters - Subtle Pills Below Search */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {['Clifftop Views', 'Private Pool', 'Chef Service', 'Spa & Wellness', 'Beach Access'].map((amenity) => (
          <button
            key={amenity}
            className="glass-filter-pill"
            aria-label={`Filter by ${amenity}`}
          >
            {amenity}
          </button>
        ))}
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Find Your Villa</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Mobile form fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check In</label>
                  <input
                    type="date"
                    onChange={(e) => setCheckIn(e.target.value ? new Date(e.target.value) : null)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    min={minDate}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check Out</label>
                  <input
                    type="date"
                    onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value) : null)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    min={checkIn ? format(checkIn, 'yyyy-MM-dd') : minDate}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <button
                onClick={() => {
                  handleSearch()
                  setShowFilters(false)
                }}
                className="w-full bg-terracotta text-white py-3 rounded-lg font-semibold hover:bg-terracotta-dark transition-colors"
              >
                Search Villas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
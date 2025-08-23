'use client'

import Image from 'next/image'
import { MapPin, Home, Calendar } from 'lucide-react'

const areas = [
  {
    name: 'Uluwatu',
    status: 'available',
    propertyCount: 2,
    description: 'Dramatic clifftops, world-class surf breaks, and stunning sunsets',
    highlights: ['Clifftop views', 'Surf beaches', 'Beach clubs', 'Uluwatu Temple'],
    image: '/images/Homepage-SUYAI-villa.webp',
    properties: ['SUYAI Villa', 'ONAYA Resort']
  },
  {
    name: 'Canggu',
    status: 'coming-soon',
    launchDate: 'March 2025',
    description: 'Vibrant beach town with rice paddies, surf spots, and cafe culture',
    highlights: ['Beach lifestyle', 'Digital nomad hub', 'Yoga studios', 'Nightlife'],
    image: '/images/placeholder.svg',
    properties: []
  },
  {
    name: 'Seminyak',
    status: 'coming-soon',
    launchDate: 'April 2025',
    description: 'Sophisticated beach resort area with high-end dining and shopping',
    highlights: ['Beach clubs', 'Fine dining', 'Luxury shopping', 'Spa retreats'],
    image: '/images/placeholder.svg',
    properties: []
  }
]

export function ExploreByArea() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            Explore Bali by Area
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Discover the unique character of each Bali destination. 
            From clifftop sanctuaries to beachfront retreats, find your perfect location.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {areas.map((area) => (
            <div
              key={area.name}
              className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                area.status === 'coming-soon' ? 'opacity-90' : ''
              }`}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={area.image}
                  alt={area.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                
                {/* Status Badge */}
                {area.status === 'available' ? (
                  <div className="absolute top-4 left-4 bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium">
                    {area.propertyCount} Properties Available
                  </div>
                ) : (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-deep-green px-3 py-1 rounded-full text-sm font-medium">
                    Coming {area.launchDate}
                  </div>
                )}

                {/* Area Name */}
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-serif text-3xl text-white mb-1">{area.name}</h3>
                  <div className="flex items-center gap-2 text-white/90">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">South Bali</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  {area.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Area Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {area.highlights.map((highlight, idx) => (
                      <span key={idx} className="text-xs bg-warm-ivory text-gray-700 px-3 py-1 rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Properties or Coming Soon */}
                {area.status === 'available' ? (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800 mb-3">Our Properties</h4>
                    <div className="space-y-2 mb-4">
                      {area.properties.map((property, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-terracotta" />
                          <span className="text-gray-700">{property}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-colors duration-300">
                      Explore {area.name} Villas
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Launching {area.launchDate}</span>
                    </div>
                    <button className="w-full px-6 py-3 bg-gray-200 text-gray-500 rounded-full font-medium cursor-not-allowed">
                      Coming Soon
                    </button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Join our waitlist for early access
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Expansion Note */}
        <div className="mt-12 text-center p-8 bg-warm-ivory rounded-2xl">
          <h3 className="font-serif text-2xl text-deep-green mb-4">
            Growing Thoughtfully Across Bali
          </h3>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            We're carefully expanding our collection to include the best of Bali. 
            Each new area is selected for its unique character and the exceptional villas it offers.
          </p>
          <button className="px-6 py-3 bg-white text-deep-green rounded-full font-medium hover:shadow-md transition-all duration-300">
            Join Waitlist for New Areas
          </button>
        </div>
      </div>
    </section>
  )
}
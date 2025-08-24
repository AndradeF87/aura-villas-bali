'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Users, Bed, Star, Home, ArrowRight } from 'lucide-react'

// Real properties currently managed by AURA
const properties = [
  {
    id: 'suyai-villa',
    name: 'SUYAI Villa Bali',
    type: 'Boutique Villa',
    location: 'Uluwatu, Pecatu',
    description: 'An architectural masterpiece perched on Uluwatu\'s dramatic cliffs, where contemporary design meets the raw beauty of Bali\'s southern coast.',
    story: 'Named after the Mapuche word for "hope", SUYAI represents a new vision of boutique—one that honors both the land and the guest experience.',
    image: '/images/Homepage-SUYAI-villa.webp',
    bedrooms: 4,
    maxGuests: 8,
    highlights: [
      'Clifftop infinity pool',
      'Private chef service',
      'Dedicated villa manager',
      'Ocean sunset views'
    ],
    rating: 9.5,
    occupancy: '92%'
  },
  {
    id: 'onaya-resort',
    name: 'ONAYA Bali Resort',
    type: 'Adults-Only Boutique Resort',
    location: 'Uluwatu, Pecatu',
    description: 'An adults-only sanctuary nestled in untouched Uluwatu, where tranquility meets luxury. Each villa is designed as a retreat from technology and a step closer to serenity.',
    story: 'ONAYA\'s ethos "Today is About You" creates a home away from home experience, with free concierge service and complimentary chauffeur rides to nearby beaches and temples.',
    image: '/images/placeholder.svg', // Replace with actual ONAYA image
    bedrooms: 'Boutique Villas',
    maxGuests: 'Adults Only',
    highlights: [
      'Adults-only tranquility',
      'Black stone pool inspired by Balinese temples',
      'Free 5km radius chauffeur service',
      'Upcoming jungle cinema experience'
    ],
    rating: 9.3,
    occupancy: '95%'
  }
]

export function FeaturedProperties() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            Properties in Our Care
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Each property we manage has its own unique story. We help bring that story to life 
            through thoughtful management and genuine hospitality.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              onMouseEnter={() => setHoveredCard(property.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Home className="w-5 h-5" />
                    <span className="text-sm font-medium">{property.type}</span>
                  </div>
                  <h3 className="font-serif text-3xl mb-2">{property.name}</h3>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {property.description}
                </p>

                {/* Story Teaser */}
                <div className="mb-6 p-4 bg-warm-ivory rounded-lg">
                  <p className="text-sm text-gray-600 italic">
                    "{property.story}"
                  </p>
                </div>

                {/* Property Stats */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-700">{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-700">{property.maxGuests} Guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm text-gray-700">{property.rating}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Highlights</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {property.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-terracotta rounded-full"></div>
                        <span className="text-sm text-gray-600">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Badge */}
                <div className="flex items-center justify-between">
                  <div className="bg-sand-beige rounded-full px-4 py-2">
                    <span className="text-sm font-medium text-deep-green">
                      {property.occupancy} Occupancy
                    </span>
                  </div>
                  <button className="flex items-center gap-2 text-terracotta hover:text-terracotta-dark transition-colors group">
                    <span className="font-medium">View Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline Section */}
        <div className="bg-warm-ivory rounded-2xl p-8 text-center">
          <h3 className="font-serif text-2xl text-deep-green mb-4">
            Growing Thoughtfully
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            We're selective about the properties we manage. Quality over quantity ensures 
            every villa gets the attention it deserves.
          </p>
          <div className="flex justify-center gap-8">
            <div>
              <div className="text-3xl font-bold text-terracotta">3+</div>
              <div className="text-sm text-gray-600">Villas in Pipeline</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-terracotta">8</div>
              <div className="text-sm text-gray-600">Properties by Jan 2026</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
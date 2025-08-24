'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Users, Bed, Bath, Wifi, ChefHat, Waves, Star } from 'lucide-react'

const villas = [
  {
    id: 'suyai-villa',
    name: 'SUYAI Villa Bali',
    tagline: 'Clifftop Sanctuary with Infinite Ocean Views',
    location: 'Uluwatu, Pecatu',
    description: "An architectural masterpiece perched on Uluwatu's dramatic cliffs. Wake up to panoramic ocean views, enjoy sunset cocktails by your private infinity pool, and let our dedicated team curate your perfect Bali escape.",
    images: ['/images/Homepage-SUYAI-villa.webp'],
    pricePerNight: 13500000, // ~$850 USD
    originalPrice: 15000000, // ~$950 USD
    currency: 'IDR',
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    amenities: [
      { icon: Waves, label: 'Infinity Pool' },
      { icon: ChefHat, label: 'Private Chef' },
      { icon: Wifi, label: 'High-Speed WiFi' },
    ],
    highlights: [
      'Stunning sunset views',
      '5 mins to Uluwatu Temple',
      'Private beach access',
      'Daily housekeeping'
    ],
    rating: 9.5,
    reviews: 12,
    availability: 'Available',
    special: '10% off for 7+ nights'
  },
  {
    id: 'onaya-resort',
    name: 'ONAYA Bali Resort',
    tagline: 'Adults-Only Boutique Sanctuary in Untouched Uluwatu',
    location: 'Uluwatu, Pecatu',
    description: 'An adults-only oasis surrounded by lush jungle. Experience tranquility in boutique villas designed as retreats from technology, with a stunning black stone pool inspired by Balinese temples and complimentary chauffeur service within 5km.',
    images: ['/images/placeholder.svg'],
    pricePerNight: 5500000, // ~$350 USD
    originalPrice: 0,
    currency: 'IDR',
    bedrooms: 'Villa options',
    bathrooms: 'En-suite',
    maxGuests: '2',
    amenities: [
      { icon: Waves, label: 'Temple-inspired Pool' },
      { icon: ChefHat, label: 'À la carte Dining' },
      { icon: Wifi, label: 'Free Chauffeur' },
    ],
    highlights: [
      'Adults-only tranquility',
      'Free Chauffeur (up to 5km radius)',
      'Upcoming jungle cinema',
      '24/7 WhatsApp concierge'
    ],
    rating: 9.3,
    reviews: 1503,
    availability: 'Available',
    special: 'Free Chauffeur (up to 5km radius)'
  }
]

export function FeaturedVillasBooking() {
  const [hoveredVilla, setHoveredVilla] = useState<string | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            Our Exclusive Collection
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Each property has been personally selected for its unique character, 
            exceptional service, and the unforgettable memories it creates
          </p>
        </div>

        {/* Villa Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {villas.map((villa) => (
            <div
              key={villa.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              onMouseEnter={() => setHoveredVilla(villa.id)}
              onMouseLeave={() => setHoveredVilla(null)}
            >
              {/* Image Section */}
              <div className="relative h-72 md:h-80 overflow-hidden">
                <Image
                  src={villa.images[0]}
                  alt={villa.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Overlay Info */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {villa.special && (
                    <span className="bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium">
                      {villa.special}
                    </span>
                  )}
                  {villa.availability === 'Limited' && (
                    <span className="bg-white/90 backdrop-blur text-deep-green px-3 py-1 rounded-full text-sm font-medium">
                      Limited Availability
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif text-3xl mb-1">{villa.name}</h3>
                  <p className="text-sm opacity-90">{villa.tagline}</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Location & Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700">{villa.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{villa.rating}</span>
                    <span className="text-gray-500 text-sm">({villa.reviews} reviews)</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {villa.description}
                </p>

                {/* Amenities Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{villa.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{villa.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Up to {villa.maxGuests} Guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {villa.amenities[0].icon === Waves && <Waves className="w-5 h-5 text-gray-500" />}
                    <span className="text-gray-700">{villa.amenities[0].label}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {villa.highlights.map((highlight, idx) => (
                      <span key={idx} className="text-sm bg-warm-ivory text-gray-700 px-3 py-1 rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Booking Actions */}
                <div className="flex items-center justify-end pt-6 border-t border-gray-200">
                  <div className="flex gap-2">
                    <button className="px-6 py-3 bg-white border-2 border-terracotta text-terracotta rounded-full font-medium hover:bg-terracotta hover:text-white transition-colors duration-300">
                      View Details
                    </button>
                    <button className="px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-colors duration-300">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Section */}
        <div className="bg-terracotta rounded-2xl mt-12 py-12 px-8">
          <div className="text-center">
            <div className="mb-6 text-white text-xl font-bold">
              More exceptional villas coming to Canggu and Seminyak in 2025
            </div>
            <button className="px-8 py-4 bg-white text-terracotta rounded-full font-medium hover:bg-warm-ivory transition-colors duration-300">
              Explore All Villas
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
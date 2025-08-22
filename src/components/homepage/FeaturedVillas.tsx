'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MapPin, Users, Bed, Star, ArrowRight } from 'lucide-react'
import type { Villa } from '@/types/villa'

// Mock data - will be replaced with Supabase query
const mockVillas: Partial<Villa>[] = [
  {
    id: '1',
    name: 'Villa Serenity',
    slug: 'villa-serenity-ubud',
    location: {
      area: 'Ubud',
      address: 'Jl. Raya Sanggingan',
      coordinates: { lat: -8.5069, lng: 115.2625 },
      nearbyAttractions: ['Campuhan Ridge Walk', 'Blanco Museum'],
    },
    storyTeaser: 'Built by a local artisan family in 1995, this villa carries the whispers of traditional Balinese craftsmanship in every corner...',
    images: [
      {
        id: '1',
        url: '/images/placeholder.svg',
        alt: 'Villa Serenity pool view',
        type: 'hero',
        order: 1,
      },
    ],
    pricing: {
      basePrice: 450,
      currency: 'USD',
      minimumStay: 2,
    },
    bedrooms: 4,
    maxGuests: 8,
    rating: 9.8,
    featured: true,
  },
  {
    id: '2',
    name: 'Ocean Breeze Villa',
    slug: 'ocean-breeze-seminyak',
    location: {
      area: 'Seminyak',
      address: 'Jl. Petitenget',
      coordinates: { lat: -8.6650, lng: 115.1480 },
      nearbyAttractions: ['Petitenget Beach', 'Potato Head Beach Club'],
    },
    storyTeaser: 'Where modern boutique meets the Indian Ocean, this beachfront sanctuary was designed by an award-winning architect who fell in love with Bali...',
    images: [
      {
        id: '2',
        url: '/images/placeholder.svg',
        alt: 'Ocean Breeze Villa sunset view',
        type: 'hero',
        order: 1,
      },
    ],
    pricing: {
      basePrice: 650,
      currency: 'USD',
      minimumStay: 3,
    },
    bedrooms: 5,
    maxGuests: 10,
    rating: 9.5,
    featured: true,
  },
  {
    id: '3',
    name: 'Jungle Hideaway',
    slug: 'jungle-hideaway-canggu',
    location: {
      area: 'Canggu',
      address: 'Jl. Pantai Berawa',
      coordinates: { lat: -8.6478, lng: 115.1385 },
      nearbyAttractions: ['Echo Beach', 'Tanah Lot Temple'],
    },
    storyTeaser: 'Hidden among rice paddies and tropical gardens, this eco-conscious retreat was created by a couple who wanted to share their sustainable paradise...',
    images: [
      {
        id: '3',
        url: '/images/placeholder.svg',
        alt: 'Jungle Hideaway garden view',
        type: 'hero',
        order: 1,
      },
    ],
    pricing: {
      basePrice: 380,
      currency: 'USD',
      minimumStay: 2,
    },
    bedrooms: 3,
    maxGuests: 6,
    rating: 9.6,
    featured: true,
  },
]

export function FeaturedVillas() {
  const [villas, setVillas] = useState<Partial<Villa>[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFeaturedVillas()
  }, [])

  const loadFeaturedVillas = async () => {
    try {
      // Try to load from Supabase (will fail gracefully if not configured)
      const { villaService } = await import('@/lib/villaService')
      const featuredVillas = await villaService.getFeaturedVillas(3)
      if (featuredVillas.length > 0) {
        setVillas(featuredVillas)
      } else {
        setVillas(mockVillas)
      }
    } catch (error) {
      console.error('Error loading featured villas:', error)
      // Fallback to mock data
      setVillas(mockVillas)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
              Featured Villa Stories
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Each villa has been personally selected for its unique character and the memories it creates
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 rounded-t-lg"></div>
                <div className="bg-white p-6 rounded-b-lg">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-ivory">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            Featured Villa Stories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Each villa has been personally selected for its unique character and the memories it creates
          </p>
        </div>

        {/* Villa Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {villas.map((villa) => (
            <article
              key={villa.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={villa.images?.[0]?.url || '/images/placeholder.svg'}
                  alt={villa.images?.[0]?.alt || villa.name || ''}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Location Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-terracotta" />
                  <span className="text-sm font-medium">{villa.location?.area}</span>
                </div>
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 text-antique-gold fill-current" />
                  <span className="text-sm font-medium">{villa.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Villa Name */}
                <h3 className="font-serif text-2xl text-deep-green mb-2">
                  {villa.name}
                </h3>

                {/* Story Teaser */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {villa.storyTeaser}
                </p>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-3xl font-bold text-deep-green">
                    ${villa.pricing?.basePrice}
                  </span>
                  <span className="text-gray-500 ml-1">/night</span>
                </div>

                {/* Amenities */}
                <div className="flex items-center gap-4 text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Bed className="w-4 h-4" />
                    <span className="text-sm">{villa.bedrooms}BR</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{villa.maxGuests} Guests</span>
                  </div>
                  <div className="text-sm">
                    Pool • Chef • WiFi
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group">
                  <span>Discover This Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-deep-green hover:bg-deep-green-dark text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center gap-2">
            <span>Explore All Villa Stories</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
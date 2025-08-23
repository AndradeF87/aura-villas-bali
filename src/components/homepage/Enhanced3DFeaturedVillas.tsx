'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MapPin, Users, Bed, Star, ArrowRight, Eye, Play, Grid3X3, LayoutGrid } from 'lucide-react'
import type { Villa } from '@/types/villa'
import { Villa3DCard } from '@/components/ui/Villa3DCard'
import { VillaCardSkeleton } from '@/components/ui/VillaCardSkeleton'
import { VillaGallery3D } from '@/components/ui/VillaGallery3D'

// Enhanced mock data with more image examples
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
    storyTeaser: 'Built by a local artisan family in 1995, this villa carries the whispers of traditional Balinese craftsmanship in every corner. Each room tells a story of heritage, where modern luxury meets ancestral wisdom in perfect harmony.',
    images: [
      {
        id: '1',
        url: '/images/Homepage-SUYAI-villa.webp',
        alt: 'Villa Serenity pool view',
        type: 'hero',
        order: 1,
      },
      {
        id: '1a',
        url: '/images/placeholder.svg',
        alt: 'Villa Serenity bedroom',
        type: 'room',
        order: 2,
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
    storyTeaser: 'Where modern boutique meets the Indian Ocean, this beachfront sanctuary was designed by an award-winning architect who fell in love with Bali. Every sunrise brings new possibilities to your doorstep.',
    images: [
      {
        id: '2',
        url: '/images/Homepage-SUYAI-villa.webp',
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
    storyTeaser: 'Hidden among rice paddies and tropical gardens, this eco-conscious retreat was created by a couple who wanted to share their sustainable paradise. Nature and luxury dance together in perfect balance.',
    images: [
      {
        id: '3',
        url: '/images/Homepage-SUYAI-villa.webp',
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

export function Enhanced3DFeaturedVillas() {
  const [villas, setVillas] = useState<Partial<Villa>[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVilla, setSelectedVilla] = useState<Partial<Villa> | null>(null)
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [view, setView] = useState<'grid' | '3d'>('3d')
  const [animationEnabled, setAnimationEnabled] = useState(true)

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
      setTimeout(() => setLoading(false), 800) // Slight delay for smooth loading
    }
  }

  const handleCardClick = (villa: Partial<Villa>) => {
    setSelectedVilla(villa)
    if (villa.images && villa.images.length > 0) {
      setGalleryOpen(true)
    }
  }

  const handleViewToggle = () => {
    setView(view === 'grid' ? '3d' : 'grid')
    // Add haptic feedback on mobile
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-ivory relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-terracotta/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-deep-green/20 rounded-full blur-2xl animate-float-delayed" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4 animate-fade-in-up">
              Featured Villa Stories
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
              Each villa has been personally selected for its unique character and the memories it creates
            </p>
          </div>
          <VillaCardSkeleton count={3} className="animate-fade-in-up animation-delay-400" />
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-ivory relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-terracotta to-deep-green rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-deep-green to-terracotta rounded-full blur-2xl animate-pulse-glow animation-delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Enhanced Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="hidden md:flex items-center gap-2">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-terracotta" />
            </div>
            
            <div>
              <h2 className="font-serif text-4xl md:text-5xl text-deep-green animate-fade-in-up">
                Featured Villa Stories
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Animation Toggle */}
              <button
                onClick={() => setAnimationEnabled(!animationEnabled)}
                className={`
                  hidden md:flex p-2 rounded-lg transition-all duration-300 group
                  ${animationEnabled 
                    ? 'bg-terracotta/10 text-terracotta border border-terracotta/20' 
                    : 'bg-gray-100 text-gray-500 border border-gray-200'
                  }
                `}
                title="Toggle Animations"
              >
                <Play className={`w-5 h-5 transition-transform ${animationEnabled ? 'animate-pulse' : ''}`} />
              </button>

              {/* View Toggle */}
              <button
                onClick={handleViewToggle}
                className={`
                  p-2 rounded-lg transition-all duration-300 group relative overflow-hidden
                  ${view === '3d' 
                    ? 'bg-deep-green text-white shadow-lg' 
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }
                `}
                title={`Switch to ${view === '3d' ? 'Grid' : '3D'} View`}
              >
                {view === '3d' ? (
                  <LayoutGrid className="w-5 h-5 group-hover:scale-110 transition-transform" />
                ) : (
                  <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                )}
                
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
              
              <div className="hidden md:flex w-12 h-0.5 bg-gradient-to-l from-transparent to-terracotta" />
            </div>
          </div>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Each villa has been personally selected for its unique character and the memories it creates
          </p>
          
          {view === '3d' && animationEnabled && (
            <div className="mt-6 inline-flex items-center gap-2 text-sm text-gray-500 bg-white/50 px-6 py-3 rounded-full backdrop-blur-sm animate-fade-in-up animation-delay-400">
              <div className="w-2 h-2 bg-terracotta rounded-full animate-pulse" />
              <span>Hover over cards for 3D effects</span>
            </div>
          )}
        </div>

        {/* Enhanced Villa Cards */}
        <div className={`
          transition-all duration-700 ease-out
          ${view === '3d' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
          }
        `}>
          {villas.map((villa, index) => (
            view === '3d' ? (
              <Villa3DCard
                key={villa.id}
                villa={villa}
                index={index}
                onCardClick={handleCardClick}
                className={`
                  transform transition-all duration-700 ease-out
                  ${animationEnabled ? 'animate-card-entrance' : ''}
                `}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              />
            ) : (
              <article
                key={villa.id}
                className={`
                  group bg-white rounded-xl shadow-lg overflow-hidden 
                  hover:shadow-2xl transition-all duration-300 
                  transform hover:-translate-y-2 cursor-pointer
                  animate-fade-in-up
                `}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handleCardClick(villa)}
              >
                {/* Compact Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={villa.images?.[0]?.url || '/images/placeholder.svg'}
                    alt={villa.images?.[0]?.alt || villa.name || ''}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {/* Availability Indicator */}
                  <div className="absolute top-3 left-3 w-3 h-3 bg-green-500 rounded-full animate-availability-pulse" />
                  
                  {/* Location Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-terracotta" />
                    <span className="text-xs font-medium">{villa.location?.area}</span>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute bottom-3 right-3 bg-gradient-to-r from-amber-400 to-amber-500 px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 text-white fill-current" />
                    <span className="text-xs font-medium text-white">{villa.rating}</span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-sm font-medium opacity-90">Quick Preview</div>
                    </div>
                  </div>
                </div>

                {/* Compact Content */}
                <div className="p-4">
                  <h3 className="font-serif text-lg text-deep-green mb-2 group-hover:text-terracotta transition-colors">
                    {villa.name}
                  </h3>

                  <div className="mb-3">
                    <span className="text-xl font-bold text-deep-green">
                      ${villa.pricing?.basePrice}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">/night</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-500 text-xs">
                    <div className="flex items-center gap-1">
                      <Bed className="w-3 h-3" />
                      <span>{villa.bedrooms}BR</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{villa.maxGuests} Guests</span>
                    </div>
                    <div className="w-2 h-2 bg-terracotta rounded-full" />
                    <span>Pool</span>
                  </div>
                </div>
              </article>
            )
          ))}
        </div>

        {/* Enhanced View All Button */}
        <div className="text-center mt-16">
          <button className="group bg-deep-green hover:bg-deep-green-dark text-white font-semibold py-4 px-10 rounded-2xl transition-all duration-300 inline-flex items-center gap-3 magnetic-button hover:shadow-2xl relative overflow-hidden">
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-terracotta/0 via-terracotta/20 to-terracotta/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            
            <span className="relative">Explore All Villa Stories</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative" />
          </button>
          
          <p className="text-gray-500 text-sm mt-3 animate-fade-in-up animation-delay-600">
            {villas.length} extraordinary stories await your discovery
          </p>
        </div>

        {/* 3D Gallery Modal */}
        {selectedVilla && (
          <VillaGallery3D
            images={selectedVilla.images || []}
            isOpen={galleryOpen}
            onClose={() => {
              setGalleryOpen(false)
              setSelectedVilla(null)
            }}
            initialIndex={0}
          />
        )}
      </div>
    </section>
  )
}
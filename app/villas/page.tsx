'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Users, Bed, Bath, Star, Heart, Calendar } from 'lucide-react'
import { villaService } from '@/lib/villaService'
import type { Villa, SearchFilters } from '@/types/villa'

function VillaSearchContent() {
  const searchParams = useSearchParams()
  const [villas, setVillas] = useState<Villa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<SearchFilters>({})

  useEffect(() => {
    // Parse search parameters
    const location = searchParams.get('location') || undefined
    const checkIn = searchParams.get('checkin') ? new Date(searchParams.get('checkin')!) : undefined
    const checkOut = searchParams.get('checkout') ? new Date(searchParams.get('checkout')!) : undefined
    const guests = searchParams.get('guests') ? parseInt(searchParams.get('guests')!) : undefined
    const experience = searchParams.get('experience') || undefined

    const searchFilters: SearchFilters = {
      location,
      checkIn,
      checkOut,
      guests,
      experienceType: experience as any
    }

    setFilters(searchFilters)
    loadVillas(searchFilters)
  }, [searchParams])

  const loadVillas = async (searchFilters: SearchFilters) => {
    try {
      setLoading(true)
      const results = await villaService.searchVillas(searchFilters)
      setVillas(results)
    } catch (err) {
      setError('Failed to load villas. Please try again.')
      console.error('Error loading villas:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-96"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => loadVillas(filters)}
            className="bg-terracotta hover:bg-terracotta-dark text-white px-6 py-3 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="container mx-auto">
        {/* Search Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            {villas.length > 0 ? `${villas.length} Villa Stories Found` : 'No Villas Found'}
          </h1>
          {filters.location && (
            <p className="text-lg text-gray-600">
              in {filters.location}
              {filters.checkIn && filters.checkOut && (
                <span className="ml-2">
                  • {filters.checkIn.toLocaleDateString()} - {filters.checkOut.toLocaleDateString()}
                </span>
              )}
              {filters.guests && (
                <span className="ml-2">• {filters.guests} guests</span>
              )}
            </p>
          )}
        </div>

        {villas.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              No villas match your search criteria
            </h3>
            <p className="text-gray-600 mb-8">
              Try adjusting your filters or search for a different location.
            </p>
            <Link
              href="/"
              className="inline-block bg-terracotta hover:bg-terracotta-dark text-white px-6 py-3 rounded-lg"
            >
              Start New Search
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {villas.map((villa) => (
              <Link
                key={villa.id}
                href={`/villas/${villa.slug}`}
                className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Villa Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={villa.primary_image || '/images/placeholder.svg'}
                    alt={villa.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4">
                    <button className="bg-white/80 hover:bg-white p-2 rounded-full transition-colors">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  {villa.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Villa Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {villa.area}
                    </div>
                    {villa.rating > 0 && (
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium">{villa.rating.toFixed(1)}</span>
                        <span className="ml-1 text-sm text-gray-500">({villa.review_count})</span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-terracotta transition-colors">
                    {villa.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {villa.story_teaser}
                  </p>

                  {/* Villa Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {villa.bedrooms} beds
                    </div>
                    <div className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {villa.bathrooms} baths
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {villa.max_guests} guests
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(villa.base_price, villa.currency)}
                      </span>
                      <span className="text-gray-600 ml-1">/ night</span>
                    </div>
                    <button className="bg-terracotta hover:bg-terracotta-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      View Story
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function VillaSearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-2xl h-96"></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <VillaSearchContent />
    </Suspense>
  )
}
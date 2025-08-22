'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { MapPin, Users, Bed, Bath, Star, Calendar, MessageCircle, Share2, Heart, Wifi, Car, Waves } from 'lucide-react'
import { villaService } from '@/lib/villaService'
import type { Villa } from '@/types/villa'

export default function VillaDetailPage() {
  const { slug } = useParams()
  const [villa, setVilla] = useState<Villa | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showBookingForm, setShowBookingForm] = useState(false)

  useEffect(() => {
    if (slug) {
      loadVilla(slug as string)
    }
  }, [slug])

  const loadVilla = async (villaSlug: string) => {
    try {
      setLoading(true)
      const villaData = await villaService.getVillaBySlug(villaSlug)
      if (villaData) {
        setVilla(villaData)
      } else {
        setError('Villa not found')
      }
    } catch (err) {
      setError('Failed to load villa details')
      console.error('Error loading villa:', err)
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

  const handleWhatsAppInquiry = () => {
    const message = `Hi! I'm interested in ${villa?.name}. Could you provide more information about availability and booking?`
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="container mx-auto">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !villa) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Villa Not Found</h2>
          <p className="text-gray-600 mb-8">{error || 'The villa you\'re looking for doesn\'t exist.'}</p>
          <a
            href="/villas"
            className="bg-terracotta hover:bg-terracotta-dark text-white px-6 py-3 rounded-lg"
          >
            Browse All Villas
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Image Gallery */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={villa.images?.[currentImageIndex]?.url || '/images/placeholder.svg'}
          alt={villa.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Image Navigation */}
        {villa.images && villa.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {villa.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="bg-white/80 hover:bg-white p-3 rounded-full transition-colors">
            <Share2 className="w-5 h-5 text-gray-700" />
          </button>
          <button className="bg-white/80 hover:bg-white p-3 rounded-full transition-colors">
            <Heart className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Villa Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  {villa.location?.area}, {villa.location?.address}
                </div>
                {villa.rating > 0 && (
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{villa.rating.toFixed(1)}</span>
                    <span className="ml-1 text-gray-500">({villa.review_count} reviews)</span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                {villa.name}
              </h1>

              {/* Villa Stats */}
              <div className="flex items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <Bed className="w-5 h-5 mr-2" />
                  {villa.bedrooms} bedrooms
                </div>
                <div className="flex items-center">
                  <Bath className="w-5 h-5 mr-2" />
                  {villa.bathrooms} bathrooms
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {villa.maxGuests} guests
                </div>
              </div>
            </div>

            {/* Villa Story */}
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">The Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {villa.story || villa.storyTeaser}
                </p>
              </div>
            </div>

            {/* Amenities */}
            {villa.amenities && villa.amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {villa.amenities.slice(0, 12).map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-terracotta/10 rounded-full flex items-center justify-center mr-3">
                        <Wifi className="w-4 h-4 text-terracotta" />
                      </div>
                      <span className="text-gray-700">{amenity.name || amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {villa.reviews && villa.reviews.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Guest Stories</h2>
                <div className="space-y-6">
                  {villa.reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.guestName}</h4>
                          <p className="text-sm text-gray-600">{review.guestLocation}</p>
                        </div>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatPrice(villa.pricing?.basePrice || 0, villa.pricing?.currency)}
                  </div>
                  <div className="text-gray-600">per night</div>
                </div>

                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Check Availability
                  </button>
                  
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Inquiry
                  </button>
                </div>

                <div className="text-center text-sm text-gray-600">
                  <p>Free cancellation • 24/7 support</p>
                  <p className="mt-2">Response within 2 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Book Your Stay</h3>
            <p className="text-gray-600 mb-6">
              Send us your details and we'll get back to you within 2 hours with availability and pricing.
            </p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="+62 812 3456 7890"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check In</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check Out</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                <input
                  type="number"
                  min="1"
                  max={villa.maxGuests}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="2"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="Any special requests or questions..."
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-terracotta hover:bg-terracotta-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
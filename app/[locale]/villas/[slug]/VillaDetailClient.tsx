'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Users, Bed, Bath, Star, Calendar, MessageCircle, Share2, Heart } from 'lucide-react'
import type { VillaData } from '@/data/villas'
import type { Locale } from '@/lib/i18n/config'

interface VillaDetailClientProps {
  villa: VillaData
  villaDict: any
  dictionary: any
  locale: Locale
}

export default function VillaDetailClient({ 
  villa, 
  villaDict, 
  dictionary, 
  locale 
}: VillaDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat(locale === 'es-ES' ? 'es-ES' : 'en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleWhatsAppInquiry = () => {
    const message = locale === 'es-ES' 
      ? `¡Hola! Estoy interesado en ${villaDict.name}. ¿Podrían proporcionar más información sobre disponibilidad y reserva?`
      : `Hi! I'm interested in ${villaDict.name}. Could you provide more information about availability and booking?`
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Image Gallery */}
      <div className="relative h-96 md:h-[500px] overflow-hidden">
        <Image
          src={villa.images[currentImageIndex]}
          alt={villaDict.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        {/* Image Navigation */}
        {villa.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {villa.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`View image ${index + 1}`}
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
                  {villa.location.area}
                </div>
                {villa.rating > 0 && (
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{villa.rating.toFixed(1)}</span>
                    <span className="ml-1 text-gray-500">({villa.reviewCount} {dictionary.villaDetail.reviews})</span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                {villaDict.name}
              </h1>

              {/* Villa Stats */}
              <div className="flex items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <Bed className="w-5 h-5 mr-2" />
                  {villa.bedrooms} {dictionary.villaDetail.bedrooms}
                </div>
                <div className="flex items-center">
                  <Bath className="w-5 h-5 mr-2" />
                  {villa.bathrooms} {dictionary.villaDetail.bathrooms}
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {villa.maxGuests} {dictionary.villaDetail.guests}
                </div>
              </div>
            </div>

            {/* Villa Story */}
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                {dictionary.villaDetail.theStory}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {villaDict.story}
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {villaDict.highlights.map((highlight: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-terracotta rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            {villa.amenities && villa.amenities.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                  {dictionary.villaDetail.amenities}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {villa.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 bg-terracotta/10 rounded-full flex items-center justify-center mr-3">
                        <div className="w-2 h-2 bg-terracotta rounded-full" />
                      </div>
                      <span className="text-gray-700">
                        {dictionary.amenitiesNames[amenity] || amenity}
                      </span>
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
                    {formatPrice(villa.pricing.basePrice, villa.pricing.currency)}
                  </div>
                  <div className="text-gray-600">{dictionary.villaDetail.perNight}</div>
                </div>

                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    {dictionary.villaDetail.checkAvailability}
                  </button>
                  
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {dictionary.villaDetail.whatsappInquiry}
                  </button>
                </div>

                <div className="text-center text-sm text-gray-600">
                  <p>{dictionary.villaDetail.freeCancel}</p>
                  <p className="mt-2">{dictionary.villaDetail.responseTime}</p>
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
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {dictionary.villaDetail.bookYourStay}
            </h3>
            <p className="text-gray-600 mb-6">
              {dictionary.villaDetail.bookingMessage}
            </p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dictionary.villaDetail.fullName}
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dictionary.villaDetail.email}
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dictionary.villaDetail.whatsappNumber}
                </label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dictionary.villaDetail.checkIn}
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {dictionary.villaDetail.checkOut}
                  </label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dictionary.villaDetail.numberOfGuests}
                </label>
                <input
                  type="number"
                  min="1"
                  max={villa.maxGuests}
                  defaultValue="2"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dictionary.villaDetail.message}
                </label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-terracotta focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {dictionary.villaDetail.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-terracotta hover:bg-terracotta-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {dictionary.villaDetail.sendInquiry}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Users, Bed, Bath, Wifi, Waves, Coffee, Star, Car, Spa } from 'lucide-react'
import { onayaResortData } from '@/data/onaya-resort'

export function OnayaResortCard() {
  const [selectedRoom, setSelectedRoom] = useState(onayaResortData.roomTypes[1]) // Default to Pool Villa

  const formatPrice = (price: number) => {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(price)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header Image */}
      <div className="relative h-96">
        <Image
          src="/images/placeholder.svg"
          alt={onayaResortData.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-serif text-4xl mb-2">{onayaResortData.name}</h1>
              <p className="text-lg opacity-90 mb-3">{onayaResortData.tagline}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{onayaResortData.location.area}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="font-semibold">{onayaResortData.ratings.overall}</span>
                  <span className="opacity-75">({onayaResortData.ratings.totalReviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="bg-terracotta px-4 py-2 rounded-full text-sm font-medium inline-block">
                Adults Only 16+
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Overview */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl text-deep-green mb-4">About ONAYA</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {onayaResortData.overview.description}
          </p>
          
          {/* Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
            {onayaResortData.overview.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-terracotta rounded-full"></span>
                <span className="text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Room Types */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl text-deep-green mb-4">Accommodation Options</h2>
          
          {/* Room Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {onayaResortData.roomTypes.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedRoom.id === room.id
                    ? 'border-terracotta bg-warm-ivory'
                    : 'border-gray-200 hover:border-terracotta/50'
                }`}
              >
                <div className="text-left">
                  <h3 className="font-semibold text-deep-green text-sm">{room.name}</h3>
                  <p className="text-xs text-gray-600 mt-1">{room.size}m² • Max {room.maxOccupancy}</p>
                  <p className="text-terracotta font-semibold text-sm mt-2">
                    {formatPrice(room.pricePerNight)}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Room Details */}
          {selectedRoom && (
            <div className="bg-warm-ivory rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-serif text-xl text-deep-green">{selectedRoom.name}</h3>
                  <p className="text-gray-700 mt-2">{selectedRoom.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-terracotta">
                    {formatPrice(selectedRoom.pricePerNight)}
                  </p>
                  <p className="text-sm text-gray-600">per night</p>
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-4">
                <h4 className="font-semibold text-deep-green mb-3">Room Amenities</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {selectedRoom.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-terracotta">✓</span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Facilities */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl text-deep-green mb-4">Resort Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Coffee className="w-5 h-5 text-terracotta" />
                <h3 className="font-semibold text-deep-green">Dining</h3>
              </div>
              <p className="text-sm text-gray-700">
                {onayaResortData.facilities.dining.restaurant.name} - {onayaResortData.facilities.dining.restaurant.cuisine}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Open {onayaResortData.facilities.dining.restaurant.hours}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Spa className="w-5 h-5 text-terracotta" />
                <h3 className="font-semibold text-deep-green">Wellness</h3>
              </div>
              <p className="text-sm text-gray-700">
                {onayaResortData.facilities.wellness.spa.name}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Traditional treatments • Yoga • Meditation
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Waves className="w-5 h-5 text-terracotta" />
                <h3 className="font-semibold text-deep-green">Temple Pool</h3>
              </div>
              <p className="text-sm text-gray-700">
                Black stone infinity pool
              </p>
              <p className="text-xs text-gray-600 mt-1">
                25m lap pool with jungle views
              </p>
            </div>
          </div>
        </div>

        {/* Special Services */}
        <div className="mb-8">
          <h2 className="font-serif text-2xl text-deep-green mb-4">Complimentary Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {onayaResortData.services.slice(0, 4).map((service, idx) => (
              <div key={idx} className="flex gap-3">
                <Car className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-deep-green">{service.name}</h4>
                  <p className="text-sm text-gray-700">{service.description}</p>
                  <p className="text-xs text-gray-600 mt-1">{service.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Starting from</p>
              <p className="text-3xl font-bold text-terracotta">
                {formatPrice(onayaResortData.roomTypes[0].pricePerNight)}
              </p>
              <p className="text-sm text-gray-600">per night</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white border-2 border-terracotta text-terracotta rounded-full font-medium hover:bg-warm-ivory transition-colors">
                View Gallery
              </button>
              <button className="px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-colors">
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
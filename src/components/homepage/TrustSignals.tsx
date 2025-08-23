'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Star, Award, Shield, Users } from 'lucide-react'

interface Review {
  id: string
  guestName: string
  guestLocation: string
  villaName: string
  rating: number
  comment: string
  date: string
  image?: string
}

const mockReviews: Review[] = [
  {
    id: '1',
    guestName: 'Sarah Mitchell',
    guestLocation: 'Sydney, Australia',
    villaName: 'Villa Serenity',
    rating: 5,
    comment: 'The most incredible villa experience! The AURA team went above and beyond to make our family vacation unforgettable. The villa was pristine, the staff was amazing, and the cultural experiences they arranged were authentic and memorable.',
    date: '2024-11-15',
    image: '/images/placeholder.svg',
  },
  {
    id: '2',
    guestName: 'David Chen',
    guestLocation: 'Singapore',
    villaName: 'Ocean Breeze Villa',
    rating: 5,
    comment: 'AURA truly understands luxury hospitality. From the moment we arrived, every detail was perfect. The villa exceeded our expectations, and the 24/7 concierge service made everything effortless. Will definitely book again!',
    date: '2024-10-28',
    image: '/images/placeholder.svg',
  },
  {
    id: '3',
    guestName: 'Emma Thompson',
    guestLocation: 'London, UK',
    villaName: 'Jungle Hideaway',
    rating: 5,
    comment: 'What sets AURA apart is their personal touch. They remembered our preferences from our inquiry, arranged a surprise anniversary setup, and their local recommendations were spot-on. This is how villa rentals should be done.',
    date: '2024-09-12',
    image: '/images/placeholder.svg',
  },
]

const stats = [
  { label: 'Average Occupancy', value: '95%', icon: Users },
  { label: 'Guest Rating', value: '9.3/10', icon: Star },
  { label: 'Years of Excellence', value: '5+', icon: Award },
  { label: 'Properties Managed', value: '25+', icon: Shield },
]

const pressLogos = [
  { name: 'Travel + Leisure', logo: '/images/placeholder.svg' },
  { name: 'Conde Nast', logo: '/images/placeholder.svg' },
  { name: 'Forbes Travel', logo: '/images/placeholder.svg' },
  { name: 'Bali Tourism Board', logo: '/images/placeholder.svg' },
]

export function TrustSignals() {
  const [currentReview, setCurrentReview] = useState(0)
  const [recentBooking, setRecentBooking] = useState<string | null>(null)

  useEffect(() => {
    // Rotate reviews
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % mockReviews.length)
    }, 5000)

    // Simulate recent booking notifications
    const bookingInterval = setInterval(() => {
      const villas = ['Villa Serenity', 'Ocean Breeze Villa', 'Jungle Hideaway']
      const locations = ['Sydney', 'Singapore', 'London', 'New York', 'Tokyo']
      const villa = villas[Math.floor(Math.random() * villas.length)]
      const location = locations[Math.floor(Math.random() * locations.length)]
      
      setRecentBooking(`Someone from ${location} just booked ${villa}`)
      
      setTimeout(() => setRecentBooking(null), 4000)
    }, 15000)

    return () => {
      clearInterval(interval)
      clearInterval(bookingInterval)
    }
  }, [])

  return (
    <section className="py-20 bg-white relative">
      {/* Recent Booking Notification */}
      {recentBooking && (
        <div className="fixed bottom-8 left-8 bg-deep-green text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up">
          <p className="text-sm font-medium">{recentBooking}</p>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            Why Owners & Guests Trust AURA
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Excellence in numbers, stories in reviews, recognition in awards
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="w-12 h-12 text-terracotta mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-deep-green mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Guest Reviews Carousel */}
        <div className="bg-sand rounded-2xl p-8 md:p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            {/* Review Content */}
            <div className="mb-8">
              {/* Rating Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-antique-gold fill-current"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-xl md:text-2xl text-center text-deep-green font-serif mb-8 leading-relaxed">
                "{mockReviews[currentReview].comment}"
              </p>

              {/* Guest Info */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
                  {mockReviews[currentReview].image && (
                    <Image
                      src={mockReviews[currentReview].image}
                      alt={mockReviews[currentReview].guestName}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-deep-green">
                    {mockReviews[currentReview].guestName}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {mockReviews[currentReview].guestLocation} • {mockReviews[currentReview].villaName}
                  </p>
                </div>
              </div>
            </div>

            {/* Review Dots */}
            <div className="flex justify-center gap-2">
              {mockReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentReview
                      ? 'bg-terracotta w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Press & Awards */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">As Featured In</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {pressLogos.map((press) => (
              <div
                key={press.name}
                className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <Image
                  src={press.logo}
                  alt={press.name}
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 bg-ivory px-4 py-2 rounded-full">
            <Shield className="w-5 h-5 text-deep-green" />
            <span className="text-sm font-medium">Verified Properties</span>
          </div>
          <div className="flex items-center gap-2 bg-ivory px-4 py-2 rounded-full">
            <Award className="w-5 h-5 text-deep-green" />
            <span className="text-sm font-medium">Award Winning Service</span>
          </div>
          <div className="flex items-center gap-2 bg-ivory px-4 py-2 rounded-full">
            <Users className="w-5 h-5 text-deep-green" />
            <span className="text-sm font-medium">24/7 Guest Support</span>
          </div>
        </div>
      </div>
    </section>
  )
}
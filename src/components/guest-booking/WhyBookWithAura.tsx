'use client'

import { Shield, Star, Phone, CreditCard, Award, Heart } from 'lucide-react'

const benefits = [
  {
    icon: Award,
    title: 'Handpicked Properties',
    description: 'Every villa is personally vetted by our team. We only work with properties that meet our strict standards for luxury, comfort, and authentic Balinese hospitality.'
  },
  {
    icon: Phone,
    title: '24/7 Concierge Service',
    description: 'From restaurant reservations to arranging surf lessons, our local concierge team is always available to make your stay effortless and memorable.'
  },
  {
    icon: CreditCard,
    title: 'Best Price Guarantee',
    description: "Book directly through AURA for the best rates. Found it cheaper elsewhere? We'll match it and add a complimentary spa voucher."
  },
  {
    icon: Heart,
    title: 'Local Experiences Included',
    description: 'Each stay includes curated local experiences—from temple tours to cooking classes—helping you discover the real Bali beyond tourist spots.'
  },
  {
    icon: Star,
    title: 'Verified Guest Reviews',
    description: 'Read real reviews from real guests. Every review is verified and authentic, helping you make the perfect choice for your Bali escape.'
  },
  {
    icon: Shield,
    title: 'Secure & Protected',
    description: 'Your booking is protected with secure payment processing and comprehensive travel protection options. Book with complete peace of mind.'
  }
]

export function WhyBookWithAura() {
  return (
    <section className="py-20 bg-warm-ivory">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            Why Book with AURA
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            More than just a booking—it's your gateway to authentic Bali experiences 
            with the comfort of knowing every detail is taken care of
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-terracotta/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-terracotta/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-terracotta" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl text-deep-green mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-8 p-6 bg-white rounded-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-terracotta">100%</div>
              <div className="text-sm text-gray-600">Guest Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-terracotta">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-terracotta">2</div>
              <div className="text-sm text-gray-600">Luxury Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-terracotta">50+</div>
              <div className="text-sm text-gray-600">5-Star Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
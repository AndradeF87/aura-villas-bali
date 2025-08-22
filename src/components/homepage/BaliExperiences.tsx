'use client'

import { Waves, Utensils, Heart, Mountain, Camera, Music } from 'lucide-react'

const experiences = [
  {
    icon: Waves,
    title: 'Surf Lessons',
    description: "Learn to surf with local pros at Bali's best breaks",
    price: 'From $65/person',
    duration: '2-3 hours',
    included: ['Equipment', 'Instructor', 'Beach transport']
  },
  {
    icon: Mountain,
    title: 'Temple Tours',
    description: 'Discover sacred temples with cultural insights from local guides',
    price: 'From $45/person',
    duration: 'Half day',
    included: ['Private guide', 'Temple fees', 'Sarong rental']
  },
  {
    icon: Utensils,
    title: 'Private Chef',
    description: 'Enjoy restaurant-quality meals prepared in your villa',
    price: 'From $120/day',
    duration: 'Full service',
    included: ['Menu planning', 'Grocery shopping', '3 meals daily']
  },
  {
    icon: Heart,
    title: 'Spa & Wellness',
    description: 'In-villa spa treatments by certified Balinese therapists',
    price: 'From $80/treatment',
    duration: '60-90 mins',
    included: ['Oils & products', 'Setup', 'Music & ambiance']
  },
  {
    icon: Camera,
    title: 'Photo Sessions',
    description: 'Capture your Bali memories with professional photography',
    price: 'From $250/session',
    duration: '2 hours',
    included: ['Multiple locations', 'Edited photos', 'Quick delivery']
  },
  {
    icon: Music,
    title: 'Cultural Shows',
    description: 'Traditional Balinese dance and music performances',
    price: 'From $35/person',
    duration: 'Evening',
    included: ['Reserved seating', 'Welcome drink', 'Program guide']
  }
]

export function BaliExperiences() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            Plan Your Bali Experience
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Transform your villa stay into an unforgettable journey. 
            Our concierge team arranges everything, so you can simply enjoy.
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((experience) => {
            const Icon = experience.icon
            return (
              <div
                key={experience.title}
                className="group bg-warm-ivory rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center group-hover:bg-terracotta group-hover:text-white transition-all duration-300">
                    <Icon className="w-6 h-6 text-terracotta group-hover:text-white" />
                  </div>
                  <span className="text-terracotta font-semibold">{experience.price}</span>
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl text-deep-green mb-2">
                  {experience.title}
                </h3>
                <p className="text-gray-700 mb-4">
                  {experience.description}
                </p>

                {/* Details */}
                <div className="text-sm text-gray-600 mb-4">
                  Duration: {experience.duration}
                </div>

                {/* What's Included */}
                <div className="border-t border-gray-300 pt-4">
                  <div className="text-xs font-semibold text-gray-600 mb-2">INCLUDES:</div>
                  <div className="flex flex-wrap gap-2">
                    {experience.included.map((item, idx) => (
                      <span key={idx} className="text-xs bg-white text-gray-700 px-2 py-1 rounded">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Booking CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-gradient-to-br from-deep-green to-deep-green/90 rounded-2xl text-white">
            <h3 className="font-serif text-2xl mb-4">
              Ready to Create Your Perfect Bali Story?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl">
              All experiences can be arranged before arrival or during your stay. 
              Our concierge team is available 24/7 to help plan your perfect day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-colors duration-300">
                Browse Villas
              </button>
              <button className="px-8 py-3 bg-white/10 backdrop-blur text-white rounded-full font-medium hover:bg-white/20 transition-colors duration-300 border border-white/30">
                Contact Concierge
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
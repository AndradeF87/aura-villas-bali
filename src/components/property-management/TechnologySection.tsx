'use client'

import { Bot, Heart, BarChart3, Globe, Shield, Zap } from 'lucide-react'

const technologies = [
  {
    icon: Bot,
    title: 'AI-Powered Pricing',
    description: 'Dynamic pricing that adjusts to market demand, seasonality, and local events—maximizing revenue without manual intervention.',
    benefit: '+23% average revenue increase'
  },
  {
    icon: Heart,
    title: 'Human Touch Points',
    description: 'Technology handles the repetitive tasks. Our team focuses on creating memorable moments and genuine connections with guests.',
    benefit: '9.5+ guest satisfaction scores'
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Track performance, occupancy, and revenue in real-time. Make data-driven decisions with our intuitive owner dashboard.',
    benefit: 'Daily insights, not monthly reports'
  },
  {
    icon: Globe,
    title: 'Multi-Channel Distribution',
    description: 'Synchronized listings across Booking.com, Airbnb, and direct bookings. One calendar, no double bookings, maximum exposure.',
    benefit: '40% reach through direct bookings'
  },
  {
    icon: Shield,
    title: 'Verified Guest Screening',
    description: 'Automated background checks and verification systems protect your property while maintaining a smooth booking experience.',
    benefit: '99.9% incident-free stays'
  },
  {
    icon: Zap,
    title: 'Instant Response System',
    description: 'Automated initial responses within 1 minute, personalized follow-ups within 1 hour. Never miss a booking opportunity.',
    benefit: '3x faster than industry average'
  }
]

export function TechnologySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            Smart Tools, Human Touch
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            We use AI and automation to handle the complex stuff, so our team can focus 
            on what matters: creating exceptional experiences for your guests.
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech) => {
            const Icon = tech.icon
            return (
              <div
                key={tech.title}
                className="group p-6 bg-warm-ivory rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-terracotta" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl text-deep-green mb-3">
                  {tech.title}
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {tech.description}
                </p>

                {/* Benefit Badge */}
                <div className="inline-flex items-center px-3 py-1 bg-white rounded-full">
                  <span className="text-sm font-medium text-terracotta">
                    {tech.benefit}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-sand-beige rounded-2xl">
            <h3 className="font-serif text-2xl text-deep-green mb-4">
              Technology That Works Behind the Scenes
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl">
              While our systems optimize and automate, you'll always have a real person 
              to talk to. That's the AURA difference—high-tech efficiency with high-touch service.
            </p>
            <button className="px-8 py-3 bg-deep-green text-white rounded-full font-medium hover:bg-deep-green/90 transition-colors duration-300">
              See Our Tech in Action
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
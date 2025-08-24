'use client'

import { TrendingUp, Star, Users, Home } from 'lucide-react'

const metrics = [
  {
    icon: TrendingUp,
    value: '95%',
    label: 'Average Occupancy',
    subtext: 'at ONAYA Resort'
  },
  {
    icon: Star,
    value: '9.0',
    label: 'Guest Rating',
    subtext: 'Excellent reviews'
  },
  {
    icon: Users,
    value: '100%',
    label: 'Owner Satisfaction',
    subtext: 'Happy partners'
  },
  {
    icon: Home,
    value: '8',
    label: 'Properties by Jan 2026',
    subtext: 'Growing thoughtfully'
  }
]

export function AuraNumbers() {
  return (
    <section className="py-20 bg-sand-beige">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            AURA in Numbers
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Founded in 2024, we're building something special with proven results
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4 group-hover:shadow-xl transition-shadow">
                  <Icon className="w-10 h-10 text-terracotta" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-deep-green mb-2">
                  {metric.value}
                </div>
                <div className="text-lg font-medium text-gray-800 mb-1">
                  {metric.label}
                </div>
                <div className="text-sm text-gray-600">
                  {metric.subtext}
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Context */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-2xl px-8 py-6 shadow-lg">
            <p className="text-lg text-deep-green font-medium mb-2">
              Currently Managing
            </p>
            <div className="flex items-center justify-center gap-8">
              <div>
                <p className="text-2xl font-bold text-terracotta">SUYAI Villa</p>
                <p className="text-sm text-gray-600">Boutique Villa in Uluwatu</p>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <p className="text-2xl font-bold text-terracotta">ONAYA Resort</p>
                <p className="text-sm text-gray-600">Adults-Only Resort in Uluwatu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Statement */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 italic">
            "We're selective about the properties we manage because your success is our reputation"
          </p>
        </div>
      </div>
    </section>
  )
}
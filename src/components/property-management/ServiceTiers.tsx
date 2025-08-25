'use client'

import { useState } from 'react'
import { Check, Star, Sparkles, Crown } from 'lucide-react'

const tiers = [
  {
    name: 'Essential',
    icon: Star,
    commission: '15%',
    description: 'For established villas that need a reliable partner',
    features: [
      'Daily Housekeeping Supervision',
      'Guest Check-in & Check-out Assistance',
      'Guest Support (8 AM – 8 PM)',
      'Maintenance Coordination (Plumbing, AC, Electrical)',
      'Pool & Garden Scheduling',
      'Booking Calendar Management',
      'Monthly Stock Inventory',
      'Laundry Coordination',
      'Monthly Owner Report',
      'Basic Amenities Restocking',
      'Digital Guest Guidebook',
      'Monthly Preventive Maintenance Walkthrough',
      'Utility Bills Payment Assistance'
    ],
    notIncluded: [
      'Custom villa branding',
      'Direct booking website',
      'Revenue optimization',
      'Concierge services'
    ],
    bestFor: 'Villas with existing reputation seeking operational support',
    color: 'from-gray-600 to-gray-700'
  },
  {
    name: 'Premium',
    icon: Sparkles,
    commission: '18%',
    description: 'Full-service management with growth focus',
    popular: true,
    features: [
      'Everything in Essential, plus:',
      '24/7 Guest Support',
      'In-Villa Welcome (with refreshments)',
      'Concierge Services (Tours, Spa, Transport)',
      'Weekly Villa Inspections (with photo/video reports)',
      'Dedicated Operations Manager',
      'Monthly Deep Cleaning Coordination',
      'Priority Maintenance Response + Repairs Buffer (Rp 500,000/month included)',
      'Personalized Guest Gifts',
      'VIP Amenities (Premium toiletries & gifts – at cost)',
      'Staff Hiring Assistance (optional)',
      'Quarterly Performance Review',
      'Local Authority Liaison (Banjar, licensing)'
    ],
    bestFor: 'Villas wanting to maximize revenue and guest satisfaction',
    color: 'from-terracotta to-terracotta-dark'
  },
  {
    name: 'Boutique Full',
    icon: Crown,
    commission: '20-22%',
    description: 'White-glove service for exceptional properties',
    minBookingValue: 'By invitation',
    features: [
      'Everything in Premium, plus:',
      'Dedicated villa manager',
      'Boutique amenity partnerships',
      'Influencer marketing program',
      'Custom guest experiences',
      'Priority booking management',
      'Weekly performance optimization',
      'Staff training & development',
      'Exclusive AURA Collection benefits',
      '24/7 owner support line'
    ],
    bestFor: 'Boutique villas seeking the highest level of service and revenue',
    color: 'from-deep-green to-deep-green/90'
  }
]

export function ServiceTiers() {
  const [selectedTier, setSelectedTier] = useState<number>(1)

  return (
    <section id="tiers" className="py-20 bg-warm-ivory">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            Choose Your Partnership Level
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Transparent pricing. No hidden fees. Every tier includes our commitment 
            to telling your villa's unique story.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier, index) => {
            const Icon = tier.icon
            return (
              <div
                key={tier.name}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                  tier.popular ? 'ring-2 ring-terracotta scale-105' : ''
                } hover:shadow-2xl`}
                onMouseEnter={() => setSelectedTier(index)}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-terracotta text-white px-4 py-1 rounded-bl-lg">
                    <span className="text-sm font-medium">Most Popular</span>
                  </div>
                )}

                {/* Header */}
                <div className={`bg-gradient-to-br ${tier.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8" />
                    <div className="text-right">
                      <div className="text-3xl font-bold">{tier.commission}</div>
                      <div className="text-sm opacity-90">commission</div>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl mb-2">{tier.name}</h3>
                  <p className="text-sm opacity-90">{tier.description}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Minimum Booking Value - Only for Boutique Full */}
                  {tier.name === 'Boutique Full' && (
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <div className="font-bold text-deep-green">Available by Invitation Only</div>
                    </div>
                  )}

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-4">What's Included</h4>
                    <ul className="space-y-3">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Not Included (for Essential) */}
                  {tier.notIncluded && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-4">Available in Higher Tiers</h4>
                      <ul className="space-y-2">
                        {tier.notIncluded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Best For */}
                  <div className="p-4 bg-sand-beige rounded-lg">
                    <div className="text-xs font-semibold text-gray-600 mb-1">BEST FOR</div>
                    <p className="text-sm text-gray-700">{tier.bestFor}</p>
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full mt-6 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    tier.popular 
                      ? 'bg-terracotta text-white hover:bg-terracotta-dark' 
                      : 'bg-white border-2 border-deep-green text-deep-green hover:bg-deep-green hover:text-white'
                  }`}>
                    {tier.name === 'Boutique Full' ? 'Apply for Invitation' : 'Get Started'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Note */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            All tiers include our proprietary AI-powered marketing tools and genuine Balinese hospitality
          </p>
          <a href="#qualification" className="text-terracotta hover:text-terracotta-dark font-medium">
            Not sure which tier is right for you? Take our qualification quiz →
          </a>
        </div>
      </div>
    </section>
  )
}
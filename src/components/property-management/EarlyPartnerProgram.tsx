'use client'

import { Sparkles, Users, TrendingUp, Award, Clock, Gift } from 'lucide-react'

const benefits = [
  {
    icon: Gift,
    title: 'Reduced Commission',
    description: 'Lock in our founding partner rate: 2% lower than standard tiers for the first 2 years.',
    highlight: 'Save $12,000+ annually'
  },
  {
    icon: Sparkles,
    title: 'Priority Everything',
    description: 'First in line for bookings, support, and new feature rollouts. Your success is our showcase.',
    highlight: 'VIP treatment always'
  },
  {
    icon: Users,
    title: 'Co-Creation Partner',
    description: "Help shape AURA's services. Your feedback directly influences our product development.",
    highlight: 'Be heard, make impact'
  },
  {
    icon: Award,
    title: 'Founding Member Status',
    description: 'Permanent recognition as an AURA founding partner. Marketing benefits and credibility boost.',
    highlight: 'Exclusive badge & benefits'
  }
]

const timeline = [
  { month: 'December 2024', status: 'current', spots: '2 spots remaining' },
  { month: 'January 2025', status: 'upcoming', spots: '3 spots available' },
  { month: 'February 2025', status: 'upcoming', spots: '3 spots available' },
  { month: 'March 2025', status: 'final', spots: 'Program closes' }
]

export function EarlyPartnerProgram() {
  return (
    <section className="py-20 bg-gradient-to-br from-deep-green to-deep-green/90">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="bg-terracotta/20 text-terracotta px-4 py-2 rounded-full text-sm font-medium backdrop-blur">
              LIMITED TIME OPPORTUNITY
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Join as an Early Partner
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            We're selecting 8 exceptional villas to grow with us. Get founding member benefits 
            and shape the future of boutique villa management in Bali.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="bg-white/10 backdrop-blur rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-terracotta/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-terracotta" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-white/80 mb-3">
                      {benefit.description}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 bg-terracotta/20 rounded-full">
                      <span className="text-sm font-medium text-terracotta">
                        {benefit.highlight}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Timeline */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-12">
          <h3 className="font-serif text-2xl text-white mb-6 text-center">
            Application Timeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {timeline.map((item, index) => (
              <div
                key={item.month}
                className={`relative p-4 rounded-lg text-center ${
                  item.status === 'current' 
                    ? 'bg-terracotta text-white' 
                    : item.status === 'final'
                    ? 'bg-white/10 text-white/60'
                    : 'bg-white/5 text-white/80'
                }`}
              >
                {index < timeline.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-white/30"></div>
                )}
                <div className="font-semibold mb-1">{item.month}</div>
                <div className="text-sm">{item.spots}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-2xl p-8 mb-12">
          <h3 className="font-serif text-2xl text-deep-green mb-6">
            Early Partner Requirements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Your Villa Must Have:</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-terracotta rounded-full"></div>
                  <span className="text-gray-700">4+ bedrooms or unique boutique features</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-terracotta rounded-full"></div>
                  <span className="text-gray-700">Located in Uluwatu, Canggu, or Seminyak</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-terracotta rounded-full"></div>
                  <span className="text-gray-700">Ready for guests within 30 days</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-terracotta rounded-full"></div>
                  <span className="text-gray-700">Commitment to exceptional hospitality</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">You Must Be:</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-terracotta rounded-full"></div>
                  <span className="text-gray-700">Open to a 2-year initial partnership</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-terracotta rounded-full"></div>
                  <span className="text-gray-700">Willing to invest in property improvements</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-terracotta rounded-full"></div>
                  <span className="text-gray-700">Aligned with sustainable tourism values</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-terracotta rounded-full"></div>
                  <span className="text-gray-700">Ready to grow with us</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 mb-6 text-white/80">
            <Clock className="w-5 h-5" />
            <span>Early Partner Program closes March 2025</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#qualification"
              className="px-8 py-4 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-all duration-300"
            >
              Apply for Early Partnership
            </a>
            <a
              href="/property-management-deck.pdf"
              className="px-8 py-4 bg-white text-deep-green rounded-full font-medium hover:bg-gray-100 transition-all duration-300"
            >
              Download Partner Deck
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
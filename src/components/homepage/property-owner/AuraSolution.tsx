'use client'

import Link from 'next/link'

export function AuraSolution() {
  const solutions = [
    {
      title: 'AI-Powered Marketing',
      description: 'Dynamic pricing, targeted campaigns, and multi-channel distribution that keeps your villa booked',
      features: ['Smart pricing algorithms', 'Social media automation', 'OTA optimization']
    },
    {
      title: 'Heartfelt Guest Service',
      description: 'Our trained team provides 5-star hospitality that turns guests into repeat customers',
      features: ['24/7 guest support', 'Concierge services', 'Personal touches']
    },
    {
      title: 'Property Excellence',
      description: 'Proactive maintenance and premium amenities that command higher rates',
      features: ['Regular inspections', 'Preventive maintenance', 'Quality upgrades']
    },
    {
      title: 'Transparent Reporting',
      description: 'Real-time dashboards and monthly reports so you always know how your investment performs',
      features: ['Live occupancy data', 'Revenue analytics', 'Guest feedback']
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            The AURA Difference: Where Technology Meets Hospitality
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge AI with genuine Balinese hospitality to transform 
            your villa into a top-performing luxury rental
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {solutions.map((solution, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-to-br from-primary/5 to-terracotta/5 rounded-lg p-8 h-full hover:shadow-xl transition-all">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {solution.description}
                </p>
                <ul className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-terracotta flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/property-management"
            className="inline-block px-8 py-4 bg-terracotta text-white font-semibold rounded-lg hover:bg-terracotta-dark transition-all transform hover:scale-105 shadow-xl"
          >
            See How AURA Can Transform Your Villa
          </Link>
        </div>
      </div>
    </section>
  )
}
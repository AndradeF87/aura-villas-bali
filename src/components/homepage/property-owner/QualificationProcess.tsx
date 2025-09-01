'use client'

import Link from 'next/link'

export function QualificationProcess() {
  const steps = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'Schedule a free 30-minute call to discuss your property and goals',
      icon: '📞'
    },
    {
      number: '02',
      title: 'Property Evaluation',
      description: 'Our team visits your villa to assess its potential and requirements',
      icon: '🏠'
    },
    {
      number: '03',
      title: 'Custom Proposal',
      description: 'Receive a tailored management plan with revenue projections',
      icon: '📊'
    },
    {
      number: '04',
      title: 'Launch & Optimize',
      description: 'We handle everything from photography to your first booking',
      icon: '🚀'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            Getting Started is Simple
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're selective about the properties we manage to ensure quality for all our partners
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-terracotta/30 -z-10" />
              )}
              <div className="text-center">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="text-terracotta text-sm font-semibold mb-2">
                  STEP {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-serif text-gray-900 mb-6">
              Do You Qualify for AURA Management?
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Ideal Properties:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>2+ bedrooms in prime locations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Pool or unique features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Well-maintained condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Available for guest bookings</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Prime Locations:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Uluwatu & Bingin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Canggu & Pererenan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Seminyak & Oberoi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Ubud & Tegallalang</span>
                  </li>
                </ul>
              </div>
            </div>

            <Link
              href="/property-management"
              className="inline-block px-8 py-4 bg-terracotta text-white font-semibold rounded-lg hover:bg-terracotta-dark transition-all transform hover:scale-105 shadow-xl"
            >
              Apply for AURA Management
            </Link>
            
            <p className="mt-4 text-sm text-gray-600">
              Limited spots available • No obligation to proceed
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
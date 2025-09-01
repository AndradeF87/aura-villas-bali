export function ServicesGrid() {
  const services = [
    {
      category: 'Revenue Management',
      items: [
        'Dynamic pricing optimization',
        'Multi-channel distribution',
        'Direct booking website',
        'Seasonal rate strategies'
      ]
    },
    {
      category: 'Guest Experience',
      items: [
        '24/7 multilingual support',
        'Airport transfers',
        'Welcome amenities',
        'Concierge services'
      ]
    },
    {
      category: 'Property Care',
      items: [
        'Daily housekeeping',
        'Preventive maintenance',
        'Pool & garden care',
        'Security monitoring'
      ]
    },
    {
      category: 'Marketing & Sales',
      items: [
        'Professional photography',
        'Social media management',
        'Email marketing',
        'SEO optimization'
      ]
    },
    {
      category: 'Operations',
      items: [
        'Check-in/check-out',
        'Inventory management',
        'Vendor coordination',
        'Quality control'
      ]
    },
    {
      category: 'Owner Services',
      items: [
        'Monthly reporting',
        'Revenue optimization',
        'Tax compliance',
        'Owner stays coordination'
      ]
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            Comprehensive Villa Management Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to maximize revenue and minimize stress
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold text-primary mb-4">
                {service.category}
              </h3>
              <ul className="space-y-3">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-terracotta/10 rounded-lg p-8 text-center">
          <p className="text-lg text-gray-800 font-medium mb-4">
            All services included in our management packages
          </p>
          <p className="text-gray-600">
            No hidden fees • No setup costs • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}
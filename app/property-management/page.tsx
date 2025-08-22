import { 
  Home, 
  TrendingUp, 
  Shield, 
  Users, 
  Calendar, 
  BarChart3, 
  MessageCircle,
  Settings,
  Check,
  Star
} from 'lucide-react'

export default function PropertyManagement() {
  const services = [
    {
      icon: Home,
      title: 'Full Property Management',
      description: 'Complete end-to-end management of your villa, from guest services to maintenance.',
      features: ['24/7 Guest Support', 'Housekeeping Management', 'Maintenance Coordination', 'Security Oversight']
    },
    {
      icon: TrendingUp,
      title: 'Revenue Optimization',
      description: 'AI-powered pricing strategies to maximize your rental income year-round.',
      features: ['Dynamic Pricing', 'Market Analysis', 'Seasonal Adjustments', 'Competition Monitoring']
    },
    {
      icon: Shield,
      title: 'Legal & Compliance',
      description: 'Stay compliant with all local regulations and licensing requirements.',
      features: ['License Management', 'Tax Compliance', 'Insurance Coordination', 'Legal Documentation']
    },
    {
      icon: Users,
      title: 'Guest Experience',
      description: 'Premium concierge services ensuring 5-star reviews and repeat bookings.',
      features: ['Airport Transfers', 'Personal Concierge', 'Experience Curation', 'Special Requests']
    },
    {
      icon: Calendar,
      title: 'Booking Management',
      description: 'Multi-channel distribution across all major booking platforms.',
      features: ['Channel Management', 'Calendar Sync', 'Instant Booking', 'Availability Optimization']
    },
    {
      icon: BarChart3,
      title: 'Performance Analytics',
      description: 'Real-time dashboards and monthly reports on your property performance.',
      features: ['Occupancy Reports', 'Revenue Analytics', 'Guest Demographics', 'Market Insights']
    }
  ]

  const benefits = [
    { percentage: '95%', label: 'Average Occupancy Rate' },
    { percentage: '30%', label: 'Higher Revenue vs Self-Management' },
    { percentage: '4.9', label: 'Average Guest Rating' },
    { percentage: '24/7', label: 'Support Available' }
  ]

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Villa Owner, Seminyak',
      content: 'AURA transformed my villa investment. The revenue has exceeded all expectations, and I love how they handle everything professionally.',
      rating: 5
    },
    {
      name: 'James Chen',
      role: 'Property Investor',
      content: 'The AI-powered pricing strategy increased my bookings by 40%. Their team is exceptional and truly cares about maximizing returns.',
      rating: 5
    },
    {
      name: 'Maria Santos',
      role: 'Villa Owner, Ubud',
      content: 'Peace of mind is priceless. AURA handles everything from guest complaints to pool maintenance. I just enjoy the monthly reports!',
      rating: 5
    }
  ]

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-deep-green to-deep-green-dark text-white py-24">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl mb-6">
              Property Management
              <span className="block text-terracotta mt-2">Reimagined</span>
            </h1>
            <p className="text-xl sm:text-2xl text-sand-light mb-8 leading-relaxed">
              Let AI and local expertise maximize your villa&apos;s potential while you enjoy complete peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-all duration-300 transform hover:scale-105">
                Get Started Today
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 border border-white/30">
                Download Owner Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="bg-sand py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-terracotta mb-2">{benefit.percentage}</div>
                <div className="text-deep-green">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl text-deep-green mb-4">
              Comprehensive Services
            </h2>
            <p className="text-xl text-deep-green/70 max-w-3xl mx-auto">
              Everything you need to turn your villa into a profitable, professionally managed luxury rental.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group bg-white border border-sand rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-terracotta/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-terracotta/20 transition-colors">
                  <service.icon className="w-7 h-7 text-terracotta" />
                </div>
                <h3 className="font-serif text-2xl text-deep-green mb-3">{service.title}</h3>
                <p className="text-deep-green/70 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-deep-green/60">
                      <Check className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Technology Section */}
      <section className="py-20 bg-gradient-to-br from-sand-light to-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl text-deep-green mb-6">
                Powered by AI,
                <span className="block text-terracotta">Perfected by People</span>
              </h2>
              <p className="text-lg text-deep-green/70 mb-8">
                Our proprietary AI system analyzes millions of data points to optimize your pricing, 
                predict maintenance needs, and enhance guest experiences. Combined with our local 
                team&apos;s expertise, your villa operates at peak performance 24/7.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-terracotta/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="w-6 h-6 text-terracotta" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-green mb-1">Smart Automation</h4>
                    <p className="text-deep-green/70">Automated guest communications, check-ins, and service scheduling</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-terracotta/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-terracotta" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-green mb-1">Instant Response</h4>
                    <p className="text-deep-green/70">AI chatbot handles 90% of guest queries instantly, 24/7</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-terracotta/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-terracotta" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-deep-green mb-1">Predictive Analytics</h4>
                    <p className="text-deep-green/70">Forecast demand, optimize rates, and prevent issues before they occur</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-terracotta to-terracotta-dark rounded-3xl flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl font-bold mb-4">AI</div>
                  <div className="text-xl">Dashboard Preview</div>
                  <div className="text-sm opacity-80 mt-2">Coming Soon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl text-deep-green mb-4">
              Owner Success Stories
            </h2>
            <p className="text-xl text-deep-green/70">
              Join hundreds of satisfied villa owners who trust AURA
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-sand-light rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-terracotta text-terracotta" />
                  ))}
                </div>
                <p className="text-deep-green mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-deep-green">{testimonial.name}</div>
                  <div className="text-sm text-deep-green/60">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-terracotta to-terracotta-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl sm:text-5xl mb-6">
            Ready to Maximize Your Villa&apos;s Potential?
          </h2>
          <p className="text-xl mb-8 text-sand-light">
            Get a free property analysis and discover how much more your villa could earn with AURA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-terracotta rounded-full font-medium hover:bg-sand-light transition-all duration-300 transform hover:scale-105">
              Get Free Analysis
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 border border-white/30">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
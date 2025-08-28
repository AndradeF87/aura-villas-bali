'use client'

import { Bot, Heart, BarChart3, Globe, Shield, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/contexts/TranslationContext'

// We'll use the dictionary data instead of hardcoded technologies

export function TechnologySection() {
  const { dictionary } = useTranslation()
  
  const technologies = [
    {
      icon: Bot,
      title: dictionary?.technology?.features?.aiPricing?.title || 'AI-Powered Pricing',
      description: dictionary?.technology?.features?.aiPricing?.description || 'Dynamic pricing that adjusts to market demand, seasonality, and local events—maximizing revenue without manual intervention.',
      benefit: dictionary?.technology?.features?.aiPricing?.benefit || '+23% average revenue increase'
    },
    {
      icon: Heart,
      title: dictionary?.technology?.features?.humanTouch?.title || 'Human Touch Points',
      description: dictionary?.technology?.features?.humanTouch?.description || 'Technology handles the repetitive tasks. Our team focuses on creating memorable moments and genuine connections with guests.',
      benefit: dictionary?.technology?.features?.humanTouch?.benefit || '9.5+ guest satisfaction scores'
    },
    {
      icon: BarChart3,
      title: dictionary?.technology?.features?.analytics?.title || 'Real-Time Analytics',
      description: dictionary?.technology?.features?.analytics?.description || 'Track performance, occupancy, and revenue in real-time. Make data-driven decisions with our intuitive owner dashboard.',
      benefit: dictionary?.technology?.features?.analytics?.benefit || 'Daily insights, not monthly reports'
    },
    {
      icon: Globe,
      title: dictionary?.technology?.features?.distribution?.title || 'Multi-Channel Distribution',
      description: dictionary?.technology?.features?.distribution?.description || 'Synchronized listings across Booking.com, Airbnb, and direct bookings. One calendar, no double bookings, maximum exposure.',
      benefit: dictionary?.technology?.features?.distribution?.benefit || '40% reach through direct bookings'
    },
    {
      icon: Shield,
      title: dictionary?.technology?.features?.respectful?.title || 'Respectful Stays',
      description: dictionary?.technology?.features?.respectful?.description || 'Smart booking filters and personalized checks ensure your villa is always treated with care.',
      benefit: dictionary?.technology?.features?.respectful?.benefit || '99%+ incident-free stays'
    },
    {
      icon: Zap,
      title: dictionary?.technology?.features?.instant?.title || 'Instant Response System',
      description: dictionary?.technology?.features?.instant?.description || 'Automated initial responses within 1 minute, personalized follow-ups within 1 hour. Never miss a booking opportunity.',
      benefit: dictionary?.technology?.features?.instant?.benefit || '3x faster than industry average'
    }
  ]
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            {dictionary?.technology?.title || 'Smart Tools, Human Touch'}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            {dictionary?.technology?.subtitle || 'We use AI and automation to handle the complex stuff, so our team can focus on what matters: creating exceptional experiences for your guests'}
          </p>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => {
            const Icon = tech.icon
            return (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="relative"
              >
                <motion.div
                  className="p-6 bg-warm-ivory rounded-xl shadow-md h-full"
                  whileHover={{
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  {/* Icon with hover animation */}
                  <motion.div 
                    className="w-14 h-14 bg-white rounded-lg flex items-center justify-center mb-4"
                    whileHover={{ 
                      scale: 1.15,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.4 }
                    }}
                  >
                    <Icon className="w-7 h-7 text-terracotta" />
                  </motion.div>

                  {/* Content - Always visible */}
                  <h3 className="font-serif text-xl font-bold text-deep-green mb-3">
                    {tech.title}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {tech.description}
                  </p>

                  {/* Benefit Badge with pulse animation on hover */}
                  <motion.div 
                    className="inline-flex items-center px-3 py-1 bg-white rounded-full"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: '#C96F4A',
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.span 
                      className="text-sm font-medium text-terracotta"
                      whileHover={{ color: '#FFFFFF' }}
                    >
                      {tech.benefit}
                    </motion.span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-sand-beige rounded-2xl">
            <h3 className="font-serif text-2xl text-deep-green mb-4">
              {dictionary?.technology?.cta?.title || "Technology That Works Behind the Scenes"}
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl">
              {dictionary?.technology?.cta?.description || "While our systems optimize and automate, you'll always have a real person to talk to. That's the AURA difference—high-tech efficiency with high-touch service."}
            </p>
            <button className="px-8 py-3 bg-deep-green text-white rounded-full font-medium hover:bg-deep-green/90 transition-colors duration-300">
              {dictionary?.technology?.cta?.button || "See Our Tech in Action"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
'use client'

import { motion } from 'framer-motion'
import { BedDouble, AlertCircle, Wrench, TrendingDown } from 'lucide-react'
import { useTranslation } from '@/contexts/TranslationContext'

// We'll use the dictionary data instead of hardcoded challenges

export function ChallengesSection() {
  const { dictionary } = useTranslation()
  
  const challenges = [
    {
      icon: BedDouble,
      title: dictionary?.challenges?.items?.occupancy?.title || "Empty Nights Cost Money",
      description: dictionary?.challenges?.items?.occupancy?.description || "Your beautiful villa sits empty while competitors with inferior properties stay booked",
      impact: dictionary?.challenges?.items?.occupancy?.impact || "30% revenue loss"
    },
    {
      icon: TrendingDown,
      title: dictionary?.challenges?.items?.marketing?.title || "Marketing is Overwhelming",
      description: dictionary?.challenges?.items?.marketing?.description || "Managing OTAs, social media, and direct bookings while competing with hotels",
      impact: dictionary?.challenges?.items?.marketing?.impact || "60+ hours monthly"
    },
    {
      icon: AlertCircle,
      title: dictionary?.challenges?.items?.guest?.title || "Guest Issues Never Stop",
      description: dictionary?.challenges?.items?.guest?.description || "Dealing with complaints, damages, and emergencies at all hours",
      impact: dictionary?.challenges?.items?.guest?.impact || "24/7 stress"
    },
    {
      icon: Wrench,
      title: dictionary?.challenges?.items?.maintenance?.title || "Maintenance Never Ends",
      description: dictionary?.challenges?.items?.maintenance?.description || "Coordinating repairs, cleaning, and upkeep between guest stays",
      impact: dictionary?.challenges?.items?.maintenance?.impact || "15% of revenue"
    }
  ]
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            {dictionary?.challenges?.title || 'The challenges villa owners face in Bali'}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            {dictionary?.challenges?.subtitle || 'We understand the complexities of managing luxury properties in paradise'}
          </p>
        </div>

        {/* Challenge Grid - matching Technology Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon
            return (
              <motion.div
                key={challenge.title}
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
                  <h3 className="font-serif text-xl text-deep-green mb-3 font-bold">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {challenge.description}
                  </p>

                  {/* Impact Badge with pulse animation on hover */}
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
                      {challenge.impact}
                    </motion.span>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA - matching Technology Section */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-sand-beige rounded-2xl">
            <h3 className="font-serif text-2xl text-deep-green mb-4">
              {dictionary?.challenges?.solution?.title || "What if You Could Enjoy Passive Income?"}
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl">
              {dictionary?.challenges?.solution?.description || "Let us handle the challenges while you enjoy consistent returns. That's the AURA promise—professional management without the stress."}
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('qualification')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="px-8 py-3 bg-deep-green text-white rounded-full font-medium hover:bg-deep-green/90 transition-colors duration-300"
            >
              {dictionary?.challenges?.solution?.cta || "Discover the AURA Difference"}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
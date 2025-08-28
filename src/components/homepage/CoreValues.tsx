'use client'

import { Heart, Sparkles, Users, Brain, ChartBar, Award } from 'lucide-react'
import { useTranslation } from '@/contexts/TranslationContext'

export function CoreValues() {
  const { dictionary } = useTranslation()

  const values = [
    {
      icon: Heart,
      title: dictionary?.coreValues?.memoriesOverWalls?.title || 'Memories Over Walls',
      description: dictionary?.coreValues?.memoriesOverWalls?.description || 'We design stays that guests remember long after they leave.',
      color: 'text-terracotta'
    },
    {
      icon: Sparkles,
      title: dictionary?.coreValues?.villaStory?.title || "Your Villa's Own Story",
      description: dictionary?.coreValues?.villaStory?.description || 'Unique branding and positioning that makes your property unforgettable.',
      color: 'text-brand-gold'
    },
    {
      icon: Users,
      title: dictionary?.coreValues?.humanCare?.title || 'Human Care, Every Day',
      description: dictionary?.coreValues?.humanCare?.description || 'Hands-on operations with staff we treat like family.',
      color: 'text-deep-green'
    },
    {
      icon: Brain,
      title: dictionary?.coreValues?.aiMarketing?.title || 'AI-Enhanced Marketing',
      description: dictionary?.coreValues?.aiMarketing?.description || 'Smart tools that attract the right guests at the right price.',
      color: 'text-terracotta'
    },
    {
      icon: ChartBar,
      title: dictionary?.coreValues?.ownerPortal?.title || 'Owner Portal',
      description: dictionary?.coreValues?.ownerPortal?.description || 'Clear reports and insights at your fingertips, anytime.',
      color: 'text-deep-green'
    },
    {
      icon: Award,
      title: dictionary?.coreValues?.selectivePartnership?.title || 'Selective Partnership',
      description: dictionary?.coreValues?.selectivePartnership?.description || 'We grow slowly and thoughtfully so quality stays exceptional.',
      color: 'text-brand-gold'
    }
  ]

  return (
    <section className="py-20 bg-warm-ivory">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            {dictionary?.coreValues?.title || 'What Makes AURA Different'}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            {dictionary?.coreValues?.subtitle || 'We combine heartfelt hospitality with modern technology to create something special'}
          </p>
        </div>

        {/* Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${value.color} mb-4`}>
                  <Icon className="w-12 h-12" />
                </div>
                <h3 className="font-serif text-2xl text-deep-green mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 mb-6">
            {dictionary?.coreValues?.cta?.text || 'Ready to give your villa the care it deserves?'}
          </p>
          <a
            href="/property-management"
            className="inline-block bg-terracotta hover:bg-terracotta-dark text-white font-semibold py-4 px-8 rounded-full transition-colors duration-200"
          >
            {dictionary?.coreValues?.cta?.button || 'See If You Qualify'}
          </a>
        </div>
      </div>
    </section>
  )
}
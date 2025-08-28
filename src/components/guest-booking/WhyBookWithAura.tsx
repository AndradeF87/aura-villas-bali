'use client'

import { Shield, Star, Phone, CreditCard, Award, Heart } from 'lucide-react'
import { useTranslation } from '@/src/hooks/useTranslation'


export function WhyBookWithAura() {
  const { t } = useTranslation()

  const benefits = [
    {
      icon: Award,
      title: t('whyBookWithAura.benefits.handpicked.title'),
      description: t('whyBookWithAura.benefits.handpicked.description')
    },
    {
      icon: Phone,
      title: t('whyBookWithAura.benefits.concierge.title'),
      description: t('whyBookWithAura.benefits.concierge.description')
    },
    {
      icon: CreditCard,
      title: t('whyBookWithAura.benefits.priceGuarantee.title'),
      description: t('whyBookWithAura.benefits.priceGuarantee.description')
    },
    {
      icon: Heart,
      title: t('whyBookWithAura.benefits.localExperiences.title'),
      description: t('whyBookWithAura.benefits.localExperiences.description')
    },
    {
      icon: Star,
      title: t('whyBookWithAura.benefits.verifiedReviews.title'),
      description: t('whyBookWithAura.benefits.verifiedReviews.description')
    },
    {
      icon: Shield,
      title: t('whyBookWithAura.benefits.secureProtected.title'),
      description: t('whyBookWithAura.benefits.secureProtected.description')
    }
  ]

  return (
    <section className="py-20 bg-warm-ivory">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            {t('whyBookWithAura.title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            {t('whyBookWithAura.subtitle')}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-terracotta/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-terracotta/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-terracotta" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl text-deep-green mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-8 p-6 bg-white rounded-2xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-terracotta">100%</div>
              <div className="text-sm text-gray-600">{t('whyBookWithAura.trustBadges.guestSatisfaction')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-terracotta">24/7</div>
              <div className="text-sm text-gray-600">{t('whyBookWithAura.trustBadges.supportAvailable')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-terracotta">2</div>
              <div className="text-sm text-gray-600">{t('whyBookWithAura.trustBadges.luxuryProperties')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-terracotta">50+</div>
              <div className="text-sm text-gray-600">{t('whyBookWithAura.trustBadges.fiveStarReviews')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
'use client'

import { useState } from 'react'
import { Check, Star, Sparkles, Crown, X, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/contexts/TranslationContext'

export function ServiceTiers() {
  const [selectedTier, setSelectedTier] = useState<number>(1)
  const [showModal, setShowModal] = useState(false)
  const [selectedTierName, setSelectedTierName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showEnvelope, setShowEnvelope] = useState(false)
  const { dictionary } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tier: ''
  })

  // Map tiers from dictionary
  const tiers = [
    {
      name: dictionary?.serviceTiers?.tiers?.essential?.name || 'Essential',
      icon: Star,
      commission: '15%',
      commissionNote: dictionary?.serviceTiers?.afterOtaFees || '(after OTA Fees)',
      description: dictionary?.serviceTiers?.tiers?.essential?.description || 'For established villas that need a reliable partner',
      features: dictionary?.serviceTiers?.tiers?.essential?.features || [],
      availableHigherTiers: dictionary?.serviceTiers?.tiers?.essential?.availableHigherTiers || [],
      bestFor: dictionary?.serviceTiers?.tiers?.essential?.bestFor || 'Villas with existing reputation seeking operational support',
      color: 'from-gray-600 to-gray-700'
    },
    {
      name: dictionary?.serviceTiers?.tiers?.premium?.name || 'Premium',
      icon: Sparkles,
      commission: '18%',
      commissionNote: dictionary?.serviceTiers?.afterOtaFees || '(after OTA Fees)',
      description: dictionary?.serviceTiers?.tiers?.premium?.description || 'Full-service management with growth focus',
      popular: true,
      features: dictionary?.serviceTiers?.tiers?.premium?.features || [],
      bestFor: dictionary?.serviceTiers?.tiers?.premium?.bestFor || 'Villas wanting to maximize revenue and guest satisfaction',
      color: 'from-terracotta to-terracotta-dark'
    },
    {
      name: dictionary?.serviceTiers?.tiers?.boutique?.name || 'Boutique Full',
      icon: Crown,
      commission: '23%',
      commissionNote: dictionary?.serviceTiers?.afterOtaFees || '(after OTA Fees)',
      description: dictionary?.serviceTiers?.tiers?.boutique?.description || 'White-glove service for exceptional properties',
      availableByInvitation: dictionary?.serviceTiers?.tiers?.boutique?.availableByInvitation || 'Available by Invitation Only',
      features: dictionary?.serviceTiers?.tiers?.boutique?.features || [],
      bestFor: dictionary?.serviceTiers?.tiers?.boutique?.bestFor || 'Boutique villas seeking the highest level of service and revenue',
      color: 'from-deep-green to-deep-green/90'
    }
  ]

  // Reorder tiers to put Premium in the middle
  const displayTiers = [tiers[0], tiers[1], tiers[2]] // Essential, Premium, Boutique

  const handleOpenModal = (tierName: string) => {
    setSelectedTierName(tierName)
    setFormData(prev => ({ ...prev, tier: tierName }))
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/submit-interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        setShowEnvelope(true)
        setTimeout(() => {
          setShowModal(false)
          setShowEnvelope(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            {dictionary?.serviceTiers?.title || 'Choose Your Partnership Level'}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {dictionary?.serviceTiers?.subtitle || 'Flexible solutions tailored to your property\'s needs'}
          </p>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {displayTiers.map((tier, index) => {
            const Icon = tier.icon
            const isPremium = tier.name.includes('Premium') || tier.popular === true
            
            return (
              <div
                key={tier.name}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                  isPremium ? 'ring-2 ring-terracotta scale-105' : ''
                } hover:shadow-2xl`}
                onMouseEnter={() => setSelectedTier(index)}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-deep-green text-white px-6 py-2 rounded-full shadow-lg z-10">
                    <span className="text-sm font-bold uppercase tracking-wider">{dictionary?.serviceTiers?.mostPopular || 'Most Popular'}</span>
                  </div>
                )}

                {/* Header */}
                <div className={`bg-gradient-to-br ${tier.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="w-8 h-8" />
                    <div className="text-right">
                      <div className="text-3xl font-bold">{tier.commission}</div>
                      <div className="text-xs opacity-90">{tier.commissionNote}</div>
                    </div>
                  </div>
                  <h3 className="font-serif text-2xl mb-2">{tier.name}</h3>
                  <p className="text-sm opacity-90">{tier.description}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Minimum Booking Value - Only for Boutique Full */}
                  {tier.availableByInvitation && (
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <div className="font-bold text-deep-green">{tier.availableByInvitation}</div>
                    </div>
                  )}

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      {dictionary?.serviceTiers?.whatsIncluded || 'What\'s Included'}
                    </h4>
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
                  {tier.availableHigherTiers && tier.availableHigherTiers.length > 0 && tier.name.includes('Essential') && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-4">
                        {dictionary?.serviceTiers?.availableHigherTiers || 'Available in Higher Tiers'}
                      </h4>
                      <ul className="space-y-2">
                        {tier.availableHigherTiers.map((item, idx) => (
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
                    <div className="text-xs font-semibold text-gray-600 mb-1">{dictionary?.serviceTiers?.bestFor || 'BEST FOR'}</div>
                    <p className="text-sm text-gray-700">{tier.bestFor}</p>
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={() => handleOpenModal(tier.name)}
                    className={`w-full mt-6 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
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
          <div className="flex flex-col items-center gap-4">
            <a href="#qualification" className="text-terracotta hover:text-terracotta-dark font-medium">
              {dictionary?.serviceTiers?.notSure || 'Not sure which tier is right for you? Take our qualification quiz →'}
            </a>
            <a 
              href="/pricing" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-terracotta text-terracotta rounded-full font-medium hover:bg-terracotta hover:text-white transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              {dictionary?.serviceTiers?.viewPackages || 'View Our Marketing Packages'}
            </a>
          </div>
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-md w-full p-8 relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>

                {!showEnvelope ? (
                  <>
                    <h3 className="text-2xl font-serif text-deep-green mb-2">
                      Get Started with {selectedTierName}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      We'll reach out within 24 hours to discuss your property
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        required
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-terracotta"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-terracotta"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        required
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-terracotta"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta-dark transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Interest'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                    >
                      <Mail className="h-16 w-16 text-terracotta mx-auto mb-4" />
                      <h3 className="text-xl font-serif text-deep-green mb-2">
                        Thank You!
                      </h3>
                      <p className="text-gray-600">
                        We'll be in touch soon!
                      </p>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
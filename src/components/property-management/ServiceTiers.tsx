'use client'

import { useState } from 'react'
import { Check, Star, Sparkles, Crown, X, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const tiers = [
  {
    name: 'Essential',
    icon: Star,
    commission: '15%',
    commissionNote: '(after OTA Fees)',
    description: 'For established villas that need a reliable partner',
    features: [
      'Daily Housekeeping Supervision',
      'Guest Check-in & Check-out Assistance',
      'Guest Support (8 AM – 8 PM)',
      'Maintenance Coordination (Plumbing, AC, Electrical)',
      'Pool & Garden Scheduling',
      'Booking Calendar Management',
      'Monthly Stock Inventory',
      'Laundry Coordination',
      'Monthly Owner Report',
      'Basic Amenities Restocking',
      'Digital Guest Guidebook',
      'Monthly Preventive Maintenance Walkthrough',
      'Utility Bills Payment Assistance'
    ],
    notIncluded: [
      '24/7 Guest Support',
      'Concierge Services (Tours, Spa, Transport)',
      'Dedicated Operations Manager',
      'Direct Staffing & Payroll Management',
      'Tax Reporting & Compliance',
      'Full Financial Management'
    ],
    bestFor: 'Villas with existing reputation seeking operational support',
    color: 'from-gray-600 to-gray-700'
  },
  {
    name: 'Premium',
    icon: Sparkles,
    commission: '18%',
    commissionNote: '(after OTA Fees)',
    description: 'Full-service management with growth focus',
    popular: true,
    features: [
      'Everything in Essential, plus:',
      '24/7 Guest Support',
      'In-Villa Welcome (with refreshments)',
      'Concierge Services (Tours, Spa, Transport)',
      'Weekly Villa Inspections (with photo/video reports)',
      'Dedicated Operations Manager',
      'Monthly Deep Cleaning Coordination',
      'Priority Maintenance Response + Repairs Buffer (Rp 500,000/month included)',
      'Personalized Guest Gifts',
      'VIP Amenities (Premium toiletries & gifts – at cost)',
      'Staff Hiring Assistance (optional)',
      'Quarterly Performance Review',
      'Local Authority Liaison (Banjar, licensing)'
    ],
    bestFor: 'Villas wanting to maximize revenue and guest satisfaction',
    color: 'from-terracotta to-terracotta-dark'
  },
  {
    name: 'Boutique Full',
    icon: Crown,
    commission: '23%',
    commissionNote: '(after OTA Fees)',
    description: 'White-glove service for exceptional properties',
    minBookingValue: 'By invitation',
    features: [
      'Everything in Premium, plus:',
      'Direct Staffing Management - We hire, train, and pay villa staff under AURA payroll',
      'Complete HR Management (leave, replacement, bonus structure)',
      'Expense & Cash Flow Management - All operational expenses processed directly',
      'One simple monthly invoice covering all costs',
      'Monthly Tax Reporting & Compliance - PPH Tax Reports submitted on your behalf',
      'Full compliance with Indonesian tax laws',
      'Monthly financial report with complete breakdown',
      'Annual Profit & Loss Summary',
      'Quarterly staff evaluations and performance reports',
      'Annual CAPEX Planning Assistance for villa improvements'
    ],
    bestFor: 'Boutique villas seeking the highest level of service and revenue',
    color: 'from-deep-green to-deep-green/90'
  }
]

export function ServiceTiers() {
  const [selectedTier, setSelectedTier] = useState<number>(1)
  const [showModal, setShowModal] = useState(false)
  const [selectedTierName, setSelectedTierName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showEnvelope, setShowEnvelope] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tier: ''
  })

  const handleOpenModal = (tierName: string) => {
    setSelectedTierName(tierName)
    setFormData({ ...formData, tier: tierName })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setFormData({ name: '', email: '', phone: '', tier: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact-form',
          data: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: `I am interested in learning more about the ${formData.tier} partnership tier. Please contact me with more information.`
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send email')
      }

      // Show envelope animation
      setShowEnvelope(true)
      setTimeout(() => {
        handleCloseModal()
        setShowEnvelope(false)
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      alert('Sorry, there was an error. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="tiers" className="py-20 bg-warm-ivory">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            Choose Your Partnership Level
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Transparent pricing. No hidden fees. Every tier includes our commitment 
            to telling your villa's unique story.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier, index) => {
            const Icon = tier.icon
            return (
              <div
                key={tier.name}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                  tier.popular ? 'ring-2 ring-terracotta scale-105' : ''
                } hover:shadow-2xl`}
                onMouseEnter={() => setSelectedTier(index)}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-deep-green text-white px-6 py-2 rounded-full shadow-lg z-10">
                    <span className="text-sm font-bold uppercase tracking-wider">Most Popular</span>
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
                  {tier.name === 'Boutique Full' && (
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <div className="font-bold text-deep-green">Available by Invitation Only</div>
                    </div>
                  )}

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-4">What's Included</h4>
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
                  {tier.notIncluded && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-4">Available in Higher Tiers</h4>
                      <ul className="space-y-2">
                        {tier.notIncluded.map((item, idx) => (
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
                    <div className="text-xs font-semibold text-gray-600 mb-1">BEST FOR</div>
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
              Not sure which tier is right for you? Take our qualification quiz →
            </a>
            <a 
              href="/pricing" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-terracotta text-terracotta rounded-full font-medium hover:bg-terracotta hover:text-white transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              View Our Marketing Packages
            </a>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal content */}
            <h3 className="font-serif text-2xl text-deep-green mb-2">
              {selectedTierName === 'Boutique Full' ? 'Apply for Boutique Full' : `Get Started with ${selectedTierName}`}
            </h3>
            <p className="text-gray-600 mb-6">
              Leave your details and we'll contact you within 24 hours with more information.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="+62 xxx xxxx xxxx"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By submitting, you agree to be contacted by AURA Villas Bali
            </p>
          </div>
        </div>
      )}

      {/* Envelope Animation */}
      <AnimatePresence>
        {showEnvelope && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[60] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                x: [0, 0, 500],
                y: [0, -50, -200],
                rotate: [0, -15, -30]
              }}
              transition={{ 
                duration: 1.5,
                times: [0, 0.3, 1],
                ease: "easeOut"
              }}
              className="bg-white rounded-lg shadow-2xl p-4"
            >
              <Mail className="w-16 h-16 text-terracotta" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: 2,
                  ease: "easeInOut"
                }}
                className="text-terracotta font-serif text-2xl"
              >
                Message Sent!
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
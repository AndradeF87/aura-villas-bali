'use client'

import { useState } from 'react'
import { ChevronRight, Check } from 'lucide-react'

interface FormData {
  villaName: string
  location: string
  bedrooms: string
  currentOccupancy: string
  managementStatus: string
  readyDate: string
  investmentReady: string
  goals: string
  ownerName: string
  email: string
  phone: string
  preferredContact: string
}

const initialFormData: FormData = {
  villaName: '',
  location: '',
  bedrooms: '',
  currentOccupancy: '',
  managementStatus: '',
  readyDate: '',
  investmentReady: '',
  goals: '',
  ownerName: '',
  email: '',
  phone: '',
  preferredContact: 'email'
}

const locations = [
  'Uluwatu/Pecatu',
  'Canggu',
  'Seminyak',
  'Ubud',
  'Sanur',
  'Nusa Dua',
  'Other'
]

export function QualificationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = 3

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
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
          type: 'qualification-form',
          data: {
            ownerName: formData.ownerName,
            email: formData.email,
            phone: formData.phone,
            preferredContact: formData.preferredContact,
            villaName: formData.villaName,
            location: formData.location,
            bedrooms: formData.bedrooms,
            currentOccupancy: formData.currentOccupancy,
            managementStatus: formData.managementStatus,
            readyDate: formData.readyDate,
            investmentReady: formData.investmentReady,
            goals: formData.goals
          }
        })
      })
      
      if (!response.ok) {
        throw new Error('Failed to send email')
      }
      
      setSubmitted(true)
    } catch (error) {
      console.error('Error sending form:', error)
      alert('Sorry, there was an error sending your request. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="qualification" className="min-h-screen flex items-center justify-center py-20 bg-warm-ivory">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-terracotta rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-serif text-3xl text-deep-green mb-4">
              Thank You for Your Interest!
            </h2>
            <p className="text-gray-700 mb-6">
              We've received your application and will review it carefully. Our partnership team will 
              reach out within 48 hours to discuss next steps.
            </p>
            <p className="text-sm text-gray-600">
              Application reference: AURA-{Date.now().toString().slice(-6)}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="qualification" className="min-h-screen py-20 bg-warm-ivory flex items-center">
      <div className="container mx-auto px-4">
        <div className="w-full">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
              Is Your Villa Right for AURA?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Tell us about your property and goals. This 2-minute assessment helps us understand 
              if we're the right partner for your villa's success.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center ${step < 3 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step <= currentStep
                      ? 'bg-terracotta text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step < currentStep ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step < currentStep ? 'bg-terracotta' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Property Details</span>
            <span>Management Goals</span>
            <span>Contact Info</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Property Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-deep-green mb-6">
                Tell Us About Your Villa
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Villa Name
                </label>
                <input
                  type="text"
                  name="villaName"
                  value={formData.villaName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="e.g., Villa Sunset Dreams"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  required
                >
                  <option value="">Select location</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Bedrooms
                  </label>
                  <select
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    required
                  >
                    <option value="">Select bedrooms</option>
                    <option value="1-2">1-2 Bedrooms</option>
                    <option value="3-4">3-4 Bedrooms</option>
                    <option value="5-6">5-6 Bedrooms</option>
                    <option value="7+">7+ Bedrooms</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Occupancy Rate
                  </label>
                  <select
                    name="currentOccupancy"
                    value={formData.currentOccupancy}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    required
                  >
                    <option value="">Select occupancy</option>
                    <option value="new">New Property</option>
                    <option value="0-25">0-25%</option>
                    <option value="26-50">26-50%</option>
                    <option value="51-75">51-75%</option>
                    <option value="76-100">76-100%</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-colors duration-300 flex items-center gap-2"
                >
                  Next Step
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Management Goals */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-deep-green mb-6">
                Your Management Goals
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Management Status
                </label>
                <select
                  name="managementStatus"
                  value={formData.managementStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  required
                >
                  <option value="">Select status</option>
                  <option value="self">Self-managed</option>
                  <option value="agency">With another agency</option>
                  <option value="new">New property</option>
                  <option value="switching">Looking to switch</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  When would you like to start?
                </label>
                <select
                  name="readyDate"
                  value={formData.readyDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  required
                >
                  <option value="">Select timeframe</option>
                  <option value="immediate">Immediately</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="2-3-months">2-3 months</option>
                  <option value="3-6-months">3-6 months</option>
                  <option value="6-months">6+ months</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Are you ready to invest in improvements if needed?
                </label>
                <select
                  name="investmentReady"
                  value={formData.investmentReady}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  required
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes, I'm ready to invest</option>
                  <option value="depends">Depends on ROI potential</option>
                  <option value="minor">Only minor improvements</option>
                  <option value="no">No improvements needed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What's most important to you? (Select your top priority)
                </label>
                <textarea
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="e.g., Maximize revenue, maintain property condition, attract quality guests, reduce management hassle..."
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-300"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-colors duration-300 flex items-center gap-2"
                >
                  Next Step
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-deep-green mb-6">
                Let's Connect
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent"
                    placeholder="+62 xxx xxx xxxx"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Contact Method
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Email
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="whatsapp"
                      checked={formData.preferredContact === 'whatsapp'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    WhatsApp
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="call"
                      checked={formData.preferredContact === 'call'}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Phone Call
                  </label>
                </div>
              </div>

              <div className="bg-warm-ivory rounded-lg p-4">
                <p className="text-sm text-gray-600">
                  By submitting this form, you agree to be contacted by AURA Villas Bali regarding 
                  property management services. We respect your privacy and will never share your 
                  information with third parties.
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-300"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Submit Application'}
                </button>
              </div>
            </div>
          )}
        </form>
        </div>
      </div>
    </section>
  )
}
'use client'

import { useState } from 'react'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Send,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const offices = [
    {
      location: 'Seminyak',
      address: 'Jl. Kayu Aya No. 68, Seminyak, Badung, Bali 80361',
      phone: '+62 361 123 4567',
      email: 'seminyak@auravillasbali.com',
      hours: 'Mon-Fri: 8:00 AM - 8:00 PM, Sat-Sun: 9:00 AM - 6:00 PM'
    },
    {
      location: 'Ubud',
      address: 'Jl. Raya Sanggingan No. 21, Ubud, Gianyar, Bali 80571',
      phone: '+62 361 234 5678',
      email: 'ubud@auravillasbali.com',
      hours: 'Mon-Fri: 8:00 AM - 7:00 PM, Sat-Sun: 9:00 AM - 5:00 PM'
    },
    {
      location: 'Canggu',
      address: 'Jl. Pantai Batu Bolong No. 44, Canggu, Badung, Bali 80361',
      phone: '+62 361 345 6789',
      email: 'canggu@auravillasbali.com',
      hours: 'Mon-Fri: 8:00 AM - 7:00 PM, Sat-Sun: 9:00 AM - 5:00 PM'
    }
  ]

  const faqs = [
    {
      question: 'How do I book a villa?',
      answer: 'You can book directly through our website, contact us via WhatsApp, or call any of our offices. Our team will guide you through the process and help you find the perfect villa for your needs.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Our standard cancellation policy allows free cancellation up to 30 days before check-in. For cancellations within 30 days, different terms apply depending on the season and villa. Please refer to your booking confirmation for specific details.'
    },
    {
      question: 'Do you offer airport transfers?',
      answer: 'Yes, we provide complimentary airport transfers for bookings of 5 nights or more. For shorter stays, we can arrange transfers at competitive rates. Just let us know your flight details when booking.'
    },
    {
      question: 'Can you arrange experiences and activities?',
      answer: 'Absolutely! Our concierge team can arrange everything from temple tours and cooking classes to surfing lessons and spa treatments. We have partnerships with the best local providers to ensure authentic experiences.'
    },
    {
      question: 'What services are included in villa rental?',
      answer: 'All our villas include daily housekeeping, pool maintenance, 24/7 guest support, WiFi, and welcome amenities. Some villas also include breakfast, personal chef services, and butler service. Check individual villa listings for specific inclusions.'
    },
    {
      question: 'How do I become a property owner with AURA?',
      answer: 'We are always looking for exceptional properties to add to our portfolio. Contact our property management team for a free consultation and property evaluation. We will assess your villa and provide a detailed proposal for management services.'
    }
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    }, 5000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sand to-sand-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif text-5xl sm:text-6xl text-deep-green mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-deep-green/80">
              Whether you are planning your dream vacation or looking to list your property, 
              we are here to help make it extraordinary.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="bg-deep-green py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 text-white">
            <a href="tel:+623611234567" className="flex items-center gap-2 hover:text-terracotta transition-colors">
              <Phone className="w-5 h-5" />
              <span>+62 361 123 4567</span>
            </a>
            <a href="mailto:hello@auravillasbali.com" className="flex items-center gap-2 hover:text-terracotta transition-colors">
              <Mail className="w-5 h-5" />
              <span>hello@auravillasbali.com</span>
            </a>
            <a href="https://wa.me/623611234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-terracotta transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-3xl text-deep-green mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent Successfully!</h3>
                  <p className="text-green-700">Thank you for contacting us. We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-deep-green mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all ${
                          errors.name ? 'border-red-500' : 'border-sand'
                        }`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-deep-green mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all ${
                          errors.email ? 'border-red-500' : 'border-sand'
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-deep-green mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-sand rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all"
                        placeholder="+62 xxx xxxx xxxx"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-deep-green mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all ${
                          errors.subject ? 'border-red-500' : 'border-sand'
                        }`}
                      >
                        <option value="">Select a subject</option>
                        <option value="booking">Villa Booking</option>
                        <option value="property">List My Property</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="support">Guest Support</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-deep-green mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-terracotta focus:border-transparent transition-all resize-none ${
                        errors.message ? 'border-red-500' : 'border-sand'
                      }`}
                      placeholder="Tell us how we can help you..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 bg-terracotta text-white rounded-lg font-medium hover:bg-terracotta-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="font-serif text-3xl text-deep-green mb-6">Our Offices</h2>
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div key={index} className="bg-sand-light rounded-xl p-6">
                    <h3 className="font-serif text-xl text-deep-green mb-4">{office.location}</h3>
                    <div className="space-y-3 text-deep-green/80">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{office.address}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-terracotta flex-shrink-0" />
                        <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-sm hover:text-terracotta transition-colors">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-terracotta flex-shrink-0" />
                        <a href={`mailto:${office.email}`} className="text-sm hover:text-terracotta transition-colors">
                          {office.email}
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{office.hours}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency Contact */}
              <div className="mt-6 bg-terracotta/10 border border-terracotta/30 rounded-xl p-6">
                <h3 className="font-semibold text-deep-green mb-2">24/7 Guest Emergency Hotline</h3>
                <a href="tel:+6281234567890" className="text-2xl font-bold text-terracotta hover:text-terracotta-dark transition-colors">
                  +62 812 3456 7890
                </a>
                <p className="text-sm text-deep-green/70 mt-2">
                  For urgent assistance outside business hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-sand-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-deep-green mb-4">Find Us in Bali</h2>
            <p className="text-deep-green/80">
              Visit any of our three offices across Bali&apos;s most popular destinations
            </p>
          </div>
          
          {/* Map Placeholder */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-terracotta mx-auto mb-4" />
              <p className="text-deep-green font-medium">Interactive Map</p>
              <p className="text-deep-green/60 text-sm mt-2">Google Maps integration coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl text-deep-green mb-4">Frequently Asked Questions</h2>
            <p className="text-deep-green/80">
              Find answers to common questions about our services
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-sand rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-sand-light/50 transition-colors"
                >
                  <span className="font-medium text-deep-green">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-terracotta" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-terracotta" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-sand-light/30 border-t border-sand">
                    <p className="text-deep-green/80">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-terracotta to-terracotta-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl mb-4">
            Ready to Start Your Bali Journey?
          </h2>
          <p className="text-xl text-sand-light mb-8">
            Our team is standing by to help you create unforgettable memories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/623611234567"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-terracotta rounded-full font-medium hover:bg-sand-light transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
            <a
              href="tel:+623611234567"
              className="px-8 py-3 bg-white/10 backdrop-blur text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 border border-white/30 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
'use client'

import { useState } from 'react'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle,
  Send
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

  const offices = [
    {
      location: 'Seminyak',
      address: 'Jl. Kayu Aya No. 68, Seminyak, Badung, Bali 80361',
      phone: '+62 361 123 4567',
      email: 'seminyak@auravillasbali.com',
      hours: {
        weekdays: 'Mon-Fri: 8:00 AM - 8:00 PM',
        weekends: 'Sat-Sun: 9:00 AM - 6:00 PM'
      }
    },
    {
      location: 'Ubud',
      address: 'Jl. Raya Sanggingan No. 21, Ubud, Gianyar, Bali 80571',
      phone: '+62 361 234 5678',
      email: 'ubud@auravillasbali.com',
      hours: {
        weekdays: 'Mon-Fri: 8:00 AM - 7:00 PM',
        weekends: 'Sat-Sun: 9:00 AM - 5:00 PM'
      }
    },
    {
      location: 'Canggu',
      address: 'Jl. Pantai Batu Bolong No. 44, Canggu, Badung, Bali 80361',
      phone: '+62 361 345 6789',
      email: 'canggu@auravillasbali.com',
      hours: {
        weekdays: 'Mon-Fri: 8:00 AM - 7:00 PM',
        weekends: 'Sat-Sun: 9:00 AM - 5:00 PM'
      }
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
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-sand-light flex items-center justify-center overflow-hidden">
        <div className="relative z-20 text-center text-deep-green max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl mb-4">
            Get in Touch
          </h1>
          <p className="text-xl sm:text-2xl text-deep-green/80">
            We're Here to Help You Create Unforgettable Bali Experiences
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-deep-green/80">
            <MapPin className="w-5 h-5" />
            <span>Seminyak, Ubud & Canggu</span>
          </div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="py-16 bg-deep-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6">
              Connect With Our Team
            </h2>
            <p className="text-lg text-white/90 leading-relaxed mb-8">
              Whether you're planning your dream vacation or looking to list your property, 
              our dedicated team is ready to assist you with personalized service and local expertise.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="tel:+623611234567" 
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur rounded-full hover:bg-white/20 transition-all text-white"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">+62 361 123 4567</span>
              </a>
              <a 
                href="mailto:hello@auravillasbali.com" 
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur rounded-full hover:bg-white/20 transition-all text-white"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">hello@auravillasbali.com</span>
              </a>
              <a 
                href="https://wa.me/623611234567" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur rounded-full hover:bg-white/20 transition-all text-white"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">WhatsApp</span>
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-sm text-white/70 mb-2">24/7 Guest Emergency Hotline</p>
              <a href="tel:+6281234567890" className="text-2xl font-bold text-white hover:text-sand-light transition-colors">
                +62 812 3456 7890
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="font-serif text-2xl text-deep-green mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-deep-green/70 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-sm ${
                        errors.name ? 'border-red-400' : 'border-gray-200'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-deep-green/70 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-sm ${
                        errors.email ? 'border-red-400' : 'border-gray-200'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-deep-green/70 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-sm"
                    placeholder="+62 xxx xxxx xxxx"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-deep-green/70 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-sm"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Villa Booking</option>
                    <option value="property">List My Property</option>
                    <option value="support">Guest Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-deep-green/70 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all resize-none text-sm ${
                      errors.message ? 'border-red-400' : 'border-gray-200'
                    }`}
                    placeholder="Tell us how we can help you..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="px-6 py-2.5 bg-terracotta text-white rounded-lg font-medium hover:bg-terracotta-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : isSubmitted ? (
                    'Message Sent!'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="font-serif text-2xl text-deep-green mb-6">Our Offices</h2>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <div key={index} className="bg-sand/10 rounded-lg p-5 border border-sand/20">
                    <h3 className="font-semibold text-lg text-deep-green mb-3">{office.location}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                        <span className="text-deep-green/70">{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-terracotta flex-shrink-0" />
                        <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-deep-green/70 hover:text-terracotta transition-colors">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-terracotta flex-shrink-0" />
                        <a href={`mailto:${office.email}`} className="text-deep-green/70 hover:text-terracotta transition-colors">
                          {office.email}
                        </a>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                        <div className="text-deep-green/70">
                          <div>{office.hours.weekdays}</div>
                          <div>{office.hours.weekends}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
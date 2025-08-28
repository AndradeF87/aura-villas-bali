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

interface ContactPageClientProps {
  dictionary: any
  locale: string
}

export default function ContactPageClient({ dictionary, locale }: ContactPageClientProps) {
  const t = dictionary?.contactPage || {}
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = t.form?.errors?.nameRequired || 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t.form?.errors?.emailRequired || 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.form?.errors?.emailInvalid || 'Please enter a valid email'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t.form?.errors?.messageRequired || 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t.form?.errors?.messageTooShort || 'Message must be at least 10 characters'
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
            {t.hero?.title || 'Get in Touch'}
          </h1>
          <p className="text-xl sm:text-2xl text-deep-green/80">
            {t.hero?.subtitle || "We're Here to Help You Create Unforgettable Bali Experiences"}
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
              {t.info?.title || 'Connect With Our Team'}
            </h2>
            <p className="text-lg text-white/90 leading-relaxed mb-8">
              {t.info?.description || "Whether you're planning your dream vacation or looking to list your property, our dedicated team is ready to assist you with personalized service and local expertise."}
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
              <p className="text-sm text-white/70 mb-2">{t.info?.emergencyHotline || '24/7 Guest Emergency Hotline'}</p>
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
              <h2 className="font-serif text-2xl text-deep-green mb-6">{t.form?.title || 'Send Us a Message'}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-deep-green/70 mb-1">
                      {t.form?.fields?.name || 'Name'} *
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
                      placeholder={locale === 'es-ES' ? 'Tu nombre' : 'Your name'}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-deep-green/70 mb-1">
                      {t.form?.fields?.email || 'Email'} *
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
                      placeholder={locale === 'es-ES' ? 'tu@correo.com' : 'your@email.com'}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-deep-green/70 mb-1">
                    {t.form?.fields?.phone || 'Phone'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-sm"
                    placeholder={locale === 'es-ES' ? '+62 xxx xxxx xxxx' : '+62 xxx xxxx xxxx'}
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-deep-green/70 mb-1">
                    {t.form?.fields?.subject || 'Subject'}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta transition-all text-sm"
                  >
                    <option value="">{locale === 'es-ES' ? 'Selecciona un asunto' : 'Select a subject'}</option>
                    <option value="booking">{locale === 'es-ES' ? 'Reserva de Villa' : 'Villa Booking'}</option>
                    <option value="property">{locale === 'es-ES' ? 'Listar Mi Propiedad' : 'List My Property'}</option>
                    <option value="support">{locale === 'es-ES' ? 'Soporte al Huésped' : 'Guest Support'}</option>
                    <option value="other">{locale === 'es-ES' ? 'Otro' : 'Other'}</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-deep-green/70 mb-1">
                    {t.form?.fields?.message || 'Message'} *
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
                    placeholder={locale === 'es-ES' ? 'Cuéntanos cómo podemos ayudarte...' : 'Tell us how we can help you...'}
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
                    locale === 'es-ES' ? 'Enviando...' : 'Sending...'
                  ) : isSubmitted ? (
                    locale === 'es-ES' ? '¡Mensaje Enviado!' : 'Message Sent!'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {locale === 'es-ES' ? 'Enviar Mensaje' : 'Send Message'}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="font-serif text-2xl text-deep-green mb-6">{locale === 'es-ES' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}</h2>
              <div className="space-y-4">
                <div className="bg-sand/10 rounded-lg p-5 border border-sand/20">
                  <h3 className="font-semibold text-deep-green mb-2">{locale === 'es-ES' ? '¿Qué áreas atendemos?' : 'What areas do you service?'}</h3>
                  <p className="text-sm text-deep-green/70">
                    {locale === 'es-ES' ? 'Gestionamos villas de lujo en los destinos más codiciados de Bali, incluyendo Seminyak, Ubud, Canggu, Uluwatu y Sanur.' : "We manage luxury villas across Bali's most sought-after destinations including Seminyak, Ubud, Canggu, Uluwatu, and Sanur."}
                  </p>
                </div>
                <div className="bg-sand/10 rounded-lg p-5 border border-sand/20">
                  <h3 className="font-semibold text-deep-green mb-2">{locale === 'es-ES' ? '¿Qué tan rápido responden a las consultas?' : 'How quickly can you respond to inquiries?'}</h3>
                  <p className="text-sm text-deep-green/70">
                    {locale === 'es-ES' ? 'Nuestro objetivo es responder a todas las consultas dentro de 24 horas. Para asuntos urgentes, contáctanos vía WhatsApp o nuestra línea de emergencia.' : 'We aim to respond to all inquiries within 24 hours. For urgent matters, please contact us via WhatsApp or our emergency hotline.'}
                  </p>
                </div>
                <div className="bg-sand/10 rounded-lg p-5 border border-sand/20">
                  <h3 className="font-semibold text-deep-green mb-2">{locale === 'es-ES' ? '¿Ofrecen servicios de gestión de propiedades?' : 'Do you offer property management services?'}</h3>
                  <p className="text-sm text-deep-green/70">
                    {locale === 'es-ES' ? '¡Sí! Ofrecemos servicios integrales de gestión de propiedades que incluyen marketing, servicios para huéspedes, mantenimiento y optimización de ingresos.' : 'Yes! We provide comprehensive property management services including marketing, guest services, maintenance, and revenue optimization.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  ChevronDown,
  ChevronRight,
  Award,
  Shield,
  CheckCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FooterProps {
  dictionary: any
  locale: string
}

export default function Footer({ dictionary, locale }: FooterProps) {
  const [email, setEmail] = useState('')
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribing(true)
    
    try {
      // TODO: Implement newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubscribeStatus('success')
      setEmail('')
      setTimeout(() => setSubscribeStatus('idle'), 3000)
    } catch (error) {
      setSubscribeStatus('error')
      setTimeout(() => setSubscribeStatus('idle'), 3000)
    } finally {
      setIsSubscribing(false)
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const getLocalePath = (path: string) => {
    return locale === 'en' ? path : `/${locale}${path}`
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-deep-green text-sand-light relative" style={{ zIndex: 2 }}>
      {/* Pre-footer CTA Section */}
      <div className="bg-gradient-to-b from-sand to-sand-light relative" style={{ zIndex: 1 }}>
        <div className="container mx-auto px-4 py-16">
          <div className="relative">
            {/* Glassmorphic Container */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side - Content */}
                <div>
                  <h2 className="font-serif text-3xl md:text-4xl text-deep-green mb-4">
                    {dictionary?.footer?.newsletter?.title || 'Stay Updated'}
                  </h2>
                  <p className="text-deep-green/80 mb-6">
                    {dictionary?.footer?.newsletter?.description || 'Get exclusive property management tips and early access to new villas'}
                  </p>
                  
                  {/* Trust Indicators */}
                  <div className="flex flex-wrap gap-4 text-sm text-deep-green/70">
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-terracotta" />
                      {dictionary?.footer?.newsletter?.features?.noSpam || 'No spam'}
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-terracotta" />
                      {dictionary?.footer?.newsletter?.features?.monthly || 'Monthly updates'}
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-terracotta" />
                      {dictionary?.footer?.newsletter?.features?.unsubscribe || 'Unsubscribe anytime'}
                    </span>
                  </div>
                </div>

                {/* Right Side - Form */}
                <form onSubmit={handleNewsletterSubmit} className="relative">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={dictionary?.footer?.newsletter?.placeholder || 'Enter your email'}
                      className="flex-1 px-6 py-4 bg-white/90 backdrop-blur-sm rounded-full text-deep-green placeholder-deep-green/50 focus:outline-none focus:ring-2 focus:ring-terracotta transition-all"
                      required
                    />
                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="px-8 py-4 bg-terracotta hover:bg-terracotta-dark text-white font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                      {isSubscribing 
                        ? dictionary?.footer?.newsletter?.subscribing || 'Subscribing...'
                        : dictionary?.footer?.newsletter?.subscribe || 'Subscribe'
                      }
                    </button>
                  </div>
                  
                  {/* Status Messages */}
                  <AnimatePresence>
                    {subscribeStatus !== 'idle' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`absolute mt-2 text-sm ${
                          subscribeStatus === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {subscribeStatus === 'success' 
                          ? dictionary?.footer?.newsletter?.success || 'Successfully subscribed!'
                          : dictionary?.footer?.newsletter?.error || 'Something went wrong. Please try again.'
                        }
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-5 gap-8">
          {/* Column 1 - Brand */}
          <div className="col-span-1">
            <Link href={getLocalePath('/')} className="inline-block mb-6">
              <div>
                <span className="font-serif text-3xl font-bold text-sand-light">AURA</span>
                <span className="block text-xs tracking-[0.3em] uppercase text-sand/70 mt-1">
                  {dictionary?.footer?.tagline || 'Villas Bali'}
                </span>
              </div>
            </Link>
            
            <p className="text-sand/80 text-sm mb-6 leading-relaxed">
              {dictionary?.footer?.description || 'Elevating villa management with innovation and authentic Balinese hospitality'}
            </p>

            {/* Social Media */}
            <div className="flex gap-3 mb-6">
              <a 
                href="https://instagram.com/auravillasbali" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sand/10 hover:bg-terracotta rounded-full flex items-center justify-center transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-sand group-hover:text-white" />
              </a>
              <a 
                href="https://facebook.com/auravillasbali" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sand/10 hover:bg-terracotta rounded-full flex items-center justify-center transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-sand group-hover:text-white" />
              </a>
              <a 
                href="https://youtube.com/@auravillasbali" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sand/10 hover:bg-terracotta rounded-full flex items-center justify-center transition-all duration-300 group"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-sand group-hover:text-white" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-sand/10 rounded-lg flex items-center justify-center" title="Verified Business">
                <Shield className="w-5 h-5 text-terracotta" />
              </div>
              <div className="w-10 h-10 bg-sand/10 rounded-lg flex items-center justify-center" title="Award Winner">
                <Award className="w-5 h-5 text-terracotta" />
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-semibold text-sand-light mb-4">
              {dictionary?.footer?.sections?.quickLinks || 'Quick Links'}
            </h3>
            <ul className="space-y-3 text-sand/80">
              <li>
                <Link href={getLocalePath('/villas')} className="hover:text-terracotta transition-colors">
                  {dictionary?.navigation?.villas || 'Villas'}
                </Link>
              </li>
              <li>
                <Link href={getLocalePath('/pricing')} className="hover:text-terracotta transition-colors">
                  {dictionary?.navigation?.pricing || 'Pricing'}
                </Link>
              </li>
              <li>
                <Link href={getLocalePath('/about')} className="hover:text-terracotta transition-colors">
                  {dictionary?.navigation?.about || 'About Us'}
                </Link>
              </li>
              <li>
                <Link href={getLocalePath('/contact')} className="hover:text-terracotta transition-colors">
                  {dictionary?.navigation?.contact || 'Contact'}
                </Link>
              </li>
              <li>
                <button className="hover:text-terracotta transition-colors text-left">
                  {dictionary?.navigation?.buyRent || 'Buy & Rent'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3 className="font-semibold text-sand-light mb-4">
              {dictionary?.footer?.sections?.services || 'Services'}
            </h3>
            <ul className="space-y-3 text-sand/80">
              <li>
                <Link href={getLocalePath('/pricing#operations')} className="hover:text-terracotta transition-colors">
                  {dictionary?.footer?.links?.propertyManagement || 'Property Management'}
                </Link>
              </li>
              <li>
                <Link href={getLocalePath('/pricing#operations')} className="hover:text-terracotta transition-colors">
                  {dictionary?.footer?.links?.villaOperations || 'Villa Operations'}
                </Link>
              </li>
              <li>
                <Link href={getLocalePath('/pricing#marketing')} className="hover:text-terracotta transition-colors">
                  {dictionary?.footer?.links?.marketingServices || 'Marketing Services'}
                </Link>
              </li>
              <li>
                <button className="hover:text-terracotta transition-colors text-left opacity-70 cursor-not-allowed">
                  {dictionary?.footer?.links?.ownerPortal || 'Owner Portal'} 
                  <span className="text-xs ml-2 text-terracotta">({dictionary?.common?.comingSoon || 'Soon'})</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 - Resources */}
          <div>
            <h3 className="font-semibold text-sand-light mb-4">
              {dictionary?.footer?.sections?.resources || 'Resources'}
            </h3>
            <ul className="space-y-3 text-sand/80">
              <li>
                <button className="hover:text-terracotta transition-colors text-left opacity-70 cursor-not-allowed">
                  {dictionary?.footer?.links?.blog || 'Blog'}
                  <span className="text-xs ml-2 text-terracotta">({dictionary?.common?.comingSoon || 'Soon'})</span>
                </button>
              </li>
              <li>
                <Link href={getLocalePath('/faq')} className="hover:text-terracotta transition-colors">
                  {dictionary?.footer?.links?.faq || 'FAQ'}
                </Link>
              </li>
              <li>
                <Link href={getLocalePath('/villa-care-guide')} className="hover:text-terracotta transition-colors">
                  {dictionary?.footer?.links?.villaCareGuide || 'Villa Care Guide'}
                </Link>
              </li>
              <li>
                <Link href={getLocalePath('/bali-travel-tips')} className="hover:text-terracotta transition-colors">
                  {dictionary?.footer?.links?.travelTips || 'Bali Travel Tips'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5 - Contact */}
          <div>
            <h3 className="font-semibold text-sand-light mb-4">
              {dictionary?.footer?.sections?.contact || 'Contact'}
            </h3>
            
            {/* WhatsApp Button */}
            <a 
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '62812345678'}?text=${encodeURIComponent(dictionary?.footer?.whatsappMessage || 'Hi, I need help with villa management')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors mb-4"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>

            <ul className="space-y-3 text-sand/80">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                <div>
                  <a href="mailto:info@auravillasbali.com" className="hover:text-terracotta transition-colors">
                    info@auravillasbali.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                <div>
                  <a href="tel:+62812345678" className="hover:text-terracotta transition-colors">
                    +62 812 345 678
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                <div className="text-sm">
                  {dictionary?.footer?.address?.line1 || 'Jl. Raya Uluwatu'}<br />
                  {dictionary?.footer?.address?.line2 || 'Pecatu, Badung'}<br />
                  {dictionary?.footer?.address?.line3 || 'Bali 80361, Indonesia'}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-terracotta flex-shrink-0 mt-1" />
                <div className="text-sm">
                  {dictionary?.footer?.hours?.weekdays || 'Mon-Fri: 9:00 - 18:00'}<br />
                  {dictionary?.footer?.hours?.weekend || 'Sat-Sun: 10:00 - 16:00'}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Layout - Accordion */}
        <div className="md:hidden">
          {/* Brand Section - Always Visible */}
          <div className="mb-8 pb-8 border-b border-sand/20">
            <Link href={getLocalePath('/')} className="inline-block mb-4">
              <div>
                <span className="font-serif text-3xl font-bold text-sand-light">AURA</span>
                <span className="block text-xs tracking-[0.3em] uppercase text-sand/70 mt-1">
                  {dictionary?.footer?.tagline || 'Villas Bali'}
                </span>
              </div>
            </Link>
            
            <p className="text-sand/80 text-sm mb-4">
              {dictionary?.footer?.description || 'Elevating villa management with innovation and authentic Balinese hospitality'}
            </p>

            {/* Social Media */}
            <div className="flex gap-3">
              <a 
                href="https://instagram.com/auravillasbali" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sand/10 hover:bg-terracotta rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-sand" />
              </a>
              <a 
                href="https://facebook.com/auravillasbali" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sand/10 hover:bg-terracotta rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-sand" />
              </a>
              <a 
                href="https://youtube.com/@auravillasbali" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sand/10 hover:bg-terracotta rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-sand" />
              </a>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4">
            {/* Quick Links */}
            <div className="border-b border-sand/20 pb-4">
              <button
                onClick={() => toggleSection('quickLinks')}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="font-semibold text-sand-light">
                  {dictionary?.footer?.sections?.quickLinks || 'Quick Links'}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 text-sand/70 transition-transform ${
                    expandedSection === 'quickLinks' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {expandedSection === 'quickLinks' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 space-y-3 text-sand/80">
                      <li>
                        <Link href={getLocalePath('/villas')} className="hover:text-terracotta transition-colors">
                          {dictionary?.navigation?.villas || 'Villas'}
                        </Link>
                      </li>
                      <li>
                        <Link href={getLocalePath('/pricing')} className="hover:text-terracotta transition-colors">
                          {dictionary?.navigation?.pricing || 'Pricing'}
                        </Link>
                      </li>
                      <li>
                        <Link href={getLocalePath('/about')} className="hover:text-terracotta transition-colors">
                          {dictionary?.navigation?.about || 'About Us'}
                        </Link>
                      </li>
                      <li>
                        <Link href={getLocalePath('/contact')} className="hover:text-terracotta transition-colors">
                          {dictionary?.navigation?.contact || 'Contact'}
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Services */}
            <div className="border-b border-sand/20 pb-4">
              <button
                onClick={() => toggleSection('services')}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="font-semibold text-sand-light">
                  {dictionary?.footer?.sections?.services || 'Services'}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 text-sand/70 transition-transform ${
                    expandedSection === 'services' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {expandedSection === 'services' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 space-y-3 text-sand/80">
                      <li>
                        <Link href={getLocalePath('/pricing#operations')} className="hover:text-terracotta transition-colors">
                          {dictionary?.footer?.links?.propertyManagement || 'Property Management'}
                        </Link>
                      </li>
                      <li>
                        <Link href={getLocalePath('/pricing#operations')} className="hover:text-terracotta transition-colors">
                          {dictionary?.footer?.links?.villaOperations || 'Villa Operations'}
                        </Link>
                      </li>
                      <li>
                        <Link href={getLocalePath('/pricing#marketing')} className="hover:text-terracotta transition-colors">
                          {dictionary?.footer?.links?.marketingServices || 'Marketing Services'}
                        </Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact - Always Expanded on Mobile */}
            <div className="pt-4">
              <h3 className="font-semibold text-sand-light mb-4">
                {dictionary?.footer?.sections?.contact || 'Contact'}
              </h3>
              
              {/* WhatsApp Button */}
              <a 
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '62812345678'}?text=${encodeURIComponent(dictionary?.footer?.whatsappMessage || 'Hi, I need help with villa management')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors mb-4"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>

              <ul className="space-y-3 text-sand/80 text-sm">
                <li>
                  <a href="mailto:info@auravillasbali.com" className="hover:text-terracotta transition-colors">
                    info@auravillasbali.com
                  </a>
                </li>
                <li>
                  <a href="tel:+62812345678" className="hover:text-terracotta transition-colors">
                    +62 812 345 678
                  </a>
                </li>
                <li>
                  {dictionary?.footer?.address?.line1 || 'Jl. Raya Uluwatu'}, {dictionary?.footer?.address?.line2 || 'Pecatu'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sand/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sand/70">
            <div className="text-center md:text-left">
              © {currentYear} AURA Villas Bali. {dictionary?.footer?.copyright || 'All rights reserved.'}
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link href={getLocalePath('/privacy')} className="hover:text-terracotta transition-colors">
                {dictionary?.footer?.legal?.privacy || 'Privacy Policy'}
              </Link>
              <Link href={getLocalePath('/terms')} className="hover:text-terracotta transition-colors">
                {dictionary?.footer?.legal?.terms || 'Terms of Service'}
              </Link>
              <Link href={getLocalePath('/cookies')} className="hover:text-terracotta transition-colors">
                {dictionary?.footer?.legal?.cookies || 'Cookie Policy'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
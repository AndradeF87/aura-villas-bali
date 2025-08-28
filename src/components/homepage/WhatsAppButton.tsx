'use client'

import { MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/contexts/TranslationContext'

export function WhatsAppButton() {
  const { dictionary } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+628123456789'
  const defaultMessage = dictionary?.whatsappButton?.defaultMessage || 'Hi AURA team, I\'m interested in your villa rental services in Bali.'

  useEffect(() => {
    // Show button after scrolling down 100px
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(defaultMessage)
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 group ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {dictionary?.whatsappButton?.tooltip || 'Chat with us on WhatsApp'}
      </span>
    </button>
  )
}
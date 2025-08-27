'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  faqs: FAQ[]
  className?: string
}

export function FAQSection({ 
  title = 'Frequently Asked Questions', 
  faqs, 
  className = '' 
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className={`py-12 ${className}`}>
      <h2 className="font-serif text-3xl text-deep-green text-center mb-8">
        {title}
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-sand"
          >
            <button
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-sand-light/30 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              <h3 className="font-medium text-deep-green pr-4">
                {faq.question}
              </h3>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-terracotta flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-terracotta flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-deep-green/80 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// Generate FAQ Schema for SEO
export function generateFAQSchema(faqs: FAQ[], baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// Predefined FAQs for different pages
export const pageFAQs = {
  homepage: [
    {
      question: 'What makes AURA Villas different from other villa management companies in Bali?',
      answer: 'AURA Villas combines boutique hospitality with innovative technology, offering personalized service, AI-powered pricing optimization, and a proven track record of 95% occupancy rates. We manage only select properties to ensure quality over quantity.'
    },
    {
      question: 'How many villas does AURA manage in Bali?',
      answer: 'We currently manage over 100 carefully selected luxury villas across Seminyak, Ubud, Canggu, and Uluwatu. Each property is chosen for its unique character and potential to deliver exceptional guest experiences.'
    },
    {
      question: 'What services does AURA Villas provide for property owners?',
      answer: 'We offer comprehensive villa management including 24/7 guest support, professional marketing, dynamic pricing optimization, maintenance coordination, and transparent financial reporting. Our commission ranges from 15-23% depending on the service package.'
    }
  ],
  villas: [
    {
      question: 'How do I book a villa with AURA?',
      answer: 'You can contact us directly through our website contact form, WhatsApp at +62 812 3456 7890, or email info@auravillasbali.com. Our team will help you find the perfect villa and arrange your booking.'
    },
    {
      question: 'What amenities are included in AURA villas?',
      answer: 'Most AURA villas include private pools, fully equipped kitchens, WiFi, air conditioning, daily housekeeping, and 24/7 support. Specific amenities vary by property and are listed in each villa description.'
    },
    {
      question: 'Do you offer airport transfers?',
      answer: 'Yes, we can arrange airport transfers for all our villa guests. This service can be booked in advance or upon arrival. Many of our premium villas include complimentary airport transfers.'
    }
  ],
  pricing: [
    {
      question: 'What is the commission rate for villa management?',
      answer: 'Our commission rates range from 15-23% of revenue, depending on the service package you choose. The Boutique Collection (invitation only) is 15%, Professional Package (2-4 properties) is 20%, and Essential Package (1 property) is 23%.'
    },
    {
      question: 'Are there any hidden fees or additional charges?',
      answer: 'No, our pricing is completely transparent. The commission rate covers all standard management services. Any additional services like major renovations or special marketing campaigns are discussed and approved with you beforehand.'
    },
    {
      question: 'How and when do property owners receive payments?',
      answer: 'Property owners receive monthly statements and payments. Funds are transferred directly to your account by the 15th of each month for the previous month earnings. You have 24/7 access to our owner portal for real-time financial tracking.'
    }
  ]
}
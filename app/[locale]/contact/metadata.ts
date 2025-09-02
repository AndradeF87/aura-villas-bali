import { Metadata } from 'next'

export const contactMetadata: Metadata = {
  title: 'Contact AURA Villas | Get in Touch for Villa Management Services',
  description: 'Contact AURA Villas Bali for professional villa management services. WhatsApp: +62 812 3456 7890. Email: hello@auravillasbali.com. Offices in Seminyak, Ubud, and Canggu.',
  keywords: 'contact AURA Villas, Bali villa management contact, property management inquiry, villa services contact, Seminyak office, Ubud office',
  alternates: {
    canonical: 'https://auravillasbali.com/contact',
  },
  openGraph: {
    title: 'Contact AURA Villas | Villa Management Services in Bali',
    description: 'Get in touch with AURA Villas for professional villa management. Quick response guaranteed. WhatsApp: +62 812 3456 7890',
    url: 'https://auravillasbali.com/contact',
    siteName: 'AURA Villas Bali',
    images: [
      {
        url: 'https://auravillasbali.com/images/contact-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact AURA Villas Bali',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact AURA Villas | Get Started Today',
    description: 'Professional villa management in Bali. WhatsApp: +62 812 3456 7890',
    images: ['https://auravillasbali.com/images/contact-hero.jpg'],
  },
}

// Schema markup for Contact page
export const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://auravillasbali.com/contact/#contactpage',
  name: 'Contact AURA Villas Bali',
  description: 'Get in touch with AURA Villas for professional villa management services in Bali',
  url: 'https://auravillasbali.com/contact',
  mainEntity: {
    '@type': 'Organization',
    '@id': 'https://auravillasbali.com/#organization',
    name: 'AURA Villas Bali',
    url: 'https://auravillasbali.com',
    logo: 'https://auravillasbali.com/logo.png',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+62-812-3456-7890',
        contactType: 'customer service',
        availableLanguage: ['en', 'id'],
        areaServed: 'ID',
        contactOption: ['TollFree', 'HearingImpairedSupported'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday'
          ],
          opens: '00:00',
          closes: '23:59'
        }
      },
      {
        '@type': 'ContactPoint',
        email: 'hello@auravillasbali.com',
        contactType: 'customer support',
        availableLanguage: ['en', 'id']
      },
      {
        '@type': 'ContactPoint',
        telephone: '+62-361-123456',
        contactType: 'sales',
        availableLanguage: ['en', 'id'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00'
        }
      }
    ],
    location: [
      {
        '@type': 'Place',
        name: 'AURA Villas Seminyak Office',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Jl. Raya Seminyak No. 88',
          addressLocality: 'Seminyak',
          addressRegion: 'Bali',
          postalCode: '80361',
          addressCountry: 'ID'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -8.6895,
          longitude: 115.1688
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00'
        }
      },
      {
        '@type': 'Place',
        name: 'AURA Villas Ubud Office',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ubud',
          addressRegion: 'Bali',
          addressCountry: 'ID'
        }
      },
      {
        '@type': 'Place',
        name: 'AURA Villas Canggu Office',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Canggu',
          addressRegion: 'Bali',
          addressCountry: 'ID'
        }
      }
    ],
    sameAs: [
      'https://www.facebook.com/auravillasbali',
      'https://www.instagram.com/auravillasbali',
      'https://wa.me/6281234567890'
    ]
  }
}
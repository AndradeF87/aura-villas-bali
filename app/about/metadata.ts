import { Metadata } from 'next'

export const aboutMetadata: Metadata = {
  title: 'About AURA Villas | Boutique Villa Management in Bali Since 2018',
  description: 'Learn about AURA Villas - Bali\'s premier boutique villa management company. Founded in 2018, we combine traditional Balinese hospitality with innovative AI technology to manage 100+ luxury villas.',
  keywords: 'AURA Villas Bali, villa management company, boutique hospitality, Bali property management, luxury villa services, about us',
  alternates: {
    canonical: 'https://auravillasbali.com/about',
  },
  openGraph: {
    title: 'About AURA Villas | Your Trusted Villa Management Partner in Bali',
    description: 'Discover the story behind AURA Villas - from 5 boutique villas in 2018 to managing 100+ properties across Bali with 95% occupancy rates.',
    url: 'https://auravillasbali.com/about',
    siteName: 'AURA Villas Bali',
    images: [
      {
        url: 'https://auravillasbali.com/images/about-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'AURA Villas Team and Properties',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About AURA Villas | Boutique Villa Management Bali',
    description: 'Your trusted partner for luxury villa management in Bali since 2018',
    images: ['https://auravillasbali.com/images/about-hero.jpg'],
  },
}

// Schema markup for About page
export const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://auravillasbali.com/about/#aboutpage',
  mainEntity: {
    '@type': 'Organization',
    '@id': 'https://auravillasbali.com/#organization',
    name: 'AURA Villas Bali',
    alternateName: 'AURA Villa Management',
    description: 'Bali\'s premier boutique villa management company, combining traditional Balinese hospitality with innovative AI technology.',
    url: 'https://auravillasbali.com',
    logo: 'https://auravillasbali.com/logo.png',
    image: 'https://auravillasbali.com/images/about-hero.jpg',
    foundingDate: '2018',
    founder: [
      {
        '@type': 'Person',
        name: 'Kadek Sutrisna',
        jobTitle: 'Co-Founder & CEO'
      }
    ],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
      maxValue: 100
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Raya Seminyak No. 88',
      addressLocality: 'Seminyak',
      addressRegion: 'Bali',
      postalCode: '80361',
      addressCountry: 'ID'
    },
    areaServed: [
      {
        '@type': 'Place',
        name: 'Seminyak'
      },
      {
        '@type': 'Place',
        name: 'Ubud'
      },
      {
        '@type': 'Place',
        name: 'Canggu'
      },
      {
        '@type': 'Place',
        name: 'Uluwatu'
      }
    ],
    award: [
      'Bali Tourism Excellence Award 2023',
      'Best Villa Management Company 2024'
    ],
    slogan: 'Creating Good Memories',
    knowsAbout: [
      'Villa Management',
      'Property Management',
      'Hospitality',
      'Revenue Optimization',
      'Guest Services',
      'AI Technology'
    ],
    sameAs: [
      'https://www.facebook.com/auravillasbali',
      'https://www.instagram.com/auravillasbali',
      'https://www.youtube.com/@auravillasbali'
    ]
  }
}
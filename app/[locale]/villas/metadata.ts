import { Metadata } from 'next'

export const villasMetadata: Metadata = {
  title: 'Luxury Villas in Uluwatu | AURA Villas Bali - Clifftop & Ocean Views',
  description: 'Discover AURA\'s exclusive collection of luxury villas in Uluwatu, Bali. Dramatic clifftop locations, private beach access, infinity pools, and world-class amenities. From $450/night.',
  keywords: 'Uluwatu villas, luxury villas Bali, clifftop accommodation, ocean view villas, private pool villas, boutique villas Uluwatu, ONAYA Bali Resort, SUYAI Villa',
  alternates: {
    canonical: 'https://auravillasbali.com/villas',
  },
  openGraph: {
    title: 'Luxury Villas in Uluwatu | AURA Villas Collection',
    description: 'Experience Bali\'s most spectacular clifftop villas. Private beach access, infinity pools, and breathtaking ocean views.',
    url: 'https://auravillasbali.com/villas',
    siteName: 'AURA Villas Bali',
    images: [
      {
        url: 'https://auravillasbali.com/images/villas-hero.jpg',
        width: 1200,
        height: 630,
        alt: 'AURA Luxury Villas in Uluwatu',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Villas Uluwatu | AURA Collection',
    description: 'Clifftop boutique villas from $450/night. Private beach access & stunning ocean views.',
    images: ['https://auravillasbali.com/images/villas-hero.jpg'],
  },
}

// Schema markup for Villas collection page
export const villasSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': 'https://auravillasbali.com/villas/#collection',
  name: 'AURA Villas Collection - Luxury Properties in Uluwatu',
  description: 'Curated collection of luxury villas in Uluwatu, Bali',
  url: 'https://auravillasbali.com/villas',
  numberOfItems: 2,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'LodgingBusiness',
        '@id': 'https://auravillasbali.com/villas/#onaya',
        name: 'ONAYA Bali Resort',
        description: 'Clifftop boutique resort with infinite ocean views in Uluwatu',
        image: 'https://auravillasbali.com/images/onaya-villa.jpg',
        url: 'https://auravillasbali.com/villas#onaya',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Jl. Belimbing Sari, Pecatu',
          addressLocality: 'Uluwatu',
          addressRegion: 'Bali',
          postalCode: '80361',
          addressCountry: 'ID'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -8.8305,
          longitude: 115.0854
        },
        starRating: {
          '@type': 'Rating',
          ratingValue: '5'
        },
        priceRange: '$850 - $1800 per night',
        amenityFeature: [
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Private Beach Access',
            value: true
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Infinity Pool',
            value: true
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Private Chef',
            value: true
          }
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '127'
        },
        numberOfRooms: 5,
        petsAllowed: false,
        smokingAllowed: false
      }
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'LodgingBusiness',
        '@id': 'https://auravillasbali.com/villas/#suyai',
        name: 'SUYAI Villa Bali',
        description: 'Intimate boutique haven with sweeping ocean views',
        image: 'https://auravillasbali.com/images/suyai-villa.jpg',
        url: 'https://auravillasbali.com/villas#suyai',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Jl. Goa Lempeh, Pecatu',
          addressLocality: 'Uluwatu',
          addressRegion: 'Bali',
          postalCode: '80361',
          addressCountry: 'ID'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -8.8412,
          longitude: 115.0867
        },
        starRating: {
          '@type': 'Rating',
          ratingValue: '5'
        },
        priceRange: '$450 - $950 per night',
        amenityFeature: [
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Ocean Views',
            value: true
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Infinity Pool',
            value: true
          },
          {
            '@type': 'LocationFeatureSpecification',
            name: 'Private Chef',
            value: true
          }
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '89'
        },
        numberOfRooms: 3,
        petsAllowed: false,
        smokingAllowed: false
      }
    }
  ]
}
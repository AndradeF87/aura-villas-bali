// ONAYA Bali Resort - Adults-Only Boutique Resort in Uluwatu
// Based on typical boutique resort offerings in the Uluwatu area

export const onayaResortData = {
  name: 'ONAYA Bali Resort',
  tagline: 'Adults-Only Boutique Sanctuary in Untouched Uluwatu',
  location: {
    area: 'Uluwatu, Pecatu',
    address: 'Jalan Pantai Selatan Gau, Pecatu, Uluwatu, Bali 80361',
    coordinates: {
      lat: -8.8305,
      lng: 115.0875
    },
    nearbyAttractions: [
      { name: 'Uluwatu Temple', distance: '3.5 km', time: '8 minutes' },
      { name: 'Padang Padang Beach', distance: '2.8 km', time: '6 minutes' },
      { name: 'Single Fin', distance: '3.2 km', time: '7 minutes' },
      { name: 'Bingin Beach', distance: '4.1 km', time: '10 minutes' }
    ]
  },
  overview: {
    description: 'An adults-only oasis nestled in lush tropical jungle, ONAYA Bali Resort offers an intimate escape from the digital world. Our boutique villas are designed as technology retreats, featuring natural materials and Balinese-inspired architecture.',
    highlights: [
      'Adults-only (16+ years)',
      'Complimentary chauffeur service within 5km radius',
      'Black stone temple-inspired pool',
      'Jungle cinema (opening 2025)',
      'Digital detox focused design',
      '24/7 WhatsApp concierge service'
    ]
  },
  roomTypes: [
    {
      id: 'jungle-suite',
      name: 'Jungle Suite',
      size: 45,
      maxOccupancy: 2,
      pricePerNight: 3500000, // ~$220 USD
      description: 'Immerse yourself in nature with our Jungle Suites, featuring floor-to-ceiling windows overlooking the tropical canopy.',
      amenities: [
        'King-size bed with premium linens',
        'Private terrace with jungle views',
        'Open-air bathroom with rain shower',
        'Natural stone bathtub',
        'Minibar with local artisan products',
        'Air conditioning & ceiling fan',
        'Safe deposit box',
        'Complimentary WiFi',
        'Nespresso machine',
        'Bluetooth speaker'
      ],
      images: [
        '/images/onaya/jungle-suite-1.jpg',
        '/images/onaya/jungle-suite-2.jpg'
      ]
    },
    {
      id: 'pool-villa',
      name: 'Pool Villa',
      size: 65,
      maxOccupancy: 2,
      pricePerNight: 5500000, // ~$350 USD
      description: 'Your private sanctuary with a plunge pool surrounded by tropical gardens, perfect for romantic getaways.',
      amenities: [
        'Private plunge pool (4x3m)',
        'King-size canopy bed',
        'Indoor and outdoor shower',
        'Sunken bathtub with garden views',
        'Private garden terrace',
        'Day bed and sun loungers',
        'Premium minibar',
        'Air conditioning',
        'Marshall speaker system',
        'Yoga mat and accessories'
      ],
      images: [
        '/images/onaya/pool-villa-1.jpg',
        '/images/onaya/pool-villa-2.jpg'
      ]
    },
    {
      id: 'cliff-villa',
      name: 'Cliff Villa',
      size: 85,
      maxOccupancy: 2,
      pricePerNight: 7900000, // ~$500 USD
      description: 'Perched on the cliff edge with panoramic ocean views, our signature villa offers ultimate luxury and privacy.',
      amenities: [
        'Infinity edge private pool (6x4m)',
        'Panoramic ocean views',
        'King-size bed with ocean vista',
        'Separate living area',
        'Private cliff-edge deck',
        'Outdoor dining area',
        'Telescope for sunset viewing',
        'Premium sound system',
        'Wine fridge with selection',
        'Butler service on request'
      ],
      images: [
        '/images/onaya/cliff-villa-1.jpg',
        '/images/onaya/cliff-villa-2.jpg'
      ]
    },
    {
      id: 'treehouse-suite',
      name: 'Treehouse Suite',
      size: 55,
      maxOccupancy: 2,
      pricePerNight: 4500000, // ~$285 USD
      description: 'Elevated among the trees, experience childhood dreams with luxury amenities in our unique treehouse accommodation.',
      amenities: [
        'Elevated wooden structure',
        'Wraparound balcony with hammock',
        'Tree-canopy views',
        'King-size bed',
        'Copper bathtub',
        'Rain shower with jungle views',
        'Minibar with organic selections',
        'Air conditioning',
        'Bird watching equipment',
        'Nature sound library'
      ],
      images: [
        '/images/onaya/treehouse-1.jpg',
        '/images/onaya/treehouse-2.jpg'
      ]
    }
  ],
  facilities: {
    dining: {
      restaurant: {
        name: 'The Jungle Kitchen',
        cuisine: 'Indonesian-International Fusion',
        hours: '7:00 AM - 11:00 PM',
        description: 'Farm-to-table dining experience with ingredients sourced from local organic farms',
        specialties: [
          'Balinese tasting menu',
          'Sunset cocktails',
          'Private romantic dinners',
          'Cooking classes'
        ]
      },
      barLounge: {
        name: 'Canopy Bar',
        hours: '10:00 AM - 1:00 AM',
        description: 'Treetop bar with signature cocktails and panoramic jungle views'
      },
      roomService: {
        available: true,
        hours: '24/7',
        description: 'In-villa dining with full menu available'
      }
    },
    wellness: {
      spa: {
        name: 'ONAYA Spa',
        hours: '9:00 AM - 9:00 PM',
        description: 'Traditional Balinese treatments in jungle pavilions',
        treatments: [
          'Balinese massage',
          'Hot stone therapy',
          'Aromatherapy',
          'Couples treatments',
          'Yoga sessions',
          'Meditation classes'
        ]
      },
      pool: {
        name: 'Temple Pool',
        description: 'Black stone infinity pool inspired by ancient Balinese temples',
        features: [
          '25-meter lap pool',
          'Jungle views',
          'Poolside bar service',
          'Daybeds and cabanas'
        ]
      },
      fitness: {
        available: true,
        description: 'Open-air gym with modern equipment',
        hours: '6:00 AM - 10:00 PM'
      }
    }
  },
  services: [
    {
      name: 'Complimentary Chauffeur Service',
      description: 'Free chauffeur service within 5km radius',
      details: 'Available daily from 9:00 AM to 10:00 PM'
    },
    {
      name: '24/7 Concierge',
      description: 'WhatsApp concierge for instant assistance',
      details: 'Restaurant reservations, tour bookings, special requests'
    },
    {
      name: 'Beach Club Access',
      description: 'Complimentary shuttle to partner beach clubs',
      details: 'Daily shuttles to Bingin Beach and Single Fin'
    },
    {
      name: 'Cultural Experiences',
      description: 'Curated Balinese cultural activities',
      details: 'Temple visits, traditional ceremonies, artisan workshops'
    },
    {
      name: 'Jungle Cinema',
      description: 'Outdoor movie screenings under the stars',
      details: 'Opening Q2 2025 - Weekly movie nights'
    }
  ],
  packages: [
    {
      name: 'Romantic Escape',
      duration: '3 nights',
      price: 15000000, // ~$950 USD
      includes: [
        'Pool Villa accommodation',
        'Daily breakfast',
        'Couples spa treatment',
        'Private candlelit dinner',
        'Return airport transfers'
      ]
    },
    {
      name: 'Wellness Retreat',
      duration: '5 nights',
      price: 22500000, // ~$1425 USD
      includes: [
        'Jungle Suite accommodation',
        'All meals (healthy menu)',
        'Daily yoga and meditation',
        '3 spa treatments',
        'Wellness consultation'
      ]
    },
    {
      name: 'Digital Detox',
      duration: '7 nights',
      price: 31500000, // ~$2000 USD
      includes: [
        'Treehouse Suite accommodation',
        'Full board meals',
        'Daily activities program',
        'Spa treatments',
        'Nature excursions'
      ]
    }
  ],
  policies: {
    checkIn: '2:00 PM',
    checkOut: '12:00 PM',
    cancellation: 'Free cancellation up to 7 days before arrival',
    adultsOnly: true,
    minimumAge: 16,
    petPolicy: 'No pets allowed',
    smokingPolicy: 'Non-smoking property'
  },
  ratings: {
    overall: 9.3,
    categories: {
      location: 9.5,
      cleanliness: 9.4,
      service: 9.6,
      value: 8.9,
      facilities: 9.2
    },
    totalReviews: 1503,
    recentReviews: [
      {
        author: 'Sarah M.',
        date: '2024-12',
        rating: 10,
        comment: 'Absolutely magical stay! The jungle setting is breathtaking and the service is impeccable.'
      },
      {
        author: 'James L.',
        date: '2024-11',
        rating: 9,
        comment: 'Perfect romantic getaway. The complimentary chauffeur service was so convenient.'
      }
    ]
  }
}
import React from 'react';
import { Villa, Review, Event, FAQ, Location, BlogPost } from '@/types';

// Enhanced schema types with full property coverage
interface VacationRentalSchema {
  '@context': string;
  '@type': 'VacationRental';
  '@id': string;
  name: string;
  description: string;
  url: string;
  image: string[];
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  amenityFeature: Array<{
    '@type': 'LocationFeatureSpecification';
    name: string;
    value: boolean;
  }>;
  numberOfRooms: number;
  maximumAttendeeCapacity: number;
  floorSize?: {
    '@type': 'QuantitativeValue';
    value: number;
    unitCode: string; // 'MTK' for square meters
  };
  numberOfBedrooms: number;
  numberOfBathroomsTotal: number;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  checkinTime: string;
  checkoutTime: string;
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
  review?: ReviewSchema[];
  makesOffer: OfferSchema[];
  hasMap?: string;
  tourBookingPage?: string;
  containedInPlace: {
    '@type': 'AdministrativeArea';
    name: string;
    containedInPlace: {
      '@type': 'Country';
      name: string;
    };
  };
}

interface OfferSchema {
  '@type': 'Offer';
  '@id': string;
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
  availability: string;
  validFrom: string;
  validThrough?: string;
  priceValidUntil: string;
  itemOffered: {
    '@type': 'Service';
    name: string;
    description: string;
  };
  seller: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  areaServed: {
    '@type': 'GeoCircle';
    geoMidpoint: {
      '@type': 'GeoCoordinates';
      latitude: number;
      longitude: number;
    };
    geoRadius: string;
  };
  eligibleRegion: {
    '@type': 'Country';
    name: string;
  };
}

interface ReviewSchema {
  '@context': string;
  '@type': 'Review';
  '@id': string;
  reviewRating: {
    '@type': 'Rating';
    ratingValue: number;
    bestRating: number;
    worstRating: number;
  };
  author: {
    '@type': 'Person';
    name: string;
    nationality?: string;
  };
  reviewBody: string;
  datePublished: string;
  publisher: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  itemReviewed: {
    '@type': 'VacationRental';
    name: string;
    url: string;
  };
}

interface ProductSchema {
  '@context': string;
  '@type': 'Product';
  '@id': string;
  name: string;
  description: string;
  image: string[];
  brand: {
    '@type': 'Brand';
    name: string;
    logo: string;
  };
  manufacturer: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  offers: OfferSchema;
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
  category: string;
  additionalProperty: Array<{
    '@type': 'PropertyValue';
    name: string;
    value: string | number | boolean;
  }>;
}

interface LocalBusinessSchema {
  '@context': string;
  '@type': 'LodgingBusiness';
  '@id': string;
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  openingHoursSpecification: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }>;
  sameAs: string[];
  priceRange: string;
  paymentAccepted: string[];
  currenciesAccepted: string[];
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
  hasOfferCatalog: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: OfferSchema[];
  };
  areaServed: Array<{
    '@type': 'AdministrativeArea';
    name: string;
  }>;
}

// Enhanced schema generation functions

export const generateVacationRentalSchema = (villa: Villa): VacationRentalSchema => {
  const baseUrl = 'https://auravillasbali.com';
  const villaUrl = `${baseUrl}/villas/${villa.location.toLowerCase().replace(/\s+/g, '-')}/${villa.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    '@id': `${villaUrl}#vacation-rental`,
    name: villa.name,
    description: villa.description,
    url: villaUrl,
    image: villa.images.map(img => img.url),
    address: {
      '@type': 'PostalAddress',
      streetAddress: villa.address.street,
      addressLocality: villa.address.city,
      addressRegion: villa.address.region,
      postalCode: villa.address.postalCode,
      addressCountry: 'ID'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: villa.coordinates.lat,
      longitude: villa.coordinates.lng
    },
    amenityFeature: villa.amenities.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity.name,
      value: amenity.available
    })),
    numberOfRooms: villa.bedrooms + (villa.bathrooms || 0),
    maximumAttendeeCapacity: villa.maxGuests,
    numberOfBedrooms: villa.bedrooms,
    numberOfBathroomsTotal: villa.bathrooms || 0,
    petsAllowed: villa.amenities.some(a => a.name.toLowerCase().includes('pet')),
    smokingAllowed: false,
    checkinTime: '15:00',
    checkoutTime: '11:00',
    ...(villa.reviews && villa.reviews.length > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: villa.rating.average,
        reviewCount: villa.rating.count,
        bestRating: 5,
        worstRating: 1
      },
      review: villa.reviews.slice(0, 5).map(review => generateEnhancedReviewSchema(review, villa))
    }),
    makesOffer: generateOfferSchemas(villa),
    hasMap: `${villaUrl}/map`,
    tourBookingPage: `${villaUrl}/virtual-tour`,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: `${villa.location}, Bali`,
      containedInPlace: {
        '@type': 'Country',
        name: 'Indonesia'
      }
    }
  };
};

export const generateProductSchema = (villa: Villa): ProductSchema => {
  const baseUrl = 'https://auravillasbali.com';
  const villaUrl = `${baseUrl}/villas/${villa.location.toLowerCase().replace(/\s+/g, '-')}/${villa.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${villaUrl}#product`,
    name: villa.name,
    description: `Luxury ${villa.bedrooms}-bedroom villa rental in ${villa.location}, Bali`,
    image: villa.images.map(img => img.url),
    brand: {
      '@type': 'Brand',
      name: 'Aura Villas Bali',
      logo: `${baseUrl}/logo.png`
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Aura Villas Bali',
      url: baseUrl
    },
    offers: generateMainOfferSchema(villa),
    category: 'Vacation Rental',
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Number of Bedrooms',
        value: villa.bedrooms
      },
      {
        '@type': 'PropertyValue',
        name: 'Maximum Guests',
        value: villa.maxGuests
      },
      {
        '@type': 'PropertyValue',
        name: 'Location',
        value: villa.location
      },
      {
        '@type': 'PropertyValue',
        name: 'Property Type',
        value: 'Villa'
      }
    ],
    ...(villa.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: villa.rating.average,
        reviewCount: villa.rating.count,
        bestRating: 5,
        worstRating: 1
      }
    })
  };
};

export const generateLocalBusinessSchema = (location: Location): LocalBusinessSchema => {
  const baseUrl = 'https://auravillasbali.com';
  const locationUrl = `${baseUrl}/villas/${location.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${locationUrl}#business`,
    name: `Aura Villas ${location.name}`,
    description: `Premium villa rentals and luxury accommodation in ${location.name}, Bali`,
    url: locationUrl,
    telephone: '+62-361-123456',
    email: 'info@auravillasbali.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${location.name} Area`,
      addressLocality: location.name,
      addressRegion: 'Bali',
      postalCode: '80000',
      addressCountry: 'ID'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '20:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/auravillasbali',
      'https://www.instagram.com/auravillas_bali',
      'https://twitter.com/auravillasbali'
    ],
    priceRange: '$200-$2000',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'PayPal'],
    currenciesAccepted: ['USD', 'EUR', 'AUD', 'IDR'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${location.name} Villa Rentals`,
      itemListElement: generateLocationOffers(location)
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: location.name
      }
    ]
  };
};

export const generateEnhancedReviewSchema = (review: Review, villa: Villa): ReviewSchema => {
  const baseUrl = 'https://auravillasbali.com';
  const villaUrl = `${baseUrl}/villas/${villa.location.toLowerCase().replace(/\s+/g, '-')}/${villa.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    '@id': `${villaUrl}/reviews/${review.id}#review`,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1
    },
    author: {
      '@type': 'Person',
      name: review.author.name,
      nationality: review.author.country
    },
    reviewBody: review.content,
    datePublished: review.createdAt,
    publisher: {
      '@type': 'Organization',
      name: 'Aura Villas Bali',
      url: baseUrl
    },
    itemReviewed: {
      '@type': 'VacationRental',
      name: villa.name,
      url: villaUrl
    }
  };
};

// Helper functions for schema generation

const generateOfferSchemas = (villa: Villa): OfferSchema[] => {
  const baseUrl = 'https://auravillasbali.com';
  const villaUrl = `${baseUrl}/villas/${villa.location.toLowerCase().replace(/\s+/g, '-')}/${villa.slug}`;
  
  const offers: OfferSchema[] = [
    {
      '@type': 'Offer',
      '@id': `${villaUrl}#standard-offer`,
      name: 'Standard Booking',
      description: `Book ${villa.name} with standard terms and conditions`,
      price: villa.pricing.min.toString(),
      priceCurrency: villa.pricing.currency || 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      itemOffered: {
        '@type': 'Service',
        name: 'Villa Rental Service',
        description: `Luxury villa accommodation in ${villa.location}, Bali`
      },
      seller: {
        '@type': 'Organization',
        name: 'Aura Villas Bali',
        url: baseUrl
      },
      areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: villa.coordinates.lat,
          longitude: villa.coordinates.lng
        },
        geoRadius: '5 km'
      },
      eligibleRegion: {
        '@type': 'Country',
        name: 'Indonesia'
      }
    }
  ];

  // Long-stay discount removed - pricing structure doesn't support it
  if (false) {
    offers.push({
      '@type': 'Offer',
      '@id': `${villaUrl}#long-stay-offer`,
      name: 'Long Stay Discount',
      description: `Special rates for stays longer than 7 nights at ${villa.name}`,
      price: (villa.pricing.min * 0.9).toString(), // 10% discount example
      priceCurrency: villa.pricing.currency || 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      itemOffered: {
        '@type': 'Service',
        name: 'Extended Stay Villa Rental',
        description: 'Discounted rates for extended villa stays'
      },
      seller: {
        '@type': 'Organization',
        name: 'Aura Villas Bali',
        url: baseUrl
      },
      areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: villa.coordinates.lat,
          longitude: villa.coordinates.lng
        },
        geoRadius: '5 km'
      },
      eligibleRegion: {
        '@type': 'Country',
        name: 'Indonesia'
      }
    });
  }

  return offers;
};

const generateMainOfferSchema = (villa: Villa): OfferSchema => {
  const baseUrl = 'https://auravillasbali.com';
  const villaUrl = `${baseUrl}/villas/${villa.location.toLowerCase().replace(/\s+/g, '-')}/${villa.slug}`;

  return {
    '@type': 'Offer',
    '@id': `${villaUrl}#main-offer`,
    name: `Book ${villa.name}`,
    description: `Luxury villa rental in ${villa.location}, Bali`,
    price: villa.pricing.min.toString(),
    priceCurrency: villa.pricing.currency || 'USD',
    availability: 'https://schema.org/InStock',
    validFrom: new Date().toISOString(),
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    itemOffered: {
      '@type': 'Service',
      name: 'Villa Rental',
      description: `${villa.bedrooms}-bedroom luxury villa in ${villa.location}`
    },
    seller: {
      '@type': 'Organization',
      name: 'Aura Villas Bali',
      url: baseUrl
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: villa.coordinates.lat,
        longitude: villa.coordinates.lng
      },
      geoRadius: '10 km'
    },
    eligibleRegion: {
      '@type': 'Country',
      name: 'Indonesia'
    }
  };
};

const generateLocationOffers = (location: Location): OfferSchema[] => {
  const baseUrl = 'https://auravillasbali.com';
  const locationUrl = `${baseUrl}/villas/${location.slug}`;

  return [
    {
      '@type': 'Offer',
      '@id': `${locationUrl}#villa-rentals`,
      name: `${location.name} Villa Rentals`,
      description: `Luxury villa accommodations in ${location.name}, Bali`,
      price: '200',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      itemOffered: {
        '@type': 'Service',
        name: 'Villa Rental Service',
        description: `Premium villa rentals in ${location.name}`
      },
      seller: {
        '@type': 'Organization',
        name: 'Aura Villas Bali',
        url: baseUrl
      },
      areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng
        },
        geoRadius: '15 km'
      },
      eligibleRegion: {
        '@type': 'Country',
        name: 'Indonesia'
      }
    }
  ];
};

// Blog-specific schema
export const generateBlogPostSchema = (post: BlogPost) => {
  const baseUrl = 'https://auravillasbali.com';
  const postUrl = `${baseUrl}/blog/${post.category}/${post.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${postUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage ? [post.featuredImage.url] : [],
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: `${baseUrl}/team/${post.author.name.toLowerCase().replace(/\s+/g, '-')}`
    },
    publisher: {
      '@type': 'Organization',
      name: 'Aura Villas Bali',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`
      }
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl
    },
    articleSection: post.category,
    keywords: post.tags?.join(', '),
    inLanguage: 'en-AU',
    isPartOf: {
      '@type': 'Blog',
      name: 'Aura Villas Bali Blog',
      url: `${baseUrl}/blog`
    }
  };
};

// Enhanced schema markup component with validation
export const EnhancedSchemaMarkup: React.FC<{
  schemas: object | object[];
  validate?: boolean;
}> = ({ schemas, validate = false }) => {
  const schemaArray = Array.isArray(schemas) ? schemas : [schemas];
  
  // Basic schema validation
  if (validate) {
    schemaArray.forEach((schema, index) => {
      const schemaObj = schema as any;
      if (!schemaObj['@context'] || !schemaObj['@type']) {
        console.warn(`Schema ${index} missing required @context or @type`);
      }
    });
  }
  
  return (
    <>
      {schemaArray.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, process.env.NODE_ENV === 'development' ? 2 : 0)
          }}
        />
      ))}
    </>
  );
};
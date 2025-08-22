import React from 'react';
import { Villa, Review, Event, FAQ } from '@/types';

// Base schema types
interface BaseSchema {
  '@context': string;
  '@type': string;
}

interface LodgingBusinessSchema extends BaseSchema {
  '@type': 'LodgingBusiness';
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
  priceRange: string;
  currenciesAccepted: string[];
  paymentAccepted: string[];
  amenityFeature: Array<{
    '@type': 'LocationFeatureSpecification';
    name: string;
    value: boolean;
  }>;
  numberOfRooms: number;
  maximumAttendeeCapacity: number;
  checkInTime: string;
  checkOutTime: string;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: number;
    reviewCount: number;
    bestRating: number;
    worstRating: number;
  };
  review?: Array<ReviewSchema>;
  image: string[];
  hasOfferCatalog?: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: Array<{
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Service';
        name: string;
        description: string;
      };
      price: string;
      priceCurrency: string;
      availability: string;
    }>;
  };
}

interface ReviewSchema extends BaseSchema {
  '@type': 'Review';
  author: {
    '@type': 'Person';
    name: string;
  };
  reviewRating: {
    '@type': 'Rating';
    ratingValue: number;
    bestRating: number;
    worstRating: number;
  };
  reviewBody: string;
  datePublished: string;
  publisher: {
    '@type': 'Organization';
    name: string;
  };
}

interface EventSchema extends BaseSchema {
  '@type': 'Event';
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    '@type': 'Place';
    name: string;
    address: {
      '@type': 'PostalAddress';
      addressLocality: string;
      addressRegion: string;
      addressCountry: string;
    };
  };
  organizer?: {
    '@type': 'Organization';
    name: string;
    url?: string;
  };
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
  image?: string[];
}

interface FAQSchema extends BaseSchema {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

// Schema generation functions
export const generateLodgingBusinessSchema = (villa: Villa): LodgingBusinessSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: villa.name,
    description: villa.description,
    url: `https://auravillasbali.com/villas/${villa.location.toLowerCase()}/${villa.slug}`,
    telephone: villa.contact.phone,
    email: villa.contact.email,
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
    priceRange: `$${villa.pricing.min}-${villa.pricing.max}`,
    currenciesAccepted: ['USD', 'EUR', 'AUD', 'IDR'],
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
    amenityFeature: villa.amenities.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity.name,
      value: amenity.available
    })),
    numberOfRooms: villa.bedrooms,
    maximumAttendeeCapacity: villa.maxGuests,
    checkInTime: '15:00',
    checkOutTime: '11:00',
    petsAllowed: villa.amenities.some(a => a.name === 'Pet Friendly'),
    smokingAllowed: false,
    image: villa.images.map(img => img.url),
    ...(villa.reviews && villa.reviews.length > 0 && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: villa.rating.average,
        reviewCount: villa.rating.count,
        bestRating: 5,
        worstRating: 1
      },
      review: villa.reviews.slice(0, 5).map(review => generateReviewSchema(review))
    }),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${villa.name} Booking Options`,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Villa Rental',
            description: `Luxurious ${villa.bedrooms}-bedroom villa rental in ${villa.location}, Bali`
          },
          price: villa.pricing.min.toString(),
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        }
      ]
    }
  };
};

export const generateReviewSchema = (review: Review): ReviewSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: review.author.name
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1
    },
    reviewBody: review.content,
    datePublished: review.createdAt,
    publisher: {
      '@type': 'Organization',
      name: 'Aura Villas Bali'
    }
  };
};

export const generateEventSchema = (event: Event): EventSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.location.city,
        addressRegion: event.location.region,
        addressCountry: 'ID'
      }
    },
    ...(event.organizer && {
      organizer: {
        '@type': 'Organization',
        name: event.organizer.name,
        url: event.organizer.website
      }
    }),
    ...(event.pricing && {
      offers: {
        '@type': 'Offer',
        price: event.pricing.price.toString(),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: `https://auravillasbali.com/events/${event.slug}`
      }
    }),
    ...(event.images && { image: event.images.map(img => img.url) })
  };
};

export const generateFAQSchema = (faqs: FAQ[]): FAQSchema => {
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
  };
};

// Organization schema for the business
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Aura Villas Bali',
    description: 'Premium villa rentals and boutique accommodation in Bali, Indonesia',
    url: 'https://auravillasbali.com',
    logo: 'https://auravillasbali.com/logo.png',
    image: 'https://auravillasbali.com/hero-image.jpg',
    telephone: '+62-361-123456',
    email: 'info@auravillasbali.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Raya Seminyak No. 123',
      addressLocality: 'Seminyak',
      addressRegion: 'Bali',
      postalCode: '80361',
      addressCountry: 'ID'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -8.6705,
      longitude: 115.1526
    },
    sameAs: [
      'https://www.facebook.com/auravillasbali',
      'https://www.instagram.com/auravillas_bali',
      'https://twitter.com/auravillasbali'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-361-123456',
      contactType: 'customer service',
      areaServed: ['ID', 'AU', 'US', 'GB'],
      availableLanguage: ['English', 'Indonesian']
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      reviewCount: 156,
      bestRating: 5,
      worstRating: 1
    }
  };
};

// Breadcrumb schema
export const generateBreadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
};

// Utility function to inject schema into HTML
export const injectSchema = (schema: object): string => {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
};

// React component for schema injection
interface SchemaMarkupProps {
  schema: object | object[];
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ schema }) => {
  const schemaArray = Array.isArray(schema) ? schema : [schema];
  
  return (
    <>
      {schemaArray.map((schemaItem, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaItem, null, 2)
          }}
        />
      ))}
    </>
  );
};
import { type Locale } from '@/lib/i18n/config';

interface StructuredDataProps {
  locale: Locale;
  type?: 'organization' | 'website' | 'vacation-rental';
}

export function StructuredData({ locale, type = 'website' }: StructuredDataProps) {
  const baseUrl = 'https://auravillasbali.com';
  const currentUrl = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`;
  
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AURA Villas Bali',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    sameAs: [
      'https://www.instagram.com/auravillasbali',
      'https://www.facebook.com/auravillasbali',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-812-3456-7890',
      contactType: locale === 'es-ES' ? 'servicio al cliente' : 'customer service',
      areaServed: ['ID', 'ES', 'GB', 'US'],
      availableLanguage: ['English', 'Spanish', 'Indonesian'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID',
      addressRegion: 'Bali',
    },
  };

  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AURA Villas Bali',
    description: locale === 'es-ES' 
      ? 'La vida se trata de crear buenos recuerdos. Descubre nuestra exclusiva colección de villas de lujo.'
      : 'Life is all about creating good memories. Discover our exclusive collection of luxury villas.',
    url: currentUrl,
    inLanguage: locale === 'es-ES' ? 'es-ES' : 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'AURA Villas Bali',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${currentUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const vacationRentalData = {
    '@context': 'https://schema.org',
    '@type': 'VacationRental',
    name: 'AURA Villas Bali',
    description: locale === 'es-ES'
      ? 'Villas de lujo en Bali con servicios de gestión profesional'
      : 'Luxury villas in Bali with professional management services',
    url: currentUrl,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ID',
      addressRegion: 'Bali',
      addressLocality: 'Seminyak, Canggu, Uluwatu',
    },
    numberOfRooms: '3-6',
    petsAllowed: false,
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: locale === 'es-ES' ? 'Piscina Privada' : 'Private Pool' },
      { '@type': 'LocationFeatureSpecification', name: locale === 'es-ES' ? 'WiFi Gratis' : 'Free WiFi' },
      { '@type': 'LocationFeatureSpecification', name: locale === 'es-ES' ? 'Aire Acondicionado' : 'Air Conditioning' },
      { '@type': 'LocationFeatureSpecification', name: locale === 'es-ES' ? 'Cocina Completa' : 'Full Kitchen' },
      { '@type': 'LocationFeatureSpecification', name: locale === 'es-ES' ? 'Servicio de Limpieza' : 'Housekeeping' },
    ],
    priceRange: locale === 'es-ES' ? '€€€ - €€€€' : '$$$ - $$$$',
    currenciesAccepted: 'USD, EUR, IDR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    availableLanguage: ['English', 'Spanish', 'Indonesian'],
    checkinTime: '15:00',
    checkoutTime: '11:00',
  };

  let data;
  switch (type) {
    case 'organization':
      data = organizationData;
      break;
    case 'vacation-rental':
      data = vacationRentalData;
      break;
    case 'website':
    default:
      data = websiteData;
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
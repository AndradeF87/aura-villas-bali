export interface VillaData {
  slug: string;
  available: boolean;
  images: string[];
  location: {
    area: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  size: number; // in sqm
  amenities: string[];
  pricing: {
    basePrice: number;
    currency: string;
    cleaningFee: number;
  };
  rating: number;
  reviewCount: number;
}

export const villasData: VillaData[] = [
  {
    slug: 'suyai-villa',
    available: true,
    images: [
      '/images/villas/SUYAIVillaUluwatu/SUYAI-Villa_Pool.webp',
      '/images/Homepage-SUYAI-villa.webp',
      '/images/villas/SUYAIVillaUluwatu/SUYAI-Villa_Pool.webp', // Repeated for gallery demo
      '/images/Homepage-SUYAI-villa.webp', // Repeated for gallery demo
    ],
    location: {
      area: 'Uluwatu',
      coordinates: {
        lat: -8.8295,
        lng: 115.0849,
      },
    },
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    size: 450,
    amenities: [
      'privatePool',
      'oceanView',
      'wifi',
      'airConditioning',
      'fullyEquippedKitchen',
      'dailyHousekeeping',
      'securitySystem',
      'parking',
      'gardenView',
      'beachAccess',
      'bbqArea',
      'outdoorShower',
    ],
    pricing: {
      basePrice: 450,
      currency: 'USD',
      cleaningFee: 50,
    },
    rating: 4.9,
    reviewCount: 127,
  },
  {
    slug: 'onaya-villa',
    available: true,
    images: [
      '/images/villas/ONAYABaliResort/ONAYA_Pool.webp',
      '/images/villas/ONAYABaliResort/ONAYA_Pool.webp', // Repeated for gallery demo
    ],
    location: {
      area: 'Canggu',
      coordinates: {
        lat: -8.6478,
        lng: 115.1385,
      },
    },
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    size: 550,
    amenities: [
      'privatePool',
      'riceFieldView',
      'wifi',
      'airConditioning',
      'fullyEquippedKitchen',
      'dailyHousekeeping',
      'securitySystem',
      'parking',
      'yogaSpace',
      'entertainmentRoom',
      'workSpace',
      'babyEquipment',
    ],
    pricing: {
      basePrice: 550,
      currency: 'USD',
      cleaningFee: 75,
    },
    rating: 4.8,
    reviewCount: 89,
  },
];

export function getVillaBySlug(slug: string): VillaData | undefined {
  return villasData.find(villa => villa.slug === slug);
}

export function getAllVillas(): VillaData[] {
  return villasData;
}
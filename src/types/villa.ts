// Villa and Property Types for AURA Villas Bali

export interface Villa {
  id: string;
  name: string;
  slug: string;
  location: VillaLocation;
  story: string;
  storyTeaser: string;
  images: VillaImage[];
  pricing: VillaPricing;
  amenities: Amenity[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  rating: number;
  reviews: Review[];
  availability: Availability[];
  featured: boolean;
  status: 'active' | 'inactive' | 'maintenance';
  createdAt: string;
  updatedAt: string;
}

export interface VillaLocation {
  area: 'Seminyak' | 'Ubud' | 'Canggu' | 'Uluwatu' | 'Sanur' | 'Nusa Dua';
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  nearbyAttractions: string[];
}

export interface VillaImage {
  id: string;
  url: string;
  alt: string;
  type: 'hero' | 'gallery' | 'room' | 'amenity';
  order: number;
}

export interface VillaPricing {
  basePrice: number;
  currency: 'USD' | 'IDR' | 'AUD';
  seasonalRates?: SeasonalRate[];
  minimumStay: number;
  cleaningFee?: number;
}

export interface SeasonalRate {
  name: string;
  startDate: string;
  endDate: string;
  rate: number;
}

export interface Amenity {
  id: string;
  name: string;
  category: 'essential' | 'luxury' | 'experience';
  icon: string;
}

export interface Review {
  id: string;
  guestName: string;
  guestLocation: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Availability {
  date: string;
  available: boolean;
  price?: number;
}

export interface SearchFilters {
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  amenities?: string[];
  experienceType?: 'family' | 'romance' | 'wellness' | 'adventure';
}

export interface BookingInquiry {
  villaId: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  message?: string;
  specialRequests?: string[];
}
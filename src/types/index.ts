// Core types for the villa rental application

export interface Villa {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  location: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  contact: {
    phone: string;
    email: string;
  };
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  area: number; // in square meters
  pricing: {
    min: number;
    max: number;
    currency: string;
    pricePerNight: {
      low: number;
      mid: number;
      high: number;
    };
  };
  amenities: Amenity[];
  images: VillaImage[];
  reviews?: Review[];
  rating: {
    average: number;
    count: number;
  };
  availability: {
    calendar: AvailabilitySlot[];
    minStay: number;
    maxStay?: number;
  };
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    smoking: boolean;
    pets: boolean;
    parties: boolean;
  };
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  status: 'active' | 'inactive' | 'maintenance';
}

export interface VillaImage {
  id: string;
  url: string;
  alt: string;
  title?: string;
  caption?: string;
  order: number;
  room?: string; // bedroom, bathroom, pool, garden, etc.
  width?: number;
  height?: number;
}

export interface Amenity {
  id: string;
  name: string;
  category: 'interior' | 'exterior' | 'entertainment' | 'services' | 'location';
  icon?: string;
  available: boolean;
  description?: string;
}

export interface Review {
  id: string;
  villaId: string;
  author: {
    name: string;
    email?: string;
    avatar?: string;
    country?: string;
  };
  rating: number;
  title?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  verified: boolean;
  helpful: number;
  response?: {
    content: string;
    author: string;
    createdAt: string;
  };
  tags?: string[];
}

export interface AvailabilitySlot {
  date: string;
  available: boolean;
  price?: number;
  minStay?: number;
  status?: 'available' | 'booked' | 'blocked' | 'maintenance';
}

export interface Location {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  villaCount: number;
  featuredImage?: {
    url: string;
    alt: string;
  };
  attractions: Attraction[];
  restaurants: Restaurant[];
  transport: {
    airport: number; // distance in km
    beach: number;
    center: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Attraction {
  id: string;
  name: string;
  description: string;
  category: 'temple' | 'beach' | 'nature' | 'cultural' | 'adventure' | 'shopping';
  distance: number; // in km
  coordinates?: {
    lat: number;
    lng: number;
  };
  image?: string;
  rating?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  distance: number; // in km
  rating?: number;
  image?: string;
}

export interface Event {
  id: string;
  name: string;
  slug: string;
  description: string;
  startDate: string;
  endDate?: string;
  venue: string;
  location: {
    city: string;
    region: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  category: 'festival' | 'ceremony' | 'cultural' | 'music' | 'art' | 'food' | 'nature';
  images?: VillaImage[];
  organizer?: {
    name: string;
    website?: string;
    contact?: string;
  };
  pricing?: {
    price: number;
    currency: string;
    bookingUrl?: string;
  };
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'payment' | 'policies' | 'amenities' | 'location' | 'general';
  order: number;
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    bio?: string;
    avatar?: string;
  };
  featuredImage?: {
    url: string;
    alt: string;
    caption?: string;
  };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    focusKeyword?: string;
  };
  publishedAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  readingTime: number; // in minutes
  views?: number;
  featured: boolean;
}

export interface Experience {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: 'adventure' | 'cultural' | 'culinary' | 'wellness' | 'nature' | 'romantic';
  duration: number; // in hours
  maxParticipants: number;
  minAge?: number;
  pricing: {
    adult: number;
    child?: number;
    currency: string;
  };
  location: string;
  included: string[];
  excluded?: string[];
  requirements?: string[];
  images: VillaImage[];
  rating: {
    average: number;
    count: number;
  };
  availability: {
    days: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[];
    times: string[];
    seasonality?: 'all-year' | 'dry-season' | 'wet-season';
  };
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  status: 'active' | 'inactive';
}

export interface Booking {
  id: string;
  villaId: string;
  villa?: Villa;
  guest: {
    name: string;
    email: string;
    phone: string;
    country: string;
  };
  dates: {
    checkIn: string;
    checkOut: string;
    nights: number;
  };
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  pricing: {
    basePrice: number;
    cleaningFee?: number;
    serviceFee?: number;
    taxes: number;
    discount?: number;
    total: number;
    currency: string;
  };
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  payment: {
    method: 'credit_card' | 'bank_transfer' | 'paypal';
    status: 'pending' | 'paid' | 'refunded';
    transactionId?: string;
  };
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  country?: string;
  preferences?: {
    currency: string;
    language: string;
    newsletter: boolean;
  };
  bookings?: Booking[];
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

// SEO and Schema types
export interface SchemaMarkup {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  author?: string;
  openGraph: {
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
    type: string;
    siteName: string;
    locale: string;
    url: string;
  };
  twitter: {
    card: string;
    site?: string;
    creator?: string;
    title: string;
    description: string;
    image?: string;
    imageAlt?: string;
  };
  jsonLd?: SchemaMarkup[];
  hreflang?: Array<{
    lang: string;
    url: string;
  }>;
  robots?: string;
}

// API response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  maxGuests?: number;
  amenities?: string[];
  rating?: number;
  availability?: {
    checkIn: string;
    checkOut: string;
  };
}

// Form types
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  villa?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
}

export interface BookingInquiry extends ContactForm {
  villaId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  specialRequests?: string;
}

export interface NewsletterSubscription {
  email: string;
  preferences?: {
    deals: boolean;
    newVillas: boolean;
    events: boolean;
    content: boolean;
  };
}

// Utility types
export type VillaStatus = Villa['status'];
export type BookingStatus = Booking['status'];
export type PaymentStatus = Booking['payment']['status'];
export type AmenityCategory = Amenity['category'];
export type EventCategory = Event['category'];
export type ExperienceCategory = Experience['category'];
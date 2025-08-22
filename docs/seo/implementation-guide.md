# SEO Implementation Guide - Code Examples & Best Practices

## Quick Start Implementation

### 1. Update Root Layout (High Priority)

Replace the generic metadata in `/app/layout.tsx`:

```typescript
// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Aura Villas Bali - Luxury Villa Rentals',
    default: 'Aura Villas Bali - Premium Luxury Villa Rentals in Bali, Indonesia'
  },
  description: 'Discover exclusive luxury villa rentals in Bali\'s most prestigious locations. From Seminyak to Ubud, find your perfect tropical paradise with Aura Villas Bali.',
  keywords: [
    'Bali villa rental',
    'luxury villas Bali',
    'Seminyak villas',
    'Ubud accommodation',
    'private pool villas Bali'
  ],
  metadataBase: new URL('https://auravillasbali.com'),
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://auravillasbali.com',
    siteName: 'Aura Villas Bali',
    title: 'Aura Villas Bali - Premium Luxury Villa Rentals',
    description: 'Discover exclusive luxury villa rentals in Bali\'s most prestigious locations.',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Luxury villa with infinity pool in Bali',
    }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

### 2. Villa Detail Page Implementation

Create `/app/villas/[location]/[slug]/page.tsx`:

```typescript
import { generateVacationRentalSchema, generateProductSchema } from '@/utils/seo/enhancedSchemaMarkup';
import { VillaEnhancedSEO } from '@/components/seo/EnhancedSEOHead';
import { OptimizedVillaGallery } from '@/components/seo/CoreWebVitalsOptimizer';

interface VillaPageProps {
  params: { location: string; slug: string }
}

export async function generateStaticParams() {
  // This would fetch from your data source
  const villas = await getAllVillas();
  
  return villas.map((villa) => ({
    location: villa.location.toLowerCase().replace(/\s+/g, '-'),
    slug: villa.slug,
  }));
}

export async function generateMetadata({ params }: VillaPageProps): Promise<Metadata> {
  const villa = await getVilla(params.location, params.slug);
  
  return {
    title: `${villa.name} - Luxury Villa in ${villa.location}, Bali`,
    description: `${villa.description.slice(0, 150)}... Book this ${villa.bedrooms}-bedroom villa from $${villa.pricing.min}/night.`,
    openGraph: {
      title: villa.name,
      description: villa.description,
      images: villa.images.map(img => ({
        url: img.url,
        width: 1200,
        height: 630,
        alt: img.alt,
      })),
      type: 'product',
    },
    alternates: {
      canonical: `/villas/${villa.location.toLowerCase()}/${villa.slug}`,
    },
  };
}

export default async function VillaPage({ params }: VillaPageProps) {
  const villa = await getVilla(params.location, params.slug);
  
  // Generate schemas
  const schemas = [
    generateVacationRentalSchema(villa),
    generateProductSchema(villa),
  ];

  return (
    <>
      <VillaEnhancedSEO villa={villa} schemas={schemas} />
      
      <main className="villa-detail">
        <div className="hero-section">
          <OptimizedVillaGallery 
            images={villa.images}
            villaName={villa.name}
            maxImages={20}
          />
        </div>
        
        <div className="villa-info">
          <h1>{villa.name}</h1>
          <p className="villa-location">{villa.location}, Bali</p>
          <div className="villa-description">{villa.description}</div>
          
          {/* Villa details */}
          <div className="villa-details">
            <div className="bedrooms">{villa.bedrooms} Bedrooms</div>
            <div className="guests">{villa.maxGuests} Guests</div>
            <div className="price">From ${villa.pricing.min}/night</div>
          </div>
          
          {/* Booking section */}
          <div className="booking-section">
            <button className="book-now-btn">Book Now</button>
          </div>
        </div>
      </main>
    </>
  );
}

// Enable ISR for dynamic updates
export const revalidate = 3600; // Revalidate every hour
```

### 3. Location Landing Pages

Create `/app/villas/[location]/page.tsx`:

```typescript
import { generateLocalBusinessSchema } from '@/utils/seo/enhancedSchemaMarkup';
import { LocationSEO } from '@/components/seo/SEOHead';

export async function generateStaticParams() {
  const locations = await getAllLocations();
  
  return locations.map((location) => ({
    location: location.slug,
  }));
}

export default async function LocationPage({ params }: { params: { location: string } }) {
  const location = await getLocation(params.location);
  const villas = await getVillasByLocation(params.location);
  
  const schemas = [
    generateLocalBusinessSchema(location),
    generateBreadcrumbSchema([
      { name: 'Home', url: 'https://auravillasbali.com' },
      { name: 'Villas', url: 'https://auravillasbali.com/villas' },
      { name: location.name, url: `https://auravillasbali.com/villas/${location.slug}` }
    ])
  ];

  return (
    <>
      <LocationSEO location={location} schema={schemas} />
      
      <main>
        <div className="location-hero">
          <h1>{location.name} Villa Rentals</h1>
          <p>Discover {villas.length} luxury villas in {location.name}, Bali</p>
        </div>
        
        <div className="villa-grid">
          {villas.map((villa, index) => (
            <OptimizedVillaCard 
              key={villa.id}
              villa={villa}
              priority={index < 4}
              index={index}
            />
          ))}
        </div>
      </main>
    </>
  );
}
```

### 4. Performance Optimization Setup

Add to your main layout or component:

```typescript
// components/PerformanceProvider.tsx
'use client';

import { useEffect } from 'react';
import { initPerformanceMonitoring } from '@/utils/seo/performance';
import { useWebVitals } from '@/components/seo/CoreWebVitalsOptimizer';

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const vitals = useWebVitals();

  useEffect(() => {
    // Initialize performance monitoring
    const monitor = initPerformanceMonitoring();
    
    return () => {
      monitor?.cleanup();
    };
  }, []);

  // Send vitals to analytics
  useEffect(() => {
    if (typeof gtag !== 'undefined') {
      Object.entries(vitals).forEach(([metric, value]) => {
        if (value) {
          gtag('event', metric, {
            event_category: 'Web Vitals',
            event_label: metric,
            value: Math.round(metric === 'cls' ? value * 1000 : value),
            non_interaction: true,
          });
        }
      });
    }
  }, [vitals]);

  return <>{children}</>;
}
```

### 5. Image Optimization Implementation

```typescript
// components/VillaImage.tsx
import { CoreWebVitalsImage } from '@/components/seo/CoreWebVitalsOptimizer';

interface VillaImageProps {
  src: string;
  alt: string;
  villa: string;
  priority?: boolean;
  sizes?: string;
}

export const VillaImage: React.FC<VillaImageProps> = ({
  src,
  alt,
  villa,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}) => {
  return (
    <CoreWebVitalsImage
      src={src}
      alt={`${villa} - ${alt}`}
      width={800}
      height={600}
      priority={priority}
      sizes={sizes}
      quality={85}
      placeholder="blur"
    />
  );
};
```

## Critical Performance Optimizations

### 1. CSS Critical Path

Add to your `/app/globals.css`:

```css
/* Critical CSS for above-the-fold content */
.villa-card {
  aspect-ratio: 1 / 1.2;
  height: 400px;
  contain: layout style paint;
  background-color: #f9fafb;
}

.villa-card:hover {
  transform: scale(1.02);
  will-change: transform;
}

/* Prevent layout shift */
.hero-section {
  aspect-ratio: 16 / 9;
  min-height: 400px;
  background-color: #f3f4f6;
}

/* Loading states */
.loading-skeleton {
  background: linear-gradient(90deg, 
    #f0f0f0 25%, 
    #e0e0e0 37%, 
    #f0f0f0 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: 100% 50%; }
  100% { background-position: -100% 50%; }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .villa-card:hover {
    transform: none;
  }
  .loading-skeleton {
    animation: none;
  }
}
```

### 2. Font Optimization

Update your layout with font optimization:

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-inter">
        {children}
      </body>
    </html>
  )
}
```

## Schema Implementation Examples

### Villa Rental Schema

```typescript
const villaSchema = {
  "@context": "https://schema.org",
  "@type": "VacationRental",
  "name": "Luxury Beachfront Villa Seminyak",
  "description": "Stunning 4-bedroom villa with private pool",
  "url": "https://auravillasbali.com/villas/seminyak/luxury-beachfront-villa",
  "image": [
    "https://res.cloudinary.com/aura-villas/villa-1-main.jpg",
    "https://res.cloudinary.com/aura-villas/villa-1-pool.jpg"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Seminyak",
    "addressRegion": "Bali",
    "addressCountry": "ID"
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Private Pool",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification", 
      "name": "WiFi",
      "value": true
    }
  ],
  "numberOfBedrooms": 4,
  "maximumAttendeeCapacity": 8,
  "makesOffer": {
    "@type": "Offer",
    "price": "450",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
};
```

### Local Business Schema

```typescript
const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Aura Villas Seminyak",
  "description": "Premium villa rentals in Seminyak, Bali",
  "url": "https://auravillasbali.com/villas/seminyak",
  "telephone": "+62-361-123456",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Seminyak",
    "addressRegion": "Bali",
    "postalCode": "80361",
    "addressCountry": "ID"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "08:00",
    "closes": "20:00"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": 4.8,
    "reviewCount": 156,
    "bestRating": 5,
    "worstRating": 1
  }
};
```

## Monitoring and Analytics

### 1. Core Web Vitals Tracking

```typescript
// utils/analytics.ts
export const trackWebVitals = (metric: any) => {
  const { name, value, id } = metric;
  
  // Send to Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      non_interaction: true,
    });
  }
  
  // Send to custom analytics
  fetch('/api/analytics', {
    method: 'POST',
    body: JSON.stringify({
      metric: name,
      value: value,
      id: id,
      url: window.location.pathname,
      timestamp: Date.now()
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).catch(console.error);
};
```

### 2. SEO Performance Dashboard

```typescript
// pages/api/seo-metrics.ts
export default async function handler(req: NextRequest) {
  const metrics = {
    coreWebVitals: await getCoreWebVitalsData(),
    schemaValidation: await validateSchemas(),
    competitorAnalysis: await getCompetitorData(),
    keywordRankings: await getKeywordRankings(),
  };
  
  return Response.json(metrics);
}
```

## Quick Wins Implementation Checklist

### Week 1: Critical Fixes
- [ ] Update root layout metadata
- [ ] Implement image optimization
- [ ] Add schema markup to villa pages
- [ ] Create sitemap.xml and robots.txt
- [ ] Fix Core Web Vitals issues

### Week 2: Content Structure
- [ ] Create location landing pages
- [ ] Implement breadcrumb navigation
- [ ] Add FAQ sections with FAQ schema
- [ ] Optimize meta titles and descriptions

### Week 3: Performance
- [ ] Implement lazy loading
- [ ] Add critical CSS inlining
- [ ] Optimize font loading
- [ ] Set up performance monitoring

### Week 4: Advanced Features
- [ ] Multi-language support (hreflang)
- [ ] Social media optimization
- [ ] Review/rating system
- [ ] Competitor monitoring

## Testing and Validation

### 1. Schema Testing
Use Google's Rich Results Test:
```bash
curl "https://search.google.com/test/rich-results?url=YOUR_URL"
```

### 2. Performance Testing
```bash
# Run Lighthouse audit
npx lighthouse https://auravillasbali.com --output html

# Test Core Web Vitals
npx web-vitals-cli https://auravillasbali.com
```

### 3. SEO Validation
```bash
# Check sitemap
curl https://auravillasbali.com/sitemap.xml

# Validate robots.txt
curl https://auravillasbali.com/robots.txt
```

This implementation guide provides specific, actionable code examples that will significantly improve your villa rental website's technical SEO performance and search engine rankings.
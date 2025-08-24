# Homepage Backup Documentation

## Backup Date: August 24, 2025

This document contains a complete record of the guest-focused homepage before the property management redesign.

## Backup Locations

### 1. Route Backups
- **Primary Backup**: `/villas-backup` - Complete copy of the homepage at `app/villas-backup/page.tsx`
- **Secondary Archive**: `/home-guest-archive` - Additional backup at `app/home-guest-archive/page.tsx`

### 2. Component Library Backup
All guest-focused components have been preserved in: `src/components/guest-booking/`

## Preserved Components

### Homepage Components (`src/components/homepage/`)
1. **Hero.tsx** - Hero section with search functionality
2. **FeaturedVillasBooking.tsx** - Featured villas display with IDR pricing
3. **WhyBookWithAura.tsx** - Guest benefits section
4. **ExploreByArea.tsx** - Bali area exploration
5. **BaliExperiences.tsx** - Experience packages with IDR pricing
6. **TrustSignals.tsx** - Trust indicators and reviews
7. **WhatsAppButton.tsx** - Floating WhatsApp support

### Search Components (`src/components/search/`)
1. **PropertySearch.tsx** - Advanced property search with filters
2. **PriceRangeSlider.tsx** - IDR price range slider (Rp 1.5M - Rp 15M)

### Property Components (`src/components/properties/`)
1. **OnayaResortCard.tsx** - ONAYA Resort detailed display
2. **PropertyCard.tsx** - General property card component

### Data Files (`src/data/`)
1. **onaya-resort.ts** - Complete ONAYA Resort data with room types and IDR pricing

## Key Features Preserved

### 1. Currency System
- All prices converted to Indonesian Rupiah (IDR)
- Format: "Rp 1.000.000" with dot separators
- Price ranges: Rp 1.5M - Rp 15M

### 2. Property Listings
- SUYAI Villa Bali - Rp 13.500.000/night
- ONAYA Bali Resort - Rp 5.500.000/night
- Multiple room types with detailed amenities

### 3. Search Functionality
- Location-based search
- Price range filtering with slider
- Guest count selection
- Check-in/Check-out date pickers
- Advanced filters (bedrooms, amenities)

### 4. Experiences Section
- Surf Lessons - Rp 1.000.000/person
- Temple Tours - Rp 700.000/person
- Private Chef - Rp 1.900.000/day
- Spa & Wellness - Rp 1.250.000/treatment
- Photo Sessions - Rp 3.950.000/session
- Cultural Shows - Rp 550.000/person

### 5. Property Management Features
- EarningsCalculator with IDR conversion
- Service tiers pricing
- Owner dashboard components

## Navigation Structure

### Current Routes
- `/` - Homepage (guest-focused)
- `/villas` - Villa listings
- `/villas/uluwatu` - Uluwatu properties
- `/villas/[slug]` - Individual villa pages
- `/property-management` - Owner portal
- `/contact` - Contact page
- `/about` - About page
- `/experiences` - Experiences page
- `/destinations` - Destinations page

### Backup Routes (New)
- `/villas-backup` - Complete homepage backup
- `/home-guest-archive` - Secondary homepage archive

## Styling & Design

### Color Scheme
- **Primary**: Deep Green (`#1a4d2e`)
- **Secondary**: Terracotta (`#c9705f`)
- **Accent**: Warm Ivory (`#faf7f2`)
- **Support**: Sand Light (`#f5e6d3`)

### Typography
- Font: Playfair Display (serif) for headings
- Font: Inter (sans-serif) for body text

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## Docker Configuration

### Development
- Port: 3003
- Profile: development
- Container: aura-villas-development

### Production
- Port: 3002
- Profile: production
- Container: aura-villas-production

## How to Restore

To restore the guest-focused homepage:

1. **Option 1**: Navigate to backup routes
   - Visit `/villas-backup` or `/home-guest-archive`

2. **Option 2**: Replace current homepage
   ```bash
   cp app/villas-backup/page.tsx app/page.tsx
   ```

3. **Option 3**: Use preserved components
   - Import from `src/components/guest-booking/`
   - All components remain functional and styled

## Technical Notes

- Next.js 15.5.0 with Turbopack
- React 18+ with TypeScript
- Tailwind CSS for styling
- Docker containerization
- Vercel deployment ready

## Important Files

### Configuration
- `docker-compose.yml` - Docker setup
- `tailwind.config.ts` - Tailwind configuration
- `next.config.ts` - Next.js configuration

### Deployment
- Vercel integration configured
- Environment variables in `.env.local`
- Build optimizations enabled

## Contact

For questions about this backup or restoration:
- Check git history for original commits
- All components preserved with original functionality
- No data or features have been deleted

---

**Note**: This backup was created to preserve the guest booking interface before implementing the property management focused homepage. All original functionality remains intact and accessible.
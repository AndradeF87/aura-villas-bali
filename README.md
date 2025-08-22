# AURA Villas Bali

Luxury villa rental platform with intelligent property management - "Every Villa Has a Story"

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

## 🏗️ Tech Stack

- **Framework**: Next.js 15.5 with TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase
- **Icons**: Lucide React
- **Fonts**: Playfair Display + Inter

## 📁 Project Structure

```
aura-villas-bali/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── src/
│   ├── components/        # React components
│   │   └── homepage/      # Homepage components
│   ├── lib/              # Libraries & utilities
│   │   └── supabase/     # Supabase client
│   └── types/            # TypeScript types
├── public/               # Static assets
│   └── images/          # Images
└── docs/                # Documentation
```

## 🎨 Brand Colors

- **Terracotta**: `#C96F4A` - Primary CTAs
- **Deep Green**: `#2F4A3C` - Headers
- **Sand**: `#E8DCC8` - Backgrounds
- **Ivory**: `#F8F4F0` - Light backgrounds
- **Antique Gold**: `#C1A265` - Accents

## 🔧 Environment Setup

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=+628123456789

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 📦 Key Components

### Homepage Components
- **Hero** - Full-screen hero with search
- **SearchBar** - Smart property search
- **FeaturedVillas** - Villa story cards
- **AuraExperience** - Brand values
- **TrustSignals** - Reviews & social proof
- **OwnerCalculator** - Earnings calculator
- **WhatsAppButton** - Floating chat button

## 🛠️ Development

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📝 Documentation

- [Homepage Implementation](/docs/homepage-implementation-summary.md)
- [SEO Strategy](/docs/seo-research/)
- [Architecture Design](/docs/architecture/)
- [Owner Research](/docs/owner-research/)

## 🚀 Deployment

The application is configured for deployment on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📄 License

© 2024 AURA Villas Bali. All rights reserved.
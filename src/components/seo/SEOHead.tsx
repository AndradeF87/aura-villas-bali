import Head from 'next/head';
import { SchemaMarkup } from '@/utils/seo/schemaMarkup';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    type?: string;
    siteName?: string;
    locale?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
  };
  jsonLd?: object | object[];
  hreflang?: Array<{
    lang: string;
    url: string;
  }>;
  noIndex?: boolean;
  noFollow?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  jsonLd,
  hreflang,
  noIndex = false,
  noFollow = false
}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://auravillasbali.com';
  const canonicalUrl = canonical || siteUrl;

  // Construct robots meta tag
  const robotsContent = [];
  if (noIndex) robotsContent.push('noindex');
  if (noFollow) robotsContent.push('nofollow');
  const robots = robotsContent.length > 0 ? robotsContent.join(', ') : 'index, follow';

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Viewport and Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Charset and Language */}
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />

      {/* Hreflang Tags */}
      {hreflang?.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={openGraph?.title || title} />
      <meta property="og:description" content={openGraph?.description || description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={openGraph?.type || 'website'} />
      <meta property="og:site_name" content={openGraph?.siteName || 'Aura Villas Bali'} />
      <meta property="og:locale" content={openGraph?.locale || 'en_AU'} />
      
      {openGraph?.image && (
        <>
          <meta property="og:image" content={openGraph.image} />
          <meta property="og:image:alt" content={openGraph.imageAlt || title} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </>
      )}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitter?.card || 'summary_large_image'} />
      <meta name="twitter:site" content={twitter?.site || '@auravillasbali'} />
      <meta name="twitter:creator" content={twitter?.creator || '@auravillasbali'} />
      <meta name="twitter:title" content={twitter?.title || title} />
      <meta name="twitter:description" content={twitter?.description || description} />
      
      {twitter?.image && (
        <>
          <meta name="twitter:image" content={twitter.image} />
          <meta name="twitter:image:alt" content={twitter.imageAlt || title} />
        </>
      )}

      {/* Additional Meta Tags for Villa Rental Business */}
      <meta name="geo.region" content="ID-BA" />
      <meta name="geo.placename" content="Bali, Indonesia" />
      <meta name="geo.position" content="-8.6705;115.1526" />
      <meta name="ICBM" content="-8.6705, 115.1526" />

      {/* Theme and Brand */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />

      {/* Favicons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* DNS Prefetch and Preconnect for Performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//res.cloudinary.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* JSON-LD Schema Markup */}
      {jsonLd && <SchemaMarkup schema={jsonLd} />}
    </Head>
  );
};

// Specialized SEO components for different page types
interface VillaSEOProps {
  villa: {
    name: string;
    description: string;
    location: string;
    slug: string;
    images: Array<{ url: string; alt: string }>;
    pricing: { min: number; max: number };
    rating: { average: number; count: number };
  };
  schema: object;
}

export const VillaSEO: React.FC<VillaSEOProps> = ({ villa, schema }) => {
  const title = `${villa.name} - Boutique Villa Rental in ${villa.location}, Bali`;
  const description = `${villa.description.slice(0, 150)}... Book your dream villa in ${villa.location} from $${villa.pricing.min}/night. ${villa.rating.count} reviews, ${villa.rating.average}/5 stars.`;
  const canonical = `https://auravillasbali.com/villas/${villa.location.toLowerCase()}/${villa.slug}`;
  
  const ogImage = villa.images[0]?.url || '/default-villa-image.jpg';

  return (
    <SEOHead
      title={title}
      description={description}
      canonical={canonical}
      openGraph={{
        title,
        description,
        image: ogImage,
        imageAlt: `${villa.name} - ${villa.images[0]?.alt}`,
        type: 'website',
        siteName: 'Aura Villas Bali'
      }}
      twitter={{
        card: 'summary_large_image',
        title,
        description,
        image: ogImage,
        imageAlt: villa.images[0]?.alt
      }}
      jsonLd={schema}
      hreflang={[
        { lang: 'en-AU', url: `${canonical}?lang=en-AU` },
        { lang: 'en-US', url: `${canonical}?lang=en-US` },
        { lang: 'x-default', url: canonical }
      ]}
    />
  );
};

interface BlogSEOProps {
  post: {
    title: string;
    excerpt: string;
    slug: string;
    category: string;
    publishedAt: string;
    author: { name: string };
    featuredImage?: { url: string; alt: string };
  };
  schema: object;
}

export const BlogSEO: React.FC<BlogSEOProps> = ({ post, schema }) => {
  const title = `${post.title} | Aura Villas Bali Blog`;
  const description = post.excerpt.slice(0, 160);
  const canonical = `https://auravillasbali.com/blog/${post.category}/${post.slug}`;
  
  return (
    <SEOHead
      title={title}
      description={description}
      canonical={canonical}
      openGraph={{
        title: post.title,
        description,
        image: post.featuredImage?.url,
        imageAlt: post.featuredImage?.alt,
        type: 'article',
        siteName: 'Aura Villas Bali'
      }}
      twitter={{
        card: 'summary_large_image',
        title: post.title,
        description,
        image: post.featuredImage?.url,
        imageAlt: post.featuredImage?.alt
      }}
      jsonLd={schema}
    />
  );
};

// Location page SEO
interface LocationSEOProps {
  location: {
    name: string;
    description: string;
    slug: string;
    villaCount: number;
    featuredImage?: { url: string; alt: string };
  };
  schema: object;
}

export const LocationSEO: React.FC<LocationSEOProps> = ({ location, schema }) => {
  const title = `${location.name} Villa Rentals - ${location.villaCount} Boutique Villas | Aura Villas Bali`;
  const description = `Discover ${location.villaCount} boutique villas in ${location.name}, Bali. ${location.description.slice(0, 120)}... Book direct for best rates.`;
  const canonical = `https://auravillasbali.com/villas/${location.slug}`;
  
  return (
    <SEOHead
      title={title}
      description={description}
      canonical={canonical}
      openGraph={{
        title,
        description,
        image: location.featuredImage?.url,
        imageAlt: `Boutique villas in ${location.name}, Bali`,
        type: 'website'
      }}
      jsonLd={schema}
    />
  );
};
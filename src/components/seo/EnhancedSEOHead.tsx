import Head from 'next/head';
import { SchemaMarkup } from '@/utils/seo/schemaMarkup';

interface EnhancedSEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    type?: 'website' | 'article' | 'product' | 'profile';
    siteName?: string;
    locale?: string;
    article?: {
      publishedTime?: string;
      modifiedTime?: string;
      author?: string;
      section?: string;
      tags?: string[];
    };
    product?: {
      price?: string;
      currency?: string;
      availability?: 'instock' | 'outofstock' | 'preorder';
      condition?: 'new' | 'used' | 'refurbished';
      brand?: string;
      retailerItemId?: string;
    };
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    app?: {
      name: string;
      id: string;
      url: string;
    };
  };
  jsonLd?: object | object[];
  hreflang?: Array<{
    lang: string;
    url: string;
  }>;
  alternateVersions?: Array<{
    type: string;
    href: string;
    title?: string;
  }>;
  prevNext?: {
    prev?: string;
    next?: string;
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    noimageindex?: boolean;
    notranslate?: boolean;
    maxSnippet?: number;
    maxImagePreview?: 'none' | 'standard' | 'large';
    maxVideoPreview?: number | 'none';
  };
  geo?: {
    region?: string;
    position?: string;
    icbm?: string;
    placename?: string;
  };
}

export const EnhancedSEOHead: React.FC<EnhancedSEOHeadProps> = ({
  title,
  description,
  canonical,
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  openGraph,
  twitter,
  jsonLd,
  hreflang = [],
  alternateVersions = [],
  prevNext,
  robots = { index: true, follow: true },
  geo
}) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://auravillasbali.com';
  const canonicalUrl = canonical || siteUrl;

  // Construct robots meta tag
  const robotsContent = [];
  if (!robots.index) robotsContent.push('noindex');
  if (!robots.follow) robotsContent.push('nofollow');
  if (robots.noarchive) robotsContent.push('noarchive');
  if (robots.nosnippet) robotsContent.push('nosnippet');
  if (robots.noimageindex) robotsContent.push('noimageindex');
  if (robots.notranslate) robotsContent.push('notranslate');
  if (robots.maxSnippet) robotsContent.push(`max-snippet:${robots.maxSnippet}`);
  if (robots.maxImagePreview) robotsContent.push(`max-image-preview:${robots.maxImagePreview}`);
  if (robots.maxVideoPreview) robotsContent.push(`max-video-preview:${robots.maxVideoPreview}`);
  
  const robotsValue = robotsContent.length > 0 ? robotsContent.join(', ') : 'index, follow';

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {author && <meta name="author" content={author} />}
      <meta name="robots" content={robotsValue} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Viewport and Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />

      {/* Charset and Language */}
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta httpEquiv="content-language" content="en-AU" />

      {/* Publication Dates */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Geographic Information */}
      {geo?.region && <meta name="geo.region" content={geo.region} />}
      {geo?.position && <meta name="geo.position" content={geo.position} />}
      {geo?.icbm && <meta name="ICBM" content={geo.icbm} />}
      {geo?.placename && <meta name="geo.placename" content={geo.placename} />}

      {/* Hreflang Tags */}
      {hreflang.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={url} />
      ))}

      {/* Alternate Versions (RSS, AMP, etc.) */}
      {alternateVersions.map((alt, index) => (
        <link 
          key={index} 
          rel="alternate" 
          type={alt.type} 
          href={alt.href} 
          title={alt.title}
        />
      ))}

      {/* Pagination */}
      {prevNext?.prev && <link rel="prev" href={prevNext.prev} />}
      {prevNext?.next && <link rel="next" href={prevNext.next} />}

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
          <meta property="og:image:type" content="image/jpeg" />
        </>
      )}

      {/* Article-specific Open Graph tags */}
      {openGraph?.type === 'article' && openGraph.article && (
        <>
          {openGraph.article.publishedTime && (
            <meta property="article:published_time" content={openGraph.article.publishedTime} />
          )}
          {openGraph.article.modifiedTime && (
            <meta property="article:modified_time" content={openGraph.article.modifiedTime} />
          )}
          {openGraph.article.author && (
            <meta property="article:author" content={openGraph.article.author} />
          )}
          {openGraph.article.section && (
            <meta property="article:section" content={openGraph.article.section} />
          )}
          {openGraph.article.tags?.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Product-specific Open Graph tags */}
      {openGraph?.type === 'product' && openGraph.product && (
        <>
          {openGraph.product.price && (
            <meta property="product:price:amount" content={openGraph.product.price} />
          )}
          {openGraph.product.currency && (
            <meta property="product:price:currency" content={openGraph.product.currency} />
          )}
          {openGraph.product.availability && (
            <meta property="product:availability" content={openGraph.product.availability} />
          )}
          {openGraph.product.condition && (
            <meta property="product:condition" content={openGraph.product.condition} />
          )}
          {openGraph.product.brand && (
            <meta property="product:brand" content={openGraph.product.brand} />
          )}
          {openGraph.product.retailerItemId && (
            <meta property="product:retailer_item_id" content={openGraph.product.retailerItemId} />
          )}
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

      {/* Twitter App Card */}
      {twitter?.app && (
        <>
          <meta name="twitter:app:name:iphone" content={twitter.app.name} />
          <meta name="twitter:app:id:iphone" content={twitter.app.id} />
          <meta name="twitter:app:url:iphone" content={twitter.app.url} />
        </>
      )}

      {/* Theme and Brand Colors */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1e40af" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* DNS Prefetch and Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//res.cloudinary.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//images.unsplash.com" />
      
      {/* Performance Hints for Villa Rental Specific Resources */}
      <link rel="dns-prefetch" href="//js.stripe.com" />
      <link rel="dns-prefetch" href="//platform.twitter.com" />
      <link rel="dns-prefetch" href="//connect.facebook.net" />

      {/* Preload Critical Resources */}
      <link 
        rel="preload" 
        href="/fonts/inter-var.woff2" 
        as="font" 
        type="font/woff2" 
        crossOrigin="anonymous" 
      />

      {/* Security Headers via Meta (backup for server headers) */}
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Referrer-Policy" content="origin-when-cross-origin" />

      {/* JSON-LD Schema Markup */}
      {jsonLd && <SchemaMarkup schema={jsonLd} />}
    </Head>
  );
};

// High-performance villa-specific SEO component
interface VillaEnhancedSEOProps {
  villa: {
    name: string;
    description: string;
    location: string;
    slug: string;
    images: Array<{ url: string; alt: string }>;
    pricing: { min: number; max: number; currency: string };
    rating: { average: number; count: number };
    amenities: Array<{ name: string; available: boolean }>;
    coordinates: { lat: number; lng: number };
    updatedAt: string;
    category: string;
  };
  schemas: object[];
}

export const VillaEnhancedSEO: React.FC<VillaEnhancedSEOProps> = ({ villa, schemas }) => {
  const title = `${villa.name} - Luxury ${villa.location} Villa Rental | Aura Villas Bali`;
  const description = `${villa.description.slice(0, 120)}... Book this stunning ${villa.location} villa from $${villa.pricing.min}/${villa.pricing.currency} per night. ${villa.rating.count} reviews, ${villa.rating.average}⭐ rating.`;
  const canonical = `https://auravillasbali.com/villas/${villa.location.toLowerCase().replace(/\s+/g, '-')}/${villa.slug}`;
  
  const keywords = [
    `${villa.location} villa rental`,
    `luxury villa ${villa.location}`,
    villa.name,
    'Bali accommodation',
    'private villa Bali',
    ...villa.amenities.filter(a => a.available).map(a => a.name.toLowerCase()),
    `${villa.location} vacation rental`
  ];

  const ogImage = villa.images[0]?.url || '/default-villa-image.jpg';

  return (
    <EnhancedSEOHead
      title={title}
      description={description}
      canonical={canonical}
      keywords={keywords}
      modifiedTime={villa.updatedAt}
      section="Villa Rentals"
      tags={[villa.location, villa.category, 'Luxury Villa']}
      openGraph={{
        title: villa.name,
        description,
        image: ogImage,
        imageAlt: `${villa.name} - Luxury villa in ${villa.location}, Bali`,
        type: 'product',
        siteName: 'Aura Villas Bali',
        locale: 'en_AU',
        product: {
          price: villa.pricing.min.toString(),
          currency: villa.pricing.currency,
          availability: 'instock',
          condition: 'new',
          brand: 'Aura Villas Bali',
          retailerItemId: villa.slug
        }
      }}
      twitter={{
        card: 'summary_large_image',
        title: villa.name,
        description,
        image: ogImage,
        imageAlt: villa.images[0]?.alt
      }}
      jsonLd={schemas}
      hreflang={[
        { lang: 'en-AU', url: `${canonical}?lang=en-AU` },
        { lang: 'en-US', url: `${canonical}?lang=en-US` },
        { lang: 'en-GB', url: `${canonical}?lang=en-GB` },
        { lang: 'id-ID', url: `${canonical}?lang=id-ID` },
        { lang: 'x-default', url: canonical }
      ]}
      geo={{
        region: 'ID-BA',
        position: `${villa.coordinates.lat};${villa.coordinates.lng}`,
        icbm: `${villa.coordinates.lat}, ${villa.coordinates.lng}`,
        placename: `${villa.location}, Bali, Indonesia`
      }}
      robots={{
        index: true,
        follow: true,
        maxImagePreview: 'large',
        maxSnippet: 160,
        maxVideoPreview: 'none'
      }}
    />
  );
};
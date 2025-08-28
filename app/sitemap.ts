import { MetadataRoute } from 'next';
import { i18n } from '@/lib/i18n/config';
import { villasData } from '@/data/villas';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://auravillasbali.com';
  const currentDate = new Date().toISOString();
  
  // Define all static pages with their properties
  const staticRoutes = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const },
    { path: '/villas', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/pricing', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/about', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFreq: 'monthly' as const },
  ];

  // Generate dynamic villa routes
  const villaRoutes = villasData.map((villa) => ({
    path: `/villas/${villa.slug}`,
    priority: 0.8,
    changeFreq: 'weekly' as const,
  }));

  // Combine all routes
  const allRoutes = [...staticRoutes, ...villaRoutes];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate URLs for each route and locale combination
  allRoutes.forEach((route) => {
    // Create entries for each locale
    i18n.locales.forEach((locale) => {
      // Build the URL based on locale
      const url = locale === i18n.defaultLocale 
        ? `${baseUrl}${route.path}`
        : `${baseUrl}/${locale}${route.path}`;

      // Build alternates for hreflang - this is crucial for SEO
      const alternates: Record<string, string> = {};
      
      // Add all language versions
      i18n.locales.forEach((altLocale) => {
        if (altLocale === i18n.defaultLocale) {
          alternates[altLocale] = `${baseUrl}${route.path}`;
        } else {
          alternates[altLocale] = `${baseUrl}/${altLocale}${route.path}`;
        }
      });
      
      // Add x-default pointing to the default locale (important for SEO)
      alternates['x-default'] = `${baseUrl}${route.path}`;

      // Only add canonical URLs to sitemap (no query parameters, no duplicates)
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: route.changeFreq,
        priority: route.priority,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  // Remove duplicates (important to avoid SEO issues)
  const uniqueEntries = sitemapEntries.filter((entry, index, self) =>
    index === self.findIndex((e) => e.url === entry.url)
  );

  // Sort by priority (highest first) and then by URL for consistency
  return uniqueEntries.sort((a, b) => {
    // First sort by priority (descending)
    const priorityDiff = (b.priority || 0) - (a.priority || 0);
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then sort by URL (ascending) for consistency
    return a.url.localeCompare(b.url);
  });
}

// Additional sitemap index for large sites (future-proofing)
// This would be used if we have more than 50,000 URLs
export async function sitemapIndex(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://auravillasbali.com';
  
  // For now, we only have one sitemap
  // In the future, we could split by locale or content type
  return [
    {
      url: `${baseUrl}/sitemap.xml`,
      lastModified: new Date().toISOString(),
    },
  ];
}
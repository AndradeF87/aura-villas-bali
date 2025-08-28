import { MetadataRoute } from 'next';
import { i18n } from '@/lib/i18n/config';
import { villasData } from '@/data/villas';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://auravillasbali.com';
  const currentDate = new Date().toISOString();
  
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Define all pages with proper priority hierarchy
  const pages = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const },  // Homepage gets highest priority
    { path: '/villas', priority: 0.8, changeFreq: 'weekly' as const },  // Main sections
    { path: '/pricing', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/about', priority: 0.6, changeFreq: 'monthly' as const },  // Secondary pages
    { path: '/contact', priority: 0.6, changeFreq: 'monthly' as const },
  ];

  // Add villa pages with appropriate priority
  villasData.forEach((villa) => {
    pages.push({
      path: `/villas/${villa.slug}`,
      priority: 0.7,  // Individual villas get medium priority
      changeFreq: 'weekly' as const,
    });
  });

  // Create sitemap entries with proper hreflang setup
  pages.forEach((page) => {
    // Build alternates for all locales
    const alternates: Record<string, string> = {};
    
    i18n.locales.forEach((locale) => {
      if (locale === i18n.defaultLocale) {
        alternates[locale] = `${baseUrl}${page.path}`;
      } else {
        alternates[locale] = `${baseUrl}/${locale}${page.path}`;
      }
    });
    
    // Add x-default pointing to English version
    alternates['x-default'] = `${baseUrl}${page.path}`;

    // Add entry for each locale to ensure all URLs are indexed
    i18n.locales.forEach((locale) => {
      const url = locale === i18n.defaultLocale 
        ? `${baseUrl}${page.path}`
        : `${baseUrl}/${locale}${page.path}`;

      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: page.changeFreq,
        priority: page.priority,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  // Sort by priority (highest first) then by URL
  return sitemapEntries.sort((a, b) => {
    const priorityDiff = (b.priority || 0) - (a.priority || 0);
    if (priorityDiff !== 0) return priorityDiff;
    return a.url.localeCompare(b.url);
  });
}
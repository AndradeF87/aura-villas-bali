import { MetadataRoute } from 'next';
import { i18n } from '@/lib/i18n/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://auravillasbali.com';
  const currentDate = new Date().toISOString();
  
  // Define all static pages
  const staticPages = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const },
    { path: '/villas', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/pricing', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/about', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFreq: 'monthly' as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Generate URLs for each locale
  staticPages.forEach((page) => {
    i18n.locales.forEach((locale) => {
      // Build the URL
      const url = locale === i18n.defaultLocale 
        ? `${baseUrl}${page.path}`
        : `${baseUrl}/${locale}${page.path}`;

      // Build alternates for hreflang
      const alternates: Record<string, string> = {};
      
      i18n.locales.forEach((altLocale) => {
        if (altLocale === i18n.defaultLocale) {
          alternates[altLocale] = `${baseUrl}${page.path}`;
        } else {
          alternates[altLocale] = `${baseUrl}/${altLocale}${page.path}`;
        }
      });
      
      // Add x-default pointing to the default locale
      alternates['x-default'] = `${baseUrl}${page.path}`;

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

  // Sort by priority (highest first) and lastModified (newest first)
  return sitemapEntries.sort((a, b) => {
    if (a.priority !== b.priority) {
      return (b.priority || 0) - (a.priority || 0);
    }
    return new Date(b.lastModified || '').getTime() - new Date(a.lastModified || '').getTime();
  });
}
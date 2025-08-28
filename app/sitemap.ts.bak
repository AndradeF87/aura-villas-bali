import { MetadataRoute } from 'next';
import { i18n } from '@/lib/i18n/config';
import { villasData } from '@/data/villas';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://auravillasbali.com';
  const currentDate = new Date().toISOString();
  
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Define all pages (static + dynamic villas)
  const pages = [
    { path: '', priority: 1.0, changeFreq: 'daily' as const },
    { path: '/villas', priority: 0.9, changeFreq: 'weekly' as const },
    { path: '/pricing', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/about', priority: 0.7, changeFreq: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFreq: 'monthly' as const },
  ];

  // Add villa pages
  villasData.forEach((villa) => {
    pages.push({
      path: `/villas/${villa.slug}`,
      priority: 0.8,
      changeFreq: 'weekly' as const,
    });
  });

  // For each page, create entries for each locale
  pages.forEach((page) => {
    // Create a single entry per page with all language alternates
    // Default locale (en)
    const alternates: Record<string, string> = {};
    
    // Add all locale versions to alternates
    i18n.locales.forEach((locale) => {
      if (locale === i18n.defaultLocale) {
        alternates[locale] = `${baseUrl}${page.path}`;
      } else {
        alternates[locale] = `${baseUrl}/${locale}${page.path}`;
      }
    });
    
    // Add x-default
    alternates['x-default'] = `${baseUrl}${page.path}`;

    // Add the main URL (default locale)
    sitemapEntries.push({
      url: `${baseUrl}${page.path}`,
      lastModified: currentDate,
      changeFrequency: page.changeFreq,
      priority: page.priority,
      alternates: {
        languages: alternates,
      },
    });

    // Add URLs for other locales
    i18n.locales.forEach((locale) => {
      if (locale !== i18n.defaultLocale) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}${page.path}`,
          lastModified: currentDate,
          changeFrequency: page.changeFreq,
          priority: page.priority,
          alternates: {
            languages: alternates,
          },
        });
      }
    });
  });

  // Sort by priority and URL
  return sitemapEntries.sort((a, b) => {
    const priorityDiff = (b.priority || 0) - (a.priority || 0);
    if (priorityDiff !== 0) return priorityDiff;
    return a.url.localeCompare(b.url);
  });
}
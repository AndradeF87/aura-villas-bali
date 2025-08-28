import { NextResponse } from 'next/server';
import { i18n } from '@/lib/i18n/config';
import { villasData } from '@/data/villas';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://auravillasbali.com';
  const currentDate = new Date().toISOString();
  
  // Define all pages (static + dynamic villas)
  const pages = [
    { path: '', priority: 1.0, changeFreq: 'daily' },
    { path: '/villas', priority: 0.9, changeFreq: 'weekly' },
    { path: '/pricing', priority: 0.8, changeFreq: 'weekly' },
    { path: '/about', priority: 0.7, changeFreq: 'monthly' },
    { path: '/contact', priority: 0.7, changeFreq: 'monthly' },
  ];

  // Add villa pages
  villasData.forEach((villa) => {
    pages.push({
      path: `/villas/${villa.slug}`,
      priority: 0.8,
      changeFreq: 'weekly',
    });
  });

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  // For each page, create entries for each locale
  pages.forEach((page) => {
    // Build alternates
    const alternates: Record<string, string> = {};
    i18n.locales.forEach((locale) => {
      if (locale === i18n.defaultLocale) {
        alternates[locale] = `${baseUrl}${page.path}`;
      } else {
        alternates[locale] = `${baseUrl}/${locale}${page.path}`;
      }
    });
    alternates['x-default'] = `${baseUrl}${page.path}`;

    // Add entry for default locale
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${page.path}</loc>\n`;
    
    // Add hreflang links
    Object.entries(alternates).forEach(([lang, url]) => {
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}"/>\n`;
    });
    
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${page.changeFreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';

    // Add entries for other locales
    i18n.locales.forEach((locale) => {
      if (locale !== i18n.defaultLocale) {
        xml += '  <url>\n';
        xml += `    <loc>${baseUrl}/${locale}${page.path}</loc>\n`;
        
        // Add hreflang links
        Object.entries(alternates).forEach(([lang, url]) => {
          xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${url}"/>\n`;
        });
        
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>${page.changeFreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += '  </url>\n';
      }
    });
  });

  xml += '</urlset>';

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
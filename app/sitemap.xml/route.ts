import { NextResponse } from 'next/server';
import { i18n } from '@/lib/i18n/config';
import { villasData } from '@/data/villas';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://auravillasbali.com';
  const currentDate = new Date().toISOString();
  
  // Define all pages
  const pages = [
    { path: '' },
    { path: '/villas' },
    { path: '/pricing' },
    { path: '/about' },
    { path: '/contact' },
  ];

  // Add villa pages
  villasData.forEach((villa) => {
    pages.push({
      path: `/villas/${villa.slug}`,
    });
  });

  // Generate XML with XSL stylesheet reference
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<?xml-stylesheet type="text/xsl" href="/api/sitemap-xsl"?>\n';
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

    // Add entries for each locale
    i18n.locales.forEach((locale) => {
      const url = locale === i18n.defaultLocale 
        ? `${baseUrl}${page.path}`
        : `${baseUrl}/${locale}${page.path}`;
      
      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      
      // Add hreflang links
      Object.entries(alternates).forEach(([lang, href]) => {
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>\n`;
      });
      
      xml += '  </url>\n';
    });
  });

  xml += '</urlset>';

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
import { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { Locale, i18n } from '@/lib/i18n/config'
import AboutPageClient from './AboutPageClient'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const baseUrl = 'https://auravillasbali.com';
  
  // Generate alternate links for all locales
  const languages: Record<string, string> = {};
  i18n.locales.forEach((loc) => {
    const path = '/about';
    if (loc === i18n.defaultLocale) {
      languages['x-default'] = `${baseUrl}${path}`;
      languages[loc] = `${baseUrl}${path}`;
    } else {
      languages[loc] = `${baseUrl}/${loc}${path}`;
    }
  });

  const url = locale === i18n.defaultLocale 
    ? `${baseUrl}/about` 
    : `${baseUrl}/${locale}/about`;

  return {
    title: dict.metadata.about.title,
    description: dict.metadata.about.description,
    keywords: dict.metadata.about.keywords,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: dict.metadata.about.title,
      description: dict.metadata.about.description,
      url,
      siteName: "AURA Villas Bali",
      images: [
        {
          url: "/images/about-og.jpg",
          width: 1200,
          height: 630,
          alt: "AURA Villas Bali Team",
        },
      ],
      locale: locale === 'es-ES' ? 'es_ES' : 'en_US',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.about.title,
      description: dict.metadata.about.description,
      images: ["/images/about-og.jpg"],
    },
  };
}

export default async function AboutPage({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  
  return <AboutPageClient dictionary={dictionary} locale={locale} />
}
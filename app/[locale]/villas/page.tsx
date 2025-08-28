import { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { Locale, i18n } from '@/lib/i18n/config'
import VillasPageClient from './VillasPageClient'

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
    const path = '/villas';
    if (loc === i18n.defaultLocale) {
      languages['x-default'] = `${baseUrl}${path}`;
      languages[loc] = `${baseUrl}${path}`;
    } else {
      languages[loc] = `${baseUrl}/${loc}${path}`;
    }
  });

  const url = locale === i18n.defaultLocale 
    ? `${baseUrl}/villas` 
    : `${baseUrl}/${locale}/villas`;

  return {
    title: dict.metadata.villas.title,
    description: dict.metadata.villas.description,
    keywords: dict.metadata.villas.keywords,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: dict.metadata.villas.title,
      description: dict.metadata.villas.description,
      url,
      siteName: "AURA Villas Bali",
      images: [
        {
          url: "/images/villas-collection-og.jpg",
          width: 1200,
          height: 630,
          alt: "AURA Villas Collection in Bali",
        },
      ],
      locale: locale === 'es-ES' ? 'es_ES' : 'en_US',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.villas.title,
      description: dict.metadata.villas.description,
      images: ["/images/villas-collection-og.jpg"],
    },
  };
}

export default async function VillasPage({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  
  return <VillasPageClient dictionary={dictionary} locale={locale} />
}
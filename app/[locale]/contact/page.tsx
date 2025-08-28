import { Metadata } from 'next'
import { getDictionary } from '@/lib/i18n/dictionaries'
import { Locale, i18n } from '@/lib/i18n/config'
import ContactPageClient from './ContactPageClient'

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
    const path = '/contact';
    if (loc === i18n.defaultLocale) {
      languages['x-default'] = `${baseUrl}${path}`;
      languages[loc] = `${baseUrl}${path}`;
    } else {
      languages[loc] = `${baseUrl}/${loc}${path}`;
    }
  });

  const url = locale === i18n.defaultLocale 
    ? `${baseUrl}/contact` 
    : `${baseUrl}/${locale}/contact`;

  return {
    title: dict.metadata.contact.title,
    description: dict.metadata.contact.description,
    keywords: dict.metadata.contact.keywords,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title: dict.metadata.contact.title,
      description: dict.metadata.contact.description,
      url,
      siteName: "AURA Villas Bali",
      images: [
        {
          url: "/images/contact-og.jpg",
          width: 1200,
          height: 630,
          alt: "Contact AURA Villas Bali",
        },
      ],
      locale: locale === 'es-ES' ? 'es_ES' : 'en_US',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.contact.title,
      description: dict.metadata.contact.description,
      images: ["/images/contact-og.jpg"],
    },
  };
}

export default async function ContactPage({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  
  return <ContactPageClient dictionary={dictionary} locale={locale} />
}
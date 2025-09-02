import type { Metadata } from "next";
import { notFound } from 'next/navigation';
import { ConditionalNavigation } from "@/components/layout/ConditionalNavigation";
import { LanguageSetter } from "@/components/LanguageSetter";
import Footer from "@/components/layout/Footer";
import { i18n, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

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
    if (loc === i18n.defaultLocale) {
      languages['x-default'] = baseUrl;
      languages[loc] = baseUrl;
    } else {
      languages[loc] = `${baseUrl}/${loc}`;
    }
  });

  return {
    metadataBase: new URL(baseUrl),
    title: dict.metadata.title,
    description: dict.metadata.description,
    keywords: dict.metadata.keywords,
    alternates: {
      canonical: locale === i18n.defaultLocale ? baseUrl : `${baseUrl}/${locale}`,
      languages,
    },
    openGraph: {
      title: dict.metadata.title,
      description: dict.metadata.description,
      url: locale === i18n.defaultLocale ? baseUrl : `${baseUrl}/${locale}`,
      siteName: "AURA Villas Bali",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "AURA Villas Bali",
        },
      ],
      locale: locale === 'es-ES' ? 'es_ES' : 'en_US',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.title,
      description: dict.metadata.description,
      images: ["/images/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!i18n.locales.includes(locale)) {
    notFound();
  }

  const dict = await getDictionary(locale);

  // Return only children wrapped with locale-specific components
  // The HTML structure is handled by the root layout
  return (
    <>
      <LanguageSetter locale={locale} />
      <ConditionalNavigation locale={locale} dictionary={dict} />
      {children}
      <Footer dictionary={dict} locale={locale} />
    </>
  );
}
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ConditionalNavigation } from "@/components/layout/ConditionalNavigation";
import { ScrollbarController } from "@/components/layout/ScrollbarController";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://auravillasbali.com'),
  title: "AURA Villas Bali - Creating Good Memories",
  description: "Life is all about creating good memories. Discover our exclusive collection of luxury villas where your story begins.",
  keywords: "luxury villas Bali, exclusive Bali villas, Uluwatu villas, Canggu villas, Seminyak villas, beachfront villas Bali, clifftop villas Bali, villa rental Bali, Bali memories",
  openGraph: {
    title: "AURA Villas Bali - Creating Good Memories",
    description: "Life is all about creating good memories. Book your perfect villa today.",
    url: "https://auravillasbali.com",
    siteName: "AURA Villas Bali",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AURA Villas Bali",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AURA Villas Bali - Creating Good Memories",
    description: "Life is all about creating good memories.",
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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <ConditionalNavigation />
        <ScrollbarController />
        {children}
      </body>
    </html>
  );
}
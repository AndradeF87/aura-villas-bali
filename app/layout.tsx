import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ScrollbarController } from "@/components/layout/ScrollbarController";

// For now, we'll use Google Fonts but with better optimization
// In production, consider downloading and serving fonts locally
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  weight: ['400', '600'],  // Only load necessary weights
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  weight: ['400', '700'],  // Only load necessary weights
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
  maximumScale: 5, // Allow zooming up to 5x for accessibility
  userScalable: 'yes', // Explicitly allow user scaling
};

const criticalCSS = `
  :root {
    --font-inter: 'Inter', system-ui, -apple-system, sans-serif;
    --font-playfair: 'Playfair Display', Georgia, serif;
    --sand-light: #F8F4F0;
    --sand: #E5D4C1;
    --terracotta: #C96F4A;
    --terracotta-dark: #B85A35;
    --deep-green: #2F4A3C;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
  body { font-family: var(--font-inter); background: var(--sand-light); color: var(--deep-green); }
  h1,h2,h3,h4,h5,h6 { font-family: var(--font-playfair); }
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ScrollbarController />
        {children}
      </body>
    </html>
  );
}
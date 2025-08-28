import { NextRequest, NextResponse } from 'next/server';
import { i18n } from '@/lib/i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if it's a crawler (for SEO best practices)
  const userAgent = request.headers.get('user-agent') || '';
  const isCrawler = /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|linkedinbot|whatsapp|slackbot/i.test(userAgent);
  
  // If crawler, let them access all versions without redirects
  if (isCrawler) {
    // For crawlers, rewrite paths to include locale internally
    const pathnameHasLocale = i18n.locales.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    
    if (!pathnameHasLocale) {
      return NextResponse.rewrite(new URL(`/${i18n.defaultLocale}${pathname}`, request.url));
    }
    return NextResponse.next();
  }

  // Check if pathname has a non-default locale (e.g., /es-ES)
  const nonDefaultLocales = i18n.locales.filter(locale => locale !== i18n.defaultLocale);
  const pathnameHasNonDefaultLocale = nonDefaultLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasNonDefaultLocale) {
    return NextResponse.next();
  }

  // Check if pathname incorrectly starts with default locale /en
  if (pathname.startsWith(`/${i18n.defaultLocale}/`) || pathname === `/${i18n.defaultLocale}`) {
    // Redirect from /en/* to /*
    const newPath = pathname.replace(`/${i18n.defaultLocale}`, '') || '/';
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }

  // For paths without any locale (which should use default English), 
  // rewrite internally to include the locale
  return NextResponse.rewrite(new URL(`/${i18n.defaultLocale}${pathname}`, request.url));
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, api)
    '/((?!api|_next/static|_next/image|favicon.ico|apple-icon.svg|icon.svg|sitemap.xml|robots.txt|images|animations|videos).*)',
  ],
};
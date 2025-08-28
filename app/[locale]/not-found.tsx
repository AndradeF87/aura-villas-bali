import Link from 'next/link';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { i18n, type Locale } from '@/lib/i18n/config';

export default async function NotFound({
  params = Promise.resolve({ locale: i18n.defaultLocale as Locale })
}: {
  params?: Promise<{ locale?: Locale }>
}) {
  const { locale = i18n.defaultLocale as Locale } = await params;
  const dict = await getDictionary(locale);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-light px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-9xl font-playfair font-bold text-terracotta mb-4">404</h1>
        <h2 className="text-3xl font-playfair text-deep-green mb-4">
          {locale === 'es-ES' ? 'Página no encontrada' : 'Page Not Found'}
        </h2>
        <p className="text-deep-green/70 mb-8">
          {locale === 'es-ES' 
            ? 'Lo sentimos, la página que buscas no existe o ha sido movida.'
            : 'Sorry, the page you are looking for doesn\'t exist or has been moved.'}
        </p>
        <Link 
          href={`/${locale === i18n.defaultLocale ? '' : locale}`}
          className="inline-block bg-terracotta text-white px-8 py-3 rounded hover:bg-terracotta-dark transition-colors"
        >
          {locale === 'es-ES' ? 'Volver al inicio' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
}
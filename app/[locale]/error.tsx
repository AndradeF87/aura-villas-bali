'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { type Locale } from '@/lib/i18n/config';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = (params?.locale || 'en') as Locale;
  
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-light px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-6xl font-playfair font-bold text-terracotta mb-4">
          {locale === 'es-ES' ? '¡Ups!' : 'Oops!'}
        </h1>
        <h2 className="text-2xl font-playfair text-deep-green mb-4">
          {locale === 'es-ES' ? 'Algo salió mal' : 'Something went wrong'}
        </h2>
        <p className="text-deep-green/70 mb-8">
          {locale === 'es-ES'
            ? 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.'
            : 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-terracotta text-white px-6 py-3 rounded hover:bg-terracotta-dark transition-colors"
          >
            {locale === 'es-ES' ? 'Reintentar' : 'Try Again'}
          </button>
          <Link
            href={`/${locale === 'en' ? '' : locale}`}
            className="bg-deep-green text-white px-6 py-3 rounded hover:bg-deep-green/90 transition-colors"
          >
            {locale === 'es-ES' ? 'Ir al inicio' : 'Go Home'}
          </Link>
        </div>
      </div>
    </div>
  );
}
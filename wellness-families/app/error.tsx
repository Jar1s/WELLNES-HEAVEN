'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname() || '/';
  const isEnglish = pathname.startsWith('/en');
  const homeHref = isEnglish ? '/en' : '/sk';

  useEffect(() => {
    console.error(error);
  }, [error]);

  const t = isEnglish
    ? {
        title: 'Something went wrong',
        description: 'Sorry for the inconvenience. Please try again later.',
        retry: 'Try again',
        back: 'Back to home page',
      }
    : {
        title: 'Niečo sa pokazilo',
        description: 'Ospravedlňujeme sa za nepríjemnosť. Skúste to znova neskôr.',
        retry: 'Skúsiť znova',
        back: 'Späť na hlavnú stránku',
      };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.title}</h2>
        <p className="text-gray-600 mb-8">{t.description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t.retry}
          </button>
          <Link
            href={homeHref}
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            {t.back}
          </Link>
        </div>
      </div>
    </div>
  );
}

import { MetadataRoute } from 'next';
import { LOCALES, toLocalizedPath } from '@/lib/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.wellnessheaven.sk';

  const paths = ['/', '/o-nas', '/sluzby', '/cennik', '/kontakt', '/galeria', '/rezervacia'];
  const now = new Date();
  const getChangeFrequency = (
    path: string,
  ): MetadataRoute.Sitemap[number]['changeFrequency'] => {
    if (path === '/sluzby') return 'weekly';
    if (path === '/rezervacia') return 'daily';
    return 'monthly';
  };

  const localized = LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: `${baseUrl}${toLocalizedPath(locale, path)}`,
      lastModified: now,
      changeFrequency: getChangeFrequency(path),
      priority: path === '/' ? 0.9 : path === '/rezervacia' ? 1 : path === '/kontakt' || path === '/galeria' ? 0.7 : 0.8,
    })),
  );

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...localized,
  ];
}



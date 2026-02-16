import type { Metadata } from 'next';
import Image from 'next/image';
import ReservationLink from '@/components/ReservationLink';
import { getBookioLang, isLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

type PricingItem = {
  title: string;
  subtitle?: string;
  duration: string;
  price: string;
  image: string;
  details?: string[];
};

type PageProps = {
  params: Promise<{ locale: string }>;
};

const valentinePackageImage = '/images/Photo 24.jpeg';

const pricingData: Record<Locale, PricingItem[]> = {
  sk: [
    {
      title: 'VALENTÍNSKY BALÍČEK',
      subtitle: 'PREMIUM (2 hod.) / max. 6 osôb',
      duration: '120 min',
      price: '120 €',
      image: valentinePackageImage,
      details: [
        '120 min romantického zážitku',
        'Valentínsky balíček s privátnymi izbami',
        'Privátna vírivka a sauna',
        'Privátne izby s romantickou výzdobou',
        'Fľaša Prosecca, sektu alebo vína',
        'Obložená syrová misa s ovocím',
        'Valentínsky darček',
      ],
    },
    {
      title: 'VALENTÍNSKY BALÍČEK',
      subtitle: 'EXCLUSIVE (3 hod.) / max. 6 osôb',
      duration: '180 min',
      price: '180 €',
      image: valentinePackageImage,
      details: [
        '180 min romantického zážitku',
        'Valentínsky balíček s privátnymi izbami',
        'Privátna vírivka a sauna',
        'Privátne izby s romantickou výzdobou',
        'Fľaša Prosecca, sektu alebo vína',
        'Obložená syrová misa s ovocím',
        'Valentínsky darček',
      ],
    },
    { title: 'PRIVÁTNA SAUNA', duration: '60 minút', price: '60 €', image: '/images/Photo 18.png' },
    { title: 'PRIVÁTNA SAUNA', duration: '120 minút', price: '80 €', image: '/images/Photo 18.png' },
    { title: 'PRIVÁTNY WELLNESS', subtitle: 'bez izby', duration: '120 minút', price: '100 €', image: '/images/Photo 12.png' },
    { title: 'PRIVÁTNY WELLNESS', subtitle: 's izbami • 2 osoby', duration: '120 minút', price: '150 €', image: '/images/Photo 23.png' },
    { title: 'PRIVÁTNY WELLNESS', subtitle: 's izbami • 2 osoby', duration: '180 minút', price: '200 €', image: '/images/Photo 23.png' },
    { title: 'PRIVÁTNY WELLNESS', subtitle: 's izbami • 2 osoby', duration: '240 minút', price: '250 €', image: '/images/Photo 23.png' },
    { title: 'WELLNESS ALL NIGHT', subtitle: '2 osoby', duration: '9 hodín', price: '200 €', image: '/images/Photo 17.png' },
    { title: 'WELLNESS ALL NIGHT', subtitle: '4 osoby', duration: '9 hodín', price: '300 €', image: '/images/Photo 16.png' },
    { title: 'WELLNESS ALL NIGHT', subtitle: '6 osôb', duration: '9 hodín', price: '400 €', image: '/images/Photo 15.png' },
    { title: 'WELLNESS ALL NIGHT PARTY', subtitle: '12 osôb', duration: '9 hodín', price: '500 €', image: '/images/Photo 14.png' },
    { title: 'PRÍVATNÁ IZBA', subtitle: '2 osoby • 1 izba', duration: '120 minút', price: '80 €', image: '/images/Photo 19.png' },
    { title: 'PRIVÁTNE IZBY', subtitle: '4 osoby • 2 izby', duration: '120 minút', price: '140 €', image: '/images/Photo 22.png' },
    { title: 'PRIVÁTNE IZBY', subtitle: '6 osôb • 3 izby', duration: '120 minút', price: '180 €', image: '/images/Photo 22.png' },
  ],
  en: [
    {
      title: 'VALENTINE PACKAGE',
      subtitle: 'PREMIUM (2h) / max. 6 persons',
      duration: '120 min',
      price: '120 €',
      image: valentinePackageImage,
      details: [
        '120 minutes of romantic wellness',
        'Valentine package with private rooms',
        'Private jacuzzi and sauna',
        'Private rooms with romantic decoration',
        'Bottle of Prosecco, sparkling wine, or wine',
        'Cheese platter with fruit',
        'Valentine gift',
      ],
    },
    {
      title: 'VALENTINE PACKAGE',
      subtitle: 'EXCLUSIVE (3h) / max. 6 persons',
      duration: '180 min',
      price: '180 €',
      image: valentinePackageImage,
      details: [
        '180 minutes of romantic wellness',
        'Valentine package with private rooms',
        'Private jacuzzi and sauna',
        'Private rooms with romantic decoration',
        'Bottle of Prosecco, sparkling wine, or wine',
        'Cheese platter with fruit',
        'Valentine gift',
      ],
    },
    { title: 'PRIVATE SAUNA', duration: '60 min', price: '60 €', image: '/images/Photo 18.png' },
    { title: 'PRIVATE SAUNA', duration: '120 min', price: '80 €', image: '/images/Photo 18.png' },
    { title: 'PRIVATE WELLNESS', subtitle: 'without room', duration: '120 min', price: '100 €', image: '/images/Photo 12.png' },
    { title: 'PRIVATE WELLNESS', subtitle: 'with rooms • 2 persons', duration: '120 min', price: '150 €', image: '/images/Photo 23.png' },
    { title: 'PRIVATE WELLNESS', subtitle: 'with rooms • 2 persons', duration: '180 min', price: '200 €', image: '/images/Photo 23.png' },
    { title: 'PRIVATE WELLNESS', subtitle: 'with rooms • 2 persons', duration: '240 min', price: '250 €', image: '/images/Photo 23.png' },
    { title: 'WELLNESS ALL NIGHT', subtitle: '2 persons', duration: '9 hours', price: '200 €', image: '/images/Photo 17.png' },
    { title: 'WELLNESS ALL NIGHT', subtitle: '4 persons', duration: '9 hours', price: '300 €', image: '/images/Photo 16.png' },
    { title: 'WELLNESS ALL NIGHT', subtitle: '6 persons', duration: '9 hours', price: '400 €', image: '/images/Photo 15.png' },
    { title: 'WELLNESS ALL NIGHT PARTY', subtitle: '12 persons', duration: '9 hours', price: '500 €', image: '/images/Photo 14.png' },
    { title: 'PRIVATE ROOM', subtitle: '2 persons • 1 room', duration: '120 min', price: '80 €', image: '/images/Photo 19.png' },
    { title: 'PRIVATE ROOMS', subtitle: '4 persons • 2 rooms', duration: '120 min', price: '140 €', image: '/images/Photo 22.png' },
    { title: 'PRIVATE ROOMS', subtitle: '6 persons • 3 rooms', duration: '120 min', price: '180 €', image: '/images/Photo 22.png' },
  ],
};

const metadataByLocale: Record<Locale, Metadata> = {
  sk: {
    title: 'Cenník - Wellness Heaven | Ceny služieb',
    description: 'Ceny našich wellness služieb v Bratislave.',
  },
  en: {
    title: 'Pricing - Wellness Heaven | Service Prices',
    description: 'Prices of our wellness services in Bratislava.',
  },
};

const copy = {
  sk: {
    title: 'Ceny našich služieb',
    reserve: 'Rezervovať',
  },
  en: {
    title: 'Prices of Our Services',
    reserve: 'Book now',
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return metadataByLocale.sk;
  return metadataByLocale[locale];
}

export default async function CennikLocalizedPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const t = copy[locale];
  const pricing = pricingData[locale];
  const bookiaLink = `https://services.bookio.com/wellness-heaven/widget?lang=${getBookioLang(locale)}`;

  return (
    <div className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32 bg-[#faf9f7] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
            {t.title}
          </h1>
          <div className="w-24 h-1 bg-[#6bb8ff] mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {pricing.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#e8e6e3] flex flex-col"
              >
                <div className="relative h-48 sm:h-56 w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    loading={index < 2 ? 'eager' : 'lazy'}
                    priority={index < 2}
                  />
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1 gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-h-[60px] flex flex-col justify-start">
                      <h3 className="text-xl font-display font-bold text-[#2c2c2c]">{item.title}</h3>
                      {item.subtitle && <p className="text-sm text-[#6b6b6b]">{item.subtitle}</p>}
                    </div>
                    <span className="text-sm text-[#6b6b6b] whitespace-nowrap pt-1">{item.duration}</span>
                  </div>
                  {item.details && (
                    <ul className="space-y-1 text-sm text-[#6b6b6b]">
                      {item.details.map((detail, detailIndex) => (
                        <li key={`${item.title}-detail-${detailIndex}`} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#6bb8ff]"></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-auto space-y-3">
                    <div className="flex items-start justify-center">
                      <div
                        className={`font-display font-bold text-[#6bb8ff] text-center min-h-[44px] flex items-center justify-center ${
                          item.price.length > 10 ? 'text-xl' : 'text-3xl'
                        }`}
                      >
                        {item.price}
                      </div>
                    </div>
                    <ReservationLink
                      href={bookiaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full bg-[#6bb8ff] text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-[#4d9be0] transition-all shadow-md hover:shadow-lg hover:scale-105 min-h-[44px] flex items-center justify-center touch-manipulation"
                    >
                      {t.reserve}
                    </ReservationLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

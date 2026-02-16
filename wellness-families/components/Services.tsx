import Link from 'next/link';
import Image from 'next/image';
import { DEFAULT_LOCALE, toLocalizedPath, type Locale } from '@/lib/i18n';

interface Service {
  title: string;
  description: string;
  image: string;
}

type ServicesProps = {
  locale?: Locale;
};

const serviceData: Record<Locale, Service[]> = {
  sk: [
    {
      title: 'Privátny Wellness',
      description:
        'Navštívte našu wellness časť, zrelaxujte telo, oddýchnite si od stresu a načerpajte novú energiu.',
      image: '/images/Photo 15.png',
    },
    {
      title: 'Privátna sauna',
      description:
        'Doprajte si nerušený relax v našej súkromnej fínskej saune, ktorá ponúka ideálne podmienky na regeneráciu tela aj mysle.',
      image: '/images/Photo 16.png',
    },
    {
      title: 'Relaxačná miestnosť',
      description:
        'Vstúpte do priestoru pokoja, kde sa zastavuje čas. Relaxačná miestnosť je ideálnym miestom na odpočinok po saune, masáži alebo náročnom dni.',
      image: '/images/Photo 21.png',
    },
    {
      title: 'Uvoľnenie pri masáži',
      description:
        'Nechajte si chvíľku iba pre seba a doprajte si masáž, uvoľnite stuhnuté svaly a zrelaxujte telo. Vyberte si niektorú z našich masáži, ktoré Vám ponúkame.',
      image: '/images/Photo 19.png',
    },
  ],
  en: [
    {
      title: 'Private Wellness',
      description:
        'Visit our private wellness area, relax your body, switch off from stress, and recharge your energy.',
      image: '/images/Photo 15.png',
    },
    {
      title: 'Private Sauna',
      description:
        'Enjoy uninterrupted relaxation in our private Finnish sauna with ideal conditions for body and mind recovery.',
      image: '/images/Photo 16.png',
    },
    {
      title: 'Relax Room',
      description:
        'Step into a calm zone where time slows down. Our relax room is the perfect place to rest after sauna, massage, or a busy day.',
      image: '/images/Photo 21.png',
    },
    {
      title: 'Massage Relaxation',
      description:
        'Take a moment for yourself with a massage, release tension, and deeply relax. Choose from our range of massage treatments.',
      image: '/images/Photo 19.png',
    },
  ],
};

const copy = {
  sk: {
    kicker: 'Naše služby',
    title: 'Služby, ktoré vám ponúkame',
    cta: 'Zobraziť cenník',
  },
  en: {
    kicker: 'Our services',
    title: 'Services we offer',
    cta: 'View pricing',
  },
} as const;

export default function Services({ locale = DEFAULT_LOCALE }: ServicesProps) {
  const t = copy[locale];
  const services = serviceData[locale];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="text-[#6bb8ff] text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
            {t.kicker}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
            {t.title}
          </h2>
          <div className="w-24 h-1 bg-[#6bb8ff] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 md:mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-black ${
                index % 2 === 0 ? 'lg:mt-0' : 'lg:mt-8 xl:mt-16'
              }`}
            >
              <div className="relative h-full min-h-[420px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[560px]">
                <Image
                  key={`${service.title}-${service.image}`}
                  src={service.image}
                  alt={service.title}
                  fill
                  className={`object-cover transition-transform duration-700 ${
                    index === 0 ? 'scale-[1.12] group-hover:scale-[1.18]' : 'group-hover:scale-110'
                  }`}
                  style={index === 0 ? { objectPosition: 'center' } : undefined}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent"></div>
                <div className="absolute inset-0 flex items-end">
                  <div className="p-6 sm:p-8 lg:p-10 text-white w-full text-center lg:text-left">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-3 sm:mb-4 drop-shadow-lg">
                      {service.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-base sm:text-lg mb-4 sm:mb-6">
                      {service.description}
                    </p>
                    <div className="w-16 h-1 bg-[#6bb8ff] mx-auto lg:mx-0"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href={toLocalizedPath(locale, '/cennik')}
            className="inline-block bg-[#6bb8ff] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#4d9be0] transition-all shadow-xl hover:shadow-2xl hover:scale-105 min-h-[44px] flex items-center justify-center touch-manipulation"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

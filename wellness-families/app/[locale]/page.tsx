import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Image from 'next/image';
import Link from 'next/link';
import { isLocale, toLocalizedPath, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ locale: string }>;
};

const metaByLocale: Record<Locale, Metadata> = {
  sk: {
    title: 'Wellness Heaven - Privátny Wellness | Bratislava',
    description:
      'Privátny wellness v Bratislave – Ružinov. Súkromný wellness pre dvoch alebo partiu priateľov. Sauna, masáže, vírivka.',
  },
  en: {
    title: 'Wellness Heaven - Private Wellness | Bratislava',
    description:
      'Private wellness in Bratislava – Ruzinov. Private spa for couples or groups of friends. Sauna, massages and jacuzzi.',
  },
};

const copy = {
  sk: {
    aboutKicker: 'O nás',
    aboutTitleStart: 'Kam v Bratislave za',
    aboutTitleAccent: 'oddychom',
    aboutText1:
      'Ponúkame súkromný wellness pre dvoch alebo partiu priateľov. Nie sme ako ostatné hromadné alebo hotelové wellness. Sme privátny wellness kde sa zameriavame na každého jednotlivého zákazníka behom procedúr ako saunovanie, masáže alebo kúpanie vo vírivke.',
    aboutText2:
      'Sme súkromný wellness, kde nestretnete hromadu ľudí, ale stredom pozornosti budete iba Vy!',
    learnMore: 'Zistiť viac →',
    partyKicker: 'Party noc',
    partyTitleStart: 'Noc len pre vašu',
    partyTitleAccent: 'partiu',
    partyText1:
      'Súkromná vírivka, sauna a relax zóna len pre vás – ideálne pre narodeniny, rozlúčku so slobodou alebo večer s priateľmi. Žiadni cudzí hostia, len vaša atmosféra.',
    partyText2:
      'Radi pripravíme priestor, poradíme s občerstvením a hudbou. Užite si celú noc bez časového stresu.',
    giftKicker: 'Darčekové poukážky',
    giftTitle: 'Venujte svojim blízkym oddych',
    giftText:
      'Darujte im niektorú zo širokej možností našich darčekových poukážok. Detaily zistíte u nás na recepcii.',
    contactUs: 'Kontaktujte nás',
  },
  en: {
    aboutKicker: 'About us',
    aboutTitleStart: 'Where to find',
    aboutTitleAccent: 'real relaxation',
    aboutText1:
      'We offer private wellness for couples or groups of friends. Unlike hotel or crowded spas, our private concept focuses on each guest individually during sauna sessions, massage treatments, and jacuzzi relaxation.',
    aboutText2:
      'No crowds, no noise. In our private wellness, the focus is entirely on you.',
    learnMore: 'Learn more →',
    partyKicker: 'Party night',
    partyTitleStart: 'A full night for your',
    partyTitleAccent: 'group',
    partyText1:
      'Private jacuzzi, sauna and relax zone only for you. Perfect for birthdays, bachelor/bachelorette celebrations, or an evening with friends.',
    partyText2:
      'We can help prepare the setup, refreshments and music so you can enjoy the whole night without stress.',
    giftKicker: 'Gift vouchers',
    giftTitle: 'Give your loved ones a moment of rest',
    giftText:
      'Choose from our wide range of gift vouchers and give an unforgettable wellness experience. Details are available at reception.',
    contactUs: 'Contact us',
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return metaByLocale.sk;
  return metaByLocale[locale];
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  const t = copy[locale];

  return (
    <>
      <Hero locale={locale} />

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#faf9f7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/Photo 11.png"
                alt="Wellness"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            </div>
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start gap-6">
              <p className="text-[#6bb8ff] text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
                {t.aboutKicker}
              </p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c]"
                style={{ fontVariantLigatures: 'none', fontFeatureSettings: '"liga" 0, "clig" 0' }}
              >
                {t.aboutTitleStart}{' '}
                <span className="text-[#6bb8ff] underline underline-offset-8 decoration-[#6bb8ff] decoration-4">
                  {t.aboutTitleAccent}
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">{t.aboutText1}</p>
              <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">{t.aboutText2}</p>
              <Link
                href={toLocalizedPath(locale, '/o-nas')}
                className="inline-flex items-center gap-2 justify-center text-[#2c2c2c] hover:text-[#4d9be0] transition-colors font-semibold min-h-[44px] border-b-2 border-[#6bb8ff] pb-1 mx-auto lg:mx-0"
              >
                {t.learnMore}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start gap-6">
              <p className="text-[#6bb8ff] text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
                {t.partyKicker}
              </p>
              <h2 className="text-3xl sm:4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
                {t.partyTitleStart}{' '}
                <span className="text-[#6bb8ff] underline underline-offset-8 decoration-[#6bb8ff] decoration-4">
                  {t.partyTitleAccent}
                </span>
              </h2>
              <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">{t.partyText1}</p>
              <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">{t.partyText2}</p>
              <Link
                href={toLocalizedPath(locale, '/cennik')}
                className="inline-flex items-center gap-2 justify-center text-[#2c2c2c] hover:text-[#4d9be0] transition-colors font-semibold min-h-[44px] border-b-2 border-[#6bb8ff] pb-1 mx-auto lg:mx-0"
              >
                {t.learnMore}
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/Photo 14.png"
                alt="Party night at wellness"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <Services locale={locale} />

      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-[#6bb8ff] to-[#4d9be0] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-white rounded-full -mr-32 sm:-mr-40 lg:-mr-48 -mt-32 sm:-mt-40 lg:-mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-white rounded-full -ml-32 sm:-ml-40 lg:-ml-48 -mb-32 sm:-mb-40 lg:-mb-48"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white/80 text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
              {t.giftKicker}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6">
              {t.giftTitle}
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed">{t.giftText}</p>
            <Link
              href={toLocalizedPath(locale, '/kontakt')}
              className="inline-block bg-[#f5f5f5] text-black !text-black hover:!text-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#ededed] transition-all shadow-xl hover:shadow-2xl hover:scale-105 min-h-[44px] flex items-center justify-center touch-manipulation border border-[#4d9be0]/25"
              style={{ color: '#000' }}
            >
              {t.contactUs}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

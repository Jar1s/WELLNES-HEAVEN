import { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, toLocalizedPath, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ locale: string }>;
};

const metadataByLocale: Record<Locale, Metadata> = {
  sk: {
    title: 'Rezervácia - Wellness Heaven | Online rezervácia',
    description:
      'Rezervujte si návštevu v našom privátnom wellness centre. Online rezervácia cez Bookia.',
  },
  en: {
    title: 'Reservation - Wellness Heaven | Online Booking',
    description:
      'Book your visit to our private wellness center. Online booking via Bookio.',
  },
};

const copy = {
  sk: {
    kicker: 'Rezervácia',
    title: 'Rezervujte si návštevu',
    subtitle: 'Vyberte si dátum a čas pre vašu návštevu',
    notice:
      'Online rezervačný systém je dočasne nedostupný. Rezervujte prosím cez náš kontaktný formulár alebo email.',
    emailLabel: 'Email:',
    addressLabel: 'Adresa:',
    contactUs: 'Kontaktovať nás',
  },
  en: {
    kicker: 'Reservation',
    title: 'Book your visit',
    subtitle: 'Choose the date and time for your visit',
    notice:
      'The online booking system is temporarily unavailable. Please book through our contact form or by email.',
    emailLabel: 'Email:',
    addressLabel: 'Address:',
    contactUs: 'Contact us',
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return metadataByLocale.sk;
  return metadataByLocale[locale];
}

export default async function RezervaciaLocalizedPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = copy[locale];

  return (
    <div className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32 bg-[#faf9f7] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#6bb8ff] text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
            {t.kicker}
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
            {t.title}
          </h1>
          <div className="w-24 h-1 bg-[#6bb8ff] mx-auto mb-3 sm:mb-4"></div>
          <p className="text-lg sm:text-xl text-[#6b6b6b]">{t.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-[#e8e6e3] text-center space-y-6">
          <p className="text-lg sm:text-xl text-[#6b6b6b] leading-relaxed">{t.notice}</p>
          <div className="space-y-3 text-[#2c2c2c] text-base sm:text-lg">
            <p className="font-semibold">
              {t.emailLabel}{' '}
              <a className="text-[#6bb8ff] hover:text-[#4d9be0]" href="mailto:wellnessheavensk@gmail.com">
                wellnessheavensk@gmail.com
              </a>
            </p>
            <p className="text-[#6b6b6b]">
              {t.addressLabel} Tomášikova 26, 821 01 Bratislava
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4">
            <Link
              href={toLocalizedPath(locale, '/kontakt')}
              className="inline-block bg-[#6bb8ff] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#4d9be0] transition-all shadow-xl hover:shadow-2xl hover:scale-105 min-h-[44px] flex items-center justify-center touch-manipulation"
            >
              {t.contactUs}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

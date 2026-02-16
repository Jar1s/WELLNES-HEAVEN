import { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, toLocalizedPath, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ locale: string }>;
};

const metadataByLocale: Record<Locale, Metadata> = {
  sk: {
    title: 'O nás - Wellness Heaven | Privátny Wellness Bratislava',
    description:
      'Poznajte Wellness Heaven – súkromný wellness v Bratislave. Súkromné prostredie, individuálny prístup a profesionálny personál.',
  },
  en: {
    title: 'About Us - Wellness Heaven | Private Wellness Bratislava',
    description:
      'Get to know Wellness Heaven - private wellness in Bratislava. Private environment, personal approach and professional staff.',
  },
};

const copy = {
  sk: {
    title: 'Poznajte Wellness Heaven',
    sectionTitle: 'Privátny Wellness',
    p1: 'Vitajte v Wellness Heaven – súkromnom wellness centre v Bratislave. Ponúkame súkromný wellness pre dvoch alebo partiu priateľov. Nie sme ako ostatné hromadné alebo hotelové wellness.',
    p2: 'Sme privátny wellness, kde sa zameriavame na každého jednotlivého zákazníka behom procedúr ako saunovanie, masáže alebo kúpanie vo vírivke.',
    p3: 'Sme súkromný wellness, kde nestretnete hromadu ľudí, ale stredom pozornosti budete iba Vy!',
    mission: 'Naša misia',
    missionText:
      'Poskytovať bezpečné a príjemné wellness prostredie, kde si môžete užiť kvalitný čas a načerpať novú energiu.',
    whyUs: 'Prečo my',
    whyUsText:
      'Súkromné prostredie, individuálny prístup a profesionálny personál, ktorý rozumie vašim potrebám.',
    cta: 'Rezervovať návštevu',
  },
  en: {
    title: 'Get to Know Wellness Heaven',
    sectionTitle: 'Private Wellness',
    p1: 'Welcome to Wellness Heaven - a private wellness center in Bratislava. We offer private wellness for couples or groups of friends. We are different from crowded public or hotel spas.',
    p2: 'Our concept focuses on each guest individually during sauna sessions, massage treatments, and jacuzzi relaxation.',
    p3: 'No crowds, no distractions. In our private wellness, the focus is on you.',
    mission: 'Our Mission',
    missionText:
      'To provide a safe and pleasant wellness environment where you can enjoy quality time and recharge your energy.',
    whyUs: 'Why Us',
    whyUsText:
      'Private atmosphere, personal approach, and professional staff that understands your needs.',
    cta: 'Book a visit',
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return metadataByLocale.sk;
  return metadataByLocale[locale];
}

export default async function ONasLocalizedPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  const t = copy[locale];

  return (
    <div className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32 bg-[#faf9f7] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
              {t.title}
            </h1>
            <div className="w-24 h-1 bg-[#6bb8ff] mx-auto"></div>
          </div>

          <div className="space-y-8 sm:space-y-12">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-[#e8e6e3] text-center">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
                {t.sectionTitle}
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">{t.p1}</p>
                <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">{t.p2}</p>
                <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">{t.p3}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-[#e8e6e3] text-center">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#2c2c2c] mb-3 sm:mb-4">
                  {t.mission}
                </h3>
                <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">{t.missionText}</p>
              </div>
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-[#e8e6e3] text-center">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#2c2c2c] mb-3 sm:mb-4">
                  {t.whyUs}
                </h3>
                <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">{t.whyUsText}</p>
              </div>
            </div>

            <div className="text-center pt-8">
              <Link
                href={toLocalizedPath(locale, '/rezervacia')}
                className="inline-block bg-[#6bb8ff] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#4d9be0] transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                {t.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

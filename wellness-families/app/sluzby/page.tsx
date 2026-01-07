import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Služby - Wellness Heaven | Wellness Bratislava',
  description: 'Ponúkame privátny wellness, súkromnú saunu, relaxačnú miestnosť a masáže v Bratislave.',
};

const services = [
  {
    title: 'Privátny Wellness',
    description: 'Navštívte našu wellness časť, zrelaxujte telo, oddýchnite si od stresu a načerpajte novú energiu.',
    image: '/images/new-photos/photo-01.jpg',
    features: [
      'Súkromný priestor',
      'Vírivka',
      'Relaxačné zóny',
      'Privátne prostredie',
    ],
  },
  {
    title: 'Privátna sauna',
    description: 'Doprajte si nerušený relax v našej súkromnej fínskej saune, ktorá ponúka ideálne podmienky na regeneráciu tela aj mysle.',
    image: '/images/photo-4.png',
    features: [
      'Fínska sauna',
      'Súkromný priestor',
      'Ideálna teplota',
      'Regeneračný efekt',
    ],
  },
  {
    title: 'Relaxačná miestnosť',
    description: 'Vstúpte do priestoru pokoja, kde sa zastavuje čas. Relaxačná miestnosť je ideálnym miestom na odpočinok po saune, masáži alebo náročnom dni.',
    image: '/images/photo-3.png',
    features: [
      'Pohodlné ležadlá',
      'Tichá zóna',
      'Relaxačná atmosféra',
      'Privátne prostredie',
    ],
  },
  {
    title: 'Uvoľnenie pri masáži',
    description: 'Nechajte si chvíľku iba pre seba a doprajte si masáž, uvoľnite stuhnuté svaly a zrelaxujte telo. Vyberte si niektorú z našich masáži, ktoré Vám ponúkame.',
    image: '/images/photo-13.png',
    features: [
      'Relaxačné masáže',
      'Terapeutické masáže',
      'Aromaterapia',
      'Skúsení maséri',
    ],
  },
];

export default function SluzbyPage() {
  return (
    <div className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32 bg-[#faf9f7] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#c97d60] text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
            Naše služby
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
            Služby, ktoré vám ponúkame
          </h1>
          <div className="w-24 h-1 bg-[#c97d60] mx-auto"></div>
        </div>

        <div className="space-y-12 sm:space-y-16 mb-12 sm:mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden ${
                index % 2 === 0 ? '' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${
                index % 2 === 0 ? '' : 'md:flex-row-reverse'
              }`}>
                <div className="relative h-full min-h-[280px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover object-center w-full h-full"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
                    {service.title}
                  </h2>
                  <p className="text-base sm:text-lg text-[#6b6b6b] mb-6 sm:mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 gap-3 sm:gap-4">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-[#2c2c2c]">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#c97d60] mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium text-sm sm:text-base">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link
            href="/cennik"
            className="inline-block bg-[#c97d60] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#b86a4d] transition-all shadow-xl hover:shadow-2xl hover:scale-105 min-h-[44px] flex items-center justify-center touch-manipulation w-full sm:w-auto"
          >
            Zobraziť cenník
          </Link>
          <Link
            href="/rezervacia"
            className="inline-block bg-transparent text-[#2c2c2c] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#f5f3f0] transition-all border-2 border-[#2c2c2c] min-h-[44px] flex items-center justify-center touch-manipulation w-full sm:w-auto"
          >
            Rezervovať teraz
          </Link>
        </div>
      </div>
    </div>
  );
}

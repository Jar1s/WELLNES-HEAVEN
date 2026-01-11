import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'O nás - Wellness Heaven | Privátny Wellness Bratislava',
  description: 'Poznajte Wellness Heaven – súkromný wellness v Bratislave. Súkromné prostredie, individuálny prístup a profesionálny personál.',
};

export default function ONasPage() {
  return (
    <div className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32 bg-[#faf9f7] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
              Poznajte Wellness Heaven
            </h1>
            <div className="w-24 h-1 bg-[#6bb8ff] mx-auto"></div>
          </div>

          <div className="space-y-8 sm:space-y-12">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg border border-[#e8e6e3] text-center">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
                Privátny Wellness
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">
                  Vitajte v Wellness Heaven – súkromnom wellness centre v Bratislave. 
                  Ponúkame súkromný wellness pre dvoch alebo partiu priateľov. 
                  Nie sme ako ostatné hromadné alebo hotelové wellness.
                </p>
                <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">
                  Sme privátny wellness, kde sa zameriavame na každého jednotlivého 
                  zákazníka behom procedúr ako saunovanie, masáže alebo kúpanie vo vírivke.
                </p>
                <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">
                  Sme súkromný wellness, kde nestretnete hromadu ľudí, ale stredom 
                  pozornosti budete iba Vy!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-[#e8e6e3] text-center">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#2c2c2c] mb-3 sm:mb-4">
                  Naša misia
                </h3>
                <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">
                  Poskytovať bezpečné a príjemné wellness prostredie, 
                  kde si môžete užiť kvalitný čas a načerpať novú energiu.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-[#e8e6e3] text-center">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-[#2c2c2c] mb-3 sm:mb-4">
                  Prečo my
                </h3>
                <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed">
                  Súkromné prostredie, individuálny prístup a profesionálny personál, 
                  ktorý rozumie vašim potrebám.
                </p>
              </div>
            </div>

            <div className="text-center pt-8">
              <Link
                href="/rezervacia"
                className="inline-block bg-[#6bb8ff] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#4d9be0] transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Rezervovať návštevu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

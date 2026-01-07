import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Rezervácia - Wellness Heaven | Online rezervácia',
  description: 'Rezervujte si návštevu v našom privátnom wellness centre. Online rezervácia cez Bookia.',
};

export default function RezervaciaPage() {
  return (
    <div className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32 bg-[#faf9f7] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#c97d60] text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
            Rezervácia
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
            Rezervujte si návštevu
          </h1>
          <div className="w-24 h-1 bg-[#c97d60] mx-auto mb-3 sm:mb-4"></div>
          <p className="text-lg sm:text-xl text-[#6b6b6b]">
            Vyberte si dátum a čas pre vašu návštevu
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 sm:p-10 border border-[#e8e6e3] text-center space-y-6">
          <p className="text-lg sm:text-xl text-[#6b6b6b] leading-relaxed">
            Online rezervačný systém je dočasne nedostupný. Rezervujte prosím cez náš kontaktný formulár alebo email.
          </p>
          <div className="space-y-3 text-[#2c2c2c] text-base sm:text-lg">
            <p className="font-semibold">Email: <a className="text-[#c97d60] hover:text-[#b86a4d]" href="mailto:inforuzinov@wellmass.sk">inforuzinov@wellmass.sk</a></p>
            <p className="text-[#6b6b6b]">Adresa: Tomášikova, 821 01 Bratislava</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4">
            <Link
              href="/kontakt"
              className="inline-block bg-[#c97d60] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#b86a4d] transition-all shadow-xl hover:shadow-2xl hover:scale-105 min-h-[44px] flex items-center justify-center touch-manipulation"
            >
              Kontaktovať nás
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

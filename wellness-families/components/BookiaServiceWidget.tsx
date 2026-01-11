'use client';

import Link from 'next/link';

export default function BookiaServiceWidget() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#e8e6e3] p-8 sm:p-12">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-[#6bb8ff]/10 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-[#6bb8ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-[#2c2c2c] mb-4">
            Online rezervácia
          </h3>
          <p className="text-lg text-[#6b6b6b] mb-8 max-w-2xl mx-auto">
            Rezervujte si návštevu v našom privátnom wellness centre. 
            Vyberte si dátum, čas a službu, ktorú si chcete rezervovať.
          </p>
        </div>
        
        <div className="space-y-4 mb-8">
          <Link
            href="/kontakt"
            className="inline-block bg-[#6bb8ff] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#4d9be0] transition-all shadow-xl hover:shadow-2xl hover:scale-105 w-full sm:w-auto min-h-[44px] flex items-center justify-center touch-manipulation"
          >
            Kontaktovať pre rezerváciu
          </Link>
        </div>
        
        <div className="bg-[#faf9f7] rounded-xl p-6 border border-[#e8e6e3]">
          <p className="text-sm text-[#6b6b6b] mb-2">
            <strong className="text-[#2c2c2c]">Poznámka:</strong> Online rezervačný systém dočasne nefunguje.
          </p>
          <p className="text-sm text-[#6b6b6b]">
            Rezervujte prosím cez kontaktný formulár alebo email/telefonát na stránke Kontakt.
          </p>
        </div>
      </div>
    </div>
  );
}

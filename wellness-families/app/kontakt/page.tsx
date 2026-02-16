import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt - Wellness Heaven | Kontaktné informácie',
  description: 'Kontaktujte nás na adrese Tomášikova 26, 821 01 Bratislava alebo na telefónnom čísle +421 952 594 945. Otváracie hodiny: Po-Pi 11:00-22:00, So-Ne 10:00-22:00.',
};

export default function KontaktPage() {
  return (
    <div className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32 bg-[#faf9f7] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
            Kontaktné informácie
          </h1>
          <div className="w-24 h-1 bg-[#6bb8ff] mx-auto mb-3 sm:mb-4"></div>
          <p className="text-lg sm:text-xl text-[#6b6b6b] mb-2">
            Príďte nás navštíviť, radi vás privítame.
          </p>
          <p className="text-base sm:text-lg text-[#6bb8ff] italic font-display">
            Lepšie raz vidieť ako sto krát počuť.
          </p>
        </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 md:p-12 border border-[#e8e6e3] text-center space-y-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#2c2c2c] mb-6 sm:mb-8">
              Kde nás nájdete
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <p className="text-[#2c2c2c] font-semibold text-sm sm:text-base">Adresa</p>
                <p className="text-[#6b6b6b] text-sm sm:text-base">Tomášikova 26</p>
                <p className="text-[#6b6b6b] text-sm sm:text-base">821 01 Bratislava</p>
                <p className="text-[#9b9b9b] text-xs sm:text-sm mt-1">GPS: 48.16305153436385, 17.158939429418787</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-[#2c2c2c] font-semibold text-sm sm:text-base">Email</p>
                <a href="mailto:wellnessheavensk@gmail.com" className="text-[#6bb8ff] hover:text-[#4d9be0] transition-colors font-medium text-sm sm:text-base break-all">
                  wellnessheavensk@gmail.com
                </a>
              </div>

              <div className="space-y-2">
                <p className="text-[#2c2c2c] font-semibold text-sm sm:text-base">Telefón</p>
                <a href="tel:+421952594945" className="text-[#6bb8ff] hover:text-[#4d9be0] transition-colors font-medium text-sm sm:text-base">
                  +421 952 594 945
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 md:p-12 border border-[#e8e6e3] text-center space-y-4">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#2c2c2c] mb-6 sm:mb-8">
              Otváracie hodiny
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="pb-4 sm:pb-6 border-b border-[#e8e6e3]">
                <p className="text-[#6b6b6b] font-medium mb-2 text-sm sm:text-base">Pondelok – Piatok</p>
                <p className="text-[#2c2c2c] text-xl sm:text-2xl font-display font-bold">11:00 – 22:00</p>
              </div>
              <div>
                <p className="text-[#6b6b6b] font-medium mb-2 text-sm sm:text-base">Sobota – Nedeľa</p>
                <p className="text-[#2c2c2c] text-xl sm:text-2xl font-display font-bold">10:00 – 22:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="max-w-5xl mx-auto mb-8 sm:mb-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#e8e6e3]">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6 p-6 sm:p-8 md:p-10 pb-0">
              Poloha
            </h2>
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
              <iframe
                src="https://www.google.com/maps?q=48.16305153436385,17.158939429418787&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Wellness Heaven - Tomášikova, Bratislava"
              ></iframe>
            </div>
            <div className="p-6 sm:p-8 md:p-10 pt-4 sm:pt-6">
              <a
                href="https://www.google.com/maps/search/?api=1&query=48.16305153436385,17.158939429418787"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#6bb8ff] hover:text-[#4d9be0] transition-colors font-medium text-sm sm:text-base min-h-[44px] touch-manipulation"
              >
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Otvoriť v Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border border-[#e8e6e3]">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[#2c2c2c] mb-6 sm:mb-8 text-center">
            Sledujte nás
          </h2>
          <div className="flex justify-center space-x-6 sm:space-x-8">
            <a
              href="https://www.facebook.com/wellnessheavensk"
              className="text-[#6b6b6b] hover:text-[#6bb8ff] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Facebook</span>
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/wellnessheavensk/"
              className="text-[#6b6b6b] hover:text-[#6bb8ff] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">Instagram</span>
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

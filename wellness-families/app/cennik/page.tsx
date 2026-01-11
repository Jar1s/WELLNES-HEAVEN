import Link from 'next/link';

const pricing = [
  { title: 'Izba', duration: '120 min', price: '80 €' },
  { title: 'Wellness bez izby', duration: '120 min', price: '100 €' },
  { title: 'Komplet', duration: '120 min', price: '150 €' },
  { title: 'Komplet', duration: '180 min', price: '200 €' },
  { title: 'Komplet', duration: '240 min', price: '250 €' },
  { title: 'Celá noc 2 os', duration: '9 h', price: '200 €' },
  { title: 'Celá noc 4 os', duration: '9 h', price: '300 €' },
  { title: 'Celá noc 6 os', duration: '9 h', price: '400 €' },
  { title: 'Celá noc party', duration: '9 h', price: '500 €' },
  { title: 'Izba', duration: '60 min', price: '50 €' },
];

export default function CennikPage() {
  return (
    <div className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32 bg-[#faf9f7] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
            Ceny našich služieb
          </h1>
          <div className="w-24 h-1 bg-[#6bb8ff] mx-auto"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 sm:mb-12 border border-[#e8e6e3] text-center">
            <p className="text-[#6b6b6b] text-base sm:text-lg leading-relaxed">
              Zapožičanie plachty a uteráku v cene.
              Osušku a župan vám radi zapožičiame za 1,5€, resp. 2,5€.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-[#e8e6e3]">
            <ul className="divide-y divide-[#e8e6e3]">
              {pricing.map((item, index) => (
                <li key={index} className="py-4 sm:py-5 flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-lg sm:text-xl font-display text-[#2c2c2c]">{item.title}</div>
                    <p className="text-[#6b6b6b] text-sm sm:text-base">{item.duration}</p>
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-[#6bb8ff]">{item.price}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center mt-10">
            <Link
              href="/rezervacia"
              className="inline-block bg-[#6bb8ff] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#4d9be0] transition-all shadow-xl hover:shadow-2xl hover:scale-105 min-h-[44px] flex items-center justify-center touch-manipulation w-full sm:w-auto"
            >
              Rezervovať teraz
            </Link>
            <Link
              href="/kontakt"
              className="inline-block bg-transparent text-[#2c2c2c] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#f5f3f0] transition-all border-2 border-[#2c2c2c] min-h-[44px] flex items-center justify-center touch-manipulation w-full sm:w-auto"
            >
              Kontaktovať nás
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

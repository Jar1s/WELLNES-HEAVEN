import Link from 'next/link';
import Image from 'next/image';

const pricing = [
  { title: 'Izba', duration: '120 min', price: '80 €', image: '/images/Photo 3.png' },
  { title: 'Wellness bez izby', duration: '120 min', price: '100 €', image: '/images/Photo 12.png' },
  { title: 'Komplet', duration: '120 min', price: '150 €', image: '/images/Photo 11.png' },
  { title: 'Komplet', duration: '180 min', price: '200 €', image: '/images/Photo 11.png' },
  { title: 'Komplet', duration: '240 min', price: '250 €', image: '/images/Photo 11.png' },
  { title: 'Celá noc 2 os', duration: '9 h', price: '200 €', image: '/images/Photo 9.jpg' },
  { title: 'Celá noc 4 os', duration: '9 h', price: '300 €', image: '/images/new-photos/photo-15.jpg' },
  { title: 'Celá noc 6 os', duration: '9 h', price: '400 €', image: '/images/Photo 9.jpg' },
  { title: 'Celá noc party', duration: '9 h', price: '500 €', image: '/images/Photo 14.png' },
  { title: 'Izba', duration: '60 min', price: '50 €', image: '/images/Photo 3.png' },
];

export default function CennikPage() {
  const bookiaLink =
    process.env.NEXT_PUBLIC_BOOKIA_ID && process.env.NEXT_PUBLIC_BOOKIA_ID !== 'YOUR_BOOKIA_ID'
      ? `https://bookia.sk/rezervacia/${process.env.NEXT_PUBLIC_BOOKIA_ID}`
      : '#';

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {pricing.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#e8e6e3] flex flex-col"
              >
                <div className="relative h-48 sm:h-56 w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    loading={index < 2 ? 'eager' : 'lazy'}
                    priority={index < 2}
                  />
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-display font-bold text-[#2c2c2c]">{item.title}</h3>
                    <span className="text-sm text-[#6b6b6b]">{item.duration}</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-[#6bb8ff] mb-4 text-center">{item.price}</div>
                  <div className="mt-auto">
                    <Link
                      href={bookiaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full bg-[#6bb8ff] text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-[#4d9be0] transition-all shadow-md hover:shadow-lg hover:scale-105 min-h-[44px] flex items-center justify-center touch-manipulation"
                    >
                      Rezervovať
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

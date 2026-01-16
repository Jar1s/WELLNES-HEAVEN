import Link from 'next/link';
import Image from 'next/image';

const pricing = [
  { title: 'PRÍVATNÁ IZBA', subtitle: '2 osoby • 1 izba', duration: '120 minút', price: '80 €', image: '/images/Photo 19.png' },
  { title: 'PRIVÁTNE IZBY', subtitle: '4 osoby • 2 izby', duration: '120 minút', price: '140 €', image: '/images/Photo 22.png' },
  { title: 'PRIVÁTNE IZBY', subtitle: '6 osôb • 3 izby', duration: '120 minút', price: '180 €', image: '/images/Photo 22.png' },
  { title: 'PRIVÁTNY WELLNESS', subtitle: 'bez izby', duration: '120 minút', price: '100 €', image: '/images/Photo 12.png' },
  { title: 'PRIVÁTNY WELLNESS', subtitle: 's izbami • 2 osoby', duration: '120 minút', price: '150 €', image: '/images/Photo 11.png' },
  { title: 'PRIVÁTNY WELLNESS', subtitle: 's izbami • 2 osoby', duration: '180 minút', price: '200 €', image: '/images/Photo 11.png' },
  { title: 'PRIVÁTNY WELLNESS', subtitle: 's izbami • 2 osoby', duration: '240 minút', price: '250 €', image: '/images/Photo 11.png' },
  { title: 'WELLNESS ALL NIGHT', subtitle: '2 osoby', duration: '9 hodín', price: '200 €', image: '/images/Photo 17.png' },
  { title: 'WELLNESS ALL NIGHT', subtitle: '4 osoby', duration: '9 hodín', price: '300 €', image: '/images/Photo 16.png' },
  { title: 'WELLNESS ALL NIGHT', subtitle: '6 osôb', duration: '9 hodín', price: '400 €', image: '/images/Photo 15.png' },
  { title: 'WELLNESS ALL NIGHT PARTY', subtitle: '12 osôb', duration: '9 hodín', price: '500 €', image: '/images/Photo 14.png' },
  { title: 'PRIVÁTNA SAUNA', duration: '120 minút', price: '80 €', image: '/images/Photo 18.png' },
  { title: 'PRIVÁTNA SAUNA', duration: '60 minút', price: '60 €', image: '/images/Photo 18.png' },
];

export default function CennikPage() {
  const bookiaLink = 'https://services.bookio.com/wellness-heaven/widget?lang=sk';

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
                <div className="p-6 sm:p-7 flex flex-col flex-1 gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-h-[60px] flex flex-col justify-start">
                      <h3 className="text-xl font-display font-bold text-[#2c2c2c]">{item.title}</h3>
                      {item.subtitle && <p className="text-sm text-[#6b6b6b]">{item.subtitle}</p>}
                    </div>
                    <span className="text-sm text-[#6b6b6b] whitespace-nowrap pt-1">{item.duration}</span>
                  </div>
                  <div className="flex-1 flex items-start justify-center">
                    <div className="text-3xl font-display font-bold text-[#6bb8ff] text-center min-h-[44px] flex items-center justify-center">
                      {item.price}
                    </div>
                  </div>
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

import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* About Section - Modern Split Layout */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#faf9f7]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/Photo 11.png"
                alt="Wellness"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-[#6bb8ff] text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
                O nás
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#2c2c2c] mb-4 sm:mb-6">
                Kam v Bratislave za <span className="text-[#6bb8ff]">oddychom</span>
              </h2>
              <div className="w-24 h-1 bg-[#6bb8ff] mb-6 sm:mb-8"></div>
              <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed mb-4 sm:mb-6">
                Ponúkame súkromný wellness pre dvoch alebo partiu priateľov. Nie sme ako ostatné 
                hromadné alebo hotelové wellness. Sme privátny wellness kde sa 
                zameriavame na každého jednotlivého zákazníka behom procedúr ako 
                saunovanie, masáže alebo kúpanie vo vírivke.
              </p>
              <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed mb-6 sm:mb-8">
                Sme súkromný wellness, kde nestretnete hromadu ľudí, ale stredom 
                pozornosti budete iba Vy!
              </p>
              <Link
                href="/o-nas"
                className="inline-block text-[#6bb8ff] font-semibold hover:text-[#4d9be0] transition-colors border-b-2 border-[#6bb8ff] pb-1 min-h-[44px] flex items-center touch-manipulation"
              >
                Zistiť viac →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Services />
      
      {/* Gift Vouchers Section - Elegant */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-[#6bb8ff] to-[#4d9be0] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-white rounded-full -mr-32 sm:-mr-40 lg:-mr-48 -mt-32 sm:-mt-40 lg:-mt-48"></div>
          <div className="absolute bottom-0 left-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-white rounded-full -ml-32 sm:-ml-40 lg:-ml-48 -mb-32 sm:-mb-40 lg:-mb-48"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-white/80 text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 font-medium">
              Darčekové poukážky
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 sm:mb-6">
              Venujte svojim blízkym oddych
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed">
              Darujte im niektorú zo širokej možností našich darčekových poukážok. 
              Detaily zistíte u nás na recepcii.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-[#f5f5f5] text-black !text-black hover:!text-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#ededed] transition-all shadow-xl hover:shadow-2xl hover:scale-105 min-h-[44px] flex items-center justify-center touch-manipulation border border-[#4d9be0]/25"
              style={{ color: '#000' }}
            >
              Kontaktujte nás
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

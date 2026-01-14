'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 1024);
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm' 
        : 'bg-white/90 backdrop-blur-md'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-2xl sm:text-3xl font-display font-bold text-[#6bb8ff] tracking-tight hover:text-[#4d9be0] transition-colors drop-shadow-sm"
          >
            Wellness Heaven
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link 
              href="/" 
              className="text-[#2c2c2c] hover:text-[#6bb8ff] transition-colors font-medium text-sm tracking-wide drop-shadow-sm"
            >
              Úvod
            </Link>
            <Link 
              href="/o-nas" 
              className="text-[#2c2c2c] hover:text-[#6bb8ff] transition-colors font-medium text-sm tracking-wide drop-shadow-sm"
            >
              O nás
            </Link>
            <Link 
              href="/sluzby" 
              className="text-[#2c2c2c] hover:text-[#6bb8ff] transition-colors font-medium text-sm tracking-wide drop-shadow-sm"
            >
              Služby
            </Link>
            <Link 
              href="/cennik" 
              className="text-[#2c2c2c] hover:text-[#6bb8ff] transition-colors font-medium text-sm tracking-wide drop-shadow-sm"
            >
              Cenník
            </Link>
            <Link 
              href="/kontakt" 
              className="text-[#2c2c2c] hover:text-[#6bb8ff] transition-colors font-medium text-sm tracking-wide drop-shadow-sm"
            >
              Kontakt
            </Link>
            <Link 
              href="https://services.bookio.com/wellness-heaven/widget?lang=sk" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#6bb8ff] text-white px-6 py-2.5 rounded-full hover:bg-[#4d9be0] transition-all font-medium text-sm tracking-wide shadow-lg hover:shadow-xl"
            >
              Rezervácia
            </Link>
          </div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              className="text-[#2c2c2c] p-2 sm:p-3 drop-shadow-sm min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Zavrieť menu" : "Otvoriť menu"}
              aria-expanded={isMenuOpen}
              type="button"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 sm:mt-6 space-y-2 sm:space-y-3 pb-6 bg-white/98 backdrop-blur-md rounded-lg p-4 sm:p-6 -mx-4 sm:-mx-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <Link 
              href="/" 
              className="block py-3 sm:py-2.5 text-[#2c2c2c] hover:text-[#6bb8ff] transition-colors font-medium text-base sm:text-sm min-h-[44px] flex items-center touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Úvod
            </Link>
            <Link 
              href="/o-nas" 
              className="block py-3 sm:py-2.5 text-[#2c2c2c] hover:text-[#6bb8ff] transition-colors font-medium text-base sm:text-sm min-h-[44px] flex items-center touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              O nás
            </Link>
            <Link 
              href="/sluzby" 
              className="block py-3 sm:py-2.5 text-[#2c2c2c] hover:text-[#6bb8ff] transition-colors font-medium text-base sm:text-sm min-h-[44px] flex items-center touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Služby
            </Link>
            <Link 
              href="/cennik" 
              className="block py-3 sm:py-2.5 text-[#2c2c2c] hover:text-[#6bb8ff] transition-colors font-medium text-base sm:text-sm min-h-[44px] flex items-center touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Cenník
            </Link>
            <Link 
              href="/kontakt" 
              className="block py-3 sm:py-2.5 text-[#2c2c2c] hover:text-[#6bb8ff] transition-colors font-medium text-base sm:text-sm min-h-[44px] flex items-center touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Kontakt
            </Link>
            <Link 
              href="https://services.bookio.com/wellness-heaven/widget?lang=sk"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#6bb8ff] text-white px-6 py-3.5 sm:py-3 rounded-full text-center hover:bg-[#4d9be0] transition-all font-medium mt-4 min-h-[44px] flex items-center justify-center touch-manipulation"
              onClick={() => setIsMenuOpen(false)}
            >
              Rezervácia
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

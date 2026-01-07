'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-600">
            Wellness Heaven
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-purple-600 transition">
              Úvod
            </Link>
            <Link href="/o-nas" className="text-gray-700 hover:text-purple-600 transition">
              O nás
            </Link>
            <Link href="/sluzby" className="text-gray-700 hover:text-purple-600 transition">
              Služby
            </Link>
            <Link href="/cennik" className="text-gray-700 hover:text-purple-600 transition">
              Cenník
            </Link>
            <Link href="/kontakt" className="text-gray-700 hover:text-purple-600 transition">
              Kontakt
            </Link>
            <Link 
              href="/rezervacia" 
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Rezervácia
            </Link>
          </div>

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              className="text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 pb-4">
            <Link href="/" className="block py-2 text-gray-700 hover:text-purple-600">
              Úvod
            </Link>
            <Link href="/o-nas" className="block py-2 text-gray-700 hover:text-purple-600">
              O nás
            </Link>
            <Link href="/sluzby" className="block py-2 text-gray-700 hover:text-purple-600">
              Služby
            </Link>
            <Link href="/cennik" className="block py-2 text-gray-700 hover:text-purple-600">
              Cenník
            </Link>
            <Link href="/kontakt" className="block py-2 text-gray-700 hover:text-purple-600">
              Kontakt
            </Link>
            <Link 
              href="/rezervacia" 
              className="block bg-purple-600 text-white px-6 py-2 rounded-lg text-center hover:bg-purple-700"
            >
              Rezervácia
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

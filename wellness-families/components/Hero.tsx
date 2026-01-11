'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isMounted] = useState(true);

  useEffect(() => {
    if (videoRef.current && isMounted) {
      const video = videoRef.current;
      
      const checkVideo = async () => {
        try {
          // Try to load video
          video.load();
          
          // Wait a bit to see if video loads
          await new Promise(resolve => setTimeout(resolve, 100));
          
          if (video.readyState >= 2) { // HAVE_CURRENT_DATA
            setShowVideo(true);
            video.play().catch(() => {
              // Autoplay failed, but video is loaded
              setShowVideo(true);
            });
          } else {
            // Video not available, show image
            setShowVideo(false);
          }
        } catch {
          setShowVideo(false);
        }
      };

      const handleCanPlay = () => {
        setShowVideo(true);
        video.play().catch(() => {
          // Autoplay prevented, but video is ready
          setShowVideo(true);
        });
      };

      const handleError = () => {
        setShowVideo(false);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      
      checkVideo();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
      };
    }
  }, [isMounted]);

  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden bg-[#faf9f7]">
      {/* Mobile background image */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/images/Photo 1.png"
          alt="Wellness Heaven"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#faf9f7]/92"></div>
      </div>

      {/* Video / Image Side for desktop */}
      <div className="hidden lg:block lg:flex-1 relative order-1 min-h-screen">
        {/* Fallback image */}
        <Image
          src="/images/new-photos/photo-00.jpg"
          alt="Wellness"
          fill
          className={`object-cover z-0 transition-opacity duration-700 ${
            showVideo ? 'opacity-0' : 'opacity-100'
          }`}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        
        {/* Video Background */}
        {isMounted && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${
              showVideo ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            poster="/images/new-photos/photo-00.jpg"
            suppressHydrationWarning
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
            <source src="/videos/hero-video.webm" type="video/webm" />
          </video>
        )}
        
        {/* Gradient overlay - multiple layers for better effect */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#6bb8ff]/35 via-[#6bb8ff]/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>
      </div>
      
      {/* Content Side */}
      <div className="relative z-10 w-full lg:flex-1 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 py-12 sm:py-16 md:py-20 lg:py-20 order-1 lg:order-2 min-h-[100vh] lg:min-h-screen">
        <div className="max-w-2xl w-full bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg lg:bg-transparent lg:backdrop-blur-0 lg:rounded-none lg:p-0 lg:shadow-none text-center lg:space-y-2">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-[#2c2c2c] mb-3 sm:mb-5 leading-tight">
            Wellness Heaven
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-light text-[#6b6b6b] mb-6 sm:mb-10">
            Privátny Wellness v Bratislave
          </h2>
          
          <p className="text-base sm:text-lg text-[#6b6b6b] leading-relaxed mb-8 sm:mb-12 max-w-xl mx-auto">
            Ponúkame súkromný wellness pre dvoch alebo partiu priateľov. 
            Sme privátny wellness, kde sa zameriavame na každého jednotlivého 
            zákazníka behom procedúr ako saunovanie, masáže alebo kúpanie vo vírivke.
          </p>

          {/* Opening Hours - Modern Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 shadow-lg border border-[#e8e6e3] text-center">
            <p className="text-[#2c2c2c] font-semibold mb-4 text-base sm:text-lg font-display">Otváracie hodiny</p>
            <div className="space-y-3">
              <div className="py-2 border-b border-[#e8e6e3]">
                <p className="text-[#6b6b6b] font-medium text-sm sm:text-base mb-1">Pondelok – Piatok</p>
                <p className="text-[#2c2c2c] font-semibold text-sm sm:text-base">11:00 – 22:00</p>
              </div>
              <div className="py-2">
                <p className="text-[#6b6b6b] font-medium text-sm sm:text-base mb-1">Sobota – Nedeľa</p>
                <p className="text-[#2c2c2c] font-semibold text-sm sm:text-base">10:00 – 22:00</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href="/rezervacia"
              className="bg-[#6bb8ff] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#4d9be0] transition-all shadow-xl hover:shadow-2xl hover:scale-105 text-center min-h-[44px] flex items-center justify-center touch-manipulation"
            >
              Rezervovať vstup
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

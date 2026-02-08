'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingPhoneButton from '@/components/FloatingPhoneButton';
import PromoPopup from '@/components/PromoPopup';

export default function SiteChrome() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return null;
  }

  return (
    <>
      <Header />
      <Footer />
      <FloatingPhoneButton />
      <PromoPopup />
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';

type PopupData = {
  id: string;
  title?: string | null;
  body?: string | null;
  image_url?: string | null;
  link_url?: string | null;
  popup_size?: 'sm' | 'md' | 'lg' | null;
  updated_at?: string | null;
};

export default function PromoPopup() {
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [visible, setVisible] = useState(false);
  const [imageOk, setImageOk] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/popup', { cache: 'no-store' });
        const json = await res.json();
        const data: PopupData | null = json?.popup ?? null;
        if (!data?.id) return;

        const forcePreview =
          typeof window !== 'undefined' &&
          new URLSearchParams(window.location.search).get('popupPreview') === '1';

        const key = `promo_popup_dismissed_${data.id}_${data.updated_at ?? 'v1'}`;
        const dismissed = localStorage.getItem(key);
        if (forcePreview || !dismissed) {
          setPopup(data);
          setVisible(true);
        }
      } catch {
        // ignore
      }
    };

    load();
  }, []);

  const handleClose = () => {
    if (popup?.id) {
      const key = `promo_popup_dismissed_${popup.id}_${popup.updated_at ?? 'v1'}`;
      localStorage.setItem(key, '1');
    }
    setVisible(false);
  };

  if (!popup || !visible) return null;

  const sizeClass =
    popup.popup_size === 'lg'
      ? 'w-[320px] sm:w-[420px] lg:w-[460px]'
      : popup.popup_size === 'sm'
        ? 'w-[240px] sm:w-[280px]'
        : 'w-[280px] sm:w-[340px]';

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90]">
      <div className={`${sizeClass} relative bg-white rounded-2xl shadow-2xl border border-[#e8e6e3] overflow-hidden`}>
        {popup.image_url && imageOk && (
          <div className="relative w-full bg-black/5">
            <img
              src={popup.image_url}
              alt={popup.title || 'Promo'}
              className="w-full h-auto max-h-[70vh] object-contain"
              onError={() => setImageOk(false)}
            />
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 z-[100] inline-flex h-11 w-11 p-0 items-center justify-center rounded-full bg-black/78 text-white shadow-xl ring-1 ring-white/80 backdrop-blur-sm transition-colors hover:bg-black/90 active:scale-[0.98]"
              aria-label="Zavrieť"
            >
              <svg
                className="h-6 w-6 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth={3.25}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
              </svg>
            </button>
          </div>
        )}
        {(!popup.image_url || !imageOk) && (
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-3 right-3 z-[100] inline-flex h-11 w-11 p-0 items-center justify-center rounded-full bg-black text-white shadow-xl ring-1 ring-white/80 transition-colors hover:bg-black/90 active:scale-[0.98]"
            aria-label="Zavrieť"
          >
            <svg
              className="h-6 w-6 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth={3.25}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        )}
        {(popup.title || popup.body || popup.link_url) && (
          <div className="p-4 space-y-2">
            {popup.title && (
              <h4 className="text-sm font-semibold text-[#2c2c2c]">{popup.title}</h4>
            )}
            {popup.body && (
              <p className="text-xs text-[#6b6b6b] leading-relaxed">{popup.body}</p>
            )}
            {popup.link_url && (
              <a
                href={popup.link_url}
                className="inline-flex items-center justify-center text-xs font-semibold text-white bg-[#6bb8ff] hover:bg-[#4d9be0] transition-colors rounded-full px-3 py-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zistiť viac
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

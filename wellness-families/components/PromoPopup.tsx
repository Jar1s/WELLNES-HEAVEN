'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DEFAULT_LOCALE, toLocalizedPath, type Locale } from '@/lib/i18n';

type PopupData = {
  id: string;
  title?: string | null;
  body?: string | null;
  image_url?: string | null;
  link_url?: string | null;
  popup_size?: 'sm' | 'md' | 'lg' | null;
  updated_at?: string | null;
};

type PromoPopupProps = {
  locale?: Locale;
};

export default function PromoPopup({ locale = DEFAULT_LOCALE }: PromoPopupProps) {
  const router = useRouter();
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [visible, setVisible] = useState(false);
  const [imageOk, setImageOk] = useState(true);
  const pricingPath = toLocalizedPath(locale, '/cennik');
  const t =
    locale === 'en'
      ? {
          dialogLabel: 'Promo notification',
          openPricing: 'Open pricing',
          close: 'Close',
          more: 'Learn more',
          fallbackAlt: 'Promo',
        }
      : {
          dialogLabel: 'Promo notifikácia',
          openPricing: 'Otvoriť cenník',
          close: 'Zavrieť',
          more: 'Zistiť viac',
          fallbackAlt: 'Promo',
        };

  const getDismissKey = (data: PopupData) => (
    `promo_popup_dismissed_${data.id}_${data.updated_at ?? 'v1'}`
  );

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

        const key = getDismissKey(data);
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

  useEffect(() => {
    if (!visible) return;

    const scrollY = window.scrollY;
    const html = document.documentElement;
    const body = document.body;

    const previous = {
      htmlOverflow: html.style.overflow,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
    };

    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overscrollBehavior = 'none';

    return () => {
      html.style.overflow = previous.htmlOverflow;
      html.style.overscrollBehavior = previous.htmlOverscrollBehavior;
      body.style.overflow = previous.bodyOverflow;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.width = previous.bodyWidth;
      body.style.overscrollBehavior = previous.bodyOverscrollBehavior;
      window.scrollTo(0, scrollY);
    };
  }, [visible]);

  const handleClose = () => {
    if (popup) {
      const key = getDismissKey(popup);
      localStorage.setItem(key, '1');
    }
    setVisible(false);
  };

  const handleOpenPricing = () => {
    handleClose();
    router.push(pricingPath);
  };

  if (!popup || !visible) return null;

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-sm overscroll-none"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.dialogLabel}
    >
      <div className="relative h-full w-full overflow-hidden">
        {popup.image_url && imageOk ? (
          <>
            <img
              src={popup.image_url}
              alt={popup.title || t.fallbackAlt}
              className="absolute inset-0 h-full w-full object-cover scale-[1.03] blur-[6px] opacity-45"
              draggable={false}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

            <div className="relative z-[2] flex h-full w-full items-center justify-center px-3 py-6 sm:px-6 sm:py-10">
              <div className="relative inline-flex">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenPricing();
                  }}
                  className="block rounded-sm outline-none ring-offset-2 ring-offset-black focus-visible:ring-2 focus-visible:ring-[#6bb8ff]"
                  aria-label={t.openPricing}
                >
                  <img
                    src={popup.image_url}
                    alt={popup.title || t.fallbackAlt}
                    className="h-auto w-auto max-h-[88vh] sm:max-h-[90vh] max-w-[94vw] shadow-2xl"
                    draggable={false}
                    onError={() => setImageOk(false)}
                  />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenPricing();
                  }}
                  className="absolute left-1/2 -translate-x-1/2 z-[130] inline-flex min-h-11 items-center justify-center rounded-full bg-[#6bb8ff] px-7 py-3 text-sm sm:text-base font-semibold text-[#11243b] shadow-xl transition-colors hover:bg-[#4d9be0]"
                  style={{ bottom: 'max(-20px, calc(env(safe-area-inset-bottom) - 10px))' }}
                >
                  {t.more}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 text-white text-center gap-3 relative z-[2]">
            {popup.title && <h4 className="text-2xl font-semibold">{popup.title}</h4>}
            {popup.body && <p className="text-sm text-white/85 max-w-[580px]">{popup.body}</p>}
          </div>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute z-[130] inline-flex h-12 w-12 p-0 items-center justify-center rounded-full bg-black/55 text-white shadow-xl ring-1 ring-white/85 backdrop-blur-sm transition-colors hover:bg-black/75"
          style={{ top: 'calc(env(safe-area-inset-top) + 14px)', right: 14 }}
          aria-label={t.close}
        >
          <svg
            className="h-6 w-6 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={3}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>

        {(!popup.image_url || !imageOk) && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleOpenPricing();
            }}
            className="absolute left-1/2 -translate-x-1/2 z-[130] inline-flex min-h-11 items-center justify-center rounded-full bg-[#6bb8ff] px-7 py-3 text-sm sm:text-base font-semibold text-[#11243b] shadow-xl transition-colors hover:bg-[#4d9be0]"
            style={{ bottom: 'calc(env(safe-area-inset-bottom) + 18px)' }}
          >
            {t.more}
          </button>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { DEFAULT_LOCALE, type Locale } from '@/lib/i18n';

interface FaqItem {
  question: string;
  answer: string;
}

type FaqProps = {
  locale?: Locale;
};

const faqsByLocale: Record<Locale, FaqItem[]> = {
  sk: [
    {
      question: 'Čo všetko je základom balíčkov?',
      answer:
        'Balíček obsahuje súkromnú vírivku, saunu, relaxačnú miestnosť, uterák a plachtu v cene. Župan vieme zapožičať za symbolický poplatok.',
    },
    {
      question: 'Ako je to s občerstvením? Môžeme si priniesť vlastné?',
      answer:
        'Môžete si priniesť vlastné nealko, ľahké pochutiny a tortu. Na mieste máme chladničku a základné poháre. Alkohol len v primeranom množstve a s rešpektom k zariadeniu.',
    },
    {
      question: 'Nachádzajú sa v priestoroch kamery?',
      answer:
        'Vstupný priestor je monitorovaný kvôli bezpečnosti. V súkromných zónach (vírivka, sauna, relax) kamery nemáme.',
    },
    {
      question: 'Je u nás povolené fajčiť?',
      answer:
        'Interiér je nefajčiarsky. Prosíme nefajčiť v priestoroch wellnessu ani pri otvorených oknách.',
    },
    {
      question: 'Môžem prísť autom? Kde môžem parkovať?',
      answer:
        'Parkovať môžete v okolí prevádzky na verejných miestach (Tomášikova 26 / Ružinov). Odporúčame prísť o pár minút skôr, aby ste si našli miesto.',
    },
    {
      question: 'Je v priestoroch internet?',
      answer: 'Áno, k dispozícii je bezplatné Wi‑Fi. Heslo vám radi poskytneme na mieste.',
    },
    {
      question: 'Ako je riešené ozvučenie? Vieme si pustiť vlastnú hudbu?',
      answer:
        'V miestnosti je Bluetooth ozvučenie. Stačí sa pripojiť vlastným telefónom a spustiť playlist.',
    },
    {
      question: 'Sú nejaké poplatky za znečistenie?',
      answer:
        'Ak zostane priestor v štandardnom stave, nič nenavyšujeme. Pri výraznom znečistení si vyhradzujeme poplatok za nadštandardné čistenie (orientačne 30 €).',
    },
  ],
  en: [
    {
      question: 'What is included in the packages?',
      answer:
        'Each package includes a private jacuzzi, sauna, relax room, towel, and sheet. Bathrobes are available for a small fee.',
    },
    {
      question: 'Can we bring our own snacks and drinks?',
      answer:
        'Yes, you can bring your own non-alcoholic drinks, light snacks, and cake. We provide a fridge and basic glassware. Alcohol is allowed in reasonable amounts.',
    },
    {
      question: 'Are there cameras in the private areas?',
      answer:
        'The entrance area is monitored for security. There are no cameras in private zones (jacuzzi, sauna, relax area).',
    },
    {
      question: 'Is smoking allowed?',
      answer:
        'The interior is non-smoking. Please do not smoke inside the wellness area or by open windows.',
    },
    {
      question: 'Can I come by car? Where can I park?',
      answer:
        'You can park in public spaces around the venue (Tomášikova 26 / Ružinov). We recommend arriving a few minutes earlier.',
    },
    {
      question: 'Is Wi-Fi available?',
      answer: 'Yes, free Wi-Fi is available. We will provide the password on site.',
    },
    {
      question: 'Do you have sound system? Can we play our own music?',
      answer:
        'Yes, the room has Bluetooth audio. Just connect your phone and play your own playlist.',
    },
    {
      question: 'Are there cleaning fees?',
      answer:
        'If the space is left in standard condition, there is no extra fee. In case of heavy mess, we may charge an additional cleaning fee (about 30 EUR).',
    },
  ],
};

const copy = {
  sk: {
    title: 'Často kladené otázky',
    description: 'Rýchle odpovede na to, čo riešia hostia pred príchodom.',
  },
  en: {
    title: 'Frequently Asked Questions',
    description: 'Quick answers to common questions guests ask before arrival.',
  },
} as const;

export default function Faq({ locale = DEFAULT_LOCALE }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = faqsByLocale[locale];
  const t = copy[locale];

  const Chevron = ({ open }: { open: boolean }) => (
    <svg
      className={`w-5 h-5 text-[#6bb8ff] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#faf9f7]">
      <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[#6bb8ff] uppercase tracking-[0.24em] text-xs sm:text-sm font-semibold mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#2c2c2c] mb-3">
            {t.title}
          </h2>
          <p className="text-[#6b6b6b] text-base sm:text-lg">{t.description}</p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-white/90 backdrop-blur border border-[#ebe6df] rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between gap-3 sm:gap-4 text-left px-5 sm:px-6 py-8 sm:py-10"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-[#2c2c2c] leading-snug flex-1 text-center">
                    {faq.question}
                  </span>
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#f7f2ec] border border-[#e8e2da] flex-shrink-0">
                    <Chevron open={isOpen} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 py-3 sm:py-4 border-t border-[#f1ebe4]">
                    <div className="text-sm sm:text-base text-[#5b5b5b] leading-relaxed text-center flex items-center justify-center min-h-[56px]">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

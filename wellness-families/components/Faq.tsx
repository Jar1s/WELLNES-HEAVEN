'use client';

import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
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
      'Parkovať môžete v okolí prevádzky na verejných miestach (Tomášikova/Ružinov). Odporúčame prísť o pár minút skôr, aby ste si našli miesto.',
  },
  {
    question: 'Je v priestoroch internet?',
    answer:
      'Áno, k dispozícii je bezplatné Wi‑Fi. Heslo vám radi poskytneme na mieste.',
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
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const Chevron = ({ open }: { open: boolean }) => (
    <svg
      className={`w-5 h-5 text-[#c97d60] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[#c97d60] uppercase tracking-[0.24em] text-xs sm:text-sm font-semibold mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-[#2c2c2c] mb-3">
            Často kladené otázky
          </h2>
          <p className="text-[#6b6b6b] text-base sm:text-lg">
            Rýchle odpovede na to, čo riešia hostia pred príchodom.
          </p>
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
                  className="w-full flex items-center justify-between gap-3 sm:gap-4 text-left px-5 sm:px-6 py-6 sm:py-7"
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
                  <div className="px-5 sm:px-6 pb-7 sm:pb-8 pt-0 border-t border-[#f1ebe4]">
                    <div className="text-sm sm:text-base text-[#5b5b5b] leading-relaxed text-center flex items-center justify-center min-h-[72px]">
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

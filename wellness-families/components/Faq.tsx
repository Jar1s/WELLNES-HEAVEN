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
    <section className="py-14 sm:py-16 md:py-20">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#2c2c2c]">
          Často kladené otázky
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.question}
              className="bg-white border border-[#e8e6e3] rounded-xl sm:rounded-2xl shadow-sm overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between text-left px-4 sm:px-6 py-4 sm:py-5 text-[#2c2c2c] font-semibold"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
              >
                <span className="pr-4">{faq.question}</span>
                <Chevron open={isOpen} />
              </button>
              {isOpen && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-sm sm:text-base text-[#6b6b6b] leading-relaxed border-t border-[#f0eeeb]">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

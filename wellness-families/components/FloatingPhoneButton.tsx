export default function FloatingPhoneButton() {
  return (
    <a
      href="tel:+421952594495"
      aria-label="Zavolať +421 952 594 495"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[60] inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#6bb8ff] text-white shadow-2xl transition-all hover:-translate-y-1 hover:bg-[#4d9be0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6bb8ff] focus-visible:ring-offset-2 focus-visible:ring-offset-white touch-manipulation"
    >
      <svg
        className="h-6 w-6 sm:h-7 sm:w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.658l1.2 3a1 1 0 01-.24 1.09l-1.8 1.8a14.5 14.5 0 006.36 6.36l1.8-1.8a1 1 0 011.09-.24l3 1.2a1 1 0 01.66.94V19a2 2 0 01-2 2h-1c-7.18 0-13-5.82-13-13V5z"
        />
      </svg>
    </a>
  );
}

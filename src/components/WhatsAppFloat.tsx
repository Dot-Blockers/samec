import { buildWhatsAppUrl, SAMEC_WHATSAPP_DISPLAY } from '../utils/whatsapp';

export function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with SAMEC Consultants & Engineers on WhatsApp (${SAMEC_WHATSAPP_DISPLAY})`}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 inline-flex items-center justify-center gap-2.5 min-h-[48px] min-w-[48px] sm:px-4 sm:py-2.5 rounded-full bg-[#0D8A5A] hover:bg-[#0A6E47] text-white shadow-lg border border-emerald-700/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0D8A5A]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="w-5 h-5 shrink-0"
      >
        <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.516.078-1.172.109-1.891-.125-.438-.141-1-.328-1.719-.641-3.016-1.297-4.984-4.328-5.141-4.531-.156-.203-1.234-1.641-1.234-3.125s.781-2.219 1.063-2.516c.281-.297.609-.375.813-.375.203 0 .406 0 .578.016.188.016.438-.078.688.531.25.609.859 2.094.938 2.25.078.156.125.344.031.547-.094.203-.141.328-.297.5-.156.172-.313.391-.453.516-.156.156-.313.328-.141.641.172.313.781 1.297 1.672 2.094 1.156 1.031 2.125 1.359 2.438 1.516.313.156.484.125.672-.078.188-.203.781-.906.984-1.219.203-.313.422-.266.703-.156.281.109 1.797.844 2.109 1 .313.156.516.234.594.359.078.125.078.734-.172 1.438z" />
      </svg>
      <span className="hidden sm:inline text-sm font-semibold whitespace-nowrap">
        WhatsApp
      </span>
    </a>
  );
}

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { COMPANY_ASSETS } from '../data/portfolioData';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  // { label: 'Site Updates', href: '#site-updates' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Zone */}
        <a
          href="#top"
          className="flex items-center whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D8A5A] rounded"
          aria-label="SAMEC Consultants & Engineers Home"
        >
          <img
            src={COMPANY_ASSETS.logoUrl}
            alt="SAMEC Consultants & Engineers"
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#0F1E2E] hover:underline underline-offset-4 decoration-[#0D8A5A] decoration-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D8A5A] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary CTA + Mobile Drawer Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0D8A5A] hover:bg-[#0A6E47] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0D8A5A]"
          >
            Request Quote
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-md text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D8A5A]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="min-h-[44px] flex items-center px-3 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0F1E2E]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="min-h-[44px] w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-[#0D8A5A] hover:bg-[#0A6E47] rounded-md transition-colors"
              >
                Request Quote
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

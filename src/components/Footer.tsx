import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { COMPANY_ASSETS } from '../data/portfolioData';

const FAQ_ITEMS = [
  {
    question: 'Which building authorities does SAMEC Consultants & Engineers prepare submission drawings for?',
    answer:
      'SAMEC prepares complete architectural, structural, and MEP regulatory submission packages for LDA, DHA, RUDA, CDA, and KDA across Pakistan.',
  },
  {
    question: 'Does SAMEC offer both grey structure and complete turnkey construction in Lahore?',
    answer:
      'Yes. SAMEC executes complete grey structure works, high-end commercial and residential turnkey finishes, and civil infrastructure compliant with ACI, ASTM, and Pakistan Building Code specifications.',
  },
  {
    question: 'How does SAMEC ensure cost and schedule transparency during construction?',
    answer:
      'Through integrated Project Management Consultancy (PMC) using Primavera P6 scheduling, detailed Bills of Quantities (BOQs), Interim Payment Certificate (IPC) verification, and real-time site QA/QC telemetry.',
  },
];

export function Footer() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <footer className="bg-white">
      {/* Local SEO FAQ Section */}
      <section aria-labelledby="faq-heading" className="py-14 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <p className="text-xs font-medium text-[#0D8A5A] mb-2">Engineering & Regulatory FAQ</p>
            <h2 id="faq-heading" className="font-display text-2xl font-bold text-[#0F1E2E]">
              Common questions on approvals, BOQs & execution.
            </h2>
          </div>

          <div className="lg:col-span-8 divide-y divide-slate-200 border-t border-b border-slate-200">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full min-h-[52px] py-4 flex items-center justify-between gap-4 text-left text-sm sm:text-base font-semibold text-[#0F1E2E] hover:text-[#0D8A5A] transition-colors"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-4 text-sm text-slate-600 leading-relaxed max-w-3xl">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quiet Corporate Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200">
          <div className="md:col-span-5 space-y-3">
            <img
              src={COMPANY_ASSETS.logoUrl}
              alt="SAMEC Consultants & Engineers"
              className="h-11 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
              Civil engineering, architectural design, turnkey construction, and project management
              consultancy headquartered in Lahore, serving developments nationwide.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-sm">
            <p className="font-display font-semibold text-[#0F1E2E]">Navigation</p>
            <ul className="space-y-1.5 text-slate-600">
              <li>
                <a href="#projects" className="hover:text-[#0F1E2E]">
                  Completed Projects
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#0F1E2E]">
                  Services & Structure
                </a>
              </li>
              <li>
                <a href="#site-updates" className="hover:text-[#0F1E2E]">
                  Real-Time Site Updates
                </a>
              </li>
              <li>
                <a href="#leadership" className="hover:text-[#0F1E2E]">
                  Engr. Muhammad Saqib Rafiq
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#0F1E2E]">
                  Request Quote
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2 text-sm">
            <p className="font-display font-semibold text-[#0F1E2E]">Service Jurisdictions</p>
            <p className="text-slate-600 leading-relaxed">
              Lahore (DHA Phases 1–9, LDA Johar Town, Gulberg, Bahria Town, RUDA) · Islamabad (CDA) ·
              Faisalabad · Sialkot · Peshawar · Muzaffarabad AJ&K.
            </p>
            <p className="text-xs font-mono text-slate-500 pt-1">
              info@samec.pk · +92 347 4623101
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SAMEC Consultants & Engineers. All rights reserved.</p>
          <p>National Technology Council Reg: Eng. Tech / Civil / 01596</p>
        </div>
      </div>
    </footer>
  );
}

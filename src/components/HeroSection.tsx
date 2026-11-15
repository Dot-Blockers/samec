import { useState } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { COMPANY_ASSETS } from '../data/portfolioData';

const PROOF_METRICS = [
  {
    value: '16+ Years',
    label: 'Field & Project Controls Experience',
  },
  {
    value: 'PKR 5.5B+',
    label: 'Commercial & Institutional Portfolio',
  },
  {
    value: 'Eng. Tech / Civil / 01596',
    label: 'National Technology Council Registered',
  },
  {
    value: 'ACI · ASTM · PBC',
    label: 'Structural & Safety Code Compliance',
  },
];

export function HeroSection() {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="top" className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Proposition & Primary Action */}
          <div className="lg:col-span-6 flex flex-col justify-between py-1">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#0D8A5A] tracking-wide mb-4">
                Lahore, Punjab · Serving Nationwide Developments (LDA, DHA, RUDA, CDA, KDA)
              </p>
              <h1
                className="font-display font-bold text-[#0F1E2E] tracking-tight leading-[1.08] mb-5"
                style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', textWrap: 'balance' }}
              >
                Single-source civil construction, design, and project control.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
                SAMEC Consultants & Engineers unites structural engineering rigor, architectural
                planning, and turnkey field execution under Engr. Muhammad Saqib Rafiq—eliminating
                consultant-contractor gaps from feasibility through final handover.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#0D8A5A] hover:bg-[#0A6E47] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0D8A5A]"
              >
                Request Project Quote
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#projects"
                className="min-h-[44px] inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-[#0F1E2E] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0F1E2E]"
              >
                View Completed Projects
              </a>
            </div>
          </div>

          {/* Right Column: Dominant Architectural Image */}
          <div className="lg:col-span-6">
            <div className="relative h-64 sm:h-80 lg:h-full min-h-[340px] w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
              {!imgFailed ? (
                <img
                  src={COMPANY_ASSETS.heroImage}
                  alt="Modern reinforced concrete and glass commercial complex engineered in Lahore by SAMEC Consultants & Engineers"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#0F1E2E] to-slate-800 text-white">
                  <Building2 className="w-12 h-12 text-[#0D8A5A] mb-3" />
                  <p className="font-display font-semibold text-lg">
                    SAMEC Consultants & Engineers
                  </p>
                  <p className="text-sm text-slate-300 mt-1">
                    Commercial Plazas · Institutional Facilities · Turnkey Residences
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Proof & Credentials Strip */}
        <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROOF_METRICS.map((item) => (
            <div key={item.value} className="space-y-1">
              <p className="font-mono text-lg sm:text-xl font-semibold text-[#0F1E2E] tabular-nums">
                {item.value}
              </p>
              <p className="text-xs sm:text-sm text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

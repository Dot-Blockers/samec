import { Download, FileText } from 'lucide-react';
import { CAREER_TIMELINE, COMPANY_ASSETS } from '../data/portfolioData';

const CREDENTIALS = [
  { label: 'Academic Qualification', value: 'B.Sc. Civil Engineering Technology (Imperial University, 2018)' },
  { label: 'Technical Diploma', value: 'D.A.E. Civil Engineering Technology (GCT Lahore, 2007)' },
  { label: 'Statutory Registration', value: 'National Technology Council — Reg. Eng. Tech / Civil / 01596' },
  { label: 'Engineering Tools', value: 'AutoCAD · Primavera P6 · MS Project · BOQ & IPC Controls' },
];

export function LeadershipSection() {
  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="py-16 sm:py-20 bg-white border-b border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Principal Engineer Summary & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#0D8A5A] mb-2">
                Principal Leadership & Credentials
              </p>
              <h2
                id="leadership-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[#0F1E2E] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Engr. Muhammad Saqib Rafiq
              </h2>
              <p className="text-sm font-medium text-slate-600 mt-1">
                Chief Executive Officer & Principal Civil Engineer · 16+ Years Experience
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Leading SAMEC Consultants & Engineers with over 16 years of hands-on civil
              construction, quantity surveying, finishes execution, and government/military
              project delivery across Lahore, Islamabad, and Azad Kashmir.
            </p>

            {/* Credentials Table */}
            <div className="border border-slate-200 rounded-xl divide-y divide-slate-200 bg-slate-50">
              {CREDENTIALS.map((cred) => (
                <div key={cred.label} className="p-4">
                  <p className="text-xs text-slate-500">{cred.label}</p>
                  <p className="text-sm font-medium text-[#0F1E2E] mt-0.5">{cred.value}</p>
                </div>
              ))}
            </div>

            {/* Official PDF Downloads */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-medium text-slate-500">
                Corporate Documentation & Verification
              </p>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                <a
                  href={COMPANY_ASSETS.companyProfilePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-semibold text-[#0F1E2E] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  <span className="inline-flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#0D8A5A]" />
                    Download SAMEC Company Profile (PDF)
                  </span>
                  <Download className="w-4 h-4 text-slate-500 shrink-0" />
                </a>

                <a
                  href={COMPANY_ASSETS.ownerCvPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-semibold text-[#0F1E2E] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  <span className="inline-flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#0D8A5A]" />
                    Download Principal Engineer CV (PDF)
                  </span>
                  <Download className="w-4 h-4 text-slate-500 shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Verified Experience Timeline */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-200">
                <h3 className="font-display text-lg font-semibold text-[#0F1E2E]">
                  Verified Engineering Track Record (2007 – Present)
                </h3>
                <span className="font-mono text-xs text-slate-500 tabular-nums">
                  6 Major Tenures
                </span>
              </div>

              <div className="space-y-6">
                {CAREER_TIMELINE.map((entry, idx) => (
                  <div
                    key={entry.period}
                    className={`${
                      idx !== CAREER_TIMELINE.length - 1 ? 'pb-6 border-b border-slate-200/80' : ''
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                      <h4 className="font-display text-base font-semibold text-[#0F1E2E]">
                        {entry.role}
                      </h4>
                      <span className="font-mono text-xs text-[#0D8A5A] font-medium tabular-nums shrink-0">
                        {entry.period}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-500 mb-1.5">
                      {entry.organization}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">{entry.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

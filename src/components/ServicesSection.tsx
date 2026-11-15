import { CORE_SERVICES, ORGANIZATIONAL_DEPARTMENTS } from '../data/portfolioData';

export function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-medium text-[#0D8A5A] mb-2">
            Core Disciplines & Corporate Capability
          </p>
          <h2
            id="services-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#0F1E2E] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Integrated engineering and field execution under one accountable roof.
          </h2>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((service) => (
            <article
              key={service.index}
              className={`${service.spanClass} bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between`}
            >
              <div>
                <p className="font-mono text-xs font-medium text-[#0D8A5A] mb-2 tabular-nums">
                  {service.index}. Service Discipline
                </p>
                <h3 className="font-display text-xl font-semibold text-[#0F1E2E] mb-3">
                  {service.index}. {service.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 max-w-3xl">
                  {service.summary}
                </p>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5 pt-5 border-t border-slate-100 text-sm text-slate-700">
                {service.highlights.map((bullet) => (
                  <li key={bullet} className="leading-snug">
                    <span className="text-[#0D8A5A] font-semibold mr-2" aria-hidden="true">
                      —
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Organizational Structure & QA Governance */}
        <div className="mt-12 pt-10 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0F1E2E]">
                Organizational Structure & Departmental Controls
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Three interlinked departments operating under CEO & Principal Engineer Engr.
                Muhammad Saqib Rafiq from drawing approval through commissioning.
              </p>
            </div>
            <p className="font-mono text-xs text-slate-500 whitespace-nowrap">
              Zero-Harm HSE · ACI / ASTM QA/QC
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ORGANIZATIONAL_DEPARTMENTS.map((dept) => (
              <div
                key={dept.department}
                className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
              >
                <div>
                  <h4 className="font-display text-base font-semibold text-[#0F1E2E]">
                    {dept.department}
                  </h4>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{dept.mandate}</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs font-medium text-slate-500 mb-1.5">Key Personnel</p>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {dept.leadRoles.join(' · ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

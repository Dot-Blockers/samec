import { FormEvent, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { buildWhatsAppUrl, SAMEC_WHATSAPP_DISPLAY } from '../utils/whatsapp';

interface ContactSectionProps {
  prefilledProjectContext?: { title: string; location: string } | null;
}

const SERVICE_OPTIONS = [
  'Construction & Turnkey Execution',
  'Grey Structure Construction',
  'Project Management Consultancy (PMC)',
  'Architectural & Structural Design (LDA/DHA/RUDA)',
  'Commercial Renovation & Fit-Out',
];

const BUDGET_TIERS = [
  'PKR 15M – 35M',
  'PKR 35M – 80M',
  'PKR 80M – 250M',
  'PKR 250M+ (Commercial / Institutional)',
  'Request Detailed BOQ Estimate',
];

export function ContactSection({ prefilledProjectContext }: ContactSectionProps) {
  // Interactive Cost Estimator Helper
  const [estimatorScope, setEstimatorScope] = useState<'grey' | 'turnkey' | 'commercial'>('turnkey');
  const [coveredAreaSqFt, setCoveredAreaSqFt] = useState<number>(4500);

  // Lead Capture Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cityArea, setCityArea] = useState('DHA / Johar Town, Lahore');
  const [serviceType, setServiceType] = useState(SERVICE_OPTIONS[0]);
  const [projectScale, setProjectScale] = useState('1 Kanal Residential / Commercial');
  const [budgetRange, setBudgetRange] = useState(BUDGET_TIERS[1]);
  const [message, setMessage] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{
    referenceCode: string;
    fullName: string;
  } | null>(null);

  useEffect(() => {
    if (prefilledProjectContext) {
      setCityArea(prefilledProjectContext.location);
      setMessage(
        `Requesting engineering consultation and BOQ quote similar to: ${prefilledProjectContext.title}.`
      );
    }
  }, [prefilledProjectContext]);

  const indicativeRange = useMemo(() => {
    const ratesPerSqFt = {
      grey: { min: 2700, max: 3300, label: 'Grey Structure (RCC + Masonry + MEP Conduits)' },
      turnkey: { min: 5800, max: 7400, label: 'Complete Turnkey (A+ Architectural Finishes)' },
      commercial: { min: 6500, max: 8800, label: 'Commercial Plaza / Corporate Complex' },
    }[estimatorScope];

    const minMillion = ((coveredAreaSqFt * ratesPerSqFt.min) / 1_000_000).toFixed(1);
    const maxMillion = ((coveredAreaSqFt * ratesPerSqFt.max) / 1_000_000).toFixed(1);
    return {
      minMillion,
      maxMillion,
      label: ratesPerSqFt.label,
    };
  }, [estimatorScope, coveredAreaSqFt]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || !phone.trim() || !email.trim() || !cityArea.trim()) {
      setErrorMsg('Please fill in your full name, phone number, email, and project location.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          cityArea,
          serviceType,
          projectScale,
          estimatedAreaSqFt: coveredAreaSqFt,
          budgetRange,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Unable to submit inquiry. Please verify your details.');
        return;
      }

      setConfirmation({
        referenceCode: data.referenceCode,
        fullName: fullName.trim(),
      });
      setFullName('');
      setPhone('');
      setEmail('');
      setMessage('');
    } catch {
      setErrorMsg('Connection error while submitting your request. Please call +92 347 4623101.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Lahore Direct Contact + Indicative BOQ Scope Estimator */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#0D8A5A] mb-2">
                Project Inquiries & Site Consultations
              </p>
              <h2
                id="contact-heading"
                className="font-display text-2xl sm:text-3xl font-bold text-[#0F1E2E] tracking-tight"
                style={{ textWrap: 'balance' }}
              >
                Request a BOQ estimate or engineering site visit.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                Speak directly with Engr. Muhammad Saqib Rafiq’s project controls team for Lahore,
                Islamabad, and nationwide developments.
              </p>
            </div>

            {/* Interactive Indicative Cost Planner */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-base font-semibold text-[#0F1E2E]">
                  Indicative Construction Scope Estimator
                </h3>
                <span className="font-mono text-xs text-slate-500">Lahore Market</span>
              </div>

              <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg">
                {(
                  [
                    { id: 'grey', label: 'Grey Structure' },
                    { id: 'turnkey', label: 'Turnkey Villa' },
                    { id: 'commercial', label: 'Commercial' },
                  ] as const
                ).map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setEstimatorScope(mode.id)}
                    className={`min-h-[36px] px-2 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                      estimatorScope === mode.id
                        ? 'bg-white text-[#0F1E2E] shadow-sm'
                        : 'text-slate-600 hover:text-[#0F1E2E]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-slate-600 font-medium">Covered Area</span>
                  <span className="font-mono font-semibold text-[#0F1E2E] tabular-nums">
                    {coveredAreaSqFt.toLocaleString()} sq. ft.
                  </span>
                </div>
                <input
                  type="range"
                  min={1500}
                  max={25000}
                  step={250}
                  value={coveredAreaSqFt}
                  onChange={(e) => setCoveredAreaSqFt(Number(e.target.value))}
                  aria-label="Estimated covered area in square feet"
                  className="w-full accent-[#0D8A5A]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-500">{indicativeRange.label}</p>
                <p className="font-mono text-xl font-bold text-[#0F1E2E] tabular-nums mt-1">
                  PKR {indicativeRange.minMillion}M – {indicativeRange.maxMillion}M
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Preliminary planning guide only; exact cost is governed by structural drawings and
                  itemized BOQ.
                </p>
              </div>
            </div>

            {/* Direct Contact Details */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#0D8A5A] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Direct Phone & WhatsApp</p>
                  <p className="font-mono font-medium text-[#0F1E2E] tabular-nums">
                    <a href="tel:+923474623101" className="hover:underline">
                      +92 347 4623101
                    </a>{' '}
                    ·{' '}
                    <a href="tel:+923249815159" className="hover:underline">
                      +92 324 9815159
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#0D8A5A] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Engineering & Tender Desk</p>
                  <p className="font-medium text-[#0F1E2E]">
                    <a href="mailto:info@samec.pk" className="hover:underline">
                      info@samec.pk
                    </a>{' '}
                    ·{' '}
                    <a href="mailto:saqib.construct@gmail.com" className="hover:underline">
                      saqib.construct@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0D8A5A] mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Lahore Head Office</p>
                  <p className="text-slate-700 leading-snug">
                    House No. 12, St. No. 16-A, Mian Bilal Park, Darogahwala, Lahore, Punjab,
                    Pakistan
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <a
                  href={buildWhatsAppUrl(
                    `Hello Engr. Muhammad Saqib Rafiq, I am exploring a ${indicativeRange.label} project (~${coveredAreaSqFt.toLocaleString()} sq. ft., est. PKR ${indicativeRange.minMillion}M–${indicativeRange.maxMillion}M) and would like to consult with SAMEC.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[42px] w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#0D8A5A] hover:bg-[#0A6E47] rounded-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  Chat on WhatsApp ({SAMEC_WHATSAPP_DISPLAY})
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              {confirmation ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-[#0D8A5A] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#0F1E2E]">
                    Inquiry Logged Successfully
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{confirmation.fullName}</strong>. Your project brief has been
                    assigned to Engr. Muhammad Saqib Rafiq’s engineering desk.
                  </p>
                  <div className="inline-block px-4 py-2 bg-slate-50 border border-slate-200 rounded-md">
                    <p className="text-xs text-slate-500">Inquiry Reference Code</p>
                    <p className="font-mono text-base font-semibold text-[#0F1E2E] tabular-nums">
                      {confirmation.referenceCode}
                    </p>
                  </div>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={buildWhatsAppUrl(
                        `Hello Engr. Muhammad Saqib Rafiq, I just submitted an inquiry on SAMEC (Ref: ${confirmation.referenceCode}) under the name ${confirmation.fullName}.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[42px] inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-[#0D8A5A] hover:bg-[#0A6E47] rounded-md transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" />
                      Send Reference on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setConfirmation(null)}
                      className="min-h-[42px] px-5 py-2 text-sm font-semibold text-[#0F1E2E] bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="pb-4 border-b border-slate-100">
                    <h3 className="font-display text-xl font-semibold text-[#0F1E2E]">
                      Project Consultation & Quotation Form
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Receive a preliminary engineering review and BOQ schedule within 24 business
                      hours.
                    </p>
                  </div>

                  {errorMsg && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-md bg-rose-50 border border-rose-200 text-sm text-rose-800"
                    >
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="lead-name" className="block text-xs font-medium text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        id="lead-name"
                        type="text"
                        required
                        placeholder="e.g., Tariq Mahmood"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full min-h-[42px] px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D8A5A] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="lead-phone" className="block text-xs font-medium text-slate-700 mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id="lead-phone"
                        type="tel"
                        required
                        placeholder="+92 300 0000000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full min-h-[42px] px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D8A5A] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="lead-email" className="block text-xs font-medium text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="lead-email"
                        type="email"
                        required
                        placeholder="name@company.pk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full min-h-[42px] px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D8A5A] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="lead-location" className="block text-xs font-medium text-slate-700 mb-1.5">
                        Plot / Site Location *
                      </label>
                      <input
                        id="lead-location"
                        type="text"
                        required
                        placeholder="e.g., DHA Phase 6, Lahore"
                        value={cityArea}
                        onChange={(e) => setCityArea(e.target.value)}
                        className="w-full min-h-[42px] px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D8A5A] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="lead-service" className="block text-xs font-medium text-slate-700 mb-1.5">
                        Required Service *
                      </label>
                      <select
                        id="lead-service"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full min-h-[42px] px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D8A5A] focus:border-transparent"
                      >
                        {SERVICE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="lead-budget" className="block text-xs font-medium text-slate-700 mb-1.5">
                        Target Budget Range
                      </label>
                      <select
                        id="lead-budget"
                        value={budgetRange}
                        onChange={(e) => setBudgetRange(e.target.value)}
                        className="w-full min-h-[42px] px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D8A5A] focus:border-transparent"
                      >
                        {BUDGET_TIERS.map((tier) => (
                          <option key={tier} value={tier}>
                            {tier}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lead-scale" className="block text-xs font-medium text-slate-700 mb-1.5">
                      Plot Size / Building Type
                    </label>
                    <input
                      id="lead-scale"
                      type="text"
                      placeholder="e.g., 1 Kanal Turnkey Residence / 8-Marla Commercial Plaza"
                      value={projectScale}
                      onChange={(e) => setProjectScale(e.target.value)}
                      className="w-full min-h-[42px] px-3 py-2 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D8A5A] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-message" className="block text-xs font-medium text-slate-700 mb-1.5">
                      Project Brief, Timeline & Authority Notes
                    </label>
                    <textarea
                      id="lead-message"
                      rows={4}
                      placeholder="Share plot dimensions, authority (LDA, DHA, RUDA, CDA), target start month, or whether architectural drawings are ready..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D8A5A] focus:border-transparent"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      Estimated area synced:{' '}
                      <span className="font-mono font-medium text-slate-700 tabular-nums">
                        {coveredAreaSqFt.toLocaleString()} sq. ft.
                      </span>
                    </p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="min-h-[44px] px-6 py-3 text-sm font-semibold text-white bg-[#0D8A5A] hover:bg-[#0A6E47] disabled:opacity-60 rounded-md transition-colors whitespace-nowrap"
                    >
                      {submitting ? 'Submitting Request...' : 'Request Engineering Quote'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

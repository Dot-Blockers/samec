import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Plus, Radio, RefreshCw, ShieldCheck } from 'lucide-react';
import type { SiteUpdate, SiteUpdateCategory } from '../types/samec';

type ConnectionStatus = 'connecting' | 'connected' | 'reconnecting';

const UPDATE_CATEGORIES: SiteUpdateCategory[] = [
  'Structural & Concrete',
  'QA/QC & Material Test',
  'MEP & Finishes',
  'HSE & Safety Audit',
  'Milestone Handover',
];

function formatRelativeTime(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const mins = Math.max(0, Math.floor(diffMs / 60000));
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function RealTimeSiteUpdates() {
  const [updates, setUpdates] = useState<SiteUpdate[]>([]);
  const [activeSite, setActiveSite] = useState<string>('all');
  const [wsStatus, setWsStatus] = useState<ConnectionStatus>('connecting');
  const [activeClients, setActiveClients] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Field Engineer Dispatch Form State
  const [composerOpen, setComposerOpen] = useState<boolean>(false);
  const [projectSite, setProjectSite] = useState<string>('DHA Phase 6 Commercial Plaza');
  const [location, setLocation] = useState<string>('Sector K, DHA Phase 6, Lahore');
  const [phase, setPhase] = useState<string>('');
  const [category, setCategory] = useState<SiteUpdateCategory>('Structural & Concrete');
  const [engineerName, setEngineerName] = useState<string>('Engr. Muhammad Saqib Rafiq');
  const [engineerRole, setEngineerRole] = useState<string>('Principal Engineer');
  const [metricsNote, setMetricsNote] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(70);
  const [summary, setSummary] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<number | null>(null);
  const retryDelayRef = useRef<number>(1000);

  const fetchInitialUpdates = useCallback(async () => {
    try {
      const res = await fetch('/api/site-updates');
      if (!res.ok) throw new Error('Failed to load site updates');
      const data = (await res.json()) as { updates: SiteUpdate[] };
      setUpdates(data.updates || []);
      setErrorMsg(null);
    } catch {
      setErrorMsg('Unable to load initial site telemetry. Retrying live feed.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialUpdates();
  }, [fetchInitialUpdates]);

  useEffect(() => {
    let unmounted = false;

    const connectWebSocket = () => {
      if (unmounted) return;
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws`;

      try {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          if (unmounted) return;
          setWsStatus('connected');
          retryDelayRef.current = 1000;
        };

        ws.onmessage = (event) => {
          if (unmounted) return;
          try {
            const payload = JSON.parse(event.data as string);
            if (payload.type === 'init' && Array.isArray(payload.updates)) {
              setUpdates(payload.updates);
              if (typeof payload.activeClients === 'number') {
                setActiveClients(payload.activeClients);
              }
              setLoading(false);
            } else if (payload.type === 'presence' && typeof payload.activeClients === 'number') {
              setActiveClients(payload.activeClients);
            } else if (payload.type === 'update:created' && payload.update) {
              const incoming = payload.update as SiteUpdate;
              setUpdates((prev) => {
                if (prev.some((item) => item.id === incoming.id)) return prev;
                return [incoming, ...prev];
              });
            } else if (payload.type === 'update:updated' && payload.update) {
              const updated = payload.update as SiteUpdate;
              setUpdates((prev) =>
                prev.map((item) => (item.id === updated.id ? updated : item))
              );
            }
          } catch {
            // Ignore malformed socket frames
          }
        };

        ws.onclose = () => {
          if (unmounted) return;
          setWsStatus('reconnecting');
          const delay = Math.min(10000, retryDelayRef.current);
          retryDelayRef.current = delay * 1.5;
          reconnectTimerRef.current = window.setTimeout(connectWebSocket, delay);
        };

        ws.onerror = () => {
          ws.close();
        };
      } catch {
        setWsStatus('reconnecting');
      }
    };

    connectWebSocket();

    return () => {
      unmounted = true;
      if (reconnectTimerRef.current) {
        window.clearTimeout(reconnectTimerRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const siteNames = useMemo(() => {
    const unique = Array.from(new Set(updates.map((u) => u.projectSite)));
    return ['all', ...unique];
  }, [updates]);

  const filteredUpdates = useMemo(() => {
    if (activeSite === 'all') return updates;
    return updates.filter((u) => u.projectSite === activeSite);
  }, [updates, activeSite]);

  const handlePublishUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitNotice(null);

    if (!phase.trim() || !summary.trim() || !engineerName.trim()) {
      setSubmitNotice('Please complete the construction phase, engineer name, and field summary.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/site-updates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectSite,
          location,
          phase,
          category,
          engineerName,
          engineerRole,
          metricsNote,
          progressPercent,
          summary,
          qaVerified: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setSubmitNotice(data.error || 'Could not publish site update.');
        return;
      }

      const created = data.update as SiteUpdate;
      setUpdates((prev) => (prev.some((u) => u.id === created.id) ? prev : [created, ...prev]));
      setPhase('');
      setMetricsNote('');
      setSummary('');
      setComposerOpen(false);
      setSubmitNotice('Field update broadcast live to all connected viewers.');
    } catch {
      setSubmitNotice('Network error while broadcasting site update.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleQaVerify = async (id: string) => {
    try {
      const res = await fetch(`/api/site-updates/${id}/verify`, { method: 'PATCH' });
      if (!res.ok) return;
      const data = await res.json();
      const updated = data.update as SiteUpdate;
      setUpdates((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    } catch {
      // Handled gracefully
    }
  };

  return (
    <section
      id="site-updates"
      aria-labelledby="site-updates-heading"
      className="py-16 sm:py-20 bg-white text-white border-b border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header & Real-Time Connection Telemetry */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono mb-3">
              <span className="inline-flex items-center gap-2 text-emerald-400">
                <span
                  aria-hidden="true"
                  className={`w-2 h-2 rounded-full ${
                    wsStatus === 'connected'
                      ? 'bg-emerald-400 animate-pulse'
                      : 'bg-amber-400'
                  }`}
                />
                {wsStatus === 'connected'
                  ? 'Live WebSocket Feed Connected'
                  : wsStatus === 'connecting'
                    ? 'Connecting to Site Telemetry...'
                    : 'Reconnecting Live Feed...'}
              </span>
              <span className="text-black" aria-hidden="true">
                ·
              </span>
              <span className="text-black tabular-nums">
                {activeClients} {activeClients === 1 ? 'Active Viewer' : 'Active Viewers'}
              </span>
            </div>

            <h2
              id="site-updates-heading"
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Real-Time Site Updates & QA/QC Field Telemetry
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
              Clients and project stakeholders monitor concrete pours, rebar inspections, MEP
              hydro-testing, and HSE milestones in real time directly from active sites.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={fetchInitialUpdates}
              className="min-h-[42px] inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors whitespace-nowrap"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Sync Feed
            </button>
            <button
              type="button"
              onClick={() => setComposerOpen((prev) => !prev)}
              aria-expanded={composerOpen}
              className="min-h-[42px] inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0D8A5A] hover:bg-[#0A6E47] rounded-md transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              {composerOpen ? 'Close Field Console' : 'Post Site Update'}
            </button>
          </div>
        </div>

        {/* Field Engineer Dispatch Form */}
        {composerOpen && (
          <form
            onSubmit={handlePublishUpdate}
            className="mb-8 bg-[#172B40] border border-slate-700 rounded-xl p-6 space-y-5"
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-700 pb-4">
              <div>
                <h3 className="font-display text-base font-semibold text-white">
                  Site Engineer Field Dispatch
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Broadcasts immediately via WebSocket to all open client dashboards and persists on
                  the server.
                </p>
              </div>
              <Radio className="w-5 h-5 text-emerald-400 shrink-0" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Active Project Site
                </label>
                <input
                  type="text"
                  value={projectSite}
                  onChange={(e) => setProjectSite(e.target.value)}
                  required
                  className="w-full min-h-[40px] px-3 py-2 text-sm bg-[#0F1E2E] border border-slate-600 rounded-md text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Site Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full min-h-[40px] px-3 py-2 text-sm bg-[#0F1E2E] border border-slate-600 rounded-md text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Inspection Discipline
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SiteUpdateCategory)}
                  className="w-full min-h-[40px] px-3 py-2 text-sm bg-[#0F1E2E] border border-slate-600 rounded-md text-white focus:outline-none focus:border-emerald-500"
                >
                  {UPDATE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Construction Phase / Activity
                </label>
                <input
                  type="text"
                  placeholder="e.g., 4th Floor Roof Slab Pour"
                  value={phase}
                  onChange={(e) => setPhase(e.target.value)}
                  required
                  className="w-full min-h-[40px] px-3 py-2 text-sm bg-[#0F1E2E] border border-slate-600 rounded-md text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Reporting Engineer
                </label>
                <input
                  type="text"
                  value={engineerName}
                  onChange={(e) => setEngineerName(e.target.value)}
                  required
                  className="w-full min-h-[40px] px-3 py-2 text-sm bg-[#0F1E2E] border border-slate-600 rounded-md text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Completion Progress ({progressPercent}%)
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={progressPercent}
                  onChange={(e) => setProgressPercent(Number(e.target.value))}
                  className="w-full accent-[#0D8A5A] mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Field Observation & QA/QC Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter concrete slump test results, reinforcement checks, or daily progress notes..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm bg-[#0F1E2E] border border-slate-600 rounded-md text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Test Metrics / Crew Count (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., Slump: 75mm · Crew: 28"
                  value={metricsNote}
                  onChange={(e) => setMetricsNote(e.target.value)}
                  className="w-full min-h-[40px] px-3 py-2 text-sm bg-[#0F1E2E] border border-slate-600 rounded-md text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  placeholder="Role (e.g., Resident Site Engineer)"
                  value={engineerRole}
                  onChange={(e) => setEngineerRole(e.target.value)}
                  className="w-full min-h-[38px] mt-2 px-3 py-1.5 text-xs bg-[#0F1E2E] border border-slate-600 rounded-md text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <p className="text-xs text-slate-300">
                {submitNotice || 'All entries are logged with an ISO timestamp and QA status.'}
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="min-h-[42px] px-5 py-2 text-sm font-semibold text-white bg-[#0D8A5A] hover:bg-[#0A6E47] disabled:opacity-60 rounded-md transition-colors"
              >
                {submitting ? 'Broadcasting...' : 'Broadcast Site Update'}
              </button>
            </div>
          </form>
        )}

        {!composerOpen && submitNotice && (
          <div
            role="status"
            className="mb-6 px-4 py-3 rounded-lg bg-emerald-950/70 border border-emerald-700/60 text-sm text-emerald-200 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{submitNotice}</span>
          </div>
        )}

        {/* Site Filter Segmented Control */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6">
          {siteNames.map((site) => {
            const active = activeSite === site;
            return (
              <button
                key={site}
                type="button"
                onClick={() => setActiveSite(site)}
                className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-[#0D8A5A] text-white'
                    : 'bg-[#172B40] text-slate-300 hover:text-white border border-slate-700'
                }`}
              >
                {site === 'all' ? 'All Active Sites' : site}
              </button>
            );
          })}
        </div>

        {/* Feed States */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((skeleton) => (
              <div
                key={skeleton}
                className="h-44 rounded-xl bg-[#172B40] border border-slate-800 animate-pulse p-6"
              />
            ))}
          </div>
        ) : errorMsg ? (
          <div className="p-6 rounded-xl bg-[#172B40] border border-amber-700/50 text-sm text-amber-200">
            {errorMsg}
          </div>
        ) : filteredUpdates.length === 0 ? (
          <div className="p-8 rounded-xl bg-[#172B40] border border-slate-700 text-center text-sm text-slate-300">
            No site logs recorded for this filter yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredUpdates.map((item) => (
              <article
                key={item.id}
                className="bg-[#172B40] border border-slate-700/80 rounded-xl p-5 sm:p-6 flex flex-col justify-between gap-4"
              >
                <div>
                  {/* Unboxed Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-emerald-400">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums text-slate-300">
                        {formatRelativeTime(item.timestamp)}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-semibold text-white tabular-nums">
                      {item.progressPercent}% Complete
                    </span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-semibold text-white">
                    {item.projectSite} — {item.phase}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 mb-3">{item.location}</p>
                  <p className="text-sm text-slate-200 leading-relaxed">{item.summary}</p>
                </div>

                {/* Progress Bar & QA Verification Footer */}
                <div className="space-y-3 pt-3 border-t border-slate-700/70">
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0D8A5A] transition-all duration-300"
                      style={{ width: `${item.progressPercent}%` }}
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="text-slate-300">
                      <span className="font-medium text-white">{item.engineerName}</span>
                      <span className="text-slate-400"> · {item.engineerRole}</span>
                      <div className="font-mono text-[11px] text-slate-400 tabular-nums mt-0.5">
                        {item.metricsNote}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleQaVerify(item.id)}
                      className={`min-h-[34px] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        item.qaVerified
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                          : 'bg-slate-800 text-slate-300 border border-slate-600 hover:text-white'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {item.qaVerified ? 'QA/QC Signed Off' : 'Pending QA Sign-off'}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

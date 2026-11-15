import { useEffect, useState } from 'react';
import { ArrowUpRight, Building2, X } from 'lucide-react';
import { COMPLETED_PROJECTS } from '../data/portfolioData';
import type { ProjectCategory, ProjectItem } from '../types/samec';

const CATEGORY_TABS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'institutional', label: 'Institutional' },
  { id: 'residential', label: 'Residential & Heritage' },
  { id: 'banking', label: 'Banking Fit-Outs' },
];

interface ProjectGallerySectionProps {
  onRequestSimilarQuote: (projectTitle: string, location: string) => void;
}

export function ProjectGallerySection({ onRequestSimilarQuote }: ProjectGallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const filteredProjects =
    activeCategory === 'all'
      ? COMPLETED_PROJECTS
      : COMPLETED_PROJECTS.filter((project) => project.category === activeCategory);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-medium text-[#0D8A5A] mb-2">
              Verified Portfolio & Case Studies
            </p>
            <h2
              id="projects-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-[#0F1E2E] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Major commercial, institutional, and turnkey developments across Pakistan.
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter projects by sector"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start lg:self-auto"
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`min-h-[38px] px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D8A5A] ${
                    isActive
                      ? 'bg-white text-[#0F1E2E] shadow-sm'
                      : 'text-slate-600 hover:text-[#0F1E2E]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const isFeaturedWide = activeCategory === 'all' && idx === 0;
            return (
              <article
                key={project.id}
                className={`group bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-colors hover:border-slate-300 ${
                  isFeaturedWide ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="w-full text-left block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0D8A5A]"
                  >
                    <div
                      className={`relative w-full overflow-hidden bg-slate-900 ${
                        isFeaturedWide ? 'aspect-[16/9] md:aspect-[2/1]' : 'aspect-[4/3]'
                      }`}
                    >
                      {!brokenImages[project.id] ? (
                        <img
                          src={project.imageUrl}
                          alt={`${project.title} in ${project.location}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setBrokenImages((prev) => ({ ...prev, [project.id]: true }))
                          }
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0F1E2E] to-slate-800 text-white">
                          <Building2 className="w-10 h-10 text-[#0D8A5A] mb-2" />
                          <p className="font-display font-semibold text-base">{project.title}</p>
                        </div>
                      )}
                    </div>
                  </button>

                  <div className="p-6">
                    {/* Unboxed Metadata Line */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="font-medium text-[#0D8A5A]">{project.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums text-slate-700 font-medium">
                        {project.costLabel}
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-semibold text-[#0F1E2E] mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 truncate">
                    Client: <strong className="font-medium text-slate-700">{project.client}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="min-h-[38px] inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F1E2E] hover:text-[#0D8A5A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D8A5A] rounded px-1"
                  >
                    Project Dossier
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Project Dossier Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dossier-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs text-[#0D8A5A] font-medium">
                  {selectedProject.categoryLabel} · {selectedProject.yearRange}
                </p>
                <h3
                  id="dossier-modal-title"
                  className="font-display text-lg sm:text-xl font-bold text-[#0F1E2E] truncate"
                >
                  {selectedProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project dossier"
                className="min-h-[40px] min-w-[40px] inline-flex items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-900 border border-slate-200">
                {!brokenImages[selectedProject.id] ? (
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#0F1E2E] text-white">
                    <Building2 className="w-10 h-10 text-[#0D8A5A]" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                {selectedProject.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="text-xs text-slate-500">{metric.label}</p>
                    <p className="font-mono text-sm font-semibold text-[#0F1E2E] tabular-nums mt-0.5">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <p>
                  <strong className="text-[#0F1E2E]">Location:</strong> {selectedProject.location}
                </p>
                <p>
                  <strong className="text-[#0F1E2E]">Client / Authority:</strong>{' '}
                  {selectedProject.client} ({selectedProject.authority})
                </p>
                <p>
                  <strong className="text-[#0F1E2E]">Contractor / Consultant:</strong>{' '}
                  {selectedProject.contractorOrConsultant}
                </p>
                <p>
                  <strong className="text-[#0F1E2E]">Leadership Role:</strong>{' '}
                  {selectedProject.role}
                </p>
              </div>

              <div>
                <h4 className="font-display text-sm font-semibold text-[#0F1E2E] mb-2">
                  Executed Scope & Deliverables
                </h4>
                <ul className="space-y-1.5 text-sm text-slate-700">
                  {selectedProject.deliverables.map((item) => (
                    <li key={item}>
                      <span className="text-[#0D8A5A] font-semibold mr-2" aria-hidden="true">
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="min-h-[40px] px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = selectedProject.title;
                    const loc = selectedProject.location;
                    setSelectedProject(null);
                    onRequestSimilarQuote(title, loc);
                  }}
                  className="min-h-[40px] px-5 py-2 text-sm font-semibold text-white bg-[#0D8A5A] hover:bg-[#0A6E47] rounded-md transition-colors"
                >
                  Request Similar Project Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

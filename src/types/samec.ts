export type ProjectCategory =
  | 'all'
  | 'commercial'
  | 'institutional'
  | 'residential'
  | 'banking';

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  location: string;
  client: string;
  role: string;
  contractorOrConsultant: string;
  costLabel: string;
  yearRange: string;
  authority: string;
  imageUrl: string;
  summary: string;
  deliverables: string[];
  metrics: {
    label: string;
    value: string;
  }[];
}

export type SiteUpdateCategory =
  | 'Structural & Concrete'
  | 'QA/QC & Material Test'
  | 'MEP & Finishes'
  | 'HSE & Safety Audit'
  | 'Milestone Handover';

export interface SiteUpdate {
  id: string;
  projectSite: string;
  location: string;
  phase: string;
  category: SiteUpdateCategory;
  engineerName: string;
  engineerRole: string;
  summary: string;
  metricsNote: string;
  progressPercent: number;
  qaVerified: boolean;
  timestamp: string;
}

export interface LeadSubmissionPayload {
  fullName: string;
  phone: string;
  email: string;
  cityArea: string;
  serviceType: string;
  projectScale: string;
  estimatedAreaSqFt: number;
  budgetRange: string;
  message: string;
}

export interface LeadRecord extends LeadSubmissionPayload {
  id: string;
  referenceCode: string;
  createdAt: string;
}

import heroCommercialTower from '../assets/images/hero_commercial_tower_1794735722170.jpg';
import projectDhaComplex from '../assets/images/project_dha_complex_1794735722644.png';
import projectArenaWalk from '../assets/images/project_arena_walk_1794735722576.png';
import projectArmyMuseum from '../assets/images/project_army_museum_1794735723927.jpg';
import projectLuxuryResidence from '../assets/images/project_luxury_residence_1794735723691.png';
import type { ProjectItem } from '../types/samec';

export const COMPANY_ASSETS = {
  logoUrl: '/assets/aistudio/WhatsApp_Image_2026-11-13_at_4.17.02_PM_a7126e38.jpeg',
  companyProfilePdf: '/assets/aistudio/SAMEC_Company_Profile_fd23ece0.pdf',
  ownerCvPdf: '/assets/aistudio/ENGR._MUHAMMAD_SAQIB_RAFIQ-26__1___1___1___1__bc278bd7.pdf',
  heroImage: projectArmyMuseum,
};

export const COMPLETED_PROJECTS: ProjectItem[] = [
  {
    id: 'dha-phase-6-complex',
    title: 'Main Office Complex, DHA Phase 6',
    category: 'commercial',
    categoryLabel: 'Commercial & Corporate',
    location: 'DHA Phase 6, Lahore',
    client: 'DHA Lahore / Pakistan Army',
    role: 'Project Engineer (Execution & Controls)',
    contractorOrConsultant: 'M/S Construct Pvt. Ltd. — Consulting Architects',
    costLabel: 'PKR 1,984 Million',
    yearRange: '2016 – 2019',
    authority: 'DHA Lahore',
    imageUrl: projectDhaComplex,
    summary:
      'Multi-storey corporate headquarters featuring architectural fair-faced reinforced concrete frames, double-glazed curtain walling, executive parking courts, and integrated MEP infrastructure.',
    deliverables: [
      'Reinforced concrete (RCC) structural execution & slump/cube QA testing',
      'Architectural exterior stone, glazing, and MEP coordination',
      'Interim Payment Certificate (IPC) verification & subcontractor billing',
      'External road networks, storm drainage, and executive plaza hardscaping',
    ],
    metrics: [
      { label: 'Project Valuation', value: 'PKR 1,984M' },
      { label: 'Jurisdiction', value: 'DHA Phase 6' },
      { label: 'Structural Code', value: 'ACI / ASTM' },
    ],
  },
  {
    id: 'arena-walk-johar-town',
    title: 'Arena Walk & Shop, Johar Town',
    category: 'commercial',
    categoryLabel: 'Commercial & Retail',
    location: 'Johar Town, Lahore',
    client: 'LDA TEPA',
    role: 'Project Manager (Finishes & Fit-Out)',
    contractorOrConsultant: 'I.KAN Engineering Services (J.V.) with Construct · Asian Consultant Engineer',
    costLabel: 'PKR 1,950 Million',
    yearRange: '2019 – 2020',
    authority: 'LDA TEPA',
    imageUrl: projectArenaWalk,
    summary:
      'High-footfall retail promenade and commercial shopping arcade engineered for Lahore Development Authority (LDA TEPA) featuring double-height glazed storefronts and stone-paved walkways.',
    deliverables: [
      'Complete interior & exterior architectural finishes management',
      'Procurement scheduling and site material logistics coordination',
      'Subcontractor work-package execution and quality assurance audits',
      'Client and consultant progress reporting with critical-path tracking',
    ],
    metrics: [
      { label: 'Project Valuation', value: 'PKR 1,950M' },
      { label: 'Authority', value: 'LDA TEPA' },
      { label: 'Scope', value: 'Turnkey Finishes' },
    ],
  },
  {
    id: 'army-museum-lahore',
    title: 'Army Museum Lahore',
    category: 'institutional',
    categoryLabel: 'Institutional & Civic',
    location: 'Lahore Cantonment, Lahore',
    client: '4-Corps Pakistan Army',
    role: 'Project Manager',
    contractorOrConsultant: 'M/S Construct Pvt. Ltd. — Consulting Architects',
    costLabel: 'PKR 1,625 Million',
    yearRange: '2013 – 2016',
    authority: 'Cantonment / Army Engineering',
    imageUrl: projectArmyMuseum,
    summary:
      'Monumental civic and institutional museum facility distinguished by long-span cantilevered precast and cast-in-situ concrete galleries, ceremonial granite plazas, and specialized exhibition lighting.',
    deliverables: [
      'End-to-end site management from structural works to gallery commissioning',
      'Cantilevered concrete, structural steel framing, and limestone cladding',
      'Specialized exhibition hall acoustics, HVAC, and MEP systems integration',
      'Daily field quality control, safety compliance, and client bill handling',
    ],
    metrics: [
      { label: 'Project Valuation', value: 'PKR 1,625M' },
      { label: 'Client', value: '4-Corps Pak Army' },
      { label: 'Delivery', value: 'Full Lifecycle' },
    ],
  },
  {
    id: 'gulberg-luxury-residences',
    title: 'Nishat Plaza & Executive Residences',
    category: 'residential',
    categoryLabel: 'Residential & Heritage',
    location: 'Gulberg-III & Jail Road, Lahore',
    client: 'Nishat Mills Ltd. & Private Estates',
    role: 'Client Project Engineer / Site Supervisor',
    contractorOrConsultant: 'Interface Developers & Design Consultants / Nishat Engineering',
    costLabel: 'Turnkey Commercial & Estate',
    yearRange: '2007 – 2013',
    authority: 'LDA Lahore',
    imageUrl: projectLuxuryResidence,
    summary:
      'Bespoke residential renovations including 28 Main Jail Road (Mansha House pool & estate renovation) alongside Nishat Outlet Plaza near Liberty Roundabout, Gulberg-III, Lahore.',
    deliverables: [
      'Structural retrofitting, waterproofing, and luxury stone/timber finishing',
      'Custom architectural working drawings and space optimization',
      'Direct client representation, BOQ rate analysis, and vendor control',
      'Also includes Red Fort Muzaffarabad Heritage Restoration (AJ&K Govt.)',
    ],
    metrics: [
      { label: 'Districts', value: 'Gulberg & DHA' },
      { label: 'Heritage Work', value: 'Red Fort AJ&K' },
      { label: 'Standard', value: 'Turnkey Luxury' },
    ],
  },
  {
    id: 'nationwide-banking-rollout',
    title: 'Nationwide Commercial Banking Network',
    category: 'banking',
    categoryLabel: 'Banking & Corporate Fit-Outs',
    location: 'Lahore, Islamabad, Peshawar, Faisalabad, Sialkot & Swat',
    client: 'Standard Chartered, HBL, MCB, Summit Bank & Bank of Khyber',
    role: 'Quantity Surveyor (QS) & Site Engineer',
    contractorOrConsultant: 'Rehman Construction & Interiors Engineers & Contractors',
    costLabel: '25+ Multi-City Branches',
    yearRange: '2009 – 2012',
    authority: 'CDA / LDA / KDA / Municipal',
    imageUrl: heroCommercialTower,
    summary:
      'Fast-track structural remodeling, security vault engineering, and branded corporate interior execution for Pakistan’s tier-1 financial institutions across Punjab, ICT, and KP.',
    deliverables: [
      'Bill of Quantities (BOQs), market rate analysis, and contractor billing',
      'Standard Chartered branches (Islamabad F-7/UNDP, Lahore DHA/Gulberg/Tufail Rd)',
      'HBL & MCB regional branches across Islamabad, Swat, Mardan & Faisalabad',
      'Bank of Khyber (State Life Building Peshawar) & Summit Bank guest houses',
    ],
    metrics: [
      { label: 'Branches Delivered', value: '25+ Sites' },
      { label: 'Cities Covered', value: '8+ Cities' },
      { label: 'Focus', value: 'QS & Fast-Track' },
    ],
  },
];

export const CORE_SERVICES = [
  {
    index: '01',
    title: 'Construction & Turnkey Execution',
    summary:
      'Single-source grey structure and luxury finishing execution for commercial plazas, custom residences, and industrial facilities across Pakistan.',
    highlights: [
      'Complete RCC grey structure & high-end interior/exterior finishing',
      'Civil infrastructure: internal road networks, storm drainage & boundary walls',
      'Strict compliance with ACI, ASTM, and Pakistan Building Code specifications',
      'Concrete slump & cube strength testing with steel reinforcement inspections',
    ],
    spanClass: 'lg:col-span-2',
  },
  {
    index: '02',
    title: 'Project Management Consultancy (PMC)',
    summary:
      'Disciplined cost, schedule, and quality controls protecting client capital from tender award through final commissioning.',
    highlights: [
      'Primavera P6 & MS Project master scheduling with critical-path monitoring',
      'Detailed Bill of Quantities (BOQs), rate analysis & bid evaluation',
      'Contractor supervision, IPC billing verification & Zero-Harm HSE audits',
    ],
    spanClass: 'lg:col-span-1',
  },
  {
    index: '03',
    title: 'Architectural & Structural Design',
    summary:
      'Integrated conceptual space planning, structural engineering, and statutory approval drawings under one roof.',
    highlights: [
      '2D architectural working drawings & 3D exterior/interior visualizations',
      'Structural analysis, foundation engineering & RCC / steel detailing',
      'MEP coordination & submission drawings for LDA, DHA, RUDA, CDA & KDA',
    ],
    spanClass: 'lg:col-span-3',
  },
];

export const ORGANIZATIONAL_DEPARTMENTS = [
  {
    department: 'Design & Engineering',
    leadRoles: ['Principal Architect', 'Structural Design Engineer', 'MEP Coordinator', 'CAD / BIM Draftsmen'],
    mandate:
      'Produces architectural working drawings, structural calculations, MEP layouts, and LDA/DHA/RUDA/CDA/KDA statutory approval submissions.',
  },
  {
    department: 'Project Mgmt & Controls',
    leadRoles: ['Lead Planning Engineer', 'Quantity Surveyor (QS)', 'Procurement Officer', 'Contract Administrator'],
    mandate:
      'Governs project budgets, BOQs, contractor IPC billing verification, material procurement schedules, and schedule risk mitigation.',
  },
  {
    department: 'Construction & Operations',
    leadRoles: ['Project Managers', 'Resident Site Engineers', 'QA/QC & HSE Inspectors', 'Site Supervisors & Foremen'],
    mandate:
      'Executes day-to-day site works, concrete slump and cube strength testing, steel reinforcement inspections, and strict HSE enforcement.',
  },
];

export const CAREER_TIMELINE = [
  {
    period: 'Oct 2023 – Present',
    role: 'CEO & Principal Engineer / Manager Projects',
    organization: 'SAMEC Consultants & Engineers · Eastwing Architectural Studio',
    detail: 'Directs multidisciplinary turnkey construction, structural sign-offs, BOQ controls, and client advisory across Lahore and nationwide.',
  },
  {
    period: 'Feb 2021 – Sep 2023',
    role: 'Engineer (BPS-17)',
    organization: 'Tourism & Archeology Department, Govt. of AJ&K',
    detail: 'Led structural repair, conservation engineering, and site execution for the historic Red Fort Muzaffarabad.',
  },
  {
    period: 'Dec 2019 – Dec 2020',
    role: 'Project Manager (Finishes Work)',
    organization: 'IKAN Engineering Services Pvt. Ltd.',
    detail: 'Managed finishes execution and consultant coordination for Arena Walk & Shop, Johar Town Lahore (LDA TEPA, PKR 1,950M).',
  },
  {
    period: 'Oct 2013 – Dec 2019',
    role: 'Project Manager & Project Engineer',
    organization: 'Construct Pvt. Ltd. — Consulting Architects',
    detail: 'Delivered Army Museum Lahore (PKR 1,625M) as Project Manager and Main Office Complex DHA Phase 6 (PKR 1,984M) as Project Engineer.',
  },
  {
    period: 'Jan 2013 – Sep 2013',
    role: 'Client Project Engineer',
    organization: 'Nishat Mills Ltd.',
    detail: 'Oversaw renovation of 28 Main House Jail Road Lahore and Nishat Linen Outlet at Centaurus Mall Islamabad.',
  },
  {
    period: 'Sep 2007 – Dec 2012',
    role: 'Q/S, Site Engineer & Site Supervisor',
    organization: 'Rehman Construction & Interiors · Interface Developers',
    detail: 'Executed 25+ bank branch renovations nationwide (SCB, HBL, MCB, Summit, BoK) and Nishat Linen Plaza Gulberg-III.',
  },
];

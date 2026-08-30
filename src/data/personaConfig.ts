import { UserRole, AcquisitionStage } from '../types';

export interface PersonaDetails {
  role: UserRole;
  title: string;
  shortTitle: string;
  badgeColor: string;
  jurisdiction: string;
  designation: string;
  statutoryMandate: string;
  focusStages: AcquisitionStage[];
  kpiLabels: {
    kpi1: { label: string; unit: string; description: string };
    kpi2: { label: string; unit: string; description: string };
    kpi3: { label: string; unit: string; description: string };
    kpi4: { label: string; unit: string; description: string };
  };
  primaryActionLabel: string;
  workflowFilterTags: string[];
}

export const PERSONA_CONFIGS: Record<UserRole, PersonaDetails> = {
  CENTRAL_MINISTRY: {
    role: 'CENTRAL_MINISTRY',
    title: 'Central Ministry / PM GatiShakti Apex Administrator',
    shortTitle: 'Central Ministry',
    badgeColor: '#0ea5e9',
    jurisdiction: 'National Infrastructure Pipeline (All India)',
    designation: 'Joint Secretary (Infrastructure Monitoring) / PM GatiShakti NMP',
    statutoryMandate: 'Macro portfolio oversight, inter-ministerial policy clearance, and capital risk mitigation under PM GatiShakti National Master Plan.',
    focusStages: [
      'STAGE_S4_PRELIMINARY',
      'STAGE_S11_SIA',
      'STAGE_S19_DECLARATION',
      'STAGE_S23_AWARD',
      'STAGE_COMPENSATION_DISBURSAL',
      'STAGE_S38_POSSESSION',
      'STAGE_RR_REHABILITATION'
    ],
    kpiLabels: {
      kpi1: { label: 'National Capital at Risk', unit: '₹ Crores', description: 'Sanctioned value in delayed corridors' },
      kpi2: { label: 'Mega Corridors Monitored', unit: 'Projects', description: 'National Highway & Rail corridors' },
      kpi3: { label: 'Average Delay Forecast', unit: 'Months Overrun', description: 'Across all 28 States & UTs' },
      kpi4: { label: 'Inter-Ministerial Bottlenecks', unit: 'Pending Approvals', description: 'Defense, Railway & MoEFCC NOCs' }
    },
    primaryActionLabel: 'Central Policy Escalation',
    workflowFilterTags: ['National Priority', 'Cabinet Committee on Infra', 'Macro Funding']
  },

  STATE_CALA: {
    role: 'STATE_CALA',
    title: 'State Nodal Officer (CALA Coordinator)',
    shortTitle: 'State Nodal (CALA)',
    badgeColor: '#8b5cf6',
    jurisdiction: 'State Revenue & Land Acquisition Department',
    designation: 'Principal Secretary (Revenue) / State Nodal CALA Officer',
    statutoryMandate: 'Statewide CALA desk coordination, State Gazette Section 19/20E notifications, and State Forest/Revenue joint surveys.',
    focusStages: [
      'STAGE_S11_SIA',
      'STAGE_S19_DECLARATION',
      'STAGE_S23_AWARD',
      'STAGE_COMPENSATION_DISBURSAL'
    ],
    kpiLabels: {
      kpi1: { label: 'Statewide Disbursal Velocity', unit: '% Disbursed', description: 'State Treasury to CALA Escrow' },
      kpi2: { label: 'Pending State Gazette Orders', unit: 'Sec 19 Declarations', description: 'Awaiting State Press publication' },
      kpi3: { label: 'Disputed District Clusters', unit: 'Districts at Risk', description: 'Requiring State Nodal intervention' },
      kpi4: { label: 'Forest Compensatory Land', unit: 'Ha Mutated', description: 'CA revenue land allocation status' }
    },
    primaryActionLabel: 'Issue State Gazette Directive',
    workflowFilterTags: ['State Revenue Directive', 'SLAO Review Meeting', 'CA Land Mutation']
  },

  DISTRICT_COLLECTOR: {
    role: 'DISTRICT_COLLECTOR',
    title: 'District Collector & Competent Authority (CALA/SLAO)',
    shortTitle: 'District Collector',
    badgeColor: '#10b981',
    jurisdiction: 'District Collectorate & Sub-Divisional Revenue Tehsils',
    designation: 'District Magistrate & Competent Authority Land Acquisition (CALA)',
    statutoryMandate: 'Field-level Joint Measurement Surveys (JMS), village public hearings, Aadhaar-linked compensation disbursal, and physical land possession.',
    focusStages: [
      'STAGE_S11_SIA',
      'STAGE_S23_AWARD',
      'STAGE_COMPENSATION_DISBURSAL',
      'STAGE_S38_POSSESSION'
    ],
    kpiLabels: {
      kpi1: { label: 'Cadastral Khasra Errors', unit: 'Parcels Mismatched', description: 'Pending drone re-survey spot mutation' },
      kpi2: { label: 'Spot-Disbursement Queue', unit: 'Landowners Pending', description: 'Aadhaar / Bank IFSC re-validations' },
      kpi3: { label: 'Gram Sabha Quorum Status', unit: '% Hamlets Consented', description: 'PESA & SIA public hearings' },
      kpi4: { label: 'Sec 38 Possession Handover', unit: 'Ha Ready', description: 'Free of standing crop encumbrance' }
    },
    primaryActionLabel: 'Deploy Tehsil Mobile Camp',
    workflowFilterTags: ['Spot Camp Verification', 'RTK Drone Survey', 'Joint Measurement Survey']
  },

  PROJECT_DIRECTOR: {
    role: 'PROJECT_DIRECTOR',
    title: 'Infrastructure Project Director (NHAI / Rail / Metro)',
    shortTitle: 'Project Director',
    badgeColor: '#f59e0b',
    jurisdiction: 'Project Implementation Unit (PIU) & Linear Corridor Chainages',
    designation: 'Chief Project Manager / Project Director (NHAI / IRCON / DFCCIL)',
    statutoryMandate: 'Linear engineering corridor handover, contractor workfront continuity, utility shifting (power/gas/telecom), and milestone commissioning.',
    focusStages: [
      'STAGE_S23_AWARD',
      'STAGE_COMPENSATION_DISBURSAL',
      'STAGE_S38_POSSESSION',
      'STAGE_RR_REHABILITATION'
    ],
    kpiLabels: {
      kpi1: { label: 'Linear Workfront Handover', unit: '% Corridor Cleared', description: 'Continuous unencumbered chainages' },
      kpi2: { label: 'Contractor Stoppage Risk', unit: 'Pkg Workfronts', description: 'Heavy machinery idle risk' },
      kpi3: { label: 'Utility Shifting Clearances', unit: 'HT Lines & Pipelines', description: 'Transco & Municipal approvals' },
      kpi4: { label: 'Rehabilitated Families', unit: 'Families Relocated', description: 'Model township possession' }
    },
    primaryActionLabel: 'Inspect Linear Chainage',
    workflowFilterTags: ['Contractor Workfront', 'Utility Shifting', 'Demarcation Pegs']
  },

  LEGAL_OFFICER: {
    role: 'LEGAL_OFFICER',
    title: 'Legal & Dispute Adjudication Cell Lead',
    shortTitle: 'Legal & Disputes',
    badgeColor: '#f43f5e',
    jurisdiction: 'High Courts, Land Acquisition Rehabilitation & Resettlement Authority (LARRA)',
    designation: 'Special Standing Counsel / Member Secretary (Lok Adalat Bench)',
    statutoryMandate: 'Adjudication of High Court writ petitions, Section 64 reference petitions for valuation enhancement, title apportionment suits, and out-of-court consent settlements.',
    focusStages: [
      'STAGE_S19_DECLARATION',
      'STAGE_S23_AWARD',
      'STAGE_COMPENSATION_DISBURSAL'
    ],
    kpiLabels: {
      kpi1: { label: 'Active Court Writs & Injunctions', unit: 'Stay Petitions', description: 'Stalling Sec 19 final declaration' },
      kpi2: { label: 'Disputed Solatium at Stake', unit: '₹ Crores in Dispute', description: 'Market valuation multiplier claims' },
      kpi3: { label: 'Lok Adalat Settlement Target', unit: 'Cases Listed', description: 'Eligible for 25% consent bonus' },
      kpi4: { label: 'Title Apportionment Partition Suits', unit: 'Joint Heir Claims', description: 'Pending in Civil Courts' }
    },
    primaryActionLabel: 'Convene Special Lok Adalat Bench',
    workflowFilterTags: ['High Court Writs', 'Lok Adalat Bonus', 'Sec 64 Reference']
  },

  CITIZEN_LANDOWNER: {
    role: 'CITIZEN_LANDOWNER',
    title: 'Citizen, Landowner & Property Buyer (Public Portal)',
    shortTitle: 'Citizen / Landowner',
    badgeColor: '#06b6d4',
    jurisdiction: 'Public Land Title, Cadastral Map & Encumbrance Verification',
    designation: 'Affected Citizen / Prospective Land Buyer / Farmer',
    statutoryMandate: 'Public transparency: check if any land parcel is under active court stay or government acquisition, inspect registered owner names, and review complete historical transaction deeds.',
    focusStages: [
      'STAGE_S4_PRELIMINARY',
      'STAGE_S19_DECLARATION',
      'STAGE_S23_AWARD',
      'STAGE_COMPENSATION_DISBURSAL'
    ],
    kpiLabels: {
      kpi1: { label: 'Litigation-Free Parcels', unit: '% Clean Title', description: 'In searched district/village' },
      kpi2: { label: 'Acquisition Notified Plots', unit: 'Under Infrastructure Path', description: 'Section 4 / Section 19 issued' },
      kpi3: { label: 'Statutory Solatium Rate', unit: 'Multiplier Factor', description: 'RFCTLARR 2013 Market Value (2x to 4x)' },
      kpi4: { label: 'Avg Historical Deeds', unit: 'Registrations / Land', description: 'Chain of Title records available' }
    },
    primaryActionLabel: 'Verify Land Title & Download Certificate',
    workflowFilterTags: ['Litigation Check', 'Chain of Title', 'Compensation Calculator']
  }
};

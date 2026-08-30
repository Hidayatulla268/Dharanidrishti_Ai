export type RiskCategory = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type ProjectAgency = 
  | 'NHAI' 
  | 'Ministry of Railways (MoR)' 
  | 'DFCCIL' 
  | 'NHSRCL (High Speed Rail)' 
  | 'AAI / MoCA (Airports)' 
  | 'MNRE (Renewable Energy)' 
  | 'State PWD' 
  | 'Dedicated Freight Corridor';

export type InfrastructureType = 
  | 'Expressway & National Highway' 
  | 'High-Speed / Dedicated Rail Corridor' 
  | 'Greenfield Airport' 
  | 'Ultra Mega Solar & Wind Park' 
  | 'Industrial & Logistics Corridor' 
  | 'Port Connectivity & Waterway' 
  | 'Urban Metro & Rapid Transit';

export type AcquisitionStage = 
  | 'STAGE_S4_PRELIMINARY'       // Section 4(1) - Preliminary Notification
  | 'STAGE_S11_SIA'              // Section 11 - Social Impact Assessment
  | 'STAGE_S19_DECLARATION'      // Section 19 - Declaration of Acquisition
  | 'STAGE_S23_AWARD'            // Section 23 - Award & Valuation
  | 'STAGE_COMPENSATION_DISBURSAL' // Direct Benefit Transfer / Escrow
  | 'STAGE_S38_POSSESSION'       // Section 38 - Physical Possession
  | 'STAGE_RR_REHABILITATION';   // R&R (Rehabilitation & Resettlement)

export interface StageProgress {
  stage: AcquisitionStage;
  stageName: string;
  actSection: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'DELAYED';
  plannedDays: number;
  actualDaysSpent: number;
  delayDays: number;
  delayProbabilityPct: number; // 0 to 100
  keyBottleneck?: string;
  completionDate?: string;
}

export interface SHAPFeature {
  featureName: string;
  category: 'LEGAL' | 'ADMINISTRATIVE' | 'FINANCIAL' | 'R&R' | 'ENVIRONMENTAL' | 'CADASSTRAL';
  shapValue: number; // + increases delay risk, - decreases delay risk
  featureValue: string | number;
  baselineAverage: string | number;
  impactDescription: string;
  mitigationPotential: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface DelayDriver {
  id: string;
  title: string;
  category: 'LEGAL' | 'ADMINISTRATIVE' | 'FINANCIAL' | 'R&R' | 'ENVIRONMENTAL' | 'GEOSPATIAL';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  weightContribution: number; // percentage (e.g. 34%)
  rootCause: string;
  affectedStage: AcquisitionStage;
  leadIndicator: string;
}

export interface PrescriptiveAction {
  id: string;
  projectId: string;
  title: string;
  category: 'LEGAL_FASTTRACK' | 'DISBURSEMENT_SPEED' | 'INTER_DEPT_NOC' | 'RR_NEGOTIATION' | 'DRONE_RESURVEY';
  priority: 'URGENT' | 'HIGH' | 'MEDIUM';
  description: string;
  actionableSteps: string[];
  expectedDelayReductionDays: number;
  estimatedCostSavingsCr: number;
  assignedAuthority: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'EXECUTED';
  deadlineDate: string;
  escalationTier: 'DISTRICT_COLLECTOR' | 'STATE_NODAL_CALA' | 'CENTRAL_MINISTRY';
}

export interface LandAcquisitionProject {
  id: string;
  code: string;
  name: string;
  corridor: string;
  state: string;
  district: string;
  subDistricts: string[];
  agency: ProjectAgency;
  projectType: InfrastructureType;
  
  // Land & People Parameters
  totalLandAreaHa: number;
  acquiredLandAreaHa: number;
  landTypeDistribution: {
    privateAgriculturalPct: number;
    privateCommercialPct: number;
    governmentRevenuePct: number;
    forestProtectedPct: number;
    tribalPesaPct: number;
  };
  totalAffectedFamilies: number;
  rehabilitatedFamilies: number;
  
  // Financials (₹ in Crores)
  sanctionedBudgetCr: number;
  compensationBudgetCr: number;
  compensationDisbursedCr: number;
  disbursementPercentage: number;
  
  // Risk & Delay Forecast (AI Engine Output)
  riskScore: number; // 0 - 100
  riskCategory: RiskCategory;
  delayProbabilityPct: number; // 0 - 100%
  predictedDelayMonths: number;
  baselineDurationMonths: number;
  estimatedTotalMonths: number;
  
  // Dates
  startDate: string;
  plannedCompletionDate: string;
  predictedCompletionDate: string;
  currentStage: AcquisitionStage;
  
  // Bottleneck indicators
  pendingLitigationCases: number;
  pendingForestClearances: boolean;
  cadastralSurveyMismatches: number;
  gramSabhaResolutionPassed: boolean;
  interDeptCoordinationScore: number; // 0 - 10
  
  // Geospatial
  latitude: number;
  longitude: number;
  corridorPath?: [number, number][]; // Polylines
  
  // Stage Breakdowns & XAI
  stages: StageProgress[];
  shapFeatures: SHAPFeature[];
  delayDrivers: DelayDriver[];
  prescriptiveActions: PrescriptiveAction[];
  
  lastUpdated: string;
}

export interface ModelMetrics {
  version: string;
  algorithm: string;
  rocAucScore: number;
  rmseMonths: number;
  maeDays: number;
  f1Score: number;
  precision: number;
  recall: number;
  totalTrainingSamples: number;
  lastRetrainedAt: string;
  featureImportances: { feature: string; weight: number; category: string }[];
  confusionMatrix: {
    truePositive: number;
    falsePositive: number;
    trueNegative: number;
    falseNegative: number;
  };
  driftStatus: 'HEALTHY' | 'MODERATE_DRIFT' | 'SIGNIFICANT_DRIFT';
}

export interface AlertNotification {
  id: string;
  projectId: string;
  projectName: string;
  state: string;
  district: string;
  timestamp: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'INFO';
  triggerRule: string;
  message: string;
  prescribedRemedy: string;
  isRead: boolean;
  targetRole: UserRole;
  channel: 'SMS' | 'EMAIL' | 'PORTAL' | 'GATISHAKTI_NMP';
}

export type UserRole = 
  | 'CENTRAL_MINISTRY'      // PM GatiShakti / Ministry Administrator
  | 'STATE_CALA'           // State Nodal Officer / CALA Coordinator
  | 'DISTRICT_COLLECTOR'   // District Collector / Competent Authority
  | 'PROJECT_DIRECTOR'     // NHAI / Rail / Infrastructure Project Director
  | 'LEGAL_OFFICER'        // Legal & Dispute Resolution Cell
  | 'CITIZEN_LANDOWNER';   // Citizen, Landowner & Property Buyer (Public Portal)

export interface RegistrationDeedRecord {
  deedNumber: string;
  registrationDate: string;
  deedType: 'SALE_DEED' | 'MUTATION_INHERITANCE' | 'GIFT_DEED' | 'MORTGAGE_RELEASE' | 'LEASE_AGREEMENT';
  subRegistrarOffice: string;
  partiesInvolved: string;
  considerationAmountCr?: number;
  status: 'REGISTERED' | 'MUTATED' | 'DISPUTED';
}

export interface RegistrationMilestone {
  stepNumber: number;
  title: string;
  department: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  completedDate?: string;
  description: string;
  daysRemaining?: number;
}

export interface LandRegistrationProgress {
  overallCompletionPct: number;
  completedStepsCount: number;
  totalStepsCount: number;
  currentActiveStep: string;
  estimatedDaysToFinalIssuance: number;
  applicationToken: string;
  subRegistrarCircle: string;
  stampDutyStatus: 'PAID' | 'EXEMPTED' | 'PENDING_ASSESSMENT';
  milestones: RegistrationMilestone[];
}

export interface LandParcelDossier {
  khasraGatNumber: string;
  address: string;
  village: string;
  taluka: string;
  district: string;
  state: string;
  pincode: string;
  
  // Ownership Details
  registeredOwnerName: string;
  jointOwners: string[];
  ownershipType: 'FREEHOLD_INDIVIDUAL' | 'HUF_ANCESTRAL' | 'JOINT_FAMILY' | 'GOVERNMENT_LEASE';
  landClassification: 'AGRICULTURAL_IRRIGATED' | 'AGRICULTURAL_DRY' | 'NON_AGRICULTURAL_RESIDENTIAL' | 'COMMERCIAL_INDUSTRIAL';
  totalAreaAcre: number;
  totalAreaHa: number;

  // Litigation & Encumbrance
  isUnderLitigation: boolean;
  litigationSeverity: 'NONE' | 'ACTIVE_HIGH_COURT_STAY' | 'TRIBUNAL_VALUATION_DISPUTE' | 'CIVIL_PARTITION_SUIT';
  litigationDetails?: {
    caseNumber: string;
    courtName: string;
    petitioners: string;
    disputeDescription: string;
    stayOrderActive: boolean;
    nextHearingDate: string;
  };

  // Government Infrastructure Acquisition
  isNotifiedForAcquisition: boolean;
  infrastructureProjectName?: string;
  acquisitionAct?: string;
  currentAcquisitionStage?: string;
  estimatedCompensationPerAcreLakhs?: number;
  solatiumMultiplier?: string;

  // Registration History
  totalRegistrationsCount: number;
  registrationHistory: RegistrationDeedRecord[];

  // Registration Lifecycle Completion Progress
  registrationProgress: LandRegistrationProgress;

  // Coordinates
  latitude: number;
  longitude: number;
  boundaryCoordinates?: [number, number][];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  category: 'PREDICTION_OVERRIDE' | 'MITIGATION_STATUS' | 'DATA_INGESTION' | 'MODEL_RETRAIN' | 'ACCESS_CHANGE' | 'CITIZEN_SEARCH' | 'SECURITY_EVENT' | 'KEY_ROTATION';
  targetProjectCode?: string;
  details: string;
  ipAddress: string;
  // Cryptographic Tamper-Evidence
  blockHeight?: number;
  previousHash?: string;
  hash?: string;
  digitalSignature?: string;
  isVerified?: boolean;
}

export type ThreatSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface SecurityThreatLog {
  id: string;
  timestamp: string;
  threatType: 'XSS_INJECTION_BLOCKED' | 'SQLI_ATTEMPT_DEFLECTED' | 'RATE_LIMIT_EXCEEDED' | 'PII_REDACTION_TRIGGERED' | 'UNAUTHORIZED_RBAC_ATTEMPT' | 'TAMPER_CHAIN_VIOLATION' | 'SUSPICIOUS_GEO_LOGIN';
  severity: ThreatSeverity;
  sourceIp: string;
  targetEndpoint: string;
  sanitizedInput?: string;
  actionTaken: 'BLOCKED' | 'SANITIZED' | 'FLAGGED' | 'RATE_LIMITED' | 'SESSION_TERMINATED';
  details: string;
}

export interface ComplianceAuditItem {
  id: string;
  standard: 'CERT_IN' | 'DPDPA_2023' | 'ISO_27001' | 'NIC_GIGW';
  controlName: string;
  status: 'COMPLIANT' | 'NEEDS_REVIEW' | 'IN_PROGRESS';
  lastAuditedDate: string;
  auditorRemarks: string;
  frameworkRef: string;
}

export interface ApiKeyCredential {
  id: string;
  name: string;
  maskedKey: string;
  rawKey?: string;
  createdAt: string;
  expiresAt: string;
  lastUsedAt?: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  scopes: ('read:analytics' | 'write:ingest' | 'admin:retrain' | 'legal:adjudicate')[];
  ipWhitelist: string[];
}

export interface ActiveUserSession {
  sessionId: string;
  device: string;
  browser: string;
  location: string;
  ipAddress: string;
  loginTime: string;
  lastActive: string;
  isCurrentSession: boolean;
  status: 'ACTIVE' | 'IDLE' | 'LOCKED';
}

export interface WhatIfParameters {
  compensationDisbursementBoostPct: number; // e.g. +20% speed
  litigationResolutionCount: number;         // e.g. 5 cases resolved
  forestClearanceFastTracked: boolean;       // expedite clearance
  directPurchaseNegotiationPct: number;      // % switched to direct agreement
  additionalManpowerAllocated: boolean;      // Survey squads doubled
}

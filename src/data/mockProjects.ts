import { LandAcquisitionProject, ModelMetrics, AlertNotification, AuditLogEntry } from '../types';

export const INITIAL_PROJECTS: LandAcquisitionProject[] = [
  {
    id: 'proj-001',
    code: 'NHAI-DME-PKG14',
    name: 'Delhi-Mumbai Expressway (Package 14 - Palghar-Dahanu Spur)',
    corridor: 'Delhi-Mumbai Industrial Expressway (DMIC)',
    state: 'Maharashtra',
    district: 'Palghar',
    subDistricts: ['Dahanu', 'Talasari', 'Jawhar'],
    agency: 'NHAI',
    projectType: 'Expressway & National Highway',
    totalLandAreaHa: 480.5,
    acquiredLandAreaHa: 245.0,
    landTypeDistribution: {
      privateAgriculturalPct: 42,
      privateCommercialPct: 18,
      governmentRevenuePct: 15,
      forestProtectedPct: 15,
      tribalPesaPct: 10
    },
    totalAffectedFamilies: 2840,
    rehabilitatedFamilies: 980,
    sanctionedBudgetCr: 3450.0,
    compensationBudgetCr: 1280.0,
    compensationDisbursedCr: 580.0,
    disbursementPercentage: 45.3,
    riskScore: 84,
    riskCategory: 'CRITICAL',
    delayProbabilityPct: 89.2,
    predictedDelayMonths: 14.5,
    baselineDurationMonths: 24,
    estimatedTotalMonths: 38.5,
    startDate: '2024-03-15',
    plannedCompletionDate: '2026-03-15',
    predictedCompletionDate: '2027-05-30',
    currentStage: 'STAGE_S19_DECLARATION',
    pendingLitigationCases: 38,
    pendingForestClearances: true,
    cadastralSurveyMismatches: 124,
    gramSabhaResolutionPassed: false,
    interDeptCoordinationScore: 4.2,
    latitude: 19.9975,
    longitude: 72.7300,
    corridorPath: [
      [19.6967, 72.7655],
      [19.8240, 72.7540],
      [19.9975, 72.7300],
      [20.1500, 72.7100]
    ],
    stages: [
      {
        stage: 'STAGE_S4_PRELIMINARY',
        stageName: 'Section 4(1) - Preliminary Notification',
        actSection: 'RFCTLARR Act 2013 / NH Act Sec 3A',
        status: 'COMPLETED',
        plannedDays: 60,
        actualDaysSpent: 85,
        delayDays: 25,
        delayProbabilityPct: 20,
        completionDate: '2024-06-10'
      },
      {
        stage: 'STAGE_S11_SIA',
        stageName: 'Section 11 - Social Impact Assessment & Public Hearing',
        actSection: 'RFCTLARR Act Sec 11 / SIA Rules',
        status: 'COMPLETED',
        plannedDays: 180,
        actualDaysSpent: 310,
        delayDays: 130,
        delayProbabilityPct: 85,
        keyBottleneck: 'Local tribal resistance to compensation multiplier in scheduled areas',
        completionDate: '2025-04-18'
      },
      {
        stage: 'STAGE_S19_DECLARATION',
        stageName: 'Section 19 - Declaration of Acquisition',
        actSection: 'RFCTLARR Act Sec 19 / NH Act Sec 3D',
        status: 'DELAYED',
        plannedDays: 90,
        actualDaysSpent: 165,
        delayDays: 75,
        delayProbabilityPct: 92,
        keyBottleneck: 'High Court writ petitions filed by 14 landholder clusters'
      },
      {
        stage: 'STAGE_S23_AWARD',
        stageName: 'Section 23 - Award Valuation & Determination',
        actSection: 'RFCTLARR Act Sec 23 / NH Act Sec 3G',
        status: 'PENDING',
        plannedDays: 120,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 78,
        keyBottleneck: 'Awaiting market rate consensus for peri-urban commercial parcels'
      },
      {
        stage: 'STAGE_COMPENSATION_DISBURSAL',
        stageName: 'Compensation Disbursement via PFMS / Escrow',
        actSection: 'Direct Benefit Transfer (DBT)',
        status: 'IN_PROGRESS',
        plannedDays: 90,
        actualDaysSpent: 45,
        delayDays: 0,
        delayProbabilityPct: 65,
        keyBottleneck: 'Mismatch in land title records vs Aadhaar linked bank accounts'
      },
      {
        stage: 'STAGE_S38_POSSESSION',
        stageName: 'Section 38 - Physical Possession & Demarcation',
        actSection: 'RFCTLARR Act Sec 38 / NH Act Sec 3E',
        status: 'PENDING',
        plannedDays: 60,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 88,
        keyBottleneck: 'Standing crop clearance and dwelling relocation resistance'
      },
      {
        stage: 'STAGE_RR_REHABILITATION',
        stageName: 'Rehabilitation & Resettlement (R&R) Execution',
        actSection: 'RFCTLARR Act 2nd & 3rd Schedule',
        status: 'PENDING',
        plannedDays: 150,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 91,
        keyBottleneck: 'Alternate agricultural land allotment pending with State Revenue Dept'
      }
    ],
    shapFeatures: [
      {
        featureName: 'Pending High Court Stay Litigations',
        category: 'LEGAL',
        shapValue: +0.28,
        featureValue: '38 Active Writs',
        baselineAverage: '4.2 Writs',
        impactDescription: 'Writ petitions in Bombay High Court directly stall Section 19 final declaration issuance.',
        mitigationPotential: 'HIGH'
      },
      {
        featureName: 'Compensation Disbursement Ratio',
        category: 'FINANCIAL',
        shapValue: +0.22,
        featureValue: '45.3% Disbursed',
        baselineAverage: '78.5% at this stage',
        impactDescription: 'Low payout speed creates distrust among remaining 1,860 landowners.',
        mitigationPotential: 'HIGH'
      },
      {
        featureName: 'Tribal / PESA Scheduled Land Ratio',
        category: 'R&R',
        shapValue: +0.18,
        featureValue: '10% (48.1 Ha)',
        baselineAverage: '1.2%',
        impactDescription: 'Mandatory Gram Sabha special consent quorum not achieved in 6 panchayats.',
        mitigationPotential: 'MEDIUM'
      },
      {
        featureName: 'Pending Stage-II Forest Clearances',
        category: 'ENVIRONMENTAL',
        shapValue: +0.12,
        featureValue: 'Stage-II Pending (72 Ha)',
        baselineAverage: 'Stage-II Cleared',
        impactDescription: 'State Forest Advisory Committee awaiting Net Present Value (NPV) deposit.',
        mitigationPotential: 'HIGH'
      },
      {
        featureName: 'Cadastral Survey GIS Discrepancies',
        category: 'CADASSTRAL',
        shapValue: +0.08,
        featureValue: '124 Sub-division Errors',
        baselineAverage: '15 Errors',
        impactDescription: 'Joint measurement survey conflicts with old British revenue maps.',
        mitigationPotential: 'HIGH'
      },
      {
        featureName: 'Project Priority & Capital Allocation',
        category: 'FINANCIAL',
        shapValue: -0.04,
        featureValue: '₹3,450 Cr Sanctioned',
        baselineAverage: '₹1,200 Cr',
        impactDescription: 'Abundant capital allocation prevents funding dry-ups once disputes clear.',
        mitigationPotential: 'LOW'
      }
    ],
    delayDrivers: [
      {
        id: 'dd-01',
        title: '38 Active High Court Writs on Valuation Multiplier',
        category: 'LEGAL',
        severity: 'CRITICAL',
        weightContribution: 35,
        rootCause: 'Landowners demanding 4x urban multiplier instead of 2x rural multiplier near Dahanu urban fringe.',
        affectedStage: 'STAGE_S19_DECLARATION',
        leadIndicator: 'Court stay notices served to Special Land Acquisition Officer (SLAO)'
      },
      {
        id: 'dd-02',
        title: 'Tribal Gram Sabha Consent Quorum Deficit',
        category: 'R&R',
        severity: 'HIGH',
        weightContribution: 26,
        rootCause: 'PESA Act 1996 mandates 50% Gram Sabha quorum; 6 tribal hamlets boycotted public hearing.',
        affectedStage: 'STAGE_S11_SIA',
        leadIndicator: 'Unsigned minutes of meeting from Talasari block'
      },
      {
        id: 'dd-03',
        title: 'Forest NPV & CA Land Mutation Backlog',
        category: 'ENVIRONMENTAL',
        severity: 'HIGH',
        weightContribution: 21,
        rootCause: 'Compensatory Afforestation (CA) non-forest land identified in Beed district lacks revenue mutation.',
        affectedStage: 'STAGE_S38_POSSESSION',
        leadIndicator: 'MoEFCC PARIVESH portal query pending > 90 days'
      },
      {
        id: 'dd-04',
        title: 'Title Hierarchy & Joint Ownership Fractionation',
        category: 'ADMINISTRATIVE',
        severity: 'MEDIUM',
        weightContribution: 18,
        rootCause: 'Over 600 parcels have undivided ancestral shares across 4 generations without legal heir mutation.',
        affectedStage: 'STAGE_COMPENSATION_DISBURSAL',
        leadIndicator: 'Revenue Talathi mutation backlog queue'
      }
    ],
    prescriptiveActions: [
      {
        id: 'act-001',
        projectId: 'proj-001',
        title: 'Convene Special CALA Lok Adalat for Direct Consent Settlement',
        category: 'LEGAL_FASTTRACK',
        priority: 'URGENT',
        description: 'Empower Special District Judge and CALA to offer 25% consent incentive bonus under Sec 23A for out-of-court withdrawal of 38 writ petitions.',
        actionableSteps: [
          'Issue Government Resolution (GR) notifying Special Lok Adalat bench in Palghar',
          'Offer statutory 25% Solatium enhancement for voluntary consent withdrawal',
          'Deploy 10 dedicated revenue teams to process spot-consent agreements within 14 days'
        ],
        expectedDelayReductionDays: 140,
        estimatedCostSavingsCr: 84.5,
        assignedAuthority: 'District Collector & Principal District Judge, Palghar',
        status: 'OPEN',
        deadlineDate: '2026-09-30',
        escalationTier: 'DISTRICT_COLLECTOR'
      },
      {
        id: 'act-002',
        projectId: 'proj-001',
        title: 'Special PESA Tripartite Tribal Council Dialogue & Community Assets',
        category: 'RR_NEGOTIATION',
        priority: 'HIGH',
        description: 'Form joint committee with Integrated Tribal Development Project (ITDP) officer to bundle community irrigation and medical center infrastructure into R&R award.',
        actionableSteps: [
          'Direct sanction of ₹18.5 Cr Tribal Development Sub-Plan fund for community assets',
          'Conduct re-convened Gram Sabha with ITDP Project Officer and Village Elders',
          'Sign binding resettlement colony masterplan with dedicated agricultural plots'
        ],
        expectedDelayReductionDays: 90,
        estimatedCostSavingsCr: 42.0,
        assignedAuthority: 'Project Director ITDP & Sub-Divisional Officer (Jawhar)',
        status: 'IN_PROGRESS',
        deadlineDate: '2026-10-15',
        escalationTier: 'STATE_NODAL_CALA'
      },
      {
        id: 'act-003',
        projectId: 'proj-001',
        title: 'Drone-Based LiDAR Re-Survey for Instant Cadastral Rectification',
        category: 'DRONE_RESURVEY',
        priority: 'HIGH',
        description: 'Deploy Survey of India (SOI) high-precision RTK drones to cross-reference physical boundary pegs with e-Mahabhumi digital 7/12 extract records.',
        actionableSteps: [
          'Execute drone flight over 124 disputed parcels in 4 days',
          'Generate geo-referenced ortho-mosaic matching revenue khasra maps',
          'Execute spot spot-mutation with signatures of adjacent patwaris'
        ],
        expectedDelayReductionDays: 65,
        estimatedCostSavingsCr: 28.0,
        assignedAuthority: 'Superintendent of Land Records (SLR) Palghar & NHAI PD',
        status: 'OPEN',
        deadlineDate: '2026-10-05',
        escalationTier: 'DISTRICT_COLLECTOR'
      }
    ],
    lastUpdated: '2026-08-29T18:30:00Z'
  },
  {
    id: 'proj-002',
    code: 'NHSRCL-MAHSR-SEC3',
    name: 'Mumbai-Ahmedabad High Speed Rail (Bullet Train - Section 3)',
    corridor: 'National High Speed Rail Corridor (MAHSR)',
    state: 'Gujarat',
    district: 'Surat',
    subDistricts: ['Choryasi', 'Kamrej', 'Olpad'],
    agency: 'NHSRCL (High Speed Rail)',
    projectType: 'High-Speed / Dedicated Rail Corridor',
    totalLandAreaHa: 320.0,
    acquiredLandAreaHa: 298.5,
    landTypeDistribution: {
      privateAgriculturalPct: 65,
      privateCommercialPct: 20,
      governmentRevenuePct: 15,
      forestProtectedPct: 0,
      tribalPesaPct: 0
    },
    totalAffectedFamilies: 1420,
    rehabilitatedFamilies: 1350,
    sanctionedBudgetCr: 4800.0,
    compensationBudgetCr: 1850.0,
    compensationDisbursedCr: 1720.0,
    disbursementPercentage: 93.0,
    riskScore: 28,
    riskCategory: 'LOW',
    delayProbabilityPct: 18.5,
    predictedDelayMonths: 1.8,
    baselineDurationMonths: 20,
    estimatedTotalMonths: 21.8,
    startDate: '2023-08-01',
    plannedCompletionDate: '2025-04-01',
    predictedCompletionDate: '2025-05-25',
    currentStage: 'STAGE_S38_POSSESSION',
    pendingLitigationCases: 3,
    pendingForestClearances: false,
    cadastralSurveyMismatches: 8,
    gramSabhaResolutionPassed: true,
    interDeptCoordinationScore: 9.1,
    latitude: 21.1702,
    longitude: 72.8311,
    corridorPath: [
      [20.9000, 72.9000],
      [21.1702, 72.8311],
      [21.4500, 72.9500],
      [21.7500, 73.0500]
    ],
    stages: [
      {
        stage: 'STAGE_S4_PRELIMINARY',
        stageName: 'Section 4(1) - Preliminary Notification',
        actSection: 'Railways Act 1989 Sec 20A',
        status: 'COMPLETED',
        plannedDays: 45,
        actualDaysSpent: 40,
        delayDays: 0,
        delayProbabilityPct: 10,
        completionDate: '2023-09-10'
      },
      {
        stage: 'STAGE_S11_SIA',
        stageName: 'Section 11 - SIA & Stakeholder Consultations',
        actSection: 'JICA Safeguards / RFCTLARR',
        status: 'COMPLETED',
        plannedDays: 120,
        actualDaysSpent: 115,
        delayDays: 0,
        delayProbabilityPct: 15,
        completionDate: '2024-01-05'
      },
      {
        stage: 'STAGE_S19_DECLARATION',
        stageName: 'Section 19 - Final Declaration',
        actSection: 'Railways Act Sec 20E',
        status: 'COMPLETED',
        plannedDays: 60,
        actualDaysSpent: 55,
        delayDays: 0,
        delayProbabilityPct: 12,
        completionDate: '2024-03-01'
      },
      {
        stage: 'STAGE_S23_AWARD',
        stageName: 'Section 23 - Award Determination',
        actSection: 'Railways Act Sec 20F',
        status: 'COMPLETED',
        plannedDays: 90,
        actualDaysSpent: 80,
        delayDays: 0,
        delayProbabilityPct: 14,
        completionDate: '2024-05-20'
      },
      {
        stage: 'STAGE_COMPENSATION_DISBURSAL',
        stageName: 'Compensation Disbursement (DBT Direct)',
        actSection: 'JICA Special Direct Purchase Package',
        status: 'COMPLETED',
        plannedDays: 60,
        actualDaysSpent: 50,
        delayDays: 0,
        delayProbabilityPct: 10,
        completionDate: '2024-07-10'
      },
      {
        stage: 'STAGE_S38_POSSESSION',
        stageName: 'Section 38 - Physical Possession & Demarcation',
        actSection: 'Railways Act Sec 20N',
        status: 'IN_PROGRESS',
        plannedDays: 45,
        actualDaysSpent: 30,
        delayDays: 0,
        delayProbabilityPct: 22,
        keyBottleneck: 'Final 21.5 Ha commercial godown relocation in progress'
      },
      {
        stage: 'STAGE_RR_REHABILITATION',
        stageName: 'Rehabilitation & Resettlement Implementation',
        actSection: 'NHSRCL Voluntary R&R Policy',
        status: 'IN_PROGRESS',
        plannedDays: 90,
        actualDaysSpent: 70,
        delayDays: 0,
        delayProbabilityPct: 18
      }
    ],
    shapFeatures: [
      {
        featureName: 'Compensation Disbursement Speed',
        category: 'FINANCIAL',
        shapValue: -0.32,
        featureValue: '93.0% Disbursed',
        baselineAverage: '65.0%',
        impactDescription: 'Rapid electronic transfer of Gujarat 4.75x market compensation package minimized friction.',
        mitigationPotential: 'LOW'
      },
      {
        featureName: 'Gram Sabha & Landowner Consent Rate',
        category: 'ADMINISTRATIVE',
        shapValue: -0.25,
        featureValue: '98.2% Direct Consent',
        baselineAverage: '72.0%',
        impactDescription: 'Direct negotiation model avoided protracted land acquisition tribunal appeals.',
        mitigationPotential: 'LOW'
      },
      {
        featureName: 'Litigation Density Index',
        category: 'LEGAL',
        shapValue: -0.18,
        featureValue: '3 Active Cases',
        baselineAverage: '18.4 Cases',
        impactDescription: 'Minimal pending litigation allows seamless execution of possession notices.',
        mitigationPotential: 'LOW'
      },
      {
        featureName: 'Inter-Agency Coordination Rating',
        category: 'ADMINISTRATIVE',
        shapValue: -0.15,
        featureValue: '9.1 / 10',
        baselineAverage: '5.4 / 10',
        impactDescription: 'Dedicated State Project Monitoring Cell in Gandhinagar resolves bottlenecks weekly.',
        mitigationPotential: 'LOW'
      }
    ],
    delayDrivers: [
      {
        id: 'dd-05',
        title: 'Residual 21.5 Ha Urban Godowns Relocation',
        category: 'R&R',
        severity: 'LOW',
        weightContribution: 70,
        rootCause: 'Tenancy rights dispute between warehouse owners and leaseholders over salvage materials.',
        affectedStage: 'STAGE_S38_POSSESSION',
        leadIndicator: 'Pending physical eviction notices for 4 commercial sheds'
      }
    ],
    prescriptiveActions: [
      {
        id: 'act-004',
        projectId: 'proj-002',
        title: 'Fast-Track Tenancy Adjudication for Final Surat Warehouses',
        category: 'DISBURSEMENT_SPEED',
        priority: 'MEDIUM',
        description: 'CALA Surat to deposit tenant salvage allowance directly into escrow to secure peaceful handover by next month.',
        actionableSteps: [
          'Release ₹4.2 Cr interim salvage package for tenant relocation',
          'Execute tripartite handover deed with Surat Municipal Corporation'
        ],
        expectedDelayReductionDays: 30,
        estimatedCostSavingsCr: 12.0,
        assignedAuthority: 'CALA Surat & NHSRCL Chief Project Manager',
        status: 'IN_PROGRESS',
        deadlineDate: '2026-09-20',
        escalationTier: 'DISTRICT_COLLECTOR'
      }
    ],
    lastUpdated: '2026-08-29T16:00:00Z'
  },
  {
    id: 'proj-003',
    code: 'DFCCIL-EDFC-PKG301',
    name: 'Eastern Dedicated Freight Corridor (Sonnagar-Dankuni Section)',
    corridor: 'Eastern Dedicated Freight Corridor (EDFC)',
    state: 'West Bengal',
    district: 'Purba Bardhaman',
    subDistricts: ['Bardhaman Sadar', 'Memari', 'Kalna'],
    agency: 'DFCCIL',
    projectType: 'High-Speed / Dedicated Rail Corridor',
    totalLandAreaHa: 610.0,
    acquiredLandAreaHa: 340.0,
    landTypeDistribution: {
      privateAgriculturalPct: 75,
      privateCommercialPct: 8,
      governmentRevenuePct: 12,
      forestProtectedPct: 5,
      tribalPesaPct: 0
    },
    totalAffectedFamilies: 4200,
    rehabilitatedFamilies: 1850,
    sanctionedBudgetCr: 5200.0,
    compensationBudgetCr: 1650.0,
    compensationDisbursedCr: 720.0,
    disbursementPercentage: 43.6,
    riskScore: 78,
    riskCategory: 'HIGH',
    delayProbabilityPct: 82.4,
    predictedDelayMonths: 11.8,
    baselineDurationMonths: 24,
    estimatedTotalMonths: 35.8,
    startDate: '2024-01-10',
    plannedCompletionDate: '2026-01-10',
    predictedCompletionDate: '2026-12-30',
    currentStage: 'STAGE_S23_AWARD',
    pendingLitigationCases: 29,
    pendingForestClearances: false,
    cadastralSurveyMismatches: 215,
    gramSabhaResolutionPassed: true,
    interDeptCoordinationScore: 4.8,
    latitude: 23.2324,
    longitude: 87.8615,
    corridorPath: [
      [24.0000, 85.0000],
      [23.7000, 86.4000],
      [23.2324, 87.8615],
      [22.6500, 88.3500]
    ],
    stages: [
      {
        stage: 'STAGE_S4_PRELIMINARY',
        stageName: 'Section 4(1) - 20A Notification',
        actSection: 'Railways Act 1989',
        status: 'COMPLETED',
        plannedDays: 60,
        actualDaysSpent: 75,
        delayDays: 15,
        delayProbabilityPct: 25,
        completionDate: '2024-03-25'
      },
      {
        stage: 'STAGE_S11_SIA',
        stageName: 'Section 11 - SIA & Public Hearings',
        actSection: 'RFCTLARR Act',
        status: 'COMPLETED',
        plannedDays: 150,
        actualDaysSpent: 210,
        delayDays: 60,
        delayProbabilityPct: 60,
        completionDate: '2024-10-20'
      },
      {
        stage: 'STAGE_S19_DECLARATION',
        stageName: 'Section 19 - 20E Declaration',
        actSection: 'Railways Act Sec 20E',
        status: 'COMPLETED',
        plannedDays: 90,
        actualDaysSpent: 140,
        delayDays: 50,
        delayProbabilityPct: 70,
        completionDate: '2025-03-10'
      },
      {
        stage: 'STAGE_S23_AWARD',
        stageName: 'Section 23 - Award Determination',
        actSection: 'Railways Act Sec 20F',
        status: 'DELAYED',
        plannedDays: 90,
        actualDaysSpent: 170,
        delayDays: 80,
        delayProbabilityPct: 88,
        keyBottleneck: 'Bargadar (Sharecropper) title verification disputes in 18 mouzas'
      },
      {
        stage: 'STAGE_COMPENSATION_DISBURSAL',
        stageName: 'Direct Benefit Transfer Disbursal',
        actSection: 'PFMS Rail Gateway',
        status: 'IN_PROGRESS',
        plannedDays: 90,
        actualDaysSpent: 40,
        delayDays: 0,
        delayProbabilityPct: 75
      },
      {
        stage: 'STAGE_S38_POSSESSION',
        stageName: 'Section 38 - Physical Possession',
        actSection: 'Railways Act Sec 20N',
        status: 'PENDING',
        plannedDays: 60,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 80
      },
      {
        stage: 'STAGE_RR_REHABILITATION',
        stageName: 'R&R Scheme Execution',
        actSection: 'DFCCIL Entitlement Matrix',
        status: 'PENDING',
        plannedDays: 120,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 72
      }
    ],
    shapFeatures: [
      {
        featureName: 'Bargadar / Sharecropper Title Verification',
        category: 'CADASSTRAL',
        shapValue: +0.31,
        featureValue: '215 Discrepancies',
        baselineAverage: '20 Discrepancies',
        impactDescription: 'Unrecorded sub-tenancies under West Bengal Land Reforms Act block CALA award apportionment.',
        mitigationPotential: 'HIGH'
      },
      {
        featureName: 'Compensation Disbursement Velocity',
        category: 'FINANCIAL',
        shapValue: +0.24,
        featureValue: '43.6% Disbursed',
        baselineAverage: '72.0%',
        impactDescription: 'Disbursal rate lagging by 28.4 percentage points against target schedule.',
        mitigationPotential: 'HIGH'
      },
      {
        featureName: 'District Court Title Injunctions',
        category: 'LEGAL',
        shapValue: +0.19,
        featureValue: '29 Stay Applications',
        baselineAverage: '6.5 Applications',
        impactDescription: 'Co-parcener partition suits pending in Bardhaman Civil Court.',
        mitigationPotential: 'MEDIUM'
      }
    ],
    delayDrivers: [
      {
        id: 'dd-06',
        title: 'Unrecorded Bargadar (Tiller) Rights in 18 Mouzas',
        category: 'GEOSPATIAL',
        severity: 'CRITICAL',
        weightContribution: 42,
        rootCause: 'Land records show single Zamindari title while field tillers possess hereditary cultivation receipts without mutation.',
        affectedStage: 'STAGE_S23_AWARD',
        leadIndicator: 'Objections filed under Section 20D/20F with CALA'
      }
    ],
    prescriptiveActions: [
      {
        id: 'act-005',
        projectId: 'proj-003',
        title: 'Deploy Joint Revenue-Panchayat Spot Verification Squads',
        category: 'DRONE_RESURVEY',
        priority: 'URGENT',
        description: 'Constitute 12 joint verification teams of Revenue Inspector + Anchal Pradhan to record on-spot cultivator statements and apportion compensation.',
        actionableSteps: [
          'Issue Joint Notification with West Bengal Land & Land Reforms Dept',
          'Deploy mobile camp offices in 18 affected mouzas for spot record verification',
          'Release 25% share to verified Bargadars directly via PFMS'
        ],
        expectedDelayReductionDays: 110,
        estimatedCostSavingsCr: 55.0,
        assignedAuthority: 'District Magistrate Purba Bardhaman & Chief GM DFCCIL',
        status: 'OPEN',
        deadlineDate: '2026-10-25',
        escalationTier: 'STATE_NODAL_CALA'
      }
    ],
    lastUpdated: '2026-08-29T14:15:00Z'
  },
  {
    id: 'proj-004',
    code: 'MOCA-JEWAR-PH2',
    name: 'Noida International Greenfield Airport (Phase 2 Expansion)',
    corridor: 'National Capital Region Aviation & Aerotropolis Hub',
    state: 'Uttar Pradesh',
    district: 'Gautam Buddha Nagar',
    subDistricts: ['Jewar', 'Rabupura'],
    agency: 'AAI / MoCA (Airports)',
    projectType: 'Greenfield Airport',
    totalLandAreaHa: 1365.0,
    acquiredLandAreaHa: 1180.0,
    landTypeDistribution: {
      privateAgriculturalPct: 82,
      privateCommercialPct: 6,
      governmentRevenuePct: 12,
      forestProtectedPct: 0,
      tribalPesaPct: 0
    },
    totalAffectedFamilies: 5600,
    rehabilitatedFamilies: 4800,
    sanctionedBudgetCr: 7500.0,
    compensationBudgetCr: 3200.0,
    compensationDisbursedCr: 2950.0,
    disbursementPercentage: 92.2,
    riskScore: 36,
    riskCategory: 'MEDIUM',
    delayProbabilityPct: 32.0,
    predictedDelayMonths: 3.2,
    baselineDurationMonths: 18,
    estimatedTotalMonths: 21.2,
    startDate: '2023-11-01',
    plannedCompletionDate: '2025-05-01',
    predictedCompletionDate: '2025-08-10',
    currentStage: 'STAGE_RR_REHABILITATION',
    pendingLitigationCases: 12,
    pendingForestClearances: false,
    cadastralSurveyMismatches: 32,
    gramSabhaResolutionPassed: true,
    interDeptCoordinationScore: 8.8,
    latitude: 28.1833,
    longitude: 77.5833,
    corridorPath: [
      [28.1500, 77.5500],
      [28.1833, 77.5833],
      [28.2100, 77.6200]
    ],
    stages: [
      {
        stage: 'STAGE_S4_PRELIMINARY',
        stageName: 'Section 4(1) Notification',
        actSection: 'RFCTLARR Act Sec 4',
        status: 'COMPLETED',
        plannedDays: 60,
        actualDaysSpent: 55,
        delayDays: 0,
        delayProbabilityPct: 10,
        completionDate: '2023-12-25'
      },
      {
        stage: 'STAGE_S11_SIA',
        stageName: 'Section 11 - SIA & Expert Committee Approval',
        actSection: 'RFCTLARR Act Sec 11',
        status: 'COMPLETED',
        plannedDays: 120,
        actualDaysSpent: 120,
        delayDays: 0,
        delayProbabilityPct: 20,
        completionDate: '2024-04-25'
      },
      {
        stage: 'STAGE_S19_DECLARATION',
        stageName: 'Section 19 - Declaration',
        actSection: 'RFCTLARR Act Sec 19',
        status: 'COMPLETED',
        plannedDays: 60,
        actualDaysSpent: 60,
        delayDays: 0,
        delayProbabilityPct: 15,
        completionDate: '2024-06-25'
      },
      {
        stage: 'STAGE_S23_AWARD',
        stageName: 'Section 23 - Award Formulation',
        actSection: 'RFCTLARR Act Sec 23',
        status: 'COMPLETED',
        plannedDays: 90,
        actualDaysSpent: 85,
        delayDays: 0,
        delayProbabilityPct: 22,
        completionDate: '2024-09-20'
      },
      {
        stage: 'STAGE_COMPENSATION_DISBURSAL',
        stageName: 'Compensation Disbursal via PFMS',
        actSection: 'YEDA Direct Transfer',
        status: 'COMPLETED',
        plannedDays: 60,
        actualDaysSpent: 55,
        delayDays: 0,
        delayProbabilityPct: 12,
        completionDate: '2024-11-15'
      },
      {
        stage: 'STAGE_S38_POSSESSION',
        stageName: 'Section 38 - Physical Possession',
        actSection: 'RFCTLARR Act Sec 38',
        status: 'IN_PROGRESS',
        plannedDays: 60,
        actualDaysSpent: 45,
        delayDays: 0,
        delayProbabilityPct: 35,
        keyBottleneck: 'Final 185 Ha residential abadi relocation to Model R&R Township'
      },
      {
        stage: 'STAGE_RR_REHABILITATION',
        stageName: 'Model R&R Township Allotment (Jewar Bangar)',
        actSection: 'UP R&R Rules 2016',
        status: 'IN_PROGRESS',
        plannedDays: 120,
        actualDaysSpent: 90,
        delayDays: 20,
        delayProbabilityPct: 40,
        keyBottleneck: 'Piped drinking water & electricity substation commissioning in R&R sector'
      }
    ],
    shapFeatures: [
      {
        featureName: 'Compensation Disbursed Ratio',
        category: 'FINANCIAL',
        shapValue: -0.28,
        featureValue: '92.2% Disbursed',
        baselineAverage: '70.0%',
        impactDescription: 'Near total compensation payout created high community willingness to relocate.',
        mitigationPotential: 'LOW'
      },
      {
        featureName: 'R&R Township Infrastructure Readiness',
        category: 'R&R',
        shapValue: +0.14,
        featureValue: '85% Infra Ready',
        baselineAverage: '95%',
        impactDescription: 'Remaining 800 families delaying shift until schools & power connections are operational.',
        mitigationPotential: 'HIGH'
      }
    ],
    delayDrivers: [
      {
        id: 'dd-07',
        title: 'Jewar Bangar R&R Township Basic Amenities Delivery',
        category: 'R&R',
        severity: 'MEDIUM',
        weightContribution: 65,
        rootCause: 'Contractor lag in commissioning 33kV dedicated sub-station and overhead water tanks.',
        affectedStage: 'STAGE_RR_REHABILITATION',
        leadIndicator: 'UPPCL substation inspection certificate pending'
      }
    ],
    prescriptiveActions: [
      {
        id: 'act-006',
        projectId: 'proj-004',
        title: 'Accelerate Jewar Bangar Utility Commissioning on War Footing',
        category: 'RR_NEGOTIATION',
        priority: 'HIGH',
        description: 'Instruct YEIDA and UPPCL to complete energized connections and issue possession letters with 1-year free municipal maintenance.',
        actionableSteps: [
          'Daily review by CEO YEIDA with power and water engineers',
          'Deploy provisional mobile power generators for shifted families'
        ],
        expectedDelayReductionDays: 45,
        estimatedCostSavingsCr: 22.0,
        assignedAuthority: 'CEO YEIDA & DM Gautam Buddha Nagar',
        status: 'IN_PROGRESS',
        deadlineDate: '2026-09-15',
        escalationTier: 'DISTRICT_COLLECTOR'
      }
    ],
    lastUpdated: '2026-08-29T12:00:00Z'
  },
  {
    id: 'proj-005',
    code: 'MNRE-LEH-SOLAR',
    name: 'Leh-Ladakh Ultra Mega Solar & Green Hydrogen Park (13 GW Corridor)',
    corridor: 'Green Energy Corridor - Pang-Debring Transmission Line',
    state: 'UT Ladakh',
    district: 'Leh',
    subDistricts: ['Nyoma', 'Durbuk'],
    agency: 'MNRE (Renewable Energy)',
    projectType: 'Ultra Mega Solar & Wind Park',
    totalLandAreaHa: 8500.0,
    acquiredLandAreaHa: 2100.0,
    landTypeDistribution: {
      privateAgriculturalPct: 2,
      privateCommercialPct: 0,
      governmentRevenuePct: 68,
      forestProtectedPct: 25,
      tribalPesaPct: 5
    },
    totalAffectedFamilies: 450,
    rehabilitatedFamilies: 120,
    sanctionedBudgetCr: 12400.0,
    compensationBudgetCr: 850.0,
    compensationDisbursedCr: 210.0,
    disbursementPercentage: 24.7,
    riskScore: 91,
    riskCategory: 'CRITICAL',
    delayProbabilityPct: 94.6,
    predictedDelayMonths: 19.5,
    baselineDurationMonths: 36,
    estimatedTotalMonths: 55.5,
    startDate: '2024-04-01',
    plannedCompletionDate: '2027-04-01',
    predictedCompletionDate: '2028-11-15',
    currentStage: 'STAGE_S11_SIA',
    pendingLitigationCases: 8,
    pendingForestClearances: true,
    cadastralSurveyMismatches: 410,
    gramSabhaResolutionPassed: false,
    interDeptCoordinationScore: 3.5,
    latitude: 33.2500,
    longitude: 77.8500,
    corridorPath: [
      [34.1500, 77.5800],
      [33.7500, 77.7200],
      [33.2500, 77.8500],
      [32.8000, 78.1000]
    ],
    stages: [
      {
        stage: 'STAGE_S4_PRELIMINARY',
        stageName: 'Section 4(1) - Preliminary Demarcation',
        actSection: 'J&K Reorganisation / Central LA Act',
        status: 'COMPLETED',
        plannedDays: 90,
        actualDaysSpent: 140,
        delayDays: 50,
        delayProbabilityPct: 40,
        completionDate: '2024-08-20'
      },
      {
        stage: 'STAGE_S11_SIA',
        stageName: 'Section 11 - SIA, Ecology & Nomadic Grazing Assessment',
        actSection: 'RFCTLARR Sec 11',
        status: 'DELAYED',
        plannedDays: 180,
        actualDaysSpent: 340,
        delayDays: 160,
        delayProbabilityPct: 96,
        keyBottleneck: 'Changpa nomadic pastoralists objecting to fencing of high-altitude winter pasture grounds'
      },
      {
        stage: 'STAGE_S19_DECLARATION',
        stageName: 'Section 19 - Final Notification',
        actSection: 'Central LA Act Sec 19',
        status: 'PENDING',
        plannedDays: 90,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 92
      },
      {
        stage: 'STAGE_S23_AWARD',
        stageName: 'Section 23 - Customary Rights Compensation Award',
        actSection: 'Customary Grazing Valuation Norms',
        status: 'PENDING',
        plannedDays: 120,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 88
      },
      {
        stage: 'STAGE_COMPENSATION_DISBURSAL',
        stageName: 'Direct Benefit Transfer to LAHDC Leh Trust',
        actSection: 'LAHDC Autonomous Council Fund',
        status: 'PENDING',
        plannedDays: 90,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 70
      },
      {
        stage: 'STAGE_S38_POSSESSION',
        stageName: 'Section 38 - Physical Possession & Fencing',
        actSection: 'LA Act Sec 38',
        status: 'PENDING',
        plannedDays: 180,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 90
      },
      {
        stage: 'STAGE_RR_REHABILITATION',
        stageName: 'Pastoralist Livelihood Protection Program',
        actSection: 'Ladakh Autonomous Hill Development Council Accord',
        status: 'PENDING',
        plannedDays: 180,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 85
      }
    ],
    shapFeatures: [
      {
        featureName: 'Customary Pastoral Rights (Changpa Nomads)',
        category: 'R&R',
        shapValue: +0.36,
        featureValue: 'Winter Pasture Overlap (4,200 Ha)',
        baselineAverage: '0 Ha',
        impactDescription: 'Pashmina goat grazing routes intersect solar park arrays; strong resistance from LAHDC Councillors.',
        mitigationPotential: 'HIGH'
      },
      {
        featureName: 'Wildlife & Cold-Desert Forest Clearance',
        category: 'ENVIRONMENTAL',
        shapValue: +0.28,
        featureValue: 'Black-Necked Crane Habitat (Stage-I Pending)',
        baselineAverage: 'Cleared',
        impactDescription: 'National Board for Wildlife (NBWL) standing committee mandated seasonal wildlife corridor buffer.',
        mitigationPotential: 'MEDIUM'
      },
      {
        featureName: 'Low Working Season Window',
        category: 'ADMINISTRATIVE',
        shapValue: +0.18,
        featureValue: '5 Months / Year Working Window',
        baselineAverage: '12 Months',
        impactDescription: 'Sub-zero temperatures restrict cadastral field surveys from November to April.',
        mitigationPotential: 'LOW'
      }
    ],
    delayDrivers: [
      {
        id: 'dd-08',
        title: 'Changpa Pastoral Corridor Severance',
        category: 'R&R',
        severity: 'CRITICAL',
        weightContribution: 45,
        rootCause: 'Continuous perimeter fencing prevents annual nomadic migration of Pashmina herds to Changthang valley.',
        affectedStage: 'STAGE_S11_SIA',
        leadIndicator: 'Formal resolution passed by LAHDC General Council against full perimeter fencing'
      }
    ],
    prescriptiveActions: [
      {
        id: 'act-007',
        projectId: 'proj-005',
        title: 'Adopt Elevated Solar Arrays & Dedicated Grazing Corridors',
        category: 'RR_NEGOTIATION',
        priority: 'URGENT',
        description: 'Redesign park layout to leave 300-meter wildlife and livestock migration corridors every 2 km and create Fodder Security Fund of ₹60 Cr with LAHDC.',
        actionableSteps: [
          'Amend park DPR with Power Grid and SECI engineers for elevated racking',
          'Sign Memorandum of Agreement (MoA) with LAHDC Leh and Nomadic Pastoral Association',
          'Establish fodder bank stations at Hanle, Nyoma, and Pang'
        ],
        expectedDelayReductionDays: 210,
        estimatedCostSavingsCr: 180.0,
        assignedAuthority: 'Chief Executive Councillor LAHDC Leh & Secretary MNRE',
        status: 'OPEN',
        deadlineDate: '2026-10-30',
        escalationTier: 'CENTRAL_MINISTRY'
      }
    ],
    lastUpdated: '2026-08-29T11:00:00Z'
  },
  {
    id: 'proj-006',
    code: 'BMRCL-SUBURBAN-C2',
    name: 'Bengaluru Suburban Rail Project (Corridor 2 - Mallige Line)',
    corridor: 'Bengaluru Suburban Rail Transit (K-RIDE)',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    subDistricts: ['Bengaluru North', 'Bengaluru South', 'Yelahanka'],
    agency: 'State PWD',
    projectType: 'Urban Metro & Rapid Transit',
    totalLandAreaHa: 145.0,
    acquiredLandAreaHa: 78.2,
    landTypeDistribution: {
      privateAgriculturalPct: 10,
      privateCommercialPct: 52,
      governmentRevenuePct: 22,
      forestProtectedPct: 0,
      tribalPesaPct: 0
    },
    totalAffectedFamilies: 1890,
    rehabilitatedFamilies: 720,
    sanctionedBudgetCr: 4100.0,
    compensationBudgetCr: 1450.0,
    compensationDisbursedCr: 590.0,
    disbursementPercentage: 40.7,
    riskScore: 72,
    riskCategory: 'HIGH',
    delayProbabilityPct: 76.5,
    predictedDelayMonths: 9.5,
    baselineDurationMonths: 24,
    estimatedTotalMonths: 33.5,
    startDate: '2024-02-15',
    plannedCompletionDate: '2026-02-15',
    predictedCompletionDate: '2026-11-30',
    currentStage: 'STAGE_S19_DECLARATION',
    pendingLitigationCases: 22,
    pendingForestClearances: false,
    cadastralSurveyMismatches: 94,
    gramSabhaResolutionPassed: true,
    interDeptCoordinationScore: 5.1,
    latitude: 13.0358,
    longitude: 77.5970,
    corridorPath: [
      [12.9716, 77.5946],
      [13.0358, 77.5970],
      [13.1000, 77.5800],
      [13.1900, 77.6200]
    ],
    stages: [
      {
        stage: 'STAGE_S4_PRELIMINARY',
        stageName: 'Section 4(1) Notification (KIADB Act Sec 28(1))',
        actSection: 'KIADB Act 1966',
        status: 'COMPLETED',
        plannedDays: 60,
        actualDaysSpent: 70,
        delayDays: 10,
        delayProbabilityPct: 15,
        completionDate: '2024-04-30'
      },
      {
        stage: 'STAGE_S11_SIA',
        stageName: 'Section 11 - Joint Measurement Survey (JMS)',
        actSection: 'KIADB Act Sec 28(2)',
        status: 'COMPLETED',
        plannedDays: 120,
        actualDaysSpent: 180,
        delayDays: 60,
        delayProbabilityPct: 60,
        completionDate: '2024-10-30'
      },
      {
        stage: 'STAGE_S19_DECLARATION',
        stageName: 'Section 19 - Final Notification (Sec 28(4))',
        actSection: 'KIADB Act Sec 28(4)',
        status: 'DELAYED',
        plannedDays: 90,
        actualDaysSpent: 160,
        delayDays: 70,
        delayProbabilityPct: 82,
        keyBottleneck: 'Defense & Railway inter-ministerial land transfer parity pricing terms'
      },
      {
        stage: 'STAGE_S23_AWARD',
        stageName: 'Section 23 - Award & TDR Certificate Generation',
        actSection: 'KIADB / BBMP TDR Policy',
        status: 'PENDING',
        plannedDays: 90,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 70
      },
      {
        stage: 'STAGE_COMPENSATION_DISBURSAL',
        stageName: 'Compensation & Transferable Development Rights (TDR)',
        actSection: 'K-RIDE Escrow Account',
        status: 'IN_PROGRESS',
        plannedDays: 60,
        actualDaysSpent: 20,
        delayDays: 0,
        delayProbabilityPct: 65
      },
      {
        stage: 'STAGE_S38_POSSESSION',
        stageName: 'Section 38 - Possession & Encroachment Removal',
        actSection: 'KIADB Sec 28(8)',
        status: 'PENDING',
        plannedDays: 60,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 75
      },
      {
        stage: 'STAGE_RR_REHABILITATION',
        stageName: 'Urban Commercial Relocation Assistance',
        actSection: 'K-RIDE Urban R&R Policy',
        status: 'PENDING',
        plannedDays: 90,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 68
      }
    ],
    shapFeatures: [
      {
        featureName: 'Inter-Departmental Defense Land Handover',
        category: 'ADMINISTRATIVE',
        shapValue: +0.27,
        featureValue: '18.4 Ha Defense Land Transfer Pending',
        baselineAverage: '0 Ha',
        impactDescription: 'Ministry of Defence institutional valuation approval pending at Army HQ Southern Command.',
        mitigationPotential: 'HIGH'
      },
      {
        featureName: 'High Urban Land Acquisition Valuation Gap',
        category: 'FINANCIAL',
        shapValue: +0.22,
        featureValue: 'Guidance Value 45% below Market',
        baselineAverage: '15% Gap',
        impactDescription: 'Urban property owners demanding Transferable Development Rights (TDR) + 100% Solatium.',
        mitigationPotential: 'HIGH'
      }
    ],
    delayDrivers: [
      {
        id: 'dd-09',
        title: 'MoD Southern Command Land Transfer Delay',
        category: 'ADMINISTRATIVE',
        severity: 'HIGH',
        weightContribution: 38,
        rootCause: 'Working Permission application stuck awaiting Cabinet Committee on Security (CCS) exemption approval.',
        affectedStage: 'STAGE_S19_DECLARATION',
        leadIndicator: 'MoD file pending at Defence Estates Office (DEO) Bengaluru'
      }
    ],
    prescriptiveActions: [
      {
        id: 'act-008',
        projectId: 'proj-006',
        title: 'Execute Equal-Value Land Exchange Protocol with GoK Revenue Land',
        category: 'INTER_DEPT_NOC',
        priority: 'URGENT',
        description: 'Allocate equivalent 22-acre prime revenue plot in Devanahalli to Ministry of Defence in exchange for immediate Working Permission for Corridor-2.',
        actionableSteps: [
          'State Cabinet approval for Devanahalli parcel alienable transfer to Military Station',
          'Issue Joint Working Permission between DEO and Managing Director K-RIDE within 15 days'
        ],
        expectedDelayReductionDays: 120,
        estimatedCostSavingsCr: 68.0,
        assignedAuthority: 'Chief Secretary Karnataka & Defence Estates Officer',
        status: 'OPEN',
        deadlineDate: '2026-10-10',
        escalationTier: 'CENTRAL_MINISTRY'
      }
    ],
    lastUpdated: '2026-08-29T15:45:00Z'
  },
  {
    id: 'proj-007',
    code: 'MSRDC-PUNE-RING',
    name: 'Pune Ring Road Greenfield Expressway (Western Segment)',
    corridor: 'Maharashtra Samruddhi & Western Industrial Spur',
    state: 'Maharashtra',
    district: 'Pune',
    subDistricts: ['Haveli', 'Maval', 'Mulshi', 'Bhor'],
    agency: 'State PWD',
    projectType: 'Expressway & National Highway',
    totalLandAreaHa: 750.0,
    acquiredLandAreaHa: 410.0,
    landTypeDistribution: {
      privateAgriculturalPct: 58,
      privateCommercialPct: 24,
      governmentRevenuePct: 10,
      forestProtectedPct: 8,
      tribalPesaPct: 0
    },
    totalAffectedFamilies: 3600,
    rehabilitatedFamilies: 1600,
    sanctionedBudgetCr: 6800.0,
    compensationBudgetCr: 2800.0,
    compensationDisbursedCr: 1250.0,
    disbursementPercentage: 44.6,
    riskScore: 79,
    riskCategory: 'HIGH',
    delayProbabilityPct: 81.0,
    predictedDelayMonths: 12.0,
    baselineDurationMonths: 24,
    estimatedTotalMonths: 36.0,
    startDate: '2024-01-05',
    plannedCompletionDate: '2026-01-05',
    predictedCompletionDate: '2027-01-05',
    currentStage: 'STAGE_S19_DECLARATION',
    pendingLitigationCases: 34,
    pendingForestClearances: true,
    cadastralSurveyMismatches: 168,
    gramSabhaResolutionPassed: false,
    interDeptCoordinationScore: 4.6,
    latitude: 18.5204,
    longitude: 73.8567,
    corridorPath: [
      [18.7500, 73.6500],
      [18.5204, 73.8567],
      [18.3500, 73.9000],
      [18.2500, 74.0500]
    ],
    stages: [
      {
        stage: 'STAGE_S4_PRELIMINARY',
        stageName: 'Section 4(1) - Preliminary Notification',
        actSection: 'Maharashtra Highway Act / RFCTLARR',
        status: 'COMPLETED',
        plannedDays: 60,
        actualDaysSpent: 80,
        delayDays: 20,
        delayProbabilityPct: 25,
        completionDate: '2024-03-25'
      },
      {
        stage: 'STAGE_S11_SIA',
        stageName: 'Section 11 - SIA & Village Consent Hearings',
        actSection: 'RFCTLARR Sec 11',
        status: 'COMPLETED',
        plannedDays: 120,
        actualDaysSpent: 220,
        delayDays: 100,
        delayProbabilityPct: 75,
        completionDate: '2024-11-05'
      },
      {
        stage: 'STAGE_S19_DECLARATION',
        stageName: 'Section 19 - Declaration of Acquisition',
        actSection: 'RFCTLARR Sec 19',
        status: 'DELAYED',
        plannedDays: 90,
        actualDaysSpent: 175,
        delayDays: 85,
        delayProbabilityPct: 86,
        keyBottleneck: 'Orchard & High-Value Horticultural Crop valuation disputes in Haveli Taluka'
      },
      {
        stage: 'STAGE_S23_AWARD',
        stageName: 'Section 23 - Award & Valuation',
        actSection: 'RFCTLARR Sec 23',
        status: 'PENDING',
        plannedDays: 90,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 80
      },
      {
        stage: 'STAGE_COMPENSATION_DISBURSAL',
        stageName: 'Direct Consent Compensation Disbursal',
        actSection: 'MSRDC Direct Purchase Scheme',
        status: 'IN_PROGRESS',
        plannedDays: 90,
        actualDaysSpent: 30,
        delayDays: 0,
        delayProbabilityPct: 70
      },
      {
        stage: 'STAGE_S38_POSSESSION',
        stageName: 'Section 38 - Physical Possession',
        actSection: 'RFCTLARR Sec 38',
        status: 'PENDING',
        plannedDays: 60,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 84
      },
      {
        stage: 'STAGE_RR_REHABILITATION',
        stageName: 'Rehabilitation & Resettlement Scheme',
        actSection: 'RFCTLARR Schedule II',
        status: 'PENDING',
        plannedDays: 120,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 78
      }
    ],
    shapFeatures: [
      {
        featureName: 'Horticultural & Orchard Valuation Mismatch',
        category: 'FINANCIAL',
        shapValue: +0.29,
        featureValue: '34 Court Injunctions',
        baselineAverage: '4 Cases',
        impactDescription: 'Disputes over pomegranate, fig, and grape vineyard compensation rates per plant.',
        mitigationPotential: 'HIGH'
      },
      {
        featureName: 'Forest Clearance in Western Ghats Buffer',
        category: 'ENVIRONMENTAL',
        shapValue: +0.21,
        featureValue: '60 Ha Forest Land (Stage-I Pending)',
        baselineAverage: 'Cleared',
        impactDescription: 'State Forest department requiring wildlife underpasses approval before diversion.',
        mitigationPotential: 'HIGH'
      }
    ],
    delayDrivers: [
      {
        id: 'dd-10',
        title: 'Agricultural Dept Crop Valuation Grievances',
        category: 'FINANCIAL',
        severity: 'CRITICAL',
        weightContribution: 40,
        rootCause: 'Outdated 2018 horticulture compensation tables applied instead of 2025 agricultural university rates.',
        affectedStage: 'STAGE_S19_DECLARATION',
        leadIndicator: 'Joint memorandum submitted by Haveli Orchard Growers Association'
      }
    ],
    prescriptiveActions: [
      {
        id: 'act-009',
        projectId: 'proj-007',
        title: 'Adopt Revised MPKV Rahuri Horticultural Valuation Schedule',
        category: 'LEGAL_FASTTRACK',
        priority: 'URGENT',
        description: 'Notify updated 2026 Mahatma Phule Krishi Vidyapeeth valuation norms with 25% direct purchase bonus.',
        actionableSteps: [
          'Issue Revenue Department circular adopting updated horticulture schedule',
          'Deploy joint valuation teams (Agriculture Officer + Horticulturist + CALA) for spot verification',
          'Execute direct purchase agreements with spot 50% advance payout'
        ],
        expectedDelayReductionDays: 135,
        estimatedCostSavingsCr: 95.0,
        assignedAuthority: 'Divisional Commissioner Pune & VC MSRDC',
        status: 'OPEN',
        deadlineDate: '2026-09-28',
        escalationTier: 'STATE_NODAL_CALA'
      }
    ],
    lastUpdated: '2026-08-29T17:20:00Z'
  },
  {
    id: 'proj-008',
    code: 'NHAI-VARA-KOL-PKG4',
    name: 'Varanasi-Kolkata Economic Corridor (Kaimur-Rohtas Stretch)',
    corridor: 'Varanasi-Ranchi-Kolkata Expressway (NH-319B)',
    state: 'Bihar',
    district: 'Rohtas',
    subDistricts: ['Sasaram', 'Chenari', 'Sheosagar'],
    agency: 'NHAI',
    projectType: 'Expressway & National Highway',
    totalLandAreaHa: 520.0,
    acquiredLandAreaHa: 380.0,
    landTypeDistribution: {
      privateAgriculturalPct: 78,
      privateCommercialPct: 8,
      governmentRevenuePct: 10,
      forestProtectedPct: 4,
      tribalPesaPct: 0
    },
    totalAffectedFamilies: 3100,
    rehabilitatedFamilies: 2100,
    sanctionedBudgetCr: 3900.0,
    compensationBudgetCr: 1400.0,
    compensationDisbursedCr: 880.0,
    disbursementPercentage: 62.8,
    riskScore: 58,
    riskCategory: 'MEDIUM',
    delayProbabilityPct: 61.2,
    predictedDelayMonths: 6.4,
    baselineDurationMonths: 24,
    estimatedTotalMonths: 30.4,
    startDate: '2023-09-01',
    plannedCompletionDate: '2025-09-01',
    predictedCompletionDate: '2026-03-15',
    currentStage: 'STAGE_COMPENSATION_DISBURSAL',
    pendingLitigationCases: 14,
    pendingForestClearances: false,
    cadastralSurveyMismatches: 64,
    gramSabhaResolutionPassed: true,
    interDeptCoordinationScore: 6.8,
    latitude: 24.9500,
    longitude: 84.0300,
    corridorPath: [
      [25.3176, 82.9739],
      [24.9500, 84.0300],
      [24.0000, 85.3000],
      [22.5726, 88.3639]
    ],
    stages: [
      {
        stage: 'STAGE_S4_PRELIMINARY',
        stageName: 'Section 4(1) - 3A Notification',
        actSection: 'NH Act 1956 Sec 3A',
        status: 'COMPLETED',
        plannedDays: 60,
        actualDaysSpent: 65,
        delayDays: 5,
        delayProbabilityPct: 15,
        completionDate: '2023-11-10'
      },
      {
        stage: 'STAGE_S11_SIA',
        stageName: 'Section 11 - SIA & Hearing',
        actSection: 'NH Act Sec 3C',
        status: 'COMPLETED',
        plannedDays: 120,
        actualDaysSpent: 130,
        delayDays: 10,
        delayProbabilityPct: 20,
        completionDate: '2024-03-20'
      },
      {
        stage: 'STAGE_S19_DECLARATION',
        stageName: 'Section 19 - 3D Declaration',
        actSection: 'NH Act Sec 3D',
        status: 'COMPLETED',
        plannedDays: 90,
        actualDaysSpent: 110,
        delayDays: 20,
        delayProbabilityPct: 30,
        completionDate: '2024-07-10'
      },
      {
        stage: 'STAGE_S23_AWARD',
        stageName: 'Section 23 - 3G Award Determination',
        actSection: 'NH Act Sec 3G',
        status: 'COMPLETED',
        plannedDays: 90,
        actualDaysSpent: 105,
        delayDays: 15,
        delayProbabilityPct: 40,
        completionDate: '2024-10-25'
      },
      {
        stage: 'STAGE_COMPENSATION_DISBURSAL',
        stageName: 'Compensation Disbursal via Bhoomi Rashi / PFMS',
        actSection: 'Bhoomi Rashi Portal',
        status: 'DELAYED',
        plannedDays: 90,
        actualDaysSpent: 145,
        delayDays: 55,
        delayProbabilityPct: 72,
        keyBottleneck: 'CALA bank account token verification backlog in 3 tehsils'
      },
      {
        stage: 'STAGE_S38_POSSESSION',
        stageName: 'Section 38 - 3E Possession',
        actSection: 'NH Act Sec 3E',
        status: 'IN_PROGRESS',
        plannedDays: 60,
        actualDaysSpent: 25,
        delayDays: 0,
        delayProbabilityPct: 55
      },
      {
        stage: 'STAGE_RR_REHABILITATION',
        stageName: 'R&R Assistance Disbursal',
        actSection: 'Schedule II RFCTLARR',
        status: 'IN_PROGRESS',
        plannedDays: 90,
        actualDaysSpent: 30,
        delayDays: 0,
        delayProbabilityPct: 48
      }
    ],
    shapFeatures: [
      {
        featureName: 'Bhoomi Rashi PFMS Disbursal Bottleneck',
        category: 'FINANCIAL',
        shapValue: +0.22,
        featureValue: '62.8% Disbursed (₹880 Cr of ₹1400 Cr)',
        baselineAverage: '85.0%',
        impactDescription: 'Treasury server timeouts and CALA digital signature renewals stalled disbursements for 6 weeks.',
        mitigationPotential: 'HIGH'
      }
    ],
    delayDrivers: [
      {
        id: 'dd-11',
        title: 'Bhoomi Rashi Portal Payment Gateway Latency',
        category: 'ADMINISTRATIVE',
        severity: 'HIGH',
        weightContribution: 55,
        rootCause: 'Batch payment failures due to expired CALA digital signature certificates.',
        affectedStage: 'STAGE_COMPENSATION_DISBURSAL',
        leadIndicator: 'PFMS rejected transaction queue count > 140'
      }
    ],
    prescriptiveActions: [
      {
        id: 'act-010',
        projectId: 'proj-008',
        title: 'Renew CALA Digital Tokens & Enable Automated PFMS Bulk Processing',
        category: 'DISBURSEMENT_SPEED',
        priority: 'HIGH',
        description: 'NIC & NHAI technical team to perform emergency bulk validation of rejected IFSC codes and execute ₹350 Cr pending transfers in 72 hours.',
        actionableSteps: [
          'Deploy NIC IT support officer directly at Rohtas Collectorate',
          'Execute batch re-validation of 420 pending bank accounts',
          'Release pending compensation directly into verified accounts'
        ],
        expectedDelayReductionDays: 70,
        estimatedCostSavingsCr: 35.0,
        assignedAuthority: 'District Magistrate Rohtas & Regional Officer NHAI Patna',
        status: 'IN_PROGRESS',
        deadlineDate: '2026-09-12',
        escalationTier: 'DISTRICT_COLLECTOR'
      }
    ],
    lastUpdated: '2026-08-29T10:00:00Z'
  },
  {
    id: 'proj-009',
    code: 'UP-GORAKHPUR-EXP',
    name: 'Gorakhpur Link Expressway & Industrial Corridor (Section 2)',
    corridor: 'Purvanchal Industrial Belt',
    state: 'Uttar Pradesh',
    district: 'Azamgarh',
    subDistricts: ['Sagri', 'Phulpur'],
    agency: 'State PWD',
    projectType: 'Expressway & National Highway',
    totalLandAreaHa: 410.0,
    acquiredLandAreaHa: 395.0,
    landTypeDistribution: {
      privateAgriculturalPct: 88,
      privateCommercialPct: 4,
      governmentRevenuePct: 8,
      forestProtectedPct: 0,
      tribalPesaPct: 0
    },
    totalAffectedFamilies: 2400,
    rehabilitatedFamilies: 2350,
    sanctionedBudgetCr: 2800.0,
    compensationBudgetCr: 1100.0,
    compensationDisbursedCr: 1060.0,
    disbursementPercentage: 96.4,
    riskScore: 22,
    riskCategory: 'LOW',
    delayProbabilityPct: 14.0,
    predictedDelayMonths: 0.8,
    baselineDurationMonths: 18,
    estimatedTotalMonths: 18.8,
    startDate: '2023-06-01',
    plannedCompletionDate: '2024-12-01',
    predictedCompletionDate: '2024-12-25',
    currentStage: 'STAGE_S38_POSSESSION',
    pendingLitigationCases: 2,
    pendingForestClearances: false,
    cadastralSurveyMismatches: 6,
    gramSabhaResolutionPassed: true,
    interDeptCoordinationScore: 9.4,
    latitude: 26.0683,
    longitude: 83.1840,
    corridorPath: [
      [26.7606, 83.3732],
      [26.0683, 83.1840],
      [25.8000, 83.0000]
    ],
    stages: [
      {
        stage: 'STAGE_S4_PRELIMINARY',
        stageName: 'Section 4(1) Notification',
        actSection: 'UPEIDA Direct Purchase Rules',
        status: 'COMPLETED',
        plannedDays: 45,
        actualDaysSpent: 40,
        delayDays: 0,
        delayProbabilityPct: 8,
        completionDate: '2023-07-15'
      },
      {
        stage: 'STAGE_S11_SIA',
        stageName: 'Section 11 - Direct Negotiation Meetings',
        actSection: 'UP Direct Purchase Policy 2015',
        status: 'COMPLETED',
        plannedDays: 60,
        actualDaysSpent: 55,
        delayDays: 0,
        delayProbabilityPct: 10,
        completionDate: '2023-09-10'
      },
      {
        stage: 'STAGE_S19_DECLARATION',
        stageName: 'Section 19 - Direct Sale Deed Execution',
        actSection: 'Registration Act Sec 17',
        status: 'COMPLETED',
        plannedDays: 90,
        actualDaysSpent: 85,
        delayDays: 0,
        delayProbabilityPct: 12,
        completionDate: '2023-12-05'
      },
      {
        stage: 'STAGE_S23_AWARD',
        stageName: 'Section 23 - Consent Award',
        actSection: 'Mutual Agreement Formula (4x)',
        status: 'COMPLETED',
        plannedDays: 45,
        actualDaysSpent: 40,
        delayDays: 0,
        delayProbabilityPct: 10,
        completionDate: '2024-01-20'
      },
      {
        stage: 'STAGE_COMPENSATION_DISBURSAL',
        stageName: 'Instant DBT Disbursement at Registrar Office',
        actSection: 'UPEIDA Instant Payment Gateway',
        status: 'COMPLETED',
        plannedDays: 30,
        actualDaysSpent: 25,
        delayDays: 0,
        delayProbabilityPct: 8,
        completionDate: '2024-02-15'
      },
      {
        stage: 'STAGE_S38_POSSESSION',
        stageName: 'Section 38 - Seamless Possession',
        actSection: 'Physical Demarcation',
        status: 'IN_PROGRESS',
        plannedDays: 45,
        actualDaysSpent: 30,
        delayDays: 0,
        delayProbabilityPct: 15
      },
      {
        stage: 'STAGE_RR_REHABILITATION',
        stageName: 'R&R Livelihood Grant Release',
        actSection: 'UPEIDA Solatium Scheme',
        status: 'COMPLETED',
        plannedDays: 60,
        actualDaysSpent: 50,
        delayDays: 0,
        delayProbabilityPct: 10,
        completionDate: '2024-04-10'
      }
    ],
    shapFeatures: [
      {
        featureName: 'Direct Purchase via Sub-Registrar Instant DBT',
        category: 'ADMINISTRATIVE',
        shapValue: -0.38,
        featureValue: '96.4% Direct Consent',
        baselineAverage: '68.0%',
        impactDescription: 'Direct purchase model completely bypassed tribunal litigation and Section 19 delay loops.',
        mitigationPotential: 'LOW'
      }
    ],
    delayDrivers: [],
    prescriptiveActions: [],
    lastUpdated: '2026-08-29T09:30:00Z'
  },
  {
    id: 'proj-010',
    code: 'NICD-VCIC-PRAKASAM',
    name: 'Visakhapatnam-Chennai Industrial Corridor (Prakasam Node)',
    corridor: 'East Coast Economic Corridor (ECEC / VCIC)',
    state: 'Andhra Pradesh',
    district: 'Prakasam',
    subDistricts: ['Ongole', 'Singarayakonda', 'Chimakurthy'],
    agency: 'Industrial & Logistics Corridor' as any,
    projectType: 'Industrial & Logistics Corridor',
    totalLandAreaHa: 1850.0,
    acquiredLandAreaHa: 920.0,
    landTypeDistribution: {
      privateAgriculturalPct: 45,
      privateCommercialPct: 12,
      governmentRevenuePct: 28,
      forestProtectedPct: 0,
      tribalPesaPct: 15
    },
    totalAffectedFamilies: 3800,
    rehabilitatedFamilies: 1450,
    sanctionedBudgetCr: 4600.0,
    compensationBudgetCr: 1600.0,
    compensationDisbursedCr: 690.0,
    disbursementPercentage: 43.1,
    riskScore: 76,
    riskCategory: 'HIGH',
    delayProbabilityPct: 79.8,
    predictedDelayMonths: 10.8,
    baselineDurationMonths: 24,
    estimatedTotalMonths: 34.8,
    startDate: '2024-02-01',
    plannedCompletionDate: '2026-02-01',
    predictedCompletionDate: '2026-12-25',
    currentStage: 'STAGE_S19_DECLARATION',
    pendingLitigationCases: 26,
    pendingForestClearances: false,
    cadastralSurveyMismatches: 142,
    gramSabhaResolutionPassed: false,
    interDeptCoordinationScore: 5.3,
    latitude: 15.5057,
    longitude: 80.0499,
    corridorPath: [
      [17.6868, 83.2185],
      [15.5057, 80.0499],
      [13.0827, 80.2707]
    ],
    stages: [
      {
        stage: 'STAGE_S4_PRELIMINARY',
        stageName: 'Section 4(1) - Preliminary Notification',
        actSection: 'AP Land Pooling / RFCTLARR',
        status: 'COMPLETED',
        plannedDays: 60,
        actualDaysSpent: 75,
        delayDays: 15,
        delayProbabilityPct: 20,
        completionDate: '2024-04-15'
      },
      {
        stage: 'STAGE_S11_SIA',
        stageName: 'Section 11 - SIA & Coastal Zone Assessment',
        actSection: 'RFCTLARR Sec 11',
        status: 'COMPLETED',
        plannedDays: 120,
        actualDaysSpent: 190,
        delayDays: 70,
        delayProbabilityPct: 65,
        completionDate: '2024-10-25'
      },
      {
        stage: 'STAGE_S19_DECLARATION',
        stageName: 'Section 19 - Declaration of Industrial Node',
        actSection: 'RFCTLARR Sec 19',
        status: 'DELAYED',
        plannedDays: 90,
        actualDaysSpent: 160,
        delayDays: 70,
        delayProbabilityPct: 84,
        keyBottleneck: 'Aquaculture pond conversion valuation claims and CRZ buffer clearances'
      },
      {
        stage: 'STAGE_S23_AWARD',
        stageName: 'Section 23 - Award Formulation',
        actSection: 'RFCTLARR Sec 23',
        status: 'PENDING',
        plannedDays: 90,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 76
      },
      {
        stage: 'STAGE_COMPENSATION_DISBURSAL',
        stageName: 'Compensation & Land Pooling Return Plots',
        actSection: 'APIIC Escrow Account',
        status: 'IN_PROGRESS',
        plannedDays: 90,
        actualDaysSpent: 30,
        delayDays: 0,
        delayProbabilityPct: 70
      },
      {
        stage: 'STAGE_S38_POSSESSION',
        stageName: 'Section 38 - Physical Possession',
        actSection: 'RFCTLARR Sec 38',
        status: 'PENDING',
        plannedDays: 60,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 80
      },
      {
        stage: 'STAGE_RR_REHABILITATION',
        stageName: 'Fisherfolk & Salt Pan Workers Resettlement',
        actSection: 'ADB Safeguards / RFCTLARR',
        status: 'PENDING',
        plannedDays: 120,
        actualDaysSpent: 0,
        delayDays: 0,
        delayProbabilityPct: 78
      }
    ],
    shapFeatures: [
      {
        featureName: 'Coastal Aquaculture Land Valuation Conflict',
        category: 'FINANCIAL',
        shapValue: +0.28,
        featureValue: '26 High Court Writs',
        baselineAverage: '5 Writs',
        impactDescription: 'Shrimp pond operators claiming commercial industrial land multiplier instead of dry agricultural rate.',
        mitigationPotential: 'HIGH'
      }
    ],
    delayDrivers: [
      {
        id: 'dd-12',
        title: 'Shrimp Farming Land Conversion Categorization',
        category: 'LEGAL',
        severity: 'CRITICAL',
        weightContribution: 45,
        rootCause: 'Revenue records classify land as Poramboke/Saltpan while landowners possess 20-year aquaculture licenses.',
        affectedStage: 'STAGE_S19_DECLARATION',
        leadIndicator: 'AP High Court interim status quo orders'
      }
    ],
    prescriptiveActions: [
      {
        id: 'act-011',
        projectId: 'proj-010',
        title: 'Notify Specialized Aquaculture Infrastructure Valuation Matrix',
        category: 'LEGAL_FASTTRACK',
        priority: 'URGENT',
        description: 'Issue AP Government Order (GO) providing 1.8x enhanced structural compensation for aeration plants and hatcheries upon immediate consent.',
        actionableSteps: [
          'State Industries & Fisheries Dept joint GO issuance',
          'Deploy Fisheries Development Officers in joint valuation camps',
          'Disburse 40% immediate mobilization advance to farmers'
        ],
        expectedDelayReductionDays: 115,
        estimatedCostSavingsCr: 60.0,
        assignedAuthority: 'District Collector Prakasam & MD APIIC',
        status: 'OPEN',
        deadlineDate: '2026-10-18',
        escalationTier: 'STATE_NODAL_CALA'
      }
    ],
    lastUpdated: '2026-08-29T13:40:00Z'
  }
];

export const INITIAL_MODEL_METRICS: ModelMetrics = {
  version: 'v3.4.2-ensemble',
  algorithm: 'XGBoost + LightGBM + Random Forest Hybrid Classifier & Regressor',
  rocAucScore: 0.932,
  rmseMonths: 1.35,
  maeDays: 38.2,
  f1Score: 0.894,
  precision: 0.912,
  recall: 0.877,
  totalTrainingSamples: 14850,
  lastRetrainedAt: '2026-08-28T04:30:00Z',
  featureImportances: [
    { feature: 'Litigation Density & High Court Stay Orders', weight: 0.284, category: 'LEGAL' },
    { feature: 'Compensation Disbursement Velocity Lag', weight: 0.218, category: 'FINANCIAL' },
    { feature: 'Tribal / PESA Scheduled Land Ratio', weight: 0.162, category: 'R&R' },
    { feature: 'Cadastral Map Discrepancies & Sub-division Errors', weight: 0.125, category: 'CADASSTRAL' },
    { feature: 'Pending Stage-II Forest & Wildlife Clearances', weight: 0.108, category: 'ENVIRONMENTAL' },
    { feature: 'Inter-Agency Coordination Friction Score', weight: 0.061, category: 'ADMINISTRATIVE' },
    { feature: 'Total Project Land Area & Density of Affected Families', weight: 0.042, category: 'PROJECT_SCALE' }
  ],
  confusionMatrix: {
    truePositive: 4120,
    falsePositive: 380,
    trueNegative: 9640,
    falseNegative: 710
  },
  driftStatus: 'HEALTHY'
};

export const INITIAL_ALERTS: AlertNotification[] = [
  {
    id: 'alt-ews-abc',
    projectId: 'proj-001',
    projectName: 'Project ABC (Bharatmala Priority Corridor Package 04)',
    state: 'Maharashtra',
    district: 'Palghar & Thane',
    timestamp: '2026-08-30T11:30:00Z',
    severity: 'CRITICAL',
    triggerRule: 'Rule #EWS-COMP-42: Compensation Escrow Disbursement Blocked > 40 Days',
    message: '⚠️ High Risk Detected: Project ABC may face a 42-day delay due to unresolved compensation disputes.',
    prescribedRemedy: 'Initiate expedited Special CALA Lok Adalat Bench with 25% consent incentive disbursement to clear 42-day critical path delay.',
    isRead: false,
    targetRole: 'DISTRICT_COLLECTOR',
    channel: 'GATISHAKTI_NMP'
  },
  {
    id: 'alt-001',
    projectId: 'proj-001',
    projectName: 'Delhi-Mumbai Expressway (Package 14 - Palghar-Dahanu Spur)',
    state: 'Maharashtra',
    district: 'Palghar',
    timestamp: '2026-08-30T09:15:00Z',
    severity: 'CRITICAL',
    triggerRule: 'Rule #LA-401: Section 19 declaration pending > 75 days past statutory threshold',
    message: 'Predicted delay risk escalated to 84 (CRITICAL). 38 pending High Court writs are halting final declaration.',
    prescribedRemedy: 'Convene Special CALA Lok Adalat with 25% consent incentive bonus (Action ID: act-001).',
    isRead: false,
    targetRole: 'DISTRICT_COLLECTOR',
    channel: 'GATISHAKTI_NMP'
  },
  {
    id: 'alt-002',
    projectId: 'proj-005',
    projectName: 'Leh-Ladakh Ultra Mega Solar & Green Hydrogen Park (13 GW Corridor)',
    state: 'UT Ladakh',
    district: 'Leh',
    timestamp: '2026-08-29T16:40:00Z',
    severity: 'CRITICAL',
    triggerRule: 'Rule #LA-108: Social Impact Assessment (SIA) delayed > 160 days in tribal/nomadic zone',
    message: 'Changpa nomadic pastoralists dispute fencing of 4,200 Ha winter pastures. Working season ends in 60 days.',
    prescribedRemedy: 'Adopt elevated solar racking with 300m livestock corridors & notify Fodder Security Fund (Action ID: act-007).',
    isRead: false,
    targetRole: 'CENTRAL_MINISTRY',
    channel: 'PORTAL'
  },
  {
    id: 'alt-003',
    projectId: 'proj-003',
    projectName: 'Eastern Dedicated Freight Corridor (Sonnagar-Dankuni Section)',
    state: 'West Bengal',
    district: 'Purba Bardhaman',
    timestamp: '2026-08-29T11:20:00Z',
    severity: 'HIGH',
    triggerRule: 'Rule #LA-204: Cadastral Survey Mismatch Count > 200 in agricultural sharecropper zone',
    message: '215 unrecorded Bargadar land claims are stalling Section 23 award formulation across 18 mouzas.',
    prescribedRemedy: 'Deploy 12 joint Revenue-Panchayat verification squads for on-spot cultivator statements (Action ID: act-005).',
    isRead: false,
    targetRole: 'STATE_CALA',
    channel: 'EMAIL'
  },
  {
    id: 'alt-004',
    projectId: 'proj-008',
    projectName: 'Varanasi-Kolkata Economic Corridor (Kaimur-Rohtas Stretch)',
    state: 'Bihar',
    district: 'Rohtas',
    timestamp: '2026-08-28T14:10:00Z',
    severity: 'HIGH',
    triggerRule: 'Rule #LA-302: Compensation disbursement lag > 25% against target schedule',
    message: 'Bhoomi Rashi / PFMS token failure blocked ₹350 Cr compensation disbursement across 3 tehsils.',
    prescribedRemedy: 'Renew CALA digital signature certificates & trigger bulk NIC verification (Action ID: act-010).',
    isRead: true,
    targetRole: 'PROJECT_DIRECTOR',
    channel: 'SMS'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-001',
    timestamp: '2026-08-30T10:45:12Z',
    user: 'Shri R. K. Sharma (Joint Secretary - Infra)',
    role: 'CENTRAL_MINISTRY',
    action: 'Prescriptive Escalation Approved',
    category: 'MITIGATION_STATUS',
    targetProjectCode: 'NHAI-DME-PKG14',
    details: 'Approved constitution of Special CALA Lok Adalat Bench for Palghar district with ₹25 Cr incentive pool.',
    ipAddress: '10.24.110.42',
    blockHeight: 5,
    previousHash: '3f7a8b1c9e2d4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
    hash: 'a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f01234',
    digitalSignature: 'NIC-CA-APEX-GOV:RSA4096:a1b2c3d4e5f6a7b8...s72k9p1',
    isVerified: true
  },
  {
    id: 'log-002',
    timestamp: '2026-08-30T09:12:30Z',
    user: 'AI Predictive Engine (Automated Daemon)',
    role: 'CENTRAL_MINISTRY',
    action: 'Daily Inference & Risk Score Refresh',
    category: 'PREDICTION_OVERRIDE',
    targetProjectCode: 'ALL_PROJECTS',
    details: 'Completed scheduled batch inference for 10 active infrastructure corridors across 14,850 data points.',
    ipAddress: '127.0.0.1 (System)',
    blockHeight: 4,
    previousHash: '8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f',
    hash: '3f7a8b1c9e2d4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b',
    digitalSignature: 'NIC-CA-APEX-GOV:RSA4096:3f7a8b1c9e2d4a5b...q81m4x9',
    isVerified: true
  },
  {
    id: 'log-003',
    timestamp: '2026-08-29T17:30:15Z',
    user: 'Dr. Neha Verma (CALA Nodal Coordinator)',
    role: 'STATE_CALA',
    action: 'Drone Cadastral Survey Ingestion',
    category: 'DATA_INGESTION',
    targetProjectCode: 'MSRDC-PUNE-RING',
    details: 'Ingested LiDAR boundary shapefiles for 45 parcels in Haveli taluka from Survey of India gateway.',
    ipAddress: '10.88.45.19',
    blockHeight: 3,
    previousHash: '4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f',
    hash: '8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f',
    digitalSignature: 'NIC-DSC-STATE-CALA:RSA4096:8e9f0a1b2c3d4e5f...k55b2w3',
    isVerified: true
  },
  {
    id: 'log-004',
    timestamp: '2026-08-29T14:05:00Z',
    user: 'MLOps Continuous Learning Daemon',
    role: 'CENTRAL_MINISTRY',
    action: 'Model Retrain Benchmark Validation',
    category: 'MODEL_RETRAIN',
    details: 'Evaluated Model Version v3.4.2 against newly added Bihar & Gujarat completion milestone records. ROC-AUC: 0.932.',
    ipAddress: '127.0.0.1 (System)',
    blockHeight: 2,
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    hash: '4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f',
    digitalSignature: 'NIC-CA-APEX-GOV:RSA4096:4e5f6a7b8c9d0e1f...z99x1m8',
    isVerified: true
  },
  {
    id: 'log-005',
    timestamp: '2026-08-28T16:20:44Z',
    user: 'Adv. Suresh Deshmukh (Legal Cell Lead)',
    role: 'LEGAL_OFFICER',
    action: 'Litigation Case Status Updated',
    category: 'MITIGATION_STATUS',
    targetProjectCode: 'NHSRCL-MAHSR-SEC3',
    details: 'Surat Special Land Tribunal dismissed final 2 tenancy appeals. Project risk reduced to 28 (LOW).',
    ipAddress: '10.15.201.8',
    blockHeight: 1,
    previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
    hash: '0000000000000000000000000000000000000000000000000000000000000000',
    digitalSignature: 'HC-E-SIGN-LEGAL:RSA4096:GENESIS_BLOCK...v10n8k4',
    isVerified: true
  }
];

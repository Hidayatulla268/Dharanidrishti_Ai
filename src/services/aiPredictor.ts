import { 
  LandAcquisitionProject, 
  RiskCategory, 
  SHAPFeature, 
  DelayDriver, 
  PrescriptiveAction, 
  WhatIfParameters,
  StageProgress,
  AcquisitionStage
} from '../types';

export interface PredictionInput {
  totalLandAreaHa: number;
  totalAffectedFamilies: number;
  disbursementPercentage: number;
  pendingLitigationCases: number;
  pendingForestClearances: boolean;
  cadastralSurveyMismatches: number;
  tribalPesaPct: number;
  gramSabhaResolutionPassed: boolean;
  interDeptCoordinationScore: number; // 0 - 10
  currentStage: AcquisitionStage;
  compensationBudgetCr: number;
}

export interface PredictionResult {
  riskScore: number;
  riskCategory: RiskCategory;
  delayProbabilityPct: number;
  predictedDelayMonths: number;
  stageDelayProbabilities: { stage: AcquisitionStage; probabilityPct: number; delayDays: number }[];
  shapFeatures: SHAPFeature[];
  delayDrivers: DelayDriver[];
  prescriptiveActions: PrescriptiveAction[];
}

export function computeAiPrediction(input: PredictionInput, existingCode?: string): PredictionResult {
  // Baseline risk anchor (base model expectation = 25)
  let baseScore = 20;

  // 1. Legal / Litigation Factor (High impact)
  const litigationImpact = Math.min(35, input.pendingLitigationCases * 1.15);
  
  // 2. Compensation Disbursement Lag
  // Below 75% at active stages creates severe risk
  const disbursementDeficit = Math.max(0, 80 - input.disbursementPercentage);
  const disbursementImpact = (disbursementDeficit / 80) * 28;

  // 3. Tribal / PESA Scheduled Land Risk
  const tribalImpact = Math.min(22, (input.tribalPesaPct / 100) * 120 + (!input.gramSabhaResolutionPassed ? 10 : 0));

  // 4. Cadastral Survey & Title Mismatches
  const cadastralImpact = Math.min(18, (input.cadastralSurveyMismatches / 20) * 2.5);

  // 5. Environmental & Forest Clearances
  const forestImpact = input.pendingForestClearances ? 14 : 0;

  // 6. Inter-Departmental Coordination (Reduces risk when high, adds when low)
  const coordinationImpact = (5.5 - input.interDeptCoordinationScore) * 2.5;

  // 7. Project Scale & Density Factor (Affected families per Ha)
  const familyDensity = input.totalLandAreaHa > 0 ? input.totalAffectedFamilies / input.totalLandAreaHa : 0;
  const scaleImpact = Math.min(10, (familyDensity / 10) * 4);

  // Raw Risk Score Calculation
  let rawRisk = baseScore + litigationImpact + disbursementImpact + tribalImpact + cadastralImpact + forestImpact + coordinationImpact + scaleImpact;
  
  // Bound to 0 - 100
  const riskScore = Math.max(5, Math.min(99, Math.round(rawRisk)));

  // Risk Category
  let riskCategory: RiskCategory = 'LOW';
  if (riskScore >= 80) riskCategory = 'CRITICAL';
  else if (riskScore >= 60) riskCategory = 'HIGH';
  else if (riskScore >= 35) riskCategory = 'MEDIUM';
  else riskCategory = 'LOW';

  // Delay Probability (% probability of exceeding scheduled timeline by > 60 days)
  const delayProbabilityPct = Math.min(98.5, Math.max(8.0, Number((riskScore * 1.08).toFixed(1))));

  // Predicted Delay in Months
  const predictedDelayMonths = Number(((riskScore / 100) * 18.5 + (litigationImpact * 0.15) + (disbursementDeficit * 0.08)).toFixed(1));

  // Dynamic SHAP Feature Breakdown
  const shapFeatures: SHAPFeature[] = [];

  if (input.pendingLitigationCases > 0) {
    shapFeatures.push({
      featureName: 'High Court & Tribunal Litigations',
      category: 'LEGAL',
      shapValue: Number((litigationImpact / 100).toFixed(2)),
      featureValue: `${input.pendingLitigationCases} Active Writs`,
      baselineAverage: '4.2 Writs',
      impactDescription: `${input.pendingLitigationCases} pending court stay petitions directly restrict statutory awards.`,
      mitigationPotential: input.pendingLitigationCases > 10 ? 'HIGH' : 'MEDIUM'
    });
  }

  if (disbursementImpact > 4) {
    shapFeatures.push({
      featureName: 'Compensation Disbursement Velocity Lag',
      category: 'FINANCIAL',
      shapValue: Number((disbursementImpact / 100).toFixed(2)),
      featureValue: `${input.disbursementPercentage.toFixed(1)}% Disbursed`,
      baselineAverage: '80.0%',
      impactDescription: `Disbursal deficit of ${(80 - input.disbursementPercentage).toFixed(1)}% triggers landowner withholding of physical possession.`,
      mitigationPotential: 'HIGH'
    });
  } else {
    shapFeatures.push({
      featureName: 'Robust Compensation Disbursement Speed',
      category: 'FINANCIAL',
      shapValue: -0.22,
      featureValue: `${input.disbursementPercentage.toFixed(1)}% Disbursed`,
      baselineAverage: '80.0%',
      impactDescription: 'High payment velocity ensures trust and voluntary land surrender.',
      mitigationPotential: 'LOW'
    });
  }

  if (input.tribalPesaPct > 0 || !input.gramSabhaResolutionPassed) {
    shapFeatures.push({
      featureName: 'Tribal Land (PESA) Consent Quorum',
      category: 'R&R',
      shapValue: Number((tribalImpact / 100).toFixed(2)),
      featureValue: `${input.tribalPesaPct}% Scheduled Land (${input.gramSabhaResolutionPassed ? 'Consent Passed' : 'Consent Pending'})`,
      baselineAverage: '0% Scheduled Area',
      impactDescription: 'Mandatory special quorum and rehabilitation protections require administrative mediation.',
      mitigationPotential: 'MEDIUM'
    });
  }

  if (input.cadastralSurveyMismatches > 15) {
    shapFeatures.push({
      featureName: 'Cadastral Map Discrepancies',
      category: 'CADASSTRAL',
      shapValue: Number((cadastralImpact / 100).toFixed(2)),
      featureValue: `${input.cadastralSurveyMismatches} Discrepant Parcels`,
      baselineAverage: '15 Parcels',
      impactDescription: 'Joint measurement survey boundary overlaps require drone re-survey rectification.',
      mitigationPotential: 'HIGH'
    });
  }

  if (input.pendingForestClearances) {
    shapFeatures.push({
      featureName: 'Pending Stage-II Forest Diversion',
      category: 'ENVIRONMENTAL',
      shapValue: +0.15,
      featureValue: 'Stage-II NOC Awaited',
      baselineAverage: 'Stage-II Cleared',
      impactDescription: 'Forest Advisory Committee Net Present Value payment mutation pending.',
      mitigationPotential: 'HIGH'
    });
  }

  if (input.interDeptCoordinationScore >= 8.0) {
    shapFeatures.push({
      featureName: 'High Inter-Departmental Coordination',
      category: 'ADMINISTRATIVE',
      shapValue: -0.16,
      featureValue: `${input.interDeptCoordinationScore} / 10 Score`,
      baselineAverage: '5.5 / 10',
      impactDescription: 'Streamlined State Nodal Officer facilitation mitigates administrative friction.',
      mitigationPotential: 'LOW'
    });
  }

  // Delay Drivers
  const delayDrivers: DelayDriver[] = [];
  let driverCounter = 1;

  if (input.pendingLitigationCases >= 10) {
    delayDrivers.push({
      id: `dyn-dd-${driverCounter++}`,
      title: `${input.pendingLitigationCases} Active Litigation Stay Injunctions`,
      category: 'LEGAL',
      severity: input.pendingLitigationCases >= 25 ? 'CRITICAL' : 'HIGH',
      weightContribution: Math.round((litigationImpact / (litigationImpact + disbursementImpact + tribalImpact + 10)) * 100),
      rootCause: 'Landowners demanding enhanced 4x market value multiplier and solatium revisions.',
      affectedStage: 'STAGE_S19_DECLARATION',
      leadIndicator: 'Active status quo order from High Court / LA Tribunal'
    });
  }

  if (disbursementDeficit > 20) {
    delayDrivers.push({
      id: `dyn-dd-${driverCounter++}`,
      title: `Compensation Payout Deficit (${input.disbursementPercentage.toFixed(1)}% vs 80% Benchmark)`,
      category: 'FINANCIAL',
      severity: disbursementDeficit > 40 ? 'CRITICAL' : 'HIGH',
      weightContribution: Math.round((disbursementImpact / (litigationImpact + disbursementImpact + tribalImpact + 10)) * 100),
      rootCause: 'PFMS gateway delays, token expiration, and unlinked Aadhaar records at CALA desk.',
      affectedStage: 'STAGE_COMPENSATION_DISBURSAL',
      leadIndicator: 'Pending fund release queue > 30 days'
    });
  }

  if (input.cadastralSurveyMismatches > 30) {
    delayDrivers.push({
      id: `dyn-dd-${driverCounter++}`,
      title: `${input.cadastralSurveyMismatches} Land Parcel Boundary Demarcation Mismatches`,
      category: 'GEOSPATIAL',
      severity: 'MEDIUM',
      weightContribution: Math.round((cadastralImpact / (litigationImpact + disbursementImpact + tribalImpact + 10)) * 100),
      rootCause: 'Discrepancy between old revenue settlement maps and physical GPS boundary coordinates.',
      affectedStage: 'STAGE_S23_AWARD',
      leadIndicator: 'Objections filed during Joint Measurement Survey'
    });
  }

  // Prescriptive Mitigation Actions
  const prescriptiveActions: PrescriptiveAction[] = [];
  let actCounter = 1;
  const projectCode = existingCode || 'CUSTOM-PROJ';

  if (input.pendingLitigationCases >= 8) {
    prescriptiveActions.push({
      id: `dyn-act-${actCounter++}`,
      projectId: projectCode,
      title: 'Convene Special CALA Lok Adalat with Direct Consent Solatium Incentive',
      category: 'LEGAL_FASTTRACK',
      priority: 'URGENT',
      description: 'Set up dedicated Special Judicial Magistrate & CALA bench to offer 25% statutory consent incentive for immediate settlement of land writs.',
      actionableSteps: [
        'Issue District Administration notification for Special Lok Adalat bench',
        'Notify 25% consent incentive under RFCTLARR Section 23A',
        'Target settlement of top 75% litigant clusters within 21 days'
      ],
      expectedDelayReductionDays: Math.round(input.pendingLitigationCases * 3.5),
      estimatedCostSavingsCr: Number((input.pendingLitigationCases * 1.8).toFixed(1)),
      assignedAuthority: 'District Collector & Principal District Judge',
      status: 'OPEN',
      deadlineDate: '2026-10-15',
      escalationTier: 'DISTRICT_COLLECTOR'
    });
  }

  if (disbursementDeficit > 15) {
    prescriptiveActions.push({
      id: `dyn-act-${actCounter++}`,
      projectId: projectCode,
      title: 'Deploy CALA Spot-Disbursement Camps with Direct PFMS Verification',
      category: 'DISBURSEMENT_SPEED',
      priority: 'HIGH',
      description: 'Establish village-level mobile revenue camps with NIC IT officers to resolve Aadhaar/bank mismatches and execute direct bank credits.',
      actionableSteps: [
        'Deploy mobile camp teams equipped with biometric verification terminals',
        'Authorize CALA digital batch token clearance for approved awards',
        'Complete disbursals of pending ₹ Cr in 14 days'
      ],
      expectedDelayReductionDays: Math.round(disbursementDeficit * 2.2),
      estimatedCostSavingsCr: Number((disbursementDeficit * 0.9).toFixed(1)),
      assignedAuthority: 'Competent Authority Land Acquisition (CALA) & Lead Bank Manager',
      status: 'OPEN',
      deadlineDate: '2026-09-30',
      escalationTier: 'DISTRICT_COLLECTOR'
    });
  }

  if (input.cadastralSurveyMismatches > 20) {
    prescriptiveActions.push({
      id: `dyn-act-${actCounter++}`,
      projectId: projectCode,
      title: 'Deploy High-Precision RTK Drone Re-Survey for Instant Cadastral Rectification',
      category: 'DRONE_RESURVEY',
      priority: 'HIGH',
      description: 'Deploy Survey of India certified drone teams to generate 5cm ortho-mosaic maps and auto-align with digital revenue records.',
      actionableSteps: [
        'Execute aerial LiDAR drone survey of disputed parcels in 48 hours',
        'Generate geo-referenced digital khasra boundaries',
        'Obtain spot consent signatures of abutting patwaris'
      ],
      expectedDelayReductionDays: 55,
      estimatedCostSavingsCr: 18.5,
      assignedAuthority: 'Superintendent of Land Records & Project Director',
      status: 'OPEN',
      deadlineDate: '2026-10-05',
      escalationTier: 'STATE_NODAL_CALA'
    });
  }

  // Stage delay probabilities
  const stageDelayProbabilities: { stage: AcquisitionStage; probabilityPct: number; delayDays: number }[] = [
    { stage: 'STAGE_S4_PRELIMINARY', probabilityPct: Math.min(95, Math.round(riskScore * 0.3)), delayDays: Math.round(predictedDelayMonths * 3) },
    { stage: 'STAGE_S11_SIA', probabilityPct: Math.min(95, Math.round(riskScore * 0.75 + (tribalImpact * 1.5))), delayDays: Math.round(predictedDelayMonths * 6) },
    { stage: 'STAGE_S19_DECLARATION', probabilityPct: Math.min(98, Math.round(riskScore * 0.9 + (litigationImpact * 0.8))), delayDays: Math.round(predictedDelayMonths * 10) },
    { stage: 'STAGE_S23_AWARD', probabilityPct: Math.min(95, Math.round(riskScore * 0.85 + (cadastralImpact * 0.9))), delayDays: Math.round(predictedDelayMonths * 8) },
    { stage: 'STAGE_COMPENSATION_DISBURSAL', probabilityPct: Math.min(95, Math.round(disbursementImpact * 3.2)), delayDays: Math.round(disbursementDeficit * 2) },
    { stage: 'STAGE_S38_POSSESSION', probabilityPct: Math.min(98, Math.round(riskScore * 0.92)), delayDays: Math.round(predictedDelayMonths * 9) },
    { stage: 'STAGE_RR_REHABILITATION', probabilityPct: Math.min(95, Math.round(riskScore * 0.88 + (tribalImpact * 1.2))), delayDays: Math.round(predictedDelayMonths * 7) }
  ];

  return {
    riskScore,
    riskCategory,
    delayProbabilityPct,
    predictedDelayMonths,
    stageDelayProbabilities,
    shapFeatures,
    delayDrivers,
    prescriptiveActions
  };
}

export function simulateWhatIfScenario(
  project: LandAcquisitionProject,
  params: WhatIfParameters
): {
  improvedRiskScore: number;
  improvedDelayMonths: number;
  delayMonthsSaved: number;
  costSavingsCr: number;
  updatedShapFeatures: SHAPFeature[];
  riskCategory: RiskCategory;
} {
  // Compute modified parameters
  const newDisbursementPct = Math.min(100, project.disbursementPercentage + params.compensationDisbursementBoostPct);
  const newLitigation = Math.max(0, project.pendingLitigationCases - params.litigationResolutionCount);
  const newForest = params.forestClearanceFastTracked ? false : project.pendingForestClearances;
  const newMismatches = params.additionalManpowerAllocated ? Math.round(project.cadastralSurveyMismatches * 0.4) : project.cadastralSurveyMismatches;
  const newCoordination = Math.min(10, project.interDeptCoordinationScore + (params.forestClearanceFastTracked ? 1.5 : 0) + (params.additionalManpowerAllocated ? 1.0 : 0));

  const simulation = computeAiPrediction({
    totalLandAreaHa: project.totalLandAreaHa,
    totalAffectedFamilies: project.totalAffectedFamilies,
    disbursementPercentage: newDisbursementPct,
    pendingLitigationCases: newLitigation,
    pendingForestClearances: newForest,
    cadastralSurveyMismatches: newMismatches,
    tribalPesaPct: project.landTypeDistribution.tribalPesaPct,
    gramSabhaResolutionPassed: project.gramSabhaResolutionPassed || params.directPurchaseNegotiationPct > 30,
    interDeptCoordinationScore: newCoordination,
    currentStage: project.currentStage,
    compensationBudgetCr: project.compensationBudgetCr
  }, project.code);

  const delayMonthsSaved = Math.max(0, Number((project.predictedDelayMonths - simulation.predictedDelayMonths).toFixed(1)));
  const costSavingsCr = Number((delayMonthsSaved * (project.sanctionedBudgetCr * 0.012)).toFixed(1));

  return {
    improvedRiskScore: simulation.riskScore,
    improvedDelayMonths: simulation.predictedDelayMonths,
    delayMonthsSaved,
    costSavingsCr,
    updatedShapFeatures: simulation.shapFeatures,
    riskCategory: simulation.riskCategory
  };
}

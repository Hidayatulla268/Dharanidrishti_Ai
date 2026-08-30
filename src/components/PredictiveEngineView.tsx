import React, { useState, useMemo } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  Sliders, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingDown, 
  RotateCcw, 
  Scale, 
  ShieldAlert, 
  Coins, 
  Clock, 
  Layers,
  ChevronDown,
  Info
} from 'lucide-react';
import { 
  LandAcquisitionProject, 
  WhatIfParameters, 
  AcquisitionStage, 
  SHAPFeature,
  RiskCategory 
} from '../types';
import { computeAiPrediction, simulateWhatIfScenario } from '../services/aiPredictor';

interface PredictiveEngineViewProps {
  projects: LandAcquisitionProject[];
  selectedProject: LandAcquisitionProject;
  onSelectProject: (project: LandAcquisitionProject) => void;
  onNavigateToPrescriptive: (project: LandAcquisitionProject) => void;
}

export const PredictiveEngineView: React.FC<PredictiveEngineViewProps> = ({
  projects,
  selectedProject,
  onSelectProject,
  onNavigateToPrescriptive
}) => {
  // Mode: 'EXISTING_PROJECT' | 'CUSTOM_EVALUATOR'
  const [evaluationMode, setEvaluationMode] = useState<'EXISTING_PROJECT' | 'CUSTOM_EVALUATOR'>('EXISTING_PROJECT');

  // Custom Evaluator State
  const [customName, setCustomName] = useState('New Greenfield Corridor (Proposed)');
  const [customLandArea, setCustomLandArea] = useState(500);
  const [customFamilies, setCustomFamilies] = useState(2500);
  const [customDisbursedPct, setCustomDisbursedPct] = useState(40);
  const [customLitigation, setCustomLitigation] = useState(25);
  const [customForestNoc, setCustomForestNoc] = useState(true);
  const [customCadastralErrors, setCustomCadastralErrors] = useState(85);
  const [customTribalPct, setCustomTribalPct] = useState(15);
  const [customGramSabha, setCustomGramSabha] = useState(false);
  const [customCoordination, setCustomCoordination] = useState(4.5);
  const [customStage, setCustomStage] = useState<AcquisitionStage>('STAGE_S19_DECLARATION');

  // What-If Scenario State
  const initialWhatIf: WhatIfParameters = {
    compensationDisbursementBoostPct: 0,
    litigationResolutionCount: 0,
    forestClearanceFastTracked: false,
    directPurchaseNegotiationPct: 0,
    additionalManpowerAllocated: false
  };
  const [whatIfParams, setWhatIfParams] = useState<WhatIfParameters>(initialWhatIf);

  // Active Project Data based on mode
  const activeProjectData: LandAcquisitionProject = useMemo(() => {
    if (evaluationMode === 'EXISTING_PROJECT') {
      return selectedProject;
    } else {
      const customPred = computeAiPrediction({
        totalLandAreaHa: customLandArea,
        totalAffectedFamilies: customFamilies,
        disbursementPercentage: customDisbursedPct,
        pendingLitigationCases: customLitigation,
        pendingForestClearances: customForestNoc,
        cadastralSurveyMismatches: customCadastralErrors,
        tribalPesaPct: customTribalPct,
        gramSabhaResolutionPassed: customGramSabha,
        interDeptCoordinationScore: customCoordination,
        currentStage: customStage,
        compensationBudgetCr: 1200
      }, 'CUSTOM-NEW-01');

      return {
        id: 'custom-proj-eval',
        code: 'PROP-CUSTOM-CORRIDOR',
        name: customName,
        corridor: 'National Infrastructure Pipeline',
        state: 'Simulated State',
        district: 'Simulated District',
        subDistricts: ['Sector A', 'Sector B'],
        agency: 'NHAI',
        projectType: 'Expressway & National Highway',
        totalLandAreaHa: customLandArea,
        acquiredLandAreaHa: (customLandArea * (customDisbursedPct / 100)),
        landTypeDistribution: {
          privateAgriculturalPct: 60,
          privateCommercialPct: 15,
          governmentRevenuePct: 10,
          forestProtectedPct: customForestNoc ? 15 : 0,
          tribalPesaPct: customTribalPct
        },
        totalAffectedFamilies: customFamilies,
        rehabilitatedFamilies: Math.round(customFamilies * 0.3),
        sanctionedBudgetCr: 3500,
        compensationBudgetCr: 1200,
        compensationDisbursedCr: (1200 * (customDisbursedPct / 100)),
        disbursementPercentage: customDisbursedPct,
        riskScore: customPred.riskScore,
        riskCategory: customPred.riskCategory,
        delayProbabilityPct: customPred.delayProbabilityPct,
        predictedDelayMonths: customPred.predictedDelayMonths,
        baselineDurationMonths: 24,
        estimatedTotalMonths: 24 + customPred.predictedDelayMonths,
        startDate: '2025-01-01',
        plannedCompletionDate: '2027-01-01',
        predictedCompletionDate: '2027-10-15',
        currentStage: customStage,
        pendingLitigationCases: customLitigation,
        pendingForestClearances: customForestNoc,
        cadastralSurveyMismatches: customCadastralErrors,
        gramSabhaResolutionPassed: customGramSabha,
        interDeptCoordinationScore: customCoordination,
        latitude: 20.0,
        longitude: 75.0,
        stages: [
          { stage: 'STAGE_S4_PRELIMINARY', stageName: 'Sec 4(1) Notification', actSection: 'RFCTLARR', status: 'COMPLETED', plannedDays: 60, actualDaysSpent: 65, delayDays: 5, delayProbabilityPct: 15 },
          { stage: 'STAGE_S11_SIA', stageName: 'Sec 11 SIA Hearing', actSection: 'RFCTLARR', status: 'COMPLETED', plannedDays: 120, actualDaysSpent: 180, delayDays: 60, delayProbabilityPct: 65 },
          { stage: 'STAGE_S19_DECLARATION', stageName: 'Sec 19 Declaration', actSection: 'RFCTLARR', status: 'DELAYED', plannedDays: 90, actualDaysSpent: 160, delayDays: 70, delayProbabilityPct: customPred.delayProbabilityPct },
          { stage: 'STAGE_S23_AWARD', stageName: 'Sec 23 Award', actSection: 'RFCTLARR', status: 'PENDING', plannedDays: 90, actualDaysSpent: 0, delayDays: 0, delayProbabilityPct: 75 },
          { stage: 'STAGE_COMPENSATION_DISBURSAL', stageName: 'Disbursement', actSection: 'PFMS', status: 'IN_PROGRESS', plannedDays: 60, actualDaysSpent: 20, delayDays: 0, delayProbabilityPct: 70 },
          { stage: 'STAGE_S38_POSSESSION', stageName: 'Sec 38 Possession', actSection: 'RFCTLARR', status: 'PENDING', plannedDays: 60, actualDaysSpent: 0, delayDays: 0, delayProbabilityPct: 80 },
          { stage: 'STAGE_RR_REHABILITATION', stageName: 'R&R Execution', actSection: 'RFCTLARR', status: 'PENDING', plannedDays: 120, actualDaysSpent: 0, delayDays: 0, delayProbabilityPct: 75 }
        ],
        shapFeatures: customPred.shapFeatures,
        delayDrivers: customPred.delayDrivers,
        prescriptiveActions: customPred.prescriptiveActions,
        lastUpdated: new Date().toISOString()
      };
    }
  }, [
    evaluationMode, 
    selectedProject, 
    customName, 
    customLandArea, 
    customFamilies, 
    customDisbursedPct, 
    customLitigation, 
    customForestNoc, 
    customCadastralErrors, 
    customTribalPct, 
    customGramSabha, 
    customCoordination, 
    customStage
  ]);

  // Run What-If Simulation
  const whatIfResult = useMemo(() => {
    const isParamChanged = 
      whatIfParams.compensationDisbursementBoostPct > 0 ||
      whatIfParams.litigationResolutionCount > 0 ||
      whatIfParams.forestClearanceFastTracked ||
      whatIfParams.directPurchaseNegotiationPct > 0 ||
      whatIfParams.additionalManpowerAllocated;

    if (!isParamChanged) {
      return null;
    }

    return simulateWhatIfScenario(activeProjectData, whatIfParams);
  }, [activeProjectData, whatIfParams]);

  // Active displayed values
  const currentRiskScore = whatIfResult ? whatIfResult.improvedRiskScore : activeProjectData.riskScore;
  const currentDelayMonths = whatIfResult ? whatIfResult.improvedDelayMonths : activeProjectData.predictedDelayMonths;
  const currentRiskCategory = whatIfResult ? whatIfResult.riskCategory : activeProjectData.riskCategory;
  const currentShapFeatures = whatIfResult ? whatIfResult.updatedShapFeatures : activeProjectData.shapFeatures;

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-header-title">
          <h2>AI Prediction & Explainable AI (XAI) Studio</h2>
          <p>Multi-stage delay probability forecasting, SHAP feature attributions, and interactive What-If scenario simulations.</p>
        </div>

        {/* Mode Selector */}
        <div className="view-header-actions">
          <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)' }}>
            <button
              onClick={() => {
                setEvaluationMode('EXISTING_PROJECT');
                setWhatIfParams(initialWhatIf);
              }}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: evaluationMode === 'EXISTING_PROJECT' ? 'var(--primary-600)' : 'transparent',
                color: evaluationMode === 'EXISTING_PROJECT' ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              Analyze Active Project
            </button>
            <button
              onClick={() => {
                setEvaluationMode('CUSTOM_EVALUATOR');
                setWhatIfParams(initialWhatIf);
              }}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                background: evaluationMode === 'CUSTOM_EVALUATOR' ? 'var(--primary-600)' : 'transparent',
                color: evaluationMode === 'CUSTOM_EVALUATOR' ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              + New Project Delay Estimator
            </button>
          </div>
        </div>
      </div>

      {/* Project Selector Bar (if in EXISTING_PROJECT mode) */}
      {evaluationMode === 'EXISTING_PROJECT' ? (
        <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>SELECT TARGET PROJECT:</div>
            <select 
              value={selectedProject.id}
              onChange={(e) => {
                const found = projects.find(p => p.id === e.target.value);
                if (found) {
                  onSelectProject(found);
                  setWhatIfParams(initialWhatIf);
                }
              }}
              style={{ minWidth: '380px', fontWeight: 600, background: 'var(--bg-surface-elevated)' }}
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  [{p.code}] {p.name} ({p.state} - {p.riskCategory})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <span>Stage: <strong style={{ color: 'var(--text-primary)' }}>{activeProjectData.currentStage}</strong></span>
            <span>•</span>
            <span>Agency: <strong style={{ color: 'var(--text-primary)' }}>{activeProjectData.agency}</strong></span>
          </div>
        </div>
      ) : (
        /* Custom Evaluator Parameter Form */
        <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={16} style={{ color: 'var(--primary-400)' }} />
              Configure Acquisition Project Parameters for Early ML Delay Inference
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--primary-400)', fontWeight: 600 }}>Real-time Feature Vector Mapping</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Project Name</label>
              <input type="text" value={customName} onChange={(e) => setCustomName(e.target.value)} style={{ width: '100%' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Total Land Area (Ha)</label>
              <input type="number" value={customLandArea} onChange={(e) => setCustomLandArea(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Affected Families</label>
              <input type="number" value={customFamilies} onChange={(e) => setCustomFamilies(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Compensation Disbursed (%)</label>
              <input type="number" min="0" max="100" value={customDisbursedPct} onChange={(e) => setCustomDisbursedPct(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Pending High Court / Tribunal Writs</label>
              <input type="number" value={customLitigation} onChange={(e) => setCustomLitigation(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Cadastral Survey Mismatches</label>
              <input type="number" value={customCadastralErrors} onChange={(e) => setCustomCadastralErrors(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Tribal / PESA Scheduled Land (%)</label>
              <input type="number" min="0" max="100" value={customTribalPct} onChange={(e) => setCustomTribalPct(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Stage-II Forest Clearance Pending</label>
              <select value={customForestNoc ? 'YES' : 'NO'} onChange={(e) => setCustomForestNoc(e.target.value === 'YES')} style={{ width: '100%' }}>
                <option value="YES">Yes (Pending NOC)</option>
                <option value="NO">No (Cleared / None)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Main Top Diagnostics Grid: Risk Gauge & Predictions vs What-If Simulator */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '20px', marginBottom: '24px' }}>
        
        {/* Left: AI Risk Score Meter Card */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Ensemble AI Delay Risk Score
            </div>
            <div style={{ margin: '18px 0', position: 'relative' }}>
              <div 
                className="risk-score-big" 
                style={{ 
                  color: currentRiskScore >= 80 ? '#ff6b6b' : currentRiskScore >= 60 ? '#f97316' : currentRiskScore >= 35 ? '#f59e0b' : '#10b981',
                  textShadow: currentRiskScore >= 80 ? '0 0 24px rgba(239, 68, 68, 0.4)' : 'none'
                }}
              >
                {currentRiskScore}
                <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: 500 }}>/100</span>
              </div>
              <div style={{ marginTop: '8px' }}>
                <span className={`badge-risk ${currentRiskCategory}`}>
                  {currentRiskCategory} RISK LEVEL
                </span>
              </div>
            </div>
          </div>

          {/* Overrun Forecast Card */}
          <div style={{ width: '100%', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '14px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Projected Delay Overrun:</span>
              <span style={{ fontWeight: 800, color: currentDelayMonths > 6 ? '#ff6b6b' : 'var(--text-primary)', fontSize: '1.05rem' }}>
                +{currentDelayMonths} Months
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.8rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Delay Probability:</span>
              <span style={{ fontWeight: 700, color: 'var(--primary-400)', fontFamily: 'var(--font-mono)' }}>
                {activeProjectData.delayProbabilityPct}%
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>Target: {activeProjectData.plannedCompletionDate}</span>
              <span>•</span>
              <span style={{ color: '#ff6b6b' }}>AI Est: {activeProjectData.predictedCompletionDate}</span>
            </div>
          </div>

          {/* Prescriptive Trigger Button */}
          <button
            onClick={() => onNavigateToPrescriptive(activeProjectData)}
            className="btn-primary"
            style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
          >
            <Sparkles size={16} />
            <span>Generate Prescriptive Mitigation Playbook</span>
          </button>
        </div>

        {/* Right: What-If Scenario Simulator */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={18} style={{ color: 'var(--accent-purple)' }} />
                Interactive "What-If" Mitigation Scenario Simulator
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Adjust policy and administrative interventions to simulate instant risk reduction, time saved, and cost avoidance.
              </p>
            </div>

            {whatIfResult && (
              <button
                onClick={() => setWhatIfParams(initialWhatIf)}
                className="btn-secondary"
                style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                title="Reset simulation parameters"
              >
                <RotateCcw size={13} /> Reset
              </button>
            )}
          </div>

          {/* Sliders Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 24px', marginBottom: '20px' }}>
            {/* Slider 1: Compensation Disbursal Acceleration */}
            <div className="scenario-slider-group">
              <div className="scenario-slider-header">
                <span>Accelerate Compensation Disbursement Speed</span>
                <span style={{ color: 'var(--primary-400)', fontFamily: 'var(--font-mono)' }}>
                  +{whatIfParams.compensationDisbursementBoostPct}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="5"
                value={whatIfParams.compensationDisbursementBoostPct}
                onChange={(e) => setWhatIfParams({ ...whatIfParams, compensationDisbursementBoostPct: Number(e.target.value) })}
                className="scenario-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                <span>Current: {activeProjectData.disbursementPercentage.toFixed(0)}%</span>
                <span>Simulated: {Math.min(100, activeProjectData.disbursementPercentage + whatIfParams.compensationDisbursementBoostPct).toFixed(0)}%</span>
              </div>
            </div>

            {/* Slider 2: Lok Adalat Litigation Settlement */}
            <div className="scenario-slider-group">
              <div className="scenario-slider-header">
                <span>Special Lok Adalat Writs Settlement</span>
                <span style={{ color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                  -{whatIfParams.litigationResolutionCount} Cases
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={Math.max(10, activeProjectData.pendingLitigationCases)}
                step="1"
                value={whatIfParams.litigationResolutionCount}
                onChange={(e) => setWhatIfParams({ ...whatIfParams, litigationResolutionCount: Number(e.target.value) })}
                className="scenario-slider"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                <span>Active: {activeProjectData.pendingLitigationCases} cases</span>
                <span>Remaining: {Math.max(0, activeProjectData.pendingLitigationCases - whatIfParams.litigationResolutionCount)} cases</span>
              </div>
            </div>

            {/* Slider 3: Direct Purchase Ordinance Multiplier */}
            <div className="scenario-slider-group">
              <div className="scenario-slider-header">
                <span>Direct Purchase / Voluntary Consent Model</span>
                <span style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>
                  {whatIfParams.directPurchaseNegotiationPct}% of land
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={whatIfParams.directPurchaseNegotiationPct}
                onChange={(e) => setWhatIfParams({ ...whatIfParams, directPurchaseNegotiationPct: Number(e.target.value) })}
                className="scenario-slider"
              />
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                Bypasses protracted tribunal appeal and Section 19 declaration loops.
              </div>
            </div>

            {/* Toggles: Forest Clearance & Survey Squads */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={whatIfParams.forestClearanceFastTracked}
                  onChange={(e) => setWhatIfParams({ ...whatIfParams, forestClearanceFastTracked: e.target.checked })}
                  style={{ accentColor: 'var(--primary-400)', width: '16px', height: '16px' }}
                />
                <span>Single-Window MoEFCC Forest Diversion NOC Fast-Tracked</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={whatIfParams.additionalManpowerAllocated}
                  onChange={(e) => setWhatIfParams({ ...whatIfParams, additionalManpowerAllocated: e.target.checked })}
                  style={{ accentColor: 'var(--primary-400)', width: '16px', height: '16px' }}
                />
                <span>Deploy RTK Drone Survey Squads for Cadastral Rectification</span>
              </label>
            </div>
          </div>

          {/* Simulation Outcome Banner */}
          {whatIfResult ? (
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(14, 165, 233, 0.12) 100%)', 
              border: '1px solid rgba(16, 185, 129, 0.4)', 
              borderRadius: 'var(--radius-md)', 
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-emerald)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={14} /> Simulated Policy Intervention Impact
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                  Risk score drops by <strong style={{ color: 'var(--accent-emerald)' }}>{activeProjectData.riskScore - whatIfResult.improvedRiskScore} points</strong> ({activeProjectData.riskScore} ➔ {whatIfResult.improvedRiskScore}).
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TIME SAVED</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                    -{whatIfResult.delayMonthsSaved} Months
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PUBLIC ESCALATION SAVINGS</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-gold)' }}>
                    ₹{whatIfResult.costSavingsCr} Cr
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ 
              background: 'var(--bg-surface)', 
              border: '1px dashed var(--border-medium)', 
              borderRadius: 'var(--radius-md)', 
              padding: '12px 16px',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Info size={16} style={{ color: 'var(--primary-400)' }} />
              Move any slider above to simulate how proactive administrative interventions alter the ML delay probability curve.
            </div>
          )}
        </div>
      </div>

      {/* Explainable AI (XAI) SHAP Feature Attribution Waterfall */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BrainCircuit size={18} style={{ color: 'var(--primary-400)' }} />
              Explainable AI (XAI): SHAP Feature Importance Waterfall Decomposition
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Transparent mathematical breakdown of which specific parameters pushed the risk score higher (+) or reduced the delay probability (-).
            </p>
          </div>
          <span style={{ fontSize: '0.72rem', padding: '4px 10px', borderRadius: 'var(--radius-full)', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', color: 'var(--text-muted)' }}>
            TreeExplainer SHAP Values
          </span>
        </div>

        {/* SHAP Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {currentShapFeatures.map((feat, idx) => {
            const isPositive = feat.shapValue > 0;
            const absVal = Math.abs(feat.shapValue);
            const fillWidth = Math.min(100, Math.round(absVal * 250));

            return (
              <div key={idx} className="shap-bar-row">
                {/* Feature Meta */}
                <div className="shap-feature-meta">
                  <div className="shap-feature-name" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{feat.featureName}</span>
                  </div>
                  <div className="shap-feature-sub">
                    Val: <strong>{feat.featureValue}</strong> (Base: {feat.baselineAverage})
                  </div>
                </div>

                {/* Visual Bar Track */}
                <div className="shap-track">
                  {isPositive ? (
                    <div 
                      className="shap-fill-positive" 
                      style={{ 
                        width: `${fillWidth}%`,
                        marginLeft: '50%'
                      }} 
                    />
                  ) : (
                    <div 
                      className="shap-fill-negative" 
                      style={{ 
                        width: `${fillWidth}%`,
                        marginRight: '50%',
                        marginLeft: `${50 - fillWidth}%`
                      }} 
                    />
                  )}
                </div>

                {/* SHAP Score Value */}
                <div 
                  className="shap-val-badge" 
                  style={{ color: isPositive ? '#f87171' : '#34d399' }}
                >
                  {isPositive ? `+${feat.shapValue.toFixed(2)}` : `${feat.shapValue.toFixed(2)}`}
                </div>
              </div>
            );
          })}
        </div>

        {/* SHAP Explanatory Footnote */}
        <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#ef4444' }}></span>
              Red (+): Escalates Delay Risk
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#10b981' }}></span>
              Green (-): Mitigates Delay Risk
            </span>
          </div>
          <span>Based on 14,850 historical land acquisition records across India</span>
        </div>
      </div>

      {/* Delay Drivers Root Cause Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Identified Root-Cause Delay Drivers</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Actionable bottleneck diagnostic for district and state administrative interventions.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {activeProjectData.delayDrivers.map((dd) => (
            <div 
              key={dd.id}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderLeft: `4px solid ${dd.severity === 'CRITICAL' ? '#ef4444' : dd.severity === 'HIGH' ? '#f97316' : '#f59e0b'}`,
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>{dd.category} BOTTLENECK</span>
                <span className={`badge-risk ${dd.severity}`} style={{ padding: '2px 6px', fontSize: '0.65rem' }}>
                  {dd.severity} ({dd.weightContribution}% weight)
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{dd.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{dd.rootCause}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '6px', marginTop: '4px' }}>
                Lead Indicator: {dd.leadIndicator}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

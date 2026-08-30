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
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 380px) 1fr', gap: '20px', marginBottom: '24px' }}>
        
        {/* Left: AI Risk Score Circular Radial Gauge Card */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Ambient Glow */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            width: '200px',
            height: '200px',
            background: currentRiskScore >= 80 ? 'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%)' : currentRiskScore >= 60 ? 'radial-gradient(circle, rgba(249, 115, 22, 0.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ width: '100%' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
              Ensemble AI Delay Risk Score
            </div>

            {/* Circular Gauge SVG */}
            <div style={{ position: 'relative', width: '180px', height: '180px', margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: 'rotate(-90deg)' }}>
                {/* Background Ring */}
                <circle
                  cx="90"
                  cy="90"
                  r="72"
                  fill="transparent"
                  stroke="#1e293b"
                  strokeWidth="12"
                />
                {/* Progress Ring */}
                <circle
                  cx="90"
                  cy="90"
                  r="72"
                  fill="transparent"
                  stroke={currentRiskScore >= 80 ? '#ef4444' : currentRiskScore >= 60 ? '#f97316' : currentRiskScore >= 35 ? '#f59e0b' : '#10b981'}
                  strokeWidth="12"
                  strokeDasharray="452.4"
                  strokeDashoffset={452.4 - (452.4 * currentRiskScore) / 100}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.4s ease' }}
                />
              </svg>

              {/* Center Content */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  fontSize: '2.8rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-mono)',
                  lineHeight: 1,
                  color: currentRiskScore >= 80 ? '#ff6b6b' : currentRiskScore >= 60 ? '#f97316' : currentRiskScore >= 35 ? '#f59e0b' : '#10b981',
                  textShadow: currentRiskScore >= 80 ? '0 0 20px rgba(239, 68, 68, 0.5)' : 'none'
                }}>
                  {currentRiskScore}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px' }}>
                  / 100
                </div>
              </div>
            </div>

            {/* Risk Badge */}
            <div style={{ marginBottom: '16px' }}>
              <span className={`badge-risk ${currentRiskCategory}`} style={{ padding: '5px 14px', fontSize: '0.78rem', letterSpacing: '0.04em' }}>
                {currentRiskCategory} RISK LEVEL
              </span>
            </div>
          </div>

          {/* Overrun Forecast Card */}
          <div style={{ width: '100%', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '14px 16px', border: '1px solid var(--border-subtle)', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Projected Delay Overrun:</span>
              <span style={{ fontWeight: 800, color: currentDelayMonths > 6 ? '#ff6b6b' : 'var(--text-primary)', fontSize: '1.1rem', fontFamily: 'var(--font-mono)' }}>
                +{currentDelayMonths} Months
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '0.82rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Delay Probability:</span>
              <span style={{ fontWeight: 800, color: 'var(--primary-400)', fontFamily: 'var(--font-mono)' }}>
                {activeProjectData.delayProbabilityPct}%
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px' }}>
              <span>Target: <strong style={{ color: 'var(--text-secondary)' }}>{activeProjectData.plannedCompletionDate}</strong></span>
              <span style={{ color: '#ff6b6b', fontWeight: 600 }}>AI Est: {activeProjectData.predictedCompletionDate}</span>
            </div>
          </div>

          {/* Prescriptive Trigger Button */}
          <button
            onClick={() => onNavigateToPrescriptive(activeProjectData)}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px 18px', fontSize: '0.84rem' }}
          >
            <Sparkles size={16} />
            <span>Generate Prescriptive Playbook</span>
          </button>
        </div>

        {/* Right: What-If Scenario Simulator */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  <Sliders size={18} style={{ color: 'var(--accent-purple)' }} />
                  Interactive "What-If" Mitigation Scenario Simulator
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                  Adjust policy and administrative interventions to simulate instant risk reduction, time saved, and cost avoidance.
                </p>
              </div>

              {whatIfResult && (
                <button
                  onClick={() => setWhatIfParams(initialWhatIf)}
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                  title="Reset simulation parameters"
                >
                  <RotateCcw size={13} /> Reset
                </button>
              )}
            </div>

            {/* Sliders Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              
              {/* Slider 1: Compensation Disbursal Acceleration */}
              <div className="scenario-slider-group">
                <div className="scenario-slider-header">
                  <span>Accelerate Compensation Disbursement</span>
                  <span className="scenario-slider-chip" style={{ color: 'var(--primary-400)', background: 'rgba(14, 165, 233, 0.15)' }}>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <span>Current: <strong>{activeProjectData.disbursementPercentage.toFixed(0)}%</strong></span>
                  <span>Simulated: <strong style={{ color: 'var(--primary-400)' }}>{Math.min(100, activeProjectData.disbursementPercentage + whatIfParams.compensationDisbursementBoostPct).toFixed(0)}%</strong></span>
                </div>
              </div>

              {/* Slider 2: Lok Adalat Litigation Settlement */}
              <div className="scenario-slider-group">
                <div className="scenario-slider-header">
                  <span>Special Lok Adalat Writs Settlement</span>
                  <span className="scenario-slider-chip" style={{ color: 'var(--accent-emerald)', background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  <span>Active: <strong>{activeProjectData.pendingLitigationCases} cases</strong></span>
                  <span>Remaining: <strong style={{ color: 'var(--accent-emerald)' }}>{Math.max(0, activeProjectData.pendingLitigationCases - whatIfParams.litigationResolutionCount)} cases</strong></span>
                </div>
              </div>

              {/* Slider 3: Direct Purchase Ordinance Multiplier */}
              <div className="scenario-slider-group">
                <div className="scenario-slider-header">
                  <span>Direct Purchase / Voluntary Consent</span>
                  <span className="scenario-slider-chip" style={{ color: 'var(--accent-gold)', background: 'rgba(245, 158, 11, 0.15)', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
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
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Bypasses protracted tribunal appeal and Section 19 declaration loops.
                </div>
              </div>

              {/* Toggles: Forest Clearance & Survey Squads */}
              <div className="scenario-slider-group" style={{ justifyContent: 'center', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={whatIfParams.forestClearanceFastTracked}
                    onChange={(e) => setWhatIfParams({ ...whatIfParams, forestClearanceFastTracked: e.target.checked })}
                    style={{ accentColor: 'var(--primary-400)', width: '17px', height: '17px', cursor: 'pointer' }}
                  />
                  <span style={{ fontWeight: 600, color: whatIfParams.forestClearanceFastTracked ? 'var(--primary-400)' : 'var(--text-primary)' }}>
                    Single-Window MoEFCC Forest NOC Fast-Tracked
                  </span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={whatIfParams.additionalManpowerAllocated}
                    onChange={(e) => setWhatIfParams({ ...whatIfParams, additionalManpowerAllocated: e.target.checked })}
                    style={{ accentColor: 'var(--primary-400)', width: '17px', height: '17px', cursor: 'pointer' }}
                  />
                  <span style={{ fontWeight: 600, color: whatIfParams.additionalManpowerAllocated ? 'var(--primary-400)' : 'var(--text-primary)' }}>
                    Deploy RTK Drone Survey Squads for Cadastral Fix
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Simulation Outcome Banner */}
          {whatIfResult ? (
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(14, 165, 233, 0.15) 100%)', 
              border: '1px solid rgba(16, 185, 129, 0.4)', 
              borderRadius: 'var(--radius-md)', 
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-emerald)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <CheckCircle2 size={16} /> Simulated Policy Intervention Impact
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                  Risk score drops by <strong style={{ color: 'var(--accent-emerald)', fontSize: '1rem' }}>{activeProjectData.riskScore - whatIfResult.improvedRiskScore} points</strong> ({activeProjectData.riskScore} ➔ {whatIfResult.improvedRiskScore}).
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>TIME SAVED</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                    -{whatIfResult.delayMonthsSaved} Months
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>COST ESCALATION AVOIDED</div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>
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
              padding: '14px 18px',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Info size={18} style={{ color: 'var(--primary-400)', flexShrink: 0 }} />
              <span>Move any slider above to simulate how proactive administrative interventions alter the ML delay probability curve.</span>
            </div>
          )}
        </div>
      </div>

      {/* Explainable AI (XAI) SHAP Feature Attribution Waterfall */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.18rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <BrainCircuit size={20} style={{ color: 'var(--primary-400)' }} />
              Explainable AI (XAI): SHAP Feature Importance Waterfall Decomposition
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Transparent mathematical breakdown of which specific parameters pushed the risk score higher (+) or reduced the delay probability (-).
            </p>
          </div>
          <span style={{ fontSize: '0.74rem', padding: '4px 12px', borderRadius: 'var(--radius-full)', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', color: 'var(--primary-400)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
            TreeExplainer SHAP Values
          </span>
        </div>

        {/* SHAP Chart Table Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 90px', gap: '16px', padding: '8px 14px', fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1px solid var(--border-subtle)', marginBottom: '8px' }}>
          <span>Feature & Current Value</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>← Mitigating Delay (-)</span>
            <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>0.0 Baseline</span>
            <span>Escalating Delay (+) →</span>
          </div>
          <span style={{ textAlign: 'right' }}>SHAP Value</span>
        </div>

        {/* SHAP Rows */}
        <div className="shap-container">
          {currentShapFeatures.map((feat, idx) => {
            const isPositive = feat.shapValue > 0;
            const absVal = Math.abs(feat.shapValue);
            const fillWidth = Math.min(50, Math.round(absVal * 160));

            return (
              <div key={idx} className="shap-bar-row">
                {/* Feature Meta */}
                <div className="shap-feature-meta">
                  <div className="shap-feature-name">
                    {feat.featureName}
                  </div>
                  <div className="shap-feature-sub">
                    Val: <strong style={{ color: 'var(--text-primary)' }}>{feat.featureValue}</strong> (Base: {feat.baselineAverage})
                  </div>
                </div>

                {/* Bi-directional Visual Bar Track with Center Baseline */}
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
                        marginLeft: `${50 - fillWidth}%`
                      }} 
                    />
                  )}
                </div>

                {/* SHAP Score Value Badge */}
                <div 
                  className="shap-val-badge" 
                  style={{ 
                    color: isPositive ? '#f87171' : '#34d399',
                    borderColor: isPositive ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)',
                    background: isPositive ? 'rgba(239, 68, 68, 0.12)' : 'rgba(16, 185, 129, 0.12)'
                  }}
                >
                  {isPositive ? `+${feat.shapValue.toFixed(2)}` : `${feat.shapValue.toFixed(2)}`}
                </div>
              </div>
            );
          })}
        </div>

        {/* SHAP Explanatory Footnote */}
        <div style={{ marginTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.76rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#ef4444' }}></span>
              <strong>Red (+)</strong>: Escalates Delay Probability
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#10b981' }}></span>
              <strong>Green (-)</strong>: Mitigates / Dampens Delay Risk
            </span>
          </div>
          <span>Trained on 14,850 historical land acquisition records across India</span>
        </div>
      </div>

      {/* Delay Drivers Root Cause Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div>
            <h3 style={{ fontSize: '1.18rem', fontWeight: 800, margin: 0 }}>Identified Root-Cause Delay Drivers</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
              Actionable bottleneck diagnostics for district collectors and state infrastructure authorities.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {activeProjectData.delayDrivers.map((dd) => (
            <div 
              key={dd.id}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderLeft: `4px solid ${dd.severity === 'CRITICAL' ? '#ef4444' : dd.severity === 'HIGH' ? '#f97316' : '#f59e0b'}`,
                borderRadius: 'var(--radius-md)',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{dd.category} BOTTLENECK</span>
                <span className={`badge-risk ${dd.severity}`} style={{ padding: '2px 8px', fontSize: '0.68rem' }}>
                  {dd.severity} ({dd.weightContribution}% weight)
                </span>
              </div>
              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>{dd.title}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{dd.rootCause}</div>
              <div style={{ fontSize: '0.74rem', color: 'var(--primary-400)', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', marginTop: '4px', fontWeight: 600 }}>
                Lead Indicator: {dd.leadIndicator}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

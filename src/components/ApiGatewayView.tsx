import React, { useState } from 'react';
import { 
  Network, 
  Code, 
  Play, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Copy, 
  Check, 
  Database, 
  Download,
  Terminal,
  Layers
} from 'lucide-react';
import { LandAcquisitionProject } from '../types';
import { sanitizeCsvCell, checkRateLimit } from '../services/securityService';

interface ApiGatewayViewProps {
  projects: LandAcquisitionProject[];
  onIngestProjects: (newProjects: LandAcquisitionProject[]) => void;
}

export const ApiGatewayView: React.FC<ApiGatewayViewProps> = ({
  projects,
  onIngestProjects
}) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<'PREDICT' | 'RISK_SCORES' | 'SHAP' | 'INGEST'>('PREDICT');
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoadingApi, setIsLoadingApi] = useState<boolean>(false);
  const [copiedCurl, setCopiedCurl] = useState<boolean>(false);

  // Bulk Ingest State
  const [uploadSuccessCount, setUploadSuccessCount] = useState<number | null>(null);

  const samplePredictBody = {
    projectCode: 'NHAI-NH48-EXP-PKG2',
    totalLandAreaHa: 420.5,
    affectedFamiliesCount: 1850,
    compensationDisbursementPercentage: 38.5,
    pendingLitigationCases: 19,
    pendingStage2ForestClearance: true,
    cadastralSurveyMismatches: 64,
    tribalPesaScheduledAreaPct: 8.5,
    gramSabhaConsentResolution: false,
    interDepartmentCoordinationScore: 4.8
  };

  const executeMockApi = () => {
    const rate = checkRateLimit('api_gateway_sandbox', 5, 2);
    if (!rate.allowed) {
      alert('API Rate Limit Exceeded (DDoS Protection). Please wait a moment before sending more requests.');
      return;
    }

    setIsLoadingApi(true);
    setApiResponse(null);

    setTimeout(() => {
      setIsLoadingApi(false);
      if (selectedEndpoint === 'PREDICT') {
        setApiResponse(JSON.stringify({
          status: 'SUCCESS',
          timestamp: new Date().toISOString(),
          modelVersion: 'v3.4.2-ensemble',
          prediction: {
            riskScore: 78,
            riskCategory: 'HIGH',
            delayProbabilityPct: 82.4,
            predictedDelayMonths: 11.2,
            stageRiskProbabilities: {
              section4Preliminary: 18.0,
              section11SIA: 74.0,
              section19Declaration: 86.5,
              section23Award: 72.0,
              compensationDisbursal: 80.2,
              section38Possession: 84.0,
              rehabilitationResettlement: 79.5
            },
            topDelayDrivers: [
              { driver: '19 High Court Stay Injunctions', weight: 0.34 },
              { driver: 'Disbursement Velocity Lag (38.5%)', weight: 0.26 },
              { driver: 'Pending Stage-II Forest NOC', weight: 0.18 }
            ]
          }
        }, null, 2));
      } else if (selectedEndpoint === 'RISK_SCORES') {
        setApiResponse(JSON.stringify({
          status: 'SUCCESS',
          totalProjects: projects.length,
          timestamp: new Date().toISOString(),
          projects: projects.map(p => ({
            code: p.code,
            name: p.name,
            state: p.state,
            riskScore: p.riskScore,
            riskCategory: p.riskCategory,
            predictedDelayMonths: p.predictedDelayMonths
          }))
        }, null, 2));
      } else if (selectedEndpoint === 'SHAP') {
        setApiResponse(JSON.stringify({
          status: 'SUCCESS',
          projectCode: 'NHAI-DME-PKG14',
          shapBaseExpectedValue: 0.25,
          shapDecomposition: [
            { feature: 'Pending High Court Stay Litigations', shapValue: +0.28, featureValue: '38 Active Writs' },
            { feature: 'Compensation Disbursement Velocity Lag', shapValue: +0.22, featureValue: '45.3%' },
            { feature: 'Tribal / PESA Scheduled Land Ratio', shapValue: +0.18, featureValue: '10%' },
            { feature: 'Inter-Agency Coordination Friction', shapValue: +0.08, featureValue: '4.2 / 10' }
          ]
        }, null, 2));
      } else {
        setApiResponse(JSON.stringify({
          status: 'INGESTED',
          source: 'BHOOMI_RASHI_REST_GATEWAY',
          recordsProcessed: 1,
          validationStatus: 'PASSED_SCHEMA_V2',
          message: 'Project metadata synchronized with PM GatiShakti National Master Plan registry.'
        }, null, 2));
      }
    }, 450);
  };

  const handleSimulateBulkUpload = () => {
    // Generate 3 realistic mock projects ingested via CSV
    const newBatch: LandAcquisitionProject[] = [
      {
        id: `ingest-01-${Date.now()}`,
        code: 'NHAI-CHENNAI-BENGALURU-EXP',
        name: 'Chennai-Bengaluru Expressway (Chittoor Package 2)',
        corridor: 'Chennai-Bengaluru Industrial Corridor',
        state: 'Andhra Pradesh',
        district: 'Chittoor',
        subDistricts: ['Palamaner', 'Bangarupalem'],
        agency: 'NHAI',
        projectType: 'Expressway & National Highway',
        totalLandAreaHa: 380.0,
        acquiredLandAreaHa: 260.0,
        landTypeDistribution: { privateAgriculturalPct: 70, privateCommercialPct: 15, governmentRevenuePct: 15, forestProtectedPct: 0, tribalPesaPct: 0 },
        totalAffectedFamilies: 2100,
        rehabilitatedFamilies: 1400,
        sanctionedBudgetCr: 3200.0,
        compensationBudgetCr: 1150.0,
        compensationDisbursedCr: 810.0,
        disbursementPercentage: 70.4,
        riskScore: 48,
        riskCategory: 'MEDIUM',
        delayProbabilityPct: 52.0,
        predictedDelayMonths: 4.8,
        baselineDurationMonths: 24,
        estimatedTotalMonths: 28.8,
        startDate: '2024-02-01',
        plannedCompletionDate: '2026-02-01',
        predictedCompletionDate: '2026-06-25',
        currentStage: 'STAGE_S23_AWARD',
        pendingLitigationCases: 7,
        pendingForestClearances: false,
        cadastralSurveyMismatches: 24,
        gramSabhaResolutionPassed: true,
        interDeptCoordinationScore: 7.2,
        latitude: 13.2172,
        longitude: 79.1003,
        stages: [
          { stage: 'STAGE_S4_PRELIMINARY', stageName: 'Sec 4(1)', actSection: 'NH Act', status: 'COMPLETED', plannedDays: 60, actualDaysSpent: 60, delayDays: 0, delayProbabilityPct: 10 },
          { stage: 'STAGE_S11_SIA', stageName: 'Sec 11 SIA', actSection: 'NH Act', status: 'COMPLETED', plannedDays: 120, actualDaysSpent: 120, delayDays: 0, delayProbabilityPct: 15 },
          { stage: 'STAGE_S19_DECLARATION', stageName: 'Sec 19 Declaration', actSection: 'NH Act', status: 'COMPLETED', plannedDays: 90, actualDaysSpent: 95, delayDays: 5, delayProbabilityPct: 20 },
          { stage: 'STAGE_S23_AWARD', stageName: 'Sec 23 Award', actSection: 'NH Act', status: 'IN_PROGRESS', plannedDays: 90, actualDaysSpent: 60, delayDays: 0, delayProbabilityPct: 50 },
          { stage: 'STAGE_COMPENSATION_DISBURSAL', stageName: 'Disbursal', actSection: 'PFMS', status: 'IN_PROGRESS', plannedDays: 60, actualDaysSpent: 40, delayDays: 0, delayProbabilityPct: 45 },
          { stage: 'STAGE_S38_POSSESSION', stageName: 'Sec 38 Possession', actSection: 'NH Act', status: 'PENDING', plannedDays: 60, actualDaysSpent: 0, delayDays: 0, delayProbabilityPct: 55 },
          { stage: 'STAGE_RR_REHABILITATION', stageName: 'R&R', actSection: 'RFCTLARR', status: 'PENDING', plannedDays: 90, actualDaysSpent: 0, delayDays: 0, delayProbabilityPct: 40 }
        ],
        shapFeatures: [],
        delayDrivers: [],
        prescriptiveActions: [],
        lastUpdated: new Date().toISOString()
      }
    ];

    onIngestProjects(newBatch);
    setUploadSuccessCount(newBatch.length);
  };

  const copyCurlCmd = () => {
    navigator.clipboard.writeText(`curl -X POST "https://api.dharanidrishti.gov.in/v1/predict/delay" \\
  -H "Authorization: Bearer <YOUR_API_KEY_HERE>" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(samplePredictBody)}'`);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-header-title">
          <h2>Government Systems API Gateway & Ingestion Hub</h2>
          <p>Interoperable REST APIs and bulk dataset ingestion for Bhoomi Rashi, PM GatiShakti NMP, PMIS, and State Land Records.</p>
        </div>

        <div className="view-header-actions">
          <button 
            onClick={copyCurlCmd}
            className="btn-secondary"
          >
            {copiedCurl ? <Check size={14} style={{ color: 'var(--accent-emerald)' }} /> : <Copy size={14} />}
            <span>{copiedCurl ? 'cURL Copied!' : 'Copy cURL Example'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: API Explorer vs Bulk Ingest Dropzone */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        
        {/* Left: Interactive REST API Sandbox */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={17} style={{ color: 'var(--primary-400)' }} />
              Interactive REST API Explorer (OpenAPI v3.0)
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Bearer Auth Enabled</span>
          </div>

          {/* Endpoint Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setSelectedEndpoint('PREDICT'); setApiResponse(null); }}
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: selectedEndpoint === 'PREDICT' ? 'var(--primary-600)' : 'var(--bg-surface)',
                color: selectedEndpoint === 'PREDICT' ? '#ffffff' : 'var(--text-secondary)',
                border: '1px solid var(--border-medium)'
              }}
            >
              POST /predict/delay
            </button>

            <button
              onClick={() => { setSelectedEndpoint('RISK_SCORES'); setApiResponse(null); }}
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: selectedEndpoint === 'RISK_SCORES' ? 'var(--primary-600)' : 'var(--bg-surface)',
                color: selectedEndpoint === 'RISK_SCORES' ? '#ffffff' : 'var(--text-secondary)',
                border: '1px solid var(--border-medium)'
              }}
            >
              GET /projects/risk-scores
            </button>

            <button
              onClick={() => { setSelectedEndpoint('SHAP'); setApiResponse(null); }}
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: selectedEndpoint === 'SHAP' ? 'var(--primary-600)' : 'var(--bg-surface)',
                color: selectedEndpoint === 'SHAP' ? '#ffffff' : 'var(--text-secondary)',
                border: '1px solid var(--border-medium)'
              }}
            >
              GET /xai/shap-explanation
            </button>
          </div>

          {/* Request Payload Preview */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
              Request Payload (JSON)
            </div>
            <pre style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '12px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-primary)',
              maxHeight: '150px',
              overflowY: 'auto'
            }}>
              {JSON.stringify(samplePredictBody, null, 2)}
            </pre>
          </div>

          {/* Test Execute Button */}
          <button
            onClick={executeMockApi}
            disabled={isLoadingApi}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginBottom: '16px' }}
          >
            <Play size={14} />
            <span>{isLoadingApi ? 'Processing Inference...' : 'Send Live Request'}</span>
          </button>

          {/* Response Payload */}
          {apiResponse && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '4px' }}>
                <span>HTTP 200 OK (Response)</span>
                <span>Latency: 42ms</span>
              </div>
              <pre style={{
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                color: '#38bdf8',
                maxHeight: '180px',
                overflowY: 'auto'
              }}>
                {apiResponse}
              </pre>
            </div>
          )}
        </div>

        {/* Right: Bulk Dataset Ingestion Dropzone */}
        <div className="glass-panel" style={{ padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UploadCloud size={18} style={{ color: 'var(--accent-emerald)' }} />
                Bulk Milestone Dataset Ingestion (CSV / JSON)
              </h3>
              <button
                onClick={() => {
                  const csv = `projectCode,projectName,state,district,agency,landAreaHa,affectedFamilies,disbursedPct,litigationCount\nNHAI-EXP-01,Bengaluru-Kadapa Expressway,Andhra Pradesh,Kadapa,NHAI,320,1800,65,12\n`;
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'Land_Acquisition_Template.csv';
                  a.click();
                }}
                style={{ fontSize: '0.75rem', color: 'var(--primary-400)', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Download size={13} /> Sample CSV
              </button>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Upload bulk acquisition case files from State Revenue departments or District Collectorates to auto-parse, validate geometries, and run batch delay predictions.
            </p>

            {/* Dropzone Box */}
            <div 
              style={{
                border: '2px dashed var(--border-highlight)',
                borderRadius: 'var(--radius-lg)',
                padding: '36px 20px',
                textAlign: 'center',
                background: 'rgba(14, 165, 233, 0.04)',
                cursor: 'pointer',
                marginBottom: '16px'
              }}
              onClick={handleSimulateBulkUpload}
            >
              <UploadCloud size={38} style={{ color: 'var(--primary-400)', margin: '0 auto 10px auto' }} />
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Drag & Drop Project Dataset CSV or Click to Upload</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Supports UTF-8 CSV, GeoJSON Corridor Polylines, and Excel (.xlsx) formats up to 50MB
              </div>
            </div>

            {/* Ingestion Confirmation */}
            {uploadSuccessCount !== null && (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 'var(--radius-md)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)' }} />
                <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  Successfully ingested <strong>{uploadSuccessCount} new infrastructure project(s)</strong> with automatic ML risk classification!
                </div>
              </div>
            )}
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
            Fully compatible with National Informatics Centre (NIC) Bhoomi Rashi v2 and PM GatiShakti 52-layer GIS standard.
          </div>
        </div>
      </div>
    </div>
  );
};

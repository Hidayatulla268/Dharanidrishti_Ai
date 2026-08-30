import React from 'react';
import { 
  Printer, 
  X, 
  Building, 
  AlertTriangle, 
  Clock, 
  Coins, 
  ShieldAlert, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { LandAcquisitionProject, ModelMetrics } from '../types';

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: LandAcquisitionProject[];
  modelMetrics: ModelMetrics;
}

export const ReportGeneratorModal: React.FC<ReportGeneratorModalProps> = ({
  isOpen,
  onClose,
  projects,
  modelMetrics
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const criticalProjects = projects.filter(p => p.riskCategory === 'CRITICAL' || p.riskCategory === 'HIGH');
  const totalSanctionedCr = projects.reduce((a, b) => a + b.sanctionedBudgetCr, 0);
  const totalDisbursedCr = projects.reduce((a, b) => a + b.compensationDisbursedCr, 0);
  const totalLandHa = projects.reduce((a, b) => a + b.totalLandAreaHa, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-card" 
        style={{ maxWidth: '900px', background: '#ffffff', color: '#090d16' }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Controls (Hidden in Print) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '20px' }}>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a' }}>
            Executive Briefing & Decision Support Report
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '6px',
                background: '#0284c7',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.82rem'
              }}
            >
              <Printer size={15} /> Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              style={{ padding: '6px', borderRadius: '50%', background: '#f1f5f9', color: '#64748b' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.5 }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0f172a', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                GOVERNMENT OF INDIA • PM GATISHAKTI NATIONAL MASTER PLAN
              </div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '4px 0' }}>
                Land Acquisition Delay Forecasting & Early Warning Report
              </h1>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                AI Predictive Analytics System (Problem Statement ID: 26017)
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: '#475569' }}>
              <div><strong>Generated Date:</strong> {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              <div><strong>Model Engine:</strong> {modelMetrics.version}</div>
              <div><strong>Confidence AUC:</strong> {(modelMetrics.rocAucScore * 100).toFixed(1)}%</div>
            </div>
          </div>

          {/* National Summary Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Monitored Corridors</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{projects.length} Mega Projects</div>
              <div style={{ fontSize: '0.75rem', color: '#475569' }}>{totalLandHa.toLocaleString()} Hectares</div>
            </div>
            <div style={{ background: '#fef2f2', padding: '12px', borderRadius: '6px', border: '1px solid #fecaca' }}>
              <div style={{ fontSize: '0.7rem', color: '#991b1b', textTransform: 'uppercase' }}>High/Critical Risk</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#dc2626' }}>{criticalProjects.length} Projects</div>
              <div style={{ fontSize: '0.75rem', color: '#991b1b' }}>Urgent Intervention Required</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Capital Monitored</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>₹{totalSanctionedCr.toLocaleString()} Cr</div>
              <div style={{ fontSize: '0.75rem', color: '#16a34a' }}>Disbursed: ₹{totalDisbursedCr.toLocaleString()} Cr</div>
            </div>
            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Average Delay Forecast</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#d97706' }}>
                +{(projects.reduce((a, b) => a + b.predictedDelayMonths, 0) / projects.length).toFixed(1)} Months
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569' }}>Above baseline schedule</div>
            </div>
          </div>

          {/* Critical Risk Corridors Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', marginBottom: '12px' }}>
              High & Critical Risk Infrastructure Projects Requiring Executive Intervention
            </h3>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px' }}>Project Code & Name</th>
                  <th style={{ padding: '8px' }}>State / District</th>
                  <th style={{ padding: '8px' }}>Current Stage</th>
                  <th style={{ padding: '8px' }}>Predicted Delay</th>
                  <th style={{ padding: '8px' }}>Risk Score</th>
                  <th style={{ padding: '8px' }}>Primary Delay Driver</th>
                </tr>
              </thead>
              <tbody>
                {criticalProjects.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '8px', fontWeight: 700 }}>
                      <div>{p.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{p.code} ({p.agency})</div>
                    </td>
                    <td style={{ padding: '8px' }}>{p.district}, {p.state}</td>
                    <td style={{ padding: '8px' }}>{p.currentStage}</td>
                    <td style={{ padding: '8px', fontWeight: 800, color: '#dc2626' }}>+{p.predictedDelayMonths} Months</td>
                    <td style={{ padding: '8px', fontWeight: 800 }}>
                      <span style={{ padding: '2px 6px', borderRadius: '4px', background: p.riskCategory === 'CRITICAL' ? '#fee2e2' : '#ffedd5', color: p.riskCategory === 'CRITICAL' ? '#b91c1c' : '#c2410c' }}>
                        {p.riskScore} ({p.riskCategory})
                      </span>
                    </td>
                    <td style={{ padding: '8px', color: '#475569', fontSize: '0.75rem' }}>
                      {p.delayDrivers[0]?.title || 'Multi-factor statutory bottleneck'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Prescriptive Strategic Recommendations */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '6px', marginBottom: '12px' }}>
              Strategic Prescriptive Mitigation Recommendations
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', borderLeft: '4px solid #0284c7' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>1. Special CALA Lok Adalat Bench for Section 19 Litigation Clusters</div>
                <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '2px' }}>
                  Authorize State Governments to notify 25% statutory consent incentive bonuses under RFCTLARR Section 23A to settle out-of-court writ petitions in Palghar, Pune, and Prakasam. Expected delay reduction: ~140 days.
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', borderLeft: '4px solid #16a34a' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>2. Drone LiDAR RTK Cadastral Re-Survey for Sharecropper & Ancestral Landholdings</div>
                <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '2px' }}>
                  Deploy Survey of India certified drone survey squads across West Bengal EDFC mouzas and Maharashtra sectors to auto-rectify 7/12 extract boundary mismatches. Expected delay reduction: ~110 days.
                </div>
              </div>

              <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '6px', borderLeft: '4px solid #d97706' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>3. PESA Scheduled Tribal Dialogue Accord & Elevated Renewable Array Designs</div>
                <div style={{ fontSize: '0.78rem', color: '#475569', marginTop: '2px' }}>
                  Modify DPRs for Leh-Ladakh Green Energy Corridor to ensure 300m wildlife and nomadic grazing passes and create dedicated Fodder Security Funds with Autonomous Hill Development Councils. Expected delay reduction: ~210 days.
                </div>
              </div>
            </div>
          </div>

          {/* Sign-off Footnote */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #cbd5e1', paddingTop: '12px', fontSize: '0.75rem', color: '#64748b' }}>
            <div>CONFIDENTIAL • FOR OFFICIAL USE ONLY BY INFRASTRUCTURE MINISTRIES & STATE CALA NODAL CELLS</div>
            <div>DharaniDrishti AI Automated Decision Support System</div>
          </div>
        </div>
      </div>
    </div>
  );
};

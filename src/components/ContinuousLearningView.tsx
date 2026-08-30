import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  FileSpreadsheet, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Database,
  ArrowUpRight
} from 'lucide-react';
import { ModelMetrics } from '../types';
import { simulateModelRetrain, RetrainingProgress } from '../services/modelTrainingService';

interface ContinuousLearningViewProps {
  modelMetrics: ModelMetrics;
  onModelRetrained: (updatedMetrics: ModelMetrics) => void;
}

export const ContinuousLearningView: React.FC<ContinuousLearningViewProps> = ({
  modelMetrics,
  onModelRetrained
}) => {
  const [isRetraining, setIsRetraining] = useState(false);
  const [retrainProgress, setRetrainProgress] = useState<RetrainingProgress | null>(null);
  const [batchSize, setBatchSize] = useState<number>(1450);
  const [selectedDataSource, setSelectedDataSource] = useState<string>('BHOOMI_RASHI_PMIS');

  const handleStartRetraining = async () => {
    setIsRetraining(true);
    setRetrainProgress(null);

    const updated = await simulateModelRetrain(modelMetrics, batchSize, (prog) => {
      setRetrainProgress(prog);
    });

    setIsRetraining(false);
    onModelRetrained(updated);
  };

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-header-title">
          <h2>Continuous Learning & MLOps Model Management Studio</h2>
          <p>Automated retraining pipelines, model drift monitoring, ROC-AUC calibration, and live ML registry updates.</p>
        </div>

        <div className="view-header-actions">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface)', padding: '6px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-emerald)', boxShadow: '0 0 8px var(--accent-emerald)' }} />
            <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Registry: Active Production ({modelMetrics.version})</span>
          </div>
        </div>
      </div>

      {/* Model Performance KPI Cards */}
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <div className="glass-panel kpi-card" style={{ '--kpi-accent': '#0ea5e9', '--kpi-bg': 'rgba(14, 165, 233, 0.12)' } as React.CSSProperties}>
          <div className="kpi-header">
            <span>ROC-AUC Model Accuracy</span>
            <div className="kpi-icon-wrap"><Activity size={18} /></div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{(modelMetrics.rocAucScore * 100).toFixed(1)}%</span>
            <span className="kpi-unit">AUC</span>
          </div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>+2.1% Gain</span>
            <span>vs baseline logistic benchmark</span>
          </div>
        </div>

        <div className="glass-panel kpi-card" style={{ '--kpi-accent': '#10b981', '--kpi-bg': 'rgba(16, 185, 129, 0.12)' } as React.CSSProperties}>
          <div className="kpi-header">
            <span>Delay Error (RMSE)</span>
            <div className="kpi-icon-wrap" style={{ color: '#10b981' }}><TrendingUp size={18} /></div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{modelMetrics.rmseMonths}</span>
            <span className="kpi-unit">Months (MAE: {modelMetrics.maeDays}d)</span>
          </div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--accent-emerald)' }}>High precision on milestone forecast</span>
          </div>
        </div>

        <div className="glass-panel kpi-card" style={{ '--kpi-accent': '#8b5cf6', '--kpi-bg': 'rgba(139, 92, 246, 0.12)' } as React.CSSProperties}>
          <div className="kpi-header">
            <span>F1-Score / Precision / Recall</span>
            <div className="kpi-icon-wrap" style={{ color: '#8b5cf6' }}><ShieldCheck size={18} /></div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{modelMetrics.f1Score}</span>
            <span className="kpi-unit">F1</span>
          </div>
          <div className="kpi-footer">
            <span>P: {modelMetrics.precision} • R: {modelMetrics.recall}</span>
          </div>
        </div>

        <div className="glass-panel kpi-card" style={{ '--kpi-accent': '#f59e0b', '--kpi-bg': 'rgba(245, 158, 11, 0.12)' } as React.CSSProperties}>
          <div className="kpi-header">
            <span>Training Corpus Size</span>
            <div className="kpi-icon-wrap" style={{ color: '#f59e0b' }}><Database size={18} /></div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{modelMetrics.totalTrainingSamples.toLocaleString()}</span>
            <span className="kpi-unit">Records</span>
          </div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>Drift Status: {modelMetrics.driftStatus}</span>
          </div>
        </div>
      </div>

      {/* Retraining Simulator Panel */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={20} style={{ color: 'var(--accent-gold)' }} />
              Live Continuous Learning & Retraining Simulator
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Feed freshly concluded land acquisition milestones from Bhoomi Rashi and PMIS into the ensemble pipeline to adapt to new state compensation precedents.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '16px', alignItems: 'flex-end', marginBottom: '20px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Select Interoperable Data Ingestion Stream
            </label>
            <select 
              value={selectedDataSource} 
              onChange={(e) => setSelectedDataSource(e.target.value)}
              disabled={isRetraining}
              style={{ width: '100%' }}
            >
              <option value="BHOOMI_RASHI_PMIS">MoRTH Bhoomi Rashi + NHAI PMIS Live Stream (1,450 records)</option>
              <option value="RAIL_GATISHAKTI">Ministry of Railways & DFCCIL Landmark Settlements (850 records)</option>
              <option value="STATE_REVENUE_PORTALS">e-Dharani / Bhulekh / e-Mahabhumi Cadastral Feeds (2,200 records)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Batch Sample Size for Cross-Validation
            </label>
            <input 
              type="number" 
              value={batchSize} 
              onChange={(e) => setBatchSize(Number(e.target.value))} 
              disabled={isRetraining}
              style={{ width: '100%' }} 
            />
          </div>

          <button
            onClick={handleStartRetraining}
            disabled={isRetraining}
            className="btn-primary"
            style={{ padding: '10px 24px', height: '40px' }}
          >
            {isRetraining ? (
              <>
                <RotateCcw size={16} className="animate-spin" />
                <span>Retraining in Progress...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Trigger Retraining Pipeline</span>
              </>
            )}
          </button>
        </div>

        {/* Retraining Progress Visualizer */}
        {isRetraining && retrainProgress && (
          <div style={{ background: 'var(--bg-surface-elevated)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-500)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-400)' }}>
                EPOCH {retrainProgress.epoch} of {retrainProgress.totalEpochs}: [{retrainProgress.phase}]
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Loss: {retrainProgress.currentLoss.toFixed(3)} | Val Loss: {retrainProgress.valLoss.toFixed(3)} | ROC-AUC: {(retrainProgress.currentRocAuc * 100).toFixed(1)}%
              </div>
            </div>

            <div style={{ height: '8px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginBottom: '10px' }}>
              <div style={{ 
                width: `${(retrainProgress.epoch / retrainProgress.totalEpochs) * 100}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, #0ea5e9, #10b981)',
                transition: 'width 0.4s ease'
              }} />
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
              {retrainProgress.statusMessage}
            </div>
          </div>
        )}
      </div>

      {/* Feature Importance & Confusion Matrix Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Feature Importance Evolution */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Ensemble Feature Importance Weights</h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Gini Gain Normalized</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {modelMetrics.featureImportances.map((f, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                  <span style={{ fontWeight: 600 }}>{f.feature}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary-400)', fontWeight: 700 }}>
                    {(f.weight * 100).toFixed(1)}%
                  </span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                  <div style={{ width: `${f.weight * 100 * 2.8}%`, height: '100%', background: 'var(--primary-500)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confusion Matrix & Classification Stats */}
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Holdout Confusion Matrix & Calibration</h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>N = {modelMetrics.totalTrainingSamples.toLocaleString()}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>True Positives (Delayed)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '4px' }}>
                {modelMetrics.confusionMatrix.truePositive.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Correctly flagged critical delays</div>
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>False Positives</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ff6b6b', marginTop: '4px' }}>
                {modelMetrics.confusionMatrix.falsePositive.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>False alarms (Over-prediction)</div>
            </div>

            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-md)', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>False Negatives</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ff6b6b', marginTop: '4px' }}>
                {modelMetrics.confusionMatrix.falseNegative.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Missed delays (Under-prediction)</div>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>True Negatives (On Schedule)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '4px' }}>
                {modelMetrics.confusionMatrix.trueNegative.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Correctly identified on-track cases</div>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
            Continuous learning pipeline recalibrates threshold cutoffs every 7 days to maintain balanced sensitivity across both dense agricultural parcels and high-speed corridors.
          </div>
        </div>
      </div>
    </div>
  );
};

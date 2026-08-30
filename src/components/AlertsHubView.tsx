import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Bell, 
  CheckCircle2, 
  Send, 
  Mail, 
  MessageSquare, 
  Radio, 
  Filter, 
  Clock, 
  ShieldAlert, 
  Sparkles,
  Check,
  UserCheck,
  Zap,
  Flame,
  PlusCircle,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import { AlertNotification, UserRole } from '../types';
import { PERSONA_CONFIGS } from '../data/personaConfig';

interface AlertsHubViewProps {
  alerts: AlertNotification[];
  currentRole: UserRole;
  onMarkAsRead: (alertId: string) => void;
  onMarkAllAsRead: () => void;
}

export const AlertsHubView: React.FC<AlertsHubViewProps> = ({
  alerts,
  currentRole,
  onMarkAsRead,
  onMarkAllAsRead
}) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [filterMyRoleOnly, setFilterMyRoleOnly] = useState<boolean>(false);
  const [dispatchStatus, setDispatchStatus] = useState<{ [id: string]: string }>({});
  const [showSimModal, setShowSimModal] = useState<boolean>(false);
  const [simProject, setSimProject] = useState<string>('Project ABC');
  const [simDays, setSimDays] = useState<number>(42);
  const [simReason, setSimReason] = useState<string>('unresolved compensation disputes');
  const [customAlerts, setCustomAlerts] = useState<AlertNotification[]>([]);

  const persona = PERSONA_CONFIGS[currentRole];

  const allAlerts = [...customAlerts, ...alerts];

  const filteredAlerts = allAlerts.filter(a => {
    const matchesSeverity = selectedSeverity === 'ALL' || a.severity === selectedSeverity;
    const matchesRole = !filterMyRoleOnly || a.targetRole === currentRole;
    return matchesSeverity && matchesRole;
  });

  const handleDispatch = (alert: AlertNotification, channel: 'SMS' | 'EMAIL' | 'GATISHAKTI') => {
    const channelNames = {
      SMS: `Dispatched urgent SMS to ${alert.district} Collector & SLAO (+91-98765-XXXXX)`,
      EMAIL: `Official notification email sent to ${alert.state} State CALA Nodal Cell`,
      GATISHAKTI: `High-priority escalation pushed to PM GatiShakti National Master Plan Portal`
    };

    setDispatchStatus(prev => ({
      ...prev,
      [alert.id]: channelNames[channel]
    }));

    setTimeout(() => {
      onMarkAsRead(alert.id);
    }, 1500);
  };

  const handleTriggerCustomAlert = () => {
    const newAlt: AlertNotification = {
      id: `sim-alt-${Date.now()}`,
      projectId: 'proj-001',
      projectName: `${simProject} (Bharatmala Priority Corridor Package 04)`,
      state: 'Maharashtra',
      district: 'Palghar & Thane',
      timestamp: new Date().toISOString(),
      severity: 'CRITICAL',
      triggerRule: `Rule #EWS-COMP-${simDays}: Compensation Escrow Disbursement Blocked > 40 Days`,
      message: `⚠️ High Risk Detected: ${simProject} may face a ${simDays}-day delay due to ${simReason}.`,
      prescribedRemedy: `Initiate expedited Special CALA Lok Adalat Bench with 25% consent incentive bonus to clear ${simDays}-day critical path delay.`,
      isRead: false,
      targetRole: 'DISTRICT_COLLECTOR',
      channel: 'GATISHAKTI_NMP'
    };

    setCustomAlerts(prev => [newAlt, ...prev]);
    setShowSimModal(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-header-title">
          <h2>🚨 Early Warning System & Real-Time Threat Sentinel</h2>
          <p>Autonomous AI risk detection, statutory deadline breach warnings, and proactive compensation bottleneck resolution.</p>
        </div>

        <div className="view-header-actions">
          <button 
            onClick={() => setShowSimModal(true)}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Zap size={14} />
            <span>Simulate Live Anomaly</span>
          </button>
          <button 
            onClick={onMarkAllAsRead}
            className="btn-secondary"
          >
            <Check size={15} />
            <span>Acknowledge All</span>
          </button>
        </div>
      </div>

      {/* 🚨 FEATURED EARLY WARNING SYSTEM HERO CARD (HIGHLIGHTED EXAMPLE) */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '22px 24px', 
          marginBottom: '24px', 
          background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(245, 158, 11, 0.08) 50%, rgba(15, 23, 42, 0.8) 100%)',
          border: '1px solid rgba(239, 68, 68, 0.45)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 12px 30px -5px rgba(239, 68, 68, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Top Tag & Pulsing Beacon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '4px 12px', 
              borderRadius: 'var(--radius-full)', 
              background: 'rgba(239, 68, 68, 0.25)', 
              border: '1px solid rgba(239, 68, 68, 0.6)', 
              color: '#ff6b6b', 
              fontSize: '0.75rem', 
              fontWeight: 900,
              letterSpacing: '0.04em'
            }}>
              <Flame size={14} style={{ color: '#ef4444' }} />
              🚨 EARLY WARNING SYSTEM ACTIVATED
            </span>
            <span style={{ 
              padding: '4px 10px', 
              borderRadius: 'var(--radius-full)', 
              background: 'rgba(245, 158, 11, 0.2)', 
              border: '1px solid rgba(245, 158, 11, 0.4)', 
              color: '#fbbf24', 
              fontSize: '0.72rem', 
              fontWeight: 800 
            }}>
              ⚠️ HIGH RISK DETECTED
            </span>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={13} /> Real-Time Telemetry Stream • AI Sentinel Confidence: <strong style={{ color: '#34d399' }}>94.6%</strong>
          </div>
        </div>

        {/* Core Warning Headline (Exact user-requested text) */}
        <div style={{ marginBottom: '14px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.35, margin: 0 }}>
            Project ABC may face a 42-day delay due to unresolved compensation disputes.
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
            Automated statutory lead indicators detected 14 pending compensation payout claims in Palghar & Thane tehsils exceeding the Section 23 Award disbursement SLA.
          </p>
        </div>

        {/* 3 Metric Diagnostics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Predicted Delay Overrun</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ff6b6b', fontFamily: 'var(--font-mono)' }}>+42 Days</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Critical Path Exposure</div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Root Cause Bottleneck</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fbbf24' }}>Compensation Escrow</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>₹48.5 Cr Disbursal Lag</div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.65)', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Affected Statutory Stage</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#38bdf8' }}>Sec 23 ➔ Sec 38</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Physical Land Handover</div>
          </div>
        </div>

        {/* Remedy & Instant Action Bar */}
        <div style={{ 
          background: 'rgba(16, 185, 129, 0.1)', 
          border: '1px solid rgba(16, 185, 129, 0.3)', 
          borderRadius: 'var(--radius-md)', 
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>
              ⚡ AI Prescribed Corrective Action:
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '2px' }}>
              Initiate expedited Special CALA Lok Adalat Bench with 25% consent incentive disbursement to clear 42-day delay.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => handleDispatch({
                id: 'alt-ews-abc',
                projectId: 'proj-001',
                projectName: 'Project ABC',
                state: 'Maharashtra',
                district: 'Palghar & Thane',
                timestamp: new Date().toISOString(),
                severity: 'CRITICAL',
                triggerRule: 'Rule #EWS-COMP-42',
                message: 'Project ABC 42-day delay alert',
                prescribedRemedy: 'Lok Adalat Special Bench',
                isRead: false,
                targetRole: 'DISTRICT_COLLECTOR',
                channel: 'GATISHAKTI_NMP'
              }, 'SMS')}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <MessageSquare size={13} style={{ color: '#fbbf24' }} />
              <span>SMS Collector</span>
            </button>
            <button
              onClick={() => handleDispatch({
                id: 'alt-ews-abc',
                projectId: 'proj-001',
                projectName: 'Project ABC',
                state: 'Maharashtra',
                district: 'Palghar & Thane',
                timestamp: new Date().toISOString(),
                severity: 'CRITICAL',
                triggerRule: 'Rule #EWS-COMP-42',
                message: 'Project ABC 42-day delay alert',
                prescribedRemedy: 'Lok Adalat Special Bench',
                isRead: false,
                targetRole: 'DISTRICT_COLLECTOR',
                channel: 'GATISHAKTI_NMP'
              }, 'GATISHAKTI')}
              className="btn-primary"
              style={{ padding: '6px 14px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Radio size={13} />
              <span>Escalate to PM GatiShakti</span>
            </button>
          </div>
        </div>
      </div>

      {/* Alerts Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredAlerts.map((alt) => {
          const isCritical = alt.severity === 'CRITICAL';
          const isHigh = alt.severity === 'HIGH';
          const isDispatched = !!dispatchStatus[alt.id];
          const isTargetedToMe = alt.targetRole === currentRole;

          return (
            <div 
              key={alt.id}
              className="glass-panel"
              style={{
                padding: '18px 22px',
                borderLeft: `4px solid ${isCritical ? '#ef4444' : isHigh ? '#f97316' : '#f59e0b'}`,
                background: isTargetedToMe ? 'rgba(14, 165, 233, 0.08)' : alt.isRead ? 'var(--bg-glass-card)' : 'rgba(239, 68, 68, 0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className={`badge-risk ${alt.severity}`} style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                      {alt.severity} ALERT
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {alt.triggerRule}
                    </span>
                    {isTargetedToMe && (
                      <span style={{ fontSize: '0.68rem', background: persona.badgeColor, color: '#ffffff', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                        ASSIGNED TO YOU
                      </span>
                    )}
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{alt.projectName}</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {alt.district}, {alt.state} • Escalation Target: <strong>{alt.targetRole}</strong>
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> {new Date(alt.timestamp).toLocaleTimeString()} IST
                </div>
              </div>

              {/* Message */}
              <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', marginBottom: '10px', lineHeight: 1.4 }}>
                {alt.message}
              </div>

              {/* Prescribed Remedy */}
              <div style={{ background: 'var(--bg-surface-elevated)', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '12px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', marginBottom: '2px' }}>
                  AI Prescribed Corrective Action:
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {alt.prescribedRemedy}
                </div>
              </div>

              {/* Dispatch Action Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', flexWrap: 'wrap', gap: '10px' }}>
                {isDispatched ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)', fontSize: '0.8rem', fontWeight: 600 }}>
                    <CheckCircle2 size={16} /> {dispatchStatus[alt.id]}
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Automated Dispatch:</span>
                    <button
                      onClick={() => handleDispatch(alt, 'SMS')}
                      className="btn-secondary"
                      style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                    >
                      <MessageSquare size={13} style={{ color: 'var(--accent-gold)' }} /> SMS Collector
                    </button>

                    <button
                      onClick={() => handleDispatch(alt, 'EMAIL')}
                      className="btn-secondary"
                      style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                    >
                      <Mail size={13} style={{ color: 'var(--primary-400)' }} /> Email State CALA
                    </button>

                    <button
                      onClick={() => handleDispatch(alt, 'GATISHAKTI')}
                      className="btn-primary"
                      style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                    >
                      <Radio size={13} /> Push to PM GatiShakti
                    </button>
                  </div>
                )}

                {!alt.isRead && !isDispatched && (
                  <button
                    onClick={() => onMarkAsRead(alt.id)}
                    style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'underline' }}
                  >
                    Mark as Acknowledged
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Anomaly Trigger / Simulation Modal */}
      {showSimModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(8, 12, 23, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            width: '100%',
            maxWidth: '500px',
            padding: '24px',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', background: 'rgba(239, 68, 68, 0.15)', color: '#ff6b6b' }}>
                  <Flame size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>Simulate Early Warning Trigger</h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>Inject synthetic risk anomalies to test telemetry propagation</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  TARGET CORRIDOR / PROJECT NAME
                </label>
                <input
                  type="text"
                  value={simProject}
                  onChange={(e) => setSimProject(e.target.value)}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#ffffff', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  PREDICTED DELAY DURATION (DAYS)
                </label>
                <input
                  type="number"
                  value={simDays}
                  onChange={(e) => setSimDays(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#ffffff', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  ROOT CAUSE BOTTLENECK DESCRIPTION
                </label>
                <input
                  type="text"
                  value={simReason}
                  onChange={(e) => setSimReason(e.target.value)}
                  placeholder="e.g. unresolved compensation disputes, tribunal stay"
                  style={{ width: '100%', padding: '10px 14px', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-md)', color: '#ffffff', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: 'var(--radius-md)', padding: '10px 14px', fontSize: '0.78rem', color: '#ff6b6b' }}>
                <strong>Preview:</strong> ⚠️ High Risk Detected: {simProject} may face a {simDays}-day delay due to {simReason}.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowSimModal(false)}
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.8rem' }}
              >
                Cancel
              </button>
              <button
                onClick={handleTriggerCustomAlert}
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.8rem', background: '#dc2626', borderColor: '#ef4444' }}
              >
                🚨 Trigger Live Sentinel Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

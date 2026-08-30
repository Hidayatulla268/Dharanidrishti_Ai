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
  UserCheck
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

  const persona = PERSONA_CONFIGS[currentRole];

  const filteredAlerts = alerts.filter(a => {
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

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-header-title">
          <h2>Early Warning Alerts & Automated Notification Hub</h2>
          <p>Rule-based anomaly detection, statutory deadline breach warnings, and automated stakeholder escalations.</p>
        </div>

        <div className="view-header-actions">
          <button 
            onClick={onMarkAllAsRead}
            className="btn-secondary"
          >
            <Check size={15} />
            <span>Acknowledge All Alerts</span>
          </button>
        </div>
      </div>

      {/* Persona Context Banner */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '14px 18px', 
          marginBottom: '20px', 
          borderLeft: `4px solid ${persona.badgeColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <UserCheck size={18} style={{ color: persona.badgeColor }} />
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800 }}>
              Active Notification Desk: {persona.title}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Target Escalation Channel: {currentRole === 'CENTRAL_MINISTRY' ? 'PM GatiShakti NMP Portal' : currentRole === 'DISTRICT_COLLECTOR' ? 'Collector SMS & SLAO Telegram' : 'NIC e-Mail'}
            </div>
          </div>
        </div>

        <button
          onClick={() => setFilterMyRoleOnly(!filterMyRoleOnly)}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            background: filterMyRoleOnly ? persona.badgeColor : 'var(--bg-surface)',
            color: filterMyRoleOnly ? '#ffffff' : persona.badgeColor,
            border: `1px solid ${persona.badgeColor}`,
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          {filterMyRoleOnly ? `✓ Showing Alerts for ${persona.shortTitle}` : `Filter Alerts for ${persona.shortTitle}`}
        </button>
      </div>

      {/* Filter & Telemetry Bar */}
      <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Severity Filter:</span>
          <select value={selectedSeverity} onChange={(e) => setSelectedSeverity(e.target.value)}>
            <option value="ALL">All Alerts ({alerts.length})</option>
            <option value="CRITICAL">Critical Severity</option>
            <option value="HIGH">High Severity</option>
            <option value="MEDIUM">Medium Severity</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.78rem' }}>
          <span style={{ color: '#ff6b6b', fontWeight: 700 }}>
            {alerts.filter(a => a.severity === 'CRITICAL').length} Critical Unresolved
          </span>
          <span>•</span>
          <span style={{ color: 'var(--text-secondary)' }}>
            Active Monitoring Rules: <strong>14 Anomaly Triggers</strong>
          </span>
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
    </div>
  );
};

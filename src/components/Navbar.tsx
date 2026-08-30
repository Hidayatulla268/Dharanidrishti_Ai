import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Bell, 
  Moon, 
  Sun, 
  FileSpreadsheet, 
  Clock, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { UserRole, AlertNotification } from '../types';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  alerts: AlertNotification[];
  onOpenAlerts: () => void;
  onOpenReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  theme,
  onThemeToggle,
  alerts,
  onOpenAlerts,
  onOpenReport
}) => {
  const unreadAlertsCount = alerts.filter(a => !a.isRead).length;
  const [roleMenuOpen, setRoleMenuOpen] = React.useState(false);
  const [timeStr, setTimeStr] = React.useState('');

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const roleLabels: Record<UserRole, { title: string; badge: string; color: string }> = {
    CENTRAL_MINISTRY: { title: 'Central Ministry / PM GatiShakti', badge: 'Apex Admin', color: '#0ea5e9' },
    STATE_CALA: { title: 'State Nodal Officer (CALA)', badge: 'State Nodal', color: '#8b5cf6' },
    DISTRICT_COLLECTOR: { title: 'District Collector / SLAO', badge: 'District Exec', color: '#10b981' },
    PROJECT_DIRECTOR: { title: 'NHAI / Rail Project Director', badge: 'Project Lead', color: '#f59e0b' },
    LEGAL_OFFICER: { title: 'Legal & Dispute Adjudicator', badge: 'Tribunal Cell', color: '#f43f5e' },
    CITIZEN_LANDOWNER: { title: 'Citizen & Landowner Portal', badge: 'Public Citizen', color: '#06b6d4' }
  };

  return (
    <header className="top-navbar">
      {/* Brand */}
      <div className="nav-brand">
        <div className="brand-emblem">
          <Building2 size={22} />
        </div>
        <div className="brand-text">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1>DharaniDrishti AI</h1>
            <span style={{ 
              fontSize: '0.68rem', 
              padding: '2px 7px', 
              borderRadius: '4px', 
              background: 'rgba(14, 165, 233, 0.2)', 
              color: '#38bdf8', 
              border: '1px solid rgba(14, 165, 233, 0.4)',
              fontWeight: 700 
            }}>
              PS-26017
            </span>
          </div>
          <p>National Land Acquisition Predictive Analytics & Decision Support System</p>
        </div>
      </div>

      {/* Center Clock / Telemetry */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6px', 
          background: 'var(--bg-surface)', 
          padding: '4px 12px', 
          borderRadius: 'var(--radius-full)', 
          border: '1px solid var(--border-subtle)',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)'
        }}>
          <Clock size={13} style={{ color: 'var(--primary-400)' }} />
          <span style={{ fontFamily: 'var(--font-mono)' }}>{timeStr} IST</span>
          <span style={{ color: 'var(--border-medium)' }}>|</span>
          <span style={{ color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-emerald)' }}></span>
            AI Inference Live
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="nav-actions">
        {/* Executive Report Generator */}
        <button 
          onClick={onOpenReport}
          className="btn-secondary" 
          style={{ padding: '6px 12px', fontSize: '0.8rem' }}
          title="Generate Printable Executive Brief"
        >
          <FileSpreadsheet size={15} style={{ color: 'var(--accent-gold)' }} />
          <span>Executive Brief</span>
        </button>

        {/* Alerts Bell */}
        <button 
          onClick={onOpenAlerts}
          style={{ 
            position: 'relative', 
            width: '36px', 
            height: '36px', 
            borderRadius: 'var(--radius-md)', 
            background: 'var(--bg-surface)', 
            border: '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)'
          }}
          title="Early Warning Alerts"
        >
          <Bell size={17} />
          {unreadAlertsCount > 0 && (
            <span style={{ 
              position: 'absolute', 
              top: '-4px', 
              right: '-4px', 
              background: 'var(--risk-critical)', 
              color: 'white', 
              borderRadius: '50%', 
              width: '18px', 
              height: '18px', 
              fontSize: '0.68rem', 
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 8px rgba(239, 68, 68, 0.8)'
            }}>
              {unreadAlertsCount}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={onThemeToggle}
          style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: 'var(--radius-md)', 
            background: 'var(--bg-surface)', 
            border: '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)'
          }}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={17} style={{ color: '#f59e0b' }} /> : <Moon size={17} style={{ color: '#38bdf8' }} />}
        </button>

        {/* Role Switcher */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="role-pill"
            style={{ 
              borderColor: roleLabels[currentRole].color,
              background: 'var(--bg-surface-elevated)',
              cursor: 'pointer'
            }}
          >
            <span className="role-badge-dot" style={{ backgroundColor: roleLabels[currentRole].color, boxShadow: `0 0 8px ${roleLabels[currentRole].color}` }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1 }}>ACTIVE PERSONA</div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{roleLabels[currentRole].badge}</div>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
          </button>

          {roleMenuOpen && (
            <div 
              className="glass-panel-elevated"
              style={{ 
                position: 'absolute', 
                right: 0, 
                top: '46px', 
                width: '260px', 
                padding: '8px', 
                zIndex: 2000,
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{ padding: '6px 8px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Switch Stakeholder View
              </div>
              {(Object.keys(roleLabels) as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    onRoleChange(r);
                    setRoleMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: currentRole === r ? 'rgba(14, 165, 233, 0.15)' : 'transparent',
                    color: currentRole === r ? 'var(--primary-400)' : 'var(--text-primary)',
                    fontSize: '0.82rem',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: roleLabels[r].color }} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{roleLabels[r].title}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Role Scope: {roleLabels[r].badge}</div>
                    </div>
                  </div>
                  {currentRole === r && <CheckCircle2 size={15} style={{ color: 'var(--primary-400)' }} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

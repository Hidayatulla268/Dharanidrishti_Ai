import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Bell, 
  Sun, 
  Moon, 
  FileText, 
  ChevronDown, 
  Check, 
  Layers,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { UserRole, AlertNotification } from '../types';
import { PERSONA_CONFIGS } from '../data/personaConfig';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  theme: 'dark' | 'light';
  onThemeToggle: () => void;
  alerts: AlertNotification[];
  onOpenAlerts: () => void;
  onOpenReport: () => void;
  onOpenSecurity?: () => void;
  onLockSession?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  theme,
  onThemeToggle,
  alerts,
  onOpenAlerts,
  onOpenReport,
  onOpenSecurity,
  onLockSession
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadAlertsCount = alerts.filter(a => !a.isRead).length || 3;
  const activePersona = PERSONA_CONFIGS[currentRole];

  return (
    <header className="app-navbar">
      {/* Center Left: Live Telemetry */}
      <div className="navbar-center-telemetry">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontWeight: 600 }}>
          <Clock size={14} style={{ color: 'var(--text-muted)' }} />
          <span>{timeStr || '01:09:35 PM'} IST</span>
        </div>
        <span style={{ color: 'var(--border-medium)' }}>|</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399', fontWeight: 600 }}>
          <span className="live-pulse-dot" />
          <span>AI Inference Live</span>
        </div>
        <span style={{ color: 'var(--border-medium)' }}>|</span>
        <div 
          onClick={onOpenSecurity}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '5px', 
            color: '#34d399', 
            fontWeight: 700, 
            fontSize: '0.75rem',
            background: 'rgba(16, 185, 129, 0.12)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            cursor: 'pointer'
          }}
          title="Zero-Trust Cyber Defense Active - View Security Center"
        >
          <ShieldCheck size={13} style={{ color: '#10b981' }} />
          <span>Zero-Trust Active</span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="navbar-right-actions">
        {/* Executive Brief Button */}
        <button
          onClick={onOpenReport}
          className="btn-executive-brief"
          title="Generate Printable Executive Briefing"
        >
          <FileText size={15} />
          <span>Executive Brief</span>
        </button>

        {/* Lock Session Button */}
        <button
          onClick={onLockSession}
          style={{
            padding: '7px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--accent-gold)',
            cursor: 'pointer'
          }}
          title="Lock Terminal Session"
        >
          <Lock size={15} />
        </button>

        {/* Alerts Bell */}
        <button
          onClick={onOpenAlerts}
          style={{
            position: 'relative',
            padding: '7px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            cursor: 'pointer'
          }}
          title="Notifications & Early Warnings"
        >
          <Bell size={16} />
          {unreadAlertsCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: '#ef4444',
              color: '#ffffff',
              fontSize: '0.65rem',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {unreadAlertsCount}
            </span>
          )}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onThemeToggle}
          style={{
            padding: '7px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
          title="Toggle Light/Dark Theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* User Role Profile Pill */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="avatar-profile-pill"
          >
            <div className="avatar-circle">
              {currentRole === 'CITIZEN_LANDOWNER' ? 'CZ' : currentRole === 'DISTRICT_COLLECTOR' ? 'DC' : currentRole === 'STATE_CALA' ? 'SC' : currentRole === 'PROJECT_DIRECTOR' ? 'PD' : currentRole === 'LEGAL_OFFICER' ? 'LG' : 'AA'}
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ffffff' }}>
                {currentRole === 'CENTRAL_MINISTRY' ? 'Apex Admin' : activePersona.shortTitle}
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                Active Persona
              </div>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)', marginLeft: '4px' }} />
          </button>

          {/* Role Dropdown Menu */}
          {roleMenuOpen && (
            <div 
              style={{
                position: 'absolute',
                right: 0,
                top: '42px',
                width: '280px',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                padding: '8px',
                zIndex: 100
              }}
            >
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', padding: '6px 10px', textTransform: 'uppercase' }}>
                Switch Stakeholder Persona
              </div>
              {(Object.keys(PERSONA_CONFIGS) as UserRole[]).map((r) => {
                const conf = PERSONA_CONFIGS[r];
                const isActive = currentRole === r;
                return (
                  <button
                    key={r}
                    onClick={() => {
                      onRoleChange(r);
                      setRoleMenuOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: conf.badgeColor }} />
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: isActive ? 700 : 500, color: isActive ? '#ffffff' : 'var(--text-secondary)' }}>
                          {conf.shortTitle}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                          {conf.designation}
                        </div>
                      </div>
                    </div>
                    {isActive && <Check size={14} style={{ color: '#c084fc' }} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

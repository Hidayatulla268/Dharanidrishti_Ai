import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  KeyRound, 
  AlertCircle, 
  User, 
  MapPin, 
  Clock 
} from 'lucide-react';
import { UserRole } from '../types';
import { PERSONA_CONFIGS } from '../data/personaConfig';

interface SessionLockModalProps {
  isLocked: boolean;
  onUnlock: () => void;
  currentRole: UserRole;
}

export const SessionLockModal: React.FC<SessionLockModalProps> = ({
  isLocked,
  onUnlock,
  currentRole
}) => {
  const [pin, setPin] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isUnlocking, setIsUnlocking] = useState<boolean>(false);
  const [failedAttempts, setFailedAttempts] = useState<number>(0);

  if (!isLocked) return null;

  const activePersona = PERSONA_CONFIGS[currentRole];

  const handleUnlock = () => {
    // Demo PIN: 1234 or any 4-digit PIN
    if (pin.length < 4) {
      setErrorMsg('Please enter a 4-digit security PIN (Demo: 1234).');
      return;
    }

    setIsUnlocking(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsUnlocking(false);
      if (pin === '1234' || pin.length === 4) {
        onUnlock();
        setPin('');
        setFailedAttempts(0);
      } else {
        const nextFailed = failedAttempts + 1;
        setFailedAttempts(nextFailed);
        if (nextFailed >= 3) {
          setErrorMsg('Multiple failed attempts! System will trigger a 30s security cooldown.');
        } else {
          setErrorMsg(`Incorrect PIN. (Attempts left: ${3 - nextFailed})`);
        }
      }
    }, 450);
  };

  const handleQuickUnlock = () => {
    setIsUnlocking(true);
    setTimeout(() => {
      setIsUnlocking(false);
      onUnlock();
      setPin('');
    }, 300);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(3, 7, 18, 0.94)',
        backdropFilter: 'blur(16px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '36px 30px',
          textAlign: 'center',
          border: '1px solid rgba(139, 92, 246, 0.35)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(139, 92, 246, 0.2)'
        }}
      >
        {/* Shield Glow Icon */}
        <div
          style={{
            width: '68px',
            height: '68px',
            margin: '0 auto 18px auto',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(59, 130, 246, 0.25))',
            border: '2px solid var(--primary-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#c084fc',
            boxShadow: '0 0 25px rgba(139, 92, 246, 0.4)'
          }}
        >
          <Lock size={32} />
        </div>

        <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary-400)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Zero-Trust Security Active
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginTop: '4px', marginBottom: '8px' }}>
          Session Locked
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '22px' }}>
          Terminal locked due to security inactivity timeout or manual lockdown. Re-authenticate to resume administrative decision support.
        </p>

        {/* Current Officer Profile Card */}
        <div
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px',
            marginBottom: '20px',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: activePersona.badgeColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.9rem',
              color: '#ffffff'
            }}
          >
            <User size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
              {activePersona.title}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {activePersona.designation}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', fontWeight: 600 }}>
              Gov VPN Active
            </span>
          </div>
        </div>

        {/* PIN Input */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ position: 'relative' }}>
            <KeyRound size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 4-Digit Security PIN (1234)"
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-highlight)',
                background: 'var(--bg-surface-elevated)',
                color: '#ffffff',
                fontSize: '1.2rem',
                textAlign: 'center',
                letterSpacing: '0.4em',
                fontFamily: 'var(--font-mono)'
              }}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
            />
          </div>
        </div>

        {errorMsg && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#ef4444', fontSize: '0.75rem', marginBottom: '16px' }}>
            <AlertCircle size={14} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={handleUnlock}
            disabled={isUnlocking}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.9rem' }}
          >
            <Unlock size={16} />
            <span>{isUnlocking ? 'Verifying Credentials...' : 'Unlock Terminal'}</span>
          </button>

          <button
            onClick={handleQuickUnlock}
            className="btn-secondary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '8px' }}
          >
            <ShieldCheck size={14} style={{ color: 'var(--accent-emerald)' }} />
            <span>Quick Biometric / SmartCard Pass (Demo)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

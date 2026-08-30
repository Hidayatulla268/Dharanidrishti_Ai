import React, { useState } from 'react';
import { 
  ShieldAlert, 
  KeyRound, 
  Fingerprint, 
  CheckCircle2, 
  X, 
  Lock, 
  AlertCircle,
  Smartphone
} from 'lucide-react';
import { UserRole } from '../types';

interface SecurityMfaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title: string;
  description: string;
  actionName: string;
  currentRole: UserRole;
}

export const SecurityMfaModal: React.FC<SecurityMfaModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  title,
  description,
  actionName,
  currentRole
}) => {
  const [authMethod, setAuthMethod] = useState<'OTP' | 'BIOMETRIC'>('OTP');
  const [otpValue, setOtpValue] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isBiometricScanning, setIsBiometricScanning] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleVerifyOtp = () => {
    if (otpValue.trim().length !== 6) {
      setErrorMsg('Please enter a valid 6-digit verification code.');
      return;
    }

    setIsVerifying(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsVerifying(false);
      // Accept demo OTP '123456' or any 6 digit
      if (otpValue === '123456' || otpValue.length === 6) {
        onSuccess();
        onClose();
        setOtpValue('');
      } else {
        setErrorMsg('Invalid authentication code. Please try again.');
      }
    }, 600);
  };

  const handleTriggerBiometric = () => {
    setIsBiometricScanning(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsBiometricScanning(false);
      onSuccess();
      onClose();
    }, 1100);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 10, 24, 0.82)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '28px',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(239, 68, 68, 0.15)',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div 
            style={{
              padding: '10px',
              borderRadius: '12px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444'
            }}
          >
            <ShieldAlert size={24} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Step-Up Security Challenge (MFA)
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
              {title}
            </h3>
          </div>
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px', lineHeight: 1.5 }}>
          {description}
        </p>

        {/* Action Detail Pill */}
        <div 
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            marginBottom: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Target Administrative Action</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{actionName}</div>
          </div>
          <span style={{ fontSize: '0.72rem', background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc', padding: '3px 8px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
            {currentRole}
          </span>
        </div>

        {/* Method Selector Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <button
            onClick={() => { setAuthMethod('OTP'); setErrorMsg(null); }}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              border: authMethod === 'OTP' ? '1px solid var(--primary-500)' : '1px solid var(--border-medium)',
              background: authMethod === 'OTP' ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-surface)',
              color: authMethod === 'OTP' ? '#60a5fa' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Smartphone size={15} />
            <span>Gov Authenticator / SMS OTP</span>
          </button>

          <button
            onClick={() => { setAuthMethod('BIOMETRIC'); setErrorMsg(null); }}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: 'var(--radius-md)',
              border: authMethod === 'BIOMETRIC' ? '1px solid var(--primary-500)' : '1px solid var(--border-medium)',
              background: authMethod === 'BIOMETRIC' ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-surface)',
              color: authMethod === 'BIOMETRIC' ? '#60a5fa' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <Fingerprint size={15} />
            <span>NIC e-Sign / Biometric</span>
          </button>
        </div>

        {/* Method 1: OTP Input */}
        {authMethod === 'OTP' && (
          <div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Enter 6-Digit TOTP Token (Demo: <code>123456</code>)
              </label>
              <div style={{ position: 'relative' }}>
                <KeyRound size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  maxLength={6}
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-highlight)',
                    background: 'var(--bg-surface-elevated)',
                    color: '#ffffff',
                    fontSize: '1.1rem',
                    letterSpacing: '0.25em',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700
                  }}
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleVerifyOtp()}
                />
              </div>
            </div>

            {errorMsg && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '0.75rem', marginBottom: '14px' }}>
                <AlertCircle size={14} />
                <span>{errorMsg}</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={onClose}
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={isVerifying}
                className="btn-primary"
                style={{ flex: 2, justifyContent: 'center', background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
              >
                <Lock size={15} />
                <span>{isVerifying ? 'Verifying PKI Token...' : 'Authorize Action'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Method 2: Biometric / e-Sign */}
        {authMethod === 'BIOMETRIC' && (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div
              onClick={handleTriggerBiometric}
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 16px auto',
                borderRadius: '50%',
                background: isBiometricScanning ? 'rgba(59, 130, 246, 0.25)' : 'rgba(16, 185, 129, 0.15)',
                border: isBiometricScanning ? '2px solid #60a5fa' : '2px dashed #10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isBiometricScanning ? '#60a5fa' : '#10b981',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <Fingerprint size={40} className={isBiometricScanning ? 'animate-pulse' : ''} />
            </div>

            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
              {isBiometricScanning ? 'Scanning Aadhaar/NIC FIDO2 Token...' : 'Click Sensor to Authenticate'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
              Complies with UIDAI Aadhaar 2.0 Auth & CCA Digital Signature Standard
            </div>

            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

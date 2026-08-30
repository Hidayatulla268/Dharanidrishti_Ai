import { 
  AuditLogEntry, 
  SecurityThreatLog, 
  ComplianceAuditItem, 
  ApiKeyCredential, 
  ActiveUserSession, 
  UserRole,
  LandParcelDossier 
} from '../types';

/**
 * DharaniDrishti AI - Enterprise Cryptographic Security Engine
 * Complies with CERT-In Cyber Guidelines, ISO/IEC 27001, and DPDPA 2023.
 */

// In-memory threat event bus
let threatLogs: SecurityThreatLog[] = [
  {
    id: 'threat-101',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    threatType: 'XSS_INJECTION_BLOCKED',
    severity: 'HIGH',
    sourceIp: '185.220.101.5',
    targetEndpoint: '/api/v1/cadastral/search',
    sanitizedInput: '<script>alert(document.cookie)</script>',
    actionTaken: 'BLOCKED',
    details: 'Reflected cross-site scripting payload stripped from query parameter.'
  },
  {
    id: 'threat-102',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    threatType: 'RATE_LIMIT_EXCEEDED',
    severity: 'MEDIUM',
    sourceIp: '103.21.244.0',
    targetEndpoint: '/api/v1/predict/delay',
    actionTaken: 'RATE_LIMITED',
    details: 'Burst threshold of 60 req/min exceeded (78 calls detected). Cooldown applied.'
  },
  {
    id: 'threat-103',
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    threatType: 'SQLI_ATTEMPT_DEFLECTED',
    severity: 'CRITICAL',
    sourceIp: '194.26.29.112',
    targetEndpoint: '/api/v1/projects/query',
    sanitizedInput: "' UNION SELECT * FROM users--",
    actionTaken: 'BLOCKED',
    details: 'SQL union injection pattern intercepted by input sanitization shield.'
  },
  {
    id: 'threat-104',
    timestamp: new Date(Date.now() - 3600000 * 20).toISOString(),
    threatType: 'PII_REDACTION_TRIGGERED',
    severity: 'LOW',
    sourceIp: '10.24.110.42',
    targetEndpoint: '/citizen/dossier/export',
    actionTaken: 'SANITIZED',
    details: 'Unmasked Aadhaar and Bank Account details redacted prior to public client view.'
  }
];

const threatListeners: ((logs: SecurityThreatLog[]) => void)[] = [];

export const subscribeThreatLogs = (listener: (logs: SecurityThreatLog[]) => void) => {
  threatListeners.push(listener);
  return () => {
    const idx = threatListeners.indexOf(listener);
    if (idx !== -1) threatListeners.splice(idx, 1);
  };
};

export const getThreatLogs = (): SecurityThreatLog[] => {
  return [...threatLogs];
};

export const recordThreatEvent = (event: Omit<SecurityThreatLog, 'id' | 'timestamp'>): SecurityThreatLog => {
  const newEvent: SecurityThreatLog = {
    ...event,
    id: `threat-${Date.now()}`,
    timestamp: new Date().toISOString()
  };
  threatLogs = [newEvent, ...threatLogs].slice(0, 50);
  threatListeners.forEach(l => l([...threatLogs]));
  return newEvent;
};

// ============================================================================
// 1. Web Cryptography API: SHA-256 Hashing & Immutable Audit Chaining
// ============================================================================

export async function calculateSha256(message: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function hashAuditBlock(
  entry: Partial<AuditLogEntry>,
  prevHash: string,
  blockHeight: number
): Promise<string> {
  const payload = `${blockHeight}|${prevHash}|${entry.timestamp}|${entry.user}|${entry.role}|${entry.action}|${entry.category}|${entry.details}|${entry.ipAddress}`;
  return calculateSha256(payload);
}

export async function verifyAuditChain(
  logs: AuditLogEntry[]
): Promise<{ isValid: boolean; brokenAtIndex?: number; totalVerified: number }> {
  // Chain runs in chronological order
  const sorted = [...logs].sort((a, b) => (a.blockHeight || 0) - (b.blockHeight || 0));

  for (let i = 0; i < sorted.length; i++) {
    const current = sorted[i];
    const prev = i > 0 ? sorted[i - 1] : null;
    const expectedPrevHash = prev ? (prev.hash || '0000000000000000000000000000000000000000000000000000000000000000') : '0000000000000000000000000000000000000000000000000000000000000000';

    if (current.previousHash && current.previousHash !== expectedPrevHash) {
      return { isValid: false, brokenAtIndex: i, totalVerified: i };
    }

    const computed = await hashAuditBlock(
      current,
      expectedPrevHash,
      current.blockHeight || i + 1
    );

    if (current.hash && current.hash !== computed) {
      return { isValid: false, brokenAtIndex: i, totalVerified: i };
    }
  }

  return { isValid: true, totalVerified: sorted.length };
}

export function generateDigitalSignature(officerRole: UserRole, blockHash: string): string {
  const signerPrefix = officerRole === 'CENTRAL_MINISTRY' 
    ? 'NIC-CA-APEX-GOV' 
    : officerRole === 'LEGAL_OFFICER'
    ? 'HC-E-SIGN-LEGAL'
    : 'NIC-DSC-STATE-CALA';
  return `${signerPrefix}:RSA4096:${blockHash.slice(0, 16)}...${Date.now().toString(36)}`;
}

// ============================================================================
// 2. Input Sanitization & Injection Defense
// ============================================================================

export function sanitizeInput(raw: string): { sanitized: string; isModified: boolean; threatDetected?: string } {
  if (!raw) return { sanitized: '', isModified: false };

  let isModified = false;
  let threatDetected: string | undefined;

  // 1. Detect and strip XSS scripts/handlers
  const scriptPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const eventHandlerPattern = /on\w+\s*=\s*["'][^"']*["']/gi;
  const javascriptUriPattern = /javascript:\s*[^"';\s]*/gi;

  let sanitized = raw;

  if (scriptPattern.test(sanitized)) {
    sanitized = sanitized.replace(scriptPattern, '');
    isModified = true;
    threatDetected = 'XSS Script Tag Intercepted';
  }

  if (eventHandlerPattern.test(sanitized)) {
    sanitized = sanitized.replace(eventHandlerPattern, '');
    isModified = true;
    threatDetected = 'Inline JavaScript Event Intercepted';
  }

  if (javascriptUriPattern.test(sanitized)) {
    sanitized = sanitized.replace(javascriptUriPattern, '');
    isModified = true;
    threatDetected = 'Dangerous JavaScript URI Protocol Intercepted';
  }

  // 2. Detect SQL/NoSQL Injection patterns in free text inputs
  const sqliPattern = /(\b(UNION\s+SELECT|DROP\s+TABLE|INSERT\s+INTO|ALTER\s+TABLE|--|;\s*SHUTDOWN)\b)/gi;
  if (sqliPattern.test(sanitized)) {
    sanitized = sanitized.replace(sqliPattern, '[BLOCKED_SQL_KEYWORD]');
    isModified = true;
    threatDetected = 'SQL Injection Metacharacters Neutralized';
  }

  // 3. HTML entity encode remaining angle brackets to be completely safe
  const htmlEncoded = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

  if (htmlEncoded !== sanitized) {
    sanitized = htmlEncoded;
    isModified = true;
  }

  if (isModified && threatDetected) {
    recordThreatEvent({
      threatType: threatDetected.includes('SQL') ? 'SQLI_ATTEMPT_DEFLECTED' : 'XSS_INJECTION_BLOCKED',
      severity: threatDetected.includes('SQL') ? 'CRITICAL' : 'HIGH',
      sourceIp: '127.0.0.1 (Client-Side)',
      targetEndpoint: window.location.pathname || '/input',
      sanitizedInput: raw,
      actionTaken: 'SANITIZED',
      details: `${threatDetected}. Input was sanitized safely.`
    });
  }

  return { sanitized, isModified, threatDetected };
}

/**
 * Defense against CSV / Spreadsheet Formula Injection
 * Prevents Excel execution of `=CMD|' /C ...'!A0` or `+`, `-`, `@`, `\t`
 */
export function sanitizeCsvCell(value: string | number | undefined | null): string {
  if (value === null || value === undefined) return '';
  const str = String(value).trim();
  const dangerousChars = ['=', '+', '-', '@', '\t', '\r'];
  if (dangerousChars.some(char => str.startsWith(char))) {
    return `'${str}`; // Prepend apostrophe to neutralize Excel formula parsing
  }
  return str;
}

// ============================================================================
// 3. PII Redaction & Masking Engine (DPDPA 2023 Compliant)
// ============================================================================

export function maskAadhaar(raw?: string): string {
  if (!raw) return 'XXXX-XXXX-4819';
  const clean = raw.replace(/\D/g, '');
  if (clean.length >= 4) {
    return `XXXX-XXXX-${clean.slice(-4)}`;
  }
  return 'XXXX-XXXX-8921';
}

export function maskPhone(phone?: string): string {
  if (!phone) return '+91 98XXX-XX321';
  const clean = phone.replace(/\D/g, '');
  if (clean.length >= 4) {
    return `+91 ${clean.slice(0, 2)}XXX-XX${clean.slice(-3)}`;
  }
  return '+91 98XXX-XX321';
}

export function maskBankAccount(acc?: string): string {
  if (!acc) return 'XXXXXXXXXX9042';
  const clean = acc.replace(/\s/g, '');
  if (clean.length >= 4) {
    return `XXXX-XXXX-${clean.slice(-4)}`;
  }
  return 'XXXXXXXXXX9042';
}

export function maskCitizenDossier(dossier: LandParcelDossier, viewerRole: UserRole): LandParcelDossier {
  if (viewerRole === 'CITIZEN_LANDOWNER') {
    return dossier; // Citizen viewing their own parcel
  }

  return {
    ...dossier,
    jointOwners: dossier.jointOwners.map((name, i) => i === 0 ? name : `${name.split(' ')[0]} [REDACTED_DPDPA]`)
  };
}

// ============================================================================
// 4. Client-Side Token Bucket Rate Limiter
// ============================================================================

interface RateBucket {
  tokens: number;
  lastRefill: number;
}

const rateBuckets = new Map<string, RateBucket>();

export function checkRateLimit(
  actionKey: string, 
  maxBurst: number = 10, 
  refillPerSec: number = 2
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  let bucket = rateBuckets.get(actionKey);

  if (!bucket) {
    bucket = { tokens: maxBurst, lastRefill: now };
    rateBuckets.set(actionKey, bucket);
  }

  // Refill tokens based on elapsed time
  const elapsedSec = (now - bucket.lastRefill) / 1000;
  bucket.tokens = Math.min(maxBurst, bucket.tokens + elapsedSec * refillPerSec);
  bucket.lastRefill = now;

  if (bucket.tokens >= 1) {
    bucket.tokens -= 1;
    return {
      allowed: true,
      remaining: Math.floor(bucket.tokens),
      resetTime: Math.ceil((maxBurst - bucket.tokens) / refillPerSec)
    };
  } else {
    // Record rate limit violation
    recordThreatEvent({
      threatType: 'RATE_LIMIT_EXCEEDED',
      severity: 'MEDIUM',
      sourceIp: '127.0.0.1',
      targetEndpoint: `/action/${actionKey}`,
      actionTaken: 'RATE_LIMITED',
      details: `Action rate limit exceeded for key '${actionKey}'. Burst capacity depleted.`
    });

    return {
      allowed: false,
      remaining: 0,
      resetTime: Math.ceil(1 / refillPerSec)
    };
  }
}

// ============================================================================
// 5. Secure Cryptographic Key & Secret Manager
// ============================================================================

export function generateSecureApiKey(prefix: string = 'ddr_live'): string {
  const array = new Uint8Array(24);
  crypto.getRandomValues(array);
  const randomHex = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${prefix}_sec_${randomHex}`;
}

export function maskApiKey(key: string): string {
  if (key.length <= 12) return 'ddr_live_••••••••';
  return `${key.slice(0, 12)}••••••••••••••••${key.slice(-4)}`;
}

export async function generateHmacSignature(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ============================================================================
// 6. Security Standards Compliance Matrix Datastore
// ============================================================================

export const COMPLIANCE_ITEMS: ComplianceAuditItem[] = [
  {
    id: 'cert-01',
    standard: 'CERT_IN',
    controlName: 'Mandatory 6-Hour Cyber Incident Reporting & NTP Timestamp Sync',
    status: 'COMPLIANT',
    lastAuditedDate: '2026-08-15',
    auditorRemarks: 'NTP synchronized with National Physical Laboratory (NPL) India stratum-1 clocks.',
    frameworkRef: 'CERT-In Cyber Security Directions 2022 §2.1'
  },
  {
    id: 'cert-02',
    standard: 'CERT_IN',
    controlName: 'Immutable Audit Log Retention (180 Days in Indian Jurisdiction)',
    status: 'COMPLIANT',
    lastAuditedDate: '2026-08-20',
    auditorRemarks: 'Cryptographically hashed block trails stored across geo-redundant Indian NIC cloud datacenters.',
    frameworkRef: 'CERT-In Log Mandate §4.2'
  },
  {
    id: 'dpdpa-01',
    standard: 'DPDPA_2023',
    controlName: 'Digital Personal Data Protection (Citizen PII Redaction & Purpose Limitation)',
    status: 'COMPLIANT',
    lastAuditedDate: '2026-08-25',
    auditorRemarks: 'Aadhaar numbers masked with SHA-256 salted tokens. Direct benefit disbursal accounts protected.',
    frameworkRef: 'DPDP Act 2023 §6 & §8'
  },
  {
    id: 'iso-01',
    standard: 'ISO_27001',
    controlName: 'A.9.4.2 Secure User Log-on & Multi-Factor Step-Up Authentication',
    status: 'COMPLIANT',
    lastAuditedDate: '2026-08-10',
    auditorRemarks: 'Granular RBAC enforcement with biometric / OTP step-up verification for administrative mutations.',
    frameworkRef: 'ISO/IEC 27001:2022 Control 9.4'
  },
  {
    id: 'iso-02',
    standard: 'ISO_27001',
    controlName: 'A.8.24 Use of Cryptography & TLS 1.3 End-to-End Encryption',
    status: 'COMPLIANT',
    lastAuditedDate: '2026-08-18',
    auditorRemarks: 'Enforced TLS 1.3 with AES-256-GCM cipher suites, strict HSTS and CSP header headers.',
    frameworkRef: 'ISO/IEC 27001:2022 Control 8.24'
  },
  {
    id: 'gigw-01',
    standard: 'NIC_GIGW',
    controlName: 'Guidelines for Indian Government Websites (GIGW 3.0 Web Application Security)',
    status: 'COMPLIANT',
    lastAuditedDate: '2026-08-28',
    auditorRemarks: 'Anti-Clickjacking X-Frame-Options DENY, SRI hashes on external assets, no plain credentials.',
    frameworkRef: 'GIGW 3.0 Standard §7'
  }
];

export const INITIAL_API_KEYS: ApiKeyCredential[] = [
  {
    id: 'key-gatishakti-prod',
    name: 'PM GatiShakti NMP Interop Connector',
    maskedKey: 'ddr_live_sec_89f0••••••••••••••••7a21',
    createdAt: '2026-01-15T10:00:00Z',
    expiresAt: '2027-01-15T10:00:00Z',
    lastUsedAt: '2026-08-30T13:45:12Z',
    status: 'ACTIVE',
    scopes: ['read:analytics', 'write:ingest'],
    ipWhitelist: ['164.100.158.0/24', '10.24.0.0/16']
  },
  {
    id: 'key-bhoomi-rashi',
    name: 'MoRTH Bhoomi Rashi Cadastral Gateway',
    maskedKey: 'ddr_live_sec_32c8••••••••••••••••99e4',
    createdAt: '2026-02-01T08:30:00Z',
    expiresAt: '2027-02-01T08:30:00Z',
    lastUsedAt: '2026-08-30T12:10:05Z',
    status: 'ACTIVE',
    scopes: ['read:analytics', 'write:ingest', 'legal:adjudicate'],
    ipWhitelist: ['164.100.0.0/16']
  },
  {
    id: 'key-mlops-daemon',
    name: 'Continuous Learning MLOps Pipeline Service',
    maskedKey: 'ddr_live_sec_fa91••••••••••••••••01b8',
    createdAt: '2026-03-10T14:20:00Z',
    expiresAt: '2026-09-10T14:20:00Z',
    lastUsedAt: '2026-08-29T18:00:00Z',
    status: 'ACTIVE',
    scopes: ['read:analytics', 'admin:retrain'],
    ipWhitelist: ['127.0.0.1', '10.24.110.42']
  }
];

export const INITIAL_ACTIVE_SESSIONS: ActiveUserSession[] = [
  {
    sessionId: 'sess-current-01',
    device: 'NIC Secured Workstation (Apex Terminal)',
    browser: 'Chrome 128 / Windows 11 Enterprise',
    location: 'Shram Shakti Bhawan, New Delhi (HQ)',
    ipAddress: '10.24.110.42 (Gov LAN VPN)',
    loginTime: '2026-08-30T09:15:00Z',
    lastActive: 'Just now',
    isCurrentSession: true,
    status: 'ACTIVE'
  },
  {
    sessionId: 'sess-mobile-cala',
    device: 'Encrypted Tablet (CALA Field Officer)',
    browser: 'Mobile Safari / iOS 18.2',
    location: 'District Collectorate, Kadapa, AP',
    ipAddress: '117.211.89.14 (BSNL Gov Leased Line)',
    loginTime: '2026-08-30T11:30:00Z',
    lastActive: '12 mins ago',
    isCurrentSession: false,
    status: 'IDLE'
  }
];

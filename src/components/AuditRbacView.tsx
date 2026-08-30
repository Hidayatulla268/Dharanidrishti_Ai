import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  Search, 
  Filter, 
  FileDown, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Eye
} from 'lucide-react';
import { AuditLogEntry, UserRole } from '../types';

interface AuditRbacViewProps {
  auditLogs: AuditLogEntry[];
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const AuditRbacView: React.FC<AuditRbacViewProps> = ({
  auditLogs,
  currentRole,
  onRoleChange
}) => {
  const [searchUser, setSearchUser] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const rbacMatrix = [
    { permission: 'View National Infrastructure Risk Analytics & GIS', central: true, state: true, district: true, projectDirector: true, legal: true },
    { permission: 'Trigger Central Policy Escalation & Lok Adalat Incentive Grants', central: true, state: true, district: false, projectDirector: false, legal: false },
    { permission: 'Trigger Continuous Learning Model Retraining & MLOps Deployment', central: true, state: false, district: false, projectDirector: false, legal: false },
    { permission: 'Ingest State Land Records (Bhoomi Rashi / e-Dharani / Bhulekh)', central: true, state: true, district: true, projectDirector: true, legal: false },
    { permission: 'Update Prescriptive Mitigation Playbook & Workflow Milestones', central: true, state: true, district: true, projectDirector: true, legal: true },
    { permission: 'Adjudicate Court Writs & Mutate Disputed Parcel Apportionments', central: false, state: true, district: true, projectDirector: false, legal: true },
    { permission: 'Direct Access to Government REST APIs & Webhook Keys', central: true, state: true, district: false, projectDirector: true, legal: false }
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesUser = log.user.toLowerCase().includes(searchUser.toLowerCase()) || 
                        log.action.toLowerCase().includes(searchUser.toLowerCase()) ||
                        (log.targetProjectCode && log.targetProjectCode.toLowerCase().includes(searchUser.toLowerCase()));
    const matchesCat = selectedCategory === 'ALL' || log.category === selectedCategory;
    return matchesUser && matchesCat;
  });

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-header-title">
          <h2>Role-Based Access Control (RBAC) & Immutable Audit Trails</h2>
          <p>Security governance matrix, multi-stakeholder permission policies, and verifiable audit logging.</p>
        </div>

        <div className="view-header-actions">
          <button 
            onClick={() => {
              const text = JSON.stringify(filteredLogs, null, 2);
              const blob = new Blob([text], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `Security_Audit_Logs_${new Date().toISOString().slice(0,10)}.json`;
              a.click();
            }}
            className="btn-secondary"
          >
            <FileDown size={14} />
            <span>Export Audit Trail (JSON)</span>
          </button>
        </div>
      </div>

      {/* RBAC Permission Matrix */}
      <div className="glass-panel" style={{ padding: '22px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} style={{ color: 'var(--primary-400)' }} />
              Multi-Tier Stakeholder Security Governance Matrix
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Strict role segregation ensuring integrity across administrative, financial, and legal actions.
            </p>
          </div>
        </div>

        <div className="custom-table-wrap">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Security & Functional Scope</th>
                <th style={{ textAlign: 'center' }}>Central Ministry</th>
                <th style={{ textAlign: 'center' }}>State Nodal CALA</th>
                <th style={{ textAlign: 'center' }}>District Collector</th>
                <th style={{ textAlign: 'center' }}>Project Director</th>
                <th style={{ textAlign: 'center' }}>Legal Officer</th>
              </tr>
            </thead>
            <tbody>
              {rbacMatrix.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600, fontSize: '0.85rem' }}>{row.permission}</td>
                  <td style={{ textAlign: 'center' }}>{row.central ? <CheckCircle2 size={16} style={{ color: '#10b981', margin: '0 auto' }} /> : <XCircle size={16} style={{ color: 'var(--text-muted)', margin: '0 auto' }} />}</td>
                  <td style={{ textAlign: 'center' }}>{row.state ? <CheckCircle2 size={16} style={{ color: '#10b981', margin: '0 auto' }} /> : <XCircle size={16} style={{ color: 'var(--text-muted)', margin: '0 auto' }} />}</td>
                  <td style={{ textAlign: 'center' }}>{row.district ? <CheckCircle2 size={16} style={{ color: '#10b981', margin: '0 auto' }} /> : <XCircle size={16} style={{ color: 'var(--text-muted)', margin: '0 auto' }} />}</td>
                  <td style={{ textAlign: 'center' }}>{row.projectDirector ? <CheckCircle2 size={16} style={{ color: '#10b981', margin: '0 auto' }} /> : <XCircle size={16} style={{ color: 'var(--text-muted)', margin: '0 auto' }} />}</td>
                  <td style={{ textAlign: 'center' }}>{row.legal ? <CheckCircle2 size={16} style={{ color: '#10b981', margin: '0 auto' }} /> : <XCircle size={16} style={{ color: 'var(--text-muted)', margin: '0 auto' }} />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Immutable Audit Logs Table */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={17} style={{ color: 'var(--accent-purple)' }} />
              Verifiable Immutable Audit Trail Logs
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              SHA-256 cryptographically indexed event records documenting all risk adjustments, data uploads, and escalations.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative', minWidth: '220px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search user, action, project..." 
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                style={{ paddingLeft: '30px', width: '100%', fontSize: '0.8rem' }}
              />
            </div>

            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ fontSize: '0.8rem' }}>
              <option value="ALL">All Event Categories</option>
              <option value="PREDICTION_OVERRIDE">Prediction Overrides</option>
              <option value="MITIGATION_STATUS">Mitigation Status</option>
              <option value="DATA_INGESTION">Data Ingestion</option>
              <option value="MODEL_RETRAIN">Model Retraining</option>
            </select>
          </div>
        </div>

        <div className="custom-table-wrap">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Timestamp (UTC)</th>
                <th>Stakeholder / User</th>
                <th>Role Scope</th>
                <th>Action & Target</th>
                <th>Details & Payload</th>
                <th>Client IP</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {log.timestamp.replace('T', ' ').slice(0, 19)}
                  </td>
                  <td style={{ fontWeight: 600, fontSize: '0.82rem' }}>{log.user}</td>
                  <td>
                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 'var(--radius-full)', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', color: 'var(--primary-400)', fontWeight: 600 }}>
                      {log.role}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>{log.action}</div>
                    {log.targetProjectCode && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-gold)' }}>
                        {log.targetProjectCode}
                      </span>
                    )}
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '380px' }}>
                    {log.details}
                  </td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {log.ipAddress}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

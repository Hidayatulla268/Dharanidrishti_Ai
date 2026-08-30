import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Building, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Send, 
  Radio, 
  FileText, 
  ShieldAlert, 
  ExternalLink,
  Filter,
  Trees,
  Shield,
  Train,
  Zap,
  Droplets,
  Landmark,
  ArrowUpRight
} from 'lucide-react';
import { LandAcquisitionProject, UserRole } from '../types';

interface InterDeptClearancesViewProps {
  projects: LandAcquisitionProject[];
  currentRole: UserRole;
}

interface StatutoryNocRecord {
  id: string;
  projectCode: string;
  projectName: string;
  state: string;
  district: string;
  ministry: 'MoEFCC (Forest & Wildlife)' | 'Ministry of Defence (MoD)' | 'Ministry of Railways (MoR)' | 'Ministry of Power / Transco' | 'Ministry of Jal Shakti (CWC)' | 'Archaeological Survey (ASI)';
  nocType: string;
  status: 'APPROVED' | 'PENDING_MINISTRY' | 'DELAYED_OVERDUE' | 'JOINT_INSPECTION';
  submissionDate: string;
  statutorySlaDays: number;
  elapsedDays: number;
  nodalOfficer: string;
  remarks: string;
}

export const InterDeptClearancesView: React.FC<InterDeptClearancesViewProps> = ({
  projects,
  currentRole
}) => {
  const [selectedMinistry, setSelectedMinistry] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [escalatedMap, setEscalatedMap] = useState<{ [id: string]: boolean }>({});

  const nocRecords: StatutoryNocRecord[] = [
    {
      id: 'NOC-01',
      projectCode: 'NHAI-DME-PKG14',
      projectName: 'Delhi-Mumbai Expressway (Palghar Spur)',
      state: 'Maharashtra',
      district: 'Palghar',
      ministry: 'MoEFCC (Forest & Wildlife)',
      nocType: 'Stage-II Final Forest Clearance (45.2 Ha)',
      status: 'DELAYED_OVERDUE',
      submissionDate: '2025-08-14',
      statutorySlaDays: 150,
      elapsedDays: 280,
      nodalOfficer: 'PCCF (Forest Conservation), Nagpur',
      remarks: 'Compensatory Afforestation revenue land mutation pending in Dahanu tehsil.'
    },
    {
      id: 'NOC-02',
      projectCode: 'MAHSR-BULLET-S3',
      projectName: 'Mumbai-Ahmedabad High Speed Rail (Surat Section)',
      state: 'Gujarat',
      district: 'Surat',
      ministry: 'Ministry of Power / Transco',
      nocType: '400kV Double Circuit HT Line Shifting',
      status: 'APPROVED',
      submissionDate: '2025-11-20',
      statutorySlaDays: 90,
      elapsedDays: 72,
      nodalOfficer: 'Chief Engineer, GETCO Gujarat',
      remarks: 'Transmission tower realignment completed and commissioned.'
    },
    {
      id: 'NOC-03',
      projectCode: 'EDFC-SON-DAN-04',
      projectName: 'Eastern Dedicated Freight Corridor (Gangpur Section)',
      state: 'West Bengal',
      district: 'Purba Bardhaman',
      ministry: 'Ministry of Railways (MoR)',
      nocType: 'Railway Crossing GAD Bridge Span Clearance',
      status: 'APPROVED',
      submissionDate: '2025-10-05',
      statutorySlaDays: 60,
      elapsedDays: 45,
      nodalOfficer: 'Chief Bridge Engineer, Eastern Railway',
      remarks: 'General Arrangement Drawing formally approved with zero vertical infringements.'
    },
    {
      id: 'NOC-04',
      projectCode: 'YEIDA-JEWAR-P2',
      projectName: 'Noida International Airport (Phase 2 Aerotropolis)',
      state: 'Uttar Pradesh',
      district: 'Gautam Buddha Nagar',
      ministry: 'Ministry of Defence (MoD)',
      nocType: 'Air Force Hindon Radar Buffer Obstacle Clearance',
      status: 'APPROVED',
      submissionDate: '2025-09-12',
      statutorySlaDays: 120,
      elapsedDays: 95,
      nodalOfficer: 'Air HQ Directorate of Operations',
      remarks: 'Building height envelope cleared up to 85 meters AMSL.'
    },
    {
      id: 'NOC-05',
      projectCode: 'SECI-LEH-SOLAR-01',
      projectName: 'Leh-Ladakh Mega Solar Corridor (Pang Node)',
      state: 'Ladakh (UT)',
      district: 'Leh',
      ministry: 'Ministry of Defence (MoD)',
      nocType: 'Border Area Security Clearance (Line of Actual Control Buffer)',
      status: 'JOINT_INSPECTION',
      submissionDate: '2026-01-10',
      statutorySlaDays: 180,
      elapsedDays: 140,
      nodalOfficer: '14 Corps HQ / Border Roads Organisation',
      remarks: 'Joint GPS site inspection scheduled with Southern Command.'
    },
    {
      id: 'NOC-06',
      projectCode: 'MSRDC-PUNE-RING-W',
      projectName: 'Pune Ring Road Greenfield Expressway',
      state: 'Maharashtra',
      district: 'Pune',
      ministry: 'Ministry of Jal Shakti (CWC)',
      nocType: 'Khadakwasla Dam Backwater Floodline Buffer NOC',
      status: 'DELAYED_OVERDUE',
      submissionDate: '2025-07-22',
      statutorySlaDays: 90,
      elapsedDays: 245,
      nodalOfficer: 'Superintending Engineer, Pune Irrigation Circle',
      remarks: 'High flood level hydro-dynamic model clearance awaited from CWP&RS Pune.'
    },
    {
      id: 'NOC-07',
      projectCode: 'NHAI-VK-EXP-PKG2',
      projectName: 'Varanasi-Kolkata Economic Corridor (Kaimur Section)',
      state: 'Bihar',
      district: 'Kaimur',
      ministry: 'Archaeological Survey (ASI)',
      nocType: 'Rohtas Fort Historical Monument 300m Buffer Zone Clearance',
      status: 'PENDING_MINISTRY',
      submissionDate: '2026-02-04',
      statutorySlaDays: 90,
      elapsedDays: 78,
      nodalOfficer: 'Superintending Archaeologist, Patna Circle ASI',
      remarks: 'Heritage Impact Assessment report submitted for review.'
    }
  ];

  const filteredNocs = nocRecords.filter(n => {
    const matchesMin = selectedMinistry === 'ALL' || n.ministry === selectedMinistry;
    const matchesStat = selectedStatus === 'ALL' || n.status === selectedStatus;
    return matchesMin && matchesStat;
  });

  const handleEscalate = (id: string) => {
    setEscalatedMap(prev => ({ ...prev, [id]: true }));
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const getMinistryIcon = (m: string) => {
    if (m.includes('Forest')) return <Trees size={16} style={{ color: 'var(--accent-emerald)' }} />;
    if (m.includes('Defence')) return <Shield size={16} style={{ color: '#0ea5e9' }} />;
    if (m.includes('Railways')) return <Train size={16} style={{ color: '#f59e0b' }} />;
    if (m.includes('Power')) return <Zap size={16} style={{ color: '#eab308' }} />;
    if (m.includes('Jal')) return <Droplets size={16} style={{ color: '#38bdf8' }} />;
    return <Landmark size={16} style={{ color: '#c084fc' }} />;
  };

  return (
    <div>
      {/* View Header */}
      <div className="view-header">
        <div className="view-header-title">
          <h2>PM GatiShakti National Master Plan — Inter-Departmental Clearances & Statutory NOC Matrix</h2>
          <p>Real-time telemetry across MoEFCC Forest, Ministry of Defence, Railway GADs, Power Transco utilities, and Water Commission clearances.</p>
        </div>

        <div className="view-header-actions">
          <button 
            onClick={() => window.print()}
            className="btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
          >
            <FileText size={15} /> Export Clearances Matrix
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <div className="glass-panel kpi-card" style={{ '--kpi-accent': '#10b981', '--kpi-bg': 'rgba(16, 185, 129, 0.12)' } as React.CSSProperties}>
          <div className="kpi-header">
            <span>Approved Clearances</span>
            <div className="kpi-icon-wrap" style={{ color: '#10b981' }}><CheckCircle2 size={18} /></div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{nocRecords.filter(n => n.status === 'APPROVED').length} / {nocRecords.length}</span>
            <span className="kpi-unit">Statutory NOCs</span>
          </div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>Unencumbered Corridor Stretches</span>
          </div>
        </div>

        <div className="glass-panel kpi-card" style={{ '--kpi-accent': '#ef4444', '--kpi-bg': 'rgba(239, 68, 68, 0.14)' } as React.CSSProperties}>
          <div className="kpi-header">
            <span>Overdue Beyond Statutory SLA</span>
            <div className="kpi-icon-wrap" style={{ color: '#ef4444' }}><AlertTriangle size={18} /></div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value" style={{ color: '#ff6b6b' }}>{nocRecords.filter(n => n.status === 'DELAYED_OVERDUE').length}</span>
            <span className="kpi-unit">Critical Bottlenecks</span>
          </div>
          <div className="kpi-footer">
            <span style={{ color: '#ff6b6b', fontWeight: 600 }}>Requiring PM GatiShakti Apex Escalation</span>
          </div>
        </div>

        <div className="glass-panel kpi-card" style={{ '--kpi-accent': '#0ea5e9', '--kpi-bg': 'rgba(14, 165, 233, 0.12)' } as React.CSSProperties}>
          <div className="kpi-header">
            <span>Inter-Ministry In-Flight Review</span>
            <div className="kpi-icon-wrap" style={{ color: '#0ea5e9' }}><Clock size={18} /></div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{nocRecords.filter(n => n.status === 'PENDING_MINISTRY' || n.status === 'JOINT_INSPECTION').length}</span>
            <span className="kpi-unit">Under Evaluation</span>
          </div>
          <div className="kpi-footer">
            <span>Average Elapsed Time: 124 Days</span>
          </div>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <Filter size={15} /> Filter Clearances:
          </div>

          <select value={selectedMinistry} onChange={(e) => setSelectedMinistry(e.target.value)}>
            <option value="ALL">All Statutory Ministries</option>
            <option value="MoEFCC (Forest & Wildlife)">MoEFCC (Forest & Wildlife)</option>
            <option value="Ministry of Defence (MoD)">Ministry of Defence (MoD)</option>
            <option value="Ministry of Railways (MoR)">Ministry of Railways (MoR)</option>
            <option value="Ministry of Power / Transco">Ministry of Power / Transco</option>
            <option value="Ministry of Jal Shakti (CWC)">Ministry of Jal Shakti (CWC)</option>
            <option value="Archaeological Survey (ASI)">Archaeological Survey (ASI)</option>
          </select>

          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="ALL">All SLA Statuses</option>
            <option value="APPROVED">Approved NOCs</option>
            <option value="DELAYED_OVERDUE">Delayed / Overdue SLA</option>
            <option value="PENDING_MINISTRY">Pending Ministry Review</option>
            <option value="JOINT_INSPECTION">Joint Inspection Scheduled</option>
          </select>
        </div>

        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredNocs.length}</strong> Statutory Clearance Portfolios
        </span>
      </div>

      {/* NOC Clearances Table */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <div className="custom-table-wrap">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Infrastructure Project</th>
                <th>Statutory Ministry & Clearance</th>
                <th>Location</th>
                <th>SLA vs Elapsed Time</th>
                <th>Status</th>
                <th>Nodal Officer & Remarks</th>
                <th>GatiShakti Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredNocs.map((rec) => {
                const isOverdue = rec.status === 'DELAYED_OVERDUE';
                const isApproved = rec.status === 'APPROVED';
                const isEscalated = !!escalatedMap[rec.id];

                return (
                  <tr key={rec.id}>
                    {/* Project */}
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.88rem' }}>
                        {rec.projectName}
                      </div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--primary-400)', marginTop: '2px' }}>
                        {rec.projectCode}
                      </div>
                    </td>

                    {/* Ministry & NOC */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.82rem' }}>
                        {getMinistryIcon(rec.ministry)}
                        <span>{rec.ministry}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {rec.nocType}
                      </div>
                    </td>

                    {/* Location */}
                    <td>
                      <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{rec.district}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{rec.state}</div>
                    </td>

                    {/* Elapsed vs SLA */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontWeight: 800, color: isOverdue ? '#ff6b6b' : isApproved ? 'var(--accent-emerald)' : 'var(--accent-gold)' }}>
                          {rec.elapsedDays} Days
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>/ SLA {rec.statutorySlaDays}d</span>
                      </div>
                      <div style={{ width: '80px', height: '4px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginTop: '4px' }}>
                        <div style={{ 
                          width: `${Math.min(100, (rec.elapsedDays / rec.statutorySlaDays) * 100)}%`, 
                          height: '100%', 
                          background: isOverdue ? '#ef4444' : isApproved ? 'var(--accent-emerald)' : 'var(--accent-gold)' 
                        }} />
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-full)',
                        background: isApproved ? 'rgba(16, 185, 129, 0.15)' : isOverdue ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.15)',
                        color: isApproved ? 'var(--accent-emerald)' : isOverdue ? '#ff6b6b' : '#fbbf24',
                        border: `1px solid ${isApproved ? 'var(--accent-emerald)' : isOverdue ? '#ef4444' : '#f59e0b'}`
                      }}>
                        {rec.status.replace('_', ' ')}
                      </span>
                    </td>

                    {/* Nodal Officer & Remarks */}
                    <td style={{ maxWidth: '280px' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {rec.nodalOfficer}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.3 }}>
                        {rec.remarks}
                      </div>
                    </td>

                    {/* Action */}
                    <td>
                      {isApproved ? (
                        <span style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                          <CheckCircle2 size={13} /> Clearance Handed Over
                        </span>
                      ) : isEscalated ? (
                        <span style={{ fontSize: '0.72rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                          <Radio size={13} /> Escalation Active
                        </span>
                      ) : (
                        <button
                          onClick={() => handleEscalate(rec.id)}
                          className="btn-primary"
                          style={{ padding: '4px 10px', fontSize: '0.72rem', background: isOverdue ? '#ef4444' : '#0ea5e9' }}
                        >
                          <Send size={12} />
                          <span>{isOverdue ? 'Cabinet Escalation' : 'Nodal Follow-up'}</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

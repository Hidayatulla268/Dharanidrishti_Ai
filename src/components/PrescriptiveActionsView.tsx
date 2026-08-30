import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Coins, 
  AlertCircle, 
  ShieldAlert, 
  ChevronRight, 
  Filter, 
  ArrowUpRight, 
  Calendar, 
  UserCheck, 
  FileDown,
  Building,
  User
} from 'lucide-react';
import { LandAcquisitionProject, PrescriptiveAction, UserRole } from '../types';
import { PERSONA_CONFIGS } from '../data/personaConfig';

interface PrescriptiveActionsViewProps {
  projects: LandAcquisitionProject[];
  selectedProject: LandAcquisitionProject | null;
  currentRole: UserRole;
  onUpdateActionStatus: (actionId: string, status: PrescriptiveAction['status']) => void;
}

export const PrescriptiveActionsView: React.FC<PrescriptiveActionsViewProps> = ({
  projects,
  selectedProject,
  currentRole,
  onUpdateActionStatus
}) => {
  const [filterProjectId, setFilterProjectId] = useState<string>(selectedProject ? selectedProject.id : 'ALL');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterMyRoleOnly, setFilterMyRoleOnly] = useState<boolean>(false);

  const persona = PERSONA_CONFIGS[currentRole];

  // Collect all prescriptive actions from projects
  const allActions: (PrescriptiveAction & { projectName: string; projectCode: string; state: string; district: string })[] = [];
  projects.forEach(p => {
    p.prescriptiveActions.forEach(act => {
      allActions.push({
        ...act,
        projectName: p.name,
        projectCode: p.code,
        state: p.state,
        district: p.district
      });
    });
  });

  const filteredActions = allActions.filter(act => {
    const matchesProj = filterProjectId === 'ALL' || act.projectId === filterProjectId;
    const matchesPriority = filterPriority === 'ALL' || act.priority === filterPriority;
    const matchesStatus = filterStatus === 'ALL' || act.status === filterStatus;
    
    // Role filter mapping
    let matchesRole = true;
    if (filterMyRoleOnly) {
      if (currentRole === 'CENTRAL_MINISTRY') {
        matchesRole = act.escalationTier === 'CENTRAL_MINISTRY' || act.priority === 'URGENT';
      } else if (currentRole === 'STATE_CALA') {
        matchesRole = act.escalationTier === 'STATE_NODAL_CALA';
      } else if (currentRole === 'DISTRICT_COLLECTOR') {
        matchesRole = act.escalationTier === 'DISTRICT_COLLECTOR';
      } else if (currentRole === 'LEGAL_OFFICER') {
        matchesRole = act.category === 'LEGAL_FASTTRACK';
      } else if (currentRole === 'PROJECT_DIRECTOR') {
        matchesRole = act.category === 'DISBURSEMENT_SPEED' || act.category === 'DRONE_RESURVEY';
      }
    }

    return matchesProj && matchesPriority && matchesStatus && matchesRole;
  });

  // Calculate Aggregates
  const totalDaysSavedPotential = filteredActions.reduce((acc, a) => acc + a.expectedDelayReductionDays, 0);
  const totalCostSavingsPotentialCr = filteredActions.reduce((acc, a) => acc + a.estimatedCostSavingsCr, 0);
  const executedCount = filteredActions.filter(a => a.status === 'EXECUTED').length;

  const handleExecute = (actionId: string) => {
    onUpdateActionStatus(actionId, 'EXECUTED');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-header-title">
          <h2>Predictive Prescriptive Action Engine & Mitigation Playbooks</h2>
          <p>AI-recommended targeted interventions, fast-track dispute resolutions, and automated escalation workflows.</p>
        </div>

        <div className="view-header-actions">
          <button 
            onClick={() => {
              const text = JSON.stringify(filteredActions, null, 2);
              const blob = new Blob([text], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `Prescriptive_Action_Playbook_${new Date().toISOString().slice(0,10)}.json`;
              a.click();
            }}
            className="btn-secondary"
          >
            <FileDown size={15} />
            <span>Export Playbook (JSON)</span>
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
              Viewing Playbooks as {persona.title}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Assigned Statutory Gateways: {persona.workflowFilterTags.join(' • ')}
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
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>{filterMyRoleOnly ? '✓ Showing My Role Actions' : 'Filter for My Role Only'}</span>
        </button>
      </div>

      {/* Summary KPI Banner */}
      <div className="kpi-grid" style={{ marginBottom: '24px' }}>
        <div className="glass-panel kpi-card" style={{ '--kpi-accent': '#10b981', '--kpi-bg': 'rgba(16, 185, 129, 0.12)' } as React.CSSProperties}>
          <div className="kpi-header">
            <span>Potential Schedule Savings</span>
            <div className="kpi-icon-wrap" style={{ color: '#10b981' }}><Clock size={18} /></div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">-{totalDaysSavedPotential}</span>
            <span className="kpi-unit">Days (~{(totalDaysSavedPotential/30).toFixed(1)} Months)</span>
          </div>
          <div className="kpi-footer">
            <span>Across {filteredActions.length} prescriptive mitigation playbooks</span>
          </div>
        </div>

        <div className="glass-panel kpi-card" style={{ '--kpi-accent': '#f59e0b', '--kpi-bg': 'rgba(245, 158, 11, 0.12)' } as React.CSSProperties}>
          <div className="kpi-header">
            <span>Public Capital Overrun Avoidance</span>
            <div className="kpi-icon-wrap" style={{ color: '#f59e0b' }}><Coins size={18} /></div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">₹{totalCostSavingsPotentialCr.toFixed(1)}</span>
            <span className="kpi-unit">Crores</span>
          </div>
          <div className="kpi-footer">
            <span>Avoided statutory interest & project escalation</span>
          </div>
        </div>

        <div className="glass-panel kpi-card" style={{ '--kpi-accent': persona.badgeColor, '--kpi-bg': `${persona.badgeColor}22` } as React.CSSProperties}>
          <div className="kpi-header">
            <span>Implementation Progress</span>
            <div className="kpi-icon-wrap" style={{ color: persona.badgeColor }}><CheckCircle2 size={18} /></div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{executedCount} / {filteredActions.length}</span>
            <span className="kpi-unit">Executed</span>
          </div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
              {filteredActions.length > 0 ? ((executedCount/filteredActions.length)*100).toFixed(0) : 0}% Resolution Rate
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            <Filter size={15} /> Filter By:
          </div>

          <select value={filterProjectId} onChange={(e) => setFilterProjectId(e.target.value)}>
            <option value="ALL">All Projects ({projects.length})</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>[{p.code}] {p.name}</option>
            ))}
          </select>

          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="ALL">All Priorities</option>
            <option value="URGENT">Urgent (Immediate Action)</option>
            <option value="HIGH">High Priority</option>
            <option value="MEDIUM">Medium Priority</option>
          </select>

          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="ALL">All Execution Statuses</option>
            <option value="OPEN">Open (Pending)</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="EXECUTED">Executed (Resolved)</option>
          </select>
        </div>

        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredActions.length}</strong> Recommended Interventions
        </span>
      </div>

      {/* Action Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredActions.map((act) => {
          const isExecuted = act.status === 'EXECUTED';
          const isInProgress = act.status === 'IN_PROGRESS';

          return (
            <div 
              key={act.id} 
              className="action-card"
              style={{
                opacity: isExecuted ? 0.85 : 1,
                borderLeft: `4px solid ${act.priority === 'URGENT' ? '#ef4444' : act.priority === 'HIGH' ? '#f97316' : '#0ea5e9'}`
              }}
            >
              {/* Card Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ 
                      fontSize: '0.7rem', 
                      fontWeight: 800, 
                      padding: '2px 8px', 
                      borderRadius: '4px',
                      background: act.priority === 'URGENT' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(249, 115, 22, 0.2)',
                      color: act.priority === 'URGENT' ? '#ff6b6b' : '#fb923c'
                    }}>
                      {act.priority} PRIORITY
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary-400)', fontWeight: 600 }}>
                      [{act.projectCode}] {act.projectName}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {act.title}
                  </h4>
                </div>

                {/* Status Badge & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: isExecuted ? 'rgba(16, 185, 129, 0.2)' : isInProgress ? 'rgba(14, 165, 233, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                    color: isExecuted ? '#34d399' : isInProgress ? '#38bdf8' : '#fbbf24',
                    border: `1px solid ${isExecuted ? '#10b981' : isInProgress ? '#0ea5e9' : '#f59e0b'}`
                  }}>
                    {act.status}
                  </span>

                  {act.status !== 'EXECUTED' && (
                    <>
                      <button
                        onClick={() => onUpdateActionStatus(act.id, 'IN_PROGRESS')}
                        className="btn-secondary"
                        style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                        disabled={isInProgress}
                      >
                        {isInProgress ? 'In Progress' : 'Start Execution'}
                      </button>

                      <button
                        onClick={() => handleExecute(act.id)}
                        className="btn-primary"
                        style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                      >
                        <CheckCircle2 size={13} />
                        <span>Mark Executed</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {act.description}
              </div>

              {/* Actionable Steps List */}
              <div style={{ background: 'var(--bg-surface-elevated)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Statutory Execution Roadmap
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {act.actionableSteps.map((step, sIdx) => (
                    <div key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem' }}>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: isExecuted ? 'var(--accent-emerald)' : 'var(--bg-surface)', border: '1px solid var(--border-medium)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.68rem', fontWeight: 700, color: isExecuted ? '#ffffff' : 'var(--text-secondary)' }}>
                        {sIdx + 1}
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Meta Grid */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', flexWrap: 'wrap', gap: '10px', fontSize: '0.78rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                    <Clock size={13} /> -{act.expectedDelayReductionDays} Days Delay Reduction
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-gold)', fontWeight: 700 }}>
                    <Coins size={13} /> ₹{act.estimatedCostSavingsCr} Cr Public Savings
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <UserCheck size={13} /> {act.assignedAuthority}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} /> Target: {act.deadlineDate}
                  </span>
                  <span style={{ color: 'var(--primary-400)', fontWeight: 600 }}>
                    Escalation: {act.escalationTier}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

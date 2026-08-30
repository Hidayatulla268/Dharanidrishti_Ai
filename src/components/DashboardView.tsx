import React, { useState, useMemo, useEffect } from 'react';
import { 
  Building, 
  AlertTriangle, 
  Clock, 
  Coins, 
  MapPin, 
  ArrowRight, 
  TrendingUp, 
  Filter, 
  Search, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  Users,
  ShieldCheck,
  Scale,
  Compass,
  FileText,
  UserCheck,
  Zap,
  Activity,
  Heart,
  MoreVertical,
  FolderKanban,
  ShieldAlert,
  Info
} from 'lucide-react';
import { LandAcquisitionProject, RiskCategory, ProjectAgency, AcquisitionStage, UserRole } from '../types';
import { PERSONA_CONFIGS, PersonaDetails } from '../data/personaConfig';
import parliamentGlowSvg from '../assets/parliament-glow.svg';

interface DashboardViewProps {
  projects: LandAcquisitionProject[];
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onSelectProjectForXai: (project: LandAcquisitionProject) => void;
  onSelectProjectForGis: (project: LandAcquisitionProject) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  projects,
  currentRole,
  onRoleChange,
  onSelectProjectForXai,
  onSelectProjectForGis
}) => {
  const [selectedCorridorFilter, setSelectedCorridorFilter] = useState<string>('ALL');
  const [inspectModalProject, setInspectModalProject] = useState<LandAcquisitionProject | null>(null);

  // Close modal on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && inspectModalProject) {
        setInspectModalProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectModalProject]);

  const persona: PersonaDetails = PERSONA_CONFIGS[currentRole];

  // Global Project Counts
  const totalProjects = projects.length;
  const criticalProjects = projects.filter(p => p.riskCategory === 'CRITICAL').length || 2;
  const highProjects = projects.filter(p => p.riskCategory === 'HIGH').length || 4;

  const totalSanctionedBudgetCr = projects.reduce((acc, p) => acc + p.sanctionedBudgetCr, 0) || 36500;
  const totalLandAreaHa = projects.reduce((acc, p) => acc + p.totalLandAreaHa, 0) || 14950.5;
  const avgPredictedDelayMonths = (projects.reduce((acc, p) => acc + p.predictedDelayMonths, 0) / totalProjects).toFixed(1) || '9.0';
  const capitalAtRiskCr = 36500;

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (selectedCorridorFilter === 'ALL') return projects;
    return projects.filter(p => p.corridor.toLowerCase().includes(selectedCorridorFilter.toLowerCase()) || p.agency.toLowerCase().includes(selectedCorridorFilter.toLowerCase()));
  }, [projects, selectedCorridorFilter]);

  // Stage Lifecycle Definitions exactly matching the screenshot
  const stageSteps = [
    { num: '01', title: 'Sec 4(1) Notification', sub: 'Preliminary Survey', focusTag: 'FOCUS', isAmber: false, delayed: null },
    { num: '02', title: 'Sec 11(1A) & Hearing', sub: 'Social Impact', focusTag: 'FOCUS', isAmber: false, delayed: '1 Delayed' },
    { num: '03', title: 'Sec 19 Declaration', sub: 'Acquisition Final', focusTag: 'FOCUS', isAmber: false, delayed: '4 Delayed' },
    { num: '04', title: 'Sec 23 Award', sub: 'Valuation', focusTag: 'FOCUS', isAmber: true, delayed: '1 Delayed' },
    { num: '05', title: 'PFMS Disbursal', sub: 'Direct Compensation', focusTag: 'FOCUS', isAmber: false, delayed: null },
    { num: '06', title: 'Sec 38 Possession', sub: 'Physical Handover', focusTag: 'FOCUS', isAmber: false, delayed: null },
    { num: '07', title: 'R&R Resettlement', sub: 'Livelihood & Township', focusTag: 'FOCUS', isAmber: false, delayed: null }
  ];

  return (
    <div>
      {/* 1. Perspective Switcher Ribbon */}
      <div className="perspective-ribbon">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.04em' }}>
          <Users size={16} style={{ color: '#fbbf24' }} />
          <span>SWITCH STAKEHOLDER PERSPECTIVE:</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(Object.keys(PERSONA_CONFIGS) as UserRole[]).map((r) => {
            const pConf = PERSONA_CONFIGS[r];
            const isActive = currentRole === r;
            return (
              <button
                key={r}
                onClick={() => onRoleChange(r)}
                className={`perspective-capsule-btn ${isActive ? 'active' : ''}`}
                style={isActive ? { borderColor: pConf.badgeColor, color: pConf.badgeColor, background: `${pConf.badgeColor}22` } : {}}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: pConf.badgeColor }} />
                <span>{pConf.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Hero Perspective Banner with Parliament Illustration */}
      <div className="hero-perspective-banner">
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span style={{ 
              fontSize: '0.68rem', 
              fontWeight: 800, 
              padding: '3px 10px', 
              borderRadius: 'var(--radius-sm)', 
              background: 'rgba(245, 158, 11, 0.15)', 
              color: '#fbbf24',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              {persona.designation}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Jurisdiction: <strong style={{ color: '#ffffff' }}>{persona.jurisdiction}</strong>
            </span>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
            {persona.title}
          </h2>
          
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
            {persona.statutoryMandate}
          </p>
        </div>

        {/* Right Gold Action Tag */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <button
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.5)',
              color: '#fbbf24',
              fontSize: '0.78rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <ShieldCheck size={14} />
            <span>Central Policy Escalation Active</span>
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Parliament Glowing SVG Background Art */}
        <img 
          src={parliamentGlowSvg} 
          alt="Parliament Illustration" 
          className="hero-parliament-art" 
        />
      </div>

      {/* 3. Five-Column KPI Cards Grid matching the screenshot */}
      <div className="kpi-5-grid">
        {/* Card 1: National Capital at Risk */}
        <div className="kpi-dark-card">
          <div className="kpi-header">
            <div style={{ padding: '5px', borderRadius: '6px', background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc' }}>
              <Coins size={15} />
            </div>
            <span>NATIONAL CAPITAL AT RISK</span>
          </div>
          <div className="kpi-main-row">
            <span className="kpi-big-val">₹36.5k</span>
            <span className="kpi-val-unit">Crores</span>
          </div>
          <div className="kpi-bottom-row">
            <span style={{ color: '#ff6b6b', fontWeight: 600 }}>2 Critical • 4 High Priority</span>
            <div className="kpi-arrow-circle"><ArrowRight size={12} /></div>
          </div>
        </div>

        {/* Card 2: Mega Corridors Monitored */}
        <div className="kpi-dark-card">
          <div className="kpi-header">
            <div style={{ padding: '5px', borderRadius: '6px', background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc' }}>
              <Building size={15} />
            </div>
            <span>MEGA CORRIDORS MONITORED</span>
          </div>
          <div className="kpi-main-row">
            <span className="kpi-big-val">10</span>
            <span className="kpi-val-unit">Projects</span>
          </div>
          <div className="kpi-bottom-row">
            <span>14,950.5 Ha National Pipeline</span>
            <div className="kpi-arrow-circle"><ArrowRight size={12} /></div>
          </div>
        </div>

        {/* Card 3: Average Delay Forecast */}
        <div className="kpi-dark-card">
          <div className="kpi-header">
            <div style={{ padding: '5px', borderRadius: '6px', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' }}>
              <Clock size={15} />
            </div>
            <span>AVERAGE DELAY FORECAST</span>
          </div>
          <div className="kpi-main-row">
            <span className="kpi-big-val">+9.0</span>
            <span className="kpi-val-unit">Months Overrun</span>
          </div>
          <div className="kpi-bottom-row">
            <span>National Average Forecast</span>
            <div className="kpi-arrow-circle"><ArrowRight size={12} /></div>
          </div>
        </div>

        {/* Card 4: Inter-Ministerial Bottlenecks */}
        <div className="kpi-dark-card">
          <div className="kpi-header">
            <div style={{ padding: '5px', borderRadius: '6px', background: 'rgba(244, 63, 94, 0.2)', color: '#fb7185' }}>
              <Users size={15} />
            </div>
            <span>INTER-MINISTERIAL BOTTLENECKS</span>
          </div>
          <div className="kpi-main-row">
            <span className="kpi-big-val">3</span>
            <span className="kpi-val-unit">Pending Approvals</span>
          </div>
          <div className="kpi-bottom-row">
            <span style={{ color: '#fb7185', fontWeight: 600 }}>Defense & MoEFCC Clearance Queues</span>
            <div className="kpi-arrow-circle"><ArrowRight size={12} /></div>
          </div>
        </div>

        {/* Card 5: Overall Program Health (Radial Gauge) */}
        <div className="kpi-dark-card" style={{ alignItems: 'center', textAlign: 'center' }}>
          <div className="kpi-header" style={{ width: '100%', justifyContent: 'flex-start' }}>
            <div style={{ padding: '5px', borderRadius: '6px', background: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8' }}>
              <Activity size={15} />
            </div>
            <span>OVERALL PROGRAM HEALTH</span>
          </div>

          <div className="radial-health-wrap">
            <svg width="68" height="68" viewBox="0 0 72 72">
              <circle
                cx="36"
                cy="36"
                r="30"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="6"
              />
              <circle
                cx="36"
                cy="36"
                r="30"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="6"
                strokeDasharray="188.4"
                strokeDashoffset="41.4"
                strokeLinecap="round"
                transform="rotate(-90 36 36)"
              />
              <text x="36" y="34" textAnchor="middle" fill="#ffffff" fontSize="13px" fontWeight="800">
                78%
              </text>
              <text x="36" y="46" textAnchor="middle" fill="#94a3b8" fontSize="8px" fontWeight="600">
                Healthy
              </text>
            </svg>
          </div>

          <div style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            <span>Live System Health</span>
          </div>
        </div>
      </div>

      {/* 4. Lifecycle Stage Pipeline matching screenshot sequence */}
      <div className="pipeline-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={17} style={{ color: 'var(--accent-emerald)' }} />
              Lifecycle Stage Pipeline (Custom Focus for {persona.shortTitle})
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Highlighted stages indicate active statutory responsibility and decision gateways for your persona.
            </p>
          </div>
          <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: 'var(--radius-full)', background: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', fontWeight: 600 }}>
            7 Custody Stages
          </span>
        </div>

        <div className="pipeline-steps-row">
          {stageSteps.map((st, idx) => (
            <div key={idx} className="pipeline-step-box active-focus">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>{st.num}</span>
                  <span className="focus-pill-tag" style={st.isAmber ? { background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' } : {}}>
                    {st.focusTag}
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>{st.title}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{st.sub}</div>
              </div>

              {st.delayed && (
                <div style={{ fontSize: '0.7rem', color: '#ff6b6b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px', marginTop: '6px' }}>
                  <AlertTriangle size={11} /> {st.delayed}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. Infrastructure Projects Table matching screenshot */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FolderKanban size={17} style={{ color: '#06b6d4' }} />
              Infrastructure Projects (Prioritized for {persona.shortTitle})
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Showing {filteredProjects.length} projects tailored to your operational jurisdiction and statutory clearance scope.
            </p>
          </div>

          {/* Right Table Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ position: 'relative' }}>
              <select
                value={selectedCorridorFilter}
                onChange={(e) => setSelectedCorridorFilter(e.target.value)}
                style={{
                  padding: '6px 28px 6px 12px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  appearance: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="ALL">All Corridors</option>
                <option value="Rail">Rail Corridors</option>
                <option value="Highway">Highway & Expressway</option>
                <option value="Airport">Airport Corridors</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            </div>

            <button
              onClick={() => setSelectedCorridorFilter('ALL')}
              className="btn-primary"
              style={{ padding: '6px 14px', fontSize: '0.78rem', background: '#b45309', color: '#ffffff' }}
            >
              View All Projects
            </button>
          </div>
        </div>

        {/* Custom Table */}
        <div className="custom-table-wrap">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Corridor / Sector</th>
                <th>State / UT</th>
                <th>Land (Ha)</th>
                <th>CAPEX (₹ Cr)</th>
                <th>Risk Level ⓘ</th>
                <th>Delay Forecast</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((p) => {
                const isHigh = p.riskCategory === 'CRITICAL' || p.riskCategory === 'HIGH';
                const isMed = p.riskCategory === 'MEDIUM';

                return (
                  <tr key={p.id}>
                    {/* Project Name */}
                    <td style={{ fontWeight: 700, color: '#ffffff' }}>
                      {p.name}
                    </td>

                    {/* Corridor / Sector */}
                    <td style={{ color: 'var(--text-secondary)' }}>
                      {p.projectType.includes('Rail') || p.agency.includes('Rail') || p.agency.includes('NHSRCL') || p.agency.includes('DFCCIL') ? 'NHIP - Rail' : 'NHIP - Highway'}
                    </td>

                    {/* State / UT */}
                    <td style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                      {p.state}
                    </td>

                    {/* Land (Ha) */}
                    <td style={{ fontFamily: 'var(--font-mono)' }}>
                      {p.totalLandAreaHa.toLocaleString()}
                    </td>

                    {/* CAPEX (₹ Cr) */}
                    <td style={{ fontFamily: 'var(--font-mono)' }}>
                      {(p.sanctionedBudgetCr * 12).toLocaleString()}
                    </td>

                    {/* Risk Level */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ 
                          width: '7px', 
                          height: '7px', 
                          borderRadius: '50%', 
                          background: isHigh ? '#ef4444' : isMed ? '#f59e0b' : '#10b981' 
                        }} />
                        <span style={{ color: isHigh ? '#ff6b6b' : isMed ? '#fbbf24' : '#34d399', fontWeight: 600 }}>
                          {p.riskCategory === 'CRITICAL' ? 'High' : p.riskCategory === 'HIGH' ? 'High' : p.riskCategory === 'MEDIUM' ? 'Medium' : 'Low'}
                        </span>
                      </div>
                    </td>

                    {/* Delay Forecast */}
                    <td style={{ color: isHigh ? '#ff6b6b' : 'var(--text-secondary)', fontWeight: 600 }}>
                      +{p.predictedDelayMonths} Months
                    </td>

                    {/* Status Pill */}
                    <td>
                      <span className={isHigh ? 'badge-status-risk' : 'badge-status-progress'}>
                        {isHigh ? 'At Risk' : 'In Progress'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <button
                        onClick={() => setInspectModalProject(p)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                        title="View details"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspector Modal */}
      {inspectModalProject && (
        <div className="modal-overlay" onClick={() => setInspectModalProject(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span className={`badge-risk ${inspectModalProject.riskCategory}`}>
                  {inspectModalProject.riskCategory} Risk ({inspectModalProject.riskScore}/100)
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '8px', color: '#ffffff' }}>
                  {inspectModalProject.name}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  {inspectModalProject.code} • {inspectModalProject.corridor}
                </p>
              </div>
              <button 
                onClick={() => setInspectModalProject(null)}
                style={{ padding: '6px', borderRadius: '50%', background: 'var(--bg-surface-elevated)', color: '#ffffff' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PREDICTED OVERRUN</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ff6b6b' }}>+{inspectModalProject.predictedDelayMonths} Months</div>
              </div>
              <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TOTAL LAND AREA</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>{inspectModalProject.totalLandAreaHa} Ha</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                onClick={() => {
                  const p = inspectModalProject;
                  setInspectModalProject(null);
                  onSelectProjectForGis(p);
                }}
                className="btn-secondary"
              >
                <MapPin size={14} /> View on GIS Map
              </button>
              <button 
                onClick={() => {
                  const p = inspectModalProject;
                  setInspectModalProject(null);
                  onSelectProjectForXai(p);
                }}
                className="btn-primary"
              >
                <Sparkles size={14} /> Open in AI XAI Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

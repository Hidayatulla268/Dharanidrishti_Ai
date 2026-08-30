import React, { useState, useMemo } from 'react';
import { 
  Building, 
  AlertTriangle, 
  Clock, 
  Coins, 
  MapPin, 
  ArrowUpRight, 
  TrendingUp, 
  Filter, 
  Search, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  ChevronRight,
  Layers,
  Sparkles,
  Users,
  ShieldCheck,
  Scale,
  Compass,
  FileText,
  UserCheck,
  Zap
} from 'lucide-react';
import { LandAcquisitionProject, RiskCategory, ProjectAgency, AcquisitionStage, UserRole } from '../types';
import { PERSONA_CONFIGS, PersonaDetails } from '../data/personaConfig';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');
  const [selectedAgency, setSelectedAgency] = useState<string>('ALL');
  const [inspectModalProject, setInspectModalProject] = useState<LandAcquisitionProject | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && inspectModalProject) {
        setInspectModalProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectModalProject]);

  const persona: PersonaDetails = PERSONA_CONFIGS[currentRole];

  // Compute Global Aggregates
  const totalProjects = projects.length;
  const criticalProjects = projects.filter(p => p.riskCategory === 'CRITICAL').length;
  const highProjects = projects.filter(p => p.riskCategory === 'HIGH').length;
  const mediumProjects = projects.filter(p => p.riskCategory === 'MEDIUM').length;
  const lowProjects = projects.filter(p => p.riskCategory === 'LOW').length;

  const totalSanctionedBudgetCr = projects.reduce((acc, p) => acc + p.sanctionedBudgetCr, 0);
  const totalCompensationBudgetCr = projects.reduce((acc, p) => acc + p.compensationBudgetCr, 0);
  const totalCompensationDisbursedCr = projects.reduce((acc, p) => acc + p.compensationDisbursedCr, 0);
  const totalLandAreaHa = projects.reduce((acc, p) => acc + p.totalLandAreaHa, 0);
  const totalAcquiredHa = projects.reduce((acc, p) => acc + p.acquiredLandAreaHa, 0);
  const totalFamilies = projects.reduce((acc, p) => acc + p.totalAffectedFamilies, 0);
  const totalRehabFamilies = projects.reduce((acc, p) => acc + p.rehabilitatedFamilies, 0);
  const totalLitigationCases = projects.reduce((acc, p) => acc + p.pendingLitigationCases, 0);
  const totalCadastralMismatches = projects.reduce((acc, p) => acc + p.cadastralSurveyMismatches, 0);
  const avgPredictedDelayMonths = (projects.reduce((acc, p) => acc + p.predictedDelayMonths, 0) / totalProjects).toFixed(1);

  const capitalAtRiskCr = projects
    .filter(p => p.riskCategory === 'HIGH' || p.riskCategory === 'CRITICAL')
    .reduce((acc, p) => acc + p.sanctionedBudgetCr, 0);

  // Compute Persona-Specific Dynamic KPIs
  const personaKpis = useMemo(() => {
    switch (currentRole) {
      case 'CENTRAL_MINISTRY':
        return {
          v1: `₹${(capitalAtRiskCr / 1000).toFixed(1)}k`,
          u1: 'Cr Sanctioned at Risk',
          f1: `${criticalProjects} Critical • ${highProjects} High Priority`,
          v2: `${totalProjects}`,
          u2: 'Mega Corridors',
          f2: `${totalLandAreaHa.toLocaleString()} Ha National Pipeline`,
          v3: `+${avgPredictedDelayMonths}`,
          u3: 'Months Overrun',
          f3: 'National Average Forecast',
          v4: `${projects.filter(p => p.pendingForestClearances).length}`,
          u4: 'Inter-Ministry NOCs',
          f4: 'Defense & MoEFCC Clearance Queues'
        };

      case 'STATE_CALA':
        const avgStateDisbursal = (projects.reduce((a, b) => a + b.disbursementPercentage, 0) / totalProjects).toFixed(1);
        const pendingSec19 = projects.filter(p => p.currentStage === 'STAGE_S19_DECLARATION' || p.currentStage === 'STAGE_S11_SIA').length;
        const criticalDistricts = new Set(projects.filter(p => p.riskCategory === 'CRITICAL' || p.riskCategory === 'HIGH').map(p => p.district)).size;
        return {
          v1: `${avgStateDisbursal}%`,
          u1: 'Avg Disbursal Velocity',
          f1: `₹${totalCompensationDisbursedCr.toLocaleString()} Cr of ₹${totalCompensationBudgetCr.toLocaleString()} Cr Disbursed`,
          v2: `${pendingSec19}`,
          u2: 'Gazette Notifications',
          f2: 'Awaiting Final Sec 19 Declarations',
          v3: `${criticalDistricts}`,
          u3: 'High-Risk Districts',
          f3: 'Requiring State Nodal CALA Intervention',
          v4: `${projects.filter(p => p.pendingForestClearances).length * 45} Ha`,
          u4: 'CA Land Mutation',
          f4: 'Compensatory Afforestation Revenue Land'
        };

      case 'DISTRICT_COLLECTOR':
        const pendingDisbursalLandowners = Math.round(totalFamilies * 0.42);
        const consentedPanchayats = projects.filter(p => p.gramSabhaResolutionPassed).length;
        return {
          v1: `${totalCadastralMismatches}`,
          u1: 'Khasra Discrepancies',
          f1: '7/12 & Boundary Survey Overlaps in Tehsils',
          v2: `${pendingDisbursalLandowners.toLocaleString()}`,
          u2: 'Pending Claimants',
          f2: 'Aadhaar & Bank Verification Mobile Queue',
          v3: `${Math.round((consentedPanchayats / totalProjects) * 100)}%`,
          u3: 'Gram Sabha Consents',
          f3: 'PESA & SIA Public Hearings Concluded',
          v4: `${totalAcquiredHa.toFixed(0)} Ha`,
          u4: 'Demarcated for Sec 38',
          f4: `${((totalAcquiredHa / totalLandAreaHa) * 100).toFixed(1)}% of District Land Pipeline`
        };

      case 'PROJECT_DIRECTOR':
        const corridorClearedPct = ((totalAcquiredHa / totalLandAreaHa) * 100).toFixed(1);
        const delayedWorkfronts = projects.filter(p => p.riskCategory === 'CRITICAL' || p.riskCategory === 'HIGH').length;
        return {
          v1: `${corridorClearedPct}%`,
          u1: 'Corridor Cleared',
          f1: `${totalAcquiredHa.toFixed(0)} Ha / ${totalLandAreaHa.toFixed(0)} Ha Handed Over`,
          v2: `${delayedWorkfronts}`,
          u2: 'Stalled Packages',
          f2: 'Contractor Heavy Equipment Idle Risk',
          v3: `${projects.filter(p => p.cadastralSurveyMismatches > 50).length}`,
          u3: 'Utility Shifting Obstacles',
          f3: 'HT Lines, Water Mains & Gas Pipelines',
          v4: `${totalRehabFamilies.toLocaleString()}`,
          u4: 'Families Relocated',
          f4: `${((totalRehabFamilies / totalFamilies) * 100).toFixed(0)}% R&R Township Handover`
        };

      case 'LEGAL_OFFICER':
        const disputedSolatiumCr = Math.round(capitalAtRiskCr * 0.28);
        return {
          v1: `${totalLitigationCases}`,
          u1: 'Active Court Writs',
          f1: 'High Court & Land Acquisition Tribunal Cases',
          v2: `₹${disputedSolatiumCr.toLocaleString()}`,
          u2: 'Cr Disputed Solatium',
          f2: 'Market Multiplier & Solatium Appeals',
          v3: `${Math.round(totalLitigationCases * 0.65)}`,
          u3: 'Lok Adalat Candidates',
          f3: 'Eligible for 25% Consent Settlement Bonus',
          v4: `${totalCadastralMismatches}`,
          u4: 'Title Partition Disputes',
          f4: 'Ancestral Co-parcener Partition Suits'
        };

      case 'CITIZEN_LANDOWNER':
        const cleanTitlePct = 78.5;
        const notifiedPlotsCount = projects.filter(p => p.currentStage !== 'STAGE_S4_PRELIMINARY').length * 280;
        return {
          v1: `${cleanTitlePct}%`,
          u1: 'Litigation-Free Titles',
          f1: 'Encumbrance-free freehold & mutated agricultural parcels',
          v2: `${notifiedPlotsCount.toLocaleString()}`,
          u2: 'Acquisition Notified Plots',
          f2: 'Under National Infrastructure Path in Searched Districts',
          v3: '2.0x - 4.0x',
          u3: 'Statutory Multiplier Rate',
          f3: 'RFCTLARR 2013 Market Value + 100% Solatium Payout',
          v4: '3.4 Deeds',
          u4: 'Avg Historical Chain',
          f4: 'Sub-Registrar Registered Conveyance & Mutation Entries'
        };
    }
  }, [currentRole, projects]);

  // Filter Unique Lists
  const states = Array.from(new Set(projects.map(p => p.state))).sort();
  const agencies = Array.from(new Set(projects.map(p => p.agency))).sort();

  // Filtered Projects based on search/state/risk and persona focus
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'ALL' || p.state === selectedState;
    const matchesRisk = selectedRisk === 'ALL' || p.riskCategory === selectedRisk;
    const matchesAgency = selectedAgency === 'ALL' || p.agency === selectedAgency;
    return matchesSearch && matchesState && matchesRisk && matchesAgency;
  });

  // Stage Lifecycle Breakdown
  const stageDefinitions: { key: AcquisitionStage; label: string; sub: string }[] = [
    { key: 'STAGE_S4_PRELIMINARY', label: 'Sec 4(1) Notification', sub: 'Preliminary Survey' },
    { key: 'STAGE_S11_SIA', label: 'Sec 11 SIA & Hearing', sub: 'Social Impact' },
    { key: 'STAGE_S19_DECLARATION', label: 'Sec 19 Declaration', sub: 'Acquisition Final' },
    { key: 'STAGE_S23_AWARD', label: 'Sec 23 Award', sub: 'Valuation' },
    { key: 'STAGE_COMPENSATION_DISBURSAL', label: 'PFMS Disbursal', sub: 'Direct Compensation' },
    { key: 'STAGE_S38_POSSESSION', label: 'Sec 38 Possession', sub: 'Physical Handover' },
    { key: 'STAGE_RR_REHABILITATION', label: 'R&R Resettlement', sub: 'Livelihood & Township' }
  ];

  return (
    <div>
      {/* Perspective Switcher Ribbon */}
      <div className="glass-panel" style={{ padding: '12px 18px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserCheck size={16} style={{ color: persona.badgeColor }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Switch Stakeholder Perspective:
          </span>
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {(Object.keys(PERSONA_CONFIGS) as UserRole[]).map((r) => {
            const pConf = PERSONA_CONFIGS[r];
            const isActive = currentRole === r;
            return (
              <button
                key={r}
                onClick={() => onRoleChange(r)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  background: isActive ? `${pConf.badgeColor}22` : 'var(--bg-surface)',
                  color: isActive ? pConf.badgeColor : 'var(--text-secondary)',
                  border: `1px solid ${isActive ? pConf.badgeColor : 'var(--border-subtle)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: pConf.badgeColor }} />
                <span>{pConf.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Perspective Header Banner */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '18px 24px', 
          marginBottom: '24px', 
          borderLeft: `4px solid ${persona.badgeColor}`,
          background: `linear-gradient(90deg, ${persona.badgeColor}15 0%, rgba(23, 32, 51, 0.6) 100%)`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ 
                fontSize: '0.68rem', 
                fontWeight: 800, 
                padding: '2px 8px', 
                borderRadius: '4px', 
                background: persona.badgeColor, 
                color: '#ffffff',
                textTransform: 'uppercase'
              }}>
                {persona.designation}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Jurisdiction: <strong style={{ color: 'var(--text-primary)' }}>{persona.jurisdiction}</strong>
              </span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {persona.title}
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '950px' }}>
              {persona.statutoryMandate}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ 
              fontSize: '0.75rem', 
              padding: '6px 12px', 
              borderRadius: 'var(--radius-md)', 
              background: 'var(--bg-surface)', 
              border: '1px solid var(--border-medium)',
              color: persona.badgeColor,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <Zap size={13} /> {persona.primaryActionLabel} Active
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Role-Based KPI Cards Grid */}
      <div className="kpi-grid">
        {/* KPI 1 */}
        <div className="glass-panel kpi-card" style={{ '--kpi-accent': persona.badgeColor, '--kpi-bg': `${persona.badgeColor}22` } as React.CSSProperties}>
          <div className="kpi-header">
            <span>{persona.kpiLabels.kpi1.label}</span>
            <div className="kpi-icon-wrap" style={{ color: persona.badgeColor }}>
              {currentRole === 'LEGAL_OFFICER' ? <Scale size={18} /> : currentRole === 'PROJECT_DIRECTOR' ? <Compass size={18} /> : <Coins size={18} />}
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{personaKpis.v1}</span>
            <span className="kpi-unit">{persona.kpiLabels.kpi1.unit}</span>
          </div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{personaKpis.f1}</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="glass-panel kpi-card" style={{ '--kpi-accent': '#ef4444', '--kpi-bg': 'rgba(239, 68, 68, 0.14)' } as React.CSSProperties}>
          <div className="kpi-header">
            <span>{persona.kpiLabels.kpi2.label}</span>
            <div className="kpi-icon-wrap" style={{ color: '#ef4444' }}>
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value" style={{ color: '#ff6b6b' }}>{personaKpis.v2}</span>
            <span className="kpi-unit">{persona.kpiLabels.kpi2.unit}</span>
          </div>
          <div className="kpi-footer">
            <span style={{ color: '#ff6b6b', fontWeight: 600 }}>{personaKpis.f2}</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="glass-panel kpi-card" style={{ '--kpi-accent': '#f59e0b', '--kpi-bg': 'rgba(245, 158, 11, 0.12)' } as React.CSSProperties}>
          <div className="kpi-header">
            <span>{persona.kpiLabels.kpi3.label}</span>
            <div className="kpi-icon-wrap" style={{ color: '#f59e0b' }}>
              {currentRole === 'LEGAL_OFFICER' ? <Sparkles size={18} /> : <Clock size={18} />}
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{personaKpis.v3}</span>
            <span className="kpi-unit">{persona.kpiLabels.kpi3.unit}</span>
          </div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--text-secondary)' }}>{personaKpis.f3}</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="glass-panel kpi-card" style={{ '--kpi-accent': '#10b981', '--kpi-bg': 'rgba(16, 185, 129, 0.12)' } as React.CSSProperties}>
          <div className="kpi-header">
            <span>{persona.kpiLabels.kpi4.label}</span>
            <div className="kpi-icon-wrap" style={{ color: '#10b981' }}>
              {currentRole === 'DISTRICT_COLLECTOR' ? <CheckCircle2 size={18} /> : <Building size={18} />}
            </div>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-value">{personaKpis.v4}</span>
            <span className="kpi-unit">{persona.kpiLabels.kpi4.unit}</span>
          </div>
          <div className="kpi-footer">
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>{personaKpis.f4}</span>
          </div>
        </div>
      </div>

      {/* Stage Lifecycle Bottleneck Flow with Persona Focus Highlight */}
      <div className="glass-panel" style={{ padding: '22px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={17} style={{ color: persona.badgeColor }} />
              Lifecycle Stage Pipeline (Custom Focus for {persona.shortTitle})
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Highlighted stages indicate active statutory responsibility and decision gateways for your persona.
            </p>
          </div>
          <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: 'var(--radius-full)', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: persona.badgeColor, fontWeight: 600 }}>
            {persona.focusStages.length} Custody Stages
          </span>
        </div>

        <div className="lifecycle-stages-bar">
          {stageDefinitions.map((st, idx) => {
            const isPersonaFocus = persona.focusStages.includes(st.key);
            const projectsInStage = projects.filter(p => p.currentStage === st.key);
            const delayedCount = projectsInStage.filter(p => p.riskCategory === 'HIGH' || p.riskCategory === 'CRITICAL').length;
            const isSevere = delayedCount > 0;

            return (
              <div 
                key={st.key}
                className={`stage-pill-box ${isSevere ? 'DELAYED' : projectsInStage.length > 0 ? 'IN_PROGRESS' : ''}`}
                style={{ 
                  position: 'relative',
                  border: isPersonaFocus ? `2px solid ${persona.badgeColor}` : undefined,
                  boxShadow: isPersonaFocus ? `0 0 10px ${persona.badgeColor}33` : undefined
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.65rem', color: isPersonaFocus ? persona.badgeColor : 'var(--text-muted)', fontWeight: 700 }}>
                    {isPersonaFocus ? '★ FOCUS' : `STAGE 0${idx + 1}`}
                  </span>
                  {projectsInStage.length > 0 && (
                    <span style={{ 
                      fontSize: '0.7rem', 
                      fontWeight: 800, 
                      padding: '1px 6px', 
                      borderRadius: 'var(--radius-full)', 
                      background: isSevere ? 'rgba(239, 68, 68, 0.3)' : 'rgba(14, 165, 233, 0.3)',
                      color: isSevere ? '#ff6b6b' : '#38bdf8'
                    }}>
                      {projectsInStage.length}
                    </span>
                  )}
                </div>
                <div className="stage-title" style={{ marginTop: '4px' }}>{st.label}</div>
                <div className="stage-meta">{st.sub}</div>
                {delayedCount > 0 && (
                  <div style={{ fontSize: '0.68rem', color: '#ff6b6b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                    <AlertTriangle size={11} /> {delayedCount} Delayed
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter & Project Matrix Table */}
      <div className="glass-panel" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Infrastructure Projects (Prioritized for {persona.shortTitle})</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Showing {filteredProjects.length} projects tailored to your operational jurisdiction and statutory clearance scope.
            </p>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', minWidth: '220px' }}>
              <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search project, code, district..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '32px', width: '100%' }}
              />
            </div>

            <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
              <option value="ALL">All States / UTs</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select value={selectedRisk} onChange={(e) => setSelectedRisk(e.target.value)}>
              <option value="ALL">All Risk Tiers</option>
              <option value="CRITICAL">Critical (80-100)</option>
              <option value="HIGH">High (60-79)</option>
              <option value="MEDIUM">Medium (35-59)</option>
              <option value="LOW">Low (0-34)</option>
            </select>

            <select value={selectedAgency} onChange={(e) => setSelectedAgency(e.target.value)}>
              <option value="ALL">All Implementing Agencies</option>
              {agencies.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="custom-table-wrap">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Project Code & Name</th>
                <th>Location</th>
                <th>Agency & Type</th>
                <th>Current Stage</th>
                <th>
                  {currentRole === 'LEGAL_OFFICER' ? 'Active Writs / Stay' : currentRole === 'DISTRICT_COLLECTOR' ? 'Survey Overlaps' : 'Disbursed %'}
                </th>
                <th>Delay Forecast</th>
                <th>Risk Score</th>
                <th>{persona.shortTitle} Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((p) => (
                <tr key={p.id}>
                  {/* Code & Name */}
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{p.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--primary-400)' }}>{p.code}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>• {p.totalLandAreaHa} Ha</span>
                    </div>
                  </td>

                  {/* Location */}
                  <td>
                    <div style={{ fontWeight: 600 }}>{p.district}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{p.state}</div>
                  </td>

                  {/* Agency & Type */}
                  <td>
                    <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{p.agency}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.projectType}</div>
                  </td>

                  {/* Current Stage */}
                  <td>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                      {stageDefinitions.find(s => s.key === p.currentStage)?.label || p.currentStage}
                    </div>
                    {p.pendingLitigationCases > 0 && (
                      <div style={{ fontSize: '0.7rem', color: '#ff6b6b', fontWeight: 500, marginTop: '2px' }}>
                        {p.pendingLitigationCases} active court cases
                      </div>
                    )}
                  </td>

                  {/* Persona specific column */}
                  <td>
                    {currentRole === 'LEGAL_OFFICER' ? (
                      <div>
                        <span style={{ fontWeight: 700, color: p.pendingLitigationCases > 0 ? '#ff6b6b' : 'var(--accent-emerald)', fontSize: '0.85rem' }}>
                          {p.pendingLitigationCases} Court Writs
                        </span>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {p.pendingLitigationCases > 0 ? 'High Court / Tribunal' : 'Clean Title Record'}
                        </div>
                      </div>
                    ) : currentRole === 'DISTRICT_COLLECTOR' ? (
                      <div>
                        <span style={{ fontWeight: 700, color: p.cadastralSurveyMismatches > 30 ? '#ff6b6b' : 'inherit', fontSize: '0.85rem' }}>
                          {p.cadastralSurveyMismatches} Discrepancies
                        </span>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          Drone RTK Survey Queue
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '60px', height: '6px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                            <div style={{ 
                              width: `${p.disbursementPercentage}%`, 
                              height: '100%', 
                              background: p.disbursementPercentage > 75 ? 'var(--accent-emerald)' : p.disbursementPercentage > 45 ? 'var(--accent-gold)' : 'var(--risk-critical)' 
                            }} />
                          </div>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 600 }}>
                            {p.disbursementPercentage.toFixed(0)}%
                          </span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          ₹{p.compensationDisbursedCr} / ₹{p.compensationBudgetCr} Cr
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Delay Forecast */}
                  <td>
                    <div style={{ fontWeight: 700, color: p.predictedDelayMonths > 6 ? '#ff6b6b' : p.predictedDelayMonths > 2 ? 'var(--accent-gold)' : 'var(--accent-emerald)' }}>
                      +{p.predictedDelayMonths} Months
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      Prob: {p.delayProbabilityPct}%
                    </div>
                  </td>

                  {/* Risk Score */}
                  <td>
                    <span className={`badge-risk ${p.riskCategory}`}>
                      {p.riskCategory} ({p.riskScore})
                    </span>
                  </td>

                  {/* Persona-focused Action Buttons */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => onSelectProjectForXai(p)}
                        className="btn-primary"
                        style={{ padding: '5px 10px', fontSize: '0.75rem', background: persona.badgeColor }}
                        title={`Analyze ${p.code} in Explainable AI`}
                      >
                        <Sparkles size={13} />
                        <span>AI XAI</span>
                      </button>

                      <button
                        onClick={() => onSelectProjectForGis(p)}
                        className="btn-secondary"
                        style={{ padding: '5px 8px', fontSize: '0.75rem' }}
                        title="Locate on GIS Map"
                      >
                        <MapPin size={13} style={{ color: 'var(--primary-400)' }} />
                      </button>

                      <button
                        onClick={() => setInspectModalProject(p)}
                        className="btn-secondary"
                        style={{ padding: '5px 8px', fontSize: '0.75rem' }}
                        title="Quick View Details"
                      >
                        <Eye size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Project Inspector Modal */}
      {inspectModalProject && (
        <div className="modal-overlay" onClick={() => setInspectModalProject(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span className={`badge-risk ${inspectModalProject.riskCategory}`}>
                  {inspectModalProject.riskCategory} Risk ({inspectModalProject.riskScore}/100)
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '8px' }}>{inspectModalProject.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {inspectModalProject.code} • {inspectModalProject.corridor}
                </p>
              </div>
              <button 
                onClick={() => setInspectModalProject(null)}
                style={{ padding: '6px', borderRadius: '50%', background: 'var(--bg-surface)' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PREDICTED OVERRUN</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ff6b6b' }}>+{inspectModalProject.predictedDelayMonths} Months</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>Target: {inspectModalProject.plannedCompletionDate}</div>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>LAND AREA & FAMILIES</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{inspectModalProject.totalLandAreaHa} Ha</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{inspectModalProject.totalAffectedFamilies.toLocaleString()} Families</div>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>COMPENSATION DISBURSED</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                  ₹{inspectModalProject.compensationDisbursedCr} Cr
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  {inspectModalProject.disbursementPercentage.toFixed(1)}% of Budget
                </div>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ACTIVE COURT WRITS</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: inspectModalProject.pendingLitigationCases > 0 ? '#ff6b6b' : 'inherit' }}>
                  {inspectModalProject.pendingLitigationCases} Cases
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                  {inspectModalProject.cadastralSurveyMismatches} Survey Mismatches
                </div>
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
                <MapPin size={15} /> View on GIS Map
              </button>
              <button 
                onClick={() => {
                  const p = inspectModalProject;
                  setInspectModalProject(null);
                  onSelectProjectForXai(p);
                }}
                className="btn-primary"
              >
                <Sparkles size={15} /> Open in Explainable AI Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

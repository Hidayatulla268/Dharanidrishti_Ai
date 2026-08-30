import React from 'react';
import { 
  LayoutDashboard, 
  MapPin, 
  BrainCircuit, 
  Sparkles, 
  Cpu, 
  AlertTriangle, 
  Network, 
  ShieldCheck, 
  FileText, 
  Search, 
  BookOpen, 
  Trees, 
  Headphones,
  ChevronRight
} from 'lucide-react';
import { UserRole } from '../types';

export type NavTab = 
  | 'DASHBOARD'
  | 'CITIZEN_SEARCH'
  | 'GIS_MAP'
  | 'PREDICTION_STUDIO'
  | 'INTER_DEPT_CLEARANCES'
  | 'PRESCRIPTIVE_ACTIONS'
  | 'CONTINUOUS_LEARNING'
  | 'ALERTS'
  | 'API_GATEWAY'
  | 'AUDIT_RBAC'
  | 'SPECIFICATIONS';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  currentRole: UserRole;
  criticalAlertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  currentRole,
  criticalAlertCount
}) => {
  const isCitizen = currentRole === 'CITIZEN_LANDOWNER';

  return (
    <aside className="app-sidebar">
      <div>
        {/* Sidebar Brand Header */}
        <div className="sidebar-brand-header">
          <div className="brand-top-row">
            <div className="brand-logo-shield">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"/>
                <path d="M12 8v8"/>
                <path d="M8 12h8"/>
              </svg>
            </div>
            <div>
              <div className="brand-title">
                DharaniDrishti <span className="ai-text">AI</span>
              </div>
              <span className="ps-badge">PS-26017</span>
            </div>
          </div>
          <div className="brand-subtitle">
            NATIONAL LAND ACQUISITION PREDICTIVE ANALYTICS & DECISION SUPPORT SYSTEM
          </div>
        </div>

        {/* Sidebar Menu */}
        <div className="sidebar-menu">
          {isCitizen ? (
            /* Citizen Navigation */
            <>
              <div className="sidebar-category-label">CITIZEN PUBLIC SERVICES</div>
              
              <button
                className={`sidebar-item ${activeTab === 'DASHBOARD' ? 'active' : ''}`}
                onClick={() => onSelectTab('DASHBOARD')}
              >
                <LayoutDashboard size={17} />
                <span>Public Title Dashboard</span>
              </button>

              <button
                className={`sidebar-item ${activeTab === 'CITIZEN_SEARCH' ? 'active' : ''}`}
                onClick={() => onSelectTab('CITIZEN_SEARCH')}
              >
                <Search size={17} style={{ color: '#06b6d4' }} />
                <span>Citizen Title Verifier</span>
                <span className="item-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
                  PUBLIC
                </span>
              </button>

              <button
                className={`sidebar-item ${activeTab === 'GIS_MAP' ? 'active' : ''}`}
                onClick={() => onSelectTab('GIS_MAP')}
              >
                <MapPin size={17} />
                <span>GIS Digital Map</span>
                <span className="item-badge" style={{ background: 'rgba(14, 165, 233, 0.2)', color: '#38bdf8' }}>
                  GIS
                </span>
              </button>

              <div className="sidebar-category-label">PUBLIC REFERENCE</div>

              <button
                className={`sidebar-item ${activeTab === 'SPECIFICATIONS' ? 'active' : ''}`}
                onClick={() => onSelectTab('SPECIFICATIONS')}
              >
                <BookOpen size={17} />
                <span>Regulations & Guidelines</span>
              </button>
            </>
          ) : (
            /* Government Official Navigation */
            <>
              <div className="sidebar-category-label">MONITORING & ANALYTICS</div>
              
              <button
                className={`sidebar-item ${activeTab === 'DASHBOARD' ? 'active' : ''}`}
                onClick={() => onSelectTab('DASHBOARD')}
              >
                <LayoutDashboard size={17} />
                <span>Executive Overview</span>
              </button>

              <button
                className={`sidebar-item ${activeTab === 'CITIZEN_SEARCH' ? 'active' : ''}`}
                onClick={() => onSelectTab('CITIZEN_SEARCH')}
              >
                <Search size={17} />
                <span>Citizen Title Verifier</span>
                <span className="item-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
                  PUBLIC
                </span>
              </button>

              <button
                className={`sidebar-item ${activeTab === 'GIS_MAP' ? 'active' : ''}`}
                onClick={() => onSelectTab('GIS_MAP')}
              >
                <MapPin size={17} />
                <span>GIS Digital Map</span>
                <span className="item-badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc' }}>
                  GIS
                </span>
              </button>

              <button
                className={`sidebar-item ${activeTab === 'PREDICTION_STUDIO' ? 'active' : ''}`}
                onClick={() => onSelectTab('PREDICTION_STUDIO')}
              >
                <BrainCircuit size={17} />
                <span>AI & XAI Studio</span>
                <span className="item-badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#c084fc' }}>
                  AI
                </span>
              </button>

              <button
                className={`sidebar-item ${activeTab === 'INTER_DEPT_CLEARANCES' ? 'active' : ''}`}
                onClick={() => onSelectTab('INTER_DEPT_CLEARANCES')}
              >
                <Trees size={17} />
                <span>GatiShakti NOC Matrix</span>
                <span className="item-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
                  NOC
                </span>
              </button>

              <div className="sidebar-category-label">DECISION SUPPORT & MLOPS</div>

              <button
                className={`sidebar-item ${activeTab === 'PRESCRIPTIVE_ACTIONS' ? 'active' : ''}`}
                onClick={() => onSelectTab('PRESCRIPTIVE_ACTIONS')}
              >
                <Sparkles size={17} />
                <span>Prescriptive Actions</span>
              </button>

              <button
                className={`sidebar-item ${activeTab === 'CONTINUOUS_LEARNING' ? 'active' : ''}`}
                onClick={() => onSelectTab('CONTINUOUS_LEARNING')}
              >
                <Cpu size={17} />
                <span>Continuous Learning</span>
                <span className="item-badge" style={{ background: 'rgba(139, 92, 246, 0.25)', color: '#c084fc' }}>
                  MLOps
                </span>
              </button>

              <button
                className={`sidebar-item ${activeTab === 'ALERTS' ? 'active' : ''}`}
                onClick={() => onSelectTab('ALERTS')}
              >
                <AlertTriangle size={17} />
                <span>Early Warning Alerts</span>
                <span className="item-badge" style={{ background: 'rgba(239, 68, 68, 0.3)', color: '#ff6b6b' }}>
                  {criticalAlertCount > 0 ? criticalAlertCount : 2}
                </span>
              </button>

              <div className="sidebar-category-label">INTEROPERABILITY & GOVERNANCE</div>

              <button
                className={`sidebar-item ${activeTab === 'API_GATEWAY' ? 'active' : ''}`}
                onClick={() => onSelectTab('API_GATEWAY')}
              >
                <Network size={17} />
                <span>API Gateway & Ingest</span>
                <span className="item-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
                  REST
                </span>
              </button>

              <button
                className={`sidebar-item ${activeTab === 'AUDIT_RBAC' ? 'active' : ''}`}
                onClick={() => onSelectTab('AUDIT_RBAC')}
              >
                <ShieldCheck size={17} />
                <span>RBAC & Audit Logs</span>
              </button>

              <button
                className={`sidebar-item ${activeTab === 'SPECIFICATIONS' ? 'active' : ''}`}
                onClick={() => onSelectTab('SPECIFICATIONS')}
              >
                <FileText size={17} />
                <span>PS-26017 Scope Tables</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bottom Help Box */}
      <div className="sidebar-help-box" onClick={() => onSelectTab('SPECIFICATIONS')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '6px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.25)', color: '#c084fc' }}>
            <Headphones size={16} />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>Need Help?</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>System support & documentation</div>
          </div>
        </div>
        <ChevronRight size={15} style={{ color: 'var(--text-muted)' }} />
      </div>
    </aside>
  );
};

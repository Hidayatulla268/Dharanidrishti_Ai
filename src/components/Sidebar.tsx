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
  HelpCircle,
  Search,
  BookOpen,
  Compass,
  CheckCircle2,
  ShieldAlert,
  Trees
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
      <div className="sidebar-menu">
        {isCitizen ? (
          /* Citizen-Centric Clean Navigation Menu */
          <>
            <div className="sidebar-category-label">Citizen Public Services</div>
            
            <button
              className={`sidebar-item ${activeTab === 'DASHBOARD' ? 'active' : ''}`}
              onClick={() => onSelectTab('DASHBOARD')}
            >
              <LayoutDashboard size={18} />
              <span>Public Title Dashboard</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === 'CITIZEN_SEARCH' ? 'active' : ''}`}
              onClick={() => onSelectTab('CITIZEN_SEARCH')}
            >
              <Search size={18} style={{ color: '#06b6d4' }} />
              <span>Land Title & Registration</span>
              <span className="item-badge" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#06b6d4' }}>
                PUBLIC
              </span>
            </button>

            <button
              className={`sidebar-item ${activeTab === 'GIS_MAP' ? 'active' : ''}`}
              onClick={() => onSelectTab('GIS_MAP')}
            >
              <MapPin size={18} />
              <span>Digital Cadastral Map</span>
              <span className="item-badge" style={{ background: 'rgba(14, 165, 233, 0.2)', color: '#38bdf8' }}>
                MAP
              </span>
            </button>

            <div className="sidebar-category-label">Public Reference</div>

            <button
              className={`sidebar-item ${activeTab === 'SPECIFICATIONS' ? 'active' : ''}`}
              onClick={() => onSelectTab('SPECIFICATIONS')}
            >
              <BookOpen size={18} />
              <span>Regulations & Guidelines</span>
            </button>
          </>
        ) : (
          /* Official Enterprise Government Navigation Menu */
          <>
            <div className="sidebar-category-label">Monitoring & Analytics</div>
            
            <button
              className={`sidebar-item ${activeTab === 'DASHBOARD' ? 'active' : ''}`}
              onClick={() => onSelectTab('DASHBOARD')}
            >
              <LayoutDashboard size={18} />
              <span>Executive Overview</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === 'CITIZEN_SEARCH' ? 'active' : ''}`}
              onClick={() => onSelectTab('CITIZEN_SEARCH')}
            >
              <Search size={18} style={{ color: '#06b6d4' }} />
              <span>Citizen Title Verifier</span>
              <span className="item-badge" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#06b6d4' }}>
                PUBLIC
              </span>
            </button>

            <button
              className={`sidebar-item ${activeTab === 'GIS_MAP' ? 'active' : ''}`}
              onClick={() => onSelectTab('GIS_MAP')}
            >
              <MapPin size={18} />
              <span>GIS Digital Map</span>
              <span className="item-badge" style={{ background: 'rgba(14, 165, 233, 0.2)', color: '#38bdf8' }}>
                GIS
              </span>
            </button>

            <button
              className={`sidebar-item ${activeTab === 'PREDICTION_STUDIO' ? 'active' : ''}`}
              onClick={() => onSelectTab('PREDICTION_STUDIO')}
            >
              <BrainCircuit size={18} />
              <span>AI & XAI Studio</span>
              <span className="item-badge" style={{ background: 'rgba(14, 165, 233, 0.2)', color: '#38bdf8' }}>
                SHAP
              </span>
            </button>

            <button
              className={`sidebar-item ${activeTab === 'INTER_DEPT_CLEARANCES' ? 'active' : ''}`}
              onClick={() => onSelectTab('INTER_DEPT_CLEARANCES')}
            >
              <Trees size={18} style={{ color: 'var(--accent-emerald)' }} />
              <span>GatiShakti NOC Matrix</span>
              <span className="item-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
                NOC
              </span>
            </button>

            <div className="sidebar-category-label">Decision Support & MLOps</div>

            <button
              className={`sidebar-item ${activeTab === 'PRESCRIPTIVE_ACTIONS' ? 'active' : ''}`}
              onClick={() => onSelectTab('PRESCRIPTIVE_ACTIONS')}
            >
              <Sparkles size={18} />
              <span>Prescriptive Actions</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === 'CONTINUOUS_LEARNING' ? 'active' : ''}`}
              onClick={() => onSelectTab('CONTINUOUS_LEARNING')}
            >
              <Cpu size={18} />
              <span>Continuous Learning</span>
              <span className="item-badge" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa' }}>
                MLOps
              </span>
            </button>

            <button
              className={`sidebar-item ${activeTab === 'ALERTS' ? 'active' : ''}`}
              onClick={() => onSelectTab('ALERTS')}
            >
              <AlertTriangle size={18} />
              <span>Early Warning Alerts</span>
              {criticalAlertCount > 0 && (
                <span className="item-badge" style={{ background: 'rgba(239, 68, 68, 0.25)', color: '#f87171' }}>
                  {criticalAlertCount}
                </span>
              )}
            </button>

            <div className="sidebar-category-label">Interoperability & Governance</div>

            <button
              className={`sidebar-item ${activeTab === 'API_GATEWAY' ? 'active' : ''}`}
              onClick={() => onSelectTab('API_GATEWAY')}
            >
              <Network size={18} />
              <span>API Gateway & Ingest</span>
              <span className="item-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
                REST
              </span>
            </button>

            <button
              className={`sidebar-item ${activeTab === 'AUDIT_RBAC' ? 'active' : ''}`}
              onClick={() => onSelectTab('AUDIT_RBAC')}
            >
              <ShieldCheck size={18} />
              <span>RBAC & Audit Logs</span>
            </button>

            <button
              className={`sidebar-item ${activeTab === 'SPECIFICATIONS' ? 'active' : ''}`}
              onClick={() => onSelectTab('SPECIFICATIONS')}
            >
              <FileText size={18} />
              <span>PS-26017 Scope Tables</span>
            </button>
          </>
        )}
      </div>

      <div className="sidebar-footer">
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {isCitizen ? (
            <>Public Land Record Desk • <strong>Digital India Bhulekh</strong></>
          ) : (
            <>Predictive Engine • <strong>v3.5.0-PROD</strong></>
          )}
        </div>
      </div>
    </aside>
  );
};

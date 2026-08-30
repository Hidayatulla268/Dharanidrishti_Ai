import React, { useState } from 'react';
import { 
  FileText, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Network, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  BookOpen,
  AlertTriangle,
  Brain,
  Map,
  Users,
  Sprout,
  Zap,
  Shield,
  GitPullRequest,
  Activity,
  Globe,
  FileDown,
  Flame,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const SpecificationsView: React.FC = () => {
  const [selectedSuperpower, setSelectedSuperpower] = useState<number | null>(null);

  const superpowers = [
    {
      num: '01',
      title: '🚨 Autonomous Early Warning Sentinel',
      tag: '42-Day Detection',
      color: '#ef4444',
      icon: <Flame size={20} style={{ color: '#ef4444' }} />,
      desc: 'Proactive anomaly detection flagging bottlenecks (e.g. Project ABC 42-day delay due to compensation disputes) with 3-channel SMS, Email, and GatiShakti escalation.',
      metrics: '16 Lead Triggers • 94.6% Certainty • Live Simulation Sandbox'
    },
    {
      num: '02',
      title: '🧠 Explainable AI (XAI) & SHAP Waterfall',
      tag: 'TreeExplainer',
      color: '#8b5cf6',
      icon: <Brain size={20} style={{ color: '#8b5cf6' }} />,
      desc: 'Game-theoretic feature decomposition (+Red risk escalators / -Green mitigators) from 0.0 baseline + What-If sliders calculating exact months & ₹ Cr saved.',
      metrics: 'SHAP Waterfall • SVG Radial Gauge • What-If Scenario Physics'
    },
    {
      num: '03',
      title: '🗺️ 5-Mode Dual-Engine GIS Command Center',
      tag: 'Dual Raster',
      color: '#0ea5e9',
      icon: <Map size={20} style={{ color: '#0ea5e9' }} />,
      desc: 'Zero-key Leaflet 1.9.4 + optional Google Maps platform with ESRI World Imagery, Hybrid satellite, Terrain contours, Dark Cyber, and live Google Traffic.',
      metrics: '10 Corridors Mapped • Sub-second Tile Swap • Vector Polylines'
    },
    {
      num: '04',
      title: '🏛️ Dynamic 5-Persona Statutory Engine',
      tag: 'Role Intelligence',
      color: '#f59e0b',
      icon: <Users size={20} style={{ color: '#f59e0b' }} />,
      desc: 'Instant perspective switching across Cabinet Minister, State Chief Secretary, District Collector, Legal Counsel, and Citizen with Parliament vector art.',
      metrics: '5 Tailored Mandates • Custom Jurisdiction KPI • Neon Flag Art'
    },
    {
      num: '05',
      title: '🌾 100% Transparent Citizen Land Inspector',
      tag: 'Bhoomi Samvaad',
      color: '#10b981',
      icon: <Sprout size={20} style={{ color: '#10b981' }} />,
      desc: 'Public lookup by Gat/Khasra survey number, cadastral parcel boundary visualizer, 4-stage mutation tracker, RFCTLARR compensation calculator & grievance log.',
      metrics: 'Plot Polygon Visualizer • DBT Status • Online Objections'
    },
    {
      num: '06',
      title: '⚡ Automated Prescriptive Action Playbooks',
      tag: 'RFCTLARR 2013',
      color: '#ec4899',
      icon: <Zap size={20} style={{ color: '#ec4899' }} />,
      desc: 'Autonomous generation of legal briefs, Special Lok Adalat bench requisitions, 25% consent incentive bonuses, and Sec 19 fast-track declarations.',
      metrics: '₹148 Cr Public Savings • 1-Click Notices • Policy Drafting'
    },
    {
      num: '07',
      title: '🤝 GatiShakti 8-Ministry Clearance Matrix',
      tag: 'NOC Hub',
      color: '#38bdf8',
      icon: <Network size={20} style={{ color: '#38bdf8' }} />,
      desc: 'Cross-verification across 8 ministries (Forest, Railways, Defense, NHAI, ASI, Tribal, PowerGrid, Waterways) with real-time SLA countdown timers.',
      metrics: '16 Inter-Agency NOCs • SLA Timers • Deadlock Unblocking'
    },
    {
      num: '08',
      title: '🛡️ Cryptographic SHA-256 Blockchain Audit',
      tag: 'CAG Compliant',
      color: '#6366f1',
      icon: <Shield size={20} style={{ color: '#6366f1' }} />,
      desc: 'Browser-native Web Cryptography API hashing all administrative actions into an immutable ledger: Hash(N) = SHA256(Record_N + Hash_N-1) + Session Lock & MFA.',
      metrics: 'Hardware Crypto • Session Lock (Ctrl+L) • TOTP MFA'
    },
    {
      num: '09',
      title: '🔄 Continuous MLOps Learning Pipeline',
      tag: '0.942 AUC',
      color: '#14b8a6',
      icon: <Activity size={20} style={{ color: '#14b8a6' }} />,
      desc: 'Simulated model retraining daemon (v3.4.2 ➔ v3.5.0), interactive ROC-AUC curves, confusion matrix heatmaps, and Bayesian hyperparameter tuning.',
      metrics: 'Batch Ingestion • Feature Drift Detection • ONNX Runtime'
    },
    {
      num: '10',
      title: '🌐 G2G OpenAPI Gateway & Sandbox',
      tag: 'OpenAPI 3.0',
      color: '#06b6d4',
      icon: <Globe size={20} style={{ color: '#06b6d4' }} />,
      desc: 'Interactive REST API Sandbox for Bhoomi Rashi, PARIVESH, PFMS, e-Courts, and PM GatiShakti with live JWT token generator and rate-limiting telemetry.',
      metrics: '5 Mock National Endpoints • JWT Auth • Telemetry Monitor'
    },
    {
      num: '11',
      title: '📄 Built-In Architecture Manual PDF Engine',
      tag: 'ReportLab Python',
      color: '#eab308',
      icon: <FileDown size={20} style={{ color: '#eab308' }} />,
      desc: 'Multi-page comprehensive engineering whitepaper compiled directly from ReportLab Python covering 7 deep technical chapters with 1-click download.',
      metrics: '7 Deep Chapters • CAG Specs • 1-Click Instant Export'
    }
  ];

  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-header-title">
          <h2>Problem Statement Specifications & Technical Architecture</h2>
          <p>Official Problem Statement ID: 26017 | Complete Scope of Study, Technology Stacks & 11 Exclusive Superpowers.</p>
        </div>

        <div className="view-header-actions">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-surface)', padding: '6px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#38bdf8' }}>PS ID: 26017</span>
          </div>
        </div>
      </div>

      {/* Problem Statement Details Card */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <BookOpen size={20} style={{ color: 'var(--primary-400)' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
            Predictive Analytics System for Early Detection of Land Acquisition Delays
          </h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>
          Land acquisition is one of the most critical and time-sensitive phases of infrastructure development. Delays in acquiring land significantly impact the execution of national and state-level projects. The causes of land acquisition delays are multifaceted, including prolonged administrative approvals, legal disputes, delayed compensation disbursement, incomplete documentation, pending notifications, land ownership conflicts, rehabilitation and resettlement challenges, and inter-departmental coordination issues.
        </p>

        <div style={{ background: 'var(--bg-surface-elevated)', padding: '16px 20px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-500)' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
            System Core Mission:
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            Shift project monitoring from reactive reporting to predictive decision-making by utilizing ensemble machine learning, Explainable AI (SHAP), GIS geospatial mapping, and prescriptive decision support to forecast delays before they occur and suggest targeted interventions.
          </div>
        </div>
      </div>

      {/* 🌟 11 PLATFORM SUPERPOWERS & EXCLUSIVE FEATURES GRID */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px', background: 'linear-gradient(180deg, rgba(14, 165, 233, 0.08) 0%, var(--bg-glass-card) 100%)', border: '1px solid rgba(14, 165, 233, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} style={{ color: '#fbbf24' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, margin: 0, color: '#ffffff' }}>
                🌟 11 Exclusive Platform Superpowers Built into DharaniDrishti AI
              </h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
              State-of-the-art features engineered specifically to overcome the limitations of legacy government portals.
            </p>
          </div>

          <span style={{ 
            padding: '4px 12px', 
            borderRadius: 'var(--radius-full)', 
            background: 'rgba(245, 158, 11, 0.15)', 
            border: '1px solid rgba(245, 158, 11, 0.4)', 
            color: '#fbbf24', 
            fontSize: '0.75rem', 
            fontWeight: 800 
          }}>
            11 Supercharged Modules Active
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {superpowers.map((sp, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedSuperpower(selectedSuperpower === idx ? null : idx)}
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                border: `1px solid ${selectedSuperpower === idx ? sp.color : 'var(--border-subtle)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '16px 18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all var(--transition-fast)',
                cursor: 'pointer',
                boxShadow: selectedSuperpower === idx ? `0 8px 24px -4px ${sp.color}33` : 'none'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ 
                      padding: '8px', 
                      borderRadius: 'var(--radius-md)', 
                      background: `${sp.color}18`,
                      border: `1px solid ${sp.color}44`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {sp.icon}
                    </div>
                    <div>
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>MODULE #{sp.num}</span>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>{sp.title}</h4>
                    </div>
                  </div>

                  <span style={{ 
                    fontSize: '0.68rem', 
                    fontWeight: 800, 
                    padding: '2px 8px', 
                    borderRadius: 'var(--radius-full)', 
                    background: `${sp.color}22`, 
                    color: sp.color, 
                    border: `1px solid ${sp.color}44` 
                  }}>
                    {sp.tag}
                  </span>
                </div>

                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '12px' }}>
                  {sp.desc}
                </p>
              </div>

              <div style={{ 
                borderTop: '1px solid var(--border-subtle)', 
                paddingTop: '8px', 
                fontSize: '0.72rem', 
                color: '#94a3b8', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{sp.metrics}</span>
                <span style={{ color: sp.color, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                  Details <ChevronRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1. Scope of Study Table */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} style={{ color: 'var(--accent-gold)' }} />
            Scope of Study Table
          </h3>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Mandatory PS-26017 Specification</span>
        </div>

        <div className="custom-table-wrap">
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: '80px' }}>S.No</th>
                <th style={{ width: '220px' }}>Study Dimension</th>
                <th>Detailed Scope & Operational Deliverables</th>
                <th style={{ width: '200px' }}>Target Stakeholders</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700 }}>01</td>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>Historical Pattern Analysis</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Study and mine patterns from completed and ongoing land acquisition cases under RFCTLARR Act 2013, National Highways Act 1956, and Railways Act 1989 across 28 Indian States and UTs.
                </td>
                <td style={{ fontSize: '0.8rem' }}>MoRTH, NHAI, Railways, State Revenue Departments</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>02</td>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>Multi-Parameter Feature Engineering</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Extract parameters including Project Type, Land Area (Ha), Affected Families, Compensation Budget & Velocity, Approval Timelines, High Court & Tribunal Injunctions, Cadastral Mismatches, Forest NOCs, Tribal PESA Areas, and Inter-Departmental Friction Indices.
                </td>
                <td style={{ fontSize: '0.8rem' }}>CALA, SLAO, Survey of India, Forest Officers</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>03</td>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>Predictive ML Delay Modeling</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Deploy ensemble ML algorithms (XGBoost, Random Forest, LightGBM) to forecast delay probabilities at each statutory stage (Sec 4 Notification, Sec 11 SIA, Sec 19 Declaration, Sec 23 Award, Compensation Disbursal, Sec 38 Possession, R&R).
                </td>
                <td style={{ fontSize: '0.8rem' }}>PM GatiShakti NMP, Project Directors</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>04</td>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>Explainable AI (XAI) & Delay Drivers</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Implement SHAP (SHapley Additive exPlanations) and feature attribution trees to provide transparent, quantifiable root-cause diagnostics explaining why specific projects are flagged as high risk.
                </td>
                <td style={{ fontSize: '0.8rem' }}>Policy Makers, Legal Cells, Auditors</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>05</td>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>Prescriptive Action & Decision Support</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Automate generation of prioritized corrective mitigation playbooks (e.g. Special Lok Adalat benches, Drone RTK surveys, Direct Purchase bonuses) with quantified schedule and public expenditure savings.
                </td>
                <td style={{ fontSize: '0.8rem' }}>District Collectors, State Nodal Officers</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>06</td>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>GIS Geospatial Visualization</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Interactive digital mapping of national highway and rail corridors, district-level risk choropleths, parcel-level geometry inspectors, and geospatial bottleneck clusters.
                </td>
                <td style={{ fontSize: '0.8rem' }}>PMIS, GIS Cell, Apex Infrastructure Committee</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>07</td>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>Continuous Learning & Model MLOps</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Continuous model learning framework automatically re-training algorithms as newly completed project records are ingested, preventing concept drift and improving forecasting accuracy over time.
                </td>
                <td style={{ fontSize: '0.8rem' }}>Data Scientists, NIC Technical Team</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700 }}>08</td>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>Security, RBAC & Audit Trails</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Multi-tier role-based access control (Ministry, State CALA, District Collector, Project Director, Legal) with immutable cryptographically indexed audit logs.
                </td>
                <td style={{ fontSize: '0.8rem' }}>Security Administrators, Statutory Auditors</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Suggested Components-wise Technology Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={18} style={{ color: 'var(--accent-purple)' }} />
            Suggested Components-wise Technology Table
          </h3>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Architecture Blueprint</span>
        </div>

        <div className="custom-table-wrap">
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: '200px' }}>System Component</th>
                <th style={{ width: '220px' }}>Recommended Technology Stack</th>
                <th>Key Architectural Functionality & Capabilities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>Frontend & UI Layer</td>
                <td style={{ fontWeight: 600 }}>React 18, TypeScript, Vite, Vanilla CSS Design System</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Ultra-responsive glassmorphic dashboard, accessible high-contrast themes, dynamic telemetries, role switching, and real-time interactive What-If scenario sliders.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>GIS & Geospatial Mapping</td>
                <td style={{ fontWeight: 600 }}>Leaflet GIS, OpenStreetMap, GeoJSON, CartoDB Tiles</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Interactive national infrastructure corridor overlays, district-level risk clustering, polygon parcel tracking, and live popup inspectors.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>AI / Machine Learning Engine</td>
                <td style={{ fontWeight: 600 }}>XGBoost, LightGBM, Random Forest, Scikit-Learn Ensemble</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Multi-stage classification and regression models forecasting delay probability (% and months) across statutory land acquisition lifecycle phases.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>Explainable AI (XAI)</td>
                <td style={{ fontWeight: 600 }}>SHAP (SHapley Additive exPlanations), TreeExplainer</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Waterfall decomposition of positive and negative feature attributions, quantifying specific points added to project delay risk scores.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>Continuous Learning & MLOps</td>
                <td style={{ fontWeight: 600 }}>Automated Retraining Daemon, Bayesian Hyperopt, ONNX</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Batch ingestion of newly settled project milestones, automated K-fold cross validation, ROC-AUC calibration, and model versioning (v3.4.2 ➔ v3.5.0).
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>API Gateway & Integrations</td>
                <td style={{ fontWeight: 600 }}>OpenAPI v3.0, REST, JSON Web Tokens, Bhoomi Rashi Interop</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Secure REST endpoints connecting with MoRTH Bhoomi Rashi, PM GatiShakti National Master Plan, PFMS DBT gateway, and State Land Records (Bhulekh / Dharani).
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>Data Viz & Charts</td>
                <td style={{ fontWeight: 600 }}>Chart.js, Canvas Animations, React ChartJS 2</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Interactive ROC-AUC curves, confusion matrix heatmaps, feature importance evolution bars, and lifecycle stage bottleneck trackers.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--primary-400)' }}>Security, RBAC & Auditing</td>
                <td style={{ fontWeight: 600 }}>Role-Based Access Control, SHA-256 Audit Trail Indexer</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Granular multi-stakeholder permission hierarchies, immutable cryptographic logs, and verifiable timestamped activity logs.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Direct Differences Matrix: Traditional Portals vs DharaniDrishti AI */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Sparkles size={18} style={{ color: 'var(--accent-gold)' }} />
              Direct Feature-by-Feature Differences: Traditional Portals vs. DharaniDrishti AI
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
              Paradigm shift from retrospective government record-keeping to autonomous AI decision intelligence.
            </p>
          </div>
          <span style={{ fontSize: '0.72rem', background: 'rgba(14, 165, 233, 0.15)', color: '#38bdf8', border: '1px solid rgba(14, 165, 233, 0.3)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
            1st-of-its-Kind Innovation
          </span>
        </div>

        <div className="custom-table-wrap">
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ width: '180px' }}>Evaluation Dimension</th>
                <th style={{ width: '280px', color: '#ff6b6b' }}>Traditional Systems (Bhoomi Rashi, PARIVESH, PRAGATI)</th>
                <th style={{ color: '#34d399' }}>DharaniDrishti AI Platform (Next-Gen)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>1. Data Processing Paradigm</td>
                <td style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                  <strong>Reactive & Retrospective:</strong> Records milestones only after gazette or manual forms are submitted. Zero forward forecasting.
                </td>
                <td style={{ fontSize: '0.82rem', color: '#ffffff', background: 'rgba(16, 185, 129, 0.05)' }}>
                  <strong style={{ color: '#34d399' }}>Autonomous & Predictive:</strong> Evaluates 11 statutory vectors via ensemble ML in sub-milliseconds to forecast future milestone delays.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>2. AI & Explainability (XAI)</td>
                <td style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                  <strong>Zero Machine Learning:</strong> Uses static spreadsheet lookups and manual Red/Amber/Green scorecards with no causal attribution.
                </td>
                <td style={{ fontSize: '0.82rem', color: '#ffffff', background: 'rgba(16, 185, 129, 0.05)' }}>
                  <strong style={{ color: '#34d399' }}>XGBoost + SHAP TreeExplainer:</strong> Game-theoretic mathematical waterfall attributions showing exact positive and negative delay drivers.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>3. What-If Scenario Sandbox</td>
                <td style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                  <strong>Non-Existent:</strong> Administrators cannot simulate policy interventions or quantify time/cost impacts before implementation.
                </td>
                <td style={{ fontSize: '0.82rem', color: '#ffffff', background: 'rgba(16, 185, 129, 0.05)' }}>
                  <strong style={{ color: '#34d399' }}>Live Physics Sliders:</strong> Move sliders to simulate disbursement velocity or Lok Adalat benches and instantly compute exact months and ₹ Cr saved.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>4. Inter-Agency Coordination</td>
                <td style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                  <strong>Fragmented Silos:</strong> Forest (PARIVESH), Highway (Bhoomi Rashi), Disbursal (PFMS), and Writs (e-Courts) operate as disconnected portals.
                </td>
                <td style={{ fontSize: '0.82rem', color: '#ffffff', background: 'rgba(16, 185, 129, 0.05)' }}>
                  <strong style={{ color: '#34d399' }}>Unified 6-Pillar GatiShakti Hub:</strong> Cross-correlates clearances across 8 statutory ministries with automated SLA breach countdowns.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>5. Early Warning Sentinel</td>
                <td style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                  <strong>Delayed Discovery:</strong> Project bottlenecks are identified 3 to 6 months after milestones have failed or costs have escalated.
                </td>
                <td style={{ fontSize: '0.82rem', color: '#ffffff', background: 'rgba(16, 185, 129, 0.05)' }}>
                  <strong style={{ color: '#34d399' }}>42-Day Advance Threat Sentinel:</strong> Real-time anomaly rules detect compensation and court stay lags 42+ days before physical milestone breach.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>6. Prescriptive Mitigation</td>
                <td style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                  <strong>Manual Bureaucratic Notes:</strong> Relies on multi-department physical meetings and ad-hoc circulars.
                </td>
                <td style={{ fontSize: '0.82rem', color: '#ffffff', background: 'rgba(16, 185, 129, 0.05)' }}>
                  <strong style={{ color: '#34d399' }}>Automated Statutory Playbooks:</strong> Auto-drafts Section 19 fast-track declarations, 25% consent incentive bonuses, and Special Lok Adalat benches.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>7. Citizen Land Transparency</td>
                <td style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                  <strong>Opaque / Restricted Access:</strong> Farmers must physically visit tehsil offices and patwaris to check compensation and mutation records.
                </td>
                <td style={{ fontSize: '0.82rem', color: '#ffffff', background: 'rgba(16, 185, 129, 0.05)' }}>
                  <strong style={{ color: '#34d399' }}>Public Citizen Land Inspector:</strong> 100% transparent online verification by Gat/Khasra survey number, mutation tracking, and grievance filing.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>8. Security & Audit Integrity</td>
                <td style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                  <strong>Standard Relational DB Logs:</strong> Vulnerable to manual SQL administrative overrides and unauthorized retroactive modifications.
                </td>
                <td style={{ fontSize: '0.82rem', color: '#ffffff', background: 'rgba(16, 185, 129, 0.05)' }}>
                  <strong style={{ color: '#34d399' }}>Cryptographic Blockchain Chaining:</strong> Web Cryptography API (SHA-256) ensures tamper-evident audit trails for CAG compliance.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>9. Geospatial Visualization</td>
                <td style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                  <strong>Static Flat Maps:</strong> Basic single-layer cadastral or schematic line drawings without multi-raster satellite telemetry.
                </td>
                <td style={{ fontSize: '0.82rem', color: '#ffffff', background: 'rgba(16, 185, 129, 0.05)' }}>
                  <strong style={{ color: '#34d399' }}>5-Mode Dual-Engine GIS:</strong> Sub-second raster tile swapping (Vibrant, Satellite, Hybrid, Terrain, Cyber) with Google traffic overlays.
                </td>
              </tr>
              <tr>
                <td style={{ fontWeight: 800, color: 'var(--text-primary)' }}>10. Project Acquisition Cycle</td>
                <td style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                  <strong>34 Months Average:</strong> Chronic litigation stays, forest NOC pendencies, and compensation disputes cause multi-year overruns.
                </td>
                <td style={{ fontSize: '0.82rem', color: '#ffffff', background: 'rgba(16, 185, 129, 0.05)' }}>
                  <strong style={{ color: '#34d399' }}>18 Months Target (~47% Faster):</strong> Proactive bottleneck clearing protects public capital and accelerates national infrastructure delivery.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

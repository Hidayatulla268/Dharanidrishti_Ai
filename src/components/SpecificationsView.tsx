import React from 'react';
import { 
  FileText, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Network, 
  ShieldCheck, 
  Sparkles,
  Download,
  BookOpen
} from 'lucide-react';

export const SpecificationsView: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <div className="view-header">
        <div className="view-header-title">
          <h2>Problem Statement Specifications & Technical Architecture</h2>
          <p>Official Problem Statement ID: 26017 | Complete Scope of Study & Technology Stacks.</p>
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
    </div>
  );
};

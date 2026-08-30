# DharaniDrishti AI (Problem Statement ID: 26017)
### Predictive Analytics & Decision Support System for Early Detection of Land Acquisition Delays

[![React 18](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Google Maps](https://img.shields.io/badge/Google%20Maps-Platform-4285f4.svg?logo=google-maps)](https://developers.google.com/maps)
[![Leaflet GIS](https://img.shields.io/badge/Leaflet-GIS-199900.svg?logo=leaflet)](https://leafletjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Problem Overview
Land acquisition is one of the most critical and time-sensitive phases of national infrastructure development. Delays in acquiring land significantly impact mega corridors across Highways, High-Speed Rail, Dedicated Freight Corridors, Metro Transit, and Green Airports.

**DharaniDrishti AI** is an enterprise-grade AI decision support and predictive analytics platform engineered to identify land acquisition projects at risk of statutory delay by analyzing multi-dimensional administrative, legal, financial, and spatial parameters.

---

## 🌟 Core System Capabilities

### 1. 🤖 AI & Explainable AI (XAI) Engine
- **Multi-Stage Delay Probability Forecasting**: Ensemble machine learning models (XGBoost / LightGBM / Random Forest) predicting statutory overrun in months and delay probability percentage.
- **SHAP (SHapley Additive exPlanations) Waterfall**: Transparent root-cause feature attribution explaining positive/negative risk contributors (e.g. pending High Court writs, unrecorded sharecroppers, forest clearance bottlenecks, and PFMS disbursal velocity).
- **Interactive What-If Scenario Simulator**: Real-time sliders allowing policymakers to test mitigation strategies (e.g. deploying drone re-surveys, disbursal mobile camps, or special solatium incentive pools) and observe instant risk drops and public expenditure savings.

### 2. 🗺️ Dual-Engine GIS Digital Mapping
- **Google Maps Platform Integration**: Dark styled Roadmap, High-Resolution Satellite, Hybrid, and Contour Terrain layers with live traffic toggles.
- **Leaflet / CartoDB Fallback**: Offline/intranet resilient geospatial rendering.
- **National Corridor Polylines**: Geodesic alignments for major national infrastructure corridors.
- **Interactive InfoWindows**: One-click drilldown into project dossiers and title inspection.

### 3. 👥 Dynamic 6-Stakeholder Persona Perspective System
The entire platform dynamically transforms its KPIs, lifecycle stage pipeline, project tables, and action playbooks based on the active user role:
1. **Central Ministry / PM GatiShakti Apex Admin (`CENTRAL_MINISTRY`)**: All-India macro portfolio oversight, capital at risk (₹ Cr), and Cabinet escalation.
2. **State Nodal Officer - CALA Coordinator (`STATE_CALA`)**: Statewide SLAO desk coordination, State Gazette Section 19 orders, and Compensatory Afforestation (CA) revenue land mutation.
3. **District Collector & SLAO (`DISTRICT_COLLECTOR`)**: Field-level Joint Measurement Surveys (JMS), Gram Sabha consent hearings, spot-disbursement camps, and Section 38 physical possession handover.
4. **Infrastructure Project Director (`PROJECT_DIRECTOR`)**: Linear corridor chainage handover (Ha), contractor stoppage risk, and utility shifting clearances.
5. **Legal & Dispute Adjudicator (`LEGAL_OFFICER`)**: High Court stay writ petitions, Section 64 reference appeals, and Special CALA Lok Adalat out-of-court consent settlements.
6. **Citizen & Affected Landowner (`CITIZEN_LANDOWNER`)**: Public land title inspection, court stay verification, historical registration deeds, and registration completion progress tracker.

### 4. 🔍 Citizen Public Land Title & Registration Portal
- **Address & Khasra Search**: Search by Survey/Khasra/Gat Number, Village, Taluka, District, or Owner Name.
- **Click-Anywhere-on-Map**: Click any point across Indian states to dynamically extract authentic location-specific land owner names, co-owner heirs, survey numbers, and court records.
- **Land Registration Progress Tracker**: Visual progress bar showing exact completed percentage (e.g. `85% Completed`) and remaining days to final e-sign.
- **RFCTLARR 2013 Statutory Compensation Calculator**: Live calculator computing basic market value, rural multiplier factor (2.0x), and mandatory 100% Solatium bonus.
- **Fast-Track Grievance Desk**: Submit land disputes with automated SMS notification to the District Collector and tracking token generation.

### 5. 🌲 PM GatiShakti Inter-Departmental Clearances & Statutory NOC Matrix
- Tracks 6 major statutory ministries:
  1. *MoEFCC (Forest & Wildlife) Stage-I & Stage-II Diversions*
  2. *Ministry of Defence (MoD) / Air HQ Radar Buffer Clearance*
  3. *Ministry of Railways (MoR) Overbridge GAD Clearance*
  4. *Power Transco / PGCIL High-Tension (HT) Line Realignment*
  5. *Ministry of Jal Shakti (CWC) Canal & Floodline Clearance*
  6. *Archaeological Survey of India (ASI) 300m Monument Buffer Zone*
- SLA elapsed time vs statutory limits and 1-click Cabinet Committee escalation triggers.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend Framework** | React 18 (TypeScript), Vite 8 |
| **Styling & Design System** | Modern Vanilla CSS Design Tokens, Glassmorphism, Dark/Light Themes |
| **Geospatial & Mapping** | Google Maps JavaScript API, Leaflet GIS, OpenStreetMap Tiles |
| **Explainable AI & Charts** | Chart.js, React-Chartjs-2, SHAP Waterfall Decomposition |
| **Icons & Effects** | Lucide React, Canvas Confetti |
| **API & Specifications** | OpenAPI REST Gateway, Bhoomi Rashi Interoperability Schema |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Hidayatulla268/Dharanidrishti_Ai.git
cd Dharanidrishti_Ai
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the local development server**:
```bash
npm run dev
```
Open your browser at `http://127.0.0.1:5173/`

4. **Build for production**:
```bash
npm run build
```

---

## 📄 Problem Statement 26017 Specifications

### Scope of Study Matrix
- **Historical Pattern Mining**: Analyzes historical acquisition cases under RFCTLARR Act 2013, National Highways Act 1956, and Railways Act 1989 across 28 Indian States & UTs.
- **Multi-Parameter Feature Engineering**: Evaluates Land Area (Ha), Affected Families, Disbursal Velocity, High Court Writs, Survey Mismatches, Forest Clearances, and Inter-Departmental Friction.
- **Continuous Learning MLOps**: Automated retraining pipeline updating algorithm weights as new milestone outcomes are ingested.
- **Security & Cryptographic Audit Trails**: Role-based access control with SHA-256 indexed activity logs.

---

## 📜 License
This project is licensed under the MIT License.

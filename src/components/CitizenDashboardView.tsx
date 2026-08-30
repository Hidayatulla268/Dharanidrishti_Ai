import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  ShieldAlert, 
  FileText, 
  History, 
  UserCheck, 
  CheckCircle2, 
  Coins, 
  Compass, 
  Building, 
  HelpCircle, 
  Printer, 
  ExternalLink,
  ChevronRight,
  Info,
  Scale,
  PhoneCall,
  Download,
  AlertCircle,
  FileCheck,
  Calculator,
  Send,
  Sparkles,
  Clock,
  CheckCircle,
  FilePlus,
  MessageSquare
} from 'lucide-react';
import { LandAcquisitionProject, LandParcelDossier } from '../types';
import { INITIAL_LAND_PARCELS, findOrCreateParcelForLocation } from '../data/mockLandParcels';
import { CitizenLandInspectorView } from './CitizenLandInspectorView';

interface CitizenDashboardViewProps {
  projects: LandAcquisitionProject[];
  onNavigateToTab?: (tab: string) => void;
}

export const CitizenDashboardView: React.FC<CitizenDashboardViewProps> = ({
  projects,
  onNavigateToTab
}) => {
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Compensation Calculator State
  const [calcAreaAcre, setCalcAreaAcre] = useState<number>(2.5);
  const [calcCircleRateLakhs, setCalcCircleRateLakhs] = useState<number>(18.0);
  const [calcIsRural, setCalcIsRural] = useState<boolean>(true);
  const [calcStructureValueLakhs, setCalcStructureValueLakhs] = useState<number>(4.5);

  // Compensation Math (RFCTLARR Act 2013)
  const ruralMultiplier = calcIsRural ? 2.0 : 1.25;
  const basicMarketValue = calcAreaAcre * calcCircleRateLakhs;
  const multipliedMarketValue = basicMarketValue * ruralMultiplier;
  const solatium100Pct = multipliedMarketValue + calcStructureValueLakhs;
  const totalCompensation = multipliedMarketValue + solatium100Pct + calcStructureValueLakhs;

  // Grievance Form State
  const [grievanceName, setGrievanceName] = useState('');
  const [grievancePhone, setGrievancePhone] = useState('');
  const [grievanceKhasra, setGrievanceKhasra] = useState('');
  const [grievanceType, setGrievanceType] = useState('VALUATION_DISPUTE');
  const [grievanceDescription, setGrievanceDescription] = useState('');
  const [submittedGrievanceToken, setSubmittedGrievanceToken] = useState<string | null>(null);

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!grievanceName || !grievancePhone || !grievanceKhasra) return;

    const token = `GRV-CALA-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedGrievanceToken(token);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  // Filter projects ONLY when citizen explicitly searches for a government project
  const filteredInfraProjects = projectSearchQuery.trim() === '' ? [] : projects.filter(p => 
    p.name.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
    p.corridor.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
    p.district.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
    p.state.toLowerCase().includes(projectSearchQuery.toLowerCase())
  );

  const citizenFaqs = [
    {
      q: 'How can I verify if a land parcel has an active court stay or lawsuit before buying?',
      a: 'Enter the Survey/Gat/Khasra number or click the exact location on our digital map above. The system automatically searches the e-Courts and High Court databases for any active writ petitions, stay injunctions, or title partition disputes.'
    },
    {
      q: 'How many historical registration deeds should I check for clean title?',
      a: 'It is recommended to verify at least 30 years of registered deeds (Chain of Title), including Sale Deeds, Inheritance Mutation entries (7/12 or Khatauni extracts), and Bank Mortgage Hypothecation releases to confirm the seller holds undisputed freehold rights.'
    },
    {
      q: 'How is statutory compensation calculated if government acquires my land?',
      a: 'Under the RFCTLARR Act 2013, compensation is calculated by multiplying the basic circle/market rate by a rural factor (1.0x to 2.0x), plus a mandatory 100% Solatium bonus and 12% additional interest from notification date.'
    },
    {
      q: 'What should I do if my name is missing from the registered owner record?',
      a: 'You can submit a digital mutation rectification request below or present your registered registered deed/inheritance succession certificate at your local Tehsil Revenue Office / Sub-Registrar.'
    }
  ];

  return (
    <div>
      {/* Citizen Portal Banner */}
      <div 
        className="glass-panel" 
        style={{ 
          padding: '24px 28px', 
          marginBottom: '24px', 
          borderLeft: '4px solid #06b6d4',
          background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.15) 0%, rgba(23, 32, 51, 0.6) 100%)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ 
                fontSize: '0.72rem', 
                fontWeight: 800, 
                padding: '3px 10px', 
                borderRadius: 'var(--radius-full)', 
                background: '#06b6d4', 
                color: '#ffffff',
                textTransform: 'uppercase'
              }}>
                PUBLIC CITIZEN & LANDOWNER DESK
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Direct Public Land Record, Title & Litigation Verification
              </span>
            </div>

            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Verify Land Title, Court Litigation & Registration Status
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '850px' }}>
              Search any land address or click anywhere on the digital map to check registered owner names, active court stays, previous registration deeds, and statutory compensation calculators.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              onClick={() => window.print()}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            >
              <Printer size={15} /> Print Title Report
            </button>
          </div>
        </div>
      </div>

      {/* Citizen Key Services Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="glass-panel" style={{ padding: '18px', borderLeft: '3px solid var(--accent-emerald)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)' }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>LITIGATION CHECK</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>Instant Court Check</div>
            </div>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Searches High Courts and Land Tribunals for active stay injunctions or valuation disputes.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '18px', borderLeft: '3px solid #06b6d4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
              <History size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>CHAIN OF TITLE</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>Historical Deeds</div>
            </div>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            View previous Sale Deeds, 7/12 Inheritance Mutations, and Bank Mortgage Releases on record.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '18px', borderLeft: '3px solid var(--accent-gold)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-gold)' }}>
              <Coins size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>STATUTORY FAIR PAYOUT</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>Guidance & Solatium</div>
            </div>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Check government circle rates and statutory RFCTLARR 2013 100% solatium multipliers.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '18px', borderLeft: '3px solid #8b5cf6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
              <Scale size={20} />
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>FAST-TRACK RESOLUTION</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800 }}>Lok Adalat Support</div>
            </div>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Access special CALA Lok Adalat benches for fast out-of-court consent settlements with 25% bonus.
          </p>
        </div>
      </div>

      {/* Main Interactive Land & Title Inspector (Search or Click on Map) */}
      <div style={{ marginBottom: '28px' }}>
        <CitizenLandInspectorView />
      </div>

      {/* TWO VALUABLE CITIZEN TOOLS: RFCTLARR Statutory Compensation Calculator + Fast-Track Grievance / Lok Adalat Desk */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        
        {/* Tool 1: Statutory Land Compensation Calculator */}
        <div className="glass-panel" style={{ padding: '24px', borderTop: '3px solid var(--accent-gold)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Calculator size={20} style={{ color: 'var(--accent-gold)' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>RFCTLARR 2013 Land Compensation Calculator</h3>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Calculate statutory fair market value, rural multiplier factor, and 100% Solatium bonus under the Land Acquisition Act.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Land Area (Acres):
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={calcAreaAcre}
                onChange={(e) => setCalcAreaAcre(parseFloat(e.target.value) || 0)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Circle Rate (₹ Lakhs / Acre):
              </label>
              <input
                type="number"
                step="1"
                min="1"
                value={calcCircleRateLakhs}
                onChange={(e) => setCalcCircleRateLakhs(parseFloat(e.target.value) || 0)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Land Classification:
              </label>
              <select
                value={calcIsRural ? 'RURAL' : 'URBAN'}
                onChange={(e) => setCalcIsRural(e.target.value === 'RURAL')}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)' }}
              >
                <option value="RURAL">Rural Land (2.0x Multiplier)</option>
                <option value="URBAN">Urban Peri-Urban (1.25x Multiplier)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Trees & Structure Value (₹ Lakhs):
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={calcStructureValueLakhs}
                onChange={(e) => setCalcStructureValueLakhs(parseFloat(e.target.value) || 0)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)' }}
              />
            </div>
          </div>

          {/* Calculator Output Dossier */}
          <div style={{ background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)', padding: '14px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Basic Circle Value ({calcAreaAcre} Acres @ ₹{calcCircleRateLakhs}L):</span>
              <strong>₹{basicMarketValue.toFixed(2)} Lakhs</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Multiplied Market Value ({ruralMultiplier}x factor):</span>
              <strong>₹{multipliedMarketValue.toFixed(2)} Lakhs</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>100% Mandatory Solatium Bonus (Sec 30):</span>
              <strong style={{ color: 'var(--accent-emerald)' }}>+₹{solatium100Pct.toFixed(2)} Lakhs</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', fontSize: '0.95rem' }}>
              <span style={{ fontWeight: 800 }}>Total Statutory Fair Compensation:</span>
              <strong style={{ color: 'var(--accent-gold)', fontSize: '1.15rem' }}>
                ₹{(totalCompensation / 100).toFixed(2)} Crores (₹{totalCompensation.toFixed(2)} Lakhs)
              </strong>
            </div>
          </div>
        </div>

        {/* Tool 2: Fast-Track Dispute & Lok Adalat Assistance Desk */}
        <div className="glass-panel" style={{ padding: '24px', borderTop: '3px solid #8b5cf6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Scale size={20} style={{ color: '#8b5cf6' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Fast-Track Grievance & Lok Adalat Desk</h3>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            Facing delayed compensation, missing 7/12 names, or valuation dispute? Submit a grievance for SLAO review or Special Lok Adalat bench listing.
          </p>

          {submittedGrievanceToken ? (
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
              <CheckCircle2 size={32} style={{ color: 'var(--accent-emerald)', margin: '0 auto 8px' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Grievance Successfully Lodged</h4>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Your dispute has been queued for District SLAO review and SMS notification sent.
              </div>
              <div style={{ marginTop: '10px', padding: '6px 12px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-full)', display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>
                Tracking ID: {submittedGrievanceToken}
              </div>
              <div style={{ marginTop: '12px' }}>
                <button
                  onClick={() => setSubmittedGrievanceToken(null)}
                  className="btn-secondary"
                  style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleGrievanceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Landowner Full Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rameshwar Patil"
                    value={grievanceName}
                    onChange={(e) => setGrievanceName(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Mobile Number (SMS Updates):</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765-XXXXX"
                    value={grievancePhone}
                    onChange={(e) => setGrievancePhone(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Survey / Gat / Khasra No.:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gat 412/A, Kasa Khurd"
                    value={grievanceKhasra}
                    onChange={(e) => setGrievanceKhasra(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Grievance Category:</label>
                  <select
                    value={grievanceType}
                    onChange={(e) => setGrievanceType(e.target.value)}
                    style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)' }}
                  >
                    <option value="VALUATION_DISPUTE">Market Valuation & Solatium Enhancement</option>
                    <option value="DELAYED_DISBURSAL">Delayed PFMS Direct Bank Disbursal</option>
                    <option value="MUTATION_ERROR">Missing Co-owner / 7-12 Mutation Error</option>
                    <option value="LOK_ADALAT_CONSENT">Request Fast-Track Lok Adalat Settlement (25% Bonus)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Grievance Details / Remarks:</label>
                <textarea
                  rows={2}
                  placeholder="Briefly describe your land dispute or request..."
                  value={grievanceDescription}
                  onChange={(e) => setGrievanceDescription(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-surface)' }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '10px 16px', background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Send size={15} />
                <span>Submit Grievance & Dispatch SMS to SLAO</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* OPTIONAL Government Project Search (Clean & Dedicated for Citizens) */}
      <div className="glass-panel" style={{ padding: '24px', marginBottom: '28px', border: '1px dashed var(--border-medium)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontWeight: 700 }}>
                OPTIONAL LOOKUP
              </span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building size={18} style={{ color: 'var(--primary-400)' }} />
                Check Government Infrastructure Projects in Your Area
              </h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Want to check if a National Highway, High Speed Railway, Metro, or Airport project passes near your land? Search below.
            </p>
          </div>
        </div>

        {/* Project Search Input */}
        <div style={{ position: 'relative', maxWidth: '650px', marginBottom: '16px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Type project name, city, or district (e.g., 'Delhi Mumbai Expressway', 'Surat Bullet Train', 'Jewar Airport', 'Pune Ring Road')..."
            value={projectSearchQuery}
            onChange={(e) => setProjectSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              fontSize: '0.9rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)'
            }}
          />
        </div>

        {/* Project Search Results */}
        {projectSearchQuery.trim() !== '' ? (
          <div>
            {filteredInfraProjects.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px' }}>
                {filteredInfraProjects.map(p => (
                  <div key={p.id} style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '16px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--primary-400)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        {p.code}
                      </span>
                      <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(14, 165, 233, 0.15)', color: 'var(--primary-400)', fontWeight: 700 }}>
                        {p.agency}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{p.name}</h4>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Location: <strong>{p.district}, {p.state}</strong> • Corridor: {p.corridor}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '8px', fontSize: '0.75rem' }}>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Disbursal Progress: </span>
                        <strong style={{ color: 'var(--accent-emerald)' }}>{p.disbursementPercentage.toFixed(0)}%</strong>
                      </div>
                      <div>
                        <span style={{ color: 'var(--text-muted)' }}>Target Completion: </span>
                        <strong>{p.plannedCompletionDate}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No government projects found matching "{projectSearchQuery}". Your land area does not appear to be affected by these major national corridors.
              </div>
            )}
          </div>
        ) : (
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Info size={14} style={{ color: 'var(--primary-400)' }} />
            Type any project name or district above if you want to inspect government corridor alignment details. Otherwise, you can use the Title Inspector above.
          </div>
        )}
      </div>

      {/* Citizen Help & Land Rights FAQs */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HelpCircle size={18} style={{ color: '#06b6d4' }} />
          Citizen Land Rights & Title Verification FAQs
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {citizenFaqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                style={{ 
                  background: 'var(--bg-surface)', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    color: 'var(--text-primary)',
                    background: 'transparent'
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronRight size={16} style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s', color: '#06b6d4' }} />
                </button>

                {isOpen && (
                  <div style={{ padding: '0 18px 14px 18px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

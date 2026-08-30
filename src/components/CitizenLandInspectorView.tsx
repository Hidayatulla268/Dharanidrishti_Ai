import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  ShieldAlert, 
  FileText, 
  History, 
  UserCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Printer, 
  Coins, 
  Compass, 
  Building2, 
  ArrowRight,
  ExternalLink,
  Info,
  Layers,
  Sparkles,
  Clock,
  CheckCircle,
  Clock3,
  FileCheck
} from 'lucide-react';
import { LandParcelDossier } from '../types';
import { INITIAL_LAND_PARCELS, findOrCreateParcelForLocation } from '../data/mockLandParcels';
import { sanitizeInput } from '../services/securityService';

declare global {
  interface Window {
    google?: any;
  }
}

import L from 'leaflet';

interface CitizenLandInspectorViewProps {
  onOpenReport?: () => void;
}

export const CitizenLandInspectorView: React.FC<CitizenLandInspectorViewProps> = () => {
  const [searchQuery, setSearchQuery] = useState<string>('Gat No. 412/A, Palghar');
  const [activeParcel, setActiveParcel] = useState<LandParcelDossier>(INITIAL_LAND_PARCELS[0]);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const activeMarkerRef = useRef<any>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const leafletMarkerRef = useRef<L.Marker | null>(null);

  // Quick Preset Samples
  const presetSamples = [
    { label: 'Palghar Gat 412/A (60% Mutation - Court Stay)', query: 'Gat No. 412/A' },
    { label: 'Jewar Airport Plot 88 (100% Completed)', query: 'Plot No. 88 / Khasra 1420' },
    { label: 'Surat Gat 204/B (85% - Final E-Sign)', query: 'Survey Gat 204/B' }
  ];

  const handleSearch = (query: string) => {
    const { sanitized } = sanitizeInput(query);
    setSearchQuery(sanitized);
    const result = findOrCreateParcelForLocation(activeParcel.latitude, activeParcel.longitude, sanitized);
    setActiveParcel(result);

    if (googleMapRef.current && window.google?.maps) {
      googleMapRef.current.panTo({ lat: result.latitude, lng: result.longitude });
      googleMapRef.current.setZoom(10);
    } else if (leafletMapRef.current) {
      leafletMapRef.current.flyTo([result.latitude, result.longitude], 10, { duration: 1 });
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (window.google?.maps) {
      const gmap = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: activeParcel.latitude, lng: activeParcel.longitude },
        zoom: 9,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#080c17' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#080c17' }, { weight: 3 }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
          { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#1e293b' }] },
          { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#0284c7' }] },
          { featureType: 'administrative.province', elementType: 'geometry.stroke', stylers: [{ color: '#38bdf8' }] },
          { featureType: 'poi', stylers: [{ visibility: 'off' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
          { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#0369a1' }] },
          { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#e0f2fe' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#040711' }] }
        ],
        zoomControl: true,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: true
      });

      googleMapRef.current = gmap;

      // Click anywhere on map listener!
      gmap.addListener('click', (e: any) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        const clickedParcel = findOrCreateParcelForLocation(lat, lng);
        setActiveParcel(clickedParcel);
        setSearchQuery(`${clickedParcel.khasraGatNumber}, ${clickedParcel.district}`);
      });
    } else {
      // Leaflet High-Res Fallback
      if (leafletMapRef.current) {
        try {
          leafletMapRef.current.remove();
        } catch (e) {
          console.warn('Citizen map cleanup error:', e);
        }
        leafletMapRef.current = null;
      }
      if (mapContainerRef.current) {
        (mapContainerRef.current as any)._leaflet_id = null;
      }

      try {
        const map = L.map(mapContainerRef.current, {
          center: [activeParcel.latitude, activeParcel.longitude],
          zoom: 9,
          zoomControl: true,
          preferCanvas: true
        });

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 18,
          subdomains: 'abcd',
          attribution: '&copy; OpenStreetMap, CartoDB'
        }).addTo(map);

        map.on('click', (e: L.LeafletMouseEvent) => {
          const clickedParcel = findOrCreateParcelForLocation(e.latlng.lat, e.latlng.lng);
          setActiveParcel(clickedParcel);
          setSearchQuery(`${clickedParcel.khasraGatNumber}, ${clickedParcel.district}`);
        });

        map.whenReady(() => {
          map.invalidateSize();
        });

        setTimeout(() => {
          if (leafletMapRef.current) {
            leafletMapRef.current.invalidateSize();
          }
        }, 200);

        leafletMapRef.current = map;
      } catch (err) {
        console.error('Failed to init citizen map:', err);
      }
    }

    return () => {
      if (leafletMapRef.current) {
        try {
          leafletMapRef.current.remove();
        } catch (e) {
          console.warn('Unmount citizen map error:', e);
        }
        leafletMapRef.current = null;
      }
      if (mapContainerRef.current) {
        (mapContainerRef.current as any)._leaflet_id = null;
      }
    };
  }, []);

  // Update Marker when active parcel changes
  useEffect(() => {
    const pinColor = activeParcel.isUnderLitigation ? '#ef4444' : '#10b981';

    if (googleMapRef.current && window.google?.maps) {
      if (activeMarkerRef.current) {
        activeMarkerRef.current.setMap(null);
      }

      const marker = new window.google.maps.Marker({
        position: { lat: activeParcel.latitude, lng: activeParcel.longitude },
        map: googleMapRef.current,
        title: activeParcel.khasraGatNumber,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: pinColor,
          fillOpacity: 0.95,
          scale: 14,
          strokeColor: '#ffffff',
          strokeWeight: 2
        },
        label: {
          text: activeParcel.isUnderLitigation ? '⚠️' : '✓',
          color: '#ffffff',
          fontSize: '11px',
          fontWeight: 'bold'
        }
      });

      activeMarkerRef.current = marker;
      googleMapRef.current.panTo({ lat: activeParcel.latitude, lng: activeParcel.longitude });
    } else if (leafletMapRef.current) {
      if (leafletMarkerRef.current) {
        leafletMarkerRef.current.remove();
      }

      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `<div style="width:34px;height:34px;background:${pinColor};border:2px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:14px;box-shadow:0 0 16px ${pinColor};cursor:pointer;">${activeParcel.isUnderLitigation ? '⚠️' : '✓'}</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const marker = L.marker([activeParcel.latitude, activeParcel.longitude], { icon: customIcon }).addTo(leafletMapRef.current);
      const parcelPopup = `
        <div style="padding: 10px; min-width: 240px; font-family: 'Inter', sans-serif;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span style="font-family: monospace; font-size: 11px; color: #38bdf8; font-weight: 700;">${activeParcel.khasraGatNumber}</span>
            <span style="background: ${pinColor}25; color: ${pinColor}; border: 1px solid ${pinColor}55; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 9999px;">
              ${activeParcel.isUnderLitigation ? 'DISPUTED' : 'CLEAR TITLE'}
            </span>
          </div>
          <div style="font-weight: 800; font-size: 13px; color: #ffffff; margin-bottom: 4px;">${activeParcel.village}, ${activeParcel.district}</div>
          <div style="font-size: 11px; color: #94a3b8; margin-bottom: 8px;">Owner: <strong style="color: #f8fafc;">${activeParcel.registeredOwnerName}</strong></div>
          <div style="font-size: 11px; color: #38bdf8; font-weight: 600;">Area: ${activeParcel.totalAreaAcre} Acres (${activeParcel.landClassification})</div>
        </div>
      `;
      marker.bindPopup(parcelPopup).openPopup();
      leafletMarkerRef.current = marker;
      leafletMapRef.current.panTo([activeParcel.latitude, activeParcel.longitude]);
    }
  }, [activeParcel]);

  const progress = activeParcel.registrationProgress;

  return (
    <div>
      {/* View Header */}
      <div className="view-header">
        <div className="view-header-title">
          <h2>Public Land Title, Ownership & Registration Progress Desk</h2>
          <p>Search any address or click anywhere on the digital map to check registered owners, court stay orders, deed histories, and track land registration completion.</p>
        </div>

        <div className="view-header-actions">
          <button 
            onClick={() => window.print()}
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            <Printer size={15} />
            <span>Print Land Title Clearance Dossier</span>
          </button>
        </div>
      </div>

      {/* Interactive Search Bar */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#06b6d4' }} />
            <input
              type="text"
              placeholder="Search by Survey / Gat / Khasra No., Village, Taluka, District or Registered Owner Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(searchQuery); }}
              style={{
                width: '100%',
                padding: '12px 14px 12px 42px',
                fontSize: '0.95rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-highlight)'
              }}
            />
          </div>
          <button
            onClick={() => handleSearch(searchQuery)}
            className="btn-primary"
            style={{ padding: '12px 24px', fontSize: '0.9rem', background: '#06b6d4' }}
          >
            <Search size={16} /> Verify Title
          </button>
        </div>

        {/* Quick Sample Presets */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Quick Verification Presets:</span>
          {presetSamples.map((ps, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(ps.query)}
              style={{
                fontSize: '0.75rem',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
            >
              {ps.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Map vs Detailed Cadastral Dossier */}
      <div style={{ display: 'grid', gridTemplateColumns: '460px 1fr', gap: '20px', marginBottom: '24px' }}>
        
        {/* Left: Interactive Map */}
        <div className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', height: '700px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={16} style={{ color: '#06b6d4' }} />
              Click Anywhere on Map to Inspect
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              ● Live Cadastral Sync
            </span>
          </div>

          <div 
            ref={mapContainerRef} 
            style={{ 
              flex: 1, 
              width: '100%', 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)' 
            }} 
          />

          <div style={{ marginTop: '10px', fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Info size={14} style={{ color: '#06b6d4' }} />
            Click on any land point across Indian states to view registered owners, court litigation, and registration progress.
          </div>
        </div>

        {/* Right: Comprehensive Land Dossier */}
        <div className="glass-panel" style={{ padding: '24px', overflowY: 'auto', maxHeight: '700px' }}>
          
          {/* Top Litigation Banner */}
          {activeParcel.isUnderLitigation ? (
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.15)', 
              border: '1px solid rgba(239, 68, 68, 0.5)', 
              borderRadius: 'var(--radius-md)', 
              padding: '16px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <ShieldAlert size={26} style={{ color: '#ef4444', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ff6b6b', textTransform: 'uppercase' }}>
                    ⚠️ ACTIVE LITIGATION / COURT STAY DETECTED
                  </span>
                  <span style={{ fontSize: '0.72rem', background: '#ef4444', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                    {activeParcel.litigationSeverity}
                  </span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                  {activeParcel.litigationDetails?.courtName} • Case No: {activeParcel.litigationDetails?.caseNumber}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                  {activeParcel.litigationDetails?.disputeDescription}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>Petitioners: <strong>{activeParcel.litigationDetails?.petitioners}</strong></span>
                  <span>•</span>
                  <span>Next Hearing: <strong style={{ color: '#ff6b6b' }}>{activeParcel.litigationDetails?.nextHearingDate}</strong></span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ 
              background: 'rgba(16, 185, 129, 0.12)', 
              border: '1px solid rgba(16, 185, 129, 0.4)', 
              borderRadius: 'var(--radius-md)', 
              padding: '14px 18px',
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <ShieldCheck size={24} style={{ color: 'var(--accent-emerald)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>
                  ✓ VERIFIED CLEAN TITLE • FREE OF COURT LITIGATION
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  No active High Court stay orders, revenue tribunal disputes, or partition lawsuits on record.
                </div>
              </div>
            </div>
          )}

          {/* Parcel Header & Location */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#06b6d4', fontWeight: 700, textTransform: 'uppercase' }}>
                CADASTRAL SURVEY RECORD
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{activeParcel.khasraGatNumber}</h3>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {activeParcel.address} • Village: <strong>{activeParcel.village}</strong>, Taluka: <strong>{activeParcel.taluka}</strong>, District: <strong>{activeParcel.district}</strong> ({activeParcel.state} - {activeParcel.pincode})
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: 'var(--radius-full)', background: 'var(--bg-surface)', border: '1px solid var(--border-medium)', color: '#06b6d4', fontWeight: 700 }}>
                {activeParcel.totalAreaAcre} Acres ({activeParcel.totalAreaHa} Ha)
              </span>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Type: {activeParcel.landClassification}
              </div>
            </div>
          </div>

          {/* LAND REGISTRATION & MUTATION COMPLETION PROGRESS TRACKER */}
          <div style={{ background: 'var(--bg-surface-elevated)', borderRadius: 'var(--radius-md)', padding: '18px', marginBottom: '20px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#06b6d4', fontWeight: 800, textTransform: 'uppercase' }}>
                  LAND REGISTRATION & MUTATION STATUS
                </span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {progress.overallCompletionPct}% Completed ({progress.completedStepsCount} of {progress.totalStepsCount} Steps Concluded)
                </h4>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 800, 
                  padding: '4px 10px', 
                  borderRadius: 'var(--radius-full)', 
                  background: progress.overallCompletionPct === 100 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(6, 182, 212, 0.2)',
                  color: progress.overallCompletionPct === 100 ? 'var(--accent-emerald)' : '#06b6d4'
                }}>
                  {progress.overallCompletionPct === 100 ? '✓ 100% REGISTRATION COMPLETED' : `~${progress.estimatedDaysToFinalIssuance} DAYS REMAINING`}
                </span>
              </div>
            </div>

            {/* Visual Progress Bar */}
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginBottom: '14px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ 
                width: `${progress.overallCompletionPct}%`, 
                height: '100%', 
                background: progress.overallCompletionPct === 100 
                  ? 'var(--accent-emerald)' 
                  : 'linear-gradient(90deg, #06b6d4 0%, #38bdf8 100%)',
                transition: 'width 0.5s ease-in-out'
              }} />
            </div>

            {/* Active Step Summary */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Application Ref: </span>
                <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{progress.applicationToken}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Sub-Registrar Desk: </span>
                <strong style={{ color: 'var(--text-primary)' }}>{progress.subRegistrarCircle}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Stamp Duty: </span>
                <strong style={{ color: 'var(--accent-emerald)' }}>{progress.stampDutyStatus}</strong>
              </div>
            </div>

            {/* Step-by-Step Milestones Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
              {progress.milestones.map((m) => {
                const isDone = m.status === 'COMPLETED';
                const isCurrent = m.status === 'IN_PROGRESS';

                return (
                  <div 
                    key={m.stepNumber}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '10px', 
                      fontSize: '0.8rem',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      background: isCurrent ? 'rgba(6, 182, 212, 0.08)' : 'transparent',
                      border: isCurrent ? '1px solid rgba(6, 182, 212, 0.3)' : 'none'
                    }}
                  >
                    <div style={{ 
                      width: '22px', 
                      height: '22px', 
                      borderRadius: '50%', 
                      background: isDone ? 'var(--accent-emerald)' : isCurrent ? '#06b6d4' : 'var(--bg-surface)', 
                      color: isDone || isCurrent ? '#ffffff' : 'var(--text-muted)',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '0.72rem', 
                      fontWeight: 800,
                      flexShrink: 0
                    }}>
                      {isDone ? '✓' : m.stepNumber}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <strong style={{ color: isDone ? 'var(--text-primary)' : isCurrent ? '#06b6d4' : 'var(--text-muted)' }}>
                          Step {m.stepNumber}: {m.title}
                        </strong>
                        <span style={{ 
                          fontSize: '0.7rem', 
                          fontWeight: 700, 
                          color: isDone ? 'var(--accent-emerald)' : isCurrent ? '#38bdf8' : 'var(--text-muted)' 
                        }}>
                          {isDone ? `Concluded (${m.completedDate})` : isCurrent ? `In Progress (~${m.daysRemaining} days left)` : 'Pending'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {m.description} • <em>Authority: {m.department}</em>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Registered Owners Grid */}
          <div style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '18px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Registered Ownership & Title Chain
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PRIMARY REGISTERED OWNER</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {activeParcel.registeredOwnerName}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', marginTop: '2px' }}>
                  Ownership Mode: {activeParcel.ownershipType}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>JOINT CO-OWNERS / LEGAL HEIRS ({activeParcel.jointOwners.length})</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                  {activeParcel.jointOwners.map((owner, idx) => (
                    <div key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      • {owner}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Historical Registration Deeds Table */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <History size={16} style={{ color: '#06b6d4' }} />
                Historical Registration Deeds ({activeParcel.totalRegistrationsCount} on Record)
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Sub-Registrar Office Verified</span>
            </div>

            <div className="custom-table-wrap">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Deed No & Date</th>
                    <th>Deed Type</th>
                    <th>Sub-Registrar Office</th>
                    <th>Parties Involved</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeParcel.registrationHistory.map((rec, rIdx) => (
                    <tr key={rIdx}>
                      <td>
                        <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#06b6d4' }}>
                          {rec.deedNumber}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{rec.registrationDate}</div>
                      </td>
                      <td style={{ fontWeight: 600, fontSize: '0.78rem' }}>{rec.deedType}</td>
                      <td style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{rec.subRegistrarOffice}</td>
                      <td style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{rec.partiesInvolved}</td>
                      <td>
                        <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-emerald)', fontWeight: 700 }}>
                          {rec.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

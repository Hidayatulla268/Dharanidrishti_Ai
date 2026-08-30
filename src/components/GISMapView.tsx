import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Layers, 
  Sparkles, 
  AlertTriangle, 
  Compass,
  Building,
  Navigation,
  Globe,
  Radio
} from 'lucide-react';
import { LandAcquisitionProject, RiskCategory } from '../types';

declare global {
  interface Window {
    google?: any;
  }
}

interface GISMapViewProps {
  projects: LandAcquisitionProject[];
  selectedProject: LandAcquisitionProject | null;
  onSelectProject: (project: LandAcquisitionProject) => void;
  onNavigateToXai: (project: LandAcquisitionProject) => void;
}

export const GISMapView: React.FC<GISMapViewProps> = ({
  projects,
  selectedProject,
  onSelectProject,
  onNavigateToXai
}) => {
  const [mapProvider, setMapProvider] = useState<'GOOGLE_MAPS' | 'LEAFLET'>('GOOGLE_MAPS');
  const [googleMapType, setGoogleMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('roadmap');
  const [showTraffic, setShowTraffic] = useState<boolean>(false);
  const [showCorridors, setShowCorridors] = useState<boolean>(true);
  
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('ALL');
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>('ALL');
  const [tileLayerType, setTileLayerType] = useState<'DARK' | 'SATELLITE' | 'STREET'>('DARK');

  const containerRef = useRef<HTMLDivElement>(null);

  // Leaflet refs
  const leafletMapRef = useRef<L.Map | null>(null);
  const leafletMarkersRef = useRef<{ [id: string]: L.Marker }>({});
  const leafletPolylineRef = useRef<L.LayerGroup | null>(null);

  // Google Maps refs
  const googleMapRef = useRef<any>(null);
  const googleMarkersRef = useRef<any[]>([]);
  const googlePolylinesRef = useRef<any[]>([]);
  const googleTrafficLayerRef = useRef<any>(null);
  const googleInfoWindowRef = useRef<any>(null);

  const states = Array.from(new Set(projects.map(p => p.state))).sort();

  const filteredProjects = projects.filter(p => {
    const matchesRisk = selectedRiskFilter === 'ALL' || p.riskCategory === selectedRiskFilter;
    const matchesState = selectedStateFilter === 'ALL' || p.state === selectedStateFilter;
    return matchesRisk && matchesState;
  });

  // Dark Style definition for Google Maps
  const googleMapsDarkStyle = [
    { elementType: 'geometry', stylers: [{ color: '#172033' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#172033' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#38bdf8' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#64748b' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#0f172a' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#26354a' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#0f172a' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#0284c7' }]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#1e293b' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#090d16' }]
    }
  ];

  // Helper to destroy previous map instances
  const cleanupMaps = () => {
    if (leafletMapRef.current) {
      leafletMapRef.current.remove();
      leafletMapRef.current = null;
      leafletMarkersRef.current = {};
    }
    if (googleMapRef.current) {
      googleMarkersRef.current.forEach(m => m.setMap(null));
      googleMarkersRef.current = [];
      googlePolylinesRef.current.forEach(p => p.setMap(null));
      googlePolylinesRef.current = [];
      googleMapRef.current = null;
    }
  };

  // Initialize Map based on provider
  useEffect(() => {
    if (!containerRef.current) return;
    cleanupMaps();

    if (mapProvider === 'GOOGLE_MAPS' && window.google?.maps) {
      const gmap = new window.google.maps.Map(containerRef.current, {
        center: { lat: 22.9734, lng: 78.6569 },
        zoom: 5,
        mapTypeId: googleMapType,
        styles: googleMapType === 'roadmap' ? googleMapsDarkStyle : [],
        zoomControl: true,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false
      });

      googleMapRef.current = gmap;
      googleInfoWindowRef.current = new window.google.maps.InfoWindow();

      if (showTraffic) {
        const trafficLayer = new window.google.maps.TrafficLayer();
        trafficLayer.setMap(gmap);
        googleTrafficLayerRef.current = trafficLayer;
      }
    } else {
      // Leaflet Fallback
      const map = L.map(containerRef.current, {
        center: [22.9734, 78.6569],
        zoom: 5,
        zoomControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);
      leafletMapRef.current = map;
      leafletPolylineRef.current = L.layerGroup().addTo(map);

      let tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      if (tileLayerType === 'SATELLITE') {
        tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      } else if (tileLayerType === 'STREET') {
        tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      }

      L.tileLayer(tileUrl, { maxZoom: 18 }).addTo(map);
    }

    return () => {
      cleanupMaps();
    };
  }, [mapProvider]);

  // Update Google Maps Type or Traffic Layer
  useEffect(() => {
    if (mapProvider === 'GOOGLE_MAPS' && googleMapRef.current && window.google?.maps) {
      googleMapRef.current.setMapTypeId(googleMapType);
      googleMapRef.current.setOptions({
        styles: googleMapType === 'roadmap' ? googleMapsDarkStyle : []
      });

      if (showTraffic) {
        if (!googleTrafficLayerRef.current) {
          const trafficLayer = new window.google.maps.TrafficLayer();
          trafficLayer.setMap(googleMapRef.current);
          googleTrafficLayerRef.current = trafficLayer;
        }
      } else {
        if (googleTrafficLayerRef.current) {
          googleTrafficLayerRef.current.setMap(null);
          googleTrafficLayerRef.current = null;
        }
      }
    }
  }, [googleMapType, showTraffic, mapProvider]);

  // Render Markers & Corridors
  useEffect(() => {
    if (mapProvider === 'GOOGLE_MAPS' && googleMapRef.current && window.google?.maps) {
      // Clear previous markers & polylines
      googleMarkersRef.current.forEach(m => m.setMap(null));
      googleMarkersRef.current = [];
      googlePolylinesRef.current.forEach(p => p.setMap(null));
      googlePolylinesRef.current = [];

      filteredProjects.forEach(p => {
        let pinColor = '#10b981';
        if (p.riskCategory === 'CRITICAL') pinColor = '#ef4444';
        else if (p.riskCategory === 'HIGH') pinColor = '#f97316';
        else if (p.riskCategory === 'MEDIUM') pinColor = '#f59e0b';

        // Google Marker
        const marker = new window.google.maps.Marker({
          position: { lat: p.latitude, lng: p.longitude },
          map: googleMapRef.current,
          title: p.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: pinColor,
            fillOpacity: 0.95,
            scale: 14,
            strokeColor: '#ffffff',
            strokeWeight: 2
          },
          label: {
            text: `${p.riskScore}`,
            color: '#ffffff',
            fontSize: '10px',
            fontWeight: 'bold'
          }
        });

        marker.addListener('click', () => {
          onSelectProject(p);

          const contentString = `
            <div style="padding: 12px; min-width: 260px; font-family: 'Inter', sans-serif; color: #0f172a;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
                <span style="font-family: monospace; font-size: 11px; color: #0284c7; font-weight: 700;">${p.code}</span>
                <span style="background: ${pinColor}22; color: ${pinColor}; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 9999px;">
                  ${p.riskCategory} (${p.riskScore}/100)
                </span>
              </div>
              <div style="font-weight: 800; font-size: 13px; margin-bottom: 4px;">${p.name}</div>
              <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">${p.district}, ${p.state} • ${p.agency}</div>

              <div style="background: #f8fafc; padding: 8px; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;">
                  <span style="color: #64748b;">Forecast Overrun:</span>
                  <strong style="color: #dc2626;">+${p.predictedDelayMonths} Months</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 2px;">
                  <span style="color: #64748b;">Disbursed:</span>
                  <strong style="color: #16a34a;">${p.disbursementPercentage.toFixed(1)}%</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 11px;">
                  <span style="color: #64748b;">Litigations:</span>
                  <strong>${p.pendingLitigationCases} active cases</strong>
                </div>
              </div>

              <button 
                id="gmap-xai-btn-${p.id}"
                style="width: 100%; padding: 7px 12px; background: #0284c7; border: none; border-radius: 6px; color: #ffffff; font-weight: 700; font-size: 11px; cursor: pointer;"
              >
                ⚡ Open in AI XAI Studio
              </button>
            </div>
          `;

          googleInfoWindowRef.current.setContent(contentString);
          googleInfoWindowRef.current.open(googleMapRef.current, marker);

          setTimeout(() => {
            const btn = document.getElementById(`gmap-xai-btn-${p.id}`);
            if (btn) {
              btn.onclick = () => onNavigateToXai(p);
            }
          }, 100);
        });

        googleMarkersRef.current.push(marker);

        // Corridor Polylines
        if (showCorridors && p.corridorPath) {
          const pathCoords = p.corridorPath.map(coord => ({ lat: coord[0], lng: coord[1] }));
          const polyline = new window.google.maps.Polyline({
            path: pathCoords,
            geodesic: true,
            strokeColor: pinColor,
            strokeOpacity: 0.8,
            strokeWeight: 4
          });
          polyline.setMap(googleMapRef.current);
          googlePolylinesRef.current.push(polyline);
        }
      });
    } else if (mapProvider === 'LEAFLET' && leafletMapRef.current) {
      // Leaflet render
      Object.values(leafletMarkersRef.current).forEach(m => m.remove());
      leafletMarkersRef.current = {};
      if (leafletPolylineRef.current) leafletPolylineRef.current.clearLayers();

      filteredProjects.forEach(p => {
        let pinColor = '#10b981';
        if (p.riskCategory === 'CRITICAL') pinColor = '#ef4444';
        else if (p.riskCategory === 'HIGH') pinColor = '#f97316';
        else if (p.riskCategory === 'MEDIUM') pinColor = '#f59e0b';

        const customIcon = L.divIcon({
          className: 'custom-leaflet-pin',
          html: `<div style="width:30px;height:30px;background:${pinColor};border:2px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:11px;box-shadow:0 0 12px ${pinColor};cursor:pointer;">${p.riskScore}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        const marker = L.marker([p.latitude, p.longitude], { icon: customIcon }).addTo(leafletMapRef.current!);
        marker.on('click', () => onSelectProject(p));
        leafletMarkersRef.current[p.id] = marker;

        if (showCorridors && p.corridorPath && leafletPolylineRef.current) {
          L.polyline(p.corridorPath, { color: pinColor, weight: 4, opacity: 0.75, dashArray: '6, 6' }).addTo(leafletPolylineRef.current);
        }
      });
    }
  }, [filteredProjects, showCorridors, mapProvider]);

  // Center on Selected Project
  useEffect(() => {
    if (!selectedProject) return;

    if (mapProvider === 'GOOGLE_MAPS' && googleMapRef.current) {
      googleMapRef.current.panTo({ lat: selectedProject.latitude, lng: selectedProject.longitude });
      googleMapRef.current.setZoom(8);
    } else if (mapProvider === 'LEAFLET' && leafletMapRef.current) {
      leafletMapRef.current.flyTo([selectedProject.latitude, selectedProject.longitude], 8, { duration: 1.2 });
    }
  }, [selectedProject, mapProvider]);

  return (
    <div>
      {/* View Header */}
      <div className="view-header">
        <div className="view-header-title">
          <h2>GIS Digital Map & Geospatial Corridor Intelligence</h2>
          <p>Multi-layer spatial visualization of national infrastructure corridors, live traffic, and land parcel bottlenecks.</p>
        </div>

        {/* Map Control Actions */}
        <div className="view-header-actions">
          {/* Provider Switcher */}
          <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)' }}>
            <button
              onClick={() => setMapProvider('GOOGLE_MAPS')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: mapProvider === 'GOOGLE_MAPS' ? 'var(--primary-600)' : 'transparent',
                color: mapProvider === 'GOOGLE_MAPS' ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              <Globe size={13} />
              <span>Google Maps Engine</span>
            </button>
            <button
              onClick={() => setMapProvider('LEAFLET')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '5px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                background: mapProvider === 'LEAFLET' ? 'var(--primary-600)' : 'transparent',
                color: mapProvider === 'LEAFLET' ? '#ffffff' : 'var(--text-secondary)'
              }}
            >
              <Layers size={13} />
              <span>CartoDB / OSM</span>
            </button>
          </div>

          {/* Google Maps View Type */}
          {mapProvider === 'GOOGLE_MAPS' ? (
            <div style={{ display: 'flex', background: 'var(--bg-surface)', padding: '3px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-medium)' }}>
              <button
                onClick={() => setGoogleMapType('roadmap')}
                style={{
                  padding: '5px 9px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  background: googleMapType === 'roadmap' ? 'var(--bg-surface-hover)' : 'transparent',
                  color: googleMapType === 'roadmap' ? 'var(--primary-400)' : 'var(--text-secondary)'
                }}
              >
                Dark Roadmap
              </button>
              <button
                onClick={() => setGoogleMapType('satellite')}
                style={{
                  padding: '5px 9px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  background: googleMapType === 'satellite' ? 'var(--bg-surface-hover)' : 'transparent',
                  color: googleMapType === 'satellite' ? 'var(--primary-400)' : 'var(--text-secondary)'
                }}
              >
                Satellite
              </button>
              <button
                onClick={() => setGoogleMapType('hybrid')}
                style={{
                  padding: '5px 9px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  background: googleMapType === 'hybrid' ? 'var(--bg-surface-hover)' : 'transparent',
                  color: googleMapType === 'hybrid' ? 'var(--primary-400)' : 'var(--text-secondary)'
                }}
              >
                Hybrid
              </button>
              <button
                onClick={() => setGoogleMapType('terrain')}
                style={{
                  padding: '5px 9px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  background: googleMapType === 'terrain' ? 'var(--bg-surface-hover)' : 'transparent',
                  color: googleMapType === 'terrain' ? 'var(--primary-400)' : 'var(--text-secondary)'
                }}
              >
                Terrain
              </button>
            </div>
          ) : null}

          {/* Traffic Toggle */}
          {mapProvider === 'GOOGLE_MAPS' && (
            <button
              onClick={() => setShowTraffic(!showTraffic)}
              className="btn-secondary"
              style={{ padding: '5px 10px', fontSize: '0.75rem' }}
            >
              <Radio size={13} style={{ color: showTraffic ? '#10b981' : 'var(--text-muted)' }} />
              <span>Traffic: {showTraffic ? 'ON' : 'OFF'}</span>
            </button>
          )}

          {/* Corridor Toggle */}
          <button
            onClick={() => setShowCorridors(!showCorridors)}
            className="btn-secondary"
            style={{ padding: '5px 10px', fontSize: '0.75rem' }}
          >
            <Navigation size={13} style={{ color: showCorridors ? 'var(--primary-400)' : 'var(--text-muted)' }} />
            <span>Corridors: {showCorridors ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Map Layout Grid with Side Drawer */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
        {/* Map Container */}
        <div style={{ position: 'relative' }}>
          <div ref={containerRef} className="map-viewport" />

          {/* Floating Legend */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>RISK TIERS:</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
              <span>Critical (80+)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }}></span>
              <span>High (60-79)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span>
              <span>Medium (35-59)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
              <span>Low (&lt;35)</span>
            </div>
          </div>
        </div>

        {/* Side Project Inspector & Filter Panel */}
        <div className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', maxHeight: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Corridors & Nodes</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{filteredProjects.length} Monitored</span>
          </div>

          {/* Filter Row */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
            <select 
              value={selectedStateFilter} 
              onChange={(e) => setSelectedStateFilter(e.target.value)}
              style={{ width: '100%', fontSize: '0.8rem' }}
            >
              <option value="ALL">All States / UTs</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select 
              value={selectedRiskFilter} 
              onChange={(e) => setSelectedRiskFilter(e.target.value)}
              style={{ width: '100%', fontSize: '0.8rem' }}
            >
              <option value="ALL">All Risk Tiers</option>
              <option value="CRITICAL">Critical Risk (80+)</option>
              <option value="HIGH">High Risk (60-79)</option>
              <option value="MEDIUM">Medium Risk (35-59)</option>
              <option value="LOW">Low Risk (0-34)</option>
            </select>
          </div>

          {/* Project List */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
            {filteredProjects.map((p) => {
              const isSelected = selectedProject?.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProject(p);
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'rgba(14, 165, 233, 0.15)' : 'var(--bg-surface)',
                    border: `1px solid ${isSelected ? 'var(--primary-400)' : 'var(--border-subtle)'}`,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--primary-400)', fontWeight: 600 }}>{p.code}</span>
                    <span className={`badge-risk ${p.riskCategory}`} style={{ padding: '2px 6px', fontSize: '0.68rem' }}>
                      {p.riskScore}
                    </span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: '4px', lineHeight: 1.3 }}>{p.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    <span>{p.district}, {p.state}</span>
                    <span style={{ color: p.predictedDelayMonths > 6 ? '#ff6b6b' : 'inherit', fontWeight: 600 }}>
                      +{p.predictedDelayMonths}m delay
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

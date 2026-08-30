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
  Radio,
  KeyRound,
  X,
  Check,
  ShieldAlert
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
  const hasGoogleMaps = typeof window !== 'undefined' && !!(window as any).google?.maps;
  const [mapProvider, setMapProvider] = useState<'GOOGLE_MAPS' | 'LEAFLET'>('LEAFLET');
  const [googleMapType, setGoogleMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('roadmap');
  const [showTraffic, setShowTraffic] = useState<boolean>(false);
  const [showCorridors, setShowCorridors] = useState<boolean>(true);
  const [customApiKey, setCustomApiKey] = useState<string>('');
  const [showKeyModal, setShowKeyModal] = useState<boolean>(false);
  
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

  // Ultra-detailed Command Center Dark Style for Google Maps
  const googleMapsDarkStyle = [
    { elementType: 'geometry', stylers: [{ color: '#080c17' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#080c17' }, { weight: 3 }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#94a3b8' }] },
    {
      featureType: 'administrative',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1e293b' }, { weight: 1 }]
    },
    {
      featureType: 'administrative.country',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#0284c7' }, { weight: 1.5 }]
    },
    {
      featureType: 'administrative.province',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#38bdf8' }, { weight: 1 }]
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#38bdf8' }]
    },
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#06201b' }, { visibility: 'simplified' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#34d399' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#0f172a' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#090d16' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#64748b' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#0369a1' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#0c4a6e' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#e0f2fe' }]
    },
    {
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{ color: '#1e293b' }]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#1e293b' }]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#0284c7' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#040711' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#0284c7' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#040711' }]
    }
  ];

  // Helper to dynamically load Google Maps at runtime safely
  const loadGoogleMapsWithKey = (key: string) => {
    if (!key.trim()) return;
    try {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key.trim())}&libraries=places,geometry`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setShowKeyModal(false);
        setMapProvider('GOOGLE_MAPS');
      };
      script.onerror = () => {
        alert('Failed to connect to Google Maps API with the provided key. Please check network/key validity.');
      };
      document.head.appendChild(script);
    } catch (err) {
      console.error('Failed to append Google Maps script:', err);
    }
  };

  // Safe error handling for Google Maps auth failures
  useEffect(() => {
    (window as any).gm_authFailure = () => {
      console.warn('Google Maps API authentication failed. Automatically falling back to Leaflet GIS engine.');
      setMapProvider('LEAFLET');
    };
  }, []);

  // Helper to destroy previous map instances
  const cleanupMaps = () => {
    if (leafletMapRef.current) {
      try {
        leafletMapRef.current.remove();
      } catch (e) {
        console.warn('Cleanup leaflet map error:', e);
      }
      leafletMapRef.current = null;
      leafletMarkersRef.current = {};
    }
    if (containerRef.current) {
      (containerRef.current as any)._leaflet_id = null;
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
      // Leaflet High-Performance GIS Engine
      try {
        if (containerRef.current) {
          (containerRef.current as any)._leaflet_id = null;
        }

        const map = L.map(containerRef.current, {
          center: [22.9734, 78.6569],
          zoom: 5,
          zoomControl: false,
          preferCanvas: true
        });

        L.control.zoom({ position: 'bottomright' }).addTo(map);
        leafletMapRef.current = map;
        leafletPolylineRef.current = L.layerGroup().addTo(map);

        let tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
        let subdomains: string | string[] = 'abcd';
        if (tileLayerType === 'SATELLITE') {
          tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
          subdomains = 'abc';
        } else if (tileLayerType === 'STREET') {
          tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
          subdomains = 'abc';
        }

        L.tileLayer(tileUrl, { 
          maxZoom: 18, 
          subdomains,
          attribution: '&copy; OpenStreetMap contributors, CartoDB, ESRI' 
        }).addTo(map);

        map.whenReady(() => {
          map.invalidateSize();
        });

        const timer1 = setTimeout(() => {
          if (leafletMapRef.current) {
            leafletMapRef.current.invalidateSize();
          }
        }, 100);

        const timer2 = setTimeout(() => {
          if (leafletMapRef.current) {
            leafletMapRef.current.invalidateSize();
          }
        }, 300);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      } catch (err) {
        console.error('Failed to initialize Leaflet map:', err);
      }
    }

    return () => {
      cleanupMaps();
    };
  }, [mapProvider, tileLayerType]);

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

        // Google Marker with High-Contrast Ring
        const marker = new window.google.maps.Marker({
          position: { lat: p.latitude, lng: p.longitude },
          map: googleMapRef.current,
          title: p.name,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: pinColor,
            fillOpacity: 1,
            scale: 14,
            strokeColor: '#080c17',
            strokeWeight: 3
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
            <div style="padding: 14px; min-width: 270px; font-family: 'Inter', sans-serif; background: #0b1220; color: #f8fafc; border-radius: 10px;">
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px;">
                <span style="font-family: monospace; font-size: 11px; color: #38bdf8; font-weight: 700; background: rgba(56, 189, 248, 0.12); padding: 2px 6px; border-radius: 4px;">${p.code}</span>
                <span style="background: ${pinColor}25; color: ${pinColor}; border: 1px solid ${pinColor}55; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 9999px;">
                  ${p.riskCategory} (${p.riskScore}/100)
                </span>
              </div>
              <div style="font-weight: 800; font-size: 13px; margin-bottom: 4px; color: #ffffff;">${p.name}</div>
              <div style="font-size: 11px; color: #94a3b8; margin-bottom: 10px;">${p.district}, ${p.state} • ${p.agency}</div>

              <div style="background: #0f172a; padding: 10px; border-radius: 8px; border: 1px solid rgba(148, 163, 184, 0.15); margin-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                  <span style="color: #94a3b8;">Forecast Delay:</span>
                  <strong style="color: #f87171;">+${p.predictedDelayMonths} Months</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                  <span style="color: #94a3b8;">Disbursed:</span>
                  <strong style="color: #34d399;">${p.disbursementPercentage.toFixed(1)}%</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 11px;">
                  <span style="color: #94a3b8;">Litigations:</span>
                  <strong style="color: #fbbf24;">${p.pendingLitigationCases} active cases</strong>
                </div>
              </div>

              <button 
                id="gmap-xai-btn-${p.id}"
                style="width: 100%; padding: 8px 12px; background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); border: none; border-radius: 6px; color: #ffffff; font-weight: 700; font-size: 11px; cursor: pointer; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.35);"
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
            strokeOpacity: 0.85,
            strokeWeight: 4
          });
          polyline.setMap(googleMapRef.current);
          googlePolylinesRef.current.push(polyline);
        }
      });
    } else if (leafletMapRef.current) {
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
          html: `<div style="width:32px;height:32px;background:${pinColor};border:2.5px solid #080c17;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:11px;box-shadow:0 0 16px ${pinColor}, 0 0 0 2px rgba(255,255,255,0.25);cursor:pointer;animation: pinRadar 2.8s infinite;">${p.riskScore}</div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([p.latitude, p.longitude], { icon: customIcon }).addTo(leafletMapRef.current!);
        
        const popupContent = `
          <div style="padding: 8px; min-width: 250px; font-family: 'Inter', sans-serif;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px;">
              <span style="font-family: monospace; font-size: 11px; color: #38bdf8; font-weight: 700;">${p.code}</span>
              <span style="background: ${pinColor}25; color: ${pinColor}; border: 1px solid ${pinColor}55; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 9999px;">
                ${p.riskCategory} (${p.riskScore}/100)
              </span>
            </div>
            <div style="font-weight: 800; font-size: 13px; margin-bottom: 4px; color: #f8fafc;">${p.name}</div>
            <div style="font-size: 11px; color: #94a3b8; margin-bottom: 8px;">${p.district}, ${p.state} • ${p.agency}</div>

            <div style="background: #080c17; padding: 8px; border-radius: 6px; border: 1px solid rgba(148, 163, 184, 0.15); margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 3px;">
                <span style="color: #94a3b8;">Predicted Delay:</span>
                <strong style="color: #f87171;">+${p.predictedDelayMonths} Months</strong>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 11px;">
                <span style="color: #94a3b8;">Disbursed:</span>
                <strong style="color: #34d399;">${p.disbursementPercentage.toFixed(1)}%</strong>
              </div>
            </div>

            <div style="font-size: 11px; color: #38bdf8; font-weight: 700; text-align: center; cursor: pointer;">
              Click marker to select project ➔
            </div>
          </div>
        `;
        
        marker.bindPopup(popupContent);
        marker.on('click', () => onSelectProject(p));
        leafletMarkersRef.current[p.id] = marker;

        if (showCorridors && p.corridorPath && leafletPolylineRef.current) {
          L.polyline(p.corridorPath, { color: pinColor, weight: 4, opacity: 0.85, dashArray: '6, 6' }).addTo(leafletPolylineRef.current);
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

          {/* API Key Modal Trigger */}
          <button
            onClick={() => setShowKeyModal(true)}
            className="btn-secondary"
            title="Configure Google Maps API Key"
            style={{ padding: '5px 10px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <KeyRound size={13} style={{ color: hasGoogleMaps ? '#10b981' : 'var(--primary-400)' }} />
            <span>{hasGoogleMaps ? 'Google Key Active' : 'Set Google Key'}</span>
          </button>

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
          <div 
            ref={containerRef} 
            className="map-viewport" 
            style={{ 
              width: '100%', 
              height: '640px', 
              minHeight: '560px', 
              background: '#080c17', 
              borderRadius: 'var(--radius-lg)', 
              overflow: 'hidden',
              border: '1px solid var(--border-medium)'
            }} 
          />

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

      {/* Google Maps API Key Configuration Modal */}
      {showKeyModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(8, 12, 23, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-xl)',
            width: '100%',
            maxWidth: '480px',
            padding: '24px',
            boxShadow: 'var(--shadow-xl)',
            position: 'relative'
          }}>
            <button
              onClick={() => setShowKeyModal(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ padding: '8px', borderRadius: 'var(--radius-md)', background: 'rgba(14, 165, 233, 0.15)', color: 'var(--primary-400)' }}>
                <KeyRound size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>Google Maps Platform Key</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>Activate live Google Satellite, Hybrid & Traffic layers</p>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
              The platform runs with the built-in <strong>Leaflet High-Res CartoDB & Satellite Engine</strong> by default without any API key. If you have a Google Maps JavaScript API key, enter it below:
            </p>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                GOOGLE MAPS API KEY (AIzaSy...)
              </label>
              <input
                type="password"
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                placeholder="AIzaSy..."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  fontFamily: 'monospace'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowKeyModal(false);
                  setMapProvider('LEAFLET');
                }}
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.8rem' }}
              >
                Use Built-in Leaflet
              </button>
              <button
                onClick={() => loadGoogleMapsWithKey(customApiKey)}
                className="btn-primary"
                disabled={!customApiKey.trim()}
                style={{ padding: '8px 16px', fontSize: '0.8rem', opacity: customApiKey.trim() ? 1 : 0.5 }}
              >
                Apply & Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

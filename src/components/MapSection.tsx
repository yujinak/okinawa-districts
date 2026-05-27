import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { okinawaDistricts } from '../data/districtData';
import type { District } from '../data/districtData';

import Map, { Source, Layer } from 'react-map-gl/maplibre';
import type { MapLayerMouseEvent } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { updatePercentiles } from '../utils';

// -----------------------------------------------------------
// Types for the loaded GeoJSON
// -----------------------------------------------------------
interface DistrictGeo {
  id: string;
  type: string;
  coordinates: number[][][][];
}

interface OkinawaGeoMap {
  kunigami: DistrictGeo;
  nakagami: DistrictGeo;
  shimajiri: DistrictGeo;
  miyako: DistrictGeo;
  yaeyama: DistrictGeo;
}

interface OkinawaGeoJson {
  type: "FeatureCollection";
  name: string;
  features: Array<{
    type: "Feature";
    geometry: {
      type: "Polygon" | "MultiPolygon";
      coordinates: number[][][] | number[][][][];
    };
    properties: {
      N03_001: string;      // Prefecture (都道府県)
      N03_002: null | string;
      N03_003: null | string;
      N03_004: string;      // District name (市区町村)
      N03_005: null | string;
      N03_007: string;      // Code
    };
  }>;
}

interface MapSectionProps {
  selectedDistrict: District;
  hoveredDistrict: District | null;
  onSelectDistrict: (district: District) => void;
  onHoverDistrict: (district: District | null) => void;
}

// -----------------------------------------------------------
// Projection config for each district group
// -----------------------------------------------------------
interface ProjectionConfig {
  bounds: { minLng: number; maxLng: number; minLat: number; maxLat: number };
  xOffset: number; yOffset: number; boxWidth: number; boxHeight: number;
}

const PROJECTION_CONFIG: Record<string, ProjectionConfig> = {
  honto:   { bounds: { minLng: 127.58, maxLng: 128.35, minLat: 26.07, maxLat: 26.88 }, xOffset: 200, yOffset: 18,  boxWidth: 385, boxHeight: 414 },
  miyako:  { bounds: { minLng: 125.10, maxLng: 125.48, minLat: 24.65, maxLat: 24.93 }, xOffset: 22,  yOffset: 272, boxWidth: 156, boxHeight: 144 },
  yaeyama: { bounds: { minLng: 122.92, maxLng: 124.35, minLat: 24.02, maxLat: 24.60 }, xOffset: 22,  yOffset: 102, boxWidth: 156, boxHeight: 144 },
};

function getConfig(districtId: string): ProjectionConfig {
  if (districtId === 'miyako') return PROJECTION_CONFIG.miyako;
  if (districtId === 'yaeyama') return PROJECTION_CONFIG.yaeyama;
  return PROJECTION_CONFIG.honto;
}

// -----------------------------------------------------------
// Aspect-Ratio-Correct Plate Carrée Projection
// cos(26.3°) ≈ 0.896 corrects longitude squish at Okinawa's latitude
// -----------------------------------------------------------
const COS_LAT = 0.896;

function project(
  lng: number,
  lat: number,
  cfg: ProjectionConfig
): [number, number] {
  const { bounds, xOffset, yOffset, boxWidth, boxHeight } = cfg;
  const dLng = (bounds.maxLng - bounds.minLng) * COS_LAT;
  const dLat = bounds.maxLat - bounds.minLat;
  const scale = Math.min(boxWidth / dLng, boxHeight / dLat);
  const mapWidth = dLng * scale;
  const mapHeight = dLat * scale;
  const xCenter = (boxWidth - mapWidth) / 2;
  const yCenter = (boxHeight - mapHeight) / 2;
  const x = xOffset + xCenter + (lng - bounds.minLng) * COS_LAT * scale;
  const y = yOffset + yCenter + (bounds.maxLat - lat) * scale;
  
  return [x, y];
}

// -----------------------------------------------------------
// Build SVG path D string from a district's coordinate array
// -----------------------------------------------------------
function buildPathD(coordinates: number[][][][], districtId: string): string {
  const cfg = getConfig(districtId);
  const { bounds } = cfg;

  // For Okinawa Honto districts, clip away outlying island polygons
  // that are outside the main island's coordinate range
  const isHonto = districtId !== 'miyako' && districtId !== 'yaeyama';
  const lngPadding = 0.15;

  let d = '';
  coordinates.forEach((polygon) => {
    const exterior = polygon[0];
    if (!exterior || exterior.length < 3) return;

    if (isHonto) {
      // Filter: if the polygon centroid is outside the Honto bounds window, skip it
      const avgLng = exterior.reduce((s, p) => s + p[0], 0) / exterior.length;
      const avgLat = exterior.reduce((s, p) => s + p[1], 0) / exterior.length;
      if (
        avgLng < bounds.minLng - lngPadding ||
        avgLng > bounds.maxLng + lngPadding ||
        avgLat < bounds.minLat - 0.05 ||
        avgLat > bounds.maxLat + 0.05
      ) {
        return; // Skip outlying islands from main viewport
      }
    }

    polygon.forEach((ring) => {
      if (ring.length < 3) return;
      ring.forEach((pt, idx) => {
        const [x, y] = project(pt[0], pt[1], cfg);
        d += idx === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)} ` : `L ${x.toFixed(1)} ${y.toFixed(1)} `;
      });
      d += 'Z ';
    });
  });

  return d;
}


// -----------------------------------------------------------
// Component
// -----------------------------------------------------------
export const MapSection: React.FC<MapSectionProps> = ({
  selectedDistrict,
  hoveredDistrict,
  onSelectDistrict,
  onHoverDistrict,
}) => {
  const [geoMap, setGeoMap] = useState<any | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [hoverInfo, setHoverInfo] = useState<{ feature: any; x: number; y: number } | null>(null);
  const [allData, setAllData] = useState(null);

  // Lazy-fetch the 529KB GeoJSON from public/ — keeps the JS bundle lean
/*   useEffect(() => {
    fetch('/okinawa-geojson.json')
      .then((r) => r.json())
      .then((data) => setGeoMap(data))
      .catch(() => setLoadError(true));
  }, []); */
  useEffect(() => {
    fetch("/N03-20240101_47.geojson")
      .then(response => response.json())
      .then(json => setGeoMap(json))
      .catch(err => console.error("GeoJson não foi lido", err));
  },[])

  const onHover = useCallback((event: MapLayerMouseEvent) => {
    const {
      features,
      point: {x, y}
    } = event;
    const hoveredFeature = features && features[0];

    setHoverInfo(hoveredFeature ? {feature: hoveredFeature, x, y} : null);
  }, []);
  /* const data = useMemo(() => {
    return allData && updatePercentiles(allData, f => f.properties.income[year]);
  }, [allData, year]); */

  const hoveredCode = hoverInfo?.feature?.properties?.N03_007 || null;

  const fillLayer = useMemo((): any => ({
    id: 'districts-fill',
    type: 'fill',
    paint: {
      'fill-color': [
        'case',
        ['==', ['get', 'N03_007'], hoveredCode || ''],
        '#6366f1',
        '#3b82f6'
      ],
      'fill-opacity': [
        'case',
        ['==', ['get', 'N03_007'], hoveredCode || ''],
        0.5,
        0.15
      ]
    }
  }), [hoveredCode]);

  const lineLayer = useMemo((): any => ({
    id: 'districts-outline',
    type: 'line',
    paint: {
      'line-color': '#4f46e5',
      'line-width': 1,
      'line-opacity': 0.8
    }
  }), []);

  const activeDistrictForPois = hoveredDistrict || selectedDistrict;
  const poiCfg = getConfig(activeDistrictForPois.id);

  return (
    <div className="glass-card active-district" style={{ padding: '1rem' }} id="interactive-map-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <div>
        
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          Passe o mouse por cima de cada região para visualizar informações
        </div>
      </div>

      <div
        className="map-svg-container"
        style={{ position: 'relative', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'rgba(201, 201, 201, 0.9)' }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '30px 30px', pointerEvents: 'none',
          }}
        />

        {/* Compass Rose */}
        <div style={{ position: 'absolute', top: '15px', right: '15px', pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', opacity: 0.65 }}>
          <svg width="40" height="40" viewBox="0 0 100 100" style={{ transform: 'rotate(-45deg)' }}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <path d="M50 5 L55 45 L95 50 L55 55 L50 95 L45 55 L5 50 L45 45 Z" fill="none" stroke="var(--active-color)" strokeWidth="1.5" />
            <text x="50" y="25" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle" transform="rotate(45, 50, 50)">N</text>
          </svg>
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-heading)', letterSpacing: '0.1em', marginTop: '4px', color: 'var(--text-secondary)' }}>
            26.2124° N, 127.6792° E
          </span>
        </div>

        {/* Scale indicator */}
        <div style={{ position: 'absolute', bottom: '15px', right: '15px', pointerEvents: 'none', color: 'var(--text-secondary)', fontSize: '0.65rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span>0</span>
            <div style={{ width: '50px', height: '3px', background: 'var(--text-secondary)', position: 'relative' }}>
              <div style={{ position: 'absolute', right: 0, top: '-3px', width: '1px', height: '9px', background: 'var(--text-secondary)' }} />
              <div style={{ position: 'absolute', left: 0, top: '-3px', width: '1px', height: '9px', background: 'var(--text-secondary)' }} />
            </div>
            <span>50 km</span>
          </div>
        </div>

        {/* Loading / Error state */}
        {!geoMap && !loadError && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <span style={{ animation: 'pulse 1.5s infinite' }}>Loading geographic data…</span>
          </div>
        )}
        {loadError && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f43f5e', fontSize: '0.85rem' }}>
            Failed to load map data.
          </div>
        )}

        <Map
          initialViewState={{
            longitude: 127.8223,
            latitude: 26.4327,
            zoom: 9
          }}
          style={{width: '100%', height: '100%'}}
          mapStyle="https://api.maptiler.com/maps/openstreetmap/style.json?key=ftfgktbOlTVeswczCoAh"
          onMouseMove={onHover}
          interactiveLayerIds={['districts-fill']}
        >
          {geoMap && (
            <Source type="geojson" data={geoMap}>
              <Layer {...fillLayer} />
              <Layer {...lineLayer} />
            </Source>
          )}
        </Map>

        {/* Hover Information Tooltip Card */}
        {hoverInfo && hoverInfo.feature && hoverInfo.feature.properties && (
          <div
            style={{
              position: 'absolute',
              left: hoverInfo.x + 15,
              top: hoverInfo.y + 15,
              pointerEvents: 'none',
              background: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '0.6rem 0.8rem',
              color: '#fff',
              fontSize: '0.75rem',
              zIndex: 100,
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6)',
              minWidth: '150px'
            }}
          >
            <div style={{ fontWeight: 'bold', color: '#818cf8', marginBottom: '2px' }}>
              {hoverInfo.feature.properties.N03_004}
            </div>
            {hoverInfo.feature.properties.N03_003 && (
              <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '4px' }}>
                {hoverInfo.feature.properties.N03_003}
              </div>
            )}
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
              Código: {hoverInfo.feature.properties.N03_007}
            </div>
          </div>
        )}

        {/* Main SVG */}
        <svg viewBox="0 0 600 450" width="100%" height="100%" style={{ display: 'block' }}>
          {/* <defs>
            <filter id="glow-effect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {okinawaDistricts.map((d) => (
              <linearGradient key={d.id} id={`grad-${d.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={`hsla(${d.themeColor}, 0.06)`} />
                <stop offset="100%" stopColor={`hsla(${d.themeColor}, 0.32)`} />
              </linearGradient>
            ))}
          </defs> */}

          {/* Inset frames */}
          {/* <g id="map-insets" style={{ pointerEvents: 'none' }}>
            <rect x="20" y="268" width="160" height="152" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" rx="8" />
            <text x="32" y="286" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-heading)" letterSpacing="0.05em">MIYAKO INSET</text>
            <rect x="20" y="98" width="160" height="152" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" rx="8" />
            <text x="32" y="116" fill="var(--text-secondary)" fontSize="10" fontFamily="var(--font-heading)" letterSpacing="0.05em">YAEYAMA INSET</text>
          </g> */}

          {/* District paths — rendered once geoMap is available */}
          {/* geoMap && (
            <g id="districts-layer">
              {okinawaDistricts.map((district) => {
                const geoData = geoMap[district.id as keyof OkinawaGeoMap];
                if (!geoData) return null;
                const pathD = buildPathD(geoData.coordinates, district.id);
                if (!pathD.trim()) return null;

                const isSelected = selectedDistrict.id === district.id;
                const isHovered = hoveredDistrict?.id === district.id;

                return (
                  <path
                    key={district.id}
                    d={pathD}
                    className={`map-island-path${isSelected ? ' selected' : ''}`}
                    fill={isSelected ? `url(#grad-${district.id})` : 'rgba(15, 23, 42, 0.45)'}
                    stroke={isSelected ? district.glowColor : isHovered ? district.glowColor : 'rgba(255,255,255,0.15)'}
                    strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 1}
                    filter={isSelected || isHovered ? 'url(#glow-effect)' : 'none'}
                    onMouseEnter={() => onHoverDistrict(district)}
                    onMouseLeave={() => onHoverDistrict(null)}
                    onClick={() => onSelectDistrict(district)}
                  />
                );
              })}
            </g>
          ) */}

          {/* Region labels on main island */}
          {/* <g id="region-labels" style={{ pointerEvents: 'none' }}>
            <text x="442" y="148" fill="rgba(255,255,255,0.75)" fontSize="11" fontWeight="bold" fontFamily="var(--font-heading)" textAnchor="middle">Kunigami</text>
            <text x="370" y="248" fill="rgba(255,255,255,0.75)" fontSize="11" fontWeight="bold" fontFamily="var(--font-heading)" textAnchor="middle">Nakagami</text>
            <text x="262" y="340" fill="rgba(255,255,255,0.75)" fontSize="11" fontWeight="bold" fontFamily="var(--font-heading)" textAnchor="middle">Shimajiri</text>
          </g> */}
        </svg>

        {/* Real Geographically Aligned POI Pins */}
        {/* geoMap && activeDistrictForPois.keyAttractions.map((attraction, idx) => {
          const [projX, projY] = project(attraction.lng, attraction.lat, poiCfg);
          const leftPercent = (projX / 600) * 100;
          const topPercent = (projY / 450) * 100;
          if (leftPercent < 1 || leftPercent > 99 || topPercent < 1 || topPercent > 99) return null;

          return (
            <div
              key={idx}
              className="map-poi-pin"
              id={`poi-pin-${idx}`}
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                background: activeDistrictForPois.glowColor,
                boxShadow: `0 0 8px ${activeDistrictForPois.glowColor}, 0 0 16px rgba(255,255,255,0.4)`,
              }}
              title={attraction.name}
            >
              <div
                className="poi-card"
                style={{
                  position: 'absolute',
                  bottom: '22px',
                  left: '50%',
                  transform: 'translateX(-50%) scale(0.9)',
                  opacity: 0,
                  pointerEvents: 'none',
                  background: 'rgba(5, 8, 20, 0.95)',
                  border: `1px solid ${activeDistrictForPois.glowColor}`,
                  boxShadow: `0 8px 25px rgba(0,0,0,0.8)`,
                  padding: '0.6rem 0.8rem',
                  borderRadius: '8px',
                  width: '180px',
                  zIndex: 100,
                  transition: 'opacity 0.2s ease, transform 0.2s ease',
                  fontSize: '0.75rem',
                  lineHeight: '1.25',
                  backdropFilter: 'blur(8px)',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontWeight: 'bold', color: '#fff', marginBottom: '2px' }}>{attraction.name}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.65rem' }}>{attraction.description}</div>
              </div>
              <style>{`#poi-pin-${idx}:hover .poi-card { opacity: 1; transform: translateX(-50%) scale(1); pointer-events: auto; }`}</style>
            </div>
          );
        }) */}
      </div>

      {/* District selector legend */}
      {/* <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {okinawaDistricts.map((district) => (
          <button
            key={district.id}
            onClick={() => onSelectDistrict(district)}
            className={`badge${selectedDistrict.id === district.id ? ' badge-active' : ''}`}
            style={{
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: selectedDistrict.id === district.id ? `hsla(${district.themeColor}, 0.15)` : 'rgba(255,255,255,0.02)',
              border: selectedDistrict.id === district.id ? `1px solid hsl(${district.themeColor})` : '1px solid var(--border-color)',
              color: selectedDistrict.id === district.id ? `hsl(${district.themeColor})` : 'var(--text-secondary)',
            }}
          >
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: `hsl(${district.themeColor})`, marginRight: '4px' }} />
            {district.name.split(' ')[0]}
          </button>
        ))}
      </div> */}
    </div>
  );
};

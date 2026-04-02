import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { geoMercator, geoPath } from 'd3-geo';
import { regionData, regionCentroids } from './regionData';
import { gastronomySpots, spotTypeColors } from './gastronomySpots';

// Spot label ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ entity type + id mapping for mini-cards
const SPOT_ENTITY_MAP = {
  'Carbonara': { type: 'recipes', id: 'cacio-e-pepe' },
  'Parmigiano': { type: 'ingredients', id: 'parmigiano-reggiano' },
  'Truffle': { type: 'ingredients', id: 'tartufo-bianco-alba' },
  'Pizza': { type: 'recipes', id: 'pizza-margherita' },
  'Mozzarella': { type: 'ingredients', id: 'mozzarella-di-bufala' },
  'San Marzano': { type: 'ingredients', id: 'san-marzano' },
  'Pesto': { type: 'ingredients', id: 'pesto-genovese' },
  'Nduja': { type: 'ingredients', id: 'nduja' },
  'Balsamic': { type: 'ingredients', id: 'aceto-balsamico' },
  'Prosciutto': { type: 'ingredients', id: 'prosciutto-di-parma' },
  'Olio EVO': { type: 'ingredients', id: 'olio-extra-vergine' },
  'Taggiasca': { type: 'ingredients', id: 'olio-extra-vergine' },
  'Tortellini': { type: 'recipes', id: 'tagliatelle-ragu' },
  'Risotto': { type: 'recipes', id: 'risotto-milanese' },
  'Orecchiette': { type: 'recipes', id: 'pasta-alla-norma' },
};

const GEOJSON_URL = 'https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson';



const LAYER_TYPE_MAP = {
  producers: ['producer'],
  ingredients: ['ingredient'],
  dishes: ['dish'],
  wines: ['wine'],
  experiences: ['experience'],
};

function normalizeRegionName(name) {
  if (!name) return '';
  const map = {
    "Valle d'Aosta/VallÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ©e d'Aoste": 'valle_daosta',
    "Valle d'Aosta": 'valle_daosta',
    'Piemonte': 'piemonte',
    'Lombardia': 'lombardia',
    'Trentino-Alto Adige/SÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¼dtirol': 'trentino_alto_adige',
    'Trentino-Alto Adige': 'trentino_alto_adige',
    'Veneto': 'veneto',
    'Friuli-Venezia Giulia': 'friuli_venezia_giulia',
    'Liguria': 'liguria',
    'Emilia-Romagna': 'emilia_romagna',
    'Toscana': 'toscana',
    'Umbria': 'umbria',
    'Marche': 'marche',
    'Lazio': 'lazio',
    'Abruzzo': 'abruzzo',
    'Molise': 'molise',
    'Campania': 'campania',
    'Puglia': 'puglia',
    'Basilicata': 'basilicata',
    'Calabria': 'calabria',
    'Sicilia': 'sicilia',
    'Sardegna': 'sardegna',
  };
  if (map[name]) return map[name];
  return name.toLowerCase()
    .replace(/[ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¡ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢]/g, 'a').replace(/[ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¨ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ©ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂª]/g, 'e').replace(/[ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¬ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ­ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ®]/g, 'i')
    .replace(/[ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ²ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ³ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ´]/g, 'o').replace(/[ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¹ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂºÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ»]/g, 'u')
    .replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
}

function getRegionColor(regionId, producerCount, isHovered) {
  if (isHovered) return '#2D6A4F';
  if (producerCount >= 40) return '#2D5A2D';
  if (producerCount >= 20) return '#1E3E1E';
  if (producerCount >= 10) return '#183218';
  return '#132513';
}

const geojsonCache = { data: null };

function toSlug(str) {
  var s = str.toLowerCase();
  var out = "";
  for (var i = 0; i < s.length; i++) {
    var ch = s.charCodeAt(i);
    if ((ch >= 97 && ch <= 122) || (ch >= 48 && ch <= 57)) {
      out += s.charAt(i);
    } else if (out.length > 0 && out.charAt(out.length - 1) !== "-") {
      out += "-";
    }
  }
  if (out.charAt(out.length - 1) === "-") out = out.substring(0, out.length - 1);
  return out;
}

export default function ItalyMap({ selectedRegion, onRegionSelect, onRegionHover, activeLayer = 'all', activeJourney = null }) {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const [geojson, setGeojson] = useState(null);
  const [dims, setDims] = useState({ width: 600, height: 800 });
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const [miniCard, setMiniCard] = useState(null); // { x, y, label, emoji, type, id }

  useEffect(() => {
    if (geojsonCache.data) { setGeojson(geojsonCache.data); return; }
    fetch(GEOJSON_URL).then(r => r.json()).then(data => {
      data.features = data.features.map(f => {
        const rawName = f.properties.reg_name || f.properties.NOME_REG || f.properties.name || '';
        return { ...f, properties: { ...f.properties, regionId: normalizeRegionName(rawName) } };
      });
      geojsonCache.data = data;
      setGeojson(data);
    }).catch(() => console.warn('GeoJSON load failed'));
  }, []);

  useEffect(() => {
    const obs = new ResizeObserver(entries => {
      for (const e of entries) setDims({ width: e.contentRect.width, height: e.contentRect.height });
    });
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const proj = useMemo(() => {
    if (!dims.width || !dims.height || !geojson) return null;
    const projection = geoMercator();
    projection.fitExtent([[0, 95], [dims.width, dims.height + 60]], geojson);
    return projection;
  }, [dims, geojson]);

  const pathGen = useMemo(() => proj ? geoPath().projection(proj) : null, [proj]);

  const getPos = useCallback((lng, lat) => {
    if (!proj) return null;
    return proj([lng, lat]);
  }, [proj]);

  const regionPathRefs = useRef({});
  const [zoomTransform, setZoomTransform] = useState({ tx: 0, ty: 0, scale: 1 });
  const [regionBBoxes, setRegionBBoxes] = useState({});

  useEffect(() => {
    if (!selectedRegion || !dims.width || !dims.height) {
      setZoomTransform({ tx: 0, ty: 0, scale: 1 });
      return;
    }
    const el = regionPathRefs.current[selectedRegion];
    if (!el) return;
    const bbox = el.getBBox();
    if (!bbox.width || !bbox.height) return;
    const scale = Math.min(dims.width, dims.height) * 0.75 / Math.max(bbox.width, bbox.height);
    const tx = (dims.width * 0.68) / 2 - scale * (bbox.x + bbox.width / 2);
    const ty = dims.height / 2 - scale * (bbox.y + bbox.height / 2);
    setZoomTransform({ tx, ty, scale });
  }, [selectedRegion, dims]);

  // Compute region bboxes from SVG paths once geojson is ready
  useEffect(() => {
    if (!geojson || !pathGen) return;
    // Small delay to ensure all path refs are rendered
    const timer = setTimeout(() => {
      const bboxes = {};
      Object.entries(regionPathRefs.current).forEach(([id, el]) => {
        if (!el) return;
        try {
          const bb = el.getBBox();
          if (bb.width > 0 && bb.height > 0) bboxes[id] = bb;
        } catch(e) {}
      });
      setRegionBBoxes(bboxes);
    }, 100);
    return () => clearTimeout(timer);
  }, [geojson, pathGen, dims]);

  // Journey route polyline points
  const journeyRoutePoints = useMemo(() => {
    if (!activeJourney || !proj) return null;
    const pts = activeJourney.regions
      .map(id => {
        const c = regionCentroids[id];
        if (!c) return null;
        const pos = proj([c.lng, c.lat]);
        return pos ? `${pos[0]},${pos[1]}` : null;
      })
      .filter(Boolean);
    return pts.length > 1 ? pts.join(' ') : null;
  }, [activeJourney, proj]);

  const handleEnter = useCallback((e, regionId) => {
    if (!regionData[regionId]) return;
    setHoveredRegion(regionId);
    onRegionHover && onRegionHover(regionId);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const d = regionData[regionId];
    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top, regionId, name: d.name, count: d.producerCount, products: d.featuredProducts.slice(0, 3) });
  }, [onRegionHover]);

  const handleLeave = useCallback(() => {
    setHoveredRegion(null);
    setTooltip(null);
    onRegionHover && onRegionHover(null);
  }, [onRegionHover]);

  const handleMove = useCallback((e) => {
    if (!tooltip) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip(t => t ? { ...t, x: e.clientX - rect.left, y: e.clientY - rect.top } : null);
  }, [tooltip]);

  const handleClick = useCallback((regionId) => {
    setMiniCard(null);
    if (regionData[regionId]) onRegionSelect && onRegionSelect(regionId === selectedRegion ? null : regionId);
  }, [selectedRegion, onRegionSelect]);

  // Close mini-card when region is deselected
  useEffect(() => { if (!selectedRegion) setMiniCard(null); }, [selectedRegion]);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {geojson && pathGen ? (
        <svg
          id="map-svg"
          viewBox={`0 0 ${dims.width} ${dims.height}`}
          width="100%" height="100%"
          style={{ display: 'block' }}
          onMouseMove={handleMove}
        >
          <defs>
            <filter id="glowSelected">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="spotGlow">
              <feGaussianBlur stdDeviation="1.8" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <pattern id="mapgrid" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M 36 0 L 0 0 0 36" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#mapgrid)" />

          <g transform={`translate(${zoomTransform.tx}, ${zoomTransform.ty}) scale(${zoomTransform.scale})`} style={{ transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>

          {/* Region paths */}
          {geojson.features.map((feature, i) => {
            const regionId = feature.properties.regionId;
            const d = regionData[regionId];
            const count = d?.producerCount || 0;
            const isSelected = selectedRegion === regionId;
            const isHovered = hoveredRegion === regionId;
            const isDimmed = selectedRegion && !isSelected;
            const isInJourney = activeJourney?.regions?.includes(regionId);
            const journeyDimmed = activeJourney && !selectedRegion && !isInJourney;
            const journeyHighlighted = activeJourney && !selectedRegion && isInJourney;
            const baseColor = getRegionColor(regionId, count, isHovered);

            const opacity = isDimmed ? 0.3 : journeyDimmed ? 0.2 : 1;
            const filterVal = isSelected
              ? 'url(#glowSelected)'
              : journeyHighlighted
              ? `saturate(1.4) drop-shadow(0 0 10px ${activeJourney.color}80)`
              : 'none';

            return (
              <path
                key={i}
                ref={el => { if (el && regionId) regionPathRefs.current[regionId] = el; }}
                d={pathGen(feature)}
                fill={isSelected ? '#2D6A4F' : baseColor}
                stroke={isSelected ? 'rgba(76,175,80,0.6)' : isHovered ? 'rgba(76,175,80,0.4)' : 'rgba(255,255,255,0.1)'}
                strokeWidth={isSelected ? 1.5 : isHovered ? 1 : 0.5}
                opacity={opacity}
                style={{
                  cursor: d ? 'pointer' : 'default',
                  transition: 'fill 0.2s, opacity 0.2s, stroke 0.2s, filter 0.3s',
                  filter: filterVal,
                }}
                onClick={() => handleClick(regionId)}
                onMouseEnter={(e) => handleEnter(e, regionId)}
                onMouseLeave={handleLeave}
              />
            );
          })}

          {/* Gastronomy spot markers ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ with layer filtering */}
          {Object.entries(gastronomySpots).map(([regionId, spots]) => {
            const bb = regionBBoxes[regionId];
            if (!bb) return null;
            const pathEl = regionPathRefs.current[regionId];
            const isSelected = selectedRegion === regionId;
            const isDimmed = selectedRegion && !isSelected;
            const isInJourney = activeJourney?.regions?.includes(regionId);
            const journeyDimmed = activeJourney && !selectedRegion && !isInJourney;

            // Centroid of the bbox (safe fallback)
            const cx = bb.x + bb.width / 2;
            const cy = bb.y + bb.height / 2;

            // Generate N candidate positions in a grid, keep only those inside the region path
            const candidates = [];
            const gridSteps = 6;
            const margin = Math.min(bb.width, bb.height) * 0.12;
            for (let row = 0; row < gridSteps; row++) {
              for (let col = 0; col < gridSteps; col++) {
                const px = bb.x + margin + (col + 0.5) * (bb.width - margin * 2) / gridSteps;
                const py = bb.y + margin + (row + 0.5) * (bb.height - margin * 2) / gridSteps;
                let inside = false;
                try {
                  if (pathEl) {
                    const svgEl = pathEl.ownerSVGElement;
                    const pt = svgEl.createSVGPoint();
                    pt.x = px; pt.y = py;
                    inside = pathEl.isPointInFill(pt);
                  }
                } catch(e) { inside = true; }
                if (inside) candidates.push([px, py]);
              }
            }
            // Always add centroid as final fallback
            candidates.push([cx, cy]);

            return spots.map((spot, si) => {
              // Layer filter
              if (activeLayer !== 'all') {
                const allowed = LAYER_TYPE_MAP[activeLayer] || [];
                if (!allowed.includes(spot.type)) return null;
              }

              // Pick evenly spread candidate, or centroid if not enough
              const pos = candidates[Math.round(si * (candidates.length - 1) / Math.max(spots.length - 1, 1))] || [cx, cy];
              const spotColor = spotTypeColors[spot.type] || '#4CAF50';
              const spotOpacity = isDimmed ? 0.1 : journeyDimmed ? 0.15 : isSelected ? 1 : 0.75;

              const handleSpotClick = function(spot) {
    var slug = toSlug(spot.label || "");
    if (spot.type === "producer" || spot.type === "wine") {
      navigate("/producers/" + slug);
    } else if (spot.type === "experience") {
      navigate("/experiences");
    } else if (spot.type === "dish") {
      navigate("/recipes");
    } else {
      navigate("/producers/" + slug);
    }
  });
                } else {
                  setMiniCard(null);
                  handleClick(regionId);
                }
              };

              const isZoomed = selectedRegion === regionId;
              const s = isZoomed ? zoomTransform.scale : 1;
              var mSz = (isZoomed ? 38 : 17) / s;
              var eSz = (isZoomed ? 20 : 9) / s;
              var tp = spot.type;
              var cat = spot.category || "";

              var catCfg = {
                "Olive Oil": { bg: "#6B8E23", em: "\u{1FAD2}" },
                "Wine": { bg: "#7B2040", em: "\u{1F377}" },
                "Cheese": { bg: "#C8960A", em: "\u{1F9C0}" },
                "Coffee": { bg: "#5C3A1E", em: "\u2615" },
                "Cured Meats": { bg: "#A8404A", em: "\u{1F969}" },
                "Honey": { bg: "#C07820", em: "\u{1F36F}" },
                "Pasta": { bg: "#C06830", em: "\u{1F35D}" },
                "Truffle": { bg: "#5A4A3A", em: "\u{1F344}" },
              };
              var tpCfg = {
                "producer": { bg: "#5A7A2A", em: "\u{1F33E}" },
                "ingredient": { bg: "#2E7D32", em: "\u{1F33F}" },
                "experience": { bg: "#B8860B", em: "\u{1F3E1}" },
                "wine": { bg: "#7B2040", em: "\u{1F377}" },
                "dish": { bg: "#C84040", em: "\u{1F37D}\uFE0F" },
              };
              var cfg = catCfg[cat] || tpCfg[tp] || tpCfg.producer;

              return (
                <g
                  key={regionId + "-spot-" + si}
                  style={{ cursor: "pointer", transition: "opacity 0.2s ease" }}
                  opacity={spotOpacity}
                  onClick={handleSpotClick}
                  onMouseEnter={function(e) {
                    var rect = e.currentTarget.getBoundingClientRect();
                    setHoveredSpot({ spot: spot, regionId: regionId, x: rect.left + rect.width / 2, y: rect.top });
                  }}
                  onMouseLeave={function() { setHoveredSpot(null); }}
                >
                  <circle cx={pos[0]} cy={pos[1]} r={mSz / 2 + 2 / s} fill={cfg.bg} opacity={0.15} />
                  <circle cx={pos[0]} cy={pos[1]} r={mSz / 2} fill={cfg.bg} />
                  <text x={pos[0]} y={pos[1]} textAnchor="middle" dominantBaseline="central" fontSize={eSz} style={{ userSelect: "none" }}>{cfg.em}</text>
                </g>
              );
            });
          })}

          {/* Region centroid producer count dots ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ hidden when non-producer layer active */}
          {activeLayer === 'all' || activeLayer === 'producers' ? Object.entries(regionCentroids).map(([regionId, centroid]) => {
            const pos = getPos(centroid.lng, centroid.lat);
            if (!pos) return null;
            const d = regionData[regionId];
            if (!d) return null;
            const isSelected = selectedRegion === regionId;
            const isDimmed = selectedRegion && !isSelected;
            const isInJourney = activeJourney?.regions?.includes(regionId);
            const journeyDimmed = activeJourney && !selectedRegion && !isInJourney;
            const r = d.producerCount >= 40 ? 5.5 : d.producerCount >= 20 ? 4.5 : d.producerCount >= 10 ? 3.5 : 2.5;

            return (
              <g key={`dot-${regionId}`} style={{ opacity: isDimmed ? 0.2 : journeyDimmed ? 0.1 : 1, transition: 'opacity 0.25s' }}>
                <circle cx={pos[0]} cy={pos[1]} r={r * 2.2} fill="rgba(76,175,80,0.1)"
                  style={{ animation: `markerPulse 3s ease-in-out infinite`, animationDelay: `${Math.abs(centroid.lat % 2)}s` }}
                />
                <circle cx={pos[0]} cy={pos[1]} r={r}
                  fill={isSelected ? '#fff' : '#4CAF50'}
                  stroke={isSelected ? '#4CAF50' : 'rgba(10,10,10,0.5)'}
                  strokeWidth={1} filter="url(#spotGlow)"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleClick(regionId)}
                />
              </g>
            );
          }) : null}

          {/* Journey route polyline */}
          {journeyRoutePoints && (
            <polyline
              points={journeyRoutePoints}
              fill="none"
              stroke={activeJourney.color}
              strokeWidth={2.5}
              strokeDasharray="6 4"
              opacity={0.75}
              style={{ animation: 'dashMove 1s linear infinite', pointerEvents: 'none' }}
            />
          )}

          </g>
        </svg>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'rgba(255,255,255,0.3)', fontSize: 13, gap: 8 }}>
          <div style={{ width: 16, height: 16, border: '2px solid rgba(76,175,80,0.4)', borderTop: '2px solid #4CAF50', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          Loading atlasÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¦
        </div>
      )}

      {/* Marker mini-card */}
      {miniCard && (
        <div style={{
          position: 'absolute',
          left: miniCard.x,
          top: miniCard.y,
          transform: 'translate(-50%, calc(-100% - 14px))',
          zIndex: 400,
          width: 210,
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(16px)',
          borderRadius: 12,
          boxShadow: '0 12px 40px rgba(0,0,0,0.22)',
          overflow: 'visible',
          animation: 'fadeSlideIn 0.2s ease',
          pointerEvents: 'all',
        }}>
          {/* Arrow */}
          <div style={{ position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid white' }} />

          {/* Image area */}
          <div style={{ height: 90, background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
            <span style={{ fontSize: 40 }}>{miniCard.emoji}</span>
          </div>

          {/* Body */}
          <div style={{ padding: '10px 12px 6px', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: '#2E7D32', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {miniCard.type ? miniCard.type.slice(0, -1) : 'Gastronomy'}
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', fontFamily: "'DM Sans',sans-serif" }}>{miniCard.label}</span>
          </div>

          {/* CTA */}
          {miniCard.type && miniCard.id && (
            <button
              onClick={() => navigate(`/${miniCard.type}/${miniCard.id}`)}
              style={{ display: 'block', width: 'calc(100% - 24px)', margin: '6px 12px 12px', padding: '8px 0', background: '#2E7D32', color: '#fff', border: 'none', borderRadius: 8, fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = '#1B5E20'}
              onMouseLeave={e => e.currentTarget.style.background = '#2E7D32'}
            >
              Explore ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ
            </button>
          )}

          {/* Close */}
          <button
            onClick={() => setMiniCard(null)}
            style={{ position: 'absolute', top: 7, right: 8, background: 'rgba(0,0,0,0.35)', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, fontSize: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ¢ÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂÃÂ</button>
        </div>
      )}

    </div>
  );
}
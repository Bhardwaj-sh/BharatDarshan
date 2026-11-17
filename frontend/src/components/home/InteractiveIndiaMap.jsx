import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Search, 
  MapPin, 
  Clock, 
  ArrowRight, 
  RotateCcw,
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { REGIONS_DATA } from '../../data/regionsData';
import { REGION_GEO_COORDINATES } from '../../data/mapCoordinates';
import { getDetailedTourismData, STATE_TOURISM_DETAILS } from '../../data/stateTourismDetails';
import indiaGeoData from '../../data/indiaStatesGeo.json';

// Flat 2D Map Geographical Bounds
const LNG_MIN = 66.0;
const LNG_MAX = 99.0;
const LAT_MIN = 5.0;
const LAT_MAX = 38.0;
const PLANE_W = 68.0;
const PLANE_H = 68.0;

// Convert Lat/Lng to Flat 2D Plane Coordinate (zero 3D tilt, zero curve)
function latLngToFlat2D(lat, lng, zOffset = 0) {
  const u = (lng - LNG_MIN) / (LNG_MAX - LNG_MIN);
  const v = (lat - LAT_MIN) / (LAT_MAX - LAT_MIN);

  const x = (u - 0.5) * PLANE_W;
  const y = (v - 0.5) * PLANE_H;

  return new THREE.Vector3(x, y, zOffset);
}

// Precompute outer national boundaries of India (segments that appear only once across all state polygons)
const OUTER_BORDER_SEGMENTS = (() => {
  const edgeMap = new Map();
  const edgeKey = (p1, p2) => {
    const k1 = p1[0].toFixed(5) + ',' + p1[1].toFixed(5);
    const k2 = p2[0].toFixed(5) + ',' + p2[1].toFixed(5);
    return k1 < k2 ? k1 + '|' + k2 : k2 + '|' + k1;
  };

  indiaGeoData.features.forEach((f) => {
    const geom = f.geometry;
    const rings = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
    rings.forEach((poly) => {
      poly.forEach((ring) => {
        for (let i = 0; i < ring.length - 1; i++) {
          const p1 = ring[i];
          const p2 = ring[i + 1];
          const key = edgeKey(p1, p2);
          if (!edgeMap.has(key)) {
            edgeMap.set(key, { count: 1, p1, p2 });
          } else {
            edgeMap.get(key).count++;
          }
        }
      });
    });
  });

  const outer = [];
  edgeMap.forEach((item) => {
    if (item.count === 1) {
      outer.push([item.p1, item.p2]);
    }
  });
  return outer;
})();

// Generate Differentiated Natural Geographical Map of India (3072x3072 High Definition)
function generatePhysicalMapTexture() {
  const canvas = document.createElement('canvas');
  const W = 3072;
  const H = 3072;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // 1. Surrounding Ocean Water Bed (Rich, Deep Navy Blue - Soft & Natural)
  const oceanGrad = ctx.createRadialGradient(W * 0.5, H * 0.54, W * 0.05, W * 0.5, H * 0.54, W * 0.58);
  oceanGrad.addColorStop(0, '#102A45');    // Soft deep navy coastal water
  oceanGrad.addColorStop(0.35, '#0B2038'); // Rich deep navy blue (Arabian Sea & Bay of Bengal)
  oceanGrad.addColorStop(0.70, '#071628'); // Deep midnight navy
  oceanGrad.addColorStop(1.0, '#040F1D');  // Deep ocean boundary
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, W, H);

  const toCanvas = (lat, lng) => {
    const u = (lng - LNG_MIN) / (LNG_MAX - LNG_MIN);
    const v = (lat - LAT_MIN) / (LAT_MAX - LAT_MIN);
    return [u * W, (1 - v) * H];
  };

  // 2. Natural Distinct Geographical Palette per Region (Matching user's preferred aesthetic)
  indiaGeoData.features.forEach((f) => {
    const stName = (f.properties?.st_nm || '').toLowerCase();
    let fillColor = '#7EA670'; // Fresh harmonious natural alluvial green

    // Differentiated Natural Geographical Identity
    if (stName.includes('rajasthan')) {
      fillColor = '#E0C792'; // Sandy warm desert golden ochre
    } else if (stName.includes('gujarat')) {
      fillColor = '#B8B77D'; // Arid salt scrub & Saurashtra warm earth
    } else if (stName.includes('ladakh')) {
      fillColor = '#75886F'; // High-altitude cold mountain rock & moss
    } else if (stName.includes('jammu')) {
      fillColor = '#6A8F64'; // Kashmir cedar pine slopes & alpine valleys
    } else if (stName.includes('himachal')) {
      fillColor = '#64885E'; // Himalayan alpine cedar & valleys
    } else if (stName.includes('uttarakhand')) {
      fillColor = '#5E8258'; // Garhwal & Kumaon alpine mountain terrain
    } else if (stName.includes('sikkim') || stName.includes('arunachal')) {
      fillColor = '#4E7D46'; // Eastern Himalayan cloud forests & ridges
    } else if (stName.includes('punjab')) {
      fillColor = '#82A870'; // Fertile golden-green wheat plains
    } else if (stName.includes('haryana')) {
      fillColor = '#7DA36B'; // Semi-arid northern alluvial plains
    } else if (stName.includes('delhi')) {
      fillColor = '#739961'; // Yamuna basin capital enclave
    } else if (stName.includes('uttar pradesh')) {
      fillColor = '#7CA468'; // Fertile Gangetic alluvial heartland
    } else if (stName.includes('bihar')) {
      fillColor = '#749C60'; // Eastern Gangetic alluvial delta
    } else if (stName.includes('bengal')) {
      fillColor = '#689254'; // Lower Gangetic fertile plains & Sundarbans
    } else if (stName.includes('madhya')) {
      fillColor = '#739860'; // Central Vindhya & Satpura fresh forest
    } else if (stName.includes('chhattisgarh')) {
      fillColor = '#6B9057'; // Dense sal forests & Bastar woodland
    } else if (stName.includes('jharkhand')) {
      fillColor = '#688D54'; // Chota Nagpur plateau & woodlands
    } else if (stName.includes('odisha')) {
      fillColor = '#6B9158'; // Eastern Ghats & Mahanadi coastal deltas
    } else if (stName.includes('maharashtra')) {
      fillColor = '#6F925E'; // Deccan plateau & fertile tableland
    } else if (stName.includes('goa')) {
      fillColor = '#2F6A37'; // Tropical Konkan palm canopy
    } else if (stName.includes('karnataka')) {
      fillColor = '#72975E'; // Malnad coffee hills & Mysore Deccan plateau
    } else if (stName.includes('telangana')) {
      fillColor = '#6E935A'; // Deccan rocky plateau
    } else if (stName.includes('andhra')) {
      fillColor = '#6A8F57'; // Krishna-Godavari coastal plains
    } else if (stName.includes('kerala')) {
      fillColor = '#245E2C'; // Deep Western Ghats tropical evergreen rainforest
    } else if (stName.includes('tamil')) {
      fillColor = '#6E9259'; // Coromandel coastal plains & Kaveri delta
    } else if (stName.includes('assam')) {
      fillColor = '#4F7E46'; // Brahmaputra valley lush tea gardens
    } else if (stName.includes('meghalaya')) {
      fillColor = '#47753E'; // Shillong plateau dense cloud canopy
    } else if (stName.includes('nagaland') || stName.includes('manipur') || stName.includes('mizoram') || stName.includes('tripura')) {
      fillColor = '#4E7C45'; // Lush Patkai & Barail subtropical ranges
    }

    ctx.fillStyle = fillColor;

    const geom = f.geometry;
    const rings = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;
    rings.forEach((poly) => {
      poly.forEach((ring) => {
        ctx.beginPath();
        ring.forEach(([lng, lat], i) => {
          const [px, py] = toCanvas(lat, lng);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.fill();

        // Sharp, clean state boundary separation
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 2.0;
        ctx.stroke();
        ctx.restore();
      });
    });
  });

  // 3. Sri Lanka Emerald Island with Coral Halo (South)
  ctx.save();
  const [slX, slY] = toCanvas(7.87, 80.77);
  ctx.fillStyle = 'rgba(0, 229, 255, 0.35)';
  ctx.beginPath();
  ctx.ellipse(slX, slY, 44, 64, 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#174E21';
  ctx.beginPath();
  ctx.ellipse(slX, slY, 34, 52, 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 4. Thar Desert Dunes (Rajasthan)
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 230, 175, 0.50)';
  ctx.lineWidth = 2.8;
  const [tharX, tharY] = toCanvas(26.8, 71.8);
  for (let i = -80; i < 80; i += 12) {
    ctx.beginPath();
    ctx.moveTo(tharX + i - 48, tharY + i * 0.45 - 20);
    ctx.quadraticCurveTo(tharX + i, tharY + i * 0.45 + 10, tharX + i + 48, tharY + i * 0.45 - 18);
    ctx.stroke();
  }
  ctx.restore();

  // 5. Complete Outer Blue Border of India (Accurate, continuous, unbroken along all edges)
  ctx.save();
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Luminous deep ocean-blue outer glow
  ctx.shadowColor = '#00E5FF';
  ctx.shadowBlur = 18;
  ctx.strokeStyle = '#0284C7';
  ctx.lineWidth = 9;
  ctx.beginPath();
  OUTER_BORDER_SEGMENTS.forEach(([p1, p2]) => {
    const [x1, y1] = toCanvas(p1[1], p1[0]);
    const [x2, y2] = toCanvas(p2[1], p2[0]);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  });
  ctx.stroke();

  // Crisp sky-blue outer boundary line
  ctx.shadowBlur = 0;
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 4;
  ctx.beginPath();
  OUTER_BORDER_SEGMENTS.forEach(([p1, p2]) => {
    const [x1, y1] = toCanvas(p1[1], p1[0]);
    const [x2, y2] = toCanvas(p2[1], p2[0]);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  });
  ctx.stroke();
  ctx.restore();

  // 9. Crisp Clean State Typography Watermarks
  ctx.save();
  ctx.font = 'bold 36px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.80)';
  ctx.shadowBlur = 6;
  ctx.textAlign = 'center';

  const labels = [
    { text: 'RAJASTHAN', lat: 26.5, lng: 73.8 },
    { text: 'GUJARAT', lat: 22.2, lng: 71.4 },
    { text: 'MAHARASHTRA', lat: 19.4, lng: 76.0 },
    { text: 'MADHYA PRADESH', lat: 23.5, lng: 78.5 },
    { text: 'UTTAR PRADESH', lat: 27.0, lng: 81.0 },
    { text: 'KARNATAKA', lat: 14.8, lng: 76.0 },
    { text: 'TAMIL NADU', lat: 11.2, lng: 78.8 },
    { text: 'KERALA', lat: 10.2, lng: 76.6 },
    { text: 'ANDHRA PRADESH', lat: 15.5, lng: 79.5 },
    { text: 'TELANGANA', lat: 17.8, lng: 79.2 },
    { text: 'ODISHA', lat: 20.6, lng: 84.8 },
    { text: 'CHHATTISGARH', lat: 21.3, lng: 82.2 },
    { text: 'JHARKHAND', lat: 23.6, lng: 85.5 },
    { text: 'BIHAR', lat: 25.8, lng: 85.8 },
    { text: 'WEST BENGAL', lat: 23.5, lng: 87.8 },
    { text: 'ASSAM', lat: 26.2, lng: 93.0 },
    { text: 'LADAKH', lat: 34.3, lng: 77.8 },
    { text: 'JAMMU & KASHMIR', lat: 33.6, lng: 74.9 },
    { text: 'HIMACHAL', lat: 31.8, lng: 77.2 },
    { text: 'UTTARAKHAND', lat: 30.1, lng: 79.2 },
    { text: 'PUNJAB', lat: 30.9, lng: 75.3 },
    { text: 'HARYANA', lat: 29.1, lng: 76.1 }
  ];

  labels.forEach((l) => {
    const [lx, ly] = toCanvas(l.lat, l.lng);
    ctx.fillText(l.text, lx, ly);
  });
  ctx.restore();

  return canvas;
}

export default function InteractiveIndiaMap() {
  const mountRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState('states'); // 'states' (28) or 'uts' (8)
  const [searchQuery, setSearchQuery] = useState('');
  const [tooltipData, setTooltipData] = useState(null);
  const stateLinesRef = useRef({});
  const markerMeshesRef = useRef([]);

  const activeRegion = useMemo(() => REGIONS_DATA[activeIndex] || REGIONS_DATA[0], [activeIndex]);
  const tourismData = useMemo(() => getDetailedTourismData(activeRegion), [activeRegion]);

  // Selected State Automatic Image Slideshow (Cycles every 1.25 seconds with smooth crossfade)
  const activeSlides = useMemo(() => {
    const specific = STATE_TOURISM_DETAILS[activeRegion.id] || STATE_TOURISM_DETAILS[activeRegion.slug];
    if (specific && specific.gallery && specific.gallery.length > 0) {
      return specific.gallery;
    }
    const fallback = [
      activeRegion.heroImage,
      activeRegion.package?.coverImage,
      activeRegion.thumbnail,
      tourismData?.gallery?.[0],
      tourismData?.gallery?.[1],
      tourismData?.gallery?.[2]
    ].filter(Boolean);
    return Array.from(new Set(fallback));
  }, [activeRegion, tourismData]);

  const [prevRegionId, setPrevRegionId] = useState(activeRegion.id);
  const [slideIndex, setSlideIndex] = useState(0);

  if (prevRegionId !== activeRegion.id) {
    setPrevRegionId(activeRegion.id);
    setSlideIndex(0);
  }

  useEffect(() => {
    if (!activeSlides || activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % activeSlides.length);
    }, 1250);
    return () => clearInterval(interval);
  }, [activeSlides]);

  // Filter regions: Simple clean toggle between States (28) and Union Territories (8)
  const filteredRegions = useMemo(() => {
    return REGIONS_DATA.filter((r) => {
      const matchesTab = selectedTab === 'states' ? r.type === 'state' : r.type === 'UT';
      const matchesSearch =
        searchQuery === '' ||
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.capital.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [selectedTab, searchQuery]);

  // Initialize Three.js 2D Physical Map with Proper Zoom Out & Centering
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera Setup (Pure 2D Orthogonal View Angle)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x071628); // Rich softer deep navy-blue ocean

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    // Balanced framing with slight ~1-2cm visual zoom-in, zero cropping of Kashmir or Kanyakumari
    const DEFAULT_CAM_POS = new THREE.Vector3(0.6, 1.2, 80);
    const DEFAULT_TARGET = new THREE.Vector3(0.6, 1.2, 0);
    camera.position.copy(DEFAULT_CAM_POS);
    camera.lookAt(DEFAULT_TARGET);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. OrbitControls Configured strictly for smooth 2D Panning (Zero wheel capture, zero mouse-wheel zoom)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false; // Strict 2D, NO spherical rotation, NO 3D tilting
    controls.enableZoom = false;   // Mouse-wheel zoom COMPLETELY disabled so page scrolls normally!
    controls.enablePan = true;    // User can click and drag in any direction smoothly
    controls.screenSpacePanning = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 25;     // State zoom in level
    controls.maxDistance = 80;    // Full India level
    controls.target.copy(DEFAULT_TARGET);
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.NONE,
      RIGHT: THREE.MOUSE.NONE
    };

    // 4. Ultra-Sharp Physical Terrain Map Texture (3072x3072)
    const physicalCanvas = generatePhysicalMapTexture();
    const texture = new THREE.CanvasTexture(physicalCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Flat 2D Plane Surface
    const planeGeo = new THREE.PlaneGeometry(PLANE_W, PLANE_H, 128, 128);
    const planeMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.FrontSide
    });
    const mapPlane = new THREE.Mesh(planeGeo, planeMat);
    mapPlane.position.set(0, 0, 0);
    scene.add(mapPlane);

    // 5. Clean Champagne Gold State Boundary Vectors
    const stateLines = {};
    const norm = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    indiaGeoData.features.forEach((feature) => {
      const stName = feature.properties?.st_nm || '';
      const stId = norm(stName);
      const geom = feature.geometry;
      const rings = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates;

      const group = new THREE.Group();

      rings.forEach((poly) => {
        poly.forEach((ring) => {
          const points3D = [];
          ring.forEach(([lng, lat]) => {
            const p3 = latLngToFlat2D(lat, lng, 0.04);
            points3D.push(p3);
          });

          const lineGeo = new THREE.BufferGeometry().setFromPoints(points3D);
          const lineMat = new THREE.LineBasicMaterial({
            color: 0xFDE68A, // Champagne gold
            transparent: true,
            opacity: 0.65,
            linewidth: 1.8
          });

          const line = new THREE.Line(lineGeo, lineMat);
          group.add(line);
        });
      });

      scene.add(group);
      stateLines[stId] = group;
    });

    stateLinesRef.current = stateLines;

    // 6. Dedicated 3D Outer National Boundary Outline (Crisp, unbroken, zero gaps along entire border of India)
    const outerPoints = [];
    OUTER_BORDER_SEGMENTS.forEach(([p1, p2]) => {
      outerPoints.push(latLngToFlat2D(p1[1], p1[0], 0.06));
      outerPoints.push(latLngToFlat2D(p2[1], p2[0], 0.06));
    });
    const outerGeo = new THREE.BufferGeometry().setFromPoints(outerPoints);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x38BDF8, // Vibrant crisp sky-blue border
      transparent: true,
      opacity: 0.95,
      linewidth: 2.2
    });
    const outerBorderLines = new THREE.LineSegments(outerGeo, outerMat);
    scene.add(outerBorderLines);

    // 7. Clickable State Geographical Location Dots (Blue dot on EVERY state)
    const markerMeshes = [];
    const markerGroup = new THREE.Group();

    REGIONS_DATA.forEach((region) => {
      const coords = REGION_GEO_COORDINATES[region.id];
      if (!coords) return;

      const p3 = latLngToFlat2D(coords.lat, coords.lng, 0.28);
      const isInitialActive = region.id === activeRegion.id;

      // Group containing all parts of the state blue dot
      const dotGroup = new THREE.Group();
      dotGroup.position.copy(p3);
      dotGroup.userData = { region, coords };

      // Outer Selection Glow Halo (Shows only for active state)
      const haloGeo = new THREE.RingGeometry(0.70, 1.35, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0x38BDF8, // Glowing cyan-blue halo
        transparent: true,
        opacity: isInitialActive ? 0.85 : 0.0,
        side: THREE.DoubleSide
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.name = 'selectionHalo';
      haloMesh.visible = isInitialActive;
      dotGroup.add(haloMesh);

      // Core Blue Dot (Clean, attractive blue circle, visible on EVERY state)
      const coreGeo = new THREE.CircleGeometry(0.48, 24);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0x0284C7, // Vibrant attractive ocean-blue
        transparent: true,
        opacity: 0.95
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.name = 'coreDot';
      dotGroup.add(coreMesh);

      // Inner Highlight Center (Soft ice-blue/white center dot for crispness)
      const innerGeo = new THREE.CircleGeometry(0.20, 16);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xF0F9FF, // Ice white center
        transparent: true,
        opacity: 0.95
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      innerMesh.position.set(0, 0, 0.01);
      dotGroup.add(innerMesh);

      // Invisible Extended Hit Area (Allows comfortable, easy clicking of the blue dot)
      const hitAreaGeo = new THREE.CircleGeometry(1.8, 16);
      const hitAreaMat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.0,
        depthWrite: false
      });
      const hitAreaMesh = new THREE.Mesh(hitAreaGeo, hitAreaMat);
      hitAreaMesh.name = 'hitArea';
      dotGroup.add(hitAreaMesh);

      dotGroup.scale.set(isInitialActive ? 1.35 : 1.0, isInitialActive ? 1.35 : 1.0, 1);
      dotGroup.visible = true; // ALL STATE DOTS ARE ALWAYS VISIBLE!

      markerGroup.add(dotGroup);
      markerMeshes.push(dotGroup);
    });

    scene.add(markerGroup);
    markerMeshesRef.current = markerMeshes;

    // 8. Raycasting for Pin Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getIntersectedMarker = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(markerMeshes, true);
      if (hits.length > 0) {
        let obj = hits[0].object;
        while (obj && !obj.userData?.region && obj.parent) {
          obj = obj.parent;
        }
        return obj && obj.userData?.region ? obj : null;
      }
      return null;
    };

    // Camera Glide Animation State
    let isAnimating = false;
    let animStartTime = 0;
    const animDuration = 900;
    let startCamPos = new THREE.Vector3();
    let targetCamPos = new THREE.Vector3();
    let startControlsTarget = new THREE.Vector3();
    let targetControlsTarget = new THREE.Vector3();

    const flyToCoordinates = (coords, zoomDist = 36) => {
      const targetP3 = latLngToFlat2D(coords.lat, coords.lng, 0);

      startCamPos.copy(camera.position);
      targetCamPos.set(targetP3.x, targetP3.y, zoomDist);

      startControlsTarget.copy(controls.target);
      targetControlsTarget.set(targetP3.x, targetP3.y, 0);

      isAnimating = true;
      animStartTime = performance.now();
    };

    const resetCameraView = () => {
      startCamPos.copy(camera.position);
      targetCamPos.copy(DEFAULT_CAM_POS);

      startControlsTarget.copy(controls.target);
      targetControlsTarget.copy(DEFAULT_TARGET);

      isAnimating = true;
      animStartTime = performance.now();
    };

    mountRef.current._flyTo = flyToCoordinates;
    mountRef.current._resetView = resetCameraView;

    // Smooth Dragging & Click Distinction (Drag map without triggering dot clicks; Click dot to zoom)
    let pointerDownPos = { x: 0, y: 0 };
    let hasMoved = false;

    const handlePointerDown = (e) => {
      pointerDownPos = { x: e.clientX, y: e.clientY };
      hasMoved = false;
      renderer.domElement.style.cursor = 'grabbing';
    };

    const handlePointerUp = (e) => {
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist < 6) {
        // Clean click (not a drag)
        const marker = getIntersectedMarker(e);
        if (marker && marker.userData?.region) {
          const reg = marker.userData.region;
          const idx = REGIONS_DATA.findIndex((r) => r.id === reg.id);
          if (idx !== -1) {
            setActiveIndex(idx);
            flyToCoordinates(marker.userData.coords, 36);
          }
        }
      }
      const marker = getIntersectedMarker(e);
      renderer.domElement.style.cursor = marker ? 'pointer' : 'grab';
    };

    const handlePointerMove = (e) => {
      const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
      if (dist >= 6) {
        hasMoved = true;
      }
      const marker = getIntersectedMarker(e);
      if (marker && marker.userData?.region) {
        renderer.domElement.style.cursor = 'pointer';
        const rect = renderer.domElement.getBoundingClientRect();
        setTooltipData({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          name: marker.userData.region.name,
          capital: marker.userData.region.capital
        });
      } else {
        renderer.domElement.style.cursor = (e.buttons > 0 && hasMoved) ? 'grabbing' : 'grab';
        setTooltipData(null);
      }
    };

    const dom = renderer.domElement;
    dom.style.cursor = 'grab';
    dom.addEventListener('pointerdown', handlePointerDown);
    dom.addEventListener('pointerup', handlePointerUp);
    dom.addEventListener('pointermove', handlePointerMove);

    // Animation Loop (Pauses automatically when off-screen to guarantee 60 FPS scrolling)
    let reqId = null;
    let isMapInView = true;

    const animate = (time) => {
      if (!isMapInView) return;
      reqId = requestAnimationFrame(animate);

      // Smooth Camera Glide Interpolation
      if (isAnimating) {
        const elapsed = time - animStartTime;
        const progress = Math.min(elapsed / animDuration, 1);
        const ease = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        camera.position.lerpVectors(startCamPos, targetCamPos, ease);
        controls.target.lerpVectors(startControlsTarget, targetControlsTarget, ease);

        if (progress >= 1) {
          isAnimating = false;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    // IntersectionObserver to prevent background GPU/CPU drain when off-screen
    const mapObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (!isMapInView) {
            isMapInView = true;
            reqId = requestAnimationFrame(animate);
          }
        } else {
          isMapInView = false;
          if (reqId) {
            cancelAnimationFrame(reqId);
            reqId = null;
          }
        }
      },
      { threshold: 0.05 }
    );

    if (container) mapObserver.observe(container);
    reqId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mapObserver) mapObserver.disconnect();
      if (reqId) cancelAnimationFrame(reqId);
      dom.removeEventListener('pointerdown', handlePointerDown);
      dom.removeEventListener('pointerup', handlePointerUp);
      dom.removeEventListener('pointermove', handlePointerMove);
      renderer.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      texture.dispose();
    };
  }, []);

  // Update State Boundary Highlight & State Dots when activeIndex changes
  useEffect(() => {
    const reg = REGIONS_DATA[activeIndex];
    if (!reg) return;

    Object.keys(stateLinesRef.current).forEach((stId) => {
      const grp = stateLinesRef.current[stId];
      if (grp) {
        const isSelected = stId === reg.id || stId.includes(reg.id) || reg.id.includes(stId);
        grp.children.forEach((line) => {
          if (line.material) {
            line.material.color.setHex(isSelected ? 0x00F0FF : 0xFDE68A);
            line.material.opacity = isSelected ? 1.0 : 0.65;
          }
        });
      }
    });

    // Every state's blue dot stays visible. The active state dot gets the glowing halo!
    markerMeshesRef.current.forEach((dotGroup) => {
      const isSelected = dotGroup.userData?.region?.id === reg.id;
      const halo = dotGroup.getObjectByName('selectionHalo');
      if (halo) {
        halo.visible = isSelected;
        halo.material.opacity = isSelected ? 0.85 : 0.0;
      }
      dotGroup.scale.set(isSelected ? 1.35 : 1.0, isSelected ? 1.35 : 1.0, 1);
    });
  }, [activeIndex]);

  // Handle Region Selection from Quick Select panel
  const handleSelectRegion = (region) => {
    const idx = REGIONS_DATA.findIndex((r) => r.id === region.id);
    if (idx !== -1) {
      setActiveIndex(idx);
      const coords = REGION_GEO_COORDINATES[region.id];
      if (coords && mountRef.current?._flyTo) {
        mountRef.current._flyTo(coords, 36);
      }
    }
  };

  const handleResetView = () => {
    if (mountRef.current?._resetView) {
      mountRef.current._resetView();
    }
  };

  return (
    <section id="interactive-map" className="relative py-10 sm:py-14 bg-gradient-to-b from-[#F5EFEB] via-[#FAF6F0] to-[#F5EFEB] text-slate-900 overflow-hidden border-t border-amber-900/10">
      
      {/* Subtle Warm Editorial Ambient Glows (Lightweight CSS, Zero GPU lag) */}
      <div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[400px] pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%)'
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[400px] pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.04) 0%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* TOP SECTION: HEADING & CONTROLS                                           */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-mono font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Physical Geographical Map of India • State by State Explorer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 font-display">
              Explore India <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-teal-600 to-amber-600">Geographically</span>
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
              Fully balanced geographical view with snow-covered Himalayas, Rajasthan desert terrain, lush Western Ghats, and accurate state boundaries. Click any state or marker to inspect.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ROW 1: LEFT (MAP - PROPERLY ZOOMED OUT) + RIGHT (COMPACT QUICK SELECT)    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
          
          {/* LEFT (8 Cols): Focused India Map in Rich Navy Blue Ocean with Locked Zoom */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden bg-[#071628] border border-slate-700/60 shadow-2xl h-[600px] sm:h-[680px] flex flex-col justify-between">
            
            {/* The 2D WebGL Canvas */}
            <div ref={mountRef} className="w-full h-full" />

            {/* Floating Interactive Hover Tooltip */}
            {tooltipData && (
              <div 
                className="absolute z-30 pointer-events-none px-3.5 py-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-cyan-400/40 text-xs text-white shadow-2xl transform -translate-x-1/2 -translate-y-12"
                style={{ left: `${tooltipData.x}px`, top: `${tooltipData.y}px` }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-bold text-white">{tooltipData.name}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-cyan-300 font-mono text-[10px]">{tooltipData.capital}</span>
                </div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">Click dot to zoom in & inspect</div>
              </div>
            )}

            {/* Top Left Navigation Helper Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/20 text-[11px] font-mono text-cyan-300 shadow-xl pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Click state dot to zoom in • Drag map to move</span>
            </div>

            {/* Single "Full Map" Button at the bottom of the map */}
            <div className="absolute bottom-4 right-4 z-20 pointer-events-auto">
              <button
                onClick={handleResetView}
                className="px-4 py-2 rounded-full bg-slate-900/95 hover:bg-cyan-500 hover:text-slate-950 backdrop-blur-md border border-cyan-400/40 text-xs font-mono font-bold text-cyan-300 hover:border-cyan-300 transition-all flex items-center gap-2 shadow-2xl cursor-pointer hover:scale-105 active:scale-95"
                title="Return to Complete India Map View"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full Map</span>
              </button>
            </div>
          </div>

          {/* RIGHT (4 Cols): SWAPPED LAYOUT (TOP = Quick Select, BELOW = Image-Focused Tourism Slideshow Card) */}
          <div className="lg:col-span-4 flex flex-col gap-4 justify-between">
            
            {/* 1. TOP: Quick Select Box (Preserved size & full functionality) */}
            <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-2.5 px-1">
                <span className="text-xs uppercase tracking-wider font-mono font-bold text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-600" />
                  Quick Select ({filteredRegions.length})
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Click to Center</span>
              </div>

              {/* Two Tabs: [ STATES 28 ]  [ UTs 8 ] */}
              <div className="grid grid-cols-2 gap-2 mb-2.5">
                <button
                  onClick={() => setSelectedTab('states')}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                    selectedTab === 'states'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>STATES</span>
                  <span className={`text-[10px] px-1.5 rounded-full font-mono ${
                    selectedTab === 'states' ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                  }`}>28</span>
                </button>

                <button
                  onClick={() => setSelectedTab('uts')}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border ${
                    selectedTab === 'uts'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>UTs</span>
                  <span className={`text-[10px] px-1.5 rounded-full font-mono ${
                    selectedTab === 'uts' ? 'bg-cyan-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                  }`}>8</span>
                </button>
              </div>

              {/* Compact Search Input */}
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${selectedTab === 'states' ? '28 states' : '8 UTs'}...`}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600 font-mono"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Scrollable List of Selectable Locations */}
              <div className="overflow-y-auto max-h-[160px] space-y-1 pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                {filteredRegions.map((region) => {
                  const isSelected = activeRegion.id === region.id;
                  return (
                    <button
                      key={region.id}
                      onClick={() => handleSelectRegion(region)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-slate-950 text-white border-slate-950 font-bold shadow-md scale-[1.01]'
                          : 'bg-slate-50/80 hover:bg-slate-100 text-slate-700 border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            isSelected ? 'bg-amber-400 ring-2 ring-amber-400/40' : 'bg-slate-300'
                          }`}
                        />
                        <span className="font-semibold truncate">{region.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`text-[11px] font-mono ${isSelected ? 'text-amber-300' : 'text-slate-400'}`}>
                          {region.capital}
                        </span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. BELOW: Image-Focused Tourism Presentation Card with Automatic Slideshow */}
            <div className="rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl overflow-hidden relative group h-[340px] flex flex-col justify-between">
              {/* Slideshow Image Layer with Seamless Crossfade */}
              <div className="absolute inset-0 overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={`${activeRegion.id}-${slideIndex}`}
                    src={activeSlides[slideIndex] || activeRegion.heroImage}
                    alt={activeRegion.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80';
                    }}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Cinematic Vignette Overlays for Maximum Contrast & Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-slate-950/70 pointer-events-none" />
              </div>

              {/* Top Bar: Minimal Travel Package Label */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[11px] font-mono border border-white/20 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Explore {activeRegion.name} | Travel Packages</span>
                </div>

                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-mono border border-white/10">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{activeRegion.package?.duration || `${activeRegion.durationDays || 6}D / ${activeRegion.durationNights || 5}N`}</span>
                </div>
              </div>

              {/* Bottom Section: Prominently Displayed State Name & Minimal Action */}
              <div className="relative z-10 p-5">
                {/* Slideshow Progress Bar Indicators */}
                <div className="flex items-center gap-1.5 mb-2.5">
                  {activeSlides.slice(0, 5).map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1 rounded-full transition-all duration-300 ${
                        idx === slideIndex ? 'w-6 bg-amber-400' : 'w-2 bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                {/* Prominently Displayed State Name */}
                <h3 className="text-2xl sm:text-3xl font-black font-display text-white tracking-wider uppercase drop-shadow-lg mb-1">
                  {activeRegion.name}
                </h3>

                <div className="flex items-center justify-between pt-2 border-t border-white/15">
                  <div className="flex items-center gap-1.5 text-xs text-slate-200 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Capital: <strong className="text-white">{activeRegion.capital}</strong></span>
                  </div>

                  <Link
                    to={`/region/${activeRegion.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-white hover:bg-amber-400 hover:text-slate-950 text-slate-900 text-xs font-bold transition-all shadow-md group/btn cursor-pointer"
                  >
                    <span>Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>



      </div>
    </section>
  );
}

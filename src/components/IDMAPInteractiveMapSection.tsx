import { useState } from 'react';
import {
  MapPin, Leaf, Satellite, Activity, Layers, LocateFixed,
  ChevronRight, TreePine, DollarSign
} from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import Badge from './ui/Badge';
import ProgressBar from './ui/ProgressBar';

/* ─── data ─── */
type ProgramStatus = 'Aktif' | 'Verifikasi' | 'Monitoring' | 'Restorasi';

interface ProgramLocation {
  id: number;
  name: string;
  province: string;
  status: ProgramStatus;
  bibit: string;
  dana: string;
  progress: number;
  x: number;          // % position on map
  y: number;
}

const programs: ProgramLocation[] = [
  { id: 1, name: 'KKPD Teluk Bintuni', province: 'Papua Barat', status: 'Aktif', bibit: '250.000', dana: 'Rp 16,45 M', progress: 75, x: 78, y: 52 },
  { id: 2, name: 'Desa Timbulsloko', province: 'Demak, Jawa Tengah', status: 'Verifikasi', bibit: '180.000', dana: 'Rp 12,30 M', progress: 43, x: 32, y: 62 },
  { id: 3, name: 'Taman Nasional Sembilang', province: 'Sumatera Selatan', status: 'Aktif', bibit: '320.000', dana: 'Rp 23,10 M', progress: 80, x: 20, y: 55 },
  { id: 4, name: 'Kecamatan Kwandang', province: 'Gorontalo Utara', status: 'Aktif', bibit: '150.000', dana: 'Rp 9,80 M', progress: 40, x: 55, y: 42 },
  { id: 5, name: 'Teluk Balikpapan', province: 'Kalimantan Timur', status: 'Monitoring', bibit: '95.000', dana: 'Rp 7,20 M', progress: 62, x: 48, y: 48 },
  { id: 6, name: 'Segara Anakan', province: 'Cilacap, Jawa Tengah', status: 'Restorasi', bibit: '120.000', dana: 'Rp 8,75 M', progress: 58, x: 30, y: 66 },
  { id: 7, name: 'Nusa Lembongan', province: 'Bali', status: 'Aktif', bibit: '75.000', dana: 'Rp 4,60 M', progress: 55, x: 38, y: 70 },
  { id: 8, name: 'Pulau Rupat', province: 'Riau', status: 'Verifikasi', bibit: '110.000', dana: 'Rp 6,90 M', progress: 47, x: 15, y: 45 },
];

const highlighted = programs.slice(0, 4);

type MapMode = 'impact' | 'data' | 'verification';

const modeInfo: Record<MapMode, { label: string; desc: string }> = {
  impact: { label: 'Impact Map', desc: 'Visualisasi dampak publik' },
  data: { label: 'Data Map', desc: 'Sebaran data program dan kontribusi' },
  verification: { label: 'Verification Map', desc: 'Monitoring lapangan dan geo-tagging' },
};

const statusColor: Record<ProgramStatus, string> = {
  Aktif: '#B7FF2A',
  Verifikasi: '#23C16B',
  Restorasi: '#F4FFF4',
  Monitoring: '#6EEEA0',
};

const statusBadge: Record<ProgramStatus, 'green' | 'yellow' | 'blue'> = {
  Aktif: 'green',
  Verifikasi: 'yellow',
  Restorasi: 'blue',
  Monitoring: 'green',
};

/* ─── sub-components ─── */

function PulseMarker({
  program,
  isSelected,
  onHover,
  onLeave,
  onClick,
}: {
  program: ProgramLocation;
  isSelected: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const color = statusColor[program.status];
  return (
    <button
      className="absolute z-10 group"
      style={{ left: `${program.x}%`, top: `${program.y}%`, transform: 'translate(-50%,-50%)' }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      aria-label={program.name}
    >
      <span
        className="block w-3.5 h-3.5 rounded-full border-2 border-white/30 shadow-lg transition-transform duration-200"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 12px ${color}80, 0 0 24px ${color}40`,
          transform: isSelected ? 'scale(1.6)' : undefined,
        }}
      />
      {/* pulse ring */}
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-40"
        style={{ backgroundColor: color }}
      />
    </button>
  );
}

function Tooltip({ program }: { program: ProgramLocation }) {
  return (
    <div
      className="absolute z-30 w-64 pointer-events-none"
      style={{
        left: `${program.x}%`,
        top: `${program.y}%`,
        transform: program.x > 60 ? 'translate(-105%,-110%)' : 'translate(10%,-110%)',
      }}
    >
      <div className="bg-mangrove-deep/95 backdrop-blur-xl border border-mangrove-neon/20 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="font-bold text-sm text-white">{program.name}</p>
            <p className="text-xs text-gray-400">{program.province}</p>
          </div>
          <Badge variant={statusBadge[program.status]}>{program.status}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-gray-400">Bibit</p>
            <p className="font-bold text-mangrove-neon">{program.bibit}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-2">
            <p className="text-gray-400">Dana QRIS</p>
            <p className="font-bold text-mangrove-neon">{program.dana}</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Progress</span>
            <span className="text-mangrove-neon font-semibold">{program.progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${program.progress}%`, background: `linear-gradient(90deg, #23C16B, #B7FF2A)` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Indonesia SVG silhouette ─── */
function IndonesiaIslands({ mode }: { mode: MapMode }) {
  const baseOpacity = mode === 'verification' ? 0.12 : 0.18;
  const gridOpacity = mode === 'data' ? 0.18 : 0.08;

  return (
    <>
      {/* grid overlay */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: gridOpacity }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mapgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B7FF2A" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapgrid)" />
      </svg>

      {/* abstract islands */}
      <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="islandGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#23C16B" />
            <stop offset="100%" stopColor="#B7FF2A" />
          </linearGradient>
        </defs>

        {/* Sumatera */}
        <path d="M80,180 C90,160 120,140 140,160 C160,180 150,220 140,250 C130,280 110,300 90,280 C70,260 60,230 65,210 C70,195 75,185 80,180Z"
          fill="url(#islandGrad)" opacity={baseOpacity} filter="url(#glow)" />
        {/* Jawa */}
        <path d="M200,340 C220,330 260,325 300,330 C340,335 380,340 400,335 C420,330 390,350 350,350 C310,350 270,352 240,350 C210,348 190,345 200,340Z"
          fill="url(#islandGrad)" opacity={baseOpacity} filter="url(#glow)" />
        {/* Kalimantan */}
        <path d="M350,170 C370,150 420,140 450,160 C480,180 500,220 490,260 C480,290 450,300 420,280 C390,260 360,240 340,210 C330,195 340,180 350,170Z"
          fill="url(#islandGrad)" opacity={baseOpacity} filter="url(#glow)" />
        {/* Sulawesi */}
        <path d="M520,180 C540,160 560,170 555,200 C550,230 565,250 580,240 C595,230 570,260 545,270 C520,280 510,260 510,240 C510,220 510,195 520,180Z"
          fill="url(#islandGrad)" opacity={baseOpacity} filter="url(#glow)" />
        {/* Papua */}
        <path d="M750,200 C780,180 820,175 840,190 C860,205 850,240 830,260 C810,280 780,285 755,270 C730,255 720,230 730,215 C735,205 745,200 750,200Z"
          fill="url(#islandGrad)" opacity={baseOpacity} filter="url(#glow)" />
        {/* Bali+NTB */}
        <path d="M400,360 C410,355 425,358 430,365 C435,372 420,375 410,372 C400,370 395,365 400,360Z"
          fill="url(#islandGrad)" opacity={baseOpacity} filter="url(#glow)" />
        {/* NTT */}
        <path d="M450,370 C465,365 485,368 500,373 C515,378 510,385 490,383 C470,381 450,378 450,370Z"
          fill="url(#islandGrad)" opacity={baseOpacity} filter="url(#glow)" />
        {/* Maluku */}
        <ellipse cx="650" cy="250" rx="30" ry="45" fill="url(#islandGrad)" opacity={baseOpacity * 0.7} filter="url(#glow)" />

        {/* data mode coordinate labels */}
        {mode === 'data' && (
          <>
            <text x="50" y="30" fill="#B7FF2A" fontSize="10" opacity="0.4">5°N</text>
            <text x="50" y="250" fill="#B7FF2A" fontSize="10" opacity="0.4">0°</text>
            <text x="50" y="470" fill="#B7FF2A" fontSize="10" opacity="0.4">10°S</text>
            <text x="200" y="490" fill="#B7FF2A" fontSize="10" opacity="0.4">100°E</text>
            <text x="500" y="490" fill="#B7FF2A" fontSize="10" opacity="0.4">120°E</text>
            <text x="800" y="490" fill="#B7FF2A" fontSize="10" opacity="0.4">140°E</text>
          </>
        )}

        {/* verification mode: satellite overlay look */}
        {mode === 'verification' && (
          <>
            <rect x="0" y="0" width="1000" height="500" fill="#000" opacity="0.15" />
            <text x="820" y="30" fill="#B7FF2A" fontSize="9" opacity="0.5">SAT-VIEW</text>
            <text x="820" y="45" fill="#23C16B" fontSize="8" opacity="0.4">GEO-TAG ACTIVE</text>
          </>
        )}
      </svg>

      {/* radial glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-mangrove-fresh/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-mangrove-neon/5 rounded-full blur-3xl pointer-events-none" />
    </>
  );
}

/* ─── main component ─── */
export default function IDMAPInteractiveMapSection() {
  const [mode, setMode] = useState<MapMode>('impact');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const hoveredProgram = programs.find((p) => p.id === hoveredId);
  const selectedProgram = programs.find((p) => p.id === selectedId);

  return (
    <section className="relative bg-mangrove-deep overflow-hidden">
      {/* subtle radial bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#063C3855_0%,_#052E2B_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        {/* header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Jelajahi Peta Mangrove Indonesia
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Pantau sebaran, kondisi, dan program restorasi mangrove secara interaktif melalui
            visualisasi lokasi aktif, kontribusi QRIS, dan dampak lingkungan.
          </p>
        </div>

        {/* main grid: map + card */}
        <div className="grid lg:grid-cols-10 gap-6">
          {/* map panel ~70% */}
          <div className="lg:col-span-7">
            <div className="relative bg-mangrove-teal rounded-2xl overflow-hidden border border-white/5 min-h-[420px] md:min-h-[480px]">
              <IndonesiaIslands mode={mode} />

              {/* markers */}
              {programs.map((p) => (
                <PulseMarker
                  key={p.id}
                  program={p}
                  isSelected={selectedId === p.id}
                  onHover={() => setHoveredId(p.id)}
                  onLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedId(selectedId === p.id ? null : p.id)}
                />
              ))}

              {/* tooltip */}
              {hoveredProgram && <Tooltip program={hoveredProgram} />}

              {/* mode description overlay */}
              <div className="absolute top-4 left-4 bg-mangrove-deep/60 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/5">
                <p className="text-xs text-mangrove-neon font-semibold">{modeInfo[mode].label}</p>
                <p className="text-[10px] text-gray-400">{modeInfo[mode].desc}</p>
              </div>

              {/* bottom controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                {/* mode buttons */}
                <div className="flex gap-2">
                  {(['impact', 'data', 'verification'] as MapMode[]).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMode(m)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        mode === m
                          ? 'bg-mangrove-neon text-mangrove-deep'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 backdrop-blur-lg'
                      }`}
                    >
                      {m === 'impact' && <Activity className="w-3 h-3 inline mr-1" />}
                      {m === 'data' && <Layers className="w-3 h-3 inline mr-1" />}
                      {m === 'verification' && <Satellite className="w-3 h-3 inline mr-1" />}
                      {modeInfo[m].label}
                    </button>
                  ))}
                </div>

                {/* legend + zoom */}
                <div className="flex items-end gap-3">
                  {/* legend */}
                  <div className="hidden md:flex gap-3 bg-mangrove-deep/60 backdrop-blur-lg rounded-xl px-4 py-2 border border-white/5">
                    {(['Aktif', 'Verifikasi', 'Restorasi', 'Monitoring'] as ProgramStatus[]).map((s) => (
                      <div key={s} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor[s] }} />
                        <span className="text-[10px] text-gray-400">{s}</span>
                      </div>
                    ))}
                  </div>

                  {/* zoom */}
                  <div className="flex flex-col gap-1">
                    <button className="w-8 h-8 bg-mangrove-deep/60 backdrop-blur-lg text-white rounded-lg flex items-center justify-center text-sm font-bold border border-white/5 hover:bg-mangrove-deep/80">+</button>
                    <button className="w-8 h-8 bg-mangrove-deep/60 backdrop-blur-lg text-white rounded-lg flex items-center justify-center text-sm font-bold border border-white/5 hover:bg-mangrove-deep/80">−</button>
                  </div>
                </div>
              </div>
            </div>

            {/* selected program detail */}
            {selectedProgram && (
              <div className="mt-4 bg-mangrove-teal/50 backdrop-blur-lg border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <LocateFixed className="w-5 h-5 text-mangrove-neon" />
                    <div>
                      <p className="font-bold text-white text-sm">{selectedProgram.name}</p>
                      <p className="text-xs text-gray-400">{selectedProgram.province}</p>
                    </div>
                    <Badge variant={statusBadge[selectedProgram.status]}>{selectedProgram.status}</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <div className="bg-white/5 rounded-lg p-2.5 text-center">
                      <Leaf className="w-4 h-4 text-mangrove-fresh mx-auto mb-1" />
                      <p className="text-xs text-gray-400">Bibit</p>
                      <p className="font-bold text-white text-sm">{selectedProgram.bibit}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2.5 text-center">
                      <DollarSign className="w-4 h-4 text-mangrove-neon mx-auto mb-1" />
                      <p className="text-xs text-gray-400">Dana QRIS</p>
                      <p className="font-bold text-white text-sm">{selectedProgram.dana}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2.5 text-center">
                      <Activity className="w-4 h-4 text-mangrove-fresh mx-auto mb-1" />
                      <p className="text-xs text-gray-400">Progress</p>
                      <p className="font-bold text-mangrove-neon text-sm">{selectedProgram.progress}%</p>
                    </div>
                  </div>
                </div>
                <Button variant="neon" size="sm">
                  Lihat Detail Program <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* right floating card ~30% */}
          <div className="lg:col-span-3">
            <Card dark className="h-full border border-white/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-mangrove-neon" />
                Lokasi Program Aktif
              </h3>
              <div className="space-y-4">
                {highlighted.map((loc) => (
                  <button
                    key={loc.id}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      selectedId === loc.id
                        ? 'bg-mangrove-neon/10 border border-mangrove-neon/30'
                        : 'bg-white/5 border border-transparent hover:border-white/10'
                    }`}
                    onClick={() => setSelectedId(selectedId === loc.id ? null : loc.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-mangrove-teal to-mangrove-deep rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                        <TreePine className="w-4 h-4 text-mangrove-neon" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-sm text-white truncate">{loc.name}</p>
                          <Badge variant={statusBadge[loc.status]}>{loc.status}</Badge>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">{loc.province}</p>
                        <ProgressBar value={loc.progress} className="mt-2" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-6 w-full">
                Lihat Semua Lokasi <ChevronRight className="w-4 h-4" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

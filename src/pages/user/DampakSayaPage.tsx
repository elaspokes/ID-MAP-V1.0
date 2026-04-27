import { Leaf, TreePine, Wind, Globe, TrendingUp, Droplets, Sun, MapPin } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardTopbar from '../../components/DashboardTopbar';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import StatCard from '../../components/ui/StatCard';
import menuItems from './userMenuItems';

const impactTrend = [
  { month: 'Jan', karbon: 1.8, bibit: 3 },
  { month: 'Feb', karbon: 3.5, bibit: 5 },
  { month: 'Mar', karbon: 5.8, bibit: 8 },
  { month: 'Apr', karbon: 9.2, bibit: 15 },
  { month: 'Mei', karbon: 12.5, bibit: 25 },
];

const sdgs = [
  { num: 13, title: 'Climate Action', desc: 'Menyerap 12,5 ton CO₂ per tahun melalui restorasi mangrove', progress: 78 },
  { num: 14, title: 'Life Below Water', desc: 'Melindungi ekosistem pesisir dan habitat laut', progress: 65 },
  { num: 15, title: 'Life on Land', desc: 'Mengembalikan lahan terdegradasi menjadi hutan mangrove produktif', progress: 72 },
  { num: 6, title: 'Clean Water', desc: 'Mangrove menyaring polutan dan menjaga kualitas air pesisir', progress: 55 },
];

const locationImpacts = [
  { loc: 'Papua Barat', bibit: 10, karbon: '5,2 ton', area: '0,8 ha', status: 'Tumbuh aktif' },
  { loc: 'Demak, Jawa Tengah', bibit: 7, karbon: '3,6 ton', area: '0,5 ha', status: 'Dalam verifikasi' },
  { loc: 'Sumatera Selatan', bibit: 8, karbon: '3,7 ton', area: '0,6 ha', status: 'Tumbuh aktif' },
];

export default function DampakSayaPage() {
  return (
    <div className="min-h-screen bg-mangrove-mint">
      <DashboardSidebar variant="user" menuItems={menuItems} />
      <div className="ml-64">
        <DashboardTopbar placeholder="Cari..." userName="Andi" userRole="Kontributor" />
        <main className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-mangrove-deep">Dampak Saya</h1>
            <p className="text-sm text-mangrove-muted mt-1">Jejak lingkungan yang Anda ciptakan melalui kontribusi restorasi mangrove.</p>
          </div>

          {/* Impact stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard icon={<TreePine className="w-5 h-5" />} label="Bibit Ditanam" value="25 pohon" delta="+5 bulan ini" />
            <StatCard icon={<Wind className="w-5 h-5" />} label="CO₂ Diserap" value="12,5 ton/thn" delta="+2,3 ton" />
            <StatCard icon={<Globe className="w-5 h-5" />} label="Lahan Dipulihkan" value="1,9 ha" delta="estimasi" />
            <StatCard icon={<Droplets className="w-5 h-5" />} label="Air Bersih Terjaga" value="~4.500 L/hari" delta="kapasitas filter" />
          </div>

          {/* Impact visualisation */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            <Card className="col-span-8">
              <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-mangrove-fresh" /> Pertumbuhan Dampak Anda
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={impactTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="karbon" name="CO₂ (ton)" stroke="#23C16B" fill="url(#dampakGrad)" strokeWidth={2} />
                  <Area type="monotone" dataKey="bibit" name="Bibit" stroke="#B7FF2A" fill="url(#bibitGrad)" strokeWidth={2} />
                  <defs>
                    <linearGradient id="dampakGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#23C16B" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#23C16B" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="bibitGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#B7FF2A" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#B7FF2A" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Eco equivalence */}
            <div className="col-span-4 space-y-4">
              <Card className="bg-gradient-to-br from-mangrove-deep to-mangrove-teal text-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-mangrove-neon" /> Setara Dengan
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                    <Sun className="w-8 h-8 text-amber-400" />
                    <div>
                      <p className="text-sm font-bold">2.680 km berkendara</p>
                      <p className="text-xs text-gray-400">emisi CO₂ yang dinetralkan</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                    <TreePine className="w-8 h-8 text-mangrove-neon" />
                    <div>
                      <p className="text-sm font-bold">625 pohon dewasa</p>
                      <p className="text-xs text-gray-400">setara penyerapan 1 tahun</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                    <Droplets className="w-8 h-8 text-blue-400" />
                    <div>
                      <p className="text-sm font-bold">1,6 juta liter air</p>
                      <p className="text-xs text-gray-400">kapasitas filtrasi pesisir</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* SDG contribution */}
          <Card className="mb-8">
            <h3 className="font-bold text-mangrove-deep mb-4">Kontribusi terhadap SDGs</h3>
            <div className="grid grid-cols-2 gap-4">
              {sdgs.map((s) => (
                <div key={s.num} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-mangrove-neon/10 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-mangrove-deep">{s.num}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-mangrove-deep">SDG {s.num}: {s.title}</p>
                      <p className="text-xs text-mangrove-muted">{s.desc}</p>
                    </div>
                  </div>
                  <ProgressBar value={s.progress} />
                  <p className="text-xs text-mangrove-muted mt-1 text-right">{s.progress}%</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Per-location impact */}
          <Card>
            <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-mangrove-fresh" /> Dampak per Lokasi
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {locationImpacts.map((l) => (
                <div key={l.loc} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-mangrove-fresh" />
                    <p className="font-semibold text-sm text-mangrove-deep">{l.loc}</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-mangrove-muted">Bibit Anda</span>
                      <span className="font-semibold text-mangrove-deep">{l.bibit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mangrove-muted">CO₂ Diserap</span>
                      <span className="font-semibold text-mangrove-deep">{l.karbon}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mangrove-muted">Area</span>
                      <span className="font-semibold text-mangrove-deep">{l.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-mangrove-muted">Status</span>
                      <Badge variant="green">{l.status}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

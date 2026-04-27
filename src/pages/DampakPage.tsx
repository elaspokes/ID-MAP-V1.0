import { Link } from 'react-router-dom';
import { Globe, MapPin, Users, Leaf, TreePine, Wind, Droplets, TrendingUp, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const impactStats = [
  { icon: <Globe className="w-7 h-7" />, value: '2.145 ha', label: 'Area Dipulihkan', delta: '+340 ha' },
  { icon: <MapPin className="w-7 h-7" />, value: '156', label: 'Lokasi Program', delta: '+24' },
  { icon: <Users className="w-7 h-7" />, value: '12.456', label: 'Kontributor', delta: '+1.890' },
  { icon: <TreePine className="w-7 h-7" />, value: '1.285.760', label: 'Bibit Ditanam', delta: '+185.000' },
  { icon: <Wind className="w-7 h-7" />, value: '823.456 ton', label: 'CO₂e Diserap', delta: '+96.000 ton' },
  { icon: <Droplets className="w-7 h-7" />, value: '78%', label: 'Tingkat Survival', delta: '+5%' },
];

const yearlyData = [
  { year: '2021', area: 320, bibit: 150000, karbon: 95000 },
  { year: '2022', area: 780, bibit: 450000, karbon: 280000 },
  { year: '2023', area: 1450, bibit: 890000, karbon: 560000 },
  { year: '2024', area: 2145, bibit: 1285760, karbon: 823456 },
];

const provinceData = [
  { name: 'Papua Barat', value: 450 },
  { name: 'Sumsel', value: 380 },
  { name: 'Jawa Tengah', value: 320 },
  { name: 'Gorontalo', value: 250 },
  { name: 'Kaltim', value: 200 },
  { name: 'Riau', value: 180 },
  { name: 'Bali', value: 150 },
  { name: 'Jawa Barat', value: 120 },
];

const stories = [
  { loc: 'Desa Timbulsloko, Demak', title: 'Dari Abrasi Menjadi Harapan', desc: 'Garis pantai yang hilang 3 km kini mulai kembali berkat penanaman 180.000 bibit mangrove oleh masyarakat lokal dan kontributor ID-MAP.', bibit: '180.000', area: '340 ha' },
  { loc: 'Teluk Bintuni, Papua Barat', title: 'Hutan Mangrove Terluas', desc: 'Program restorasi terbesar ID-MAP menjangkau kawasan konservasi perairan daerah dengan target 250.000 bibit dan monitoring berbasis satelit.', bibit: '250.000', area: '520 ha' },
  { loc: 'TN Sembilang, Sumatera Selatan', title: 'Restorasi Taman Nasional', desc: 'Kolaborasi dengan BKSDA untuk memulihkan zona penyangga taman nasional. Tingkat survival mencapai 85% — tertinggi di antara semua program.', bibit: '320.000', area: '480 ha' },
];

export default function DampakPage() {
  return (
    <div className="min-h-screen bg-mangrove-deep text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-mangrove-deep/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold text-mangrove-neon tracking-tight">ID-MAP</Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
            <Link to="/tentang" className="hover:text-white transition-colors">Tentang</Link>
            <Link to="/peta-mangrove" className="hover:text-white transition-colors">Peta Mangrove</Link>
            <Link to="/program" className="hover:text-white transition-colors">Program</Link>
            <Link to="/dampak" className="text-white font-semibold">Dampak</Link>
            <Link to="/edukasi" className="hover:text-white transition-colors">Edukasi</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/user"><Button variant="ghost" size="sm" className="!text-gray-300 hover:!text-white">Masuk</Button></Link>
            <Link to="/user"><Button variant="neon" size="sm">Daftar</Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#063C3855_0%,_#052E2B_70%)]" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p className="text-mangrove-neon text-sm font-semibold tracking-wider uppercase mb-4">Dampak Nyata</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            Dampak Kontribusi Anda
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Setiap rupiah yang Anda donasikan berdampak langsung pada pemulihan ekosistem mangrove dan kehidupan masyarakat pesisir.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="max-w-7xl mx-auto px-6 -mt-4 mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {impactStats.map((s) => (
            <div key={s.label} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-mangrove-neon">{s.icon}</div>
                <span className="text-xs text-mangrove-fresh font-semibold bg-mangrove-fresh/10 px-2 py-0.5 rounded-full">{s.delta}</span>
              </div>
              <p className="text-2xl font-extrabold text-white">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Charts */}
      <section className="bg-mangrove-mint py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-mangrove-deep text-center mb-12">Tren Pertumbuhan</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="font-bold text-mangrove-deep mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-mangrove-fresh" /> Area Dipulihkan (ha)
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={yearlyData}>
                  <defs>
                    <linearGradient id="dampakGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B7FF2A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#23C16B" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="area" stroke="#23C16B" fill="url(#dampakGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              <h3 className="font-bold text-mangrove-deep mb-6 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-mangrove-fresh" /> Restorasi per Provinsi (ha)
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={provinceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#6B7280' }} width={80} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {provinceData.map((_, i) => (
                      <Cell key={i} fill={i % 2 === 0 ? '#23C16B' : '#B7FF2A'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-mangrove-deep text-center mb-12">Cerita Sukses</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {stories.map((s) => (
              <Card key={s.title} className="hover:shadow-lg transition-shadow">
                <div className="h-40 bg-gradient-to-br from-mangrove-deep to-mangrove-teal rounded-xl flex items-center justify-center mb-4">
                  <TreePine className="w-12 h-12 text-mangrove-neon/30" />
                </div>
                <p className="text-xs text-mangrove-fresh font-medium mb-2">{s.loc}</p>
                <h3 className="font-bold text-mangrove-deep text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-mangrove-muted mb-4">{s.desc}</p>
                <div className="flex gap-4 text-xs text-mangrove-muted">
                  <span className="flex items-center gap-1"><TreePine className="w-3 h-3" /> {s.bibit} bibit</span>
                  <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {s.area}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mangrove-deep py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Jadilah Bagian dari Dampak Ini</h2>
          <p className="text-gray-400 mb-8">Kontribusi Anda hari ini akan menjadi warisan untuk generasi mendatang.</p>
          <Link to="/user">
            <Button variant="neon" size="lg">Mulai Berkontribusi <ArrowRight className="w-5 h-5" /></Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

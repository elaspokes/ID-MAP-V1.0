import { Link } from 'react-router-dom';
import { MapPin, TreePine, DollarSign, Users, ChevronRight, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';

const programs = [
  { name: 'Restorasi Teluk Bintuni', loc: 'Papua Barat', status: 'Aktif', bibit: '250.000', dana: 'Rp 16,45 M', progress: 75, kontributor: 1240, badge: 'green' as const },
  { name: 'Desa Timbulsloko', loc: 'Demak, Jawa Tengah', status: 'Verifikasi', bibit: '180.000', dana: 'Rp 12,30 M', progress: 43, kontributor: 856, badge: 'yellow' as const },
  { name: 'Taman Nasional Sembilang', loc: 'Sumatera Selatan', status: 'Aktif', bibit: '320.000', dana: 'Rp 23,10 M', progress: 80, kontributor: 1580, badge: 'green' as const },
  { name: 'Kecamatan Kwandang', loc: 'Gorontalo Utara', status: 'Aktif', bibit: '150.000', dana: 'Rp 9,80 M', progress: 40, kontributor: 620, badge: 'green' as const },
  { name: 'Teluk Balikpapan', loc: 'Kalimantan Timur', status: 'Monitoring', bibit: '95.000', dana: 'Rp 7,20 M', progress: 62, kontributor: 430, badge: 'blue' as const },
  { name: 'Segara Anakan', loc: 'Cilacap, Jawa Tengah', status: 'Restorasi', bibit: '120.000', dana: 'Rp 8,75 M', progress: 58, kontributor: 780, badge: 'blue' as const },
  { name: 'Nusa Lembongan', loc: 'Bali', status: 'Aktif', bibit: '75.000', dana: 'Rp 4,60 M', progress: 55, kontributor: 350, badge: 'green' as const },
  { name: 'Pulau Rupat', loc: 'Riau', status: 'Verifikasi', bibit: '110.000', dana: 'Rp 6,90 M', progress: 47, kontributor: 520, badge: 'yellow' as const },
];

const stats = [
  { icon: <MapPin className="w-6 h-6" />, value: '8', label: 'Program Aktif' },
  { icon: <TreePine className="w-6 h-6" />, value: '1.300.000+', label: 'Bibit Ditanam' },
  { icon: <DollarSign className="w-6 h-6" />, value: 'Rp 89,1 M', label: 'Dana Terkumpul' },
  { icon: <Users className="w-6 h-6" />, value: '6.376', label: 'Total Kontributor' },
];

export default function ProgramPage() {
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
            <Link to="/program" className="text-white font-semibold">Program</Link>
            <Link to="/dampak" className="hover:text-white transition-colors">Dampak</Link>
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
          <p className="text-mangrove-neon text-sm font-semibold tracking-wider uppercase mb-4">Program Restorasi</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            Program Restorasi Mangrove
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-12">
            Dukung program restorasi mangrove di seluruh Indonesia. Setiap kontribusi Anda berdampak nyata.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 backdrop-blur-lg rounded-2xl p-5 border border-white/5">
                <div className="text-mangrove-neon mb-2 flex justify-center">{s.icon}</div>
                <p className="text-2xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Grid */}
      <section className="bg-mangrove-mint py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-mangrove-deep text-center mb-12">Semua Program</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((p) => (
              <Card key={p.name} className="hover:shadow-lg transition-shadow">
                <div className="flex gap-5">
                  <div className="w-32 h-32 bg-gradient-to-br from-mangrove-deep to-mangrove-teal rounded-xl flex items-center justify-center flex-shrink-0">
                    <TreePine className="w-10 h-10 text-mangrove-neon/40" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-mangrove-deep">{p.name}</h3>
                        <p className="text-xs text-mangrove-muted flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {p.loc}
                        </p>
                      </div>
                      <Badge variant={p.badge}>{p.status}</Badge>
                    </div>
                    <ProgressBar value={p.progress} className="my-3" />
                    <div className="flex gap-4 text-xs text-mangrove-muted mb-3">
                      <span className="flex items-center gap-1"><TreePine className="w-3 h-3" /> {p.bibit} bibit</span>
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {p.dana}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {p.kontributor}</span>
                    </div>
                    <Button variant="neon" size="sm">
                      Dukung Program <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-mangrove-deep py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Cara Mendukung Program</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', icon: <MapPin className="w-6 h-6" />, title: 'Pilih Program', desc: 'Pilih lokasi program restorasi yang ingin Anda dukung.' },
              { step: '2', icon: <DollarSign className="w-6 h-6" />, title: 'Kontribusi via QRIS', desc: 'Dukung melalui pembayaran QRIS yang aman dan transparan.' },
              { step: '3', icon: <CheckCircle2 className="w-6 h-6" />, title: 'Pantau Dampak', desc: 'Lihat perkembangan program dan dampak kontribusi Anda.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-mangrove-neon/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-mangrove-neon">
                  {s.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/user" className="inline-block mt-12">
            <Button variant="neon" size="lg">Mulai Berkontribusi <ChevronRight className="w-5 h-5" /></Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

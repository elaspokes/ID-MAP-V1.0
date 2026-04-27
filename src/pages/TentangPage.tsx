import { Link } from 'react-router-dom';
import { Users, Target, Eye, TreePine, Globe, Award, ArrowRight, Heart, Shield, Zap } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const team = [
  { name: 'Dr. Ahmad Ridwan', role: 'Direktur Utama', desc: 'Ahli ekologi pesisir dengan 15 tahun pengalaman' },
  { name: 'Siti Nurhaliza', role: 'Kepala Teknologi', desc: 'Spesialis GIS dan remote sensing' },
  { name: 'Budi Santoso', role: 'Kepala Operasional', desc: 'Mantan koordinator restorasi BRGM' },
  { name: 'Maya Putri', role: 'Kepala Komunitas', desc: 'Pemberdayaan masyarakat pesisir' },
];

const values = [
  { icon: <Heart className="w-6 h-6" />, title: 'Keberlanjutan', desc: 'Fokus pada dampak jangka panjang untuk ekosistem pesisir dan masyarakat lokal.' },
  { icon: <Shield className="w-6 h-6" />, title: 'Transparansi', desc: 'Setiap kontribusi dapat dilacak secara real-time melalui teknologi blockchain dan QRIS.' },
  { icon: <Zap className="w-6 h-6" />, title: 'Inovasi', desc: 'Menggunakan teknologi terdepan untuk monitoring dan verifikasi lapangan.' },
  { icon: <Users className="w-6 h-6" />, title: 'Kolaborasi', desc: 'Menghubungkan pemerintah, swasta, akademisi, dan masyarakat.' },
];

const milestones = [
  { year: '2021', title: 'Pendirian ID-MAP', desc: 'Inisiatif dimulai sebagai proyek riset Integrasi Data Mangrove Pesisir.' },
  { year: '2022', title: 'Platform Digital Diluncurkan', desc: 'Versi pertama platform dengan peta interaktif dan sistem donasi QRIS.' },
  { year: '2023', title: 'Ekspansi Nasional', desc: 'Menjangkau 8 provinsi dengan 156 lokasi program aktif.' },
  { year: '2024', title: 'ID-MAP v1.0', desc: 'Peluncuran Integrated Digital Mangrove & Coastal Platform dengan fitur lengkap.' },
];

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-mangrove-deep text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-mangrove-deep/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold text-mangrove-neon tracking-tight">ID-MAP</Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
            <Link to="/tentang" className="text-white font-semibold">Tentang</Link>
            <Link to="/peta-mangrove" className="hover:text-white transition-colors">Peta Mangrove</Link>
            <Link to="/program" className="hover:text-white transition-colors">Program</Link>
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
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#063C3855_0%,_#052E2B_70%)]" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p className="text-mangrove-neon text-sm font-semibold tracking-wider uppercase mb-4">Tentang ID-MAP</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6 max-w-3xl mx-auto">
            Menghubungkan Data, Aksi, dan Dampak untuk Pesisir Indonesia
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            ID-MAP (Integrated Digital Mangrove & Coastal Platform) adalah platform digital yang mengintegrasikan
            data ekosistem mangrove, pembiayaan berbasis QRIS, dan monitoring dampak lingkungan secara real-time.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-mangrove-mint py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 bg-mangrove-deep rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-7 h-7 text-mangrove-neon" />
              </div>
              <h3 className="font-bold text-mangrove-deep text-lg mb-3">Visi</h3>
              <p className="text-sm text-mangrove-muted">
                Menjadi platform terdepan dalam pengelolaan ekosistem mangrove dan pesisir Indonesia
                melalui teknologi digital dan partisipasi publik.
              </p>
            </Card>
            <Card className="text-center">
              <div className="w-16 h-16 bg-mangrove-deep rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-mangrove-neon" />
              </div>
              <h3 className="font-bold text-mangrove-deep text-lg mb-3">Misi</h3>
              <p className="text-sm text-mangrove-muted">
                Mengintegrasikan data, pembiayaan, dan monitoring untuk mendukung restorasi
                mangrove yang transparan, terukur, dan berdampak nyata.
              </p>
            </Card>
            <Card className="text-center">
              <div className="w-16 h-16 bg-mangrove-deep rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-7 h-7 text-mangrove-neon" />
              </div>
              <h3 className="font-bold text-mangrove-deep text-lg mb-3">Tujuan</h3>
              <p className="text-sm text-mangrove-muted">
                Memulihkan 10.000 hektar mangrove pesisir Indonesia pada tahun 2030 melalui
                kolaborasi multi-pihak berbasis teknologi.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-mangrove-deep text-center mb-12">Nilai-Nilai Kami</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6 rounded-2xl hover:bg-mangrove-mint/50 transition-colors">
                <div className="w-14 h-14 bg-mangrove-fresh/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-mangrove-fresh">
                  {v.icon}
                </div>
                <h3 className="font-bold text-mangrove-deep mb-2">{v.title}</h3>
                <p className="text-sm text-mangrove-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-mangrove-deep py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Perjalanan Kami</h2>
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-6 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-mangrove-neon/10 border-2 border-mangrove-neon rounded-full flex items-center justify-center text-mangrove-neon font-bold text-sm">
                    {m.year}
                  </div>
                  {i < milestones.length - 1 && <div className="w-px h-16 bg-white/10 mt-2" />}
                </div>
                <div className="pt-2">
                  <h3 className="font-bold text-white mb-1">{m.title}</h3>
                  <p className="text-sm text-gray-400">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-mangrove-mint py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-mangrove-deep text-center mb-12">Tim Kami</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {team.map((t) => (
              <Card key={t.name} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-mangrove-deep to-mangrove-teal rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-mangrove-neon/60" />
                </div>
                <h3 className="font-bold text-mangrove-deep">{t.name}</h3>
                <p className="text-xs text-mangrove-fresh font-medium mt-1">{t.role}</p>
                <p className="text-sm text-mangrove-muted mt-2">{t.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mangrove-deep py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <TreePine className="w-12 h-12 text-mangrove-neon mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Bergabunglah Bersama Kami</h2>
          <p className="text-gray-400 mb-8">Jadilah bagian dari gerakan restorasi mangrove terbesar di Indonesia.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/user"><Button variant="neon" size="lg"><Award className="w-5 h-5" /> Daftar Sekarang</Button></Link>
            <Link to="/program"><Button variant="outline" size="lg">Lihat Program <ArrowRight className="w-5 h-5" /></Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import {
  MapPin, TreePine, QrCode, Search as SearchIcon, Award, TrendingUp,
  Users, Sprout, Wind, DollarSign, ExternalLink, Share2, MessageCircle, Play,
  Leaf, ChevronRight, Eye, Globe
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import MangroveMap from '../components/MangroveMap';

const locations = [
  { name: 'KKPD Teluk Bintuni', area: 'Papua Barat', color: 'bg-mangrove-fresh' },
  { name: 'Desa Timbulsloko', area: 'Demak, Jawa Tengah', color: 'bg-blue-500' },
  { name: 'Taman Nasional Sembilang', area: 'Sumatera Selatan', color: 'bg-amber-500' },
  { name: 'Kecamatan Kwandang', area: 'Gorontalo Utara', color: 'bg-purple-500' },
];

const steps = [
  { icon: <SearchIcon className="w-6 h-6" />, title: '1. Pilih Program', desc: 'Pilih lokasi dan program restorasi mangrove yang ingin didukung.' },
  { icon: <QrCode className="w-6 h-6" />, title: '2. Berkontribusi', desc: 'Dukung program melalui pembayaran aman dan berbasis QRIS.' },
  { icon: <Eye className="w-6 h-6" />, title: '3. Pantau Dampak', desc: 'Lihat perkembangan dan dampak lingkungan secara real-time.' },
  { icon: <Award className="w-6 h-6" />, title: '4. Dapatkan Sertifikat', desc: 'Dapatkan sertifikat digital sebagai bukti kontribusi Anda.' },
];

const impacts = [
  { icon: <Globe className="w-7 h-7" />, value: '2.145 ha', label: 'Luas Area Dipulihkan' },
  { icon: <MapPin className="w-7 h-7" />, value: '156', label: 'Lokasi Program Aktif' },
  { icon: <Users className="w-7 h-7" />, value: '432', label: 'Kelompok Pengelola' },
  { icon: <Leaf className="w-7 h-7" />, value: '78%', label: 'Tingkat Kelangsungan Hidup' },
];

const supporters = ['BANK INDONESIA', 'KLHK', 'pesisir', 'kkpd', 'BRGM'];

export default function IDMAPLandingPage() {
  return (
    <div className="min-h-screen bg-mangrove-deep text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-mangrove-deep/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-extrabold text-mangrove-neon tracking-tight">ID-MAP</span>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            {['Beranda', 'Tentang', 'Peta Mangrove', 'Program', 'Dampak', 'Edukasi'].map((m) => (
              <a key={m} href="#" className="hover:text-white transition-colors">{m}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link to="/user">
              <Button variant="ghost" size="sm" className="!text-gray-300 hover:!text-white">Masuk</Button>
            </Link>
            <Link to="/user">
              <Button variant="neon" size="sm">Daftar</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-mangrove.png')" }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-mangrove-deep/80 via-mangrove-deep/50 to-mangrove-deep/40" />
        {/* Decorative SVG overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexgrid" width="50" height="43.3" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
              <polygon points="25,0 50,14.4 50,28.8 25,43.3 0,28.8 0,14.4" fill="none" stroke="#B7FF2A" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexgrid)" />
        </svg>
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-mangrove-fresh/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-mangrove-neon/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-mangrove-neon text-sm font-semibold tracking-wider uppercase mb-4">
              Integrated Digital Mangrove & Coastal Platform
            </p>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-6">
              Dari Data, Menjadi Aksi Nyata untuk Pesisir Indonesia
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              ID-MAP mengintegrasikan data, pembiayaan berbasis QRIS, dan monitoring dampak lingkungan secara real-time.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="neon" size="lg">
                <MapPin className="w-5 h-5" /> Jelajahi Peta
              </Button>
              <Button variant="outline" size="lg">
                <Sprout className="w-5 h-5" /> Dukung Sekarang
              </Button>
            </div>
          </div>

          {/* QRIS Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-mangrove-neon/10 rounded-3xl blur-2xl" />
              <Card glass className="relative w-72 text-center">
                <p className="text-sm font-semibold text-mangrove-neon mb-3">Dukung Lewat QRIS</p>
                <p className="text-xs text-gray-400 mb-4">Scan untuk berkontribusi</p>
                <div className="w-40 h-40 mx-auto bg-white rounded-xl flex items-center justify-center mb-4">
                  <QrCode className="w-28 h-28 text-mangrove-deep" />
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <span className="font-semibold text-white">ID-MAP QRIS</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="relative -mt-12 z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard glass icon={<Users className="w-5 h-5" />} label="Pengguna Terdaftar" value="12.456" />
          <StatCard glass icon={<Sprout className="w-5 h-5" />} label="Bibit Mangrove Ditanam" value="1.285.760" />
          <StatCard glass icon={<Wind className="w-5 h-5" />} label="Serapan Karbon (CO₂e)" value="823.456 ton" />
          <StatCard glass icon={<DollarSign className="w-5 h-5" />} label="Konversi Estimasi Nilai SDA" value="Rp 98,65 M" />
        </div>
      </section>

      {/* Interactive Map */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold mb-2">Jelajahi Peta Mangrove Indonesia</h2>
            <p className="text-gray-400 mb-6">
              Pantau sebaran, kondisi, dan program restorasi mangrove secara interaktif.
            </p>
            <MangroveMap className="h-80 lg:h-96" />
            <Button variant="outline" size="md" className="mt-6">
              <MapPin className="w-4 h-4" /> Buka Peta Interaktif
            </Button>
          </div>
          <div className="lg:col-span-2">
            <Card dark className="h-full">
              <h3 className="text-lg font-bold mb-6">Lokasi Program Aktif</h3>
              <div className="space-y-5">
                {locations.map((loc) => (
                  <div key={loc.name} className="flex items-start gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 ${loc.color} shadow-lg`} />
                    <div>
                      <p className="font-semibold text-sm">{loc.name}</p>
                      <p className="text-xs text-gray-400">{loc.area}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-8 w-full">
                Lihat Semua Lokasi <ChevronRight className="w-4 h-4" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Contribution Steps */}
      <section className="bg-mangrove-mint py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-mangrove-deep text-center mb-4">Cara Berkontribusi</h2>
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {steps.map((step) => (
              <div key={step.title} className="text-center">
                <div className="w-16 h-16 bg-mangrove-deep rounded-2xl flex items-center justify-center mx-auto mb-4 text-mangrove-neon">
                  {step.icon}
                </div>
                <h3 className="font-bold text-mangrove-deep mb-2">{step.title}</h3>
                <p className="text-sm text-mangrove-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-mangrove-deep text-center mb-4">Dampak Nyata untuk Bumi Kita</h2>
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {impacts.map((imp) => (
              <Card key={imp.label} className="text-center">
                <div className="text-mangrove-fresh mb-3 flex justify-center">{imp.icon}</div>
                <p className="text-3xl font-extrabold text-mangrove-deep">{imp.value}</p>
                <p className="text-sm text-mangrove-muted mt-1">{imp.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supporters */}
      <section className="bg-mangrove-mint py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-mangrove-muted mb-6">Didukung oleh:</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {supporters.map((s) => (
              <span key={s} className="px-5 py-2 bg-white rounded-xl text-mangrove-deep font-bold text-sm shadow-sm border border-gray-100">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-mangrove-deep border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-1">
              <span className="text-xl font-extrabold text-mangrove-neon">ID-MAP</span>
              <p className="text-xs text-gray-400 mt-2">Integrated Digital Mangrove<br />& Coastal Platform</p>
              <div className="flex gap-3 mt-4">
                {[ExternalLink, Share2, Play, MessageCircle].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-mangrove-neon hover:bg-white/10 transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: 'Platform', links: ['Beranda', 'Peta Mangrove', 'Program', 'Dampak', 'Edukasi'] },
              { title: 'Tentang', links: ['Tentang ID-MAP', 'Tim', 'Mitra', 'Karir'] },
              { title: 'Bantuan', links: ['FAQ', 'Panduan', 'Kontak Kami', 'Kebijakan Privasi'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{l}</a></li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="font-semibold text-sm mb-4">Unduh Aplikasi</h4>
              <div className="space-y-2">
                <button className="w-full px-4 py-2.5 bg-white/5 rounded-xl text-xs text-left hover:bg-white/10 transition-colors flex items-center gap-2">
                  <TreePine className="w-5 h-5 text-mangrove-fresh" />
                  <div>
                    <p className="text-gray-400 text-[10px]">GET IT ON</p>
                    <p className="font-semibold text-white">Google Play</p>
                  </div>
                </button>
                <button className="w-full px-4 py-2.5 bg-white/5 rounded-xl text-xs text-left hover:bg-white/10 transition-colors flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-mangrove-fresh" />
                  <div>
                    <p className="text-gray-400 text-[10px]">Download on the</p>
                    <p className="font-semibold text-white">App Store</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 mt-12 pt-6 text-center text-xs text-gray-500">
            © 2024 ID-MAP. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { BookOpen, TreePine, Droplets, Shield, Bug, Globe, Play, FileText, ArrowRight, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const articles = [
  { icon: <TreePine className="w-6 h-6" />, title: 'Apa itu Mangrove?', desc: 'Mangrove adalah ekosistem pesisir yang tumbuh di zona pasang surut air laut tropis dan subtropis. Mereka memiliki akar unik yang menyerap air asin.', category: 'Dasar' },
  { icon: <Shield className="w-6 h-6" />, title: 'Mangrove sebagai Pelindung Pantai', desc: 'Ekosistem mangrove mampu meredam gelombang hingga 66% dan melindungi garis pantai dari abrasi serta dampak tsunami.', category: 'Ekologi' },
  { icon: <Droplets className="w-6 h-6" />, title: 'Mangrove dan Perubahan Iklim', desc: 'Mangrove menyerap karbon 5x lebih banyak daripada hutan tropis daratan. Mereka adalah salah satu solusi berbasis alam terbaik.', category: 'Iklim' },
  { icon: <Bug className="w-6 h-6" />, title: 'Keanekaragaman Hayati Mangrove', desc: 'Ekosistem mangrove menjadi habitat bagi lebih dari 1.500 spesies ikan, udang, kepiting, dan berbagai jenis burung pesisir.', category: 'Biodiversitas' },
  { icon: <Globe className="w-6 h-6" />, title: 'Mangrove di Indonesia', desc: 'Indonesia memiliki 23% total mangrove dunia — luasan terbesar di planet ini. Namun 40% dalam kondisi rusak atau terancam.', category: 'Indonesia' },
  { icon: <BookOpen className="w-6 h-6" />, title: 'Restorasi Mangrove: Teknik & Metode', desc: 'Pelajari teknik penanaman, pemeliharaan bibit, dan monitoring pertumbuhan mangrove untuk memastikan keberhasilan restorasi.', category: 'Teknis' },
];

const faqs = [
  { q: 'Bagaimana cara berkontribusi melalui ID-MAP?', a: 'Anda dapat berkontribusi melalui donasi QRIS di halaman program. Setiap donasi langsung mendanai penanaman dan pemeliharaan bibit mangrove di lokasi program terpilih.' },
  { q: 'Apakah kontribusi saya dapat dilacak?', a: 'Ya, setiap kontribusi tercatat dan dapat dipantau melalui dashboard pengguna. Anda akan mendapatkan update berkala tentang perkembangan program yang Anda dukung.' },
  { q: 'Berapa biaya untuk menanam satu bibit mangrove?', a: 'Rata-rata biaya penanaman dan pemeliharaan satu bibit mangrove selama 3 tahun adalah sekitar Rp 15.000 — Rp 25.000, tergantung lokasi dan jenis mangrove.' },
  { q: 'Apa itu sertifikat kontribusi?', a: 'Sertifikat digital diberikan kepada kontributor sebagai bukti partisipasi dalam program restorasi. Sertifikat mencantumkan jumlah bibit, lokasi, dan dampak karbon.' },
  { q: 'Bagaimana proses verifikasi di lapangan?', a: 'Tim verifikator lapangan melakukan pengecekan langsung dengan dokumentasi foto, GPS tagging, dan pengukuran survival rate bibit secara berkala.' },
];

const videos = [
  { title: 'Mengenal Ekosistem Mangrove Indonesia', duration: '12:45', category: 'Pengenalan' },
  { title: 'Teknik Penanaman Mangrove yang Benar', duration: '18:30', category: 'Tutorial' },
  { title: 'Dampak Perubahan Iklim pada Pesisir', duration: '15:20', category: 'Iklim' },
  { title: 'Kisah Sukses Restorasi Teluk Bintuni', duration: '10:15', category: 'Inspirasi' },
];

export default function EdukasiPage() {
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
            <Link to="/dampak" className="hover:text-white transition-colors">Dampak</Link>
            <Link to="/edukasi" className="text-white font-semibold">Edukasi</Link>
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
          <p className="text-mangrove-neon text-sm font-semibold tracking-wider uppercase mb-4">Pusat Edukasi</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            Pelajari Ekosistem Mangrove
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Tingkatkan pemahaman Anda tentang mangrove, perubahan iklim, dan bagaimana Anda dapat berkontribusi
            untuk pelestarian pesisir Indonesia.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-mangrove-mint py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-mangrove-deep text-center mb-12">Artikel & Pengetahuan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((a) => (
              <Card key={a.title} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="w-12 h-12 bg-mangrove-fresh/10 rounded-xl flex items-center justify-center mb-4 text-mangrove-fresh group-hover:bg-mangrove-fresh/20 transition-colors">
                  {a.icon}
                </div>
                <span className="text-[10px] font-semibold text-mangrove-fresh uppercase tracking-wider">{a.category}</span>
                <h3 className="font-bold text-mangrove-deep text-lg mt-1 mb-2">{a.title}</h3>
                <p className="text-sm text-mangrove-muted mb-4">{a.desc}</p>
                <span className="text-sm text-mangrove-fresh font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca Selengkapnya <ChevronRight className="w-4 h-4" />
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Library */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-mangrove-deep text-center mb-12">Video Edukasi</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((v) => (
              <Card key={v.title} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="h-36 bg-gradient-to-br from-mangrove-deep to-mangrove-teal rounded-xl flex items-center justify-center mb-4 relative">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-mangrove-neon/20 transition-colors">
                    <Play className="w-6 h-6 text-white group-hover:text-mangrove-neon" />
                  </div>
                  <span className="absolute bottom-2 right-2 text-[10px] bg-black/50 text-white px-2 py-0.5 rounded">{v.duration}</span>
                </div>
                <span className="text-[10px] font-semibold text-mangrove-fresh uppercase tracking-wider">{v.category}</span>
                <h3 className="font-semibold text-mangrove-deep text-sm mt-1">{v.title}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mangrove-mint py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-mangrove-deep text-center mb-12">Pertanyaan Umum (FAQ)</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <Card key={f.q}>
                <h3 className="font-bold text-mangrove-deep mb-2">{f.q}</h3>
                <p className="text-sm text-mangrove-muted">{f.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-mangrove-deep py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FileText className="w-12 h-12 text-mangrove-neon mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Siap Mengambil Aksi?</h2>
          <p className="text-gray-400 mb-8">Ilmu tanpa aksi tidak berarti. Mulailah berkontribusi untuk pesisir Indonesia hari ini.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/user"><Button variant="neon" size="lg">Daftar & Berkontribusi <ArrowRight className="w-5 h-5" /></Button></Link>
            <Link to="/program"><Button variant="outline" size="lg">Lihat Program</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
}

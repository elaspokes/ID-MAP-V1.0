import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import IDMAPInteractiveMapSection from '../components/IDMAPInteractiveMapSection';

export default function PetaMangrovePage() {
  return (
    <div className="min-h-screen bg-mangrove-deep text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-mangrove-deep/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold text-mangrove-neon tracking-tight">ID-MAP</Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
            <Link to="/tentang" className="hover:text-white transition-colors">Tentang</Link>
            <Link to="/peta-mangrove" className="text-white font-semibold">Peta Mangrove</Link>
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
      <section className="pt-32 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#063C3855_0%,_#052E2B_70%)]" />
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p className="text-mangrove-neon text-sm font-semibold tracking-wider uppercase mb-4">Peta Interaktif</p>
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            Peta Mangrove Indonesia
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Jelajahi sebaran ekosistem mangrove, lokasi program restorasi, dan dampak kontribusi secara interaktif.
          </p>
        </div>
      </section>

      {/* Full Interactive Map */}
      <IDMAPInteractiveMapSection />
    </div>
  );
}

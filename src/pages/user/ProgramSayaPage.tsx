import { TreePine, MapPin, TrendingUp, Users, Eye, ChevronRight, Leaf, DollarSign } from 'lucide-react';
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardTopbar from '../../components/DashboardTopbar';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';
import StatCard from '../../components/ui/StatCard';
import menuItems from './userMenuItems';

const myPrograms = [
  {
    name: 'Restorasi Teluk Bintuni',
    loc: 'Papua Barat',
    status: 'Aktif',
    badge: 'green' as const,
    bibit: '250.000',
    dana: 'Rp 16,45 M',
    progress: 75,
    kontribusi: 'Rp 500.000',
    bibitAnda: 10,
    karbon: '5,2 ton',
    joined: '15 Jan 2024',
    nextUpdate: '28 Mei 2024',
    team: 1240,
    desc: 'Program restorasi ekosistem mangrove di kawasan konservasi perairan daerah Teluk Bintuni, Papua Barat.',
  },
  {
    name: 'Desa Timbulsloko',
    loc: 'Demak, Jawa Tengah',
    status: 'Verifikasi',
    badge: 'yellow' as const,
    bibit: '180.000',
    dana: 'Rp 12,30 M',
    progress: 43,
    kontribusi: 'Rp 350.000',
    bibitAnda: 7,
    karbon: '3,6 ton',
    joined: '22 Feb 2024',
    nextUpdate: '30 Mei 2024',
    team: 856,
    desc: 'Rehabilitasi mangrove pesisir Desa Timbulsloko untuk mencegah abrasi dan meningkatkan ekonomi nelayan.',
  },
  {
    name: 'Taman Nasional Sembilang',
    loc: 'Sumatera Selatan',
    status: 'Aktif',
    badge: 'green' as const,
    bibit: '320.000',
    dana: 'Rp 23,10 M',
    progress: 80,
    kontribusi: 'Rp 400.000',
    bibitAnda: 8,
    karbon: '3,7 ton',
    joined: '5 Mar 2024',
    nextUpdate: '1 Jun 2024',
    team: 1580,
    desc: 'Penguatan ekosistem mangrove di taman nasional Sembilang sebagai habitat satwa liar dan penyerap karbon.',
  },
];

const milestones = [
  { date: '15 Jan 2024', text: 'Bergabung dengan program Restorasi Teluk Bintuni' },
  { date: '22 Feb 2024', text: 'Donasi pertama ke Desa Timbulsloko — Rp 100.000' },
  { date: '5 Mar 2024', text: 'Mendukung TN Sembilang — 8 bibit ditanam atas nama Anda' },
  { date: '24 Apr 2024', text: 'Total kontribusi melewati Rp 1.000.000' },
  { date: '10 Mei 2024', text: 'Sertifikat restorasi diterbitkan — Teluk Bintuni' },
];

export default function ProgramSayaPage() {
  return (
    <div className="min-h-screen bg-mangrove-mint">
      <DashboardSidebar variant="user" menuItems={menuItems} />
      <div className="ml-64">
        <DashboardTopbar placeholder="Cari program..." userName="Andi" userRole="Kontributor" />
        <main className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-mangrove-deep">Program Saya</h1>
            <p className="text-sm text-mangrove-muted mt-1">Program restorasi yang Anda dukung secara aktif.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard icon={<TreePine className="w-5 h-5" />} label="Program Didukung" value="3" delta="+1 bulan ini" />
            <StatCard icon={<Leaf className="w-5 h-5" />} label="Total Bibit Anda" value="25" delta="+5 bulan ini" />
            <StatCard icon={<DollarSign className="w-5 h-5" />} label="Total Kontribusi" value="Rp 1.250.000" delta="+Rp 250K" />
            <StatCard icon={<Users className="w-5 h-5" />} label="Komunitas" value="3.676" delta="kontributor" />
          </div>

          {/* Program cards */}
          <div className="space-y-6 mb-8">
            {myPrograms.map((p) => (
              <Card key={p.name} className="p-0 overflow-hidden">
                <div className="flex">
                  {/* Left image placeholder */}
                  <div className="w-56 bg-gradient-to-br from-mangrove-deep to-mangrove-teal flex items-center justify-center shrink-0">
                    <TreePine className="w-16 h-16 text-mangrove-neon/30" />
                  </div>

                  {/* Right content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-mangrove-deep">{p.name}</h3>
                          <Badge variant={p.badge}>{p.status}</Badge>
                        </div>
                        <div className="flex items-center gap-1.5 text-sm text-mangrove-muted mt-1">
                          <MapPin className="w-3.5 h-3.5" /> {p.loc}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" /> Lihat Detail <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>

                    <p className="text-sm text-mangrove-muted mb-4">{p.desc}</p>

                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-mangrove-muted">Progress Program</span>
                        <span className="font-semibold text-mangrove-deep">{p.progress}%</span>
                      </div>
                      <ProgressBar value={p.progress} />
                    </div>

                    <div className="grid grid-cols-5 gap-3">
                      <div className="bg-mangrove-mint rounded-xl p-3 text-center">
                        <p className="text-xs text-mangrove-muted">Kontribusi Anda</p>
                        <p className="text-sm font-bold text-mangrove-deep">{p.kontribusi}</p>
                      </div>
                      <div className="bg-mangrove-mint rounded-xl p-3 text-center">
                        <p className="text-xs text-mangrove-muted">Bibit Anda</p>
                        <p className="text-sm font-bold text-mangrove-deep">{p.bibitAnda}</p>
                      </div>
                      <div className="bg-mangrove-mint rounded-xl p-3 text-center">
                        <p className="text-xs text-mangrove-muted">CO₂ Diserap</p>
                        <p className="text-sm font-bold text-mangrove-deep">{p.karbon}</p>
                      </div>
                      <div className="bg-mangrove-mint rounded-xl p-3 text-center">
                        <p className="text-xs text-mangrove-muted">Bergabung</p>
                        <p className="text-sm font-bold text-mangrove-deep">{p.joined}</p>
                      </div>
                      <div className="bg-mangrove-mint rounded-xl p-3 text-center">
                        <p className="text-xs text-mangrove-muted">Tim</p>
                        <p className="text-sm font-bold text-mangrove-deep">{p.team.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Timeline */}
          <Card>
            <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-mangrove-fresh" /> Riwayat Aktivitas Program
            </h3>
            <div className="space-y-4">
              {milestones.map((m, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-mangrove-fresh rounded-full" />
                    {i < milestones.length - 1 && <div className="w-0.5 flex-1 bg-gray-200 mt-1" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-xs text-mangrove-muted">{m.date}</p>
                    <p className="text-sm text-mangrove-deep">{m.text}</p>
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

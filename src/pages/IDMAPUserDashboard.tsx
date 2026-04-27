import {
  Home, FolderOpen, Heart, Leaf, Award, Bell, Settings,
  DollarSign, TreePine, Wind, Hash, Eye, Download, CheckCircle2
} from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardTopbar from '../components/DashboardTopbar';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';

const menuItems = [
  { icon: <Home className="w-5 h-5" />, label: 'Beranda', href: '/user' },
  { icon: <FolderOpen className="w-5 h-5" />, label: 'Program Saya' },
  { icon: <Heart className="w-5 h-5" />, label: 'Kontribusi Saya' },
  { icon: <Leaf className="w-5 h-5" />, label: 'Dampak Saya' },
  { icon: <Award className="w-5 h-5" />, label: 'Sertifikat' },
  { icon: <Bell className="w-5 h-5" />, label: 'Notifikasi' },
  { icon: <Settings className="w-5 h-5" />, label: 'Pengaturan' },
];

const contributions = [
  { method: 'Donasi via QRIS', date: '24 Mei 2024', amount: 'Rp 250.000' },
  { method: 'Donasi via QRIS', date: '10 Mei 2024', amount: 'Rp 300.000' },
  { method: 'Donasi via QRIS', date: '2 Mei 2024', amount: 'Rp 200.000' },
  { method: 'Donasi via QRIS', date: '20 Apr 2024', amount: 'Rp 500.000' },
];

export default function IDMAPUserDashboard() {
  return (
    <div className="min-h-screen bg-mangrove-mint">
      <DashboardSidebar variant="user" menuItems={menuItems} />

      <div className="ml-64">
        <DashboardTopbar placeholder="Cari..." userName="Andi" userRole="Kontributor" />

        <main className="p-8">
          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-mangrove-deep">Halo, Andi 👋</h1>
            <p className="text-sm text-mangrove-muted mt-1">Terima kasih telah berkontribusi untuk pesisir Indonesia!</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard icon={<DollarSign className="w-5 h-5" />} label="Total Kontribusi" value="Rp 1.250.000" />
            <StatCard icon={<TreePine className="w-5 h-5" />} label="Bibit yang Didukung" value="25 Pohon" />
            <StatCard icon={<Wind className="w-5 h-5" />} label="Serapan Karbon" value="12,5 ton CO₂e" />
            <StatCard icon={<Hash className="w-5 h-5" />} label="Peringkat Anda" value="#128" delta="Kontributor Aktif" />
          </div>

          <div className="grid grid-cols-12 gap-6 mb-8">
            {/* Program Card */}
            <Card className="col-span-7">
              <h3 className="font-bold text-mangrove-deep mb-5">Program yang Anda Dukung</h3>
              <div className="flex gap-6">
                {/* Image placeholder */}
                <div className="w-56 h-48 bg-gradient-to-br from-mangrove-deep to-mangrove-teal rounded-xl flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                  <TreePine className="w-12 h-12 text-mangrove-neon/30" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white text-xs font-semibold">Restorasi Teluk Bintuni</p>
                    <p className="text-gray-300 text-[10px]">Papua Barat</p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="green">Aktif</Badge>
                    <span className="text-xs text-mangrove-muted">Papua Barat</span>
                  </div>
                  <ProgressBar value={75} className="mb-4" />
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <p className="text-lg font-bold text-mangrove-deep">10</p>
                      <p className="text-[10px] text-mangrove-muted">Bibit Didukung</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <p className="text-lg font-bold text-mangrove-deep">5,2 ton</p>
                      <p className="text-[10px] text-mangrove-muted">CO₂e</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-xl">
                      <p className="text-lg font-bold text-mangrove-deep">Rp 500.000</p>
                      <p className="text-[10px] text-mangrove-muted">Total Kontribusi</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="neon" size="sm">Lihat Detail</Button>
                    <Button variant="ghost" size="sm">Lihat Semua</Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Impact Panel */}
            <div className="col-span-5 space-y-6">
              <Card>
                <h3 className="font-bold text-mangrove-deep mb-4">Dampak Anda</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Pohon Hidup', value: '23' },
                    { label: 'Pertumbuhan Rata-rata', value: '78%' },
                    { label: 'Update Terakhir', value: '24 Mei 2024' },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-50">
                      <span className="text-sm text-mangrove-muted">{item.label}</span>
                      <span className="text-sm font-semibold text-gray-800">{item.value}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4 w-full !border-mangrove-deep !text-mangrove-deep">
                  <Eye className="w-4 h-4" /> Lihat Monitoring
                </Button>
              </Card>

              {/* Adopt a Mangrove */}
              <Card className="!bg-gradient-to-br !from-mangrove-deep !to-mangrove-teal !text-white !border-none">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-mangrove-neon/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TreePine className="w-5 h-5 text-mangrove-neon" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Adopt a Mangrove</h4>
                    <div className="space-y-1 text-xs">
                      <p><span className="text-gray-400">Lat:</span> <span className="text-mangrove-neon">-2.12345</span></p>
                      <p><span className="text-gray-400">Long:</span> <span className="text-mangrove-neon">132.98765</span></p>
                      <div className="flex items-center gap-1 mt-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-mangrove-fresh" />
                        <span className="text-mangrove-fresh font-medium">Terverifikasi</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Contribution History */}
          <div className="grid grid-cols-12 gap-6">
            <Card className="col-span-7">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-mangrove-deep">Riwayat Kontribusi</h3>
                <Button variant="ghost" size="sm" className="!text-mangrove-fresh">Lihat Semua</Button>
              </div>
              <Table headers={['Metode', 'Tanggal', 'Jumlah']}>
                {contributions.map((c, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-mangrove-fresh/10 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-mangrove-fresh" />
                        </div>
                        <span className="text-sm font-medium text-gray-800">{c.method}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-mangrove-muted">{c.date}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-mangrove-deep">{c.amount}</td>
                  </tr>
                ))}
              </Table>
            </Card>

            {/* Certificate */}
            <Card className="col-span-5">
              <h3 className="font-bold text-mangrove-deep mb-4">Sertifikat Terbaru</h3>
              <div className="border-2 border-dashed border-mangrove-fresh/30 rounded-xl p-6 text-center bg-mangrove-mint/50">
                <div className="w-full h-36 bg-gradient-to-br from-mangrove-deep to-mangrove-teal rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                  <Award className="w-12 h-12 text-mangrove-neon/40" />
                  <div className="absolute top-2 left-2 right-2">
                    <p className="text-[8px] text-mangrove-neon/60 uppercase tracking-widest">Sertifikat</p>
                  </div>
                  <div className="absolute bottom-2 left-0 right-0 text-center">
                    <p className="text-xs font-bold text-white">SERTIFIKAT</p>
                    <p className="text-[10px] text-gray-300">Kontribusi Restorasi Mangrove</p>
                  </div>
                </div>
                <p className="font-semibold text-mangrove-deep">Andi Pratama</p>
                <p className="text-xs text-mangrove-muted mt-1 mb-4">Kontributor Restorasi Mangrove Indonesia</p>
                <Button variant="neon" size="sm" className="w-full">
                  <Download className="w-4 h-4" /> Unduh Sertifikat
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

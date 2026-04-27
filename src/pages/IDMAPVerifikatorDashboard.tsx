import {
  LayoutDashboard, ClipboardCheck, MapPin, Database, FileText, Settings,
  CheckCircle2, Clock, XCircle, AlertCircle, Upload, Send, Camera, Play
} from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardTopbar from '../components/DashboardTopbar';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import MangroveMap from '../components/MangroveMap';

const menuItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', href: '/verifikator' },
  { icon: <ClipboardCheck className="w-5 h-5" />, label: 'Tugas Verifikasi' },
  { icon: <MapPin className="w-5 h-5" />, label: 'Verifikasi Lokasi' },
  { icon: <Database className="w-5 h-5" />, label: 'Data Lapangan' },
  { icon: <FileText className="w-5 h-5" />, label: 'Laporan' },
  { icon: <Settings className="w-5 h-5" />, label: 'Pengaturan' },
];

const tasks = [
  { type: 'Verifikasi Penanaman', loc: 'Desa Timbulsloko, Demak', id: 'VRF-0405-001', status: 'Menunggu', badge: 'yellow' as const },
  { type: 'Verifikasi Monitoring', loc: 'Teluk Bintuni, Papua Barat', id: 'VRF-0405-002', status: 'Proses', badge: 'blue' as const },
  { type: 'Verifikasi Penanaman', loc: 'TN Sembilang, Sumsel', id: 'VRF-0405-003', status: 'Menunggu', badge: 'yellow' as const },
];

const fieldPhotos = [
  { loc: 'Desa Timbulsloko', date: '24 Mei 2024', status: 'Terverifikasi', badge: 'green' as const },
  { loc: 'Teluk Bintuni', date: '22 Mei 2024', status: 'Menunggu', badge: 'yellow' as const },
  { loc: 'TN Sembilang', date: '20 Mei 2024', status: 'Proses', badge: 'blue' as const },
];

export default function IDMAPVerifikatorDashboard() {
  return (
    <div className="min-h-screen bg-mangrove-mint">
      <DashboardSidebar variant="verifikator" menuItems={menuItems} />

      <div className="ml-64">
        <DashboardTopbar placeholder="Cari tugas..." userName="Verifikator" userRole="Field Officer" />

        <main className="p-8">
          <h1 className="text-2xl font-bold text-mangrove-deep mb-6">Dashboard Verifikator</h1>

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard icon={<ClipboardCheck className="w-5 h-5" />} label="Tugas Aktif" value="24" />
            <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Tugas Selesai" value="128" />
            <StatCard icon={<Clock className="w-5 h-5" />} label="Menunggu Validasi" value="16" />
            <StatCard icon={<XCircle className="w-5 h-5" />} label="Ditolak" value="3" />
          </div>

          <div className="grid grid-cols-12 gap-6 mb-8">
            {/* Tasks */}
            <Card className="col-span-5">
              <h3 className="font-bold text-mangrove-deep mb-5">Tugas Verifikasi</h3>
              <div className="space-y-4">
                {tasks.map((t) => (
                  <div key={t.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-mangrove-fresh/30 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{t.type}</p>
                        <p className="text-xs text-mangrove-muted mt-0.5">{t.loc}</p>
                      </div>
                      <Badge variant={t.badge}>{t.status}</Badge>
                    </div>
                    <p className="text-xs text-mangrove-muted">ID: {t.id}</p>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-4 w-full !text-mangrove-fresh">
                Lihat Semua Tugas
              </Button>
            </Card>

            {/* Map */}
            <Card className="col-span-7">
              <h3 className="font-bold text-mangrove-deep mb-4">Peta Tugas</h3>
              <MangroveMap
                className="h-72"
                showControls
                pins={[
                  { x: 28, y: 52, label: 'Demak' },
                  { x: 75, y: 60, label: 'Papua' },
                  { x: 22, y: 65, label: 'Sembilang' },
                  { x: 50, y: 55, label: 'Kalimantan' },
                ]}
              />
            </Card>
          </div>

          {/* Field Evidence */}
          <Card className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-mangrove-deep">Aktivitas Lapangan</h3>
              <Button variant="ghost" size="sm" className="!text-mangrove-fresh">Lihat Semua</Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {fieldPhotos.map((photo, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="h-44 bg-gradient-to-br from-mangrove-deep to-mangrove-teal flex items-center justify-center relative">
                    <Camera className="w-10 h-10 text-mangrove-neon/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm text-gray-800">{photo.loc}</p>
                      <Badge variant={photo.badge}>{photo.status}</Badge>
                    </div>
                    <p className="text-xs text-mangrove-muted">{photo.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <Button variant="neon" size="lg" className="w-full">
              <Play className="w-5 h-5" /> Mulai Verifikasi
            </Button>
            <Button variant="outline" size="lg" className="w-full !border-mangrove-deep !text-mangrove-deep">
              <Upload className="w-5 h-5" /> Upload Bukti Lapangan
            </Button>
            <Button variant="white" size="lg" className="w-full">
              <Send className="w-5 h-5" /> Kirim Laporan
            </Button>
          </div>

          {/* Additional Fields */}
          <Card className="mt-8">
            <h3 className="font-bold text-mangrove-deep mb-4">Detail Verifikasi Lapangan</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'GPS Coordinate', value: '-6.8975, 110.6383', icon: <MapPin className="w-4 h-4" /> },
                { label: 'Foto Sebelum/Sesudah', value: '12 foto', icon: <Camera className="w-4 h-4" /> },
                { label: 'Timestamp', value: '24 Mei 2024, 09:30 WIB', icon: <Clock className="w-4 h-4" /> },
                { label: 'Survival Rate', value: '82%', icon: <AlertCircle className="w-4 h-4" /> },
              ].map((f) => (
                <div key={f.label} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-mangrove-fresh mb-1">{f.icon}<span className="text-xs font-medium text-mangrove-muted">{f.label}</span></div>
                  <p className="font-semibold text-sm text-gray-800">{f.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs font-medium text-mangrove-muted mb-1">Catatan Lapangan</p>
              <p className="text-sm text-gray-800">Kondisi bibit mangrove baik. Tingkat kelangsungan hidup meningkat dibandingkan monitoring sebelumnya. Air pasang normal.</p>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}

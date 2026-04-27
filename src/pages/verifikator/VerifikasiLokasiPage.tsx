import {
  MapPin, Navigation, Compass, Camera, CheckCircle2, Clock,
  AlertCircle, Layers, Eye, Route
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import MangroveMap from '../../components/MangroveMap';
import menuItems from './verifikatorMenuItems';

const locations = [
  { name: 'Desa Timbulsloko', gps: '-6.8975, 110.6383', province: 'Jawa Tengah', area: '180 Ha', status: 'Perlu Verifikasi', badge: 'yellow' as const, lastVisit: '15 Mei 2024', distance: '12 km' },
  { name: 'Teluk Bintuni', gps: '-2.1234, 133.2345', province: 'Papua Barat', area: '450 Ha', status: 'Terverifikasi', badge: 'green' as const, lastVisit: '20 Mei 2024', distance: '2.400 km' },
  { name: 'TN Sembilang', gps: '-2.3456, 104.5678', province: 'Sumatera Selatan', area: '620 Ha', status: 'Perlu Verifikasi', badge: 'yellow' as const, lastVisit: '10 Mei 2024', distance: '890 km' },
  { name: 'Kecamatan Kwandang', gps: '0.5678, 122.3456', province: 'Gorontalo Utara', area: '150 Ha', status: 'Proses', badge: 'blue' as const, lastVisit: '18 Mei 2024', distance: '1.650 km' },
  { name: 'Segara Anakan', gps: '-7.6789, 108.8901', province: 'Jawa Tengah', area: '200 Ha', status: 'Terverifikasi', badge: 'green' as const, lastVisit: '22 Mei 2024', distance: '45 km' },
  { name: 'Nusa Lembongan', gps: '-8.6827, 115.4462', province: 'Bali', area: '85 Ha', status: 'Perlu Verifikasi', badge: 'yellow' as const, lastVisit: '8 Mei 2024', distance: '680 km' },
];

const recentVisits = [
  { loc: 'Segara Anakan', date: '22 Mei 2024', result: 'Sesuai', photos: 12, badge: 'green' as const },
  { loc: 'Teluk Bintuni', date: '20 Mei 2024', result: 'Sesuai', photos: 15, badge: 'green' as const },
  { loc: 'Kwandang', date: '18 Mei 2024', result: 'Perlu Perbaikan', photos: 8, badge: 'yellow' as const },
  { loc: 'Desa Timbulsloko', date: '15 Mei 2024', result: 'Sesuai', photos: 10, badge: 'green' as const },
];

export default function VerifikasiLokasiPage() {
  return (
    <DashboardLayout variant="verifikator" menuItems={menuItems} userName="Verifikator" userRole="Field Officer" placeholder="Cari lokasi...">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-mangrove-deep">Verifikasi Lokasi</h1>
        <p className="text-sm text-mangrove-muted mt-1">Peta dan daftar lokasi yang perlu diverifikasi di lapangan.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<MapPin className="w-5 h-5" />} label="Total Lokasi" value="6" />
        <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Terverifikasi" value="2" />
        <StatCard icon={<Clock className="w-5 h-5" />} label="Perlu Verifikasi" value="3" />
        <StatCard icon={<Navigation className="w-5 h-5" />} label="Dalam Proses" value="1" />
      </div>

      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="font-bold text-mangrove-deep">Peta Lokasi Verifikasi</h3>
          <div className="flex gap-2 flex-wrap">
            {['Semua', 'Perlu Verifikasi', 'Proses', 'Terverifikasi'].map((f) => (
              <button key={f} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-mangrove-muted hover:bg-mangrove-neon hover:text-mangrove-deep transition-all">
                {f}
              </button>
            ))}
          </div>
        </div>
        <MangroveMap
          className="h-64 sm:h-80"
          showControls
          pins={[
            { x: 28, y: 52, label: 'Demak' },
            { x: 75, y: 60, label: 'Papua' },
            { x: 22, y: 65, label: 'Sembilang' },
            { x: 50, y: 55, label: 'Gorontalo' },
            { x: 26, y: 58, label: 'Cilacap' },
            { x: 38, y: 62, label: 'Bali' },
          ]}
        />
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 space-y-4">
          <h3 className="font-bold text-mangrove-deep">Daftar Lokasi</h3>
          {locations.map((l) => (
            <Card key={l.name} className="!p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h4 className="font-semibold text-gray-800">{l.name}</h4>
                    <Badge variant={l.badge}>{l.status}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-mangrove-muted mt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{l.province}</span>
                    <span className="flex items-center gap-1"><Compass className="w-3 h-3" />{l.gps}</span>
                    <span className="flex items-center gap-1"><Layers className="w-3 h-3" />{l.area}</span>
                    <span className="flex items-center gap-1"><Route className="w-3 h-3" />{l.distance}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Kunjungan terakhir: {l.lastVisit}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /> Detail</Button>
                  <Button variant="neon" size="sm"><Navigation className="w-4 h-4" /> Navigasi</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-mangrove-fresh" /> Kunjungan Terakhir
            </h3>
            <div className="space-y-3">
              {recentVisits.map((v) => (
                <div key={v.loc} className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-800">{v.loc}</p>
                    <Badge variant={v.badge}>{v.result}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-mangrove-muted">
                    <span>{v.date}</span>
                    <span className="flex items-center gap-1"><Camera className="w-3 h-3" />{v.photos} foto</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" /> Prioritas Kunjungan
            </h3>
            <div className="space-y-3">
              {[
                { loc: 'TN Sembilang', reason: 'Verifikasi tertunda 14 hari', urgency: 'high' },
                { loc: 'Nusa Lembongan', reason: 'Belum pernah dikunjungi bulan ini', urgency: 'medium' },
                { loc: 'Desa Timbulsloko', reason: 'Survival rate perlu dicek ulang', urgency: 'medium' },
              ].map((p) => (
                <div key={p.loc} className={`p-3 rounded-xl border ${p.urgency === 'high' ? 'border-red-200 bg-red-50/50' : 'border-amber-200 bg-amber-50/50'}`}>
                  <p className="text-sm font-semibold text-gray-800">{p.loc}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{p.reason}</p>
                  <Button variant="ghost" size="sm" className={`mt-2 ${p.urgency === 'high' ? '!text-red-500' : '!text-amber-500'}`}>
                    <Navigation className="w-3 h-3" /> Navigasi
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

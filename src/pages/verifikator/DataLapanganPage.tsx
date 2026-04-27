import {
  Database, Camera, MapPin, Upload, Download, Search,
  Thermometer, Droplets, Ruler, TreePine, Eye, Plus, Filter
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import menuItems from './verifikatorMenuItems';

const fieldData = [
  { id: 'FLD-001', loc: 'Desa Timbulsloko', date: '24 Mei 2024', species: 'R. mucronata', bibit: 45200, height: '98 cm', survival: '72%', salinity: '22 ppt', photos: 8, status: 'Terkirim', badge: 'green' as const },
  { id: 'FLD-002', loc: 'Teluk Bintuni', date: '22 Mei 2024', species: 'A. marina', bibit: 62300, height: '125 cm', survival: '85%', salinity: '28 ppt', photos: 12, status: 'Terkirim', badge: 'green' as const },
  { id: 'FLD-003', loc: 'TN Sembilang', date: '20 Mei 2024', species: 'S. alba', bibit: 80500, height: '145 cm', survival: '88%', salinity: '19 ppt', photos: 15, status: 'Draft', badge: 'yellow' as const },
  { id: 'FLD-004', loc: 'Kwandang', date: '18 Mei 2024', species: 'B. gymnorrhiza', bibit: 37500, height: '82 cm', survival: '65%', salinity: '24 ppt', photos: 10, status: 'Terkirim', badge: 'green' as const },
  { id: 'FLD-005', loc: 'Segara Anakan', date: '15 Mei 2024', species: 'R. mucronata', bibit: 30000, height: '76 cm', survival: '58%', salinity: '20 ppt', photos: 6, status: 'Revisi', badge: 'blue' as const },
];

const photoGallery = [
  { loc: 'Desa Timbulsloko', date: '24 Mei 2024', count: 8, status: 'Terverifikasi', badge: 'green' as const },
  { loc: 'Teluk Bintuni', date: '22 Mei 2024', count: 12, status: 'Menunggu', badge: 'yellow' as const },
  { loc: 'TN Sembilang', date: '20 Mei 2024', count: 15, status: 'Terverifikasi', badge: 'green' as const },
  { loc: 'Kwandang', date: '18 Mei 2024', count: 10, status: 'Proses', badge: 'blue' as const },
];

export default function DataLapanganPage() {
  return (
    <DashboardLayout variant="verifikator" menuItems={menuItems} userName="Verifikator" userRole="Field Officer" placeholder="Cari data lapangan...">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-mangrove-deep">Data Lapangan</h1>
          <p className="text-sm text-mangrove-muted mt-1">Kelola data observasi dan bukti lapangan.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm"><Download className="w-4 h-4" /> Export</Button>
          <Button variant="neon" size="sm"><Plus className="w-4 h-4" /> Input Data Baru</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Database className="w-5 h-5" />} label="Total Data" value="5" delta="record" />
        <StatCard icon={<Camera className="w-5 h-5" />} label="Foto Lapangan" value="51" delta="foto" />
        <StatCard icon={<TreePine className="w-5 h-5" />} label="Bibit Tercatat" value="255.500" />
        <StatCard icon={<MapPin className="w-5 h-5" />} label="Lokasi Tercakup" value="5" />
      </div>

      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h3 className="font-bold text-mangrove-deep">Data Observasi Lapangan</h3>
          <div className="flex gap-2">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Cari data..." className="w-full sm:w-48 pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-mangrove-fresh" />
            </div>
            <Button variant="ghost" size="sm"><Filter className="w-4 h-4" /></Button>
          </div>
        </div>
        <Table headers={['ID', 'Lokasi', 'Tanggal', 'Spesies', 'Bibit', 'Tinggi', 'Survival', 'Salinitas', 'Foto', 'Status', 'Aksi']}>
          {fieldData.map((d) => (
            <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="py-3 px-2 text-xs font-mono text-mangrove-muted">{d.id}</td>
              <td className="py-3 px-2 font-medium text-gray-800 text-sm">{d.loc}</td>
              <td className="py-3 px-2 text-xs text-mangrove-muted">{d.date}</td>
              <td className="py-3 px-2 text-xs text-mangrove-muted italic">{d.species}</td>
              <td className="py-3 px-2 text-xs text-mangrove-muted">{d.bibit.toLocaleString()}</td>
              <td className="py-3 px-2 text-xs text-mangrove-muted">{d.height}</td>
              <td className="py-3 px-2 text-xs font-semibold text-mangrove-deep">{d.survival}</td>
              <td className="py-3 px-2 text-xs text-mangrove-muted">{d.salinity}</td>
              <td className="py-3 px-2 text-xs text-mangrove-muted flex items-center gap-1"><Camera className="w-3 h-3" />{d.photos}</td>
              <td className="py-3 px-2"><Badge variant={d.badge}>{d.status}</Badge></td>
              <td className="py-3 px-2">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="!px-2 !text-mangrove-fresh"><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" className="!px-2 !text-blue-500"><Upload className="w-4 h-4" /></Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5 text-mangrove-fresh" /> Galeri Foto Lapangan
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {photoGallery.map((p) => (
              <div key={p.loc} className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                <div className="h-32 bg-gradient-to-br from-mangrove-deep to-mangrove-teal flex items-center justify-center relative">
                  <Camera className="w-8 h-8 text-mangrove-neon/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute bottom-2 right-2 text-xs text-white bg-black/40 px-2 py-0.5 rounded">{p.count} foto</span>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm text-gray-800">{p.loc}</p>
                    <Badge variant={p.badge}>{p.status}</Badge>
                  </div>
                  <p className="text-xs text-mangrove-muted">{p.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-mangrove-fresh" /> Rata-rata Kondisi Lapangan
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Survival Rate Rata-rata', value: '73,6%', icon: <TreePine className="w-4 h-4" />, trend: 'Naik 2,1%' },
              { label: 'Tinggi Bibit Rata-rata', value: '105,2 cm', icon: <Ruler className="w-4 h-4" />, trend: 'Naik 8 cm' },
              { label: 'Salinitas Rata-rata', value: '22,6 ppt', icon: <Droplets className="w-4 h-4" />, trend: 'Stabil' },
              { label: 'Suhu Rata-rata', value: '28,5°C', icon: <Thermometer className="w-4 h-4" />, trend: 'Normal' },
            ].map((m) => (
              <div key={m.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="text-mangrove-fresh">{m.icon}</div>
                  <div>
                    <p className="text-sm text-mangrove-muted">{m.label}</p>
                    <p className="font-bold text-mangrove-deep">{m.value}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-mangrove-fresh">{m.trend}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button variant="neon" size="md" className="w-full">
              <Upload className="w-4 h-4" /> Upload Data Baru
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

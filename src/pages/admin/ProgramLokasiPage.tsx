import {
  MapPin, TreePine, Plus, Search, Eye, Edit, Trash2,
  Globe, Layers, TrendingUp, Calendar
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';
import Table from '../../components/ui/Table';
import MangroveMap from '../../components/MangroveMap';
import menuItems from './adminMenuItems';

const programs = [
  { id: 'PRG-001', name: 'Restorasi Teluk Bintuni', loc: 'Papua Barat', area: '450 Ha', bibit: '250.000', status: 'Aktif', badge: 'green' as const, progress: 75, started: 'Jan 2024' },
  { id: 'PRG-002', name: 'Desa Timbulsloko', loc: 'Demak, Jawa Tengah', area: '180 Ha', bibit: '180.000', status: 'Verifikasi', badge: 'yellow' as const, progress: 43, started: 'Feb 2024' },
  { id: 'PRG-003', name: 'TN Sembilang', loc: 'Sumatera Selatan', area: '620 Ha', bibit: '320.000', status: 'Aktif', badge: 'green' as const, progress: 80, started: 'Mar 2024' },
  { id: 'PRG-004', name: 'Kecamatan Kwandang', loc: 'Gorontalo Utara', area: '150 Ha', bibit: '150.000', status: 'Aktif', badge: 'green' as const, progress: 40, started: 'Apr 2024' },
  { id: 'PRG-005', name: 'Teluk Balikpapan', loc: 'Kalimantan Timur', area: '280 Ha', bibit: '95.000', status: 'Monitoring', badge: 'blue' as const, progress: 62, started: 'Jan 2024' },
  { id: 'PRG-006', name: 'Segara Anakan', loc: 'Cilacap, Jawa Tengah', area: '200 Ha', bibit: '120.000', status: 'Restorasi', badge: 'neon' as const, progress: 58, started: 'Mar 2024' },
];

const locations = [
  { province: 'Papua Barat', programs: 2, area: '730 Ha', bibit: '345.000' },
  { province: 'Jawa Tengah', programs: 3, area: '380 Ha', bibit: '300.000' },
  { province: 'Sumatera Selatan', programs: 1, area: '620 Ha', bibit: '320.000' },
  { province: 'Kalimantan Timur', programs: 1, area: '280 Ha', bibit: '95.000' },
  { province: 'Gorontalo Utara', programs: 1, area: '150 Ha', bibit: '150.000' },
];

export default function ProgramLokasiPage() {
  return (
    <DashboardLayout variant="admin" menuItems={menuItems} userName="Admin ID-MAP" userRole="Administrator" placeholder="Cari program...">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-mangrove-deep">Program & Lokasi</h1>
          <p className="text-sm text-mangrove-muted mt-1">Kelola program restorasi dan lokasi penanaman.</p>
        </div>
        <Button variant="neon" size="md"><Plus className="w-4 h-4" /> Tambah Program</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Layers className="w-5 h-5" />} label="Total Program" value="8" delta="+2 bulan ini" />
        <StatCard icon={<Globe className="w-5 h-5" />} label="Provinsi Aktif" value="5" />
        <StatCard icon={<TreePine className="w-5 h-5" />} label="Total Area" value="2.160 Ha" delta="+180 Ha" />
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Rata-rata Progress" value="59,7%" delta="+4,2%" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <Card className="xl:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h3 className="font-bold text-mangrove-deep">Peta Lokasi Program</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Cari lokasi..." className="pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-mangrove-fresh w-full sm:w-48" />
            </div>
          </div>
          <MangroveMap className="h-64 sm:h-80" showControls />
        </Card>

        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4">Lokasi per Provinsi</h3>
          <div className="space-y-4">
            {locations.map((l) => (
              <div key={l.province} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-gray-800">{l.province}</p>
                  <Badge variant="green">{l.programs} program</Badge>
                </div>
                <div className="flex gap-4 text-xs text-mangrove-muted mt-1">
                  <span>{l.area}</span>
                  <span>{l.bibit} bibit</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h3 className="font-bold text-mangrove-deep">Daftar Program</h3>
          <div className="flex gap-2 flex-wrap">
            {['Semua', 'Aktif', 'Verifikasi', 'Monitoring'].map((f) => (
              <button key={f} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-mangrove-muted hover:bg-mangrove-neon hover:text-mangrove-deep transition-all">
                {f}
              </button>
            ))}
          </div>
        </div>
        <Table headers={['ID', 'Program', 'Lokasi', 'Area', 'Bibit', 'Status', 'Progress', 'Mulai', 'Aksi']}>
          {programs.map((p) => (
            <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="py-3 px-3 text-xs font-mono text-mangrove-muted">{p.id}</td>
              <td className="py-3 px-3 font-medium text-gray-800 text-sm">{p.name}</td>
              <td className="py-3 px-3 text-sm text-mangrove-muted flex items-center gap-1"><MapPin className="w-3 h-3" />{p.loc}</td>
              <td className="py-3 px-3 text-sm text-mangrove-muted">{p.area}</td>
              <td className="py-3 px-3 text-sm text-mangrove-muted">{p.bibit}</td>
              <td className="py-3 px-3"><Badge variant={p.badge}>{p.status}</Badge></td>
              <td className="py-3 px-3 w-32"><ProgressBar value={p.progress} /></td>
              <td className="py-3 px-3 text-xs text-mangrove-muted flex items-center gap-1"><Calendar className="w-3 h-3" />{p.started}</td>
              <td className="py-3 px-3">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="!px-2 !text-mangrove-fresh"><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" className="!px-2 !text-blue-500"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" className="!px-2 !text-red-400"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </DashboardLayout>
  );
}

import {
  TreePine, Sprout, Droplets, Wind, Thermometer, Ruler,
  Search, Download, Plus, Eye, TrendingUp, Leaf
} from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';
import Table from '../../components/ui/Table';
import MangroveMap from '../../components/MangroveMap';
import menuItems from './adminMenuItems';

const fallbackSpecies = [
  { name: 'Rhizophora mucronata', local: 'Bakau', count: '452.300', area: '890 Ha', survival: 85, status: 'Dominan', badge: 'green' as const },
  { name: 'Avicennia marina', local: 'Api-api', count: '328.100', area: '520 Ha', survival: 78, status: 'Stabil', badge: 'green' as const },
  { name: 'Sonneratia alba', local: 'Pedada', count: '215.400', area: '340 Ha', survival: 72, status: 'Berkembang', badge: 'blue' as const },
  { name: 'Bruguiera gymnorrhiza', local: 'Lindur', count: '189.960', area: '280 Ha', survival: 68, status: 'Stabil', badge: 'green' as const },
  { name: 'Ceriops tagal', local: 'Tengar', count: '100.000', area: '130 Ha', survival: 82, status: 'Baru', badge: 'yellow' as const },
];

const fallbackGrowth = [
  { loc: 'Teluk Bintuni', species: 'R. mucronata', height: '125 cm', diameter: '4,2 cm', age: '18 bulan', health: 'Baik', badge: 'green' as const },
  { loc: 'Desa Timbulsloko', species: 'A. marina', height: '98 cm', diameter: '3,1 cm', age: '12 bulan', health: 'Cukup', badge: 'yellow' as const },
  { loc: 'TN Sembilang', species: 'S. alba', height: '145 cm', diameter: '5,0 cm', age: '24 bulan', health: 'Baik', badge: 'green' as const },
  { loc: 'Kwandang', species: 'B. gymnorrhiza', height: '82 cm', diameter: '2,8 cm', age: '10 bulan', health: 'Baik', badge: 'green' as const },
];

const envMetrics = [
  { label: 'Suhu Rata-rata', value: '28,5°C', icon: <Thermometer className="w-4 h-4" />, change: '+0,2°C' },
  { label: 'Salinitas', value: '22 ppt', icon: <Droplets className="w-4 h-4" />, change: '-0,5 ppt' },
  { label: 'Ketinggian Pasang', value: '1,8 m', icon: <Ruler className="w-4 h-4" />, change: 'Normal' },
  { label: 'Kecepatan Angin', value: '12 km/h', icon: <Wind className="w-4 h-4" />, change: 'Tenang' },
];

function speciesStatusBadge(s: string): 'green' | 'blue' | 'yellow' {
  if (s === 'Dominan' || s === 'Stabil') return 'green';
  if (s === 'Berkembang') return 'blue';
  return 'yellow';
}

function healthBadge(h: string): 'green' | 'yellow' {
  return h === 'Baik' ? 'green' : 'yellow';
}

export default function DataMangrovePage() {
  const convexSpecies = useQuery(api.mangrove.listSpecies);
  const convexGrowth = useQuery(api.mangrove.listGrowthRecords);

  const speciesData = convexSpecies
    ? convexSpecies.map((s) => ({
        name: s.name, local: s.localName, count: s.count, area: s.area,
        survival: s.survivalRate, status: s.status, badge: speciesStatusBadge(s.status),
      }))
    : fallbackSpecies;

  const growthRecords = convexGrowth
    ? convexGrowth.map((g) => ({
        loc: g.location, species: g.species, height: g.height,
        diameter: g.diameter, age: g.age, health: g.health, badge: healthBadge(g.health),
      }))
    : fallbackGrowth;
  return (
    <DashboardLayout variant="admin" menuItems={menuItems} userName="Admin ID-MAP" userRole="Administrator" placeholder="Cari data mangrove...">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-mangrove-deep">Data Mangrove</h1>
          <p className="text-sm text-mangrove-muted mt-1">Database ekosistem mangrove dan pertumbuhan bibit.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm"><Download className="w-4 h-4" /> Export</Button>
          <Button variant="neon" size="sm"><Plus className="w-4 h-4" /> Input Data</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<TreePine className="w-5 h-5" />} label="Total Bibit" value="1.285.760" delta="+15,2%" />
        <StatCard icon={<Sprout className="w-5 h-5" />} label="Spesies Tercatat" value="5" delta="+1 baru" />
        <StatCard icon={<Leaf className="w-5 h-5" />} label="Survival Rate" value="78,4%" delta="+2,1%" />
        <StatCard icon={<Wind className="w-5 h-5" />} label="Serapan Karbon" value="823.456 ton" delta="+10,1%" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <Card className="xl:col-span-2">
          <h3 className="font-bold text-mangrove-deep mb-4">Distribusi Mangrove</h3>
          <MangroveMap className="h-64 sm:h-72" showControls />
        </Card>

        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-mangrove-fresh" /> Kondisi Lingkungan
          </h3>
          <div className="space-y-4">
            {envMetrics.map((m) => (
              <div key={m.label} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 text-mangrove-fresh mb-1">{m.icon}<span className="text-xs text-mangrove-muted">{m.label}</span></div>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-lg text-mangrove-deep">{m.value}</p>
                  <span className="text-xs text-mangrove-fresh font-medium">{m.change}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h3 className="font-bold text-mangrove-deep">Database Spesies</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Cari spesies..." className="pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-mangrove-fresh w-full sm:w-48" />
          </div>
        </div>
        <Table headers={['Nama Ilmiah', 'Nama Lokal', 'Jumlah Bibit', 'Area', 'Survival Rate', 'Status', 'Aksi']}>
          {speciesData.map((s) => (
            <tr key={s.name} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="py-3 px-3 font-medium text-gray-800 text-sm italic">{s.name}</td>
              <td className="py-3 px-3 text-sm text-mangrove-muted">{s.local}</td>
              <td className="py-3 px-3 text-sm font-semibold text-mangrove-deep">{s.count}</td>
              <td className="py-3 px-3 text-sm text-mangrove-muted">{s.area}</td>
              <td className="py-3 px-3 w-32"><ProgressBar value={s.survival} /></td>
              <td className="py-3 px-3"><Badge variant={s.badge}>{s.status}</Badge></td>
              <td className="py-3 px-3"><Button variant="ghost" size="sm" className="!px-2 !text-mangrove-fresh"><Eye className="w-4 h-4" /></Button></td>
            </tr>
          ))}
        </Table>
      </Card>

      <Card>
        <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-mangrove-fresh" /> Catatan Pertumbuhan Terbaru
        </h3>
        <Table headers={['Lokasi', 'Spesies', 'Tinggi', 'Diameter', 'Umur', 'Kondisi', 'Aksi']}>
          {growthRecords.map((g, i) => (
            <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="py-3 px-3 font-medium text-gray-800 text-sm">{g.loc}</td>
              <td className="py-3 px-3 text-sm text-mangrove-muted italic">{g.species}</td>
              <td className="py-3 px-3 text-sm text-mangrove-muted">{g.height}</td>
              <td className="py-3 px-3 text-sm text-mangrove-muted">{g.diameter}</td>
              <td className="py-3 px-3 text-sm text-mangrove-muted">{g.age}</td>
              <td className="py-3 px-3"><Badge variant={g.badge}>{g.health}</Badge></td>
              <td className="py-3 px-3"><Button variant="ghost" size="sm" className="!px-2 !text-mangrove-fresh"><Eye className="w-4 h-4" /></Button></td>
            </tr>
          ))}
        </Table>
      </Card>
    </DashboardLayout>
  );
}

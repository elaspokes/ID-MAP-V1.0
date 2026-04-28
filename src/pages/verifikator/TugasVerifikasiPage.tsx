import {
  ClipboardCheck, CheckCircle2, Clock, XCircle, AlertCircle,
  Eye, Play, MapPin, Camera, Calendar, Filter, ChevronRight
} from 'lucide-react';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import menuItems from './verifikatorMenuItems';

const fallbackTasks = [
  { id: 'VRF-0405-001', project: 'Desa Timbulsloko', loc: 'Demak, Jawa Tengah', type: 'Penanaman', bibit: '180.000', gps: '-6.8975, 110.6383', photos: 8, survivalRate: '72%', status: 'Menunggu', badge: 'yellow' as const, priority: 'Tinggi', deadline: '26 Mei 2024' },
  { id: 'VRF-0405-002', project: 'Teluk Bintuni', loc: 'Papua Barat', type: 'Monitoring', bibit: '250.000', gps: '-2.1234, 133.2345', photos: 12, survivalRate: '85%', status: 'Proses', badge: 'blue' as const, priority: 'Sedang', deadline: '28 Mei 2024' },
  { id: 'VRF-0405-003', project: 'TN Sembilang', loc: 'Sumatera Selatan', type: 'Penanaman', bibit: '320.000', gps: '-2.3456, 104.5678', photos: 6, survivalRate: '88%', status: 'Menunggu', badge: 'yellow' as const, priority: 'Tinggi', deadline: '25 Mei 2024' },
  { id: 'VRF-0405-004', project: 'Kecamatan Kwandang', loc: 'Gorontalo Utara', type: 'Survival Rate', bibit: '150.000', gps: '0.5678, 122.3456', photos: 10, survivalRate: '65%', status: 'Menunggu', badge: 'yellow' as const, priority: 'Rendah', deadline: '30 Mei 2024' },
  { id: 'VRF-0405-005', project: 'Segara Anakan', loc: 'Cilacap, Jawa Tengah', type: 'Monitoring', bibit: '120.000', gps: '-7.6789, 108.8901', photos: 4, survivalRate: '58%', status: 'Selesai', badge: 'green' as const, priority: 'Sedang', deadline: '22 Mei 2024' },
  { id: 'VRF-0405-006', project: 'Nusa Lembongan', loc: 'Bali', type: 'Penanaman', bibit: '75.000', gps: '-8.6827, 115.4462', photos: 7, survivalRate: '78%', status: 'Menunggu', badge: 'yellow' as const, priority: 'Sedang', deadline: '29 Mei 2024' },
];

const upcomingTasks = [
  { project: 'Pulau Rupat', loc: 'Riau', type: 'Verifikasi Penanaman', deadline: '2 Jun 2024', priority: 'Tinggi' },
  { project: 'Teluk Balikpapan', loc: 'Kalimantan Timur', type: 'Monitoring Lanjutan', deadline: '5 Jun 2024', priority: 'Sedang' },
  { project: 'Desa Timbulsloko', loc: 'Demak', type: 'Re-verifikasi', deadline: '8 Jun 2024', priority: 'Rendah' },
];

function taskStatusBadge(s: string): 'green' | 'yellow' | 'blue' | 'red' {
  if (s === 'menunggu') return 'yellow';
  if (s === 'proses') return 'blue';
  if (s === 'ditolak') return 'red';
  return 'green';
}

export default function TugasVerifikasiPage() {
  const convexValidations = useQuery(api.validations.list);
  const tasks = convexValidations
    ? convexValidations.map((v) => ({
        id: v.validationId, project: v.project, loc: v.gps,
        type: v.type, bibit: '0', gps: v.gps, photos: v.photos,
        survivalRate: v.survivalRate,
        status: v.status.charAt(0).toUpperCase() + v.status.slice(1),
        badge: taskStatusBadge(v.status),
        priority: 'Sedang', deadline: v.submitted,
      }))
    : fallbackTasks;

  return (
    <DashboardLayout variant="verifikator" menuItems={menuItems} userName="Verifikator" userRole="Field Officer" placeholder="Cari tugas...">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-mangrove-deep">Tugas Verifikasi</h1>
        <p className="text-sm text-mangrove-muted mt-1">Daftar tugas verifikasi lapangan yang ditugaskan.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<ClipboardCheck className="w-5 h-5" />} label="Total Tugas" value="6" />
        <StatCard icon={<Clock className="w-5 h-5" />} label="Menunggu" value="4" />
        <StatCard icon={<Play className="w-5 h-5" />} label="Sedang Proses" value="1" />
        <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Selesai" value="1" />
      </div>

      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h3 className="font-bold text-mangrove-deep">Daftar Tugas</h3>
          <div className="flex gap-2 flex-wrap">
            <Button variant="ghost" size="sm"><Filter className="w-4 h-4" /> Filter</Button>
            {['Semua', 'Menunggu', 'Proses', 'Selesai'].map((f) => (
              <button key={f} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-mangrove-muted hover:bg-mangrove-neon hover:text-mangrove-deep transition-all">
                {f}
              </button>
            ))}
          </div>
        </div>
        <Table headers={['ID', 'Proyek', 'Lokasi', 'Tipe', 'Bibit', 'Foto', 'Survival', 'Status', 'Prioritas', 'Deadline', 'Aksi']}>
          {tasks.map((t) => (
            <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="py-3 px-2 text-xs font-mono text-mangrove-muted">{t.id}</td>
              <td className="py-3 px-2 font-medium text-gray-800 text-sm">{t.project}</td>
              <td className="py-3 px-2 text-xs text-mangrove-muted">{t.loc}</td>
              <td className="py-3 px-2 text-xs text-mangrove-muted">{t.type}</td>
              <td className="py-3 px-2 text-xs text-mangrove-muted">{t.bibit}</td>
              <td className="py-3 px-2 text-xs text-mangrove-muted flex items-center gap-1"><Camera className="w-3 h-3" />{t.photos}</td>
              <td className="py-3 px-2 text-xs font-semibold text-mangrove-deep">{t.survivalRate}</td>
              <td className="py-3 px-2"><Badge variant={t.badge}>{t.status}</Badge></td>
              <td className="py-3 px-2">
                <span className={`text-xs font-semibold ${t.priority === 'Tinggi' ? 'text-red-500' : t.priority === 'Sedang' ? 'text-amber-500' : 'text-gray-400'}`}>
                  {t.priority}
                </span>
              </td>
              <td className="py-3 px-2 text-xs text-mangrove-muted">{t.deadline}</td>
              <td className="py-3 px-2">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="!text-mangrove-fresh !px-2"><Eye className="w-4 h-4" /></Button>
                  {t.status !== 'Selesai' && <Button variant="neon" size="sm"><Play className="w-3 h-3" /></Button>}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-mangrove-fresh" /> Tugas Mendatang
          </h3>
          <div className="space-y-3">
            {upcomingTasks.map((t) => (
              <div key={t.project} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{t.project}</p>
                    <p className="text-xs text-mangrove-muted flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" />{t.loc}</p>
                  </div>
                  <span className={`text-xs font-semibold ${t.priority === 'Tinggi' ? 'text-red-500' : t.priority === 'Sedang' ? 'text-amber-500' : 'text-gray-400'}`}>
                    {t.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-mangrove-muted">{t.type} &middot; {t.deadline}</p>
                  <Button variant="ghost" size="sm" className="!text-mangrove-fresh"><ChevronRight className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" /> Perhatian
          </h3>
          <div className="space-y-3">
            {[
              { text: 'VRF-0405-003 deadline besok — prioritas tinggi', urgency: 'high' },
              { text: 'VRF-0405-001 foto lapangan belum lengkap (8 foto)', urgency: 'medium' },
              { text: 'VRF-0405-004 survival rate rendah — perlu observasi ulang', urgency: 'medium' },
            ].map((a, i) => (
              <div key={i} className={`p-3 rounded-xl border ${a.urgency === 'high' ? 'border-red-200 bg-red-50/50' : 'border-amber-200 bg-amber-50/50'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <XCircle className={`w-4 h-4 ${a.urgency === 'high' ? 'text-red-500' : 'text-amber-500'}`} />
                  <p className="text-sm text-gray-800">{a.text}</p>
                </div>
                <Button variant="ghost" size="sm" className={`mt-1 ${a.urgency === 'high' ? '!text-red-500' : '!text-amber-500'}`}>Tinjau</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

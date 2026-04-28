import {
  ClipboardCheck, CheckCircle2, XCircle, AlertCircle,
  MapPin, Camera, Activity, Shield
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
import menuItems from './adminMenuItems';

const fallbackValidations = [
  { id: 'VAL-001', project: 'Desa Timbulsloko', type: 'Penanaman', officer: 'Bambang S.', submitted: '24 Mei 2024', photos: 8, gps: '-6.8975, 110.6383', survival: '72%', status: 'Menunggu', badge: 'yellow' as const },
  { id: 'VAL-002', project: 'Segara Anakan', type: 'Monitoring', officer: 'Sari W.', submitted: '22 Mei 2024', photos: 12, gps: '-7.6789, 108.8901', survival: '58%', status: 'Menunggu', badge: 'yellow' as const },
  { id: 'VAL-003', project: 'Teluk Bintuni', type: 'Survival Rate', officer: 'Dedi M.', submitted: '20 Mei 2024', photos: 6, gps: '-2.1234, 133.2345', survival: '85%', status: 'Proses', badge: 'blue' as const },
  { id: 'VAL-004', project: 'Kwandang', type: 'Penanaman', officer: 'Rina A.', submitted: '18 Mei 2024', photos: 10, gps: '0.5678, 122.3456', survival: '65%', status: 'Proses', badge: 'blue' as const },
  { id: 'VAL-005', project: 'TN Sembilang', type: 'Monitoring', officer: 'Ahmad F.', submitted: '16 Mei 2024', photos: 15, gps: '-2.3456, 104.5678', survival: '88%', status: 'Selesai', badge: 'green' as const },
];

const fallbackAlerts = [
  { project: 'Desa Timbulsloko', alert: 'Survival rate turun 8% dalam 2 minggu', severity: 'high', date: '24 Mei 2024' },
  { project: 'Segara Anakan', alert: 'Verifikasi lapangan tertunda 7 hari', severity: 'high', date: '23 Mei 2024' },
  { project: 'Kwandang', alert: 'Foto bukti belum lengkap (3/6)', severity: 'medium', date: '22 Mei 2024' },
  { project: 'Teluk Balikpapan', alert: 'Salinitas di atas ambang batas', severity: 'medium', date: '21 Mei 2024' },
];

const performanceData = [
  { loc: 'Papua Barat', verified: 12, pending: 1, rejected: 0, score: 98 },
  { loc: 'Sumatera Selatan', verified: 10, pending: 2, rejected: 1, score: 88 },
  { loc: 'Kalimantan Timur', verified: 8, pending: 3, rejected: 0, score: 78 },
  { loc: 'Jawa Tengah', verified: 6, pending: 4, rejected: 2, score: 65 },
  { loc: 'Gorontalo Utara', verified: 4, pending: 2, rejected: 1, score: 60 },
];

function valStatusBadge(s: string): 'green' | 'yellow' | 'blue' {
  if (s === 'menunggu') return 'yellow';
  if (s === 'proses') return 'blue';
  return 'green';
}

export default function MonitoringValidasiPage() {
  const convexValidations = useQuery(api.validations.list);
  const convexAlerts = useQuery(api.validations.listAlerts);

  const validationQueue = convexValidations
    ? convexValidations.map((v) => ({
        id: v.validationId, project: v.project, type: v.type,
        officer: v.officer, submitted: v.submitted, photos: v.photos,
        gps: v.gps, survival: v.survivalRate,
        status: v.status.charAt(0).toUpperCase() + v.status.slice(1),
        badge: valStatusBadge(v.status),
      }))
    : fallbackValidations;

  const monitoringAlerts = convexAlerts ?? fallbackAlerts;

  return (
    <DashboardLayout variant="admin" menuItems={menuItems} userName="Admin ID-MAP" userRole="Administrator" placeholder="Cari monitoring...">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-mangrove-deep">Monitoring & Validasi</h1>
        <p className="text-sm text-mangrove-muted mt-1">Pantau dan validasi data verifikasi lapangan.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<ClipboardCheck className="w-5 h-5" />} label="Antrian Validasi" value="6" />
        <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Divalidasi (Bulan Ini)" value="42" delta="+18" />
        <StatCard icon={<XCircle className="w-5 h-5" />} label="Ditolak" value="4" />
        <StatCard icon={<Activity className="w-5 h-5" />} label="Akurasi Data" value="94,2%" delta="+1,5%" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <Card className="xl:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h3 className="font-bold text-mangrove-deep">Antrian Validasi</h3>
            <div className="flex gap-2 flex-wrap">
              {['Semua', 'Menunggu', 'Proses', 'Selesai'].map((f) => (
                <button key={f} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-mangrove-muted hover:bg-mangrove-neon hover:text-mangrove-deep transition-all">
                  {f}
                </button>
              ))}
            </div>
          </div>
          <Table headers={['ID', 'Proyek', 'Tipe', 'Petugas', 'Submit', 'Foto', 'Survival', 'Status', 'Aksi']}>
            {validationQueue.map((v) => (
              <tr key={v.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-2 text-xs font-mono text-mangrove-muted">{v.id}</td>
                <td className="py-3 px-2 font-medium text-gray-800 text-sm">{v.project}</td>
                <td className="py-3 px-2 text-xs text-mangrove-muted">{v.type}</td>
                <td className="py-3 px-2 text-sm text-gray-800">{v.officer}</td>
                <td className="py-3 px-2 text-xs text-mangrove-muted">{v.submitted}</td>
                <td className="py-3 px-2 text-xs text-mangrove-muted flex items-center gap-1"><Camera className="w-3 h-3" />{v.photos}</td>
                <td className="py-3 px-2 text-xs font-semibold text-mangrove-deep">{v.survival}</td>
                <td className="py-3 px-2"><Badge variant={v.badge}>{v.status}</Badge></td>
                <td className="py-3 px-2">
                  <div className="flex gap-1">
                    <Button variant="neon" size="sm">Validasi</Button>
                    <Button variant="ghost" size="sm" className="!text-red-500 !px-2"><XCircle className="w-4 h-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </Card>

        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" /> Alert Monitoring
          </h3>
          <div className="space-y-3">
            {monitoringAlerts.map((a, i) => (
              <div key={i} className={`p-3 rounded-xl border ${a.severity === 'high' ? 'border-red-200 bg-red-50/50' : 'border-amber-200 bg-amber-50/50'}`}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-gray-800">{a.project}</p>
                  <Badge variant={a.severity === 'high' ? 'red' : 'yellow'}>{a.severity === 'high' ? 'Kritis' : 'Perhatian'}</Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{a.alert}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-mangrove-muted">{a.date}</span>
                  <Button variant="ghost" size="sm" className={a.severity === 'high' ? '!text-red-500' : '!text-amber-500'}>Tinjau</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-mangrove-fresh" /> Kinerja Validasi per Lokasi
        </h3>
        <Table headers={['Lokasi', 'Terverifikasi', 'Pending', 'Ditolak', 'Skor Kinerja', 'Progress']}>
          {performanceData.map((p) => (
            <tr key={p.loc} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="py-3 px-4 font-medium text-gray-800 text-sm flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-mangrove-fresh" />{p.loc}</td>
              <td className="py-3 px-4 text-sm font-semibold text-mangrove-fresh">{p.verified}</td>
              <td className="py-3 px-4 text-sm text-amber-500 font-semibold">{p.pending}</td>
              <td className="py-3 px-4 text-sm text-red-500 font-semibold">{p.rejected}</td>
              <td className="py-3 px-4 text-sm font-bold text-mangrove-deep">{p.score}%</td>
              <td className="py-3 px-4 w-32"><ProgressBar value={p.score} /></td>
            </tr>
          ))}
        </Table>
      </Card>
    </DashboardLayout>
  );
}

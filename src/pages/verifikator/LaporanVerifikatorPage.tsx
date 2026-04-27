import {
  FileText, Download, Calendar, Filter, Eye, Printer,
  CheckCircle2, Clock, BarChart3, TrendingUp, Send, Plus
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import ProgressBar from '../../components/ui/ProgressBar';
import menuItems from './verifikatorMenuItems';

const reports = [
  { id: 'RPT-001', title: 'Laporan Verifikasi — Desa Timbulsloko', type: 'Verifikasi Penanaman', date: '24 Mei 2024', status: 'Terkirim', badge: 'green' as const, result: 'Sesuai' },
  { id: 'RPT-002', title: 'Laporan Monitoring — Teluk Bintuni', type: 'Monitoring Berkala', date: '22 Mei 2024', status: 'Terkirim', badge: 'green' as const, result: 'Sesuai' },
  { id: 'RPT-003', title: 'Laporan Verifikasi — TN Sembilang', type: 'Verifikasi Penanaman', date: '20 Mei 2024', status: 'Draft', badge: 'yellow' as const, result: '-' },
  { id: 'RPT-004', title: 'Laporan Survival Rate — Kwandang', type: 'Survival Rate', date: '18 Mei 2024', status: 'Terkirim', badge: 'green' as const, result: 'Perlu Perbaikan' },
  { id: 'RPT-005', title: 'Laporan Verifikasi — Segara Anakan', type: 'Verifikasi Monitoring', date: '15 Mei 2024', status: 'Ditolak', badge: 'red' as const, result: 'Tidak Sesuai' },
  { id: 'RPT-006', title: 'Laporan Monitoring — Nusa Lembongan', type: 'Monitoring Berkala', date: '12 Mei 2024', status: 'Terkirim', badge: 'green' as const, result: 'Sesuai' },
];

const monthlyStats = [
  { month: 'Mei 2024', sent: 6, approved: 4, rejected: 1, pending: 1 },
  { month: 'Apr 2024', sent: 8, approved: 7, rejected: 0, pending: 1 },
  { month: 'Mar 2024', sent: 5, approved: 5, rejected: 0, pending: 0 },
  { month: 'Feb 2024', sent: 7, approved: 6, rejected: 1, pending: 0 },
];

export default function LaporanVerifikatorPage() {
  return (
    <DashboardLayout variant="verifikator" menuItems={menuItems} userName="Verifikator" userRole="Field Officer" placeholder="Cari laporan...">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-mangrove-deep">Laporan</h1>
          <p className="text-sm text-mangrove-muted mt-1">Kelola laporan verifikasi lapangan.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm"><Calendar className="w-4 h-4" /> Periode</Button>
          <Button variant="neon" size="sm"><Plus className="w-4 h-4" /> Buat Laporan</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<FileText className="w-5 h-5" />} label="Total Laporan" value="26" />
        <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Disetujui" value="22" delta="84,6%" />
        <StatCard icon={<Clock className="w-5 h-5" />} label="Draft / Pending" value="2" />
        <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Tingkat Persetujuan" value="91,7%" delta="+3,2%" />
      </div>

      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h3 className="font-bold text-mangrove-deep">Daftar Laporan</h3>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm"><Filter className="w-4 h-4" /> Filter</Button>
            <Button variant="ghost" size="sm"><Download className="w-4 h-4" /> Export</Button>
          </div>
        </div>
        <Table headers={['ID', 'Judul', 'Tipe', 'Tanggal', 'Hasil', 'Status', 'Aksi']}>
          {reports.map((r) => (
            <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="py-3 px-3 text-xs font-mono text-mangrove-muted">{r.id}</td>
              <td className="py-3 px-3 font-medium text-gray-800 text-sm">{r.title}</td>
              <td className="py-3 px-3 text-xs text-mangrove-muted">{r.type}</td>
              <td className="py-3 px-3 text-xs text-mangrove-muted">{r.date}</td>
              <td className="py-3 px-3 text-xs font-medium text-mangrove-deep">{r.result}</td>
              <td className="py-3 px-3"><Badge variant={r.badge}>{r.status}</Badge></td>
              <td className="py-3 px-3">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="!px-2 !text-mangrove-fresh"><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" className="!px-2"><Download className="w-4 h-4" /></Button>
                  {r.status === 'Draft' && <Button variant="ghost" size="sm" className="!px-2 !text-blue-500"><Send className="w-4 h-4" /></Button>}
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-mangrove-fresh" /> Statistik Bulanan
          </h3>
          <div className="space-y-4">
            {monthlyStats.map((m) => (
              <div key={m.month} className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-semibold text-gray-800">{m.month}</p>
                  <span className="text-xs text-mangrove-muted">{m.sent} laporan</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-xs text-mangrove-muted">Disetujui</p>
                    <p className="font-bold text-mangrove-fresh">{m.approved}</p>
                  </div>
                  <div>
                    <p className="text-xs text-mangrove-muted">Ditolak</p>
                    <p className="font-bold text-red-500">{m.rejected}</p>
                  </div>
                  <div>
                    <p className="text-xs text-mangrove-muted">Pending</p>
                    <p className="font-bold text-amber-500">{m.pending}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <ProgressBar value={Math.round((m.approved / m.sent) * 100)} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-mangrove-fresh" /> Kinerja Saya
          </h3>
          <div className="space-y-4 mb-6">
            {[
              { label: 'Rata-rata waktu pengiriman', value: '2,1 hari', trend: '-0,3 hari' },
              { label: 'Tingkat akurasi data', value: '96,4%', trend: '+1,2%' },
              { label: 'Kelengkapan foto', value: '94,8%', trend: '+2,5%' },
              { label: 'Compliance checklist', value: '92,1%', trend: '+4,0%' },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between py-2 border-b border-gray-50">
                <span className="text-sm text-mangrove-muted">{s.label}</span>
                <div className="text-right">
                  <span className="text-sm font-bold text-mangrove-deep">{s.value}</span>
                  <span className="text-xs text-mangrove-fresh ml-2">{s.trend}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-mangrove-deep rounded-xl text-center">
            <p className="text-xs text-gray-400 mb-1">Peringkat Verifikator</p>
            <p className="text-3xl font-bold text-mangrove-neon">#3</p>
            <p className="text-xs text-gray-400 mt-1">dari 156 verifikator</p>
          </div>

          <div className="mt-4 flex gap-2">
            <Button variant="neon" size="md" className="flex-1"><Printer className="w-4 h-4" /> Cetak Ringkasan</Button>
            <Button variant="outline" size="md" className="flex-1 !border-mangrove-deep !text-mangrove-deep"><Download className="w-4 h-4" /> Download PDF</Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

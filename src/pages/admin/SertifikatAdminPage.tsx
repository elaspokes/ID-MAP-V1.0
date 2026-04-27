import {
  Award, Download, Plus, Search, Eye, Send,
  CheckCircle2, Clock, FileText, Users, Printer, Calendar
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import menuItems from './adminMenuItems';

const certificates = [
  { id: 'CERT-001', recipient: 'Andi Pratama', program: 'Restorasi Teluk Bintuni', type: 'Sertifikat Kontributor', bibit: 10, carbon: '5,2 ton', issued: '10 Mei 2024', status: 'Diterbitkan', badge: 'green' as const },
  { id: 'CERT-002', recipient: 'PT Hijau Lestari', program: 'TN Sembilang', type: 'Sertifikat CSR', bibit: 500, carbon: '260 ton', issued: '8 Mei 2024', status: 'Diterbitkan', badge: 'green' as const },
  { id: 'CERT-003', recipient: 'Rudi Hermawan', program: 'Desa Timbulsloko', type: 'Sertifikat Kontributor', bibit: 25, carbon: '13 ton', issued: '5 Mei 2024', status: 'Diterbitkan', badge: 'green' as const },
  { id: 'CERT-004', recipient: 'Komunitas Peduli Mangrove', program: 'Kwandang', type: 'Sertifikat Komunitas', bibit: 200, carbon: '104 ton', issued: '-', status: 'Draft', badge: 'yellow' as const },
  { id: 'CERT-005', recipient: 'Dewi Lestari', program: 'Segara Anakan', type: 'Sertifikat Kontributor', bibit: 7, carbon: '3,6 ton', issued: '-', status: 'Menunggu', badge: 'blue' as const },
  { id: 'CERT-006', recipient: 'CV Mangrove Sejati', program: 'Teluk Balikpapan', type: 'Sertifikat CSR', bibit: 350, carbon: '182 ton', issued: '1 Mei 2024', status: 'Diterbitkan', badge: 'green' as const },
];

const templates = [
  { name: 'Sertifikat Kontributor', desc: 'Untuk donor individu dengan kontribusi minimal Rp 100.000', count: 892 },
  { name: 'Sertifikat CSR', desc: 'Untuk perusahaan mitra CSR dengan kontribusi korporat', count: 45 },
  { name: 'Sertifikat Komunitas', desc: 'Untuk kelompok/komunitas yang berpartisipasi aktif', count: 28 },
  { name: 'Sertifikat Restorasi', desc: 'Sertifikat khusus untuk program restorasi yang selesai', count: 12 },
];

export default function SertifikatAdminPage() {
  return (
    <DashboardLayout variant="admin" menuItems={menuItems} userName="Admin ID-MAP" userRole="Administrator" placeholder="Cari sertifikat...">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-mangrove-deep">Sertifikat</h1>
          <p className="text-sm text-mangrove-muted mt-1">Kelola dan terbitkan sertifikat kontribusi restorasi.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm"><Download className="w-4 h-4" /> Export</Button>
          <Button variant="neon" size="sm"><Plus className="w-4 h-4" /> Terbitkan Baru</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Award className="w-5 h-5" />} label="Total Sertifikat" value="977" delta="+45 bulan ini" />
        <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Diterbitkan" value="935" />
        <StatCard icon={<Clock className="w-5 h-5" />} label="Menunggu" value="28" />
        <StatCard icon={<Users className="w-5 h-5" />} label="Penerima Unik" value="856" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <Card className="xl:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h3 className="font-bold text-mangrove-deep">Daftar Sertifikat</h3>
            <div className="flex gap-2">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Cari..." className="w-full sm:w-48 pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-mangrove-fresh" />
              </div>
            </div>
          </div>
          <Table headers={['ID', 'Penerima', 'Program', 'Tipe', 'Bibit', 'Karbon', 'Status', 'Aksi']}>
            {certificates.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-2 text-xs font-mono text-mangrove-muted">{c.id}</td>
                <td className="py-3 px-2 font-medium text-gray-800 text-sm">{c.recipient}</td>
                <td className="py-3 px-2 text-xs text-mangrove-muted">{c.program}</td>
                <td className="py-3 px-2 text-xs text-mangrove-muted">{c.type}</td>
                <td className="py-3 px-2 text-sm text-mangrove-deep font-semibold">{c.bibit}</td>
                <td className="py-3 px-2 text-xs text-mangrove-muted">{c.carbon}</td>
                <td className="py-3 px-2"><Badge variant={c.badge}>{c.status}</Badge></td>
                <td className="py-3 px-2">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="!px-2 !text-mangrove-fresh"><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" className="!px-2"><Download className="w-4 h-4" /></Button>
                    {c.status !== 'Diterbitkan' && <Button variant="ghost" size="sm" className="!px-2 !text-blue-500"><Send className="w-4 h-4" /></Button>}
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-mangrove-fresh" /> Template Sertifikat
            </h3>
            <div className="space-y-3">
              {templates.map((t) => (
                <div key={t.name} className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                    <span className="text-xs text-mangrove-muted">{t.count}x</span>
                  </div>
                  <p className="text-xs text-mangrove-muted">{t.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-mangrove-fresh" /> Penerbitan Terbaru
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Andi Pratama', date: '10 Mei 2024', program: 'Teluk Bintuni' },
                { name: 'PT Hijau Lestari', date: '8 Mei 2024', program: 'TN Sembilang' },
                { name: 'Rudi Hermawan', date: '5 Mei 2024', program: 'Timbulsloko' },
              ].map((r) => (
                <div key={r.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{r.name}</p>
                    <p className="text-xs text-mangrove-muted">{r.program} &middot; {r.date}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="!px-2"><Printer className="w-4 h-4" /></Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

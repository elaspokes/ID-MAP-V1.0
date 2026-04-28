import {
  CreditCard, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight,
  Search, Download, Filter, Eye, CheckCircle2, QrCode
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import menuItems from './adminMenuItems';

const fallbackRevenue = [
  { month: 'Jan', value: 12 }, { month: 'Feb', value: 18 }, { month: 'Mar', value: 15 },
  { month: 'Apr', value: 22 }, { month: 'Mei', value: 28 }, { month: 'Jun', value: 35 },
  { month: 'Jul', value: 32 }, { month: 'Agu', value: 38 }, { month: 'Sep', value: 42 },
  { month: 'Okt', value: 48 }, { month: 'Nov', value: 55 }, { month: 'Des', value: 65 },
];

const fallbackTransactions = [
  { id: 'TRX-20240524-001', donor: 'Andi Pratama', amount: 'Rp 500.000', method: 'QRIS', program: 'Teluk Bintuni', date: '24 Mei 2024, 14:32', status: 'Berhasil', badge: 'green' as const },
  { id: 'TRX-20240524-002', donor: 'PT Hijau Lestari', amount: 'Rp 25.000.000', method: 'QRIS', program: 'TN Sembilang', date: '24 Mei 2024, 11:15', status: 'Berhasil', badge: 'green' as const },
  { id: 'TRX-20240523-003', donor: 'Dewi Lestari', amount: 'Rp 250.000', method: 'QRIS', program: 'Desa Timbulsloko', date: '23 Mei 2024, 09:45', status: 'Berhasil', badge: 'green' as const },
  { id: 'TRX-20240523-004', donor: 'Rudi Hermawan', amount: 'Rp 1.000.000', method: 'QRIS', program: 'Kwandang', date: '23 Mei 2024, 08:20', status: 'Pending', badge: 'yellow' as const },
  { id: 'TRX-20240522-005', donor: 'Nina Safitri', amount: 'Rp 150.000', method: 'QRIS', program: 'Segara Anakan', date: '22 Mei 2024, 16:55', status: 'Berhasil', badge: 'green' as const },
  { id: 'TRX-20240522-006', donor: 'CV Mangrove Sejati', amount: 'Rp 15.000.000', method: 'QRIS', program: 'Teluk Balikpapan', date: '22 Mei 2024, 13:10', status: 'Berhasil', badge: 'green' as const },
  { id: 'TRX-20240521-007', donor: 'Ahmad Fauzi', amount: 'Rp 100.000', method: 'QRIS', program: 'Desa Timbulsloko', date: '21 Mei 2024, 10:30', status: 'Gagal', badge: 'red' as const },
];

function txStatusBadge(s: string): 'green' | 'yellow' | 'red' {
  if (s === 'berhasil') return 'green';
  if (s === 'pending') return 'yellow';
  return 'red';
}

export default function PembayaranPage() {
  const convexRevenue = useQuery(api.revenue.list);
  const convexTransactions = useQuery(api.transactions.list);

  const revenueData = convexRevenue ?? fallbackRevenue;
  const transactions = convexTransactions
    ? convexTransactions.map((t) => ({
        id: t.transactionId,
        donor: t.donorName,
        amount: t.amountFormatted,
        method: t.method,
        program: t.program,
        date: t.date,
        status: t.status.charAt(0).toUpperCase() + t.status.slice(1),
        badge: txStatusBadge(t.status),
      }))
    : fallbackTransactions;
  return (
    <DashboardLayout variant="admin" menuItems={menuItems} userName="Admin ID-MAP" userRole="Administrator" placeholder="Cari transaksi...">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-mangrove-deep">Pembayaran (QRIS)</h1>
          <p className="text-sm text-mangrove-muted mt-1">Kelola transaksi donasi dan pembayaran QRIS.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm"><Download className="w-4 h-4" /> Export</Button>
          <Button variant="neon" size="sm"><QrCode className="w-4 h-4" /> Generate QRIS</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<DollarSign className="w-5 h-5" />} label="Total Donasi" value="Rp 98,65 M" delta="+12,3%" />
        <StatCard icon={<CreditCard className="w-5 h-5" />} label="Transaksi Bulan Ini" value="1.847" delta="+18,5%" />
        <StatCard icon={<ArrowUpRight className="w-5 h-5" />} label="Rata-rata Donasi" value="Rp 423.500" delta="+5,2%" />
        <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Success Rate" value="97,8%" delta="+0,3%" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <Card className="xl:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h3 className="font-bold text-mangrove-deep">Tren Pendapatan Donasi</h3>
            <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-mangrove-muted">
              <option>Tahun Ini</option>
              <option>Tahun Lalu</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="payGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B7FF2A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#23C16B" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} formatter={(v) => [`Rp ${v}M`, 'Donasi']} />
              <Area type="monotone" dataKey="value" stroke="#23C16B" strokeWidth={2.5} fill="url(#payGreen)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4">Donasi per Program</h3>
          <div className="space-y-4">
            {[
              { name: 'TN Sembilang', amount: 'Rp 23,10 M', percent: 23.4 },
              { name: 'Teluk Bintuni', amount: 'Rp 18,45 M', percent: 18.7 },
              { name: 'Desa Timbulsloko', amount: 'Rp 12,30 M', percent: 12.5 },
              { name: 'Kwandang', amount: 'Rp 9,80 M', percent: 9.9 },
              { name: 'Lainnya', amount: 'Rp 35,00 M', percent: 35.5 },
            ].map((p) => (
              <div key={p.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-mangrove-muted">{p.name}</span>
                  <span className="font-semibold text-mangrove-deep">{p.amount}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-mangrove-fresh rounded-full" style={{ width: `${p.percent}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-mangrove-deep rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-mangrove-neon" />
              <span className="text-sm font-semibold text-white">Statistik Hari Ini</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <p className="text-xs text-gray-400">Transaksi</p>
                <p className="text-lg font-bold text-mangrove-neon">62</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Pendapatan</p>
                <p className="text-lg font-bold text-mangrove-neon">Rp 3,2 M</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h3 className="font-bold text-mangrove-deep">Riwayat Transaksi</h3>
          <div className="flex gap-2">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Cari transaksi..." className="w-full sm:w-56 pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-mangrove-fresh" />
            </div>
            <Button variant="ghost" size="sm"><Filter className="w-4 h-4" /></Button>
          </div>
        </div>
        <Table headers={['ID Transaksi', 'Donor', 'Jumlah', 'Metode', 'Program', 'Waktu', 'Status', 'Aksi']}>
          {transactions.map((t) => (
            <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="py-3 px-3 text-xs font-mono text-mangrove-muted">{t.id}</td>
              <td className="py-3 px-3 font-medium text-gray-800 text-sm">{t.donor}</td>
              <td className="py-3 px-3 font-semibold text-mangrove-deep text-sm">{t.amount}</td>
              <td className="py-3 px-3 text-sm text-mangrove-muted flex items-center gap-1"><QrCode className="w-3 h-3" />{t.method}</td>
              <td className="py-3 px-3 text-sm text-mangrove-muted">{t.program}</td>
              <td className="py-3 px-3 text-xs text-mangrove-muted">{t.date}</td>
              <td className="py-3 px-3"><Badge variant={t.badge}>{t.status}</Badge></td>
              <td className="py-3 px-3">
                <Button variant="ghost" size="sm" className="!px-2"><Eye className="w-4 h-4" /></Button>
              </td>
            </tr>
          ))}
        </Table>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-mangrove-muted">Menampilkan 7 dari 1.847 transaksi</p>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="!px-3">
              <ArrowDownRight className="w-3 h-3 rotate-90" /> Prev
            </Button>
            <Button variant="ghost" size="sm" className="!px-3">
              Next <ArrowUpRight className="w-3 h-3 rotate-90" />
            </Button>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
}

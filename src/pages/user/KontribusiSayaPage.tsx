import { DollarSign, TrendingUp, Calendar, ArrowUpRight, QrCode, CreditCard, Wallet, Filter, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardTopbar from '../../components/DashboardTopbar';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import StatCard from '../../components/ui/StatCard';
import Table from '../../components/ui/Table';
import menuItems from './userMenuItems';

const monthlyData = [
  { month: 'Jan', amount: 150000 },
  { month: 'Feb', amount: 100000 },
  { month: 'Mar', amount: 250000 },
  { month: 'Apr', amount: 500000 },
  { month: 'Mei', amount: 250000 },
];

const byProgram = [
  { program: 'Teluk Bintuni', amount: 500000 },
  { program: 'Timbulsloko', amount: 350000 },
  { program: 'TN Sembilang', amount: 400000 },
];

const transactions = [
  { id: 'TXN-2024-0524', method: 'QRIS', program: 'Restorasi Teluk Bintuni', date: '24 Mei 2024', amount: 'Rp 250.000', status: 'Berhasil', badge: 'green' as const },
  { id: 'TXN-2024-0510', method: 'QRIS', program: 'Desa Timbulsloko', date: '10 Mei 2024', amount: 'Rp 300.000', status: 'Berhasil', badge: 'green' as const },
  { id: 'TXN-2024-0502', method: 'Transfer', program: 'TN Sembilang', date: '2 Mei 2024', amount: 'Rp 200.000', status: 'Berhasil', badge: 'green' as const },
  { id: 'TXN-2024-0420', method: 'QRIS', program: 'Restorasi Teluk Bintuni', date: '20 Apr 2024', amount: 'Rp 500.000', status: 'Berhasil', badge: 'green' as const },
  { id: 'TXN-2024-0315', method: 'QRIS', program: 'Desa Timbulsloko', date: '15 Mar 2024', amount: 'Rp 150.000', status: 'Berhasil', badge: 'green' as const },
  { id: 'TXN-2024-0228', method: 'Transfer', program: 'TN Sembilang', date: '28 Feb 2024', amount: 'Rp 200.000', status: 'Berhasil', badge: 'green' as const },
  { id: 'TXN-2024-0210', method: 'QRIS', program: 'Desa Timbulsloko', date: '10 Feb 2024', amount: 'Rp 100.000', status: 'Berhasil', badge: 'green' as const },
  { id: 'TXN-2024-0120', method: 'QRIS', program: 'Restorasi Teluk Bintuni', date: '20 Jan 2024', amount: 'Rp 150.000', status: 'Pending', badge: 'yellow' as const },
];

export default function KontribusiSayaPage() {
  return (
    <div className="min-h-screen bg-mangrove-mint">
      <DashboardSidebar variant="user" menuItems={menuItems} />
      <div className="ml-64">
        <DashboardTopbar placeholder="Cari transaksi..." userName="Andi" userRole="Kontributor" />
        <main className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-mangrove-deep">Kontribusi Saya</h1>
              <p className="text-sm text-mangrove-muted mt-1">Riwayat dan analitik kontribusi Anda untuk restorasi mangrove.</p>
            </div>
            <Button variant="ghost" size="sm"><Download className="w-4 h-4" /> Ekspor CSV</Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard icon={<DollarSign className="w-5 h-5" />} label="Total Kontribusi" value="Rp 1.250.000" delta="+Rp 250K bulan ini" />
            <StatCard icon={<TrendingUp className="w-5 h-5" />} label="Rata-rata / Bulan" value="Rp 250.000" delta="5 bulan terakhir" />
            <StatCard icon={<Calendar className="w-5 h-5" />} label="Total Transaksi" value="8" delta="+2 bulan ini" />
            <StatCard icon={<QrCode className="w-5 h-5" />} label="Metode Favorit" value="QRIS" delta="6 dari 8 transaksi" />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            <Card className="col-span-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-mangrove-deep">Tren Kontribusi Bulanan</h3>
                <Badge variant="green">2024</Badge>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}K`} />
                  <Tooltip formatter={(v) => `Rp ${Number(v).toLocaleString()}`} />
                  <Area type="monotone" dataKey="amount" stroke="#23C16B" fill="url(#contribGrad)" strokeWidth={2} />
                  <defs>
                    <linearGradient id="contribGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#B7FF2A" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#23C16B" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card className="col-span-4">
              <h3 className="font-bold text-mangrove-deep mb-4">Per Program</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={byProgram} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v / 1000}K`} />
                  <YAxis type="category" dataKey="program" tick={{ fontSize: 11 }} width={90} />
                  <Tooltip formatter={(v) => `Rp ${Number(v).toLocaleString()}`} />
                  <Bar dataKey="amount" fill="#23C16B" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Impact summary */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="text-center">
              <div className="w-12 h-12 bg-mangrove-neon/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <ArrowUpRight className="w-6 h-6 text-mangrove-fresh" />
              </div>
              <p className="text-2xl font-bold text-mangrove-deep">25</p>
              <p className="text-sm text-mangrove-muted">Bibit Mangrove Ditanam</p>
              <p className="text-xs text-mangrove-fresh mt-1">dari kontribusi Anda</p>
            </Card>
            <Card className="text-center">
              <div className="w-12 h-12 bg-mangrove-neon/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Wallet className="w-6 h-6 text-mangrove-fresh" />
              </div>
              <p className="text-2xl font-bold text-mangrove-deep">12,5 ton</p>
              <p className="text-sm text-mangrove-muted">CO₂ yang Diserap</p>
              <p className="text-xs text-mangrove-fresh mt-1">estimasi tahunan</p>
            </Card>
            <Card className="text-center">
              <div className="w-12 h-12 bg-mangrove-neon/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-6 h-6 text-mangrove-fresh" />
              </div>
              <p className="text-2xl font-bold text-mangrove-deep">3</p>
              <p className="text-sm text-mangrove-muted">Program Didukung</p>
              <p className="text-xs text-mangrove-fresh mt-1">di 3 provinsi</p>
            </Card>
          </div>

          {/* Transaction history */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-mangrove-deep">Riwayat Transaksi</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm"><Filter className="w-4 h-4" /> Filter</Button>
              </div>
            </div>
            <Table headers={['ID', 'Metode', 'Program', 'Tanggal', 'Jumlah', 'Status']}>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-3 px-4"><span className="font-mono text-xs">{t.id}</span></td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      {t.method === 'QRIS' ? <QrCode className="w-3.5 h-3.5 text-mangrove-fresh" /> : <CreditCard className="w-3.5 h-3.5 text-blue-500" />}
                      <span className="text-sm">{t.method}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4"><span className="text-sm">{t.program}</span></td>
                  <td className="py-3 px-4"><span className="text-sm text-mangrove-muted">{t.date}</span></td>
                  <td className="py-3 px-4"><span className="font-semibold text-sm">{t.amount}</span></td>
                  <td className="py-3 px-4"><Badge variant={t.badge}>{t.status}</Badge></td>
                </tr>
              ))}
            </Table>
          </Card>
        </main>
      </div>
    </div>
  );
}

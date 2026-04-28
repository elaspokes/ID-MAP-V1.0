import {
  BarChart3, TrendingUp, Download, Calendar, Filter,
  Users, DollarSign, TreePine, Wind, MapPin, FileText, Printer
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';
import menuItems from './adminMenuItems';

const monthlyData = [
  { month: 'Jan', donasi: 12, pengguna: 280, bibit: 45 },
  { month: 'Feb', donasi: 18, pengguna: 246, bibit: 52 },
  { month: 'Mar', donasi: 15, pengguna: 283, bibit: 48 },
  { month: 'Apr', donasi: 22, pengguna: 305, bibit: 65 },
  { month: 'Mei', donasi: 28, pengguna: 342, bibit: 78 },
  { month: 'Jun', donasi: 35, pengguna: 380, bibit: 92 },
  { month: 'Jul', donasi: 32, pengguna: 350, bibit: 85 },
  { month: 'Agu', donasi: 38, pengguna: 410, bibit: 98 },
  { month: 'Sep', donasi: 42, pengguna: 425, bibit: 105 },
  { month: 'Okt', donasi: 48, pengguna: 460, bibit: 112 },
  { month: 'Nov', donasi: 55, pengguna: 490, bibit: 125 },
  { month: 'Des', donasi: 65, pengguna: 520, bibit: 140 },
];

const impactPie = [
  { name: 'Serapan Karbon', value: 40 },
  { name: 'Biodiversitas', value: 25 },
  { name: 'Perlindungan Pesisir', value: 20 },
  { name: 'Ekonomi Lokal', value: 15 },
];
const PIE_COLORS = ['#23C16B', '#B7FF2A', '#063C38', '#6B7280'];

const regionPerformance = [
  { region: 'Papua Barat', score: 92, programs: 2, bibit: '345K' },
  { region: 'Sumatera Selatan', score: 88, programs: 1, bibit: '320K' },
  { region: 'Kalimantan Timur', score: 78, programs: 1, bibit: '95K' },
  { region: 'Jawa Tengah', score: 65, programs: 3, bibit: '300K' },
  { region: 'Gorontalo Utara', score: 60, programs: 1, bibit: '150K' },
];

const reports = [
  { title: 'Laporan Bulanan — Mei 2024', type: 'Bulanan', date: '1 Jun 2024', status: 'Tersedia' },
  { title: 'Laporan Kuartal Q1 2024', type: 'Kuartal', date: '1 Apr 2024', status: 'Tersedia' },
  { title: 'Laporan Dampak — TN Sembilang', type: 'Program', date: '15 Mei 2024', status: 'Tersedia' },
  { title: 'Laporan Donasi QRIS — Mei 2024', type: 'Keuangan', date: '24 Mei 2024', status: 'Draft' },
];

export default function LaporanAnalitikPage() {
  const convexRevenue = useQuery(api.revenue.list);

  const chartData = convexRevenue && convexRevenue.length > 0
    ? convexRevenue.map(r => ({ month: r.month, donasi: r.value, pengguna: 0, bibit: 0 }))
    : monthlyData;

  return (
    <DashboardLayout variant="admin" menuItems={menuItems} userName="Admin ID-MAP" userRole="Administrator" placeholder="Cari laporan...">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-mangrove-deep">Laporan & Analitik</h1>
          <p className="text-sm text-mangrove-muted mt-1">Analisis performa platform dan dampak restorasi.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm"><Calendar className="w-4 h-4" /> Periode</Button>
          <Button variant="ghost" size="sm"><Filter className="w-4 h-4" /> Filter</Button>
          <Button variant="neon" size="sm"><Download className="w-4 h-4" /> Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Users className="w-5 h-5" />} label="Pertumbuhan User" value="+38,2%" delta="YoY" />
        <StatCard icon={<DollarSign className="w-5 h-5" />} label="Pertumbuhan Donasi" value="+45,6%" delta="YoY" />
        <StatCard icon={<TreePine className="w-5 h-5" />} label="Bibit Ditanam YTD" value="1.285.760" />
        <StatCard icon={<Wind className="w-5 h-5" />} label="Karbon Diserap YTD" value="823.456 ton" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-8">
        <Card className="xl:col-span-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h3 className="font-bold text-mangrove-deep">Tren Platform</h3>
            <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-mangrove-muted">
              <option>Donasi (Rp M)</option>
              <option>Pengguna Baru</option>
              <option>Bibit Ditanam (K)</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="repGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B7FF2A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#23C16B" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
              <Area type="monotone" dataKey="donasi" stroke="#23C16B" strokeWidth={2.5} fill="url(#repGreen)" name="Donasi (Rp M)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="xl:col-span-4">
          <h3 className="font-bold text-mangrove-deep mb-4">Dampak Restorasi</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={impactPie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {impactPie.map((_, i) => (<Cell key={i} fill={PIE_COLORS[i]} />))}
              </Pie>
              <Legend iconType="circle" iconSize={8} formatter={(value: string) => <span className="text-xs text-mangrove-muted">{value}</span>} />
              <Tooltip formatter={(v) => [`${v}%`, 'Kontribusi']} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-mangrove-fresh" /> Kinerja per Wilayah
          </h3>
          <div className="space-y-4">
            {regionPerformance.map((r) => (
              <div key={r.region}>
                <div className="flex justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800 font-medium">{r.region}</span>
                    <span className="text-xs text-mangrove-muted">{r.programs} program &middot; {r.bibit} bibit</span>
                  </div>
                  <span className="font-bold text-mangrove-deep">{r.score}%</span>
                </div>
                <ProgressBar value={r.score} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-mangrove-fresh" /> Laporan Tersedia
          </h3>
          <div className="space-y-3">
            {reports.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{r.title}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs text-mangrove-muted">{r.type}</span>
                    <span className="text-xs text-mangrove-muted">&middot; {r.date}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="!px-2"><Download className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" className="!px-2"><Printer className="w-4 h-4" /></Button>
                </div>
              </div>
            ))}
          </div>
          <Button variant="neon" size="md" className="w-full mt-4">
            <BarChart3 className="w-4 h-4" /> Generate Laporan Baru
          </Button>
        </Card>
      </div>

      <Card>
        <h3 className="font-bold text-mangrove-deep mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-mangrove-fresh" /> Key Metrics Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Retention Rate', value: '87%', change: '+3%', positive: true },
            { label: 'Avg. Donation', value: 'Rp 423K', change: '+12%', positive: true },
            { label: 'Verification Time', value: '3,2 hari', change: '-0,5', positive: true },
            { label: 'Bounce Rate', value: '12%', change: '-2%', positive: true },
          ].map((m) => (
            <div key={m.label} className="p-4 bg-gray-50 rounded-xl text-center">
              <p className="text-xs text-mangrove-muted mb-1">{m.label}</p>
              <p className="text-xl font-bold text-mangrove-deep">{m.value}</p>
              <span className={`text-xs font-medium ${m.positive ? 'text-mangrove-fresh' : 'text-red-500'}`}>{m.change}</span>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}

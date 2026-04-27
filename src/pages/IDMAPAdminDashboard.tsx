import {
  LayoutDashboard, Users, MapPin, CreditCard, TreePine, ClipboardCheck,
  BarChart3, Award, Settings, Sprout, Wind, DollarSign
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardTopbar from '../components/DashboardTopbar';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';

const menuItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', href: '/admin' },
  { icon: <Users className="w-5 h-5" />, label: 'Manajemen Pengguna' },
  { icon: <MapPin className="w-5 h-5" />, label: 'Program & Lokasi' },
  { icon: <CreditCard className="w-5 h-5" />, label: 'Pembayaran (QRIS)' },
  { icon: <TreePine className="w-5 h-5" />, label: 'Data Mangrove' },
  { icon: <ClipboardCheck className="w-5 h-5" />, label: 'Monitoring & Validasi' },
  { icon: <BarChart3 className="w-5 h-5" />, label: 'Laporan & Analitik' },
  { icon: <Award className="w-5 h-5" />, label: 'Sertifikat' },
  { icon: <Settings className="w-5 h-5" />, label: 'Pengaturan Sistem' },
];

const trendData = [
  { month: 'Jan', value: 30 }, { month: 'Feb', value: 38 }, { month: 'Mar', value: 45 },
  { month: 'Apr', value: 42 }, { month: 'Mei', value: 55 }, { month: 'Jun', value: 60 },
  { month: 'Jul', value: 65 }, { month: 'Agu', value: 72 }, { month: 'Sep', value: 78 },
  { month: 'Okt', value: 85 }, { month: 'Nov', value: 90 }, { month: 'Des', value: 98 },
];

const pieData = [
  { name: 'Individu', value: 45 },
  { name: 'CSR Perusahaan', value: 35 },
  { name: 'Komunitas', value: 15 },
  { name: 'Lainnya', value: 5 },
];
const PIE_COLORS = ['#23C16B', '#B7FF2A', '#063C38', '#6B7280'];

const programs = [
  { name: 'Restorasi Teluk Bintuni', loc: 'Papua Barat', bibit: '250.000', dana: 'Rp 18,45 M', progress: 75 },
  { name: 'Desa Timbulsloko', loc: 'Demak, Jawa Tengah', bibit: '180.000', dana: 'Rp 12,30 M', progress: 43 },
  { name: 'TN Sembilang', loc: 'Sumatera Selatan', bibit: '320.000', dana: 'Rp 23,10 M', progress: 80 },
  { name: 'Kecamatan Kwandang', loc: 'Gorontalo Utara', bibit: '150.000', dana: 'Rp 9,80 M', progress: 40 },
];

const activities = [
  { text: 'Donasi baru Rp 250.000 via QRIS', time: '2 menit lalu', color: 'bg-mangrove-fresh' },
  { text: 'Program TN Sembilang diperbarui', time: '15 menit lalu', color: 'bg-blue-500' },
  { text: 'Verifikasi lokasi selesai', time: '30 menit lalu', color: 'bg-amber-500' },
  { text: 'Sertifikat diterbitkan', time: '1 jam lalu', color: 'bg-purple-500' },
];

export default function IDMAPAdminDashboard() {
  return (
    <div className="min-h-screen bg-mangrove-mint">
      <DashboardSidebar variant="admin" menuItems={menuItems} />

      <div className="ml-64">
        <DashboardTopbar userName="Admin ID-MAP" userRole="Administrator" />

        <main className="p-8">
          <h1 className="text-2xl font-bold text-mangrove-deep mb-6">Dashboard Admin</h1>

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard icon={<Users className="w-5 h-5" />} label="Total Pengguna" value="12.456" delta="+8,5%" />
            <StatCard icon={<DollarSign className="w-5 h-5" />} label="Total Donasi (QRIS)" value="Rp 98,65 M" delta="+12,3%" />
            <StatCard icon={<Sprout className="w-5 h-5" />} label="Bibit Ditanam" value="1.285.760" delta="+15,2%" />
            <StatCard icon={<Wind className="w-5 h-5" />} label="Serapan Karbon" value="823.456 ton" delta="+10,1%" />
          </div>

          {/* Charts + Activity */}
          <div className="grid grid-cols-12 gap-6 mb-8">
            {/* Trend Chart */}
            <Card className="col-span-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-mangrove-deep">Tren Kontribusi (QRIS)</h3>
                <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-mangrove-muted">
                  <option>Tahun Ini</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="areaGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#B7FF2A" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#23C16B" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    formatter={(v) => [`${v}M`, 'Kontribusi']}
                  />
                  <Area type="monotone" dataKey="value" stroke="#23C16B" strokeWidth={2.5} fill="url(#areaGreen)" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Donut Chart */}
            <Card className="col-span-3">
              <h3 className="font-bold text-mangrove-deep mb-4">Kontribusi per Sumber</h3>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i]} />
                    ))}
                  </Pie>
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value: string) => <span className="text-xs text-mangrove-muted">{value}</span>}
                  />
                  <Tooltip formatter={(v) => [`${v}%`, 'Persentase']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center -mt-2">
                <p className="text-xs text-mangrove-muted">Total</p>
                <p className="text-xl font-bold text-mangrove-deep">Rp 98,65 M</p>
              </div>
            </Card>

            {/* Activities */}
            <Card className="col-span-4">
              <h3 className="font-bold text-mangrove-deep mb-6">Aktivitas Terbaru</h3>
              <div className="space-y-5">
                {activities.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-2.5 h-2.5 rounded-full ${a.color}`} />
                      {i < activities.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
                    </div>
                    <div>
                      <p className="text-sm text-gray-800">{a.text}</p>
                      <p className="text-xs text-mangrove-muted mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Programs Table */}
          <Card>
            <h3 className="font-bold text-mangrove-deep mb-4">Program Aktif</h3>
            <Table headers={['Program', 'Lokasi', 'Bibit Ditanam', 'Dana Terkumpul', 'Progress', 'Aksi']}>
              {programs.map((p) => (
                <tr key={p.name} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{p.name}</td>
                  <td className="py-3 px-4 text-mangrove-muted">{p.loc}</td>
                  <td className="py-3 px-4 text-mangrove-muted">{p.bibit}</td>
                  <td className="py-3 px-4 font-medium text-mangrove-deep">{p.dana}</td>
                  <td className="py-3 px-4 w-40"><ProgressBar value={p.progress} /></td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" className="!text-mangrove-fresh">Detail</Button>
                  </td>
                </tr>
              ))}
            </Table>
          </Card>
        </main>
      </div>
    </div>
  );
}

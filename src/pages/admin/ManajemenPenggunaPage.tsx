import {
  Users, UserPlus, UserCheck, UserX, Search, Filter, MoreHorizontal,
  Mail, Shield, Calendar, TrendingUp, Download
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import menuItems from './adminMenuItems';

const users = [
  { id: 'USR-001', name: 'Andi Pratama', email: 'andi@email.com', role: 'Kontributor', status: 'Aktif', badge: 'green' as const, joined: '15 Jan 2024', kontribusi: 'Rp 1,2 M' },
  { id: 'USR-002', name: 'Sari Wulandari', email: 'sari@email.com', role: 'Verifikator', status: 'Aktif', badge: 'green' as const, joined: '22 Feb 2024', kontribusi: '-' },
  { id: 'USR-003', name: 'Bambang Sudirjo', email: 'bambang@email.com', role: 'Verifikator', status: 'Aktif', badge: 'green' as const, joined: '5 Mar 2024', kontribusi: '-' },
  { id: 'USR-004', name: 'Dewi Lestari', email: 'dewi@email.com', role: 'Kontributor', status: 'Nonaktif', badge: 'gray' as const, joined: '10 Apr 2024', kontribusi: 'Rp 450.000' },
  { id: 'USR-005', name: 'Rudi Hermawan', email: 'rudi@email.com', role: 'Kontributor', status: 'Aktif', badge: 'green' as const, joined: '18 Mei 2024', kontribusi: 'Rp 2,8 M' },
  { id: 'USR-006', name: 'Nina Safitri', email: 'nina@email.com', role: 'Admin', status: 'Aktif', badge: 'green' as const, joined: '1 Jan 2024', kontribusi: '-' },
  { id: 'USR-007', name: 'Dedi Mulyadi', email: 'dedi@email.com', role: 'Verifikator', status: 'Pending', badge: 'yellow' as const, joined: '24 Mei 2024', kontribusi: '-' },
  { id: 'USR-008', name: 'Rina Agustina', email: 'rina@email.com', role: 'Kontributor', status: 'Aktif', badge: 'green' as const, joined: '8 Mar 2024', kontribusi: 'Rp 780.000' },
];

const roleDistribution = [
  { role: 'Kontributor', count: 10234, percent: 82 },
  { role: 'Verifikator', count: 156, percent: 1.3 },
  { role: 'Admin', count: 12, percent: 0.1 },
  { role: 'CSR Partner', count: 2054, percent: 16.6 },
];

export default function ManajemenPenggunaPage() {
  return (
    <DashboardLayout variant="admin" menuItems={menuItems} userName="Admin ID-MAP" userRole="Administrator" placeholder="Cari pengguna...">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-mangrove-deep">Manajemen Pengguna</h1>
        <p className="text-sm text-mangrove-muted mt-1">Kelola semua pengguna platform ID-MAP.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Users className="w-5 h-5" />} label="Total Pengguna" value="12.456" delta="+8,5%" />
        <StatCard icon={<UserPlus className="w-5 h-5" />} label="Pengguna Baru" value="342" delta="bulan ini" />
        <StatCard icon={<UserCheck className="w-5 h-5" />} label="Aktif" value="11.892" delta="95,5%" />
        <StatCard icon={<UserX className="w-5 h-5" />} label="Nonaktif" value="564" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <Card className="xl:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <h3 className="font-bold text-mangrove-deep">Daftar Pengguna</h3>
            <div className="flex gap-2">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Cari..." className="w-full sm:w-48 pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-mangrove-fresh" />
              </div>
              <Button variant="ghost" size="sm"><Filter className="w-4 h-4" /> Filter</Button>
              <Button variant="neon" size="sm"><UserPlus className="w-4 h-4" /> Tambah</Button>
            </div>
          </div>
          <Table headers={['ID', 'Nama', 'Email', 'Role', 'Status', 'Bergabung', 'Aksi']}>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-3 px-3 text-xs font-mono text-mangrove-muted">{u.id}</td>
                <td className="py-3 px-3 font-medium text-gray-800 text-sm">{u.name}</td>
                <td className="py-3 px-3 text-sm text-mangrove-muted">{u.email}</td>
                <td className="py-3 px-3">
                  <Badge variant={u.role === 'Admin' ? 'blue' : u.role === 'Verifikator' ? 'neon' : 'gray'}>{u.role}</Badge>
                </td>
                <td className="py-3 px-3"><Badge variant={u.badge}>{u.status}</Badge></td>
                <td className="py-3 px-3 text-xs text-mangrove-muted">{u.joined}</td>
                <td className="py-3 px-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="!px-2"><Mail className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" className="!px-2"><MoreHorizontal className="w-4 h-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </Card>

        <Card>
          <h3 className="font-bold text-mangrove-deep mb-6">Distribusi Role</h3>
          <div className="space-y-4">
            {roleDistribution.map((r) => (
              <div key={r.role}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-mangrove-muted">{r.role}</span>
                  <span className="font-semibold text-mangrove-deep">{r.count.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-mangrove-fresh rounded-full transition-all" style={{ width: `${r.percent}%` }} />
                </div>
                <p className="text-xs text-mangrove-muted mt-0.5">{r.percent}%</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="font-semibold text-mangrove-deep text-sm mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-mangrove-fresh" /> Akses Cepat
            </h4>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start"><UserPlus className="w-4 h-4" /> Undang Verifikator</Button>
              <Button variant="ghost" size="sm" className="w-full justify-start"><Download className="w-4 h-4" /> Export Data</Button>
              <Button variant="ghost" size="sm" className="w-full justify-start"><Calendar className="w-4 h-4" /> Jadwal Onboarding</Button>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-mangrove-fresh" /> Tren Pendaftaran
          </h3>
          <div className="space-y-3">
            {[
              { month: 'Mei 2024', count: 342, growth: '+12%' },
              { month: 'Apr 2024', count: 305, growth: '+8%' },
              { month: 'Mar 2024', count: 283, growth: '+15%' },
              { month: 'Feb 2024', count: 246, growth: '+5%' },
            ].map((m) => (
              <div key={m.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-800">{m.month}</p>
                  <p className="text-xs text-mangrove-muted">{m.count} pengguna baru</p>
                </div>
                <span className="text-sm font-semibold text-mangrove-fresh">{m.growth}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-mangrove-fresh" /> Verifikator Pending
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Dedi Mulyadi', loc: 'Gorontalo Utara', date: '24 Mei 2024' },
              { name: 'Ahmad Fauzi', loc: 'Cilacap', date: '22 Mei 2024' },
              { name: 'Putri Handayani', loc: 'Riau', date: '20 Mei 2024' },
            ].map((v) => (
              <div key={v.name} className="p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-gray-800">{v.name}</p>
                  <Badge variant="yellow">Pending</Badge>
                </div>
                <p className="text-xs text-mangrove-muted">{v.loc} &middot; {v.date}</p>
                <div className="flex gap-2 mt-2">
                  <Button variant="neon" size="sm">Setujui</Button>
                  <Button variant="ghost" size="sm" className="!text-red-500">Tolak</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

import {
  Settings, Shield, Bell, Database, Globe, Palette,
  Key, Users, Mail, Server, Save, RefreshCw
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import menuItems from './adminMenuItems';

const systemInfo = [
  { label: 'Versi Platform', value: 'v1.0.0-beta', icon: <Server className="w-4 h-4" /> },
  { label: 'Database', value: 'PostgreSQL 16', icon: <Database className="w-4 h-4" /> },
  { label: 'Storage', value: '2,4 GB / 10 GB', icon: <Database className="w-4 h-4" /> },
  { label: 'Uptime', value: '99,98%', icon: <RefreshCw className="w-4 h-4" /> },
];

const roles = [
  { name: 'Super Admin', users: 2, perms: 'Semua akses', badge: 'red' as const },
  { name: 'Admin', users: 10, perms: 'Kelola data, pengguna, laporan', badge: 'blue' as const },
  { name: 'Verifikator', users: 156, perms: 'Verifikasi lapangan, input data', badge: 'neon' as const },
  { name: 'Kontributor', users: 10234, perms: 'Donasi, lihat program, sertifikat', badge: 'green' as const },
  { name: 'CSR Partner', users: 2054, perms: 'Donasi korporat, laporan dampak', badge: 'yellow' as const },
];

export default function PengaturanSistemPage() {
  return (
    <DashboardLayout variant="admin" menuItems={menuItems} userName="Admin ID-MAP" userRole="Administrator" placeholder="Cari pengaturan...">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-mangrove-deep">Pengaturan Sistem</h1>
        <p className="text-sm text-mangrove-muted mt-1">Konfigurasi platform, role, dan preferensi sistem.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <h3 className="font-bold text-mangrove-deep mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-mangrove-fresh" /> Informasi Umum
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-mangrove-deep mb-2">Nama Platform</label>
              <input type="text" defaultValue="ID-MAP — Integrated Digital Mangrove & Coastal Platform" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-mangrove-fresh" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-mangrove-deep mb-2">Deskripsi</label>
              <textarea rows={3} defaultValue="Platform pengelolaan mangrove dan pesisir Indonesia yang terintegrasi untuk donasi, monitoring, dan verifikasi." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none resize-none focus:border-mangrove-fresh" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-mangrove-deep mb-2">Email Kontak</label>
                <input type="email" defaultValue="admin@id-map.co.id" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-mangrove-fresh" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-mangrove-deep mb-2">Timezone</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none">
                  <option>Asia/Jakarta (WIB)</option>
                  <option>Asia/Makassar (WITA)</option>
                  <option>Asia/Jayapura (WIT)</option>
                </select>
              </div>
            </div>
            <Button variant="neon" size="md"><Save className="w-4 h-4" /> Simpan Perubahan</Button>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-mangrove-deep mb-6 flex items-center gap-2">
            <Server className="w-5 h-5 text-mangrove-fresh" /> Status Sistem
          </h3>
          <div className="space-y-4 mb-6">
            {systemInfo.map((s) => (
              <div key={s.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="text-mangrove-fresh">{s.icon}</div>
                  <span className="text-sm text-mangrove-muted">{s.label}</span>
                </div>
                <span className="text-sm font-semibold text-mangrove-deep">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-mangrove-deep rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white">Status Server</span>
              <Badge variant="green">Online</Badge>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-xs text-gray-400">CPU</p>
                <p className="text-lg font-bold text-mangrove-neon">23%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">RAM</p>
                <p className="text-lg font-bold text-mangrove-neon">45%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">Disk</p>
                <p className="text-lg font-bold text-mangrove-neon">24%</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <h3 className="font-bold text-mangrove-deep mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-mangrove-fresh" /> Manajemen Role
          </h3>
          <div className="space-y-3">
            {roles.map((r) => (
              <div key={r.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Badge variant={r.badge}>{r.name}</Badge>
                  <div>
                    <p className="text-xs text-mangrove-muted">{r.perms}</p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1"><Users className="w-3 h-3" /> {r.users} pengguna</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm"><Settings className="w-4 h-4" /></Button>
              </div>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="mt-4 w-full !text-mangrove-fresh"><Key className="w-4 h-4" /> Kelola Permission</Button>
        </Card>

        <Card>
          <h3 className="font-bold text-mangrove-deep mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-mangrove-fresh" /> Pengaturan Notifikasi
          </h3>
          <div className="space-y-4">
            {[
              { label: 'Notifikasi Donasi Baru', desc: 'Email saat ada donasi masuk', enabled: true },
              { label: 'Alert Verifikasi', desc: 'Notifikasi saat verifikasi menunggu review', enabled: true },
              { label: 'Laporan Mingguan', desc: 'Ringkasan performa dikirim setiap Senin', enabled: true },
              { label: 'Alert Sistem', desc: 'Peringatan saat ada masalah server', enabled: true },
              { label: 'Update Program', desc: 'Notifikasi perubahan status program', enabled: false },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-800">{n.label}</p>
                  <p className="text-xs text-mangrove-muted">{n.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={n.enabled} className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-mangrove-fresh/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-mangrove-fresh"></div>
                </label>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-mangrove-deep mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-mangrove-fresh" /> Email SMTP
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input type="text" placeholder="SMTP Host" className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-mangrove-fresh" />
              <input type="text" placeholder="Port" className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-mangrove-fresh" />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-semibold text-mangrove-deep mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-mangrove-fresh" /> Tema & Branding
            </h4>
            <div className="flex gap-3">
              {['#052E2B', '#063C38', '#B7FF2A', '#23C16B', '#F4FFF4'].map((color) => (
                <div key={color} className="w-8 h-8 rounded-lg border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

import { useState } from 'react';
import {
  Bell, Check, CheckCheck, TreePine, DollarSign, Award, AlertCircle,
  Info, Trash2, Filter, Calendar
} from 'lucide-react';
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardTopbar from '../../components/DashboardTopbar';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import StatCard from '../../components/ui/StatCard';
import menuItems from './userMenuItems';

type NotifCategory = 'all' | 'program' | 'donasi' | 'sertifikat' | 'system';

interface Notification {
  id: number;
  icon: 'tree' | 'dollar' | 'award' | 'alert' | 'info';
  title: string;
  desc: string;
  time: string;
  read: boolean;
  category: Exclude<NotifCategory, 'all'>;
}

const initialNotifs: Notification[] = [
  { id: 1, icon: 'tree', title: 'Update Program Teluk Bintuni', desc: 'Penanaman batch ke-8 telah selesai. 5.000 bibit berhasil ditanam minggu ini.', time: '2 jam lalu', read: false, category: 'program' },
  { id: 2, icon: 'dollar', title: 'Donasi Berhasil Diproses', desc: 'Donasi Anda sebesar Rp 250.000 untuk program Restorasi Teluk Bintuni telah dikonfirmasi.', time: '5 jam lalu', read: false, category: 'donasi' },
  { id: 3, icon: 'award', title: 'Sertifikat Baru Tersedia', desc: 'Sertifikat kontribusi CERT-2024-001 untuk program Teluk Bintuni telah diterbitkan dan siap diunduh.', time: '1 hari lalu', read: false, category: 'sertifikat' },
  { id: 4, icon: 'info', title: 'Program Desa Timbulsloko — Verifikasi', desc: 'Tim verifikator sedang memproses lapangan di area Anda. Estimasi selesai 3 hari.', time: '1 hari lalu', read: true, category: 'program' },
  { id: 5, icon: 'tree', title: 'Bibit Anda Tumbuh!', desc: '3 bibit mangrove yang Anda adopsi di Sumatera Selatan menunjukkan pertumbuhan yang baik (survival rate 92%).', time: '2 hari lalu', read: true, category: 'program' },
  { id: 6, icon: 'dollar', title: 'Laporan Donasi Bulanan', desc: 'Ringkasan donasi April 2024: Total Rp 500.000 ke 2 program. Lihat detail lengkap.', time: '3 hari lalu', read: true, category: 'donasi' },
  { id: 7, icon: 'alert', title: 'Peringatan Cuaca', desc: 'Kondisi cuaca ekstrem terdeteksi di area Teluk Bintuni. Tim lapangan telah mengambil tindakan pencegahan.', time: '4 hari lalu', read: true, category: 'system' },
  { id: 8, icon: 'info', title: 'Fitur Baru: Adopt a Mangrove', desc: 'Sekarang Anda bisa mengadopsi bibit mangrove secara personal dan melacak pertumbuhannya secara real-time.', time: '1 minggu lalu', read: true, category: 'system' },
  { id: 9, icon: 'award', title: 'Pencapaian Baru!', desc: 'Selamat! Anda telah melewati milestone kontribusi Rp 1.000.000. Lencana "Guardian" telah ditambahkan ke profil Anda.', time: '2 minggu lalu', read: true, category: 'sertifikat' },
  { id: 10, icon: 'dollar', title: 'Donasi Diterima', desc: 'Donasi sebesar Rp 300.000 ke program Desa Timbulsloko berhasil diproses.', time: '2 minggu lalu', read: true, category: 'donasi' },
];

const iconMap = {
  tree: <TreePine className="w-5 h-5 text-mangrove-fresh" />,
  dollar: <DollarSign className="w-5 h-5 text-blue-500" />,
  award: <Award className="w-5 h-5 text-amber-500" />,
  alert: <AlertCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-mangrove-fresh" />,
};

const categories: { key: NotifCategory; label: string }[] = [
  { key: 'all', label: 'Semua' },
  { key: 'program', label: 'Program' },
  { key: 'donasi', label: 'Donasi' },
  { key: 'sertifikat', label: 'Sertifikat' },
  { key: 'system', label: 'Sistem' },
];

export default function NotifikasiPage() {
  const [notifs, setNotifs] = useState(initialNotifs);
  const [filter, setFilter] = useState<NotifCategory>('all');

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) => setNotifs((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const deleteNotif = (id: number) => setNotifs((prev) => prev.filter((n) => n.id !== id));

  const unreadCount = notifs.filter((n) => !n.read).length;
  const filtered = filter === 'all' ? notifs : notifs.filter((n) => n.category === filter);

  return (
    <div className="min-h-screen bg-mangrove-mint">
      <DashboardSidebar variant="user" menuItems={menuItems} />
      <div className="ml-64">
        <DashboardTopbar placeholder="Cari notifikasi..." userName="Andi" userRole="Kontributor" />
        <main className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-mangrove-deep">Notifikasi</h1>
              <p className="text-sm text-mangrove-muted mt-1">Pembaruan program, donasi, dan aktivitas platform.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={markAllRead}>
                <CheckCheck className="w-4 h-4" /> Tandai Semua Dibaca
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard icon={<Bell className="w-5 h-5" />} label="Total Notifikasi" value={String(notifs.length)} delta="semua waktu" />
            <StatCard icon={<AlertCircle className="w-5 h-5" />} label="Belum Dibaca" value={String(unreadCount)} delta={unreadCount > 0 ? 'perlu perhatian' : 'semua dibaca'} />
            <StatCard icon={<Calendar className="w-5 h-5" />} label="Minggu Ini" value="3" delta="baru" />
            <StatCard icon={<TreePine className="w-5 h-5" />} label="Terkait Program" value={String(notifs.filter((n) => n.category === 'program').length)} delta="update" />
          </div>

          {/* Category filter */}
          <div className="flex gap-2 mb-6 bg-white rounded-xl p-1.5 border border-gray-100 w-fit">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === c.key
                    ? 'bg-mangrove-neon text-mangrove-deep'
                    : 'text-mangrove-muted hover:bg-gray-50'
                }`}
              >
                <Filter className="w-3.5 h-3.5" /> {c.label}
              </button>
            ))}
          </div>

          {/* Notifications */}
          <div className="space-y-3">
            {filtered.map((n) => (
              <Card
                key={n.id}
                className={`flex items-start gap-4 transition-all ${!n.read ? 'border-l-4 border-l-mangrove-neon bg-mangrove-neon/5' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${!n.read ? 'bg-mangrove-neon/10' : 'bg-gray-100'}`}>
                  {iconMap[n.icon]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className={`text-sm ${!n.read ? 'font-bold' : 'font-medium'} text-mangrove-deep`}>{n.title}</h4>
                    {!n.read && <Badge variant="green">Baru</Badge>}
                  </div>
                  <p className="text-sm text-mangrove-muted mb-1">{n.desc}</p>
                  <p className="text-xs text-gray-400">{n.time}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  {!n.read && (
                    <button onClick={() => markRead(n.id)} className="p-2 rounded-lg hover:bg-gray-100 text-mangrove-muted" title="Tandai dibaca">
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => deleteNotif(n.id)} className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500" title="Hapus">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            ))}

            {filtered.length === 0 && (
              <Card className="text-center py-12">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-mangrove-muted">Tidak ada notifikasi untuk kategori ini.</p>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

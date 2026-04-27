import { useState } from 'react';
import {
  LayoutDashboard, ClipboardCheck, MapPin, Database, FileText, Settings,
  CheckCircle2, Clock, XCircle, AlertCircle, Upload, Send, Camera, Play,
  Eye, ChevronRight, Navigation, Compass
} from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardTopbar from '../components/DashboardTopbar';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import MangroveMap from '../components/MangroveMap';
import Table from '../components/ui/Table';

const menuItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', href: '/verifikator' },
  { icon: <ClipboardCheck className="w-5 h-5" />, label: 'Tugas Verifikasi' },
  { icon: <MapPin className="w-5 h-5" />, label: 'Verifikasi Lokasi' },
  { icon: <Database className="w-5 h-5" />, label: 'Data Lapangan' },
  { icon: <FileText className="w-5 h-5" />, label: 'Laporan' },
  { icon: <Settings className="w-5 h-5" />, label: 'Pengaturan' },
];

const tasks = [
  { type: 'Verifikasi Penanaman', loc: 'Desa Timbulsloko, Demak', id: 'VRF-0405-001', status: 'Menunggu', badge: 'yellow' as const },
  { type: 'Verifikasi Monitoring', loc: 'Teluk Bintuni, Papua Barat', id: 'VRF-0405-002', status: 'Proses', badge: 'blue' as const },
  { type: 'Verifikasi Penanaman', loc: 'TN Sembilang, Sumsel', id: 'VRF-0405-003', status: 'Menunggu', badge: 'yellow' as const },
];

const fieldPhotos = [
  { loc: 'Desa Timbulsloko', date: '24 Mei 2024', status: 'Terverifikasi', badge: 'green' as const },
  { loc: 'Teluk Bintuni', date: '22 Mei 2024', status: 'Menunggu', badge: 'yellow' as const },
  { loc: 'TN Sembilang', date: '20 Mei 2024', status: 'Proses', badge: 'blue' as const },
];

/* workflow data */
const workflowTasks = [
  { id: 'VRF-0405-001', project: 'Desa Timbulsloko', loc: 'Demak, Jawa Tengah', type: 'Penanaman', bibit: '180.000', gps: '-6.8975, 110.6383', photos: 8, survivalRate: '72%', status: 'Menunggu', badge: 'yellow' as const, priority: 'Tinggi', deadline: '26 Mei 2024' },
  { id: 'VRF-0405-002', project: 'Teluk Bintuni', loc: 'Papua Barat', type: 'Monitoring', bibit: '250.000', gps: '-2.1234, 133.2345', photos: 12, survivalRate: '85%', status: 'Proses', badge: 'blue' as const, priority: 'Sedang', deadline: '28 Mei 2024' },
  { id: 'VRF-0405-003', project: 'TN Sembilang', loc: 'Sumatera Selatan', type: 'Penanaman', bibit: '320.000', gps: '-2.3456, 104.5678', photos: 6, survivalRate: '88%', status: 'Menunggu', badge: 'yellow' as const, priority: 'Tinggi', deadline: '25 Mei 2024' },
  { id: 'VRF-0405-004', project: 'Kecamatan Kwandang', loc: 'Gorontalo Utara', type: 'Survival Rate', bibit: '150.000', gps: '0.5678, 122.3456', photos: 10, survivalRate: '65%', status: 'Menunggu', badge: 'yellow' as const, priority: 'Rendah', deadline: '30 Mei 2024' },
  { id: 'VRF-0405-005', project: 'Segara Anakan', loc: 'Cilacap, Jawa Tengah', type: 'Monitoring', bibit: '120.000', gps: '-7.6789, 108.8901', photos: 4, survivalRate: '58%', status: 'Selesai', badge: 'green' as const, priority: 'Sedang', deadline: '22 Mei 2024' },
];

const verificationHistory = [
  { id: 'VRF-0404-001', project: 'Teluk Balikpapan', date: '15 Mei 2024', result: 'Disetujui', badge: 'green' as const },
  { id: 'VRF-0404-002', project: 'Nusa Lembongan', date: '12 Mei 2024', result: 'Disetujui', badge: 'green' as const },
  { id: 'VRF-0403-001', project: 'Pulau Rupat', date: '8 Mei 2024', result: 'Ditolak', badge: 'yellow' as const },
  { id: 'VRF-0403-002', project: 'Segara Anakan', date: '5 Mei 2024', result: 'Disetujui', badge: 'green' as const },
];

/* ─── Verification form sub-component ─── */
function VerificationForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-mangrove-fresh/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-mangrove-fresh" />
        </div>
        <h3 className="font-bold text-mangrove-deep text-lg mb-2">Verifikasi Terkirim!</h3>
        <p className="text-sm text-mangrove-muted mb-4">Hasil verifikasi lapangan telah dikirim ke admin untuk review.</p>
        <Button variant="ghost" size="sm" onClick={() => setSubmitted(false)}>Verifikasi Baru</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-mangrove-deep mb-2">Tugas Verifikasi</label>
          <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh outline-none">
            <option>VRF-0405-001 — Desa Timbulsloko</option>
            <option>VRF-0405-002 — Teluk Bintuni</option>
            <option>VRF-0405-003 — TN Sembilang</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-mangrove-deep mb-2">Tipe Verifikasi</label>
          <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh outline-none">
            <option>Verifikasi Penanaman</option>
            <option>Verifikasi Monitoring</option>
            <option>Verifikasi Survival Rate</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-mangrove-deep mb-2 flex items-center gap-1"><MapPin className="w-3 h-3" /> Latitude</label>
          <input type="text" defaultValue="-6.8975" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-mangrove-deep mb-2 flex items-center gap-1"><MapPin className="w-3 h-3" /> Longitude</label>
          <input type="text" defaultValue="110.6383" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-mangrove-deep mb-2">Bibit Ditemukan</label>
          <input type="number" defaultValue="175000" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-mangrove-deep mb-2">Survival Rate (%)</label>
          <input type="number" defaultValue="72" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-mangrove-deep mb-2">Tinggi Rata-rata (cm)</label>
          <input type="number" defaultValue="45" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-mangrove-deep mb-2">Hasil Observasi</label>
        <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none">
          <option>Sesuai — Data lapangan sesuai laporan</option>
          <option>Perlu Perbaikan — Ada perbedaan minor</option>
          <option>Tidak Sesuai — Data tidak cocok</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-mangrove-deep mb-2">Catatan Verifikasi</label>
        <textarea
          rows={3}
          defaultValue="Kondisi bibit mangrove baik. Tingkat kelangsungan hidup meningkat. Air pasang normal."
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-mangrove-deep mb-2">Upload Bukti Foto</label>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center hover:border-mangrove-fresh/30 transition-colors cursor-pointer">
          <Camera className="w-8 h-8 text-mangrove-muted mx-auto mb-2" />
          <p className="text-xs text-mangrove-muted">Klik atau seret foto ke sini</p>
          <p className="text-[10px] text-gray-400 mt-1">JPG, PNG — maks 10 MB per foto, min 4 foto</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" size="md" className="w-full !border-mangrove-deep !text-mangrove-deep">
          <Upload className="w-4 h-4" /> Simpan Draft
        </Button>
        <Button variant="neon" size="md" className="w-full" onClick={() => setSubmitted(true)}>
          <Send className="w-4 h-4" /> Kirim Verifikasi
        </Button>
      </div>
    </div>
  );
}

export default function IDMAPVerifikatorDashboard() {
  const [tab, setTab] = useState<'overview' | 'workflow' | 'form'>('overview');

  return (
    <div className="min-h-screen bg-mangrove-mint">
      <DashboardSidebar variant="verifikator" menuItems={menuItems} />

      <div className="ml-64">
        <DashboardTopbar placeholder="Cari tugas..." userName="Verifikator" userRole="Field Officer" />

        <main className="p-8">
          <h1 className="text-2xl font-bold text-mangrove-deep mb-6">Dashboard Verifikator</h1>

          {/* Tab nav */}
          <div className="flex gap-2 mb-8 bg-white rounded-xl p-1.5 border border-gray-100 w-fit">
            {[
              { key: 'overview' as const, label: 'Ringkasan', icon: <LayoutDashboard className="w-4 h-4" /> },
              { key: 'workflow' as const, label: 'Alur Verifikasi', icon: <ClipboardCheck className="w-4 h-4" /> },
              { key: 'form' as const, label: 'Form Verifikasi', icon: <FileText className="w-4 h-4" /> },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  tab === t.key ? 'bg-mangrove-neon text-mangrove-deep' : 'text-mangrove-muted hover:bg-gray-50'
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <StatCard icon={<ClipboardCheck className="w-5 h-5" />} label="Tugas Aktif" value="24" />
                <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Tugas Selesai" value="128" />
                <StatCard icon={<Clock className="w-5 h-5" />} label="Menunggu Validasi" value="16" />
                <StatCard icon={<XCircle className="w-5 h-5" />} label="Ditolak" value="3" />
              </div>

              <div className="grid grid-cols-12 gap-6 mb-8">
                {/* Tasks */}
                <Card className="col-span-5">
                  <h3 className="font-bold text-mangrove-deep mb-5">Tugas Verifikasi</h3>
                  <div className="space-y-4">
                    {tasks.map((t) => (
                      <div key={t.id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-mangrove-fresh/30 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-sm text-gray-800">{t.type}</p>
                            <p className="text-xs text-mangrove-muted mt-0.5">{t.loc}</p>
                          </div>
                          <Badge variant={t.badge}>{t.status}</Badge>
                        </div>
                        <p className="text-xs text-mangrove-muted">ID: {t.id}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" className="mt-4 w-full !text-mangrove-fresh">
                    Lihat Semua Tugas
                  </Button>
                </Card>

                {/* Map */}
                <Card className="col-span-7">
                  <h3 className="font-bold text-mangrove-deep mb-4">Peta Tugas</h3>
                  <MangroveMap
                    className="h-72"
                    showControls
                    pins={[
                      { x: 28, y: 52, label: 'Demak' },
                      { x: 75, y: 60, label: 'Papua' },
                      { x: 22, y: 65, label: 'Sembilang' },
                      { x: 50, y: 55, label: 'Kalimantan' },
                    ]}
                  />
                </Card>
              </div>

              {/* Field Evidence */}
              <Card className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-mangrove-deep">Aktivitas Lapangan</h3>
                  <Button variant="ghost" size="sm" className="!text-mangrove-fresh">Lihat Semua</Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {fieldPhotos.map((photo, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="h-44 bg-gradient-to-br from-mangrove-deep to-mangrove-teal flex items-center justify-center relative">
                        <Camera className="w-10 h-10 text-mangrove-neon/40" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm text-gray-800">{photo.loc}</p>
                          <Badge variant={photo.badge}>{photo.status}</Badge>
                        </div>
                        <p className="text-xs text-mangrove-muted">{photo.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-4">
                <Button variant="neon" size="lg" className="w-full" onClick={() => setTab('form')}>
                  <Play className="w-5 h-5" /> Mulai Verifikasi
                </Button>
                <Button variant="outline" size="lg" className="w-full !border-mangrove-deep !text-mangrove-deep">
                  <Upload className="w-5 h-5" /> Upload Bukti Lapangan
                </Button>
                <Button variant="white" size="lg" className="w-full">
                  <Send className="w-5 h-5" /> Kirim Laporan
                </Button>
              </div>

              {/* Additional Fields */}
              <Card className="mt-8">
                <h3 className="font-bold text-mangrove-deep mb-4">Detail Verifikasi Lapangan</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'GPS Coordinate', value: '-6.8975, 110.6383', icon: <MapPin className="w-4 h-4" /> },
                    { label: 'Foto Sebelum/Sesudah', value: '12 foto', icon: <Camera className="w-4 h-4" /> },
                    { label: 'Timestamp', value: '24 Mei 2024, 09:30 WIB', icon: <Clock className="w-4 h-4" /> },
                    { label: 'Survival Rate', value: '82%', icon: <AlertCircle className="w-4 h-4" /> },
                  ].map((f) => (
                    <div key={f.label} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-2 text-mangrove-fresh mb-1">{f.icon}<span className="text-xs font-medium text-mangrove-muted">{f.label}</span></div>
                      <p className="font-semibold text-sm text-gray-800">{f.value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p className="text-xs font-medium text-mangrove-muted mb-1">Catatan Lapangan</p>
                  <p className="text-sm text-gray-800">Kondisi bibit mangrove baik. Tingkat kelangsungan hidup meningkat dibandingkan monitoring sebelumnya. Air pasang normal.</p>
                </div>
              </Card>
            </>
          )}

          {tab === 'workflow' && (
            <>
              {/* Workflow stats */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <StatCard icon={<ClipboardCheck className="w-5 h-5" />} label="Antrian" value="3" />
                <StatCard icon={<Navigation className="w-5 h-5" />} label="Sedang Proses" value="1" />
                <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Selesai Hari Ini" value="2" />
                <StatCard icon={<Compass className="w-5 h-5" />} label="Lokasi Dikunjungi" value="4" />
              </div>

              {/* Workflow pipeline */}
              <Card className="mb-6">
                <h3 className="font-bold text-mangrove-deep mb-6">Alur Verifikasi Lapangan</h3>

                {/* Pipeline stages */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {['Semua', 'Menunggu', 'Proses', 'Selesai'].map((s) => (
                    <button key={s} className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-mangrove-muted hover:bg-mangrove-neon hover:text-mangrove-deep transition-all whitespace-nowrap">
                      {s}
                    </button>
                  ))}
                </div>

                <Table headers={['ID', 'Proyek', 'Lokasi', 'Tipe', 'Bibit', 'GPS', 'Foto', 'Survival', 'Status', 'Prioritas', 'Deadline', 'Aksi']}>
                  {workflowTasks.map((t) => (
                    <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-3 px-2 text-xs font-mono text-mangrove-muted">{t.id}</td>
                      <td className="py-3 px-2 font-medium text-gray-800 text-sm">{t.project}</td>
                      <td className="py-3 px-2 text-xs text-mangrove-muted">{t.loc}</td>
                      <td className="py-3 px-2 text-xs text-mangrove-muted">{t.type}</td>
                      <td className="py-3 px-2 text-xs text-mangrove-muted">{t.bibit}</td>
                      <td className="py-3 px-2 text-xs font-mono text-mangrove-muted">{t.gps}</td>
                      <td className="py-3 px-2 text-xs text-mangrove-muted">{t.photos}</td>
                      <td className="py-3 px-2 text-xs font-semibold text-mangrove-deep">{t.survivalRate}</td>
                      <td className="py-3 px-2"><Badge variant={t.badge}>{t.status}</Badge></td>
                      <td className="py-3 px-2">
                        <span className={`text-xs font-semibold ${t.priority === 'Tinggi' ? 'text-red-500' : t.priority === 'Sedang' ? 'text-amber-500' : 'text-gray-400'}`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-xs text-mangrove-muted">{t.deadline}</td>
                      <td className="py-3 px-2">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="!text-mangrove-fresh !px-2"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="sm" className="!text-blue-500 !px-2"><Play className="w-4 h-4" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </Table>
              </Card>

              {/* Workflow detail + history */}
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-mangrove-fresh" /> Detail Tugas — VRF-0405-001
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Proyek', value: 'Desa Timbulsloko' },
                      { label: 'Lokasi', value: 'Demak, Jawa Tengah' },
                      { label: 'Tipe', value: 'Verifikasi Penanaman' },
                      { label: 'Bibit Dilaporkan', value: '180.000' },
                      { label: 'GPS', value: '-6.8975, 110.6383' },
                      { label: 'Deadline', value: '26 Mei 2024' },
                    ].map((d) => (
                      <div key={d.label} className="flex justify-between py-2 border-b border-gray-50">
                        <span className="text-sm text-mangrove-muted">{d.label}</span>
                        <span className="text-sm font-semibold text-gray-800">{d.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <p className="text-xs font-semibold text-amber-700 mb-1">Catatan Admin</p>
                    <p className="text-sm text-amber-800">Prioritas tinggi — verifikasi harus selesai sebelum deadline. Pastikan foto zona A3 lengkap.</p>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button variant="neon" size="md" className="flex-1" onClick={() => setTab('form')}>
                      <Play className="w-4 h-4" /> Mulai Verifikasi
                    </Button>
                    <Button variant="outline" size="md" className="!border-mangrove-deep !text-mangrove-deep">
                      <MapPin className="w-4 h-4" /> Navigasi
                    </Button>
                  </div>
                </Card>

                <Card>
                  <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-mangrove-fresh" /> Riwayat Verifikasi
                  </h3>
                  <div className="space-y-3">
                    {verificationHistory.map((h) => (
                      <div key={h.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-mangrove-muted">{h.id}</span>
                            <Badge variant={h.badge}>{h.result}</Badge>
                          </div>
                          <p className="text-sm font-semibold text-gray-800 mt-1">{h.project}</p>
                          <p className="text-xs text-mangrove-muted">{h.date}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="!text-mangrove-fresh">
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </>
          )}

          {tab === 'form' && (
            <div className="grid grid-cols-12 gap-6">
              <Card className="col-span-7">
                <h3 className="font-bold text-mangrove-deep text-lg mb-6 flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-mangrove-fresh" /> Form Verifikasi Lapangan
                </h3>
                <VerificationForm />
              </Card>
              <div className="col-span-5 space-y-6">
                <Card>
                  <h3 className="font-bold text-mangrove-deep mb-4">Checklist Verifikasi</h3>
                  <div className="space-y-3">
                    {[
                      { text: 'Koordinat GPS diambil dari lokasi', checked: true },
                      { text: 'Foto sebelum/sesudah penanaman (min 4)', checked: false },
                      { text: 'Hitung jumlah bibit di area sample', checked: false },
                      { text: 'Ukur survival rate di 3 titik sample', checked: false },
                      { text: 'Catat kondisi air dan pasang surut', checked: true },
                      { text: 'Interview kelompok pengelola', checked: false },
                      { text: 'Dokumentasi infrastruktur pendukung', checked: false },
                    ].map((c, i) => (
                      <label key={i} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" defaultChecked={c.checked} className="w-4 h-4 rounded border-gray-300 text-mangrove-fresh focus:ring-mangrove-fresh/30" />
                        <span className="text-sm text-gray-800 group-hover:text-mangrove-deep">{c.text}</span>
                      </label>
                    ))}
                  </div>
                </Card>

                <Card>
                  <h3 className="font-bold text-mangrove-deep mb-4">Lokasi Tugas</h3>
                  <MangroveMap
                    className="h-48"
                    showControls
                    pins={[{ x: 28, y: 52, label: 'Demak' }]}
                  />
                  <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-mangrove-muted">Koordinat Target</p>
                    <p className="font-mono text-sm text-mangrove-deep">-6.8975, 110.6383</p>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

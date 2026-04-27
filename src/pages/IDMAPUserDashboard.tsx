import { useState } from 'react';
import {
  Home, Award,
  DollarSign, TreePine, Wind, Hash, Eye, Download, CheckCircle2,
  QrCode, MapPin, Upload, Camera, Send, User, Mail, Phone, Calendar
} from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardTopbar from '../components/DashboardTopbar';
import StatCard from '../components/ui/StatCard';
import Card from '../components/ui/Card';
import ProgressBar from '../components/ui/ProgressBar';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import menuItems from './user/userMenuItems';

const contributions = [
  { method: 'Donasi via QRIS', date: '24 Mei 2024', amount: 'Rp 250.000' },
  { method: 'Donasi via QRIS', date: '10 Mei 2024', amount: 'Rp 300.000' },
  { method: 'Donasi via QRIS', date: '2 Mei 2024', amount: 'Rp 200.000' },
  { method: 'Donasi via QRIS', date: '20 Apr 2024', amount: 'Rp 500.000' },
];

const programOptions = [
  { name: 'Restorasi Teluk Bintuni', loc: 'Papua Barat' },
  { name: 'Desa Timbulsloko', loc: 'Demak, Jawa Tengah' },
  { name: 'TN Sembilang', loc: 'Sumatera Selatan' },
  { name: 'Kecamatan Kwandang', loc: 'Gorontalo Utara' },
];

/* ─── Form components ─── */
function ContributionForm() {
  const [amount, setAmount] = useState('');
  const [program, setProgram] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const presets = ['50.000', '100.000', '250.000', '500.000'];

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-mangrove-fresh/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-mangrove-fresh" />
        </div>
        <h3 className="font-bold text-mangrove-deep text-lg mb-2">Terima Kasih!</h3>
        <p className="text-sm text-mangrove-muted mb-4">Kontribusi Anda sebesar Rp {amount || '0'} telah diterima.</p>
        <Button variant="ghost" size="sm" onClick={() => { setSubmitted(false); setAmount(''); }}>Donasi Lagi</Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-semibold text-mangrove-deep mb-2">Pilih Program</label>
        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh focus:ring-1 focus:ring-mangrove-fresh/30 outline-none"
        >
          <option value="">-- Pilih program restorasi --</option>
          {programOptions.map((p) => (
            <option key={p.name} value={p.name}>{p.name} — {p.loc}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-mangrove-deep mb-2">Jumlah Donasi (Rp)</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setAmount(p)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                amount === p
                  ? 'bg-mangrove-neon text-mangrove-deep'
                  : 'bg-gray-50 text-mangrove-muted border border-gray-200 hover:border-mangrove-fresh/30'
              }`}
            >
              Rp {p}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Atau masukkan jumlah lain..."
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh focus:ring-1 focus:ring-mangrove-fresh/30 outline-none"
        />
      </div>

      <div className="bg-mangrove-mint/50 rounded-xl p-4 border border-mangrove-fresh/10">
        <div className="flex items-center gap-3 mb-3">
          <QrCode className="w-8 h-8 text-mangrove-deep" />
          <div>
            <p className="font-semibold text-sm text-mangrove-deep">Pembayaran via QRIS</p>
            <p className="text-xs text-mangrove-muted">Scan QR code untuk menyelesaikan pembayaran</p>
          </div>
        </div>
        <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center mx-auto border border-gray-100">
          <QrCode className="w-20 h-20 text-mangrove-deep" />
        </div>
      </div>

      <Button variant="neon" size="md" className="w-full" onClick={() => amount && setSubmitted(true)}>
        <DollarSign className="w-4 h-4" /> Konfirmasi Donasi
      </Button>
    </div>
  );
}

function FieldReportForm() {
  const [reportSubmitted, setReportSubmitted] = useState(false);

  if (reportSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-mangrove-fresh/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-mangrove-fresh" />
        </div>
        <h3 className="font-bold text-mangrove-deep text-lg mb-2">Laporan Terkirim!</h3>
        <p className="text-sm text-mangrove-muted mb-4">Laporan lapangan Anda telah diterima dan akan diverifikasi.</p>
        <Button variant="ghost" size="sm" onClick={() => setReportSubmitted(false)}>Kirim Laporan Baru</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-mangrove-deep mb-2">Lokasi Program</label>
        <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh focus:ring-1 focus:ring-mangrove-fresh/30 outline-none">
          <option>Restorasi Teluk Bintuni — Papua Barat</option>
          <option>Desa Timbulsloko — Demak</option>
          <option>TN Sembilang — Sumatera Selatan</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-mangrove-deep mb-2">Latitude</label>
          <input type="text" defaultValue="-2.12345" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh focus:ring-1 focus:ring-mangrove-fresh/30 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-mangrove-deep mb-2">Longitude</label>
          <input type="text" defaultValue="132.98765" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh focus:ring-1 focus:ring-mangrove-fresh/30 outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-mangrove-deep mb-2">Jumlah Bibit Ditanam</label>
        <input type="number" defaultValue="50" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh focus:ring-1 focus:ring-mangrove-fresh/30 outline-none" />
      </div>

      <div>
        <label className="block text-xs font-semibold text-mangrove-deep mb-2">Jenis Mangrove</label>
        <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh focus:ring-1 focus:ring-mangrove-fresh/30 outline-none">
          <option>Rhizophora mucronata</option>
          <option>Avicennia marina</option>
          <option>Sonneratia alba</option>
          <option>Bruguiera gymnorhiza</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-mangrove-deep mb-2">Kondisi Lapangan</label>
        <textarea
          rows={3}
          defaultValue="Kondisi bibit baik. Tingkat kelangsungan hidup tinggi. Air pasang normal."
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh focus:ring-1 focus:ring-mangrove-fresh/30 outline-none resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-mangrove-deep mb-2">Upload Foto Lapangan</label>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-mangrove-fresh/30 transition-colors cursor-pointer">
          <Camera className="w-8 h-8 text-mangrove-muted mx-auto mb-2" />
          <p className="text-xs text-mangrove-muted">Klik atau seret foto ke sini</p>
          <p className="text-[10px] text-gray-400 mt-1">JPG, PNG — maks 10 MB</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" size="md" className="w-full !border-mangrove-deep !text-mangrove-deep">
          <Upload className="w-4 h-4" /> Simpan Draft
        </Button>
        <Button variant="neon" size="md" className="w-full" onClick={() => setReportSubmitted(true)}>
          <Send className="w-4 h-4" /> Kirim Laporan
        </Button>
      </div>
    </div>
  );
}

function ProfileForm() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-mangrove-deep to-mangrove-teal rounded-full flex items-center justify-center">
          <User className="w-7 h-7 text-mangrove-neon" />
        </div>
        <div>
          <h3 className="font-bold text-mangrove-deep">Andi Pratama</h3>
          <p className="text-xs text-mangrove-muted">Kontributor sejak April 2024</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-mangrove-deep mb-2 flex items-center gap-1"><User className="w-3 h-3" /> Nama Lengkap</label>
          <input type="text" defaultValue="Andi Pratama" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh focus:ring-1 focus:ring-mangrove-fresh/30 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-mangrove-deep mb-2 flex items-center gap-1"><Mail className="w-3 h-3" /> Email</label>
          <input type="email" defaultValue="andi@example.com" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh focus:ring-1 focus:ring-mangrove-fresh/30 outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-mangrove-deep mb-2 flex items-center gap-1"><Phone className="w-3 h-3" /> Telepon</label>
          <input type="tel" defaultValue="+62 812 3456 7890" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh focus:ring-1 focus:ring-mangrove-fresh/30 outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-mangrove-deep mb-2 flex items-center gap-1"><Calendar className="w-3 h-3" /> Tanggal Lahir</label>
          <input type="date" defaultValue="1995-06-15" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh focus:ring-1 focus:ring-mangrove-fresh/30 outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-mangrove-deep mb-2 flex items-center gap-1"><MapPin className="w-3 h-3" /> Alamat</label>
        <textarea
          rows={2}
          defaultValue="Jl. Mangrove Indah No. 42, Jakarta Utara"
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh focus:ring-1 focus:ring-mangrove-fresh/30 outline-none resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-mangrove-deep mb-2">Peran</label>
        <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 focus:border-mangrove-fresh focus:ring-1 focus:ring-mangrove-fresh/30 outline-none">
          <option>Kontributor Individual</option>
          <option>Teknisi Mangrove</option>
          <option>CSR Perusahaan</option>
          <option>Komunitas</option>
        </select>
      </div>

      <Button variant="neon" size="md" className="w-full">
        <CheckCircle2 className="w-4 h-4" /> Simpan Profil
      </Button>
    </div>
  );
}

/* ─── main dashboard ─── */
export default function IDMAPUserDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'contribute' | 'report' | 'profile'>('overview');

  return (
    <div className="min-h-screen bg-mangrove-mint">
      <DashboardSidebar variant="user" menuItems={menuItems} />

      <div className="ml-64">
        <DashboardTopbar placeholder="Cari..." userName="Andi" userRole="Kontributor" />

        <main className="p-8">
          {/* Greeting */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-mangrove-deep">Halo, Andi 👋</h1>
            <p className="text-sm text-mangrove-muted mt-1">Terima kasih telah berkontribusi untuk pesisir Indonesia!</p>
          </div>

          {/* Tab navigation */}
          <div className="flex gap-2 mb-8 bg-white rounded-xl p-1.5 border border-gray-100 w-fit">
            {[
              { key: 'overview' as const, label: 'Ringkasan', icon: <Home className="w-4 h-4" /> },
              { key: 'contribute' as const, label: 'Donasi Baru', icon: <DollarSign className="w-4 h-4" /> },
              { key: 'report' as const, label: 'Laporan Lapangan', icon: <TreePine className="w-4 h-4" /> },
              { key: 'profile' as const, label: 'Profil', icon: <User className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-mangrove-neon text-mangrove-deep'
                    : 'text-mangrove-muted hover:bg-gray-50'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'overview' && (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <StatCard icon={<DollarSign className="w-5 h-5" />} label="Total Kontribusi" value="Rp 1.250.000" />
                <StatCard icon={<TreePine className="w-5 h-5" />} label="Bibit yang Didukung" value="25 Pohon" />
                <StatCard icon={<Wind className="w-5 h-5" />} label="Serapan Karbon" value="12,5 ton CO₂e" />
                <StatCard icon={<Hash className="w-5 h-5" />} label="Peringkat Anda" value="#128" delta="Kontributor Aktif" />
              </div>

              <div className="grid grid-cols-12 gap-6 mb-8">
                {/* Program Card */}
                <Card className="col-span-7">
                  <h3 className="font-bold text-mangrove-deep mb-5">Program yang Anda Dukung</h3>
                  <div className="flex gap-6">
                    <div className="w-56 h-48 bg-gradient-to-br from-mangrove-deep to-mangrove-teal rounded-xl flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                      <TreePine className="w-12 h-12 text-mangrove-neon/30" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <p className="text-white text-xs font-semibold">Restorasi Teluk Bintuni</p>
                        <p className="text-gray-300 text-[10px]">Papua Barat</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="green">Aktif</Badge>
                        <span className="text-xs text-mangrove-muted">Papua Barat</span>
                      </div>
                      <ProgressBar value={75} className="mb-4" />
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-3 bg-gray-50 rounded-xl">
                          <p className="text-lg font-bold text-mangrove-deep">10</p>
                          <p className="text-[10px] text-mangrove-muted">Bibit Didukung</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-xl">
                          <p className="text-lg font-bold text-mangrove-deep">5,2 ton</p>
                          <p className="text-[10px] text-mangrove-muted">CO₂e</p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-xl">
                          <p className="text-lg font-bold text-mangrove-deep">Rp 500.000</p>
                          <p className="text-[10px] text-mangrove-muted">Total Kontribusi</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="neon" size="sm">Lihat Detail</Button>
                        <Button variant="ghost" size="sm">Lihat Semua</Button>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Impact Panel */}
                <div className="col-span-5 space-y-6">
                  <Card>
                    <h3 className="font-bold text-mangrove-deep mb-4">Dampak Anda</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Pohon Hidup', value: '23' },
                        { label: 'Pertumbuhan Rata-rata', value: '78%' },
                        { label: 'Update Terakhir', value: '24 Mei 2024' },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-50">
                          <span className="text-sm text-mangrove-muted">{item.label}</span>
                          <span className="text-sm font-semibold text-gray-800">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="mt-4 w-full !border-mangrove-deep !text-mangrove-deep">
                      <Eye className="w-4 h-4" /> Lihat Monitoring
                    </Button>
                  </Card>

                  <Card className="!bg-gradient-to-br !from-mangrove-deep !to-mangrove-teal !text-white !border-none">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-mangrove-neon/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <TreePine className="w-5 h-5 text-mangrove-neon" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-1">Adopt a Mangrove</h4>
                        <div className="space-y-1 text-xs">
                          <p><span className="text-gray-400">Lat:</span> <span className="text-mangrove-neon">-2.12345</span></p>
                          <p><span className="text-gray-400">Long:</span> <span className="text-mangrove-neon">132.98765</span></p>
                          <div className="flex items-center gap-1 mt-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-mangrove-fresh" />
                            <span className="text-mangrove-fresh font-medium">Terverifikasi</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Contribution History */}
              <div className="grid grid-cols-12 gap-6">
                <Card className="col-span-7">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-mangrove-deep">Riwayat Kontribusi</h3>
                    <Button variant="ghost" size="sm" className="!text-mangrove-fresh">Lihat Semua</Button>
                  </div>
                  <Table headers={['Metode', 'Tanggal', 'Jumlah']}>
                    {contributions.map((c, i) => (
                      <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-mangrove-fresh/10 rounded-lg flex items-center justify-center">
                              <DollarSign className="w-4 h-4 text-mangrove-fresh" />
                            </div>
                            <span className="text-sm font-medium text-gray-800">{c.method}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-mangrove-muted">{c.date}</td>
                        <td className="py-3 px-4 text-sm font-semibold text-mangrove-deep">{c.amount}</td>
                      </tr>
                    ))}
                  </Table>
                </Card>

                {/* Certificate */}
                <Card className="col-span-5">
                  <h3 className="font-bold text-mangrove-deep mb-4">Sertifikat Terbaru</h3>
                  <div className="border-2 border-dashed border-mangrove-fresh/30 rounded-xl p-6 text-center bg-mangrove-mint/50">
                    <div className="w-full h-36 bg-gradient-to-br from-mangrove-deep to-mangrove-teal rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                      <Award className="w-12 h-12 text-mangrove-neon/40" />
                      <div className="absolute top-2 left-2 right-2">
                        <p className="text-[8px] text-mangrove-neon/60 uppercase tracking-widest">Sertifikat</p>
                      </div>
                      <div className="absolute bottom-2 left-0 right-0 text-center">
                        <p className="text-xs font-bold text-white">SERTIFIKAT</p>
                        <p className="text-[10px] text-gray-300">Kontribusi Restorasi Mangrove</p>
                      </div>
                    </div>
                    <p className="font-semibold text-mangrove-deep">Andi Pratama</p>
                    <p className="text-xs text-mangrove-muted mt-1 mb-4">Kontributor Restorasi Mangrove Indonesia</p>
                    <Button variant="neon" size="sm" className="w-full">
                      <Download className="w-4 h-4" /> Unduh Sertifikat
                    </Button>
                  </div>
                </Card>
              </div>
            </>
          )}

          {activeTab === 'contribute' && (
            <div className="grid grid-cols-12 gap-6">
              <Card className="col-span-7">
                <h3 className="font-bold text-mangrove-deep text-lg mb-6 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-mangrove-fresh" /> Form Donasi Baru
                </h3>
                <ContributionForm />
              </Card>
              <div className="col-span-5 space-y-6">
                <Card>
                  <h3 className="font-bold text-mangrove-deep mb-4">Ringkasan Kontribusi</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-mangrove-muted">Total Donasi</span>
                      <span className="text-sm font-bold text-mangrove-deep">Rp 1.250.000</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-mangrove-muted">Jumlah Transaksi</span>
                      <span className="text-sm font-bold text-mangrove-deep">4 kali</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-mangrove-muted">Program Didukung</span>
                      <span className="text-sm font-bold text-mangrove-deep">1 program</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-mangrove-muted">Peringkat</span>
                      <span className="text-sm font-bold text-mangrove-fresh">#128</span>
                    </div>
                  </div>
                </Card>
                <Card className="!bg-gradient-to-br !from-mangrove-deep !to-mangrove-teal !text-white !border-none">
                  <h4 className="font-bold text-sm mb-3">Dampak Donasi Anda</h4>
                  <div className="space-y-2 text-xs">
                    <p className="text-gray-300">Setiap <span className="text-mangrove-neon font-bold">Rp 50.000</span> mendanai:</p>
                    <div className="flex items-center gap-2">
                      <TreePine className="w-4 h-4 text-mangrove-neon" />
                      <span>2 bibit mangrove ditanam</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-mangrove-neon" />
                      <span>1 ton CO₂e diserap/tahun</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-mangrove-neon" />
                      <span>0,5 m² lahan dipulihkan</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'report' && (
            <div className="grid grid-cols-12 gap-6">
              <Card className="col-span-7">
                <h3 className="font-bold text-mangrove-deep text-lg mb-6 flex items-center gap-2">
                  <TreePine className="w-5 h-5 text-mangrove-fresh" /> Laporan Lapangan Mangrove
                </h3>
                <FieldReportForm />
              </Card>
              <div className="col-span-5 space-y-6">
                <Card>
                  <h3 className="font-bold text-mangrove-deep mb-4">Panduan Laporan</h3>
                  <div className="space-y-3">
                    {[
                      { step: '1', text: 'Pilih lokasi program yang akan dilaporkan' },
                      { step: '2', text: 'Masukkan koordinat GPS dari lokasi penanaman' },
                      { step: '3', text: 'Catat jumlah dan jenis bibit yang ditanam' },
                      { step: '4', text: 'Upload foto sebelum dan sesudah penanaman' },
                      { step: '5', text: 'Tambahkan catatan kondisi lapangan' },
                    ].map((g) => (
                      <div key={g.step} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-mangrove-neon/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-mangrove-deep">{g.step}</span>
                        </div>
                        <p className="text-sm text-mangrove-muted">{g.text}</p>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card>
                  <h3 className="font-bold text-mangrove-deep mb-4">Laporan Terakhir</h3>
                  <div className="space-y-3">
                    {[
                      { loc: 'Teluk Bintuni', date: '24 Mei 2024', status: 'Terverifikasi', badge: 'green' as const },
                      { loc: 'Desa Timbulsloko', date: '18 Mei 2024', status: 'Proses', badge: 'blue' as const },
                    ].map((r) => (
                      <div key={r.loc} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{r.loc}</p>
                          <p className="text-xs text-mangrove-muted">{r.date}</p>
                        </div>
                        <Badge variant={r.badge}>{r.status}</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="grid grid-cols-12 gap-6">
              <Card className="col-span-7">
                <h3 className="font-bold text-mangrove-deep text-lg mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-mangrove-fresh" /> Pengaturan Profil
                </h3>
                <ProfileForm />
              </Card>
              <div className="col-span-5 space-y-6">
                <Card>
                  <h3 className="font-bold text-mangrove-deep mb-4">Status Akun</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-mangrove-muted">Status</span>
                      <Badge variant="green">Aktif</Badge>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-mangrove-muted">Terdaftar</span>
                      <span className="text-sm font-semibold text-gray-800">April 2024</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-sm text-mangrove-muted">Level</span>
                      <span className="text-sm font-semibold text-mangrove-fresh">Kontributor Aktif</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-mangrove-muted">Sertifikat</span>
                      <span className="text-sm font-bold text-mangrove-deep">1 diterbitkan</span>
                    </div>
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

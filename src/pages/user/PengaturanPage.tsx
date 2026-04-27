import { useState } from 'react';
import {
  Settings, User, Lock, Bell, Globe, Shield, Palette, LogOut,
  Save, Camera, Mail, Phone, MapPin, Calendar, Eye, EyeOff, CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardTopbar from '../../components/DashboardTopbar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import menuItems from './userMenuItems';

interface ToggleProps {
  label: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
}

function Toggle({ label, desc, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-mangrove-deep">{label}</p>
        <p className="text-xs text-mangrove-muted">{desc}</p>
      </div>
      <button
        onClick={onChange}
        className={`w-11 h-6 rounded-full transition-all relative ${checked ? 'bg-mangrove-fresh' : 'bg-gray-300'}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5.5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  );
}

export default function PengaturanPage() {
  const [activeSection, setActiveSection] = useState<'profil' | 'keamanan' | 'notif' | 'tampilan'>('profil');
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [notifSettings, setNotifSettings] = useState({
    email: true,
    push: true,
    program: true,
    donasi: true,
    sertifikat: true,
    system: false,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleNotif = (key: keyof typeof notifSettings) => {
    setNotifSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    { key: 'profil' as const, label: 'Profil', icon: <User className="w-4 h-4" /> },
    { key: 'keamanan' as const, label: 'Keamanan', icon: <Lock className="w-4 h-4" /> },
    { key: 'notif' as const, label: 'Notifikasi', icon: <Bell className="w-4 h-4" /> },
    { key: 'tampilan' as const, label: 'Tampilan', icon: <Palette className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-mangrove-mint">
      <DashboardSidebar variant="user" menuItems={menuItems} />
      <div className="ml-64">
        <DashboardTopbar placeholder="Cari pengaturan..." userName="Andi" userRole="Kontributor" />
        <main className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-mangrove-deep">Pengaturan</h1>
              <p className="text-sm text-mangrove-muted mt-1">Kelola akun, privasi, dan preferensi Anda.</p>
            </div>
            {saved && (
              <div className="flex items-center gap-2 text-mangrove-fresh bg-mangrove-neon/10 px-4 py-2 rounded-xl">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm font-medium">Perubahan disimpan!</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left sidebar nav */}
            <div className="col-span-3 space-y-1">
              {sections.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                    activeSection === s.key
                      ? 'bg-mangrove-neon text-mangrove-deep'
                      : 'text-mangrove-muted hover:bg-white'
                  }`}
                >
                  {s.icon} {s.label}
                </button>
              ))}

              {/* Quick links */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs text-mangrove-muted px-4 mb-2 font-semibold">Akses Cepat</p>
                <Link
                  to="/admin"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-mangrove-muted hover:bg-white transition-all"
                >
                  <Shield className="w-4 h-4" /> Dashboard Admin <ExternalLink className="w-3 h-3 ml-auto" />
                </Link>
                <Link
                  to="/verifikator"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-mangrove-muted hover:bg-white transition-all"
                >
                  <Globe className="w-4 h-4" /> Dashboard Verifikator <ExternalLink className="w-3 h-3 ml-auto" />
                </Link>
              </div>

              <div className="mt-4">
                <Link
                  to="/"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut className="w-4 h-4" /> Keluar
                </Link>
              </div>
            </div>

            {/* Right content */}
            <div className="col-span-9">
              {/* Profile */}
              {activeSection === 'profil' && (
                <div className="space-y-6">
                  <Card>
                    <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-mangrove-fresh" /> Informasi Profil
                    </h3>

                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-mangrove-deep to-mangrove-teal rounded-2xl flex items-center justify-center text-mangrove-neon text-2xl font-bold">
                        AP
                      </div>
                      <div>
                        <p className="font-bold text-mangrove-deep">Andi Pratama</p>
                        <p className="text-sm text-mangrove-muted">Kontributor sejak Januari 2024</p>
                        <button className="flex items-center gap-1 text-xs text-mangrove-fresh mt-1 hover:underline">
                          <Camera className="w-3 h-3" /> Ganti foto
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-mangrove-deep mb-1">Nama Lengkap</label>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200">
                          <User className="w-4 h-4 text-mangrove-muted" />
                          <input type="text" defaultValue="Andi Pratama" className="bg-transparent flex-1 text-sm outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-mangrove-deep mb-1">Email</label>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200">
                          <Mail className="w-4 h-4 text-mangrove-muted" />
                          <input type="email" defaultValue="andi.pratama@email.com" className="bg-transparent flex-1 text-sm outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-mangrove-deep mb-1">Telepon</label>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200">
                          <Phone className="w-4 h-4 text-mangrove-muted" />
                          <input type="tel" defaultValue="+62 812-3456-7890" className="bg-transparent flex-1 text-sm outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-mangrove-deep mb-1">Lokasi</label>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200">
                          <MapPin className="w-4 h-4 text-mangrove-muted" />
                          <input type="text" defaultValue="Jakarta, Indonesia" className="bg-transparent flex-1 text-sm outline-none" />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-mangrove-deep mb-1">Tanggal Lahir</label>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200">
                          <Calendar className="w-4 h-4 text-mangrove-muted" />
                          <input type="date" defaultValue="1995-08-15" className="bg-transparent flex-1 text-sm outline-none" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button variant="neon" size="md" onClick={handleSave}>
                        <Save className="w-4 h-4" /> Simpan Perubahan
                      </Button>
                    </div>
                  </Card>

                  <Card>
                    <h3 className="font-bold text-mangrove-deep mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-mangrove-fresh" /> Akun
                    </h3>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <p className="text-sm font-medium text-mangrove-deep">ID Pengguna</p>
                        <p className="text-xs text-mangrove-muted font-mono">USR-2024-08152</p>
                      </div>
                      <Badge variant="green">Terverifikasi</Badge>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <p className="text-sm font-medium text-mangrove-deep">Peran</p>
                        <p className="text-xs text-mangrove-muted">Kontributor</p>
                      </div>
                      <Badge variant="green">Aktif</Badge>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium text-mangrove-deep">Bergabung</p>
                        <p className="text-xs text-mangrove-muted">15 Januari 2024</p>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* Security */}
              {activeSection === 'keamanan' && (
                <div className="space-y-6">
                  <Card>
                    <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-mangrove-fresh" /> Ubah Kata Sandi
                    </h3>
                    <div className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-mangrove-deep mb-1">Kata Sandi Saat Ini</label>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200">
                          <Lock className="w-4 h-4 text-mangrove-muted" />
                          <input type={showPassword ? 'text' : 'password'} defaultValue="currentpassword" className="bg-transparent flex-1 text-sm outline-none" />
                          <button onClick={() => setShowPassword(!showPassword)} className="text-mangrove-muted">
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-mangrove-deep mb-1">Kata Sandi Baru</label>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200">
                          <Lock className="w-4 h-4 text-mangrove-muted" />
                          <input type="password" placeholder="Masukkan kata sandi baru" className="bg-transparent flex-1 text-sm outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-mangrove-deep mb-1">Konfirmasi Kata Sandi Baru</label>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200">
                          <Lock className="w-4 h-4 text-mangrove-muted" />
                          <input type="password" placeholder="Ulangi kata sandi baru" className="bg-transparent flex-1 text-sm outline-none" />
                        </div>
                      </div>
                      <Button variant="neon" size="md" onClick={handleSave}>
                        <Save className="w-4 h-4" /> Ubah Kata Sandi
                      </Button>
                    </div>
                  </Card>

                  <Card>
                    <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-mangrove-fresh" /> Autentikasi Dua Faktor
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-mangrove-deep">Status 2FA</p>
                        <p className="text-xs text-mangrove-muted">Tambahkan lapisan keamanan ekstra pada akun Anda.</p>
                      </div>
                      <Button variant="ghost" size="sm">Aktifkan 2FA</Button>
                    </div>
                  </Card>

                  <Card>
                    <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-mangrove-fresh" /> Sesi Aktif
                    </h3>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <p className="text-sm font-medium text-mangrove-deep">Chrome — Windows</p>
                        <p className="text-xs text-mangrove-muted">Jakarta, Indonesia · Aktif sekarang</p>
                      </div>
                      <Badge variant="green">Sesi ini</Badge>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium text-mangrove-deep">Safari — iPhone</p>
                        <p className="text-xs text-mangrove-muted">Jakarta, Indonesia · 2 hari lalu</p>
                      </div>
                      <Button variant="ghost" size="sm" className="!text-red-500">Akhiri</Button>
                    </div>
                  </Card>
                </div>
              )}

              {/* Notification preferences */}
              {activeSection === 'notif' && (
                <Card>
                  <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-mangrove-fresh" /> Preferensi Notifikasi
                  </h3>
                  <div className="space-y-1">
                    <Toggle label="Notifikasi Email" desc="Terima pembaruan melalui email" checked={notifSettings.email} onChange={() => toggleNotif('email')} />
                    <Toggle label="Push Notification" desc="Notifikasi browser dan perangkat mobile" checked={notifSettings.push} onChange={() => toggleNotif('push')} />
                    <Toggle label="Update Program" desc="Pembaruan terkait program yang Anda dukung" checked={notifSettings.program} onChange={() => toggleNotif('program')} />
                    <Toggle label="Konfirmasi Donasi" desc="Pemberitahuan saat donasi berhasil diproses" checked={notifSettings.donasi} onChange={() => toggleNotif('donasi')} />
                    <Toggle label="Sertifikat Baru" desc="Notifikasi saat sertifikat baru diterbitkan" checked={notifSettings.sertifikat} onChange={() => toggleNotif('sertifikat')} />
                    <Toggle label="Pengumuman Sistem" desc="Update fitur baru dan pemeliharaan platform" checked={notifSettings.system} onChange={() => toggleNotif('system')} />
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button variant="neon" size="md" onClick={handleSave}>
                      <Save className="w-4 h-4" /> Simpan Preferensi
                    </Button>
                  </div>
                </Card>
              )}

              {/* Appearance */}
              {activeSection === 'tampilan' && (
                <div className="space-y-6">
                  <Card>
                    <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
                      <Palette className="w-5 h-5 text-mangrove-fresh" /> Tampilan
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-mangrove-deep mb-2">Tema</p>
                        <div className="flex gap-3">
                          <button className="w-24 h-16 bg-white rounded-xl border-2 border-mangrove-neon flex items-center justify-center text-xs font-medium text-mangrove-deep">
                            Terang
                          </button>
                          <button className="w-24 h-16 bg-mangrove-deep rounded-xl border-2 border-gray-300 flex items-center justify-center text-xs font-medium text-gray-400">
                            Gelap
                          </button>
                          <button className="w-24 h-16 bg-gradient-to-b from-white to-mangrove-deep rounded-xl border-2 border-gray-300 flex items-center justify-center text-xs font-medium text-mangrove-deep">
                            Otomatis
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-mangrove-deep mb-2">Bahasa</p>
                        <select className="bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200 text-sm w-48 outline-none">
                          <option>Bahasa Indonesia</option>
                          <option>English</option>
                        </select>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-mangrove-fresh" /> Zona Waktu & Regional
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-mangrove-deep mb-2">Zona Waktu</p>
                        <select className="bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200 text-sm w-64 outline-none">
                          <option>Asia/Jakarta (WIB, UTC+7)</option>
                          <option>Asia/Makassar (WITA, UTC+8)</option>
                          <option>Asia/Jayapura (WIT, UTC+9)</option>
                        </select>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-mangrove-deep mb-2">Format Tanggal</p>
                        <select className="bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200 text-sm w-48 outline-none">
                          <option>DD/MM/YYYY</option>
                          <option>MM/DD/YYYY</option>
                          <option>YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

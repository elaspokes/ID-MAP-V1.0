import {
  User, Bell, Shield, MapPin, Camera,
  Save, Key, Globe, Smartphone
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import menuItems from './verifikatorMenuItems';

export default function PengaturanVerifikatorPage() {
  return (
    <DashboardLayout variant="verifikator" menuItems={menuItems} userName="Verifikator" userRole="Field Officer" placeholder="Cari pengaturan...">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-mangrove-deep">Pengaturan</h1>
        <p className="text-sm text-mangrove-muted mt-1">Kelola profil dan preferensi akun verifikator.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <h3 className="font-bold text-mangrove-deep mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-mangrove-fresh" /> Profil Verifikator
          </h3>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-mangrove-deep flex items-center justify-center text-white text-2xl font-bold shrink-0">
              V
            </div>
            <div>
              <p className="font-bold text-mangrove-deep">Bambang Sudirjo</p>
              <p className="text-sm text-mangrove-muted">Field Officer &middot; ID: VRF-042</p>
              <Badge variant="green">Aktif</Badge>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-mangrove-deep mb-2">Nama Lengkap</label>
                <input type="text" defaultValue="Bambang Sudirjo" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-mangrove-fresh" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-mangrove-deep mb-2">Email</label>
                <input type="email" defaultValue="bambang@id-map.co.id" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-mangrove-fresh" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-mangrove-deep mb-2">No. Telepon</label>
                <input type="tel" defaultValue="+62 812 3456 7890" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-mangrove-fresh" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-mangrove-deep mb-2">Wilayah Tugas</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none">
                  <option>Jawa Tengah</option>
                  <option>Jawa Barat</option>
                  <option>Sumatera Selatan</option>
                  <option>Kalimantan Timur</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-mangrove-deep mb-2">Bio</label>
              <textarea rows={3} defaultValue="Verifikator lapangan berpengalaman dengan fokus pada ekosistem mangrove pesisir utara Jawa." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none resize-none focus:border-mangrove-fresh" />
            </div>
            <Button variant="neon" size="md"><Save className="w-4 h-4" /> Simpan Profil</Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="font-bold text-mangrove-deep mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-mangrove-fresh" /> Notifikasi
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Tugas Baru', desc: 'Notifikasi saat ada tugas verifikasi baru', enabled: true },
                { label: 'Deadline Reminder', desc: 'Pengingat 24 jam sebelum deadline', enabled: true },
                { label: 'Hasil Review', desc: 'Notifikasi saat laporan di-review admin', enabled: true },
                { label: 'Update Program', desc: 'Info perubahan program yang ditugaskan', enabled: false },
                { label: 'Pengumuman Sistem', desc: 'Pengumuman dan update platform', enabled: true },
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
          </Card>

          <Card>
            <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-mangrove-fresh" /> Keamanan
            </h3>
            <div className="space-y-3">
              <Button variant="ghost" size="sm" className="w-full justify-start"><Key className="w-4 h-4" /> Ganti Password</Button>
              <Button variant="ghost" size="sm" className="w-full justify-start"><Smartphone className="w-4 h-4" /> Autentikasi 2 Faktor</Button>
              <Button variant="ghost" size="sm" className="w-full justify-start"><Globe className="w-4 h-4" /> Sesi Aktif</Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-mangrove-fresh" /> Pengaturan GPS
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-800">GPS Otomatis</p>
                <p className="text-xs text-mangrove-muted">Ambil koordinat otomatis saat input data</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-10 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-mangrove-fresh/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-mangrove-fresh"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-800">Akurasi Tinggi</p>
                <p className="text-xs text-mangrove-muted">Gunakan GPS akurasi tinggi (baterai lebih boros)</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-10 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-mangrove-fresh/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-mangrove-fresh"></div>
              </label>
            </div>
            <div>
              <label className="block text-xs font-semibold text-mangrove-deep mb-2">Format Koordinat</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none">
                <option>Desimal (DD)</option>
                <option>Derajat Menit Detik (DMS)</option>
              </select>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-bold text-mangrove-deep mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5 text-mangrove-fresh" /> Pengaturan Kamera
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-800">Watermark GPS</p>
                <p className="text-xs text-mangrove-muted">Tambahkan koordinat GPS pada foto</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-10 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-mangrove-fresh/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-mangrove-fresh"></div>
              </label>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-800">Timestamp pada Foto</p>
                <p className="text-xs text-mangrove-muted">Tambahkan tanggal dan waktu pada foto</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-10 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-mangrove-fresh/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-mangrove-fresh"></div>
              </label>
            </div>
            <div>
              <label className="block text-xs font-semibold text-mangrove-deep mb-2">Kualitas Foto</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none">
                <option>Tinggi (Original)</option>
                <option>Sedang (Compressed)</option>
                <option>Rendah (Hemat Data)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-mangrove-deep mb-2">Batas Upload per Sesi</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none">
                <option>20 foto</option>
                <option>50 foto</option>
                <option>Tidak terbatas</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}

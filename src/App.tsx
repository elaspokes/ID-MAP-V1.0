import { Routes, Route } from 'react-router-dom';
import IDMAPLandingPage from './pages/IDMAPLandingPage';
import IDMAPAdminDashboard from './pages/IDMAPAdminDashboard';
import IDMAPVerifikatorDashboard from './pages/IDMAPVerifikatorDashboard';
import IDMAPUserDashboard from './pages/IDMAPUserDashboard';
import TentangPage from './pages/TentangPage';
import PetaMangrovePage from './pages/PetaMangrovePage';
import ProgramPage from './pages/ProgramPage';
import DampakPage from './pages/DampakPage';
import EdukasiPage from './pages/EdukasiPage';
import ProgramSayaPage from './pages/user/ProgramSayaPage';
import KontribusiSayaPage from './pages/user/KontribusiSayaPage';
import DampakSayaPage from './pages/user/DampakSayaPage';
import SertifikatPage from './pages/user/SertifikatPage';
import NotifikasiPage from './pages/user/NotifikasiPage';
import PengaturanPage from './pages/user/PengaturanPage';
import ManajemenPenggunaPage from './pages/admin/ManajemenPenggunaPage';
import ProgramLokasiPage from './pages/admin/ProgramLokasiPage';
import PembayaranPage from './pages/admin/PembayaranPage';
import DataMangrovePage from './pages/admin/DataMangrovePage';
import MonitoringValidasiPage from './pages/admin/MonitoringValidasiPage';
import LaporanAnalitikPage from './pages/admin/LaporanAnalitikPage';
import SertifikatAdminPage from './pages/admin/SertifikatAdminPage';
import PengaturanSistemPage from './pages/admin/PengaturanSistemPage';
import TugasVerifikasiPage from './pages/verifikator/TugasVerifikasiPage';
import VerifikasiLokasiPage from './pages/verifikator/VerifikasiLokasiPage';
import DataLapanganPage from './pages/verifikator/DataLapanganPage';
import LaporanVerifikatorPage from './pages/verifikator/LaporanVerifikatorPage';
import PengaturanVerifikatorPage from './pages/verifikator/PengaturanVerifikatorPage';
import LoginPage from './pages/LoginPage';
import QRISPaymentPage from './pages/QRISPaymentPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IDMAPLandingPage />} />
      <Route path="/tentang" element={<TentangPage />} />
      <Route path="/peta-mangrove" element={<PetaMangrovePage />} />
      <Route path="/program" element={<ProgramPage />} />
      <Route path="/dampak" element={<DampakPage />} />
      <Route path="/edukasi" element={<EdukasiPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/qris" element={<QRISPaymentPage />} />

      {/* Admin Dashboard */}
      <Route path="/admin" element={<IDMAPAdminDashboard />} />
      <Route path="/admin/pengguna" element={<ManajemenPenggunaPage />} />
      <Route path="/admin/program-lokasi" element={<ProgramLokasiPage />} />
      <Route path="/admin/pembayaran" element={<PembayaranPage />} />
      <Route path="/admin/data-mangrove" element={<DataMangrovePage />} />
      <Route path="/admin/monitoring" element={<MonitoringValidasiPage />} />
      <Route path="/admin/laporan" element={<LaporanAnalitikPage />} />
      <Route path="/admin/sertifikat" element={<SertifikatAdminPage />} />
      <Route path="/admin/pengaturan" element={<PengaturanSistemPage />} />

      {/* Verifikator Dashboard */}
      <Route path="/verifikator" element={<IDMAPVerifikatorDashboard />} />
      <Route path="/verifikator/tugas" element={<TugasVerifikasiPage />} />
      <Route path="/verifikator/lokasi" element={<VerifikasiLokasiPage />} />
      <Route path="/verifikator/data-lapangan" element={<DataLapanganPage />} />
      <Route path="/verifikator/laporan" element={<LaporanVerifikatorPage />} />
      <Route path="/verifikator/pengaturan" element={<PengaturanVerifikatorPage />} />

      {/* User Dashboard */}
      <Route path="/user" element={<IDMAPUserDashboard />} />
      <Route path="/user/program" element={<ProgramSayaPage />} />
      <Route path="/user/kontribusi" element={<KontribusiSayaPage />} />
      <Route path="/user/dampak" element={<DampakSayaPage />} />
      <Route path="/user/sertifikat" element={<SertifikatPage />} />
      <Route path="/user/notifikasi" element={<NotifikasiPage />} />
      <Route path="/user/pengaturan" element={<PengaturanPage />} />
    </Routes>
  );
}

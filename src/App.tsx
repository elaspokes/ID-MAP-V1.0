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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IDMAPLandingPage />} />
      <Route path="/tentang" element={<TentangPage />} />
      <Route path="/peta-mangrove" element={<PetaMangrovePage />} />
      <Route path="/program" element={<ProgramPage />} />
      <Route path="/dampak" element={<DampakPage />} />
      <Route path="/edukasi" element={<EdukasiPage />} />
      <Route path="/admin" element={<IDMAPAdminDashboard />} />
      <Route path="/verifikator" element={<IDMAPVerifikatorDashboard />} />
      <Route path="/user" element={<IDMAPUserDashboard />} />
    </Routes>
  );
}

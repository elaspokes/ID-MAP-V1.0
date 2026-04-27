import { Routes, Route } from 'react-router-dom';
import IDMAPLandingPage from './pages/IDMAPLandingPage';
import IDMAPAdminDashboard from './pages/IDMAPAdminDashboard';
import IDMAPVerifikatorDashboard from './pages/IDMAPVerifikatorDashboard';
import IDMAPUserDashboard from './pages/IDMAPUserDashboard';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IDMAPLandingPage />} />
      <Route path="/admin" element={<IDMAPAdminDashboard />} />
      <Route path="/verifikator" element={<IDMAPVerifikatorDashboard />} />
      <Route path="/user" element={<IDMAPUserDashboard />} />
    </Routes>
  );
}

import { LayoutDashboard, ClipboardCheck, MapPin, Database, FileText, Settings } from 'lucide-react';

const verifikatorMenuItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', href: '/verifikator' },
  { icon: <ClipboardCheck className="w-5 h-5" />, label: 'Tugas Verifikasi', href: '/verifikator/tugas' },
  { icon: <MapPin className="w-5 h-5" />, label: 'Verifikasi Lokasi', href: '/verifikator/lokasi' },
  { icon: <Database className="w-5 h-5" />, label: 'Data Lapangan', href: '/verifikator/data-lapangan' },
  { icon: <FileText className="w-5 h-5" />, label: 'Laporan', href: '/verifikator/laporan' },
  { icon: <Settings className="w-5 h-5" />, label: 'Pengaturan', href: '/verifikator/pengaturan' },
];

export default verifikatorMenuItems;

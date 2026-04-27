import { LayoutDashboard, Users, MapPin, CreditCard, TreePine, ClipboardCheck, BarChart3, Award, Settings } from 'lucide-react';

const adminMenuItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', href: '/admin' },
  { icon: <Users className="w-5 h-5" />, label: 'Manajemen Pengguna', href: '/admin/pengguna' },
  { icon: <MapPin className="w-5 h-5" />, label: 'Program & Lokasi', href: '/admin/program-lokasi' },
  { icon: <CreditCard className="w-5 h-5" />, label: 'Pembayaran (QRIS)', href: '/admin/pembayaran' },
  { icon: <TreePine className="w-5 h-5" />, label: 'Data Mangrove', href: '/admin/data-mangrove' },
  { icon: <ClipboardCheck className="w-5 h-5" />, label: 'Monitoring & Validasi', href: '/admin/monitoring' },
  { icon: <BarChart3 className="w-5 h-5" />, label: 'Laporan & Analitik', href: '/admin/laporan' },
  { icon: <Award className="w-5 h-5" />, label: 'Sertifikat', href: '/admin/sertifikat' },
  { icon: <Settings className="w-5 h-5" />, label: 'Pengaturan Sistem', href: '/admin/pengaturan' },
];

export default adminMenuItems;

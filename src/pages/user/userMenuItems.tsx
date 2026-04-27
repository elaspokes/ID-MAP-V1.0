import { Home, FolderOpen, Heart, Leaf, Award, Bell, Settings } from 'lucide-react';

const userMenuItems = [
  { icon: <Home className="w-5 h-5" />, label: 'Beranda', href: '/user' },
  { icon: <FolderOpen className="w-5 h-5" />, label: 'Program Saya', href: '/user/program' },
  { icon: <Heart className="w-5 h-5" />, label: 'Kontribusi Saya', href: '/user/kontribusi' },
  { icon: <Leaf className="w-5 h-5" />, label: 'Dampak Saya', href: '/user/dampak' },
  { icon: <Award className="w-5 h-5" />, label: 'Sertifikat', href: '/user/sertifikat' },
  { icon: <Bell className="w-5 h-5" />, label: 'Notifikasi', href: '/user/notifikasi' },
  { icon: <Settings className="w-5 h-5" />, label: 'Pengaturan', href: '/user/pengaturan' },
];

export default userMenuItems;

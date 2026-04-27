import { type ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { X } from 'lucide-react';
import Logo from './Logo';

interface MenuItem {
  icon: ReactNode;
  label: string;
  href?: string;
}

interface DashboardSidebarProps {
  variant: 'admin' | 'verifikator' | 'user';
  menuItems: MenuItem[];
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const subtitles = {
  admin: 'ADMIN',
  verifikator: 'VERIFIKATOR',
  user: 'USER',
};

export default function DashboardSidebar({ variant, menuItems, mobileOpen, onMobileClose }: DashboardSidebarProps) {
  const location = useLocation();

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onMobileClose} />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-mangrove-deep to-mangrove-teal flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 pb-4 flex items-center justify-between">
          <Logo variant="light" subtitle={subtitles[variant]} />
          <button onClick={onMobileClose} className="lg:hidden p-1 text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = item.href ? location.pathname === item.href : false;
            return (
              <Link
                key={item.label}
                to={item.href || '#'}
                onClick={onMobileClose}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-mangrove-neon text-mangrove-deep shadow-lg shadow-mangrove-neon/20'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-gray-400">&copy; 2024 ID-MAP</p>
        </div>
      </aside>
    </>
  );
}

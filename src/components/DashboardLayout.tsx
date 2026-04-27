import { useState, type ReactNode } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardTopbar from './DashboardTopbar';

interface MenuItem {
  icon: ReactNode;
  label: string;
  href?: string;
}

interface DashboardLayoutProps {
  variant: 'admin' | 'verifikator' | 'user';
  menuItems: MenuItem[];
  userName: string;
  userRole: string;
  placeholder?: string;
  children: ReactNode;
}

export default function DashboardLayout({ variant, menuItems, userName, userRole, placeholder, children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-mangrove-mint">
      <DashboardSidebar
        variant={variant}
        menuItems={menuItems}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />
      <div className="lg:ml-64">
        <DashboardTopbar
          placeholder={placeholder}
          userName={userName}
          userRole={userRole}
          onMenuToggle={() => setSidebarOpen(true)}
        />
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

import { Search, Bell } from 'lucide-react';

interface DashboardTopbarProps {
  placeholder?: string;
  userName: string;
  userRole?: string;
  userAvatar?: string;
}

export default function DashboardTopbar({ placeholder = 'Cari...', userName, userRole }: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex items-center justify-between">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mangrove-fresh/30 focus:border-mangrove-fresh"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-mangrove-fresh rounded-full"></span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-mangrove-deep flex items-center justify-center text-white text-sm font-semibold">
            {userName.charAt(0)}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">{userName}</p>
            {userRole && <p className="text-xs text-mangrove-muted">{userRole}</p>}
          </div>
        </div>
      </div>
    </header>
  );
}

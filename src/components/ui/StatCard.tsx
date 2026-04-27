import { type ReactNode } from 'react';

interface StatCardProps {
  icon?: ReactNode;
  label: string;
  value: string;
  delta?: string;
  glass?: boolean;
  dark?: boolean;
  className?: string;
}

export default function StatCard({ icon, label, value, delta, glass, dark, className = '' }: StatCardProps) {
  const base = dark
    ? 'bg-mangrove-deep/60 backdrop-blur-md border-mangrove-teal/30 text-white'
    : glass
      ? 'bg-white/10 backdrop-blur-md border-white/10 text-white'
      : 'bg-white border-gray-100 text-gray-900';

  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${base} ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          {icon && <div className="mb-2 text-mangrove-fresh">{icon}</div>}
          <p className={`text-sm ${dark || glass ? 'text-gray-300' : 'text-mangrove-muted'}`}>{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          {delta && (
            <span className="text-xs font-medium text-mangrove-fresh mt-1 inline-block">
              {delta}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

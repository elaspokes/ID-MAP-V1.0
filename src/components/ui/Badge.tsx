import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'green' | 'yellow' | 'red' | 'blue' | 'gray' | 'neon';
  className?: string;
}

export default function Badge({ children, variant = 'green', className = '' }: BadgeProps) {
  const variants = {
    green: 'bg-emerald-100 text-emerald-700',
    yellow: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
    blue: 'bg-blue-100 text-blue-700',
    gray: 'bg-gray-100 text-gray-600',
    neon: 'bg-mangrove-neon/20 text-mangrove-deep',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

import { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
  dark?: boolean;
}

export default function Card({ children, className = '', glass, dark }: CardProps) {
  const base = dark
    ? 'bg-mangrove-deep/80 border-mangrove-teal/30 text-white'
    : glass
      ? 'bg-white/10 backdrop-blur-md border-white/10 text-white'
      : 'bg-white border-gray-100 text-gray-900';

  return (
    <div className={`rounded-2xl border p-6 shadow-sm ${base} ${className}`}>
      {children}
    </div>
  );
}

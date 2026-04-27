import { type ReactNode, type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'neon' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ children, variant = 'neon', size = 'md', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer';

  const variants = {
    neon: 'bg-mangrove-neon text-mangrove-deep hover:bg-mangrove-neon/90 shadow-lg shadow-mangrove-neon/20',
    outline: 'border-2 border-mangrove-neon text-mangrove-neon hover:bg-mangrove-neon/10',
    ghost: 'text-mangrove-muted hover:bg-gray-100',
    white: 'bg-white text-mangrove-deep hover:bg-gray-50 shadow-md',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3 text-base gap-2',
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

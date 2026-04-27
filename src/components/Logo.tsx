interface LogoProps {
  variant?: 'light' | 'dark';
  subtitle?: string;
  className?: string;
}

export default function Logo({ variant = 'light', subtitle, className = '' }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1">
        <span className={`text-xl font-extrabold tracking-tight ${variant === 'light' ? 'text-mangrove-neon' : 'text-mangrove-deep'}`}>
          ID-MAP
        </span>
        {subtitle && (
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded ${
            variant === 'light'
              ? 'bg-mangrove-neon/20 text-mangrove-neon'
              : 'bg-mangrove-deep/10 text-mangrove-deep'
          }`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

interface MapPin {
  x: number;
  y: number;
  label: string;
}

interface MangroveMapProps {
  pins?: MapPin[];
  className?: string;
  showControls?: boolean;
}

const defaultPins: MapPin[] = [
  { x: 25, y: 58, label: 'Demak' },
  { x: 15, y: 62, label: 'Teluk Bintuni' },
  { x: 72, y: 65, label: 'Papua Barat' },
  { x: 30, y: 55, label: 'Sembilang' },
  { x: 55, y: 70, label: 'Kwandang' },
  { x: 35, y: 60, label: 'Kalimantan' },
  { x: 45, y: 58, label: 'Sulawesi' },
];

export default function MangroveMap({ pins = defaultPins, className = '', showControls }: MangroveMapProps) {
  return (
    <div className={`relative bg-mangrove-deep rounded-2xl overflow-hidden ${className}`}>
      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B7FF2A" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Stylized Indonesia outline */}
      <svg viewBox="0 0 800 400" className="w-full h-full opacity-30" preserveAspectRatio="xMidYMid meet">
        <path
          d="M100,200 C120,180 160,170 200,175 C240,180 280,190 320,185 C360,180 380,170 400,175 C420,180 440,190 480,185 C520,180 560,170 600,180 C640,190 680,200 700,195"
          fill="none"
          stroke="#23C16B"
          strokeWidth="2"
          opacity="0.5"
        />
        <ellipse cx="200" cy="220" rx="80" ry="30" fill="#23C16B" opacity="0.15" />
        <ellipse cx="350" cy="210" rx="60" ry="25" fill="#23C16B" opacity="0.15" />
        <ellipse cx="480" cy="230" rx="90" ry="28" fill="#23C16B" opacity="0.15" />
        <ellipse cx="600" cy="215" rx="70" ry="22" fill="#23C16B" opacity="0.15" />
        <ellipse cx="280" cy="240" rx="40" ry="18" fill="#23C16B" opacity="0.1" />
        <ellipse cx="420" cy="250" rx="50" ry="20" fill="#23C16B" opacity="0.1" />
      </svg>

      {/* Glow pins */}
      {pins.map((pin, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative">
            <div className="w-3 h-3 bg-mangrove-neon rounded-full shadow-lg shadow-mangrove-neon/50" />
            <div className="absolute inset-0 w-3 h-3 bg-mangrove-neon rounded-full animate-ping opacity-50" />
          </div>
        </div>
      ))}

      {showControls && (
        <div className="absolute right-3 bottom-3 flex flex-col gap-1">
          <button className="w-8 h-8 bg-mangrove-teal/80 backdrop-blur text-white rounded-lg flex items-center justify-center text-sm font-bold hover:bg-mangrove-teal">+</button>
          <button className="w-8 h-8 bg-mangrove-teal/80 backdrop-blur text-white rounded-lg flex items-center justify-center text-sm font-bold hover:bg-mangrove-teal">−</button>
        </div>
      )}
    </div>
  );
}

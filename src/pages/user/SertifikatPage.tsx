import { useCallback } from 'react';
import { Award, Download, Eye, Calendar, MapPin, TreePine, Share2, Printer } from 'lucide-react';
import DashboardSidebar from '../../components/DashboardSidebar';
import DashboardTopbar from '../../components/DashboardTopbar';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import StatCard from '../../components/ui/StatCard';
import menuItems from './userMenuItems';

interface Certificate {
  id: string;
  title: string;
  program: string;
  loc: string;
  date: string;
  bibit: number;
  karbon: string;
  status: 'Diterbitkan' | 'Proses';
  badge: 'green' | 'yellow';
}

const certificates: Certificate[] = [
  { id: 'CERT-2024-001', title: 'Sertifikat Kontribusi Restorasi', program: 'Restorasi Teluk Bintuni', loc: 'Papua Barat', date: '10 Mei 2024', bibit: 10, karbon: '5,2 ton', status: 'Diterbitkan', badge: 'green' },
  { id: 'CERT-2024-002', title: 'Sertifikat Adopsi Mangrove', program: 'Desa Timbulsloko', loc: 'Demak, Jawa Tengah', date: '2 Mei 2024', bibit: 7, karbon: '3,6 ton', status: 'Diterbitkan', badge: 'green' },
  { id: 'CERT-2024-003', title: 'Sertifikat Pendukung Program', program: 'TN Sembilang', loc: 'Sumatera Selatan', date: '28 Apr 2024', bibit: 8, karbon: '3,7 ton', status: 'Diterbitkan', badge: 'green' },
  { id: 'CERT-2024-004', title: 'Sertifikat Kontribusi Q2-2024', program: 'Semua Program', loc: 'Nasional', date: '1 Jun 2024', bibit: 25, karbon: '12,5 ton', status: 'Proses', badge: 'yellow' },
];

function generateCertificateAndDownload(cert: Certificate) {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 850;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background
  ctx.fillStyle = '#052E2B';
  ctx.fillRect(0, 0, 1200, 850);

  // Inner frame
  ctx.strokeStyle = '#B7FF2A';
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 40, 1120, 770);
  ctx.strokeStyle = '#23C16B';
  ctx.lineWidth = 1;
  ctx.strokeRect(50, 50, 1100, 750);

  // Corner decorations
  const corners = [[60, 60], [1120, 60], [60, 780], [1120, 780]];
  corners.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#B7FF2A';
    ctx.fill();
  });

  // Header
  ctx.fillStyle = '#B7FF2A';
  ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('INTEGRATED DIGITAL MANGROVE & COASTAL PLATFORM', 600, 110);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 42px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('SERTIFIKAT KONTRIBUSI', 600, 180);

  ctx.fillStyle = '#23C16B';
  ctx.font = '16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`No: ${cert.id}`, 600, 215);

  // Divider
  ctx.beginPath();
  ctx.moveTo(300, 240);
  ctx.lineTo(900, 240);
  ctx.strokeStyle = '#B7FF2A';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Recipient
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '16px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Diberikan kepada:', 600, 285);

  ctx.fillStyle = '#B7FF2A';
  ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('ANDI PRATAMA', 600, 335);

  // Description
  ctx.fillStyle = '#F4FFF4';
  ctx.font = '15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Atas kontribusi nyata dalam program ${cert.program}`, 600, 390);
  ctx.fillText(`di ${cert.loc}, Indonesia.`, 600, 415);

  // Stats boxes
  const statsY = 470;
  const statsData = [
    { label: 'Bibit Ditanam', value: `${cert.bibit} Pohon` },
    { label: 'CO₂ Diserap', value: `${cert.karbon}/tahun` },
    { label: 'Tanggal', value: cert.date },
  ];

  statsData.forEach((s, i) => {
    const sx = 250 + i * 260;
    ctx.fillStyle = '#063C38';
    ctx.beginPath();
    ctx.roundRect(sx, statsY, 220, 80, 12);
    ctx.fill();
    ctx.strokeStyle = '#23C16B';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(sx, statsY, 220, 80, 12);
    ctx.stroke();

    ctx.fillStyle = '#6B7280';
    ctx.font = '12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(s.label, sx + 110, statsY + 30);

    ctx.fillStyle = '#B7FF2A';
    ctx.font = 'bold 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(s.value, sx + 110, statsY + 58);
  });

  // Footer
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('ID-MAP — Integrasi Data Mangrove Pesisir', 600, 640);

  ctx.fillStyle = '#6B7280';
  ctx.font = '12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Platform ini menghubungkan data mangrove, kontribusi QRIS, monitoring geo-tagged, dan pelacakan dampak real-time.', 600, 670);

  // Signatures
  ctx.fillStyle = '#23C16B';
  ctx.font = 'italic 18px "Plus Jakarta Sans", serif';
  ctx.textAlign = 'left';
  ctx.fillText('Dr. Ahmad Ridwan', 200, 740);
  ctx.fillStyle = '#6B7280';
  ctx.font = '11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Direktur Utama ID-MAP', 200, 760);

  ctx.fillStyle = '#23C16B';
  ctx.font = 'italic 18px "Plus Jakarta Sans", serif';
  ctx.textAlign = 'right';
  ctx.fillText('Siti Nurhaliza', 1000, 740);
  ctx.fillStyle = '#6B7280';
  ctx.font = '11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Kepala Teknologi', 1000, 760);

  // Download
  const link = document.createElement('a');
  link.download = `${cert.id}_Sertifikat_IDMAP.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

export default function SertifikatPage() {
  const handleDownload = useCallback((cert: Certificate) => {
    generateCertificateAndDownload(cert);
  }, []);

  return (
    <div className="min-h-screen bg-mangrove-mint">
      <DashboardSidebar variant="user" menuItems={menuItems} />
      <div className="ml-64">
        <DashboardTopbar placeholder="Cari sertifikat..." userName="Andi" userRole="Kontributor" />
        <main className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-mangrove-deep">Sertifikat</h1>
            <p className="text-sm text-mangrove-muted mt-1">Bukti kontribusi Anda untuk restorasi mangrove Indonesia.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard icon={<Award className="w-5 h-5" />} label="Total Sertifikat" value="4" delta="3 diterbitkan" />
            <StatCard icon={<TreePine className="w-5 h-5" />} label="Total Bibit" value="25 pohon" delta="tercatat" />
            <StatCard icon={<Calendar className="w-5 h-5" />} label="Terakhir Diterbitkan" value="10 Mei 2024" delta="CERT-2024-001" />
            <StatCard icon={<MapPin className="w-5 h-5" />} label="Lokasi Program" value="3 provinsi" delta="aktif" />
          </div>

          {/* Featured certificate preview */}
          <Card className="mb-8 p-0 overflow-hidden">
            <div className="bg-gradient-to-br from-mangrove-deep to-mangrove-teal p-8 text-center text-white relative">
              {/* Decorative border */}
              <div className="absolute inset-4 border-2 border-mangrove-neon/20 rounded-xl pointer-events-none" />
              <div className="absolute inset-5 border border-mangrove-fresh/10 rounded-lg pointer-events-none" />

              <p className="text-mangrove-neon text-xs font-bold tracking-[0.3em] mb-2">INTEGRATED DIGITAL MANGROVE & COASTAL PLATFORM</p>
              <h2 className="text-3xl font-bold mb-1">SERTIFIKAT KONTRIBUSI</h2>
              <p className="text-mangrove-fresh text-sm mb-6">No: CERT-2024-001</p>

              <p className="text-sm text-gray-300 mb-1">Diberikan kepada:</p>
              <p className="text-2xl font-bold text-mangrove-neon mb-4">ANDI PRATAMA</p>

              <p className="text-sm text-gray-300 max-w-lg mx-auto mb-6">
                Atas kontribusi nyata dalam program Restorasi Teluk Bintuni di Papua Barat, Indonesia.
              </p>

              <div className="flex justify-center gap-6 mb-6">
                <div className="bg-white/5 backdrop-blur-lg rounded-xl px-6 py-3 border border-white/10">
                  <p className="text-xs text-gray-400">Bibit Ditanam</p>
                  <p className="text-lg font-bold text-mangrove-neon">10 Pohon</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl px-6 py-3 border border-white/10">
                  <p className="text-xs text-gray-400">CO₂ Diserap</p>
                  <p className="text-lg font-bold text-mangrove-neon">5,2 ton/thn</p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl px-6 py-3 border border-white/10">
                  <p className="text-xs text-gray-400">Tanggal</p>
                  <p className="text-lg font-bold text-mangrove-neon">10 Mei 2024</p>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <Button variant="neon" size="md" onClick={() => handleDownload(certificates[0])}>
                  <Download className="w-4 h-4" /> Unduh Sertifikat
                </Button>
                <Button variant="ghost" size="md" className="!text-white hover:!bg-white/10">
                  <Share2 className="w-4 h-4" /> Bagikan
                </Button>
                <Button variant="ghost" size="md" className="!text-white hover:!bg-white/10">
                  <Printer className="w-4 h-4" /> Cetak
                </Button>
              </div>
            </div>
          </Card>

          {/* All certificates */}
          <h3 className="font-bold text-mangrove-deep mb-4">Semua Sertifikat</h3>
          <div className="grid grid-cols-2 gap-4">
            {certificates.map((cert) => (
              <Card key={cert.id} className="flex items-start gap-4">
                {/* Mini preview */}
                <div className="w-24 h-24 bg-gradient-to-br from-mangrove-deep to-mangrove-teal rounded-xl flex items-center justify-center shrink-0">
                  <Award className="w-10 h-10 text-mangrove-neon/60" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-sm text-mangrove-deep truncate">{cert.title}</h4>
                    <Badge variant={cert.badge}>{cert.status}</Badge>
                  </div>
                  <p className="text-xs text-mangrove-muted mb-1">{cert.program} · {cert.loc}</p>
                  <p className="text-xs text-mangrove-muted mb-3">{cert.date} · {cert.bibit} bibit · {cert.karbon} CO₂</p>
                  <div className="flex gap-2">
                    {cert.status === 'Diterbitkan' ? (
                      <>
                        <Button variant="neon" size="sm" onClick={() => handleDownload(cert)}>
                          <Download className="w-3.5 h-3.5" /> Unduh
                        </Button>
                        <Button variant="ghost" size="sm"><Eye className="w-3.5 h-3.5" /> Lihat</Button>
                      </>
                    ) : (
                      <Badge variant="yellow">Dalam proses penerbitan</Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, QrCode, Mail, Phone, Sprout, TreePine, Check,
  ChevronRight, Shield, Sparkles, ExternalLink
} from 'lucide-react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';

type Step = 'info' | 'package' | 'payment' | 'success';

const packages = [
  {
    id: '15k',
    price: 'Rp 15.000',
    rawPrice: 15000,
    seedlings: 2,
    care: 3,
    title: '2 Bibit Mangrove',
    description: 'Penanaman 2 bibit mangrove + perawatan 3 tahun',
    icon: <Sprout className="w-8 h-8" />,
    color: 'mangrove-fresh',
    features: ['2 bibit mangrove pilihan', 'Perawatan intensif 3 tahun', 'Sertifikat digital', 'Laporan pertumbuhan berkala'],
  },
  {
    id: '30k',
    price: 'Rp 30.000',
    rawPrice: 30000,
    seedlings: 4,
    care: 3,
    title: '4 Bibit Mangrove',
    description: 'Penanaman 4 bibit mangrove + perawatan 3 tahun',
    icon: <TreePine className="w-8 h-8" />,
    color: 'mangrove-neon',
    popular: true,
    features: ['4 bibit mangrove pilihan', 'Perawatan intensif 3 tahun', 'Sertifikat digital premium', 'Laporan pertumbuhan real-time', 'Akses dashboard monitoring'],
  },
];

export default function QRISPaymentPage() {
  const [step, setStep] = useState<Step>('info');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [magicLink, setMagicLink] = useState('');

  const { loginWithMagicLink } = useAuth();
  const navigate = useNavigate();
  const createTransaction = useMutation(api.transactions.create);

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && whatsapp) setStep('package');
  };

  const handlePackageSelect = (pkgId: string) => {
    setSelectedPackage(pkgId);
    setStep('payment');
  };

  const handlePaymentComplete = () => {
    setProcessing(true);
    setTimeout(() => {
      const token = crypto.randomUUID();
      const link = `${window.location.origin}${window.location.pathname}#/user?token=${token}`;
      setMagicLink(link);
      loginWithMagicLink(email, whatsapp, selectedPackage || '15k', token);

      const pkg = packages.find(p => p.id === selectedPackage);
      createTransaction({
        transactionId: `TRX-${Date.now()}`,
        donorName: email.split('@')[0],
        donorEmail: email,
        amount: pkg?.rawPrice ?? 15000,
        amountFormatted: pkg?.price ?? 'Rp 15.000',
        method: 'QRIS',
        program: 'Donasi Mangrove',
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: 'pending',
        whatsapp,
        packageType: selectedPackage || '15k',
      }).catch(() => { /* Convex unavailable */ });

      setProcessing(false);
      setStep('success');
    }, 2000);
  };

  const handleGoToDashboard = () => {
    navigate('/user');
  };

  const selectedPkg = packages.find(p => p.id === selectedPackage);

  return (
    <div className="min-h-screen bg-mangrove-deep text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/hero-mangrove.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mangrove-deep via-mangrove-deep/95 to-mangrove-deep" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {(['info', 'package', 'payment', 'success'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step === s
                  ? 'bg-mangrove-neon text-mangrove-deep'
                  : (['info', 'package', 'payment', 'success'].indexOf(step) > i)
                    ? 'bg-mangrove-fresh text-white'
                    : 'bg-white/10 text-gray-500'
              }`}>
                {(['info', 'package', 'payment', 'success'].indexOf(step) > i) ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < 3 && <div className={`w-8 sm:w-12 h-0.5 ${
                (['info', 'package', 'payment', 'success'].indexOf(step) > i) ? 'bg-mangrove-fresh' : 'bg-white/10'
              }`} />}
            </div>
          ))}
        </div>

        {/* Step 1: Info */}
        {step === 'info' && (
          <div className="bg-mangrove-teal/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-mangrove-neon/10 rounded-2xl flex items-center justify-center mb-4">
                <QrCode className="w-8 h-8 text-mangrove-neon" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Dukung Lewat QRIS</h1>
              <p className="text-sm text-gray-400">Isi data diri untuk melanjutkan donasi</p>
            </div>

            <form onSubmit={handleInfoSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-mangrove-neon/50 focus:ring-1 focus:ring-mangrove-neon/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Nomor WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+62 812 3456 7890"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-mangrove-neon/50 focus:ring-1 focus:ring-mangrove-neon/20 transition-all"
                  />
                </div>
              </div>

              <div className="bg-mangrove-neon/5 border border-mangrove-neon/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-mangrove-neon shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-400">
                    Data Anda dilindungi dan hanya digunakan untuk konfirmasi donasi serta pengiriman sertifikat digital.
                  </p>
                </div>
              </div>

              <Button type="submit" variant="neon" size="lg" className="w-full">
                Lanjutkan <ChevronRight className="w-5 h-5" />
              </Button>
            </form>
          </div>
        )}

        {/* Step 2: Package Selection */}
        {step === 'package' && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Pilih Paket Kontribusi</h1>
              <p className="text-sm text-gray-400">Pilih jumlah bibit mangrove yang ingin Anda tanam</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => handlePackageSelect(pkg.id)}
                  className="relative text-left bg-mangrove-teal/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-mangrove-neon/50 transition-all group"
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-mangrove-neon text-mangrove-deep text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Populer
                    </div>
                  )}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                    pkg.color === 'mangrove-neon'
                      ? 'bg-mangrove-neon/10 text-mangrove-neon'
                      : 'bg-mangrove-fresh/10 text-mangrove-fresh'
                  }`}>
                    {pkg.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-1">{pkg.title}</h3>
                  <p className="text-3xl font-extrabold text-mangrove-neon mb-3">{pkg.price}</p>
                  <p className="text-sm text-gray-400 mb-4">{pkg.description}</p>
                  <ul className="space-y-2">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-mangrove-fresh shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 w-full py-2.5 bg-white/5 rounded-xl text-center text-sm font-semibold text-mangrove-neon group-hover:bg-mangrove-neon group-hover:text-mangrove-deep transition-all">
                    Pilih Paket
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep('info')}
              className="mt-6 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali
            </button>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 'payment' && selectedPkg && (
          <div className="bg-mangrove-teal/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold mb-2">Pembayaran QRIS</h1>
              <p className="text-sm text-gray-400">Scan QR code di bawah untuk menyelesaikan pembayaran</p>
            </div>

            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Paket Terpilih</p>
                  <p className="font-bold">{selectedPkg.title}</p>
                </div>
                <p className="text-2xl font-extrabold text-mangrove-neon">{selectedPkg.price}</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 mb-6 flex flex-col items-center">
              <QrCode className="w-48 h-48 text-mangrove-deep" />
              <p className="text-mangrove-deep font-bold mt-3 text-sm">ID-MAP QRIS</p>
              <p className="text-gray-500 text-xs mt-1">{selectedPkg.price}</p>
            </div>

            <div className="bg-mangrove-neon/5 border border-mangrove-neon/10 rounded-xl p-4 mb-6">
              <p className="text-xs text-gray-400 text-center">
                Buka aplikasi e-wallet atau mobile banking Anda, pilih &quot;Scan QR&quot;, arahkan ke kode QRIS di atas untuk melakukan pembayaran.
              </p>
            </div>

            <Button
              variant="neon"
              size="lg"
              className="w-full"
              onClick={handlePaymentComplete}
              disabled={processing}
            >
              {processing ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                  </svg>
                  Memverifikasi pembayaran...
                </span>
              ) : (
                'Saya Sudah Bayar'
              )}
            </Button>

            <button
              onClick={() => setStep('package')}
              className="mt-4 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" /> Ganti Paket
            </button>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="bg-mangrove-teal/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 text-center">
            <div className="w-20 h-20 mx-auto bg-mangrove-fresh/10 rounded-full flex items-center justify-center mb-6">
              <Check className="w-10 h-10 text-mangrove-fresh" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Pembayaran Sedang Diverifikasi</h1>
            <p className="text-sm text-gray-400 mb-6">
              Terima kasih! Pembayaran Anda sedang diproses dan akan dikonfirmasi oleh admin.
            </p>

            {selectedPkg && (
              <Card glass className="mb-6 text-left">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">Paket</span>
                  <span className="font-semibold">{selectedPkg.title}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">Jumlah</span>
                  <span className="font-semibold text-mangrove-neon">{selectedPkg.price}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">Email</span>
                  <span className="font-semibold text-sm">{email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">WhatsApp</span>
                  <span className="font-semibold text-sm">{whatsapp}</span>
                </div>
              </Card>
            )}

            <div className="bg-mangrove-neon/5 border border-mangrove-neon/10 rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-mangrove-neon mb-2">Magic Link Anda</p>
              <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                <code className="text-xs text-gray-300 truncate flex-1">{magicLink}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(magicLink)}
                  className="shrink-0 text-mangrove-neon hover:text-mangrove-fresh transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Link ini juga dikirim ke email dan WhatsApp Anda. Gunakan untuk login ke dashboard.
              </p>
            </div>

            <Button variant="neon" size="lg" className="w-full" onClick={handleGoToDashboard}>
              Masuk ke Dashboard <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

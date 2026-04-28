import { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Shield, Eye, EyeOff, ArrowLeft, Lock, Mail } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const roleParam = searchParams.get('role') as 'admin' | 'verifikator' | null;
  const role = roleParam === 'verifikator' ? 'verifikator' : 'admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password, role);
      if (success) {
        navigate(role === 'admin' ? '/admin' : '/verifikator');
      } else {
        setError('Email atau password salah. Silakan coba lagi.');
      }
    } catch {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = role === 'admin';
  const title = isAdmin ? 'Login Admin' : 'Login Verifikator';
  const subtitle = isAdmin
    ? 'Masuk ke dashboard admin untuk mengelola platform'
    : 'Masuk ke dashboard verifikator untuk tugas lapangan';

  return (
    <div className="min-h-screen bg-mangrove-deep flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mangrove-fresh/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-mangrove-neon/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>

        <div className="bg-mangrove-teal/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
              isAdmin ? 'bg-mangrove-neon/10 text-mangrove-neon' : 'bg-mangrove-fresh/10 text-mangrove-fresh'
            }`}>
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
            <p className="text-sm text-gray-400">{subtitle}</p>
            <div className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
              isAdmin
                ? 'bg-mangrove-neon/10 text-mangrove-neon'
                : 'bg-mangrove-fresh/10 text-mangrove-fresh'
            }`}>
              {isAdmin ? 'ADMIN' : 'VERIFIKATOR'}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isAdmin ? 'admin@id-map.co.id' : 'verifikator@id-map.co.id'}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-mangrove-neon/50 focus:ring-1 focus:ring-mangrove-neon/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-mangrove-neon/50 focus:ring-1 focus:ring-mangrove-neon/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="neon"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" className="opacity-75" />
                  </svg>
                  Memproses...
                </span>
              ) : 'Masuk'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5">
            <p className="text-xs text-gray-500 text-center">
              Akses terbatas untuk pengguna yang terdaftar.
              <br />
              Hubungi administrator untuk akses baru.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

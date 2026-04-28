import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { AuthContext } from './authTypes';

const DEV_FALLBACK_CREDENTIALS: Record<string, { password: string; role: 'admin' | 'verifikator'; name: string }> | null =
  import.meta.env.DEV
    ? {
        'admin@id-map.co.id': { password: 'admin123', role: 'admin', name: 'Admin ID-MAP' },
        'verifikator@id-map.co.id': { password: 'verifikator123', role: 'verifikator', name: 'Bambang Sudirjo' },
      }
    : null;

function AuthProviderInner({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string; role: 'admin' | 'verifikator' | null; name: string } | null>(() => {
    const stored = localStorage.getItem('idmap_auth');
    try { return stored ? JSON.parse(stored) : null; } catch { return null; }
  });

  const convexLogin = useMutation(api.users.login);
  const convexCreateDonation = useMutation(api.donations.create);

  useEffect(() => {
    if (user) {
      localStorage.setItem('idmap_auth', JSON.stringify(user));
    } else {
      localStorage.removeItem('idmap_auth');
    }
  }, [user]);

  const login = useCallback(async (email: string, password: string, role: 'admin' | 'verifikator'): Promise<boolean> => {
    try {
      const result = await convexLogin({ email, password, role });
      if (result) {
        setUser({ email: result.email, role: result.role as 'admin' | 'verifikator', name: result.name });
        return true;
      }
    } catch {
      // Convex unavailable, fall through to local credentials
    }
    if (DEV_FALLBACK_CREDENTIALS) {
      const cred = DEV_FALLBACK_CREDENTIALS[email];
      if (cred && cred.password === password && cred.role === role) {
        setUser({ email, role: cred.role, name: cred.name });
        return true;
      }
    }
    return false;
  }, [convexLogin]);

  const loginWithMagicLink = useCallback((email: string, whatsapp: string, packageType: string, token: string) => {
    setUser({
      email,
      role: null,
      name: email.split('@')[0],
    });
    const donationData = { email, whatsapp, packageType, date: new Date().toISOString() };
    localStorage.setItem('idmap_donation', JSON.stringify(donationData));

    convexCreateDonation({
      email,
      whatsapp,
      packageType,
      amount: packageType === '30k' ? 30000 : 15000,
      magicLinkToken: token,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }).catch(() => { /* Convex unavailable, donation saved to localStorage */ });
  }, [convexCreateDonation]);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, loginWithMagicLink, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthProviderInner>{children}</AuthProviderInner>;
}

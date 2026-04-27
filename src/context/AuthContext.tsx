import { useState, useEffect, type ReactNode } from 'react';
import { AuthContext } from './authTypes';

const CREDENTIALS: Record<string, { password: string; role: 'admin' | 'verifikator'; name: string }> = {
  'admin@id-map.co.id': { password: 'admin123', role: 'admin', name: 'Admin ID-MAP' },
  'verifikator@id-map.co.id': { password: 'verifikator123', role: 'verifikator', name: 'Bambang Sudirjo' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string; role: 'admin' | 'verifikator' | null; name: string } | null>(() => {
    const stored = localStorage.getItem('idmap_auth');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('idmap_auth', JSON.stringify(user));
    } else {
      localStorage.removeItem('idmap_auth');
    }
  }, [user]);

  const login = (email: string, password: string, role: 'admin' | 'verifikator'): boolean => {
    const cred = CREDENTIALS[email];
    if (cred && cred.password === password && cred.role === role) {
      setUser({ email, role: cred.role, name: cred.name });
      return true;
    }
    return false;
  };

  const loginWithMagicLink = (email: string, whatsapp: string, packageType: string) => {
    setUser({
      email,
      role: null,
      name: email.split('@')[0],
    });
    localStorage.setItem('idmap_donation', JSON.stringify({ email, whatsapp, packageType, date: new Date().toISOString() }));
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, loginWithMagicLink, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

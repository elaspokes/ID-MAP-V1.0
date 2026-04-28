import { createContext } from 'react';

export type UserRole = 'admin' | 'verifikator' | null;

export interface AuthUser {
  email: string;
  role: UserRole;
  name: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string, role: 'admin' | 'verifikator') => Promise<boolean>;
  loginWithMagicLink: (email: string, whatsapp: string, packageType: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App'

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!CLERK_PUBLISHABLE_KEY) {
  console.warn('Missing VITE_CLERK_PUBLISHABLE_KEY — Clerk auth will not work')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY || ''}>
      <AuthProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>,
)

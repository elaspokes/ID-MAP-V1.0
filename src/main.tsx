import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App'

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const CONVEX_URL = import.meta.env.VITE_CONVEX_URL as string | undefined

if (!CLERK_PUBLISHABLE_KEY) {
  console.warn('Missing VITE_CLERK_PUBLISHABLE_KEY — Clerk auth will not work')
}

if (!CONVEX_URL) {
  console.warn('Missing VITE_CONVEX_URL — Convex database will not work, using fallback data')
}

const convex = new ConvexReactClient(CONVEX_URL || 'https://placeholder.convex.cloud')

const appTree = (
  <ConvexProvider client={convex}>
    <AuthProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AuthProvider>
  </ConvexProvider>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {CLERK_PUBLISHABLE_KEY ? (
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        {appTree}
      </ClerkProvider>
    ) : (
      appTree
    )}
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App'

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const CONVEX_URL = import.meta.env.VITE_CONVEX_URL

if (!CLERK_PUBLISHABLE_KEY) {
  console.warn('Missing VITE_CLERK_PUBLISHABLE_KEY — Clerk auth will not work')
}

if (!CONVEX_URL) {
  console.warn('Missing VITE_CONVEX_URL — Convex database will not work')
}

const convex = CONVEX_URL ? new ConvexReactClient(CONVEX_URL) : null

const appTree = (
  <AuthProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </AuthProvider>
)

const withConvex = convex ? (
  <ConvexProvider client={convex}>
    {appTree}
  </ConvexProvider>
) : appTree

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {CLERK_PUBLISHABLE_KEY ? (
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        {withConvex}
      </ClerkProvider>
    ) : (
      withConvex
    )}
  </StrictMode>,
)

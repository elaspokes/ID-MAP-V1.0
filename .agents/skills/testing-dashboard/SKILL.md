# Testing ID-MAP Dashboard Pages

## Overview
ID-MAP is a React 18 + TypeScript + Vite application for mangrove conservation management. It has two main dashboard areas: Admin and Verifikator, each with multiple sub-pages.

## Dev Server Setup
```bash
cd /home/ubuntu/repos/ID-MAP-V1.0
npm install
npm run dev -- --host 0.0.0.0
```
Vite defaults to port 5173 but may use a higher port if occupied. Check the terminal output for the actual port.

## Build & Lint
```bash
npm run build    # tsc -b && vite build
npm run lint     # eslint .
```

## Routing
The app uses **HashRouter** (not BrowserRouter). All routes are prefixed with `/#/`.

### Admin Routes
- `/#/admin` — Dashboard (main)
- `/#/admin/pengguna` — Manajemen Pengguna
- `/#/admin/program-lokasi` — Program & Lokasi
- `/#/admin/pembayaran` — Pembayaran (QRIS)
- `/#/admin/data-mangrove` — Data Mangrove
- `/#/admin/monitoring` — Monitoring & Validasi
- `/#/admin/laporan` — Laporan & Analitik
- `/#/admin/sertifikat` — Sertifikat
- `/#/admin/pengaturan` — Pengaturan Sistem

### Verifikator Routes
- `/#/verifikator` — Dashboard (main)
- `/#/verifikator/tugas` — Tugas Verifikasi
- `/#/verifikator/lokasi` — Verifikasi Lokasi
- `/#/verifikator/data-lapangan` — Data Lapangan
- `/#/verifikator/laporan` — Laporan
- `/#/verifikator/pengaturan` — Pengaturan

### User Routes
- `/#/user` — User Dashboard
- Additional user sub-routes exist under `/#/user/*`

## Testing Approach

### Page Rendering
1. Start dev server
2. Navigate to each route in the browser
3. Verify: correct page heading, stat cards with data, tables with sample rows, charts render
4. Verify sidebar highlights the active page
5. Click sidebar links to verify navigation between sub-pages

### Mobile Responsiveness
1. Open Chrome DevTools (F12)
2. Click the device toolbar toggle icon (phone/tablet icon near Elements tab)
3. Set viewport width to ~400px
4. Verify:
   - Sidebar is hidden (not visible)
   - Hamburger menu icon (☰) appears in the top bar
   - Clicking hamburger opens a slide-in sidebar from left with backdrop overlay
   - All menu items are visible in the slide-in sidebar
   - X button or clicking backdrop closes the sidebar
   - Stat cards stack in 2-column grid instead of 4-column
   - Tables have horizontal scroll (overflow-x-auto)
   - Content doesn't overflow the viewport

### Key Components
- **DashboardLayout** — Wrapper managing sidebar + topbar state
- **DashboardSidebar** — Desktop: fixed left sidebar; Mobile: slide-in with translate-x animation
- **DashboardTopbar** — Shows hamburger button on mobile (lg:hidden breakpoint)
- **StatCard** — Reusable stat display component
- Charts use `recharts` (AreaChart, PieChart)
- Icons use `lucide-react`

## Brand Colors
- Deep Mangrove: #052E2B
- Dark Teal: #063C38
- Neon Green: #B7FF2A
- Fresh Green: #23C16B
- Soft Mint: #F4FFF4

## Tips
- The app uses Tailwind CSS v4 with `@tailwindcss/vite` plugin
- All pages use sample/demo data — no backend required for testing
- The Tailwind responsive breakpoint for sidebar visibility is `lg:` (1024px)
- If ports 5173-5174 are occupied, Vite will automatically try the next available port
- Menu items are centralized in `src/pages/admin/adminMenuItems.tsx` and `src/pages/verifikator/verifikatorMenuItems.tsx`

## Devin Secrets Needed
None — this is a frontend-only app with no backend or authentication required for testing.

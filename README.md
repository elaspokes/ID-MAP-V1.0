# ID-MAP — Integrated Digital Mangrove & Coastal Platform

Prototype UI untuk platform pengelolaan mangrove dan pesisir Indonesia. Dibangun dengan React 18, TypeScript, Tailwind CSS, dan Recharts.

## Demo

- `/` — Landing Page
- `/#/admin` — Dashboard Admin
- `/#/verifikator` — Dashboard Verifikator
- `/#/user` — Dashboard User/Donor

## Tech Stack

- **Vite** — Build tool
- **React 18** + TypeScript
- **Tailwind CSS v4** — Styling dengan brand palette ID-MAP
- **react-router-dom v6** — Routing (HashRouter)
- **lucide-react** — Icon set
- **recharts** — Charts (Area + Donut)

## Install & Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Brand Palette

| Token | Hex |
|-------|-----|
| Deep Mangrove | `#052E2B` |
| Dark Teal | `#063C38` |
| Neon Green | `#B7FF2A` |
| Fresh Green | `#23C16B` |
| Soft Mint | `#F4FFF4` |
| Muted Gray | `#6B7280` |

## Struktur Proyek

```
src/
├── components/
│   ├── ui/          # Card, Button, Badge, StatCard, ProgressBar, Table
│   ├── DashboardSidebar.tsx
│   ├── DashboardTopbar.tsx
│   ├── MangroveMap.tsx
│   └── Logo.tsx
├── pages/
│   ├── IDMAPLandingPage.tsx
│   ├── IDMAPAdminDashboard.tsx
│   ├── IDMAPVerifikatorDashboard.tsx
│   └── IDMAPUserDashboard.tsx
├── App.tsx
├── main.tsx
└── index.css
```

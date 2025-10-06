# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `pnpm run dev` - Start development server (runs on port 8080)
- `pnpm run build` - Build for production
- `pnpm run build:dev` - Build for development environment
- `pnpm run lint` - Run ESLint to check code quality
- `pnpm run preview` - Preview production build locally

### Testing
- `pnpm test` - Run Vitest tests
- `pnpm run test:coverage` - Run tests with coverage report

This project uses Vitest for testing. The test runner is configured in `vite.config.ts` with test setup in `src/setupTests.ts`.

### Design Library Tools
- `pnpm run lib` - Launch Design Library CLI menu
- `pnpm run lib:open` - Open Design Library in browser
- `pnpm run lib:export` - Export Design Library assets
- `pnpm run lib:sync` - Sync Design Library with registry
- `pnpm run lib:version` - Display Design Library version

### Route Preview Tools
- `pnpm run routes:preview` - Generate screenshots of all routes and open preview HTML
- `pnpm run routes:preview:fast` - Generate route preview without screenshots (faster)

Note: Route preview tools require dev server running on port 8081 and use Puppeteer for screenshots.

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router v6 with future flags enabled (`v7_startTransition`, `v7_relativeSplatPath`)
- **State Management**: TanStack Query for server state
- **Backend**: Mock Supabase client (frontend-only, no real database connections)
- **UI Components**: Extensive shadcn/ui component library (49 components) with Radix UI primitives

### Directory Structure
```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components (49+ components)
│   ├── AuthPage.tsx    # Various Auth page components (AuthPage, AuthPage2, etc.)
│   ├── BrandDashboard.tsx
│   ├── CheckoutFlow.tsx
│   ├── CustomerApp.tsx
│   └── SuperAdminDashboard.tsx
├── pages/              # Route components (~35+ page components)
│   ├── Index.tsx       # Landing page
│   ├── Directory.tsx   # Directory listing page
│   ├── Auth.tsx        # Authentication (plus Auth3-Auth20 variants)
│   ├── Shop.tsx        # E-commerce shop
│   ├── Admin.tsx       # Admin dashboard
│   ├── Portal.tsx      # User portal
│   ├── Brand.tsx       # Brand dashboard
│   ├── ProjectPage.tsx # Dynamic project pages
│   ├── VipWaitlist.tsx # VIP waitlist
│   ├── CabanaMgmt.tsx  # Cabana management (plus CabanaMgmt2-4 variants)
│   ├── LCG.tsx         # Locust Growth page
│   ├── Home1.tsx       # Alternative home page
│   ├── CreatorOnboarding.tsx
│   ├── LinkInBio.tsx   # Link-in-bio profiles
│   ├── SharedLayout.tsx # Layout wrapper for metadata management
│   └── Storage.tsx     # Storage management
├── design-library/     # Design system and component library
│   ├── index.tsx       # Design Library main UI (route: /library)
│   ├── tabs/           # Design Library tab components
│   ├── registry/       # Asset registries (components, fonts, backgrounds, etc.)
│   └── utils/          # Design Library utilities
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations
│   └── supabase/       # Mock Supabase client, types, and auth
└── lib/                # Utilities and shared logic
    ├── meta.ts         # Route-aware metadata management
    ├── mockData.ts     # Mock database data (products, profiles, etc.)
    ├── mockStripe.ts   # Mock Stripe payment integration
    └── storage.ts      # Storage utilities
tools/                  # Build and development tools
├── design-lib.cjs      # Design Library CLI tool
└── generate-route-screenshots.mjs # Route screenshot generator
```

### Key Application Features
**Cabana VIP** — invite-only creator network shell with:
- **VIP waitlist system** for exclusive access
- **Creator onboarding** flow and profiles
- **Link-in-bio** dynamic pages (route: `/bio/:username`)
- **Creator portal** interface with project management
- **Mock authentication system** (frontend-only, no real auth)
- **Admin dashboard** for network management
- **Brand dashboard** for brand-specific features
- **E-commerce features** including shop and checkout flows
- **Dynamic project pages** with parameterized routing (`/project/:id`)
- **Design Library** - Complete design system at `/library` route with:
  - Component showcase with live previews
  - Font, background, and icon libraries
  - Template gallery
  - Design tokens reference
  - Media asset management
  - CLI tools for library management (`pnpm run lib`)
- **Route Preview System** - Automated screenshot generation tool for visualizing all routes

### Routing Architecture
- **All routes are public** - `ProtectedRoute` component is a pass-through (no real auth enforcement)
- All routes wrap with `SharedLayout` (located at `src/pages/SharedLayout.tsx`) which handles route-aware metadata management:
  - Default metadata is "CABANA" for most routes
  - Excluded routes (like `/quickprintz`, `/starluv`, `/lilsex`, `/juanita*`, `/cabana`, `/thecabana`, and `/auth*` prefix) manage their own metadata
  - Metadata is set via `src/lib/meta.ts` which provides route-specific titles, descriptions, and social share images
  - `SharedLayout` updates document title and OpenGraph/Twitter meta tags dynamically based on route
- Multiple auth page variants exist (Auth, Auth3-Auth20) mapped to branded routes:
  - `/quickprintz` → Auth10
  - `/starluv` (and variants) → Auth7
  - `/lilsex` → Auth6
  - `/juanita` → Auth3
  - `/cabana`, `/thecabana` → Auth3_4
- React Router v6 with future flags enabled for forward compatibility (`v7_startTransition`, `v7_relativeSplatPath`)
- Main routing configuration is in `src/App.tsx` with ~35+ routes defined
- Notable routes:
  - `/` - Landing page (Index)
  - `/directory` - Directory listing
  - `/library` - Design Library system
  - `/lcg` - Locust Growth Accelerator page
  - `/cabanamgmt` (and variants 2-4) - Cabana management interfaces
  - `/thedash` - Dashboard interface

### Development Configuration
- **Path aliases**: `@/` maps to `./src/`
- **Port**: Development server runs on port 8080
- **TypeScript**: Relaxed config with `noImplicitAny: false` and `strictNullChecks: false`
- **ESLint**: Configured for React with TypeScript, unused vars checking disabled
- **Vitest**: Test configuration with jsdom environment and v8 coverage provider

### Mock Backend Integration
- **Mock Supabase**: Project uses `src/integrations/supabase/mockClient.ts` instead of real Supabase connection
- All database operations are mocked - no real API calls are made
- Mock data is stored in `src/lib/mockData.ts` (products, profiles, user roles, sessions)
- Auth is frontend-only with no real authentication or session management
- Auth flow handled by `src/integrations/supabase/auth.tsx` (AuthProvider) which wraps the entire app
- This is a **component development/prototype environment**, not a production-ready application

### Component Library
Extensive shadcn/ui implementation with 49 components including:
- Form components (inputs, selects, checkboxes, etc.)
- Navigation (menus, tabs, breadcrumbs)
- Feedback (toasts, alerts, progress)
- Layout (cards, separators, scroll areas)
- Data display (tables, charts via Recharts)

### Build and Deployment
- Vite handles bundling with React SWC for fast compilation
- Production builds optimize for modern browsers
- Lovable platform integration for automatic deployment (Project ID: `dbcb82db-3a5c-4d43-86a6-c004351ecb04`)
- Package manager: **pnpm 10.15.1+** (use pnpm, not npm)

### Application Entry Points
- **Main entry**: `src/main.tsx` - Renders the root `App` component
- **App component**: `src/App.tsx` - Sets up providers (QueryClient, Auth, Tooltip) and routing
- **Provider hierarchy**: QueryClientProvider → AuthProvider → TooltipProvider → BrowserRouter → Routes
- **Global UI**: Toaster and Sonner components are rendered at app root for toast notifications

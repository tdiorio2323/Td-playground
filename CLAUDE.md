# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server (runs on port 8080)
- `npm run build` - Build for production
- `npm run build:dev` - Build for development environment
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

### Testing
- `npm test` - Run Vitest tests
- `npm run test:coverage` - Run tests with coverage report

This project uses Vitest for testing. The test runner is configured in `vite.config.ts` with test setup in `src/setupTests.ts`.

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
│   ├── ui/             # shadcn/ui components (49 components)
│   ├── AuthPage.tsx
│   ├── BrandDashboard.tsx
│   ├── CheckoutFlow.tsx
│   ├── CustomerApp.tsx
│   └── SuperAdminDashboard.tsx
├── pages/              # Route components
│   ├── Index.tsx       # Landing page
│   ├── Auth.tsx        # Authentication (plus Auth3-Auth20 variants)
│   ├── Shop.tsx        # E-commerce shop
│   ├── Admin.tsx       # Admin dashboard
│   ├── Portal.tsx      # User portal
│   ├── Brand.tsx       # Brand dashboard
│   ├── ProjectPage.tsx # Dynamic project pages
│   ├── VipWaitlist.tsx # VIP waitlist
│   ├── CreatorOnboarding.tsx
│   └── LinkInBio.tsx   # Link-in-bio profiles
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations
│   └── supabase/       # Mock Supabase client and types
└── lib/                # Utilities and shared logic
    └── meta.ts         # Route-aware metadata management
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

### Routing Architecture
- **All routes are public** - `ProtectedRoute` component is a pass-through (no real auth enforcement)
- All routes wrap with `SharedLayout` (located at `src/SharedLayout.tsx`) which handles route-aware metadata management:
  - Default metadata is "CABANA" for most routes
  - Excluded routes (like `/quickprintz`, `/starluv`, `/lilsex`, `/juanita*`, `/cabana`, `/thecabana`, and `/auth*` prefix) manage their own metadata
  - Metadata is set via `src/lib/meta.ts` which provides route-specific titles, descriptions, and social share images
  - `SharedLayout` updates document title and OpenGraph/Twitter meta tags dynamically based on route
- Multiple auth page variants exist (Auth, Auth3-Auth20) mapped to branded routes (e.g., `/quickprintz` → Auth10)
- React Router v6 with future flags enabled for forward compatibility (`v7_startTransition`, `v7_relativeSplatPath`)
- Main routing configuration is in `src/App.tsx`

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

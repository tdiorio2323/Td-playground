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
This project uses Vitest for testing. The test runner is configured in the dependencies with test setup in `src/setupTests.ts`.

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router v6 with future flags enabled (`v7_startTransition`, `v7_relativeSplatPath`)
- **State Management**: TanStack Query for server state
- **Backend**: Supabase integration for database and auth
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
│   ├── Auth.tsx        # Authentication
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
│   └── supabase/       # Supabase client and types
└── lib/                # Utilities and shared logic
```

### Key Application Features
**Cabana VIP** — invite-only creator network shell with:
- **VIP waitlist system** for exclusive access
- **Creator onboarding** flow and profiles
- **Link-in-bio** dynamic pages (route: `/bio/:username`)
- **Creator portal** interface with project management
- **Authentication system** with Supabase (localStorage-based session persistence)
- **Admin dashboard** for network management
- **Brand dashboard** for brand-specific features
- **E-commerce features** including shop and checkout flows
- **Dynamic project pages** with parameterized routing (`/project/:id`)

### Routing Architecture
- **Public routes**: Landing page (`/`), auth (`/auth`, `/auth2`), waitlist (`/waitlist`), link-in-bio (`/bio/:username`)
- **Protected routes**: All other routes require authentication via `ProtectedRoute` wrapper
- Routes use `SharedLayout` wrapper for consistent layout across pages
- React Router v6 with future flags enabled for forward compatibility

### Development Configuration
- **Path aliases**: `@/` maps to `./src/`
- **Port**: Development server runs on port 8080
- **TypeScript**: Relaxed config with `noImplicitAny: false` and `strictNullChecks: false`
- **ESLint**: Configured for React with TypeScript, unused vars checking disabled
- **Vitest**: Test configuration with jsdom environment

### Supabase Integration
- Project URL: `https://crpalakzdzvtgvljlutd.supabase.co`
- Client configured in `src/integrations/supabase/client.ts`
- Types are auto-generated from Supabase schema in `src/integrations/supabase/types.ts`
- Auth uses localStorage for session persistence with auto-refresh enabled

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

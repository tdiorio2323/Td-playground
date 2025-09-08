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
This project uses Vitest for testing. The test runner is configured in the dependencies.

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite with SWC for fast compilation
- **Styling**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router v6 with future flags enabled
- **State Management**: TanStack Query for server state
- **Backend**: Supabase integration for database and auth
- **UI Components**: Extensive shadcn/ui component library with Radix UI primitives

### Directory Structure
```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components (50+ components)
│   ├── AuthPage.tsx    # Authentication interface
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
│   └── ProjectPage.tsx # Dynamic project pages
├── hooks/              # Custom React hooks
├── integrations/       # Third-party integrations
│   └── supabase/       # Supabase client and types
└── lib/                # Utilities and shared logic
```

### Key Application Features
**Cabana VIP** — invite-only creator network shell with:
- **VIP waitlist system** for exclusive access
- **Creator onboarding** flow and profiles  
- **Link-in-bio** dynamic pages
- **Creator portal** interface with project management
- **Authentication system** with Supabase
- **Admin dashboard** for network management
- **Dynamic project pages** with parameterized routing

### Development Configuration
- **Path aliases**: `@/` maps to `./src/`
- **Port**: Development server runs on port 8080
- **TypeScript**: Relaxed config with `noImplicitAny: false` and `strictNullChecks: false`
- **ESLint**: Configured for React with TypeScript, unused vars checking disabled
- **Lovable integration**: Uses lovable-tagger for development mode component tagging

### Supabase Integration
- Project ID: `crpalakzdzvtgvljlutd`
- Client configured in `src/integrations/supabase/`
- Types are auto-generated from Supabase schema

### Component Library
Extensive shadcn/ui implementation with 40+ components including:
- Form components (inputs, selects, checkboxes, etc.)
- Navigation (menus, tabs, breadcrumbs)
- Feedback (toasts, alerts, progress)
- Layout (cards, separators, scroll areas)
- Data display (tables, charts via Recharts)

### Build and Deployment
- Vite handles bundling with React SWC for fast compilation
- Production builds optimize for modern browsers
- Lovable platform integration for automatic deployment
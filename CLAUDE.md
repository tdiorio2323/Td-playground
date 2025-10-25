# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ CRITICAL: FRONTEND PROTOTYPING ONLY

This is a **pure frontend sandbox** for rapid UI/UX prototyping. Focus exclusively on UI components, mock data, interactions, and design system refinement. **DO NOT implement** real API integrations, database queries, authentication logic, server-side functionality, or environment configurations for real services. All Supabase/backend references are **mocked for UI testing only**.

## Overview

TD Playground is a component experimentation environment used by TD Studios for prototyping, visual testing, design library management, and building reusable templates for client projects. This repo is **not production-bound**.

## Key Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (localhost:8080) |
| `pnpm build` | Production build |
| `pnpm build:dev` | Development mode build |
| `pnpm lint` | Run ESLint |
| `pnpm preview` | Preview production build |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests with coverage report |
| `pnpm lib` | Display library stats and component counts |
| `pnpm lib:open` | Launch the design library at `/library` |
| `pnpm lib:export` | Export library snapshot |
| `pnpm lib:sync` | Sync library assets to another project |
| `pnpm lib:version` | Show library version info |
| `pnpm routes:preview` | Generate route screenshots (requires dev server on :8081) |
| `pnpm routes:preview:fast` | Fast preview generation without images |
| `pnpm optimize:images` | Optimize images in public/lovable-uploads using Squoosh |

## Architecture

```
src/
├── design-library/           # Built-in design library system
│   ├── index.tsx             # Main interface (mounted at /library)
│   ├── registry/             # Component and asset registries
│   │   ├── components.ts     # Component catalog
│   │   ├── templates.ts      # Page templates
│   │   ├── icons.ts          # Icon registry
│   │   ├── fonts.ts          # Typography
│   │   └── backgrounds.ts    # Backgrounds and textures
│   ├── tabs/                 # UI tabs for library browsing
│   └── utils/                # Helper functions
├── pages/                    # Experimental routes and templates
├── lib/                      # Shared utilities and mock data
├── tools/                    # CLI scripts
│   ├── design-lib.cjs        # Design library management tool
│   └── generate-route-screenshots.mjs  # Route screenshot generator
└── SharedLayout.tsx          # Global layout wrapper
```

## Tech Stack

- **React 18 + TypeScript + Vite** - UI framework with SWC fast refresh
- **Tailwind CSS + shadcn/ui** - Utility-first styling with Radix UI primitives
- **React Router v6** - Client-side routing (no authentication guards)
- **TanStack Query** - Server state management
- **Vitest + Testing Library** - Unit testing with jsdom
- **pnpm 10.15.1+** - Package manager (required, not npm)

## App Initialization & Providers

The app is initialized in `src/App.tsx` with the following provider hierarchy:

```
<QueryClientProvider>        # TanStack Query for server state
  <TooltipProvider>           # Radix UI tooltip context
    <Toaster />               # shadcn/ui toast notifications
    <Sonner />                # Sonner toast system
    <BrowserRouter>           # React Router v6
      <Routes>
        <Route element={<SharedLayout />}>  # Metadata & layout wrapper
          {/* All app routes */}
        </Route>
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
</QueryClientProvider>
```

All routes are nested under `SharedLayout`, which provides:
- Automatic metadata management (title, OG tags, Twitter cards)
- Consistent `min-h-screen bg-background` wrapper
- Route-based metadata exclusions for branded pages

## Testing

All UI components are tested via Vitest and @testing-library/react.

**Test Configuration:**
- Test environment: jsdom (configured in `vite.config.ts`)
- Setup file: `src/setupTests.ts`
- Coverage provider: v8
- Coverage output: `coverage/` directory with text, html, and lcov formats

**Running Tests:**
```bash
pnpm test                    # Watch mode
pnpm test path/to/file.tsx   # Run specific file
pnpm test:coverage           # Generate coverage report
```

## Design Library System

The design library is a core feature of this playground, accessible at `/library`:

**Registry System:**
All design assets are cataloged in `src/design-library/registry/`:
- `components.ts` - Component catalog with ComponentDefinition interface
- `templates.ts` - Page templates
- `icons.ts` - Icon registry
- `fonts.ts` - Typography definitions
- `backgrounds.ts` - Background images and textures

**Adding New Components:**
Register components in `src/design-library/registry/components.ts`:
```typescript
{
  name: 'ComponentName',
  path: '/src/components/ComponentName.tsx',
  category: 'Auth Pages', // or: Management, Dashboards, Apps, Layouts
  description: 'Brief component description'
}
```

**CLI Tool** (`tools/design-lib.cjs`):
- Shows library stats (component counts, registry info)
- Exports library snapshots with manifest.json
- Syncs library to other projects
- Manages versioning

## Routing Architecture

Built on React Router v6 with centralized route definitions in `src/App.tsx`:

- **Layout Wrapper**: All routes wrapped in `SharedLayout` for consistent metadata and global layout
- **No Authentication**: All routes publicly accessible for prototyping (no auth guards)
- **Route Naming**: `/auth*` for auth pages, branded routes use client names (`/starluv`, `/cabana`, `/lcg`, `/quickprintz`)

### SharedLayout & Metadata System

`SharedLayout` (src/SharedLayout.tsx) automatically manages document metadata:

**Default Behavior:**
- Sets "CABANA" branding with OG image and Twitter cards
- Dynamically updates meta tags on route changes

**Metadata Exclusions:**
Routes that manage their own metadata (defined in `excludedExact` set in SharedLayout.tsx):
- Branded routes: `/quickprintz`, `/starluv*`, `/lilsex`, `/juanita*`, `/cabana`, `/thecabana`
- All routes starting with `/auth`

When adding new branded routes with custom metadata, add them to the `excludedExact` set in SharedLayout.tsx

### Key Routes
- `/` - Home page with ENTER button and Breakout game
- `/library` - Design library browser (40+ shadcn/ui components)
- `/directory` - Centralized component showcase
- `/authcard` - UI-only AuthCard component preview
- `/thedash` - Dashboard template
- `/storage` - Storage management interface
- `/auth`, `/auth2`, `/auth3-21` - Auth page variations
- `/juanita`, `/cabana`, `/starluv`, `/lcg`, `/quickprintz` - Branded auth pages
- `/cabanamgmt*` - Management portal variants
- `/shop`, `/product/:id`, `/checkout` - E-commerce templates
- `/bio/:username` - Dynamic link-in-bio pages

## Important Notes

- **Path Alias**: Use `@/` to reference `src/` directory (e.g., `import { Button } from "@/components/ui/button"`)
- **Package Manager**: Requires pnpm 10.15.1+ (not npm)
- **Dev Server**: Runs on port 8080 (vite.config.ts:11)
- **Route Screenshots**: Tool expects dev server on port 8081
- **Mock Data**: All backend operations use local mocks in `src/lib/` (mockStripe.ts, storage.ts, supabaseClient.ts, etc.)
- **Client Branding**: Branded routes follow naming conventions:
  - `/cabana`, `/thecabana`, `/cabanamgmt*` - CABANA
  - `/starluv*` - Star Luv
  - `/lcg` - Locust Growth Accelerator
  - `/quickprintz` - Quick Printz
  - `/juanita*` - Juanita

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

TD Playground is a component experimentation environment used by TD Studios for prototyping, visual testing, and design library management.

## Project Intent

This repo is **not production-bound**.
It exists for:

- Testing UI ideas
- Experimenting with design language
- Refining component behavior
- Building reusable templates for client projects

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

## Dependencies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Vitest

## Testing

All UI components are tested via Vitest and @testing-library/react.
Testing setup is configured within `vite.config.ts` and `src/setupTests.ts`.

Run individual test files:
```bash
pnpm test path/to/test.test.tsx
```

## Design Library System

The design library is a core feature of this playground, accessible at `/library`:

- **Registry System**: Components, templates, icons, fonts, and backgrounds are cataloged in `src/design-library/registry/*.ts`
- **Adding Components**: Register new components in `src/design-library/registry/components.ts` with name, path, category, and description
- **CLI Tool**: `tools/design-lib.cjs` manages library operations (stats, export, sync, version)
- **Categories**: Auth Pages, Management, Dashboards, Apps, Layouts

## Routing Architecture

- Built on React Router v6 with centralized route definitions in `src/App.tsx`
- All routes wrapped in `SharedLayout` for consistent global metadata and layout
- No authentication guards - all routes publicly accessible for prototyping
- Route naming convention: `/auth*` for auth pages, branded routes use client names (e.g., `/starluv`, `/cabana`, `/lcg`)

### Key Routes
- `/` - Home page with ENTER button and Breakout game
- `/library` - Design library browser (40+ shadcn/ui components)
- `/directory` - Centralized component showcase
- `/authcard` - UI-only AuthCard component preview
- `/thedash` - Dashboard template
- `/auth`, `/auth2-21`, `/juanita`, `/cabana`, `/starluv`, etc. - Auth page variations

## Path Alias

Use `@/` to reference the `src/` directory:
```typescript
import { Button } from "@/components/ui/button"
```

## Notes

- Authentication is stubbed; no actual backend connection (Supabase client included but locally simulated)
- All mock data is local and can be edited in `lib/mockData.ts`
- The `/library` route acts as a visual documentation layer for internal components
- The `/directory` route provides a centralized component showcase
- Dev server runs on port 8080 (configured in `vite.config.ts`)
- Route preview tool expects dev server on port 8081
- Package manager: pnpm 10.15.1+ (enforced via packageManager field)
- IMPORTANT: Use `pnpm` not `npm` - this project requires pnpm

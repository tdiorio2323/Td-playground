# CLAUDE.md — TD Playground

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
| `pnpm dev` | Start the development server |
| `pnpm lib` | Display library stats and component counts |
| `pnpm lib:open` | Launch the design library at `/library` |
| `pnpm lib:export` | Export library snapshot |
| `pnpm lib:sync` | Sync library assets to another project |
| `pnpm routes:preview` | Generate route screenshots |
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

## Notes

- Authentication is stubbed; no actual backend connection.
- All mock data is local and can be edited in `lib/mockData.ts`.
- The `/library` route acts as a visual documentation layer for internal components.

## Contributors

**Primary Maintainer:** Tyler Diorio
**Organization:** TD Studios
**Location:** `/Users/tylerdiorio/Td-playground`

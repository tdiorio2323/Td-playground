# Repository Guidelines

Use this guide as the canonical onboarding reference for anyone collaborating in this repo.

## Project Structure & Module Organization
All source lives in `src/`. Routed screens reside in `src/pages/`, shared UI in `src/components/`, showcase bundles in `design-library/`, hooks and helpers in `hooks/` + `lib/`, and client wiring in `integrations/` plus `boot/`. Entry points (`index.html`, `src/main.tsx`, `src/App.tsx`) boot the Vite app; static assets stay in `public/`, preview artifacts in `previews/`, and build + coverage outputs in `dist/` and `coverage/`. Keep feature tests beside their modules (or a sibling `__tests__/`) and reuse `src/setupTests.ts` for globals. Scripts under `tools/` manage the design library and preview rebuilds.

## Build, Test, and Development Commands
- `pnpm install` — installs deps with the pinned pnpm version.
- `pnpm dev` — launches the Vite dev server on http://localhost:8080 with HMR.
- `pnpm build` / `pnpm preview` — compiles for production and serves the result.
- `pnpm build:dev` — emits a readable bundle for debugging build issues.
- `pnpm lint` — runs ESLint across TS/TSX sources.
- `pnpm test` / `pnpm test:coverage` — executes Vitest in watch or CI+coverage mode.
- `pnpm lib:open|export|sync|version` — maintains `tools/design-lib.cjs` workflows.
- `pnpm routes:preview(:fast)` — refreshes `previews/routes-preview.html`; `pnpm optimize:images` compresses new media.

## Coding Style & Naming Conventions
Write TypeScript React function components with 2-space indentation, semicolons, and the `@` path alias from `vite.config.ts`. Components/pages adopt PascalCase, hooks use camelCase prefixed with `use`, utilities expose named exports, and constants prefer SCREAMING_SNAKE_CASE. Favor Tailwind, shadcn/ui, Radix primitives, and the shared `cn()` helper; centralize reusable data fetching inside TanStack Query-powered hooks. Let ESLint + Prettier in your editor enforce consistency before committing.

## Testing Guidelines
Vitest and React Testing Library are wired through `vite.config.ts` and `src/setupTests.ts`. Name specs `*.test.ts(x)`, colocate them with the code they cover, and mock Supabase, router, and browser APIs for determinism. Run `pnpm test:coverage` before merging auth, navigation, overlay, or command-palette changes so regressions surface early. Never accept snapshot updates blindly—confirm the rendered output.

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat: workspace filters`, `fix: auth guard redirect`, etc.) and scope subjects to the surface touched. Squash WIP branches before opening a PR. Every PR should include a concise summary, linked issue, screenshots or preview links for UI work, QA or env-var impacts, and any manual migration steps. Run `pnpm lint` plus `pnpm test:coverage` locally and note failures or deviations in the description.

## Security & Configuration Tips
Secrets belong in `.env.local` with `VITE_` prefixes (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, …) and should be managed via Supabase/Firebase dashboards. Validate new endpoints under `src/integrations/`, avoid committing preview HTML with real data, and strip dev-only overlays before production releases. Run `pnpm optimize:images` on new assets and document any required role or ACL changes when touching Supabase config.

# Repository Guidelines

## Project Structure & Module Organization
- Source lives in `src/`. Route views in `src/pages/`, reusable UI in `src/components/`, hooks in `src/hooks/`, utilities in `src/lib/`, and third‑party connectors in `src/integrations/`.
- Entry files: `index.html`, `src/main.tsx`, `src/App.tsx`.
- Static assets in `public/`.
- Core config at root: `vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`, `tsconfig*.json`.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies.
- `pnpm dev` — start dev server at http://localhost:8080.
- `pnpm lint` — run ESLint on all TS/TSX files.
- `pnpm build` — create production bundle.
- `pnpm preview` — serve the production build locally.
- `pnpm vitest` / `pnpm vitest run` — run tests (watch/CI).
- `pnpm vitest --coverage` — generate coverage report.

## Coding Style & Naming Conventions
- TypeScript + React function components, 2‑space indent, semicolons; match file’s quote style.
- Components (in `pages/` and `components/`) use PascalCase, e.g., `LoginForm.tsx`.
- Hooks use camelCase `useThing`, e.g., `useAuthGuard`.
- Utilities in `lib/` expose named exports only.
- Prefer Tailwind utilities; compose variants with `cn()` from `src/lib/utils.ts` and shadcn/ui patterns.

## Testing Guidelines
- Vitest with jsdom (configured via `vite.config.ts`, bootstrap in `src/setupTests.ts`).
- Name tests `*.test.ts` or `*.test.tsx`; colocate near code or in `src/__tests__/`.
- Tests must be deterministic; mock network calls and external SDKs. Cover happy paths and critical edges.
- Use `pnpm vitest --coverage` to review coverage for key modules.

## Commit & Pull Request Guidelines
- Commits: compact, present tense; reference affected view/component (e.g., “Adjust Dashboard hero spacing”).
- PRs: clear summary, linked issues/tickets, and screenshots/GIFs for UI changes.
- Confirm `pnpm lint` and the Vitest suite pass before requesting review; flag breaking changes and required env updates.

## Security & Configuration Tips
- Never commit secrets. Use `.env.local` with `VITE_` prefixes (e.g., `VITE_SUPABASE_URL`).
- Manage credentials via Supabase/Firebase/Vercel dashboards. Validate new external URLs and sanitize user input before rendering.

## Agent‑Specific Instructions
- When editing files, follow the structure and conventions above; keep changes minimal and focused. Update docs/tests when behavior changes. The scope of this file is the entire repository.


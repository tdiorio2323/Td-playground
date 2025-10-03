# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`. Route-level views belong in `src/pages/`, reusable UI in `src/components/`, shared logic in `src/hooks/` and utilities in `src/lib/`. Keep third-party connectors inside `src/integrations/`. Entry files are `index.html`, `src/main.tsx`, and `src/App.tsx`. Static assets (favicons, images) live under `public/`. Core configuration sits at the repo root: `vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`, and the `tsconfig*.json` set.

## Build, Test, and Development Commands
Install dependencies with `pnpm install`. Launch the dev server via `pnpm dev` (http://localhost:8080). Run `pnpm lint` to execute ESLint on all TS/TSX files. Ship-ready bundles come from `pnpm build`, and `pnpm preview` serves the build locally. Execute unit and component tests with `pnpm vitest` (watch) or `pnpm vitest run`. For coverage reports, run `pnpm vitest --coverage`.

## Coding Style & Naming Conventions
Write modern TypeScript and React function components with 2-space indentation and semicolons. Match the existing quote style per file. Components in `pages/` and `components/` use PascalCase (`LoginForm.tsx`). Hooks follow `useThing` camelCase (`useAuthGuard`). Utilities in `lib/` should be named exports. Prefer Tailwind utility classes; compose variants with `cn()` from `src/lib/utils.ts` and shadcn/ui patterns.

## Testing Guidelines
Vitest with jsdom powers the test suite (configured in `vite.config.ts` and bootstrapped by `src/setupTests.ts`). Name files `*.test.ts` or `*.test.tsx` and keep them near the code or in `src/__tests__/`. Tests should be deterministic: mock network calls and external SDKs. Ensure new features include coverage for happy-path and critical edge cases.

## Commit & Pull Request Guidelines
Write compact, present-tense commits that reference the affected view or component when relevant (e.g., "Adjust Dashboard hero spacing"). Pull requests need a clear summary, linked issues or tickets, and screenshots or GIFs for UI-facing changes. Confirm `pnpm lint` and the Vitest suite pass before requesting review, and flag breaking changes or required environment updates in the PR body.

## Security & Configuration Tips
Never commit secrets. Store local overrides in `.env.local` with `VITE_` prefixes (e.g., `VITE_SUPABASE_URL`). Manage Supabase, Firebase, and Vercel credentials via their dashboards. Validate any new external URLs and sanitize user-provided data before rendering.

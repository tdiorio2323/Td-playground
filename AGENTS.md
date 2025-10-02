# Repository Guidelines

## Project Structure & Module Organization
- Source lives in `src/`:
  - `pages/` route views (React Router)
  - `components/` reusable UI (shadcn/ui + Tailwind)
  - `hooks/`, `lib/`, `integrations/`
- Entry points: `index.html`, `src/main.tsx`, `src/App.tsx`.
- Static assets: `public/`.
- Key configs: `vite.config.ts`, `tailwind.config.ts`, `eslint.config.js`, `tsconfig*.json`.

## Build, Test, and Development Commands
- Install deps (preferred): `pnpm install`.
- Run dev server: `pnpm dev` → http://localhost:8080
- Lint code: `pnpm lint` (ESLint on TS/TSX).
- Build for prod: `pnpm build`; Preview build: `pnpm preview`.
- Tests (Vitest + jsdom): `pnpm vitest` (watch) or `pnpm vitest run`. Coverage: `pnpm vitest --coverage`.

## Coding Style & Naming Conventions
- Language: TypeScript + React function components.
- Indentation: 2 spaces; include semicolons; single quotes or double consistently per file.
- Components use PascalCase in `components/` and `pages/` (e.g., `LoginForm.tsx`).
- Hooks use `useXxx` camelCase in `hooks/`.
- Utilities go in `lib/`; prefer named exports. Use `cn()` from `src/lib/utils.ts` for class names (built on `clsx`/`tailwind-merge`).
- Styling: Tailwind CSS; co-locate styles with components; leverage shadcn/ui patterns and `class-variance-authority` for variants.
- Run `pnpm lint` and fix issues before pushing.

## Testing Guidelines
- Framework: Vitest (configured in `vite.config.ts`), setup at `src/setupTests.ts`.
- Name tests `*.test.ts` or `*.test.tsx`; co-locate near code or use `src/__tests__/`.
- Keep tests deterministic; avoid real network calls. Mock where needed.

## Commit & Pull Request Guidelines
- Commits: present tense and concise (e.g., "Change WEBSITE button to green/black gradient"). Reference affected page/component when helpful.
- PRs include: clear summary, linked issues, screenshots/GIFs for UI changes, and confirmation that `pnpm lint` and tests pass.
- Call out breaking changes and any required env/config updates.

## Security & Configuration Tips
- Do not commit secrets. Use `.env.local` with Vite `VITE_` prefixes (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- Manage Supabase/Firebase/Vercel settings in their dashboards; only use public/anon keys client-side.
- Validate external links/domains and sanitize user input where applicable.


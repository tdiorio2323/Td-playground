# TD Playground

Experimental front-end–only sandbox used to design and prototype:

- Link-in-bio / auth-style profile cards
- Themed landing pages (Cabana, casino, spooky, etc.)
- Simple shop / checkout flows
- Reusable UI components for TD STUDIOS projects

This repo is **not** a production app. It is a **UI lab** for fast iteration and visual exploration.

---

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router v6
- Tailwind CSS (+ `tailwindcss-animate`, `@tailwindcss/typography`)
- shadcn/ui (Radix primitives)
- TanStack Query
- react-hook-form + zod

Backend SDKs (Supabase, OpenAI, Firebase) may exist, but this project should be treated as **front-end only**. Use mock data and fake hooks instead of real network calls.

---

## Package Manager

The project is configured to use **pnpm** (see `packageManager` in `package.json` and `pnpm-lock.yaml`).

Preferred commands:

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

If `pnpm` is not installed:

```bash
npm install -g pnpm
```

---

## Scripts

Adjust this section to match your `package.json` exactly.

Common scripts:

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Lint (preferred)
pnpm lint
```

If ESLint scripts reference missing config files
(`.eslintrc-local.cjs`, `eslint.config.local.mjs`), either:

* Add those files, or
* Update scripts to use an existing config (for example `eslint.config.js`).

Example:

```jsonc
"scripts": {
  "lint": "eslint -c eslint.config.js src/**/*.{ts,tsx}"
}
```

---

## Route Model

This app uses React Router with a flat routing table in `App.tsx`.

Typical route categories:

* **Auth / Link-in-bio experiments**

  * `/auth`, `/auth2`
  * `/juanita*`, `/starluv*`
  * `/quickprintz`, `/soundimageband`, `/joincabana`
  * `/authcard`, `/bio/:username`, `/luna-star-link`
* **Cabana / nightlife**

  * `/cabana`, `/thecabana`
  * `/cabanamgmt*`, `/vip`, `/waitlist`, `/casino-nav`
* **Shop / e-commerce**

  * `/shop`, `/product/:id`, `/checkout`
  * `/premade-bag-designs`
* **Core / utilities**

  * `/`, `/hub`, `/directory`, `/library`, `/storage`
  * `/admin`, `/brand`, `/portal`, `/project/:id`
* **Misc experiments**

  * `/spooky`, `/thedash`, `/lcg`, `/home-1`
  * `/backroom`, `/testing-lab`

> Routes are experimental. The goal is to move successful patterns into production repos (Cabana, TD Studios main site, casino project, etc.).

---

## Creating a New Experiment Route

### 1. Create a page file

Example for an auth/link card:

```tsx
// src/pages/Auth23.tsx
import { AuthCardBase } from "@/components/auth/AuthCardBase";

export default function Auth23() {
  return (
    <AuthCardBase
      name="Verde"
      headline="Digital Artist • Motion"
      avatar="/images/verde-transparent-logo.png"
      accentGradient="from-emerald-400 via-lime-300 to-cyan-400"
      backgroundVariant="cyber-grid"
      buttons={[
        { label: "Portfolio", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "Contact", href: "#" },
      ]}
      tags={["3D", "Loops", "Merch"]}
    />
  );
}
```

### 2. Register the route in `App.tsx`

```tsx
import Auth23 from "./pages/Auth23";

// inside <Routes>:
<Route path="/auth23" element={<Auth23 />} />
```

### 3. Use mock data only

Do not wire real Supabase/OpenAI calls in this repo. If you need “backend-like” behavior, create simple local mocks or fake hooks (`useMockUser`, `useMockProducts`) to drive the UI.

---

## How This Playground Fits into TD STUDIOS

* **Source of UI truth**
  New layout/interaction ideas get tested here first.

* **Component export base**
  When something works:

  * Extract the component
  * Move it into the target repo (Cabana, casino, TD main site)
  * Keep this repo for experimentation only

* **Safe demo surface**
  You can point creators/clients to specific routes (`/auth22`, `/cabana`, `/casino-nav`) as **visual demos** without exposing real data or production logic.

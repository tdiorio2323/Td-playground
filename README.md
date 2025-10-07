# 🧩 TD Playground

**TD Playground** is a personal development sandbox for **building, testing, and refining UI/UX components** before integrating them into live TD Studios projects.

---

## 🎯 Purpose
A controlled environment for rapid prototyping.
Used to experiment with layouts, design systems, component logic, and new visual patterns before production.

---

## ⚙️ Features

### Design Library System
- `/library` route for browsing and testing 40+ shadcn/ui components
- Icon, template, background, and typography registries
- CLI utilities for managing, exporting, and syncing designs

```bash
npm run lib
npm run lib:open
npm run lib:export
npm run lib:sync
npm run lib:version
```

### Route Preview Tools
- `npm run routes:preview` → generates full route screenshots
- `npm run routes:preview:fast` → skips images for faster previews

### Component Directory
- `/directory` route for centralized component showcase

### Mock Backend
- Local Supabase simulation for frontend-only prototyping

---

## 🧠 Tech Stack
| Layer | Stack |
|-------|--------|
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Routing | React Router v6 |
| State | TanStack Query |
| Testing | Vitest + Testing Library |
| Package Manager | pnpm 10.15.1+ |

---

## 🧱 Use Cases
- Rapid UI prototyping
- Design system experimentation
- Interaction + animation testing
- Client mockup development
- Component library curation

---

## 📁 Project Structure

```
src/
├── design-library/       # Central component + asset library
│   ├── registry/         # Components, templates, icons, fonts, backgrounds
│   └── tabs/             # Library tab views
├── pages/                # Experimental + Auth templates (Auth1–Auth21)
├── lib/                  # Utilities + mock data
├── tools/                # CLI tools (library + route previews)
└── SharedLayout.tsx      # Global layout + metadata
```

---

## 🚀 Commands
```bash
# Run dev environment
pnpm dev

# Open design library
pnpm lib:open

# Generate route previews
pnpm routes:preview

# Export library snapshot
pnpm lib:export
```

---

## 🧭 Purpose Summary

This playground acts as your **visual lab** — a workspace for refining design language, testing user flows, and pre-building UI assets that flow into the broader TD Studios ecosystem.

---

**Author:** TD Studios
**Maintainer:** Tyler Diorio
**Directory:** `/Users/tylerdiorio/Td-playground`

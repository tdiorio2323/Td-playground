# Code Janitor Cleanup Summary

This report summarizes the results of the code janitor run. The goal was to detect and fix messy code and unused imports with zero functional changes.

## Metrics

| Metric                      | Before | After | Change |
| --------------------------- | ------ | ----- | ------ |
| ESLint Errors               | 21     | 20    | -1     |
| ESLint Warnings             | 11     | 11    | 0      |
| Prettier Issues             | 156    | 0     | -156   |
| Unused Dependencies (knip)  | 26     | 26    | 0      |
| Unused Dependencies (depcheck) | 16     | 16    | 0      |

## A) Unused Imports Fixed

- **ESLint:** 1 issue was auto-fixed.
- **Prettier:** 156 files were formatted.

## B) Remaining Unused Exports (ts-prune)

`ts-prune` found no unused exports.

## C) Unused Dependencies

### Unused Dependencies (from knip)

- `@hookform/resolvers`
- `@radix-ui/react-accordion`
- `@radix-ui/react-alert-dialog`
- `@radix-ui/react-aspect-ratio`
- `@radix-ui/react-checkbox`
- `@radix-ui/react-collapsible`
- `@radix-ui/react-context-menu`
- `@radix-ui/react-hover-card`
- `@radix-ui/react-menubar`
- `@radix-ui/react-navigation-menu`
- `@radix-ui/react-popover`
- `@radix-ui/react-radio-group`
- `@radix-ui/react-scroll-area`
- `@radix-ui/react-slider`
- `@radix-ui/react-toggle`
- `@radix-ui/react-toggle-group`
- `date-fns`
- `embla-carousel-react`
- `input-otp`
- `openai`
- `react-day-picker`
- `react-hook-form`
- `react-resizable-panels`
- `tailwindcss-animate`
- `vaul`
- `zod`

### Unused Dependencies (from depcheck)

- `@hookform/resolvers`
- `@squoosh/cli`
- `@swc/core`
- `@tailwindcss/typography`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `@vitest/coverage-v8`
- `autoprefixer`
- `depcheck`
- `eslint-config-prettier`
- `eslint-plugin-import`
- `eslint-plugin-simple-import-sort`
- `knip`
- `postcss`
- `prettier`
- `ts-prune`

### Missing Dependencies

`depcheck` found no missing dependencies.

## D) Largest Files

| File                                     | Lines |
| ---------------------------------------- | ----- |
| `src/components/ui/sidebar.tsx`          | 734   |
| `src/pages/Vip.tsx`                      | 686   |
| `src/design-library/registry/icons.ts`   | 674   |
| `src/components/BrandDashboard.tsx`      | 668   |
| `src/pages/CasinoNav.tsx`                | 637   |

## E) Follow-ups that require human review

The following ESLint issues could not be auto-fixed and require manual intervention:

<details>
<summary>View ESLint Issues</summary>

```
/Users/tylerdiorio/Td-playground/src/boot/breakout.tsx
   9:3  error  Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment
  11:3  error  Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free  @typescript-eslint/ban-ts-comment

/Users/tylerdiorio/Td-playground/src/components/AuthPage7.test.tsx
  44:79  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/tylerdiorio/Td-playground/src/components/CustomerApp.tsx
  263:32  error  This branch can never execute. Its condition is a duplicate or covered by previous conditions in the if-else-if chain  no-dupe-else-if

/Users/tylerdiorio/Td-playground/src/components/SlotMachine.tsx
  133:20  warning  The ref value 'intervalRefs.current' will likely have changed by the time this effect cleanup function runs. If this ref points to a node rendered by React, copy 'intervalRefs.current' to a variable inside the effect, and use that variable in the cleanup function  react-hooks/exhaustive-deps

/Users/tylerdiorio/Td-playground/src/components/ui/badge.tsx
  36:17  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/Users/tylerdiorio/Td-playground/src/components/ui/button.tsx
  57:18  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/Users/tylerdiorio/Td-playground/src/components/ui/command.tsx
  24:11  error  An interface declaring no members is equivalent to its supertype  @typescript-eslint/no-empty-object-type

/Users/tylerdiorio/Td-playground/src/components/ui/form.tsx
  168:3  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/Users/tylerdiorio/Td-playground/src/components/ui/navigation-menu.tsx
  119:3  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/Users/tylerdiorio/Td-playground/src/components/ui/sidebar.tsx
  760:3  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/Users/tylerdiorio/Td-playground/src/components/ui/sonner.tsx
  29:19  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/Users/tylerdiorio/Td-playground/src/components/ui/textarea.tsx
  5:18  error  An interface declaring no members is equivalent to its supertype  @typescript-eslint/no-empty-object-type

/Users/tylerdiorio/Td-playground/src/components/ui/toggle.tsx
  43:18  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/Users/tylerdiorio/Td-playground/src/design-library/tabs/IconsTab.tsx
  66:49  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/tylerdiorio/Td-playground/src/design-library/tabs/TemplatesTab.tsx
  35:21   error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  41:85   error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  89:102  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/tylerdiorio/Td-playground/src/design-library/utils/SafePreview.tsx
   5:11  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
   7:31  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
   9:40  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  13:28  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any
  13:44  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/tylerdiorio/Td-playground/src/integrations/supabase/auth.tsx
  53:14  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  55:14  warning  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components

/Users/tylerdiorio/Td-playground/src/lib/mockStripe.ts
   6:32  error  The `Function` type accepts any function-like value.
Prefer explicitly defining any function parameters and return type  @typescript-eslint/no-unsafe-function-type
  11:36  error  Unexpected any. Specify a different type                                                                                 @typescript-eslint/no-explicit-any
  19:23  error  Unexpected any. Specify a different type                                                                                 @typescript-eslint/no-explicit-any

/Users/tylerdiorio/Td-playground/src/pages/Auth7_2.test.tsx
  39:79  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/tylerdiorio/Td-playground/src/pages/ProductDetail.tsx
  155:45  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

/Users/tylerdiorio/Td-playground/src/pages/Spooky.tsx
  58:6  warning  React Hook useEffect has a missing dependency: 'nextSlide'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
```

</details>

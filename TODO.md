# Project Refactoring and Cleanup

This document outlines the necessary tasks to refactor the codebase, standardize the technology stack, and improve overall code quality.

## High Priority

### 1. Standardize on `shadcn/ui` and `lucide-react`

*   **Task:** Remove all instances of `@mui/material` and `@mui/icons-material`.
*   **Files to change:**
    *   `src/pages/Home.tsx`
*   **Action:**
    *   Replace MUI components (`Button`, `IconButton`, `Card`, `TextField`, etc.) with their `shadcn/ui` equivalents.
    *   Replace MUI icons with icons from `lucide-react`.
    *   Remove `@mui/material`, `@mui/icons-material`, and `@mui/system` from `package.json`.

### 2. Eliminate Inline Styles

*   **Task:** Remove all inline `style` attributes and replace them with Tailwind CSS utility classes.
*   **Files to change:**
    *   Numerous components, especially `AuthPage*` components.
*   **Action:**
    *   Identify the styles being applied inline (e.g., `fontFamily`, `width`, `color`).
    *   Create corresponding utility classes in `tailwind.config.ts` if they don't already exist.
    *   Replace the inline `style` attributes with the appropriate Tailwind classes.

## Medium Priority

### 3. Add Unit and Integration Tests

*   **Task:** Increase test coverage to ensure application stability.
*   **Action:**
    *   Write a test for a form using React Hook Form and Zod.
    *   Write a test for a data hook using TanStack Query.
    *   Establish a pattern for testing components and hooks.

## Low Priority

### 4. Review Custom CSS

*   **Task:** Review `src/App.css` and `src/index.css` to ensure they are not conflicting with the Tailwind CSS design system.
*   **Action:**
    *   Analyze the contents of these files.
    *   If the styles are custom and necessary, consider moving them to `tailwind.config.ts` as custom utilities.
    *   If the styles are overrides or duplicates, remove them.

### 5. Remove Firebase Hosting

*   **Task:** If the intention is to standardize on a different hosting provider (e.g., Vercel, which is also present in the project), remove the Firebase hosting configuration.
*   **Action:**
    *   Delete `firebase.json` and `.firebaserc`.
    *   Update deployment scripts if necessary.

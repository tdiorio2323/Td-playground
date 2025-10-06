# Project Refactoring and Cleanup

This document outlines the necessary tasks to refactor the codebase, standardize the technology stack, and improve overall code quality.

## High Priority

### 1. Purge Inline Styles
*   **Task:** Remove all inline `style` attributes and replace them with Tailwind CSS utility classes.
*   **Files to change:** Numerous components, as listed in `audit-inline-and-empty-hrefs.txt`.
*   **Action:** Audit all files for `style={{...}}` and convert them to Tailwind classes. Add custom fonts or styles to `tailwind.config.ts` as needed.

## Medium Priority

### 2. Add Tests
*   **Task:** Increase test coverage for critical components and hooks.
*   **Action:** Add tests for forms, data hooks, and complex UI components.

## Low Priority

### 3. Review Custom CSS
*   **Task:** Review `src/App.css` and `src/index.css`.
*   **Action:** Move necessary custom styles to `tailwind.config.ts` and remove redundant or conflicting styles.

### 4. CI Workflow
*   **Task:** Implement a CI workflow for automated checks.
*   **Action:** Create a `.github/workflows/ci.yml` file to run linting, type-checking, tests, and build on every push.
# Auth Routes Audit

This report summarizes auth-related routes, components, CTAs, external links, and meta behavior as defined in `src/App.tsx`.

- /auth2
  - Component: `src/pages/Auth.tsx` → `AuthPage`
  - CTAs: Exclusive → `https://letslink.tdstudiosny.com/cabana`.
  - External: Instagram, OnlyFans, TikTok, Kick, Twitter, YouTube (generic).
  - Meta: Page does not set its own meta (SharedLayout excludes `/auth*`).

- /juanita (alias: `/thecabana`)
  - Component: `src/pages/Auth3.tsx` → `AuthPage`
  - CTAs: Same as `AuthPage` generics.
  - External: Generic socials per `AuthPage`.
  - Meta: Yes (JUANITA title + image). `/thecabana` maps to same page.

- /juanita2
  - Component: `src/pages/Auth3_2.tsx` → `AuthPage2`
  - CTAs: Instagram `https://www.instagram.com/juanita_jcv/`; OnlyFans `https://onlyfans.com/juanitajcv`.
  - External: As above.
  - Meta: Yes (JUANITA 2 title + image).

- /juanita3
  - Component: `src/pages/Auth3_3.tsx` → `AuthPage3`
  - CTAs: Instagram `juanita_jcv`; OnlyFans `juanitajcv`; form submit shows demo toast.
  - External: As above.
  - Meta: Yes (JUANITA 3 title + image).

- /juanita4 (alias: `/cabana`)
  - Component: `src/pages/Auth3_4.tsx` → `AuthPage4`
  - CTAs: Internal buttons → `/juanita`, `/juanita2`, `/juanita3`; form opens `https://www.instagram.com/tdstudiosco/`.
  - External: Instagram (TD Studios).
  - Meta: Yes (CABANA title + image). `/cabana` maps to same page.

- /auth4
  - Component: `src/pages/Auth4.tsx` → `AuthPage`
  - CTAs: `AuthPage` generics.
  - External: Generic socials per `AuthPage`.
  - Meta: Now sets minimal OG/Twitter (title `Cabana | Auth`).

- /joincabana
  - Component: `src/pages/Auth5.tsx` → `AuthPage`
  - CTAs: `AuthPage` generics.
  - External: Generic socials per `AuthPage`.
  - Meta: Now sets minimal OG/Twitter (title `Cabana | Join`).

- /lilsex
  - Component: `src/pages/Auth6.tsx` → `AuthPage6`
  - CTAs: Instagram `https://www.instagram.com/lilsex_/`; OnlyFans (placeholder).
  - External: As above; email `mailto:inquiries@lilsex.com`.
  - Meta: Yes (LIL SEX title + image).

- /starluv (aliases: `/starluv-3`, `/starluv-4`)
  - Component: `src/pages/Auth7.tsx` → `AuthPage7`
  - CTAs: EXCLUSIVE → navigates to `/starluv-2`; Instagram, OnlyFans, Twitch, Chatterly, YouTube, TikTok.
  - External: `xostarluv` links across platforms.
  - Meta: Yes (STAR LUV title + image). `/starluv-3` and `/starluv-4` map to same page.

- /starluv-2
  - Component: `src/pages/Auth7_2.tsx` → `AuthPage7_2`
  - CTAs: Instagram `https://www.instagram.com/xostarluv/`; OnlyFans `https://onlyfans.com/xostarluv`.
  - External: As above; slideshow with locked overlay.
  - Meta: Yes (STAR LUV title + image).

Notes
- Aliases: `/thecabana` = `/juanita`, `/cabana` = `/juanita4`, `/starluv-3` and `/starluv-4` = `/starluv`.
- Internal nav: `/starluv` EXCLUSIVE now correctly navigates to `/starluv-2`.


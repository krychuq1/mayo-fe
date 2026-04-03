# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `ng serve` (port 4200)
- **Build:** `ng build`
- **Build watch:** `ng build --watch --configuration development`
- **Run tests:** `ng test`
- **SSR server:** `node dist/mayo-fe/server/server.mjs`

## Architecture

Angular 20 app with SSR, standalone components (no NgModules), and zoneless change detection.

**Backend API:** `https://server.mayo-app.com` (production), configured per-environment in `src/environments/`.

### Auth Flow

Email-based registration with no password. Token stored in cookies (30-day expiry) via `ngx-cookie-service`. Flow: register email → poll for email confirmation (3s interval) → activate via email link → token validated by guards on protected routes.

- `AuthService` (`src/app/services/auth.service.ts`) — handles registration, token validation, activation, and calendar data
- `authGuard` — validates token cookie, loads user data, redirects to `/welcome` if invalid
- `videoGuard` — requires all 24 advent days opened before allowing `/master-class`

### Routing

| Route | Component | Guard |
|---|---|---|
| `/` | Dashboard | authGuard |
| `/welcome` | WelcomeScreen | — |
| `/email-confirmation` | EmailConfirmation | — |
| `/activate-user/:token` | ActivateUser | — |
| `/master-class` | VideoPlayer | videoGuard |

### SSR Render Modes

Defined in `src/app/app.routes.server.ts`: `/activate-user/:token` is server-rendered; all other routes are prerendered.

### Key Patterns

- **Signals** for component-level reactive state; **RxJS observables** for HTTP and polling
- **Platform checks** (`isPlatformBrowser`) required before browser-only APIs (cookies, timers, DOM)
- **Reactive forms** with custom validators (email matching in resend flow)
- Services use `HttpClient` with Bearer token in Authorization header
- State is minimal — `AuthService.userWithCalendarData` caches the current user; no global store

### Styling

SCSS with shared partials in `src/app/styles/` (colors, fonts, buttons, input). Global styles in `src/styles.scss`. Component styles are inline SCSS. Uses `animate.css` and `ngx-owl-carousel-o` styles globally.

- Primary color: `#F77710` (orange)
- Font primary: Inter; Font secondary: Press Start 2P (pixel/retro)

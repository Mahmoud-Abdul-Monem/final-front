# Codex project context

Read `PROJECT_SUMMARY.md` first for the full project map. This file is a short continuation note for future Codex chats so they can avoid repeatedly rediscovering the architecture.

## Project

- Luminous Marketplace frontend in `C:\Users\Mahmoud Abdul-Monem\Desktop\final-front`.
- Next.js 16 App Router, React 19, TypeScript, Tailwind/DaisyUI, Zustand, Strapi backend.
- Shared Strapi origin: `NEXT_PUBLIC_STRAPI_URL`, centralized in `src/lib/strapi.ts`.
- Follow `AGENTS.md`: read the relevant local guide under `node_modules/next/dist/docs/` before changing Next.js APIs or conventions. Read `PROJECT_SUMMARY.md` before broader project changes.

## Architecture boundaries

- `src/services/`: network requests to Strapi.
- `src/lib/validation/`: Yup schemas.
- `src/hooks/`: shared client interactions, including `useCartActions.ts`.
- `src/lib/`: pure helpers and shared auth/cart utilities.
- `src/store/`: persisted Zustand state; cart state is in `cartStore.ts`.
- `src/components/header/`: focused header controls; `Header.tsx` composes them.
- `src/proxy.ts`: request-time optimistic route redirects; it checks cookie presence only and does not validate JWTs.
- `src/app/(auth)/hooks/`: submission/navigation orchestration; auth network calls are in `src/services/auth.ts`.

## Current auth/cart behavior

- `token` cookie presence is the UI/proxy signal for signed-in state.
- `/cart` without token redirects to `/login?next=/cart`.
- `/login` and `/register` with token redirect to `/`.
- Header Login/Register links are rendered by `src/components/header/AuthLinks.tsx` only while signed out; it is client-side display logic, not security enforcement.
- Header cart control is in `CartBadge.tsx`. Signed-out cart access shows a toast and navigates to `/login?next=/cart`.
- Adding a product while signed out shows a toast without navigating. Product-card cart actions should use `useCartActions`.
- OAuth query callback accepts `access_token` or `jwt`, stores a cookie in the proxy, and redirects to `/`.
- Facebook login is intentionally disabled (“Coming soon”). Google OAuth uses the shared Strapi URL.

## Recent work

- Removed category item-count rendering; counts remain in the API model.
- Added responsive accessible Login/Register header links, hidden after a token is detected.
- Updated proxy route redirects for authenticated login/register pages.
- Cart action feedback and redirect behavior is centralized in `useCartActions` for cart viewing.
- `PROJECT_SUMMARY.md` and `AGENTS.md` reflect current route protection and boundaries.

## Verification

- Use `./node_modules/.bin/tsc --noEmit` for TypeScript.
- Browser visual checks can use the available Playwright MCP server.
- Dev server: `npm run dev`.

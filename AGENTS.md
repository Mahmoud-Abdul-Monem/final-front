<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Verification
- TypeScript: `./node_modules/.bin/tsc --noEmit` (npx may pick up system tsc wrapper)
- Browser testing: Playwright MCP server is available for visual verification
- Dev server: `npm run dev` (uses Turbopack)
- Auth: `/cart` is protected by `src/proxy.ts`; unauthenticated visits redirect to `/login?next=/cart`. Authenticated visits to `/login` or `/register` redirect to `/`. OAuth callbacks may accept `?access_token=...` or `?jwt=...`.

## Project context
- Read `PROJECT_SUMMARY.md` first for the current architecture, routes, environment variables, service boundaries, state behavior, and known limitations. Treat it as a concise map; inspect source files only for the specific change being made.
- The frontend uses `NEXT_PUBLIC_STRAPI_URL` as the shared Strapi base URL (`src/lib/strapi.ts`). Do not add new hardcoded Strapi origins.
- Keep responsibilities separated: network requests in `src/services/`, validation schemas in `src/lib/validation/`, shared client interaction logic in `src/hooks/`, pure helpers in `src/lib/`, and persisted state in `src/store/`.
- UI styling is Tailwind CSS 4 + DaisyUI 5, configured in `src/app/globals.css`. Use DaisyUI classes for common controls (`input`, `select`, `textarea`), buttons (`btn` variants), cards, badges, and alerts; retain Tailwind for layout, spacing, responsive behavior, and one-off visual details.
- Reuse `.ui-field`, `.auth-form-card`, `.featured-product-card`, and `.catalog-product-card` from `src/app/globals.css` where applicable. Their exact colors, shadows, spacing, border treatments, and responsive breakpoints are documented in `PROJECT_SUMMARY.md` under “Styling, images, and accessibility”. Do not replace these shared recipes with slightly different per-page styles.
- Preserve the existing light/dark palette, typography, and responsive breakpoints when editing UI. In particular, auth card sizing changes at `md`/`lg`, and list product cards change to horizontal layout at `sm`.
- Cart UI actions should go through `src/hooks/useCartActions.ts` so login gating and toast behavior remain consistent. Cart state itself belongs in `src/store/cartStore.ts`.
- Category item counts are part of the API model but should not be rendered beside category labels unless explicitly requested.
- Facebook login is intentionally disabled and marked “Coming soon”; it should not send an OAuth request until implemented.
- Before changing Next.js APIs or conventions, read the relevant guide under `node_modules/next/dist/docs/` as required above.

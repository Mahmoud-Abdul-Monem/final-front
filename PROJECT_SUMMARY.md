# Luminous Marketplace

Technical documentation for the current Luminous Marketplace codebase. This guide describes the implementation as it exists in the repository, including incomplete features and operational constraints.

## 1. Product overview

Luminous Marketplace is an English-language e-commerce storefront built with the Next.js App Router. It renders a home page, product catalogs, informational pages, authentication forms, and a shopping cart. Product, category, offer, and deal data are fetched from a Strapi backend. Cart, theme, and favorite-product state are managed in browser state stores.

The application is a frontend project. Checkout, payment processing, order management, a dedicated favorites page, and several form submissions are not implemented end to end.

Category cards and catalog category filters show category names without item-count labels. The API model still carries `itemCount`; it is simply not rendered in those views.

## 2. Technology stack

| Area | Implementation |
| --- | --- |
| Framework | Next.js 16.2.10 App Router |
| UI | React 19.2.4 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 and DaisyUI 5 |
| State | Zustand 5 with persistence middleware |
| Forms | Formik and Yup |
| Notifications | React Hot Toast |
| Icons | React Icons |
| Content API | Strapi v5-style flat response, expected at `http://localhost:1337` by default |
| Image optimization | `next/image`, with Unsplash and local Strapi hosts allowed |

`tsconfig.json` enables `strict: true`; the repository TypeScript check passes with strict checking enabled.

## 3. Getting started

### Requirements

- Node.js compatible with the installed Next.js version.
- npm (the repository includes `package-lock.json`).
- A Strapi backend for live catalog, category, offer, and deal data. The UI services fall back to empty collections or selected hardcoded content when requests fail.

### Install and run

```bash
npm ci
npm run dev
```

The development server uses Turbopack and normally runs at `http://localhost:3000`.

Other scripts currently defined in `package.json`:

```bash
npm run build
npm start
npm run lint
./node_modules/.bin/tsc --noEmit
```

`npm run lint` invokes `next lint`; verify that command against the installed Next.js 16 CLI before relying on it, because the lint script may need migration to ESLint's CLI.

### Environment variables

| Variable | Purpose | Default / requirement |
| --- | --- | --- |
| `NEXT_PUBLIC_STRAPI_URL` | Base URL for product, category, offer, and contact service requests | Defaults to `http://localhost:1337` |
| `NEXT_PUBLIC_SITE_URL` | Absolute site origin used by metadata, sitemap, and robots output | Defaults to `http://localhost:3000`; set to the canonical HTTPS production origin when deployed |

Authentication and content requests use the shared Strapi base URL from `NEXT_PUBLIC_STRAPI_URL` through `src/lib/strapi.ts`. It defaults to `http://localhost:1337` for local development. Set the variable in the deployment environment to the public Strapi origin. Do not put private credentials in `NEXT_PUBLIC_*` variables; values with that prefix are exposed to the browser.

## 4. Repository layout

```text
src/
├── app/
│   ├── (auth)/                 # Login, registration, and placeholder password recovery
│   │   ├── components/         # Login and registration forms
│   │   ├── hooks/              # Form orchestration for login and registration
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgetpassword/page.tsx
│   │   └── layout.tsx          # noindex metadata and auth-page shell
│   ├── About/                  # About page and metadata layout
│   ├── Contactus/              # Contact page and metadata layout
│   ├── cart/                   # Client-side cart UI and noindex metadata
│   ├── products/               # All-products catalog route
│   ├── shopping/               # Electronics catalog route
│   ├── providers/               # Theme provider
│   ├── layout.tsx              # Global metadata, header, main landmark, footer, toaster
│   ├── page.tsx                # Home route and metadata
│   ├── robots.ts               # Generated robots.txt
│   ├── sitemap.ts              # Generated sitemap.xml
│   ├── globals.css             # Tailwind/DaisyUI setup, shared themes and field styles
├── assets/                     # Local hero image and SVG asset
├── components/
│   ├── catalog/                # Shared catalog explorer, filters, cards, and pagination
│   ├── header/                 # Theme toggle, mobile nav, and cart badge
│   ├── home-comp/              # Home hero, featured products, categories, and deals
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── WishlistButton.tsx      # Shared interactive favorite control
├── services/                   # Strapi fetch functions and response types
├── store/                      # Cart, theme, and favorites Zustand stores
└── proxy.ts                    # Cart/auth-page redirects and OAuth token cookie handling
```

The `src/app/(auth)/layout.tsx` and route-group folder are Next.js route groups: `(auth)` does not appear in the URL. `src/proxy.ts` is the request interception entry point used by this project. Authentication requests are in `src/services/auth.ts`; validation schemas are in `src/lib/validation/authSchemas.ts`. `src/hooks/useCartActions.ts` shares cart interaction rules, and `src/lib/cart.ts` maps product data to cart items.

## 5. Routes and page behavior

| URL | Purpose | Data and behavior | Search indexing |
| --- | --- | --- | --- |
| `/` | Home storefront | Hero, featured products, categories, special offer, deal products | Indexable |
| `/products` | Full catalog | Fetches a 25-product Strapi page and categories; page and category are URL-backed; search, price/brand filters, sort, and layout remain client-side | Indexable |
| `/shopping` | Catalog presented as electronics | Fetches a 25-product Strapi page and categories; page and category are URL-backed; remaining catalog controls stay client-side | Indexable |
| `/About` | About the marketplace | Static story, mission, stats, features, and team content | Indexable |
| `/Contactus` | Contact information and FAQ | Static form and page content; form is not wired to the contact service | Indexable |
| `/cart` | Shopping cart | Reads and updates persisted local cart state | `noindex` |
| `/login` | Login form | Calls Strapi local authentication endpoint | Auth metadata sets `noindex` |
| `/register` | Registration form | Calls Strapi registration endpoint | Auth metadata sets `noindex` |
| `/forgetpassword` | Placeholder | Displays placeholder content; password recovery is not implemented | Auth metadata sets `noindex` |

`src/proxy.ts` applies the route access redirects. If no `token` cookie exists, a direct visit to `/cart` redirects to `/login?next=/cart`. Visitors with a `token` cookie are redirected from `/login` and `/register` to `/`. The storefront and informational routes remain public. The proxy also accepts `access_token` or `jwt` query parameters, stores the value in a cookie, and redirects to `/`.

## 6. Rendering and component boundaries

- The root layout is a Server Component and owns global metadata, document structure, header, main landmark, footer, and toast container.
- Server page/components fetch initial Strapi content and pass serializable data into client components.
- `CatalogExplorer`, product cards, the cart, theme controls, navigation menu, and wishlist button use client-side state or browser interactions.
- The catalog UI is shared by `/products` and `/shopping`. Both routes fetch a 25-product Strapi page and categories on the server; the selected page and category are reflected in URL search parameters.
- Home page sections are split into separate files. Featured products and deal products have client components for cart interaction.
- Separation of concerns: service modules make API requests, validation schemas describe form rules, form hooks coordinate submission and navigation, Zustand stores own persisted state, and shared hooks/utilities handle reusable UI actions and data mapping.
- Semantic elements are used in selected layouts and sections, but not every visual wrapper has been converted; `div` remains appropriate for layout-only containers.
- Header responsibilities are split between the server-rendered `Header` composition and focused client controls in `src/components/header/`: `AuthLinks` reads the browser token to show Login/Register only when signed out, while `CartBadge` owns cart count and click display. `MobileNav` owns the mobile site navigation. Auth route access itself is enforced separately in `src/proxy.ts`.

## 7. Catalog system

The reusable catalog lives in `src/components/catalog/`.

- `CatalogExplorer.tsx` owns query, category, price, brand, sort, view, and mobile-filter state. Page/category state is reflected in `?page=` and `?category=` and fetched through `/api/catalog`.
- `SearchBar.tsx` reports search text after a 700ms debounce. Search stays local: when a query is entered, the explorer loads all Strapi pages for the selected category and matches those products in the browser.
- `FiltersPanel.tsx`, `CatalogMobileFilters.tsx`, and `ActiveFilters.tsx` provide desktop/mobile filters and removable filter chips.
- `CatalogToolbar.tsx` controls sort order and grid/list mode.
- `CatalogProductCard.tsx` renders each product, rating, price, stock/discount badge, favorite button, and add-to-cart action.
- `CatalogPagination.tsx` navigates Strapi-backed pages using `meta.pagination.pageCount`; the toolbar uses Strapi `total` when no local search/price/brand filter is active.
- Shared types and defaults are in `types.ts`; Strapi catalog page size is 24 products.

Sorting options are featured, ascending price, descending price, name, and rating. Category filtering uses Strapi's category ID filter and is single-select. Price and placeholder brand filtering remain local; brand filtering matches brand-like text in product name/category because the `Product` model has no brand field. Search, price, and brand filters operate on the loaded search collection and report its filtered count; backend pagination metadata remains authoritative when those local filters are inactive.

## 8. Data services and API contract

Service functions are in `src/services/` and use native `fetch` with Next.js revalidation options. The code expects Strapi responses shaped like `{ data: [...] }` or `{ data: {...} }`, consistent with the flat response form described by the project.

### Products: `src/services/products.ts`

`Product` includes numeric `id`, `documentId`, name, price, image, and optional original price, rating, reviews, category, description, stock, and featured flag. Functions fetch all products, paged catalog data, paged category-filtered data, featured products, one product by document ID, and case-insensitive name search. Paged catalog requests use Strapi pagination metadata and revalidate after one minute; other requests keep their existing revalidation settings.

### Categories: `src/services/categories.ts`

`Category` includes `id`, `documentId`, name, image, item count, and optional description and slug. Functions fetch all categories, one by document ID, or one by slug. Requests revalidate after one hour.

### Offers and deals: `src/services/offers.ts`

Defines `SpecialOffer` and `DealProduct`. It fetches special offers and deal products, including products filtered by offer ID. Requests revalidate after 30 minutes. The home page currently displays the first special offer and all deal products.

### Contact: `src/services/contact.ts`

Defines contact form and contact information types, submits a JSON payload to `/api/contact-submissions`, and fetches `/api/contact-info` with a one-day revalidation period. Contact information falls back to hardcoded sample details. The visible contact form currently does not invoke `submitContactForm`.

All services return empty collections or `null` for most failed catalog lookups and log caught errors. They do not currently expose a shared API client, centralized response validation, or authentication headers.

## 9. Client-side state

### Cart: `src/store/cartStore.ts`, `src/hooks/useCartActions.ts`

Persisted with Zustand under `cart-storage`.

- `items` contains product identity and display/price data plus quantity.
- `addItem` increments quantity for an existing ID or adds a new item with quantity one.
- `removeItem`, `updateQuantity`, and `clearCart` change the cart.
- Updating quantity to zero or less removes the item.
- `getSubtotal` sums `price * quantity`; shipping and tax are placeholders in the UI and are not included in the total.
- `getTotalItems` sums quantities.
- The store only manages cart state. `useCartActions` is the shared client interaction layer: it checks the login token before adding an item, maps product data through the pure helper `src/lib/cart.ts`, and shows success/login requirement toasts. Product cards across the catalog and home page use this shared action.
- The header cart control is a button: signed-in visitors navigate to `/cart`; signed-out visitors see “Log in to view your cart.” and are sent to `/login?next=/cart`. The cart count is shown only when a token is present. Direct `/cart` access is independently guarded by the proxy.

### Favorites: `src/store/wishlistStore.ts`

Persists product IDs under the `wishlist` localStorage key. `toggleProduct` adds or removes an ID. Product cards use `documentId` when available and otherwise use the numeric ID converted to a string. `WishlistButton.tsx` subscribes to the store and renders a live pressed state; active hearts are filled and rose/red. There is no dedicated favorites listing/removal page.

### Theme: `src/store/theme.tsx`

Persists the `light` or `dark` theme under `theme-storage` and exposes set/toggle actions. `ThemeProvider` applies the matching class and `data-theme` attribute. The root layout includes an early inline script that reads persisted theme state before first paint to reduce a dark-mode flash. The store owns theme state; the provider owns DOM updates.

## 10. Authentication and request proxy

Authentication hooks are in `src/app/(auth)/hooks/`, forms are in `src/app/(auth)/components/`, API calls are in `src/services/auth.ts`, shared URL/auth helpers are in `src/lib/`, and Yup schemas are in `src/lib/validation/authSchemas.ts`.

Responsibility boundaries: `src/services/auth.ts` makes Strapi requests; validation rules remain in `src/lib/validation/authSchemas.ts`; `useLogin` and `useRegister` coordinate form submission, token storage, and client navigation; `src/lib/auth.ts` contains browser cookie and safe redirect helpers; and `src/proxy.ts` handles request-time route redirects using the token cookie. The header's `AuthLinks` only reflects cookie presence in the UI; it is not the route security check.

- Login validates email and a minimum six-character password with Yup, then sends credentials to `POST {NEXT_PUBLIC_STRAPI_URL}/api/auth/local`.
- Registration validates username, email, password, and confirmation, then sends data to `POST {NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`.
- Successful responses are expected to include `jwt`; the browser writes it to a `token` cookie with a seven-day max age.
- Submissions are throttled in the UI to one request per second.
- After successful login or registration, the hook redirects to a safe `next` path when provided (for example, `/cart`), otherwise to `/`.
- Facebook login is currently disabled and labeled “Coming soon”; it makes no OAuth request. Google OAuth remains routed through the configured Strapi base URL.

The cookie is currently set from client-side JavaScript and is not `HttpOnly` or `Secure`. The proxy checks for presence of a token; it does not validate token signature, expiry, or authorization. Treat this as development behavior, not a production authentication boundary. The `access_token`/`jwt` query parameter path should also be reviewed because query tokens can appear in browser history and logs.

## 11. SEO and metadata

- Global title template, description, keywords, Open Graph, Twitter card type, and default robots metadata are defined in `src/app/layout.tsx`.
- Home, products, shopping, About, and Contact pages define route-specific titles/descriptions and canonical paths.
- Cart and the auth route group use `noindex` metadata.
- `src/app/sitemap.ts` lists the intended indexable storefront URLs.
- `src/app/robots.ts` publishes the sitemap URL and disallows cart/login/register paths.
- `NEXT_PUBLIC_SITE_URL` must be set to the deployed canonical origin. Its localhost fallback is for development only.
- No product JSON-LD, dynamic per-product metadata, or generated social preview image is currently implemented.

The storefront routes remain public to search crawlers; only the non-indexable cart route is protected. Metadata and sitemap should still be checked against the deployed canonical origin.

## 12. Styling, images, and accessibility

Tailwind CSS 4 and DaisyUI 5 are configured in `src/app/globals.css`. The DaisyUI light and dark themes keep the existing store palette: primary green `#06513b`, secondary gold `#d4af37`, light bases `#ffffff` / `#e5eeff` / `#dce9ff`, and dark bases `#1f2937` / `#374151` / `#4b5563`. Existing custom Tailwind colors and the Jakarta font token remain in `@theme`; DaisyUI supplies component defaults while Tailwind continues to control layout and responsive details.

Shared styling recipes in `globals.css`:

- `.ui-field` sets field background and text from the active DaisyUI theme. Combine it with `input input-bordered`, `select select-bordered`, or `textarea textarea-bordered`; use it in auth forms, contact form, catalog search/filters, and footer subscription field. Keep field-specific sizing, icons, validation borders, and focus styles in Tailwind classes.
- `.auth-form-card` replaces repeated Login/Register outer-card utilities. It is full width up to `28rem`, with `1rem` padding/gap by default, `1.5rem` padding/gap at `md` (`48rem`), and `2rem` gap at `lg` (`64rem`). It retains a white surface in light mode, `#0b0f12` in dark mode, `0.75rem` radius, and the existing large shadow. Login and Register add DaisyUI `card` plus their centering utilities.
- `.featured-product-card` replaces repeated FeaturedProducts card styling: `1rem` padding, `1rem` radius, white / `#1f2937` surface, small resting shadow, and a larger shadow on hover. DaisyUI `card` handles the card structure; the component retains its group and content layout.
- `.catalog-product-card` centralizes CatalogProductCard surface, overflow, border, radius, shadow, and dark colors: white / `#1f2937`, `0.75rem` radius, form-gray at 30% in light mode and gray-700 at 60% in dark mode, plus a small shadow. Add DaisyUI `card`; the list variant also uses `.catalog-product-card--list`, which switches to a row at the existing `sm` breakpoint (`40rem`). The grid variant remains vertical.

DaisyUI component usage by file:

- `src/app/(auth)/components/Login-comp.tsx` and `Regis-comp.tsx`: shared auth card, bordered fields, primary submit button, error alert.
- `src/app/Contactus/page.tsx`: bordered inputs/select/textarea and primary submit button.
- `src/components/catalog/SearchBar.tsx`, `FiltersPanel.tsx`, and `CatalogToolbar.tsx`: themed fields, sort select, and filter buttons; `CatalogPagination.tsx` uses button variants for page controls.
- `src/components/catalog/CatalogProductCard.tsx`: shared catalog card recipe, DaisyUI card structure, status badges, and cart button.
- `src/components/catalog/CatalogExplorer.tsx`: bordered DaisyUI card for the catalog filter/content panel.
- `src/components/home-comp/FSection.tsx`, `FeaturedProducts.tsx`, and `DealProducts.tsx`: hero buttons, shared featured-product card, and primary purchase action.
- `src/components/header/AuthLinks.tsx`: outline and filled DaisyUI buttons while preserving the footer-specific colors and focus treatment.
- `src/components/Footer.tsx`: subscription input and compact primary button.
- `src/app/cart/page.tsx`: DaisyUI cards for cart items/summary and button variants for cart actions.

Common class families are `btn` with variants/sizes, `input`/`select`/`textarea` with `*-bordered`, `card`, `badge` with status variants, and `alert alert-error`. Preserve project-specific Tailwind colors, font choices, spacing, hover/focus behavior, and responsive utilities alongside those classes; DaisyUI is intended to replace repeated component styling, not the site's design tokens. When extending a component, follow the existing examples in those files instead of adding a second shared style with different values.

The primary visual mode is English and the root document language is `en`. The layout includes a skip link and `main` landmark. Buttons and form fields have labels in many interactive components; continue checking accessible names, heading order, focus behavior, and mobile drawer semantics when extending the UI.

`next.config.ts` allows remote images from `images.unsplash.com`, `localhost:1337`, and `127.0.0.1:1337`. Add any production image host there before using it with `next/image`. Product cards have image-error fallback behavior; the home hero uses a local asset.

## 13. Current limitations and follow-up work

1. Review the token-in-query OAuth callback flow because query tokens can appear in browser history and logs; prefer a server-managed callback and secure session cookies for production.
2. Replace the client-readable token cookie with a production-safe session strategy using server-managed secure cookies and real token validation.
3. Connect the contact form and footer subscription form to real handlers; add server-side validation and success/error states.
4. Implement password recovery, product detail, a dedicated wishlist page, checkout, and order flows if they are product requirements.
5. Move catalog filtering, sorting, and pagination to Strapi/server-side requests and represent filter state in search parameters.
6. Add a real brand field if brand filtering is required.
7. Replace sample contact/business information with verified business data.
8. Add route-aware and product-specific metadata and structured data when product detail pages exist.
9. Review outdated footer policy links and placeholder buttons/links.
10. Reconcile package scripts and the current Next.js version; strict TypeScript checking is enabled.

## 14. Validation commands

```bash
./node_modules/.bin/tsc --noEmit
npm run build
```

The repository guidance recommends TypeScript checking with the local compiler binary. Browser verification can use the configured Playwright MCP server. Do not treat a successful TypeScript check as proof that API connectivity, authentication, payment, forms, or crawler access work end to end.

## 15. Catalog pagination and filtering implementation (2026-11-12)

- Strapi paginates the catalog at 24 products per page using its endpoint pagination parameters. `getProductPageData` and category page services return products plus Strapi `meta.pagination`; client pagination controls use the returned page count and do not slice catalog pages locally.
- `/products` and `/shopping` read `page` and `category` search parameters on the server for initial data. Client page/category navigation updates these parameters; category selection is multi-select, stores selected document IDs as a comma-separated `category` value, resets page to 1 when changed, and uses Strapi's category ID `$in` filter so products from any selected category are returned.
- `/api/catalog` is the same-origin route handler used by the client catalog to retrieve page data through the server-side product service and shared `NEXT_PUBLIC_STRAPI_URL`.
- Search remains frontend-side and debounced by 700ms. When a search term is active, it loads all Strapi pages for the selected categories, then matches locally so it is not limited to the current 24-item page. Search result counts and pagination describe the locally matched collection. The search input does not emit an initial empty query, preserving the current page on mount.
- Price and placeholder brand filters and sorting remain local. When those local filters are active, the displayed count reflects the filtered loaded collection; with them inactive, the toolbar uses Strapi's total.

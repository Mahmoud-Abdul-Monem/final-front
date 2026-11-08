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

`tsconfig.json` currently has `strict: false`; types are present throughout the application, but strict TypeScript checks are not enabled.

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
│   ├── globals.css             # Tailwind import, theme tokens, global styling
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
└── proxy.ts                    # Cart route protection and OAuth token cookie handling
```

The `src/app/(auth)/layout.tsx` and route-group folder are Next.js route groups: `(auth)` does not appear in the URL. `src/proxy.ts` is the request interception entry point used by this project. Authentication requests are in `src/services/auth.ts`; validation schemas are in `src/lib/validation/authSchemas.ts`. `src/hooks/useCartActions.ts` shares cart interaction rules, and `src/lib/cart.ts` maps product data to cart items.

## 5. Routes and page behavior

| URL | Purpose | Data and behavior | Search indexing |
| --- | --- | --- | --- |
| `/` | Home storefront | Hero, featured products, categories, special offer, deal products | Indexable |
| `/products` | Full catalog | Fetches products and categories; client-side search, filters, sort, layout, and pagination | Indexable |
| `/shopping` | Catalog presented as electronics | Fetches the same full product and category collections as `/products`; client-side catalog behavior | Indexable |
| `/About` | About the marketplace | Static story, mission, stats, features, and team content | Indexable |
| `/Contactus` | Contact information and FAQ | Static form and page content; form is not wired to the contact service | Indexable |
| `/cart` | Shopping cart | Reads and updates persisted local cart state | `noindex` |
| `/login` | Login form | Calls Strapi local authentication endpoint | Auth metadata sets `noindex` |
| `/register` | Registration form | Calls Strapi registration endpoint | Auth metadata sets `noindex` |
| `/forgetpassword` | Placeholder | Displays placeholder content; password recovery is not implemented | Auth metadata sets `noindex` |

Only `/cart` is protected by `src/proxy.ts`. If no `token` cookie exists, a direct visit redirects to `/login?next=/cart`; the storefront and informational routes remain public. The proxy also accepts `access_token` or `jwt` query parameters, stores the value in a cookie, and redirects to `/`.

## 6. Rendering and component boundaries

- The root layout is a Server Component and owns global metadata, document structure, header, main landmark, footer, and toast container.
- Server page/components fetch initial Strapi content and pass serializable data into client components.
- `CatalogExplorer`, product cards, the cart, theme controls, navigation menu, and wishlist button use client-side state or browser interactions.
- The catalog UI is shared by `/products` and `/shopping`. Both routes currently fetch all products and categories before client-side filtering.
- Home page sections are split into separate files. Featured products and deal products have client components for cart interaction.
- Separation of concerns: service modules make API requests, validation schemas describe form rules, form hooks coordinate submission and navigation, Zustand stores own persisted state, and shared hooks/utilities handle reusable UI actions and data mapping.
- Semantic elements are used in selected layouts and sections, but not every visual wrapper has been converted; `div` remains appropriate for layout-only containers.

## 7. Catalog system

The reusable catalog lives in `src/components/catalog/`.

- `CatalogExplorer.tsx` owns query, category, price, brand, sort, view, page, and mobile-filter state.
- `SearchBar.tsx` reports search text; the explorer applies filtering locally.
- `FiltersPanel.tsx`, `CatalogMobileFilters.tsx`, and `ActiveFilters.tsx` provide desktop/mobile filters and removable filter chips.
- `CatalogToolbar.tsx` controls sort order and grid/list mode.
- `CatalogProductCard.tsx` renders each product, rating, price, stock/discount badge, favorite button, and add-to-cart action.
- `CatalogPagination.tsx` provides client-side pagination.
- Shared types and defaults are in `types.ts`; page size is 12.

Sorting options are featured, ascending price, descending price, name, and rating. Category and price filtering use product data. Brand filtering currently matches brand-like text in product name/category because the `Product` model has no brand field. Filtering and pagination are not encoded in the URL and are not performed by Strapi.

## 8. Data services and API contract

Service functions are in `src/services/` and use native `fetch` with Next.js revalidation options. The code expects Strapi responses shaped like `{ data: [...] }` or `{ data: {...} }`, consistent with the flat response form described by the project.

### Products: `src/services/products.ts`

`Product` includes numeric `id`, `documentId`, name, price, image, and optional original price, rating, reviews, category, description, stock, and featured flag. Functions fetch all products, featured products, products by category, one product by document ID, and case-insensitive name search. Most requests revalidate after one hour; search revalidates after one minute.

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
- The store only manages cart state. `useCartActions` checks for a login token before adding an item, maps the product through `src/lib/cart.ts`, and shows a toast for success or the login requirement. Product cards across the catalog and home page use this shared action.
- The header cart control is a button: signed-in visitors navigate to `/cart`, while signed-out visitors see “Log in to view your cart.” without navigation. The cart count is shown only when a token is present. Direct `/cart` access is independently guarded by the proxy.

### Favorites: `src/store/wishlistStore.ts`

Persists product IDs under the `wishlist` localStorage key. `toggleProduct` adds or removes an ID. Product cards use `documentId` when available and otherwise use the numeric ID converted to a string. `WishlistButton.tsx` subscribes to the store and renders a live pressed state; active hearts are filled and rose/red. There is no dedicated favorites listing/removal page.

### Theme: `src/store/theme.tsx`

Persists the `light` or `dark` theme under `theme-storage` and exposes set/toggle actions. `ThemeProvider` applies the matching class and `data-theme` attribute. The root layout includes an early inline script that reads persisted theme state before first paint to reduce a dark-mode flash. The store owns theme state; the provider owns DOM updates.

## 10. Authentication and request proxy

Authentication hooks are in `src/app/(auth)/hooks/`, forms are in `src/app/(auth)/components/`, API calls are in `src/services/auth.ts`, shared URL/auth helpers are in `src/lib/`, and Yup schemas are in `src/lib/validation/authSchemas.ts`.

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

Global Tailwind/DaisyUI setup and theme color variables are in `src/app/globals.css`. The primary visual mode is English and the root document language is `en`. The layout includes a skip link and `main` landmark. Buttons and form fields have labels in many interactive components; continue checking accessible names, heading order, focus behavior, and mobile drawer semantics when extending the UI.

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
10. Reconcile package scripts, TypeScript configuration, and the current Next.js version; consider enabling strict type checking after cleanup.

## 14. Validation commands

```bash
./node_modules/.bin/tsc --noEmit
npm run build
```

The repository guidance recommends TypeScript checking with the local compiler binary. Browser verification can use the configured Playwright MCP server. Do not treat a successful TypeScript check as proof that API connectivity, authentication, payment, forms, or crawler access work end to end.

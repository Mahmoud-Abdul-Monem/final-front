# Luminous Marketplace

An English-language e-commerce frontend built with Next.js, React, TypeScript, Tailwind CSS, Zustand, and a Strapi API.

## Quick start

Requirements: a compatible Node.js version, npm, and (for live catalog data) a Strapi server.

```bash
npm ci
npm run dev
```

The app runs at `http://localhost:3000` by default. Strapi is expected at `http://localhost:1337` unless configured otherwise.

## Configuration

Set these environment variables as needed:

```dotenv
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Use the deployed canonical origin for `NEXT_PUBLIC_SITE_URL` in production. Authentication and content requests use `NEXT_PUBLIC_STRAPI_URL`.

## Project documentation

See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for the full developer guide, including routes, architecture, services, state persistence, authentication behavior, SEO, limitations, and follow-up work.

## Useful commands

```bash
npm run dev
npm run build
npm start
./node_modules/.bin/tsc --noEmit
```

The `npm run lint` script currently invokes `next lint`; check compatibility with the installed Next.js 16 CLI before relying on it.

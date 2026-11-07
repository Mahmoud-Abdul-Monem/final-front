<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Verification
- TypeScript: `./node_modules/.bin/tsc --noEmit` (npx may pick up system tsc wrapper)
- Browser testing: Playwright MCP server is available for visual verification
- Dev server: `npm run dev` (uses Turbopack)
- Auth: Routes protected by `src/proxy.ts` — need `?access_token=xxx` or valid `token` cookie

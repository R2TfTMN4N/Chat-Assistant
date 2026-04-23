# apps/widget — Widget frontend (Next.js)

**Purpose**

Small Next.js application used as a widget. It can be run independently of `apps/web`.

## Quick start

1. Install dependencies in the repo root:

```bash
pnpm install
```

2. Start Widget:

```bash
# From root
pnpm --filter ./apps/widget dev

# Or from inside package
cd apps/widget
pnpm dev
```

Default port is typically set by the package's `dev` script.

## Scripts

- `pnpm dev` — `next dev` (uses turbopack when available)
- `pnpm build` — `next build`
- `pnpm start` — `next start`

## Environment

The widget may rely on the same backend services as `apps/web` (Convex, Clerk, etc). See repository `.env.example` for the list of commonly required environment variables.

## Notes

- If the widget is showing server/edge errors referencing Next internals, try cleaning `.next` and rebuilding.
- For local debugging, use the browser devtools and check server logs if using server-side rendering.

# apps/web — Main frontend (Next.js)

**Purpose**

The `apps/web` app is the main Next.js frontend for the project. It uses the App Router, Clerk for auth, and communicates with the Convex backend and shared `@workspace/ui` components.

## Quick start (development)

Prerequisites: Node.js (18+ recommended), pnpm (>=8), Git.

From the repository root:

1. Install dependencies:

```bash
pnpm install
```

2. Start the backend (Convex) in a separate terminal (see `packages/backend` README):

```bash
cd packages/backend
pnpm dev
```

3. Start the web app (either from root or inside the package):

```bash
# From repository root (pnpm workspace filter)
pnpm --filter ./apps/web dev

# Or from inside apps/web
cd apps/web
pnpm dev
```

The app runs on http://localhost:3000 by default.

## Scripts

- `pnpm dev` — runs `next dev --turbopack --port 3000`
- `pnpm build` — runs `next build`
- `pnpm start` — runs `next start`
- `pnpm lint` — runs `next lint`
- `pnpm typecheck` — runs `tsc --noEmit`

## Environment variables

See the repository root `.env.example` and `packages/backend/.env.example` for required server-side secrets. Typical ones:

- `CONVEX_DEPLOYMENT` (backend; for production deployment)
- `NEXT_PUBLIC_CLERK_FRONTEND_API` (Clerk client config; frontend)
- `NEXT_PUBLIC_METADATA_BASE` (optional metadata base url)

> Do not commit secret values. Use `.env.local` per environment and keep it in `.gitignore`.

## Notes & troubleshooting

- If you see strange behavior caused by mixed Next versions, clean and rebuild:

```bash
# remove local build artifacts
rm -rf apps/web/.next
rm -rf node_modules
pnpm install
pnpm dev
```

- If using Vercel or other hosting, check `VERCEL_*` environment variables mentioned in the codebase (metadata, preview detection).

---

If you want, I can add small example env values relevant to Clerk or Convex here (no secrets).
